import {
  activeUserMeasure,
  browserCategory,
  countryCategory,
  eventCountMeasure,
  revenueMeasure,
  sourceCategory,
} from '../../models/data-cube/presets';
import { DataCube } from '../../models/data-cube/data-cube.model';
import { betweenDates } from '../../models/data-cube/filters';
import { generateCube } from 'src/models/data-cube/generation';
import { OnDestroy } from '@angular/core';
import { map, takeUntil, throttleTime } from 'rxjs/operators';
import { asyncScheduler, combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { PreferenceService } from '../preference/preference.service';
import { TimeSeriesQueryOptions } from './types';
import { QueryOptions } from '../../models/data-cube/types';

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
        const dateFilter = betweenDates(startDate, endDate);
        return {
          ...restOptions,
          categoryNames: [categoryName, ...categoryNames],
          filters: [dateFilter, ...filters],
          sortBy: [categoryName, ...sortBy],
        };
      }));
    return this.observeData(queryOptions$);
  }
}
