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
import { BehaviorSubject, ReplaySubject, Subject, asyncScheduler, combineLatest } from 'rxjs';
import { PreferenceService } from '../preference/preference.service';
import { DataQueryOptions, TimeSeriesQueryOptions } from './types';

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

  observeData(queryOptions: DataQueryOptions) {
    const {
      categoryNames$ = new BehaviorSubject([]),
      measureNames$ = new BehaviorSubject([]),
      filters$ = new BehaviorSubject(undefined),
      sortBy$ = new BehaviorSubject(undefined),
    } = queryOptions;
    return combineLatest([this.dataCube$, categoryNames$, measureNames$, filters$, sortBy$])
      .pipe(map(([dataCube, categoryNames, measureNames, filters, sortBy]) => {
        return dataCube.getDataFor(categoryNames, measureNames, filters, sortBy);
      }));
  }

  observeTimeSeries(queryOptions: TimeSeriesQueryOptions) {
    const {
      dateRange$,
      categoryNames$ = new BehaviorSubject([]),
      measureNames$ = new BehaviorSubject([]),
      filters$ = new BehaviorSubject(undefined),
      sortBy$ = new BehaviorSubject(undefined),
    } = queryOptions;
    return combineLatest([this.dataCube$, dateRange$, categoryNames$, measureNames$, filters$, sortBy$])
      .pipe(map(([dataCube, dateRange, categoryNames, measureNames, filters, sortBy]) => {
        const [startDate, endDate] = dateRange;
        const categoryName = 'date';
        const dateFilter = betweenDates(startDate, endDate);
        return dataCube.getDataFor(
          [categoryName, ...categoryNames],
          measureNames,
          [dateFilter, ...(filters ?? [])],
          sortBy,
        );
      }));
  }
}
