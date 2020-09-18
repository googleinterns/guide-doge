import * as math from 'mathjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  createCenteredMovingAveragePoints,
  additiveDecomposite,
} from './libs/trend';
import {
  groupPointsByXWeek,
} from './utils/time-series';
import {
  normalizePointsY,
} from './utils/commons';

export interface WeekdayWeekendRelativeConfig extends BaseConfig {
  metric: string;
}

export type WeekdayWeekendRelativeProperties = {
  weekdayWeekendEqualValidity: number;
  weekdayWeekendDiffPoints: TimeSeriesPoint[],
};

const defaultConfig: Partial<WeekdayWeekendRelativeConfig> = {
  metric: 'active users'
};

@Injectable({
  providedIn: 'any',
})
export class WeekdayWeekendRelativeSummarizationService extends
  SummarizationService<TimeSeriesPoint, WeekdayWeekendRelativeProperties, WeekdayWeekendRelativeConfig>  {

  constructor(
    protected summarizationDataSourceService: SummarizationDataSourceService,
  ) {
    super();
  }

  prepareConfig(config: BaseConfig & Partial<WeekdayWeekendRelativeConfig>): WeekdayWeekendRelativeConfig {
    return { ...defaultConfig, ...config } as WeekdayWeekendRelativeConfig;
  }

  createDataProperties$(config: WeekdayWeekendRelativeConfig): Observable<WeekdayWeekendRelativeProperties> {
    // The length of datumLabels should be 1 for this summarization
    const { datumLabels } = config;

    return this.summarizationDataSourceService.pointsByLabels$(datumLabels)
      .pipe(map(pointsArray => {
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

        const normalizedYPoints = normalizePointsY(points);

        const centeredMovingAverageHalfWindowSize = 4;
        const normalizedTrendPoints = createCenteredMovingAveragePoints(normalizedYPoints, centeredMovingAverageHalfWindowSize);
        const {
          detrendedPoints: normalizedDetrendedPoints,
        } = additiveDecomposite(normalizedYPoints, normalizedTrendPoints, ({ x }) => x.getDay());

        // Only consider weeks with more than 3 days when creating summaries
        // Weeks with 3 days or less are considered to belong to last/next 30 days
        const normalizedDetrendedWeekPointArrays = groupPointsByXWeek(
          normalizedDetrendedPoints).filter(weekPoints => weekPoints.length >= 4);

        // Create an array of weekly points, where the y-value is the diff | AverageWeekdayY - AverageWeekendY | of each week
        // The x-value is the time(x-value) of the first point in the week. If a week does not have any weekday points or
        // weekend points, e.g. first week and last week of a month, the created weekly points will not include that week.
        const weekdayWeekendDiffPoints = normalizedDetrendedWeekPointArrays.map(weekPoints => {
          const startDateOfWeek = weekPoints[0].x;
          const weekdayPoints = weekPoints.filter(isWeekday);
          const weekendPoints = weekPoints.filter(isWeekend);
          const weekdayPointsYSum = math.sum(weekdayPoints.map(({ y }) => y));
          const weekendPointsYSum = math.sum(weekendPoints.map(({ y }) => y));

          if (weekdayPoints.length === 0 || weekendPoints.length === 0) {
            return { x: startDateOfWeek, y: null };
          } else {
            const weekdayPointsYAverage = weekdayPointsYSum / weekdayPoints.length;
            const weekendPointsYAverage = weekendPointsYSum / weekendPoints.length;
            const weekdayWeekendDiff = weekdayPointsYAverage - weekendPointsYAverage;
            return { x: startDateOfWeek, y: weekdayWeekendDiff };
          }
        }).filter(({ y }) => y !== null) as TimeSeriesPoint[];

        const uMostPercentage = trapmfL(0.6, 0.7);
        const uEqualDiff = ({ y }) => trapmf(-0.1, -0.07, 0.07, 0.1)(y);
        const weekdayWeekendEqualValidity = sigmaCountQA(weekdayWeekendDiffPoints, uMostPercentage, uEqualDiff);

        return {
          weekdayWeekendEqualValidity,
          weekdayWeekendDiffPoints,
        };
      }));
  }

  createSummaries$(config: WeekdayWeekendRelativeConfig): Observable<SummaryGroup[]> {
    const { metric } = config;

    return this.dataProperties$(config)
      .pipe(map(({ weekdayWeekendDiffPoints: points }) => {
        const uHigherDiff = ({ y }) => trapmfL(0.07, 0.1)(y);
        const uSimilarDiff = ({ y }) => trapmf(-0.1, -0.07, 0.07, 0.1)(y);
        const uLowerDiff = ({ y }) => trapmfR(-0.1, -0.07)(y);

        const uMostPercentage = trapmfL(0.6, 0.7);
        const uHalfPercentage = trapmf(0.3, 0.4, 0.6, 0.7);

        const uPercentages: SummaryVariableOptionPair<MembershipFunction>[] = [
          ['most', uMostPercentage],
          ['half', uHalfPercentage],
        ];

        const uDiffs: SummaryVariableOptionPair<PointMembershipFunction<TimeSeriesPoint>>[] = [
          ['more than', uHigherDiff],
          ['similar to', uSimilarDiff],
          ['fewer than', uLowerDiff],
        ];

        const summaries: Summary[] = [];
        for (const [quantifier, uPercentage] of uPercentages) {
          for (const [diffDescriptor, uDiff] of uDiffs) {
            const validity = sigmaCountQA(points, uPercentage, uDiff);
            summaries.push({
              text: `In <b>${quantifier}</b> of the weeks, weekdays have ${metric} <b>${diffDescriptor}</b> weekends.`,
              validity,
            });
          }
        }

        return [{
          title: 'Weekday Weekend Relative',
          summaries
        }];
      }));
  }
}
