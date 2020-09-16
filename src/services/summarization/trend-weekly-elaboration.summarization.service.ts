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

const summarizationName = 'TrendWeeklyElaborationService';

export type TrendWeeklyElaborationConfig = BaseConfig & WeekdayWeekendRelativeConfig;

export type TrendWeeklyElaborationProperties = {
  weekPointArrays: TimeSeriesPoint[][];
  weekLinearModels: LinearModel[];
};

const defaultConfig = {
};

@Injectable({
  providedIn: 'any',
})
export class TrendWeeklyElaborationSummarizationService extends
  SummarizationService<TimeSeriesPoint, TrendWeeklyElaborationProperties, TrendWeeklyElaborationConfig>  {

  constructor(
    protected summarizationDataSourceService: SummarizationDataSourceService,
    protected weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService,
  ) {
    super();
  }

  prepareConfig(config: Partial<TrendWeeklyElaborationConfig>): TrendWeeklyElaborationConfig {
    return config as TrendWeeklyElaborationConfig;
  }

  createProperties$(config: TrendWeeklyElaborationConfig): Observable<TrendWeeklyElaborationProperties> {
    const { datumLabels } = config;

    return zip(
      this.summarizationDataSourceService.pointsByLabels$(datumLabels),
      this.weekdayWeekendRelativeSummarizationService.properties$(config),
    ).pipe(map(([pointsArray, { weekdayWeekendEqualValidity }]) => {
      const points = pointsArray[0];
      const isWeekdayWeekendEqual = weekdayWeekendEqualValidity > 0.7;

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

      // Only consider weeks with more than 3 days when creating summaries
      // Weeks with 3 days or less are considered to belong to last/next 30 days
      const weekPointArrays = groupPointsByXWeek(points).filter(weekPoints => weekPoints.length >= 4);

      // TODO: Create rate comparison summaries with fuzzy logic for both weekday and overall points
      const weekLinearModels = weekPointArrays.map(weekPoints => {
        if (isWeekdayWeekendEqual) {
          return createLinearModel(weekPoints.map(timeSeriesPointToNumPoint));
        } else {
          return createLinearModel(weekPoints.filter(isWeekday).map(timeSeriesPointToNumPoint));
        }
      });

      return {
        weekPointArrays,
        weekLinearModels,
      };
    }));
  }

  createSummaries$(config: TrendWeeklyElaborationConfig): Observable<SummaryGroup[]> {
    return zip(
      this.weekdayWeekendRelativeSummarizationService.properties$(config),
      this.properties$(config),
    ).pipe(map(([
      { weekdayWeekendEqualValidity },
      { weekPointArrays, weekLinearModels }
    ]) => {
      const numOfWeeks = weekPointArrays.length;
      const isWeekdayWeekendEqual = weekdayWeekendEqualValidity > 0.7;

      const ordinalTexts = ['first', 'second', 'third', 'fourth', 'fifth'];
      const summaries: Summary[] = [];

      for (let i = 0; i < numOfWeeks; i++) {
        const weekRate = weekLinearModels[i].gradient;
        const weekStartPrediction = weekLinearModels[i].prediction[0].y;

        const weekRateAbsolute = Math.abs(weekRate);
        const weekdayWeekendDescriptor = isWeekdayWeekendEqual ? 'from Monday to Sunday' : 'from Monday to Friday';

        const dynamicDescriptor = weekRate >= 0 ? 'increased' : 'decreased';

        const r2Text = `R2 = ${weekLinearModels[i].r2}`;
        const text = `The active users <b>${weekdayWeekendDescriptor}</b> in the <b>${ordinalTexts[i]} week</b> <b>${dynamicDescriptor}</b> by <b>${formatY(weekRateAbsolute)}</b> users per day from ${formatY(weekStartPrediction)} <b>(${r2Text})</b>.`;

        summaries.push({
          text,
          validity: 1.0,
        });

        if (!isWeekdayWeekendEqual) {
          const fridayPoint = weekPointArrays[i].find(({ x }) => x.getDay() === 5);
          const saturdayPoint = weekPointArrays[i].find(({ x }) => x.getDay() === 6);

          if (fridayPoint && saturdayPoint) {
            const yDiff = saturdayPoint.y - fridayPoint.y;
            const yDiffAbsolute = Math.abs(yDiff);
            const yDiffDynamicDescriptor = yDiff >= 0 ? 'increased' : 'decreased';

            const friSatDiffText = `The active users from Friday to Saturday <b>${yDiffDynamicDescriptor} by ${formatY(yDiffAbsolute)}</b> users in the <b>${ordinalTexts[i]} week.`;
            summaries.push({
              text: friSatDiffText,
              validity: 1.0,
            });
          }
        }
      }
      return [{
        title: 'Trend Weekly Elaboration',
        summaries,
      }];

    }));
  }
}
