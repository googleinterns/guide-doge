import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged, pluck, filter, map, shareReplay } from 'rxjs/operators';
import { asyncScheduler, BehaviorSubject, Subject, Observable, Observer, zip } from 'rxjs';
import { datasets } from '../../datasets';
import { Dataset } from '../../datasets/types';
import { PreferenceItemMeta } from '../preference/types';
import { SummarizationControlService } from './summarization-control.service';
import { SummarizationService } from './summarization.service';
import { SummaryGroup } from './types';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import {
  MembershipFunction,
  trapmf,
  trapmfL,
  trapmfR,
  sigmaCountQA,
} from '../../datasets/summarizations/libs/protoform';
import {
  linearRegression,
  centeredMovingAverage,
  additiveDecomposition,
} from '../../datasets/summarizations/libs/trend';
import {
  timeSeriesPointToNumPoint,
  groupPointsByXWeek,
} from '../../datasets/summarizations/utils/time-series';
import {
  normalizePoints,
  normalizePointsY,
} from '../../datasets/summarizations/utils/commons';
import { sum } from '../../utils/misc';
import { formatY } from '../../utils/formatters';

const summarizationName = 'WeekdayWeekendRelativeService';

export type WeekdayWeekendRelativeConfig = {};

export type WeekdayWeekendRelativeProperties = {
  weekdayWeekendEqualValidity
};

export type WeekdayWeekendRelativeTemplate = {};

const defaultConfig = {

};

const defaultTemplate = {

};

@Injectable({
  providedIn: 'any',
})
export class WeekdayWeekendRelativeSummarizationService extends
  SummarizationService<WeekdayWeekendRelativeProperties, WeekdayWeekendRelativeConfig, WeekdayWeekendRelativeTemplate>  {

  constructor(
    private summarizationControlService: SummarizationControlService,
  ) {
    super();
    this.summarizationControlService.register('WeekdayWeekendRelative', this.summaries$.bind(this));
    console.log(`${summarizationName} created`);
  }

  prepareConfig(config: Partial<WeekdayWeekendRelativeConfig>): WeekdayWeekendRelativeConfig {
    return config;
  }

  prepareTemplate(template: Partial<WeekdayWeekendRelativeTemplate>): WeekdayWeekendRelativeTemplate {
    return template;
  }

  _properties$(config: Partial<WeekdayWeekendRelativeConfig>): Observable<WeekdayWeekendRelativeProperties> {
    const observable =
      this.summarizationControlService.data$
        .pipe(map((p) => {
          const points: TimeSeriesPoint[] = p[0].points;
          console.log(`${summarizationName} get data:`, points);
          console.log(`${summarizationName} processing...`);

          const normalizedYPoints = normalizePointsY(points);

          const centeredMovingAverageHalfWindowSize = 4;
          const normalizedTrendPoints = centeredMovingAverage(normalizedYPoints, centeredMovingAverageHalfWindowSize);
          const {
            seasonPoints: normalizedSeasonPoints,
          } = additiveDecomposition(normalizedYPoints, normalizedTrendPoints, ({ x }) => x.getDay());

          const uWeekend = (p: TimeSeriesPoint) => p.x.getDay() === 5 ? 0.2 : +(p.x.getDay() === 0 || p.x.getDay() === 6);
          const uWeekday = (p: TimeSeriesPoint) => 1 - uWeekend(p);

          const isWeekend = (p: TimeSeriesPoint) => uWeekend(p) > 0.5;
          const isWeekday = (p: TimeSeriesPoint) => uWeekday(p) > 0.5;

          // Only consider weeks with more than 3 days when creating summaries
          // Weeks with 3 days or less are considered to belong to last/next 30 days
          const normalizedSeasonWeekPointArrays = groupPointsByXWeek(normalizedSeasonPoints).filter(weekPoints => weekPoints.length >= 4);

          const weekdayWeekendDiffPoints = normalizedSeasonWeekPointArrays.map(weekPoints => {
            const week = weekPoints[0].x;
            const weekdayPoints = weekPoints.filter(isWeekday);
            const weekendPoints = weekPoints.filter(isWeekend);
            const weekdayPointsYSum = sum(weekdayPoints.map(({ y }) => y));
            const weekendPointsYSum = sum(weekdayPoints.map(({ y }) => y));

            if (weekdayPoints.length === 0 || weekendPoints.length === 0) {
              return { x: week, y: -1 };
            } else {
              const weekdayPointsYAverage = weekdayPointsYSum / weekdayPoints.length;
              const weekendPointsYAverage = weekendPointsYSum / weekendPoints.length;
              const weekdayWeekendDiff = Math.abs(weekdayPointsYAverage - weekendPointsYAverage);
              return { x: week, y: weekdayWeekendDiff };
            }
          }).filter(({ y }) => y >= 0);

          const uMostPercentage = trapmfL(0.6, 0.7);
          const uEqualDiff = ({ y }) => trapmfR(0.05, 0.1)(y);
          const weekdayWeekendEqualValidity = sigmaCountQA(weekdayWeekendDiffPoints, uMostPercentage, uEqualDiff);

          return {
            weekdayWeekendEqualValidity,
          };
        }))
        .pipe(shareReplay(1));

    return observable;
  }

  _summaries$(
    config: Partial<WeekdayWeekendRelativeConfig>,
    template: Partial<WeekdayWeekendRelativeTemplate>): Observable<SummaryGroup[]> {
    const observable = zip(
      this.summarizationControlService.data$,
    )
      .pipe(map(v => {
        console.log(`${summarizationName} get data:`, v);
        console.log(`${summarizationName} processing...`);
        return [];
      }))
      .pipe(shareReplay(1));
    return observable;
  }
}
