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
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { PreferenceService } from '../preference/preference.service';
import { DataQueryOptions, TimeSeriesQueryOptions } from './types';

export class DataService implements OnDestroy {
  private static categories = [countryCategory, browserCategory, sourceCategory];
  private static measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];
  private static settings = {
    avgHits: 10000,
    hitStdDev: 100,
    avgUsers: 100,
    userStdDev: 1,
    avgSessionsPerUser: 5,
    sessionsPerUserStdDev: 3,
  };

  private dataCube$ = new BehaviorSubject<DataCube>(generateCube(
    DataService.categories,
    DataService.measures,
    DataService.settings,
  ));
  private destroy$ = new Subject();

  constructor(private preferenceService: PreferenceService) {
    this.preferenceService.data$
      .pipe(takeUntil(this.destroy$))
      .pipe(throttleTime(1000))
      .subscribe(preference => {
        this.dataCube$.next(generateCube(
          DataService.categories,
          DataService.measures,
          {
            ...DataService.settings,
            ...preference,
          },
        ));
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
