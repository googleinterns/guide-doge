import * as math from 'mathjs';
import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged, pluck, filter, map, shareReplay } from 'rxjs/operators';
import { asyncScheduler, BehaviorSubject, Subject, Observable, Observer, zip } from 'rxjs';
import { datasets } from '../../datasets';
import { Dataset } from '../../datasets/types';
import { PreferenceItemMeta } from '../preference/types';
import { SummarizationDataSourceService } from './summarization-data-source.service';
import { SummarizationService, BaseConfig } from './summarization.service';
import { SummaryGroup, SummaryVariableOptionPair, Summary } from './types';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import {
  PointMembershipFunction,
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
  sigmaCountQA,
} from './libs/protoform';
import {
  createLinearModel,
  LinearModel,
  createCenteredMovingAveragePoints,
  additiveDecomposite,
} from './libs/trend';
import {
  timeSeriesPointToNumPoint,
  groupPointsByXWeek,
} from './utils/time-series';
import {
  normalizePoints,
  normalizePointsY,
} from './utils/commons';
import {
  CHART_DIAGONAL_ANGLE
} from './utils/constants';
import { formatY } from '../../utils/formatters';
import { WeekdayWeekendRelativeConfig, WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';

const summarizationName = 'TrendRegressionService';

export type TrendRegressionConfig = BaseConfig & WeekdayWeekendRelativeConfig;

export type TrendRegressionProperties = {
  overallLinearModel: LinearModel;
  overallLinearTrendValidity: number;
  weekdayLinearModel: LinearModel;
  weekdayLinearTrendValidity: number;
  weekendLinearModel: LinearModel;
  weekendLinearTrendValidity: number;
  overallLinearTrendSummariesValidity: number;
};

const defaultConfig = {
};

@Injectable({
  providedIn: 'any',
})
export class TrendRegressionSummarizationService extends
  SummarizationService<TimeSeriesPoint, TrendRegressionProperties, TrendRegressionConfig>  {

  constructor(
    protected summarizationDataSourceService: SummarizationDataSourceService,
    protected weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService,
  ) {
    super();
  }

  prepareConfig(config: Partial<TrendRegressionConfig>): TrendRegressionConfig {
    return config as TrendRegressionConfig;
  }

  createProperties$(config: TrendRegressionConfig): Observable<TrendRegressionProperties> {
    const { datumLabels } = config;

    return zip(
      this.summarizationDataSourceService.pointsByLabels$(datumLabels),
      this.weekdayWeekendRelativeSummarizationService.properties$(config),
    ).pipe(map(([pointsArray, { weekdayWeekendEqualValidity }]) => {
      const points = pointsArray[0];

      const uWeekend = (p: TimeSeriesPoint) => {
        const dayOfWeek = p.x.getDay();
        switch (dayOfWeek) {
          case 5: // Friday
            return 0.2;
          case 6: // Saturday
          case 0: // Sunday
            return 1;
          default: // All other days
            return 0;
        }
      };
      const uWeekday = (p: TimeSeriesPoint) => 1 - uWeekend(p);
      const isWeekend = (p: TimeSeriesPoint) => uWeekend(p) > 0.5;
      const isWeekday = (p: TimeSeriesPoint) => uWeekday(p) > 0.5;

      const uSmallRegressionStd = trapmfR(0.09, 0.14);

      // TODO: Move denormalization information to normalization utils
      const ymin = 0;
      const ymax = Math.max(...points.map(({ y }) => y));
      const xdiff = 800 / 500 / points.length;
      const denormalizeGradient = gradient => (gradient * xdiff) * (ymax - ymin) - ymin;

      const normalizedPoints = normalizePoints(points.map(timeSeriesPointToNumPoint));
      const weekdayNormalizedPoints = normalizedPoints.filter((_, i) => isWeekday(points[i]));
      const weekendNormalizedPoints = normalizedPoints.filter((_, i) => isWeekend(points[i]));

      const overallLinearModel = createLinearModel(normalizedPoints);
      const overallLinearTrendValidity = uSmallRegressionStd(overallLinearModel.errorStd);

      const weekdayLinearModel = createLinearModel(weekdayNormalizedPoints);
      const weekdayLinearTrendValidity = uSmallRegressionStd(weekdayLinearModel.errorStd);

      const weekendLinearModel = createLinearModel(weekendNormalizedPoints);
      const weekendLinearTrendValidity = uSmallRegressionStd(weekendLinearModel.errorStd);

      const overallLinearTrendSummariesValidity = weekdayWeekendEqualValidity;

      return {
        overallLinearModel,
        overallLinearTrendValidity,
        weekdayLinearModel,
        weekdayLinearTrendValidity,
        weekendLinearModel,
        weekendLinearTrendValidity,
        overallLinearTrendSummariesValidity,
      };
    }));
  }

  createSummaries$(config: TrendRegressionConfig): Observable<SummaryGroup[]> {
    const { datumLabels } = config;

    return zip(
      this.summarizationDataSourceService.pointsByLabels$(datumLabels),
      this.properties$(config),
    ).pipe(map(([pointsArray, {
      overallLinearModel,
      overallLinearTrendValidity,
      weekdayLinearModel,
      weekdayLinearTrendValidity,
      weekendLinearModel,
      weekendLinearTrendValidity,
      overallLinearTrendSummariesValidity
    }]) => {
      const points = pointsArray[0];

      const uQuicklyIncreasingLinearDynamic = trapmfL(CHART_DIAGONAL_ANGLE / 2, CHART_DIAGONAL_ANGLE * 5 / 8);
      const uIncreasingLinearDynamic = trapmf(
        CHART_DIAGONAL_ANGLE / 8, CHART_DIAGONAL_ANGLE / 4, CHART_DIAGONAL_ANGLE / 2, CHART_DIAGONAL_ANGLE * 5 / 8);
      const uConstantLinearDynamic = trapmf(
        -CHART_DIAGONAL_ANGLE / 4, -CHART_DIAGONAL_ANGLE / 8, CHART_DIAGONAL_ANGLE / 8, CHART_DIAGONAL_ANGLE / 4);
      const uDecreasingLinearDynamic = trapmf(
        -CHART_DIAGONAL_ANGLE * 5 / 8, -CHART_DIAGONAL_ANGLE / 2, -CHART_DIAGONAL_ANGLE / 4, -CHART_DIAGONAL_ANGLE / 8);
      const uQuicklyDecreasingLinearDynamic = trapmfR(-CHART_DIAGONAL_ANGLE * 5 / 8, -CHART_DIAGONAL_ANGLE / 2);

      const uLinearDynamics: SummaryVariableOptionPair<MembershipFunction>[] = [
        ['quickly increasing', uQuicklyIncreasingLinearDynamic],
        ['increasing', uIncreasingLinearDynamic],
        ['constant', uConstantLinearDynamic],
        ['decreasing', uDecreasingLinearDynamic],
        ['quickly decreasing', uQuicklyDecreasingLinearDynamic],
      ];

      // TODO: Move denormalization information to normalization utils
      const ymin = 0;
      const ymax = Math.max(...points.map(({ y }) => y));
      const xdiff = 800 / 500 / points.length;
      const denormalizeGradient = gradient => (gradient * xdiff) * (ymax - ymin) - ymin;

      const summaries: Summary[] = [];
      // Create summaries describing linear trend of overall points
      for (const [linearDynamic, uLinearDynamic] of uLinearDynamics) {
        const validity = Math.min(
          overallLinearTrendSummariesValidity,
          overallLinearTrendValidity,
          uLinearDynamic(overallLinearModel.gradientAngleRad),
        );
        const rate = denormalizeGradient(overallLinearModel.gradient);
        const rateAbsolute = Math.abs(rate);

        let text: string;
        if (linearDynamic === 'constant') {
          text = `The <b>overall</b> active users <b>remained similar</b>.`;
        } else {
          text = `The <b>overall</b> active users was <b>linearly ${linearDynamic}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
        }
        summaries.push({
          validity,
          text,
        });
      }

      // Create summaries describing linear trend of weekday points
      for (const [linearDynamic, uLinearDynamic] of uLinearDynamics) {
        const validity = Math.min(
          1.0 - overallLinearTrendSummariesValidity,
          weekdayLinearTrendValidity,
          uLinearDynamic(weekdayLinearModel.gradientAngleRad),
        );
        const rate = denormalizeGradient(weekdayLinearModel.gradient);
        const rateAbsolute = Math.abs(rate);

        let text: string;
        if (linearDynamic === 'constant') {
          text = `The active users <b>of weekdays</b> <b>remained similar</b>.`;
        } else {
          text = `The active users <b>of weekdays</b> was <b>linearly ${linearDynamic}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
        }
        summaries.push({
          validity,
          text,
        });
      }

      // Create summaries describing linear trend of weekend points
      for (const [linearDynamic, uLinearDynamic] of uLinearDynamics) {
        const validity = Math.min(
          1.0 - overallLinearTrendSummariesValidity,
          weekendLinearTrendValidity,
          uLinearDynamic(weekendLinearModel.gradientAngleRad),
        );
        const rate = denormalizeGradient(weekendLinearModel.gradient);
        const rateAbsolute = Math.abs(rate);

        let text: string;
        if (linearDynamic === 'constant') {
          text = `The active users <b>of weekends</b> <b>remained similar</b>.`;
        } else {
          text = `The active users <b>of weekends</b> was <b>linearly ${linearDynamic}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
        }
        summaries.push({
          validity,
          text,
        });
      }

      return [{
        title: 'Trend Regression',
        summaries
      }];
    }));
  }
}
