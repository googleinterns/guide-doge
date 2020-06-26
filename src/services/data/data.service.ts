import {
  activeUserMeasure,
  browserCategory,
  countryCategory,
  eventCountMeasure,
  revenueMeasure,
  sourceCategory,
} from '../../models/data-cube/presets';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { betweenDates, inOneOfDateRanges } from '../../models/data-cube/filters';
import { generateCube } from 'src/models/data-cube/generation';
import { OnDestroy } from '@angular/core';
import { map, takeUntil, throttleTime } from 'rxjs/operators';
import { asyncScheduler, combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { PreferenceService } from '../preference/preference.service';
import { TimeSeriesQueryOptions, TimeSeriesWithComparisonQueryOptions } from './types';
import { QueryOptions, ResultRow } from '../../models/data-cube/types';

export class DataService implements OnDestroy {
  private dataCube$ = new ReplaySubject<DataCube>(1);
  private destroy$ = new Subject();

  constructor(private preferenceService: PreferenceService) {
    const categories = [countryCategory, browserCategory, sourceCategory];
    const measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];
    const defaultSettings = {
      avgHits: 10000,
      hitStdDev: 100,
      avgUsers: 100,
      userStdDev: 1,
      avgSessionsPerUser: 5,
      sessionsPerUserStdDev: 3,
    };

    this.preferenceService.data$
      .pipe(takeUntil(this.destroy$))
      .pipe(throttleTime(500, asyncScheduler, { leading: true, trailing: true }))
      .subscribe(preference => {
        this.dataCube$.next(generateCube(
          categories,
          measures,
          {
            ...defaultSettings,
            ...preference,
          }));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  observeData(queryOptions$: Observable<QueryOptions>) {
    return combineLatest([this.dataCube$, queryOptions$])
      .pipe(map(([dataCube, queryOptions]) => {
        return dataCube.getDataFor(queryOptions);
      }));
  }

  observeTimeSeries(timeSeriesQueryOptions$: Observable<TimeSeriesQueryOptions>) {
    const queryOptions$: Observable<QueryOptions> = timeSeriesQueryOptions$
      .pipe(map(queryOptions => {
        const {
          startDate, endDate,
          categoryNames = [], filters = [], sortBy = [],
          ...restOptions
        } = queryOptions;
        const categoryName = 'date';
        const dateFilter = betweenDates(startDate, endDate, { excludeStart: true });
        return {
          ...restOptions,
          categoryNames: [categoryName, ...categoryNames],
          filters: [dateFilter, ...filters],
          sortBy: [categoryName, ...sortBy],
        };
      }));
    return this.observeData(queryOptions$);
  }

  observeTimeSeriesWithComparison(queryOptions$: Observable<TimeSeriesWithComparisonQueryOptions>) {
    return combineLatest([this.dataCube$, queryOptions$])
      .pipe(map(([dataCube, queryOptions]) => {
        const {
          startDate, endDate,
          rollingUnits = [], periodOverPeriods = [],
          categoryNames = [], measureNames = [], filters = [], sortBy = [],
          ...restOptions
        } = queryOptions;

        const categoryName = 'date';
        const duration = endDate.getTime() - startDate.getTime();
        const maxRollingUnit = Math.max(0, ...rollingUnits);
        const dateRanges: [Date, Date][] = [0, ...periodOverPeriods].map(periodOffset => {
          const periodStart = startDate.getTime() + periodOffset;
          const rangeStartDate = new Date(periodStart - maxRollingUnit);
          const rangeEndDate = new Date(periodStart + duration);
          return [rangeStartDate, rangeEndDate];
        });
        const dateFilter = inOneOfDateRanges(dateRanges, { excludeStart: true });

        const rawData = dataCube.getDataFor({
          ...restOptions,
          categoryNames: [categoryName, ...categoryNames],
          measureNames,
          filters: [dateFilter, ...filters],
          sortBy: [categoryName, ...sortBy],
        });
        const data = rawData.filter(datum => {
          const { date } = datum.categories;
          return startDate < date && date <= endDate;
        });

        for (const measureName of measureNames) {
          for (const rollingUnit of rollingUnits) {
            this.attachRollingMeasure(rawData, data, measureName, rollingUnit);
          }
          for (const periodOffset of periodOverPeriods) {
            this.attachPeriodOverPeriodMeasure(rawData, data, measureName, periodOffset);
          }
        }

        return data;
      }));
  }

  private attachRollingMeasure(rawData: ResultRow[], data: ResultRow[], measureName: string, rollingUnit: number) {
    const newMeasureName = `${measureName}-rolling-${rollingUnit}`;
    const [headDatum, ...tailData] = data;

    // pre-calculate the sum of the window for the very first datum
    const rollingStart = headDatum.categories.date.getTime() - rollingUnit;
    let startIndex = rawData.findIndex(datum => rollingStart < datum.categories.date.getTime());
    if (startIndex < 0) {
      return;
    }
    let endIndex = rawData.indexOf(headDatum);
    let sum = rawData
      .slice(startIndex, endIndex + 1)
      .reduce((acc, datum) => acc + datum.values[measureName], 0);
    headDatum.values[newMeasureName] = sum;

    // slide the window for the rest of the data
    for (const datum of tailData) {
      sum += rawData[++endIndex].values[measureName];
      sum -= rawData[startIndex++].values[measureName];
      datum.values[newMeasureName] = sum;
    }
  }

  private attachPeriodOverPeriodMeasure(rawData: ResultRow[], data: ResultRow[], measureName: string, periodOffset: number) {
    const newMeasureName = `${measureName}-pop-${periodOffset}`;
    const [headDatum, ...tailData] = data;

    // find the corresponding datum to the very first datum
    const periodStart = headDatum.categories.date.getTime() + periodOffset;
    let index = rawData.findIndex(datum => periodStart === datum.categories.date.getTime());
    if (index < 0) {
      return;
    }
    headDatum.values[newMeasureName] = rawData[index].values[measureName];

    // slide the corresponding datum for the rest of the data
    for (const datum of tailData) {
      datum.values[newMeasureName] = rawData[++index].values[measureName];
    }
  }
}
