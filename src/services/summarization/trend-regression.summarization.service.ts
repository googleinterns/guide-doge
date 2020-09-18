import * as math from 'mathjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import { SummarizationDataSourceService } from './summarization-data-source.service';
import { SummarizationService, BaseConfig } from './summarization.service';
import { SummaryGroup, SummaryVariableOptionPair, Summary } from './types';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import {
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
} from './libs/protoform';
import {
  createLinearModel,
  LinearModel,
} from './libs/trend';
import {
  timeSeriesPointToNumPoint,
} from './utils/time-series';
import {
  normalizePoints,
} from './utils/commons';
import {
  CHART_DIAGONAL_ANGLE
} from './utils/constants';
import { formatY } from '../../utils/formatters';
import { WeekdayWeekendRelativeConfig, WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';

export interface TrendRegressionConfig extends WeekdayWeekendRelativeConfig {
  metric: string;
  metricUnit: string;
}

export type TrendRegressionProperties = {
  overallLinearModel: LinearModel;
  overallLinearTrendValidity: number;
  weekdayLinearModel: LinearModel;
  weekdayLinearTrendValidity: number;
  weekendLinearModel: LinearModel;
  weekendLinearTrendValidity: number;
  overallLinearTrendSummariesValidity: number;
};

const defaultConfig: Partial<TrendRegressionConfig> = {
  metric: 'active users',
  metricUnit: 'users',
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

  prepareConfig(config: BaseConfig & Partial<TrendRegressionConfig>): TrendRegressionConfig {
    return { ...defaultConfig, ...config } as TrendRegressionConfig;
  }

  createDataProperties$(config: TrendRegressionConfig): Observable<TrendRegressionProperties> {
    // The length of datumLabels should be 1 for this summarization
    const { datumLabels } = config;

    return zip(
      this.summarizationDataSourceService.pointsByLabels$(datumLabels),
      this.weekdayWeekendRelativeSummarizationService.dataProperties$(config),
    ).pipe(map(([pointsArray, { weekdayWeekendEqualValidity }]) => {
      // datum label should be unique in data, so length of pointsArray is either 0 or 1
      const points = (pointsArray.length === 0 ? [] : pointsArray[0]) as TimeSeriesPoint[];

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

  /**
   * Create summaries that describe the overall / weekdays / weekends linear dynamic.
   * It depends on the data properties from WeekdayWeekendRelativeSummarizationService
   * to determine whether to create a summary for overall data or summaries for weekdays and weekends
   * individually.
   *
   * Sample summaries:
   * - The overall active users remained similar around 110.0.
   * - The active users of weekdays was linearly quickly increasing by 22.0 users per day from 58.8.
   * - The active users of weekends remained similar around 38.9.
   */
  createSummaries$(config: TrendRegressionConfig): Observable<SummaryGroup[]> {
    // The length of datumLabels should be 1 for this summarization
    const { datumLabels, metric, metricUnit } = config;

    return zip(
      this.summarizationDataSourceService.pointsByLabels$(datumLabels),
      this.dataProperties$(config),
    ).pipe(map(([pointsArray, {
      overallLinearModel,
      overallLinearTrendValidity,
      weekdayLinearModel,
      weekdayLinearTrendValidity,
      weekendLinearModel,
      weekendLinearTrendValidity,
      overallLinearTrendSummariesValidity
    }]) => {
      // datum label should be unique in data, so length of pointsArray is either 0 or 1
      const points = (pointsArray.length === 0 ? [] : pointsArray[0]) as TimeSeriesPoint[];

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
      const denormalizeY = (y: number) => y * (ymax - ymin) + ymin;
      const denormalizeGradient = (gradient: number) => (gradient * xdiff) * (ymax - ymin) - ymin;

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
        const predictionAverage = denormalizeY(math.mean(overallLinearModel.prediction.map(({ y }) => y)));
        const startPrediction = denormalizeY(overallLinearModel.prediction[0].y);

        let text: string;
        if (linearDynamic === 'constant') {
          text = `The <b>overall</b> ${metric} <b>remained similar</b> around ${formatY(predictionAverage)}.`;
        } else {
          text = `The <b>overall</b> ${metric} was <b>linearly ${linearDynamic}</b> by <b>${formatY(rateAbsolute)}</b> ${metricUnit} per day from ${formatY(startPrediction)}.`;
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
        const predictionAverage = denormalizeY(math.mean(weekdayLinearModel.prediction.map(({ y }) => y)));
        const startPrediction = denormalizeY(weekdayLinearModel.prediction[0].y);

        let text: string;
        if (linearDynamic === 'constant') {
          text = `The ${metric} <b>of weekdays</b> <b>remained similar</b> around ${formatY(predictionAverage)}.`;
        } else {
          text = `The ${metric} <b>of weekdays</b> was <b>linearly ${linearDynamic}</b> by <b>${formatY(rateAbsolute)}</b> ${metricUnit} per day from ${formatY(startPrediction)}.`;
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
        const predictionAverage = denormalizeY(math.mean(weekendLinearModel.prediction.map(({ y }) => y)));
        const startPrediction = denormalizeY(weekendLinearModel.prediction[0].y);

        let text: string;
        if (linearDynamic === 'constant') {
          text = `The ${metric} <b>of weekends</b> <b>remained similar</b> around ${formatY(predictionAverage)}.`;
        } else {
          text = `The ${metric} <b>of weekends</b> was <b>linearly ${linearDynamic}</b> by <b>${formatY(rateAbsolute)}</b> ${metricUnit} per day from ${formatY(startPrediction)}.`;
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
