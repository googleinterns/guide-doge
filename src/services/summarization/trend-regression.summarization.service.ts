import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged, pluck, filter, map, shareReplay } from 'rxjs/operators';
import { asyncScheduler, BehaviorSubject, Subject, Observable, Observer, zip } from 'rxjs';
import { datasets } from '../../datasets';
import { Dataset } from '../../datasets/types';
import { PreferenceItemMeta } from '../preference/types';
import { SummarizationControlService } from './summarization-control.service';
import { WeekdayWeekendRelativeSummarizationService, WeekdayWeekendRelativeProperties } from './weekday-weekend-relative.summarization.service';
import { SummarizationService } from './summarization.service';
import { SummaryGroup, Summary } from './types';
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

const summarizationName = 'TrendRegressionSummarizationService';

export type TrendRegressionConfig = {};

export type TrendRegressionProperties = {};

export type TrendRegressionTemplate = {};

const defaultConfig = {

};

const defaultTemplate = {

};

@Injectable({
  providedIn: 'any',
})
export class TrendRegressionSummarizationService extends
  SummarizationService<TrendRegressionProperties, TrendRegressionConfig, TrendRegressionTemplate>  {

  constructor(
    private summarizationControlService: SummarizationControlService,
    private weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService
  ) {
    super();
    this.summarizationControlService.register('TrendRegression', this.summaries$.bind(this));
    console.log(`${summarizationName} created`);
  }

  prepareConfig(config: Partial<TrendRegressionConfig>): TrendRegressionConfig {
    return config;
  }

  prepareTemplate(template: Partial<TrendRegressionTemplate>): TrendRegressionTemplate {
    return template;
  }

  _properties$(config: Partial<TrendRegressionConfig>): Observable<TrendRegressionProperties> {
    const observable = zip(
      this.summarizationControlService.data$,
      this.weekdayWeekendRelativeSummarizationService.properties$(config),
    )
      .pipe(map(v => {
        console.log(`${summarizationName} get data:`, v);
        console.log(`${summarizationName} processing...`);
        return {};
      }))
      .pipe(shareReplay(1));

    return observable;
  }

  _summaries$(config: Partial<TrendRegressionConfig>, template: Partial<TrendRegressionTemplate>): Observable<SummaryGroup[]> {
    const observable = zip(
      this.summarizationControlService.data$,
      this.weekdayWeekendRelativeSummarizationService.properties$(config),
    )
      .pipe(map((
        [p, { weekdayWeekendEqualValidity }]: [any, WeekdayWeekendRelativeProperties]
      ) => {
        const points: TimeSeriesPoint[] = p[0].points;
        console.log(`${summarizationName} get data:`, points);
        console.log(`${summarizationName} processing...`);

        const uWeekend = (p: TimeSeriesPoint) => p.x.getDay() === 5 ? 0.2 : +(p.x.getDay() === 0 || p.x.getDay() === 6);
        const uWeekday = (p: TimeSeriesPoint) => 1 - uWeekend(p);

        const isWeekend = (p: TimeSeriesPoint) => uWeekend(p) > 0.5;
        const isWeekday = (p: TimeSeriesPoint) => uWeekday(p) > 0.5;

        const ANGMX = Math.PI / 2;
        const uQuicklyIncreasingLinearTrend = trapmfL(ANGMX / 2, ANGMX * 5 / 8);
        const uIncreasingLinearTrend = trapmf(ANGMX / 16, ANGMX / 8, ANGMX / 2, ANGMX * 5 / 8);
        const uConstantLinearTrend = trapmf(-ANGMX / 8, -ANGMX / 16, ANGMX / 16, ANGMX / 8);
        const uDecreasingLinearTrend = trapmf(-ANGMX * 5 / 8, -ANGMX / 2, -ANGMX / 8, -ANGMX / 16);
        const uQuicklyDecreasingLinearTrend = trapmfR(-ANGMX * 5 / 8, -ANGMX / 2);

        const uSmallRegressionStd = trapmfR(0.09, 0.14);

        const uLinearTrends: [string, MembershipFunction][] = [
          ['quickly increasing', uQuicklyIncreasingLinearTrend],
          ['increasing', uIncreasingLinearTrend],
          ['constant', uConstantLinearTrend],
          ['decreasing', uDecreasingLinearTrend],
          ['quickly decreasing', uQuicklyDecreasingLinearTrend],
        ];

        // TODO: Move denormalization information to normalization utils
        const ymin = 0;
        const ymax = Math.max(...points.map(({ y }) => y));
        const xdiff = 800 / 500 / points.length;
        const denormalizeGradient = g => (g * xdiff) * (ymax - ymin) - ymin;

        const normalizedPoints = normalizePoints(points.map(timeSeriesPointToNumPoint));
        const weekdayNormalizedPoints = normalizedPoints.filter((_, i) => isWeekday(points[i]));
        const weekendNormalizedPoints = normalizedPoints.filter((_, i) => isWeekend(points[i]));

        const overallLinearModel = linearRegression(normalizedPoints);
        const overallLinearTrendValidity = uSmallRegressionStd(overallLinearModel.errorStd);

        const weekdayLinearModel = linearRegression(weekdayNormalizedPoints);
        const weekdayLinearTrendValidity = uSmallRegressionStd(weekdayLinearModel.errorStd);

        const weekendLinearModel = linearRegression(weekendNormalizedPoints);
        const weekendLinearTrendValidity = uSmallRegressionStd(weekendLinearModel.errorStd);

        const overallLinearTrendSummariesValidity = weekdayWeekendEqualValidity;

        const summaries: Summary[] = [];
        for (const [linearTrend, uLinearTrend] of uLinearTrends) {
          const validity = Math.min(
            overallLinearTrendSummariesValidity,
            overallLinearTrendValidity,
            uLinearTrend(overallLinearModel.gradientAngleRad),
          );
          const rate = denormalizeGradient(overallLinearModel.gradient);
          const rateAbsolute = Math.abs(rate);

          let text;
          if (linearTrend === 'constant') {
            text = `The <b>overall</b> active users <b>remained similar</b>.`;
          } else {
            text = `The <b>overall</b> active users was <b>linearly ${linearTrend}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
          }
          summaries.push({
            validity,
            text,
          });
        }

        for (const [linearTrend, uLinearTrend] of uLinearTrends) {
          const validity = Math.min(
            1.0 - overallLinearTrendSummariesValidity,
            weekdayLinearTrendValidity,
            uLinearTrend(weekdayLinearModel.gradientAngleRad),
          );
          const rate = denormalizeGradient(weekdayLinearModel.gradient);
          const rateAbsolute = Math.abs(rate);

          let text;
          if (linearTrend === 'constant') {
            text = `The active users <b>of weekdays</b> <b>remained similar</b>.`;
          } else {
            text = `The active users <b>of weekdays</b> was <b>linearly ${linearTrend}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
          }
          summaries.push({
            validity,
            text,
          });
        }

        for (const [linearTrend, uLinearTrend] of uLinearTrends) {
          const validity = Math.min(
            1.0 - overallLinearTrendSummariesValidity,
            weekendLinearTrendValidity,
            uLinearTrend(weekendLinearModel.gradientAngleRad),
          );
          const rate = denormalizeGradient(weekendLinearModel.gradient);
          const rateAbsolute = Math.abs(rate);

          let text;
          if (linearTrend === 'constant') {
            text = `The active users <b>of weekends</b> <b>remained similar</b>.`;
          } else {
            text = `The active users <b>of weekends</b> was <b>linearly ${linearTrend}</b> by <b>${formatY(rateAbsolute)}</b> users per day.`;
          }
          summaries.push({
            validity,
            text,
          });
        }

        return [{
          name: 'Trend Regression',
          summaries
        }];
      }))
      .pipe(shareReplay(1));

    return observable;
  }
}
