import { DateTime } from 'luxon';
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
import { Injectable, OnDestroy } from '@angular/core';
import { map, takeUntil, throttleTime } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';
import { PreferenceService } from '../preference/preference.service';
@Injectable()
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
      sessionsPerUserStdDev: 3
    };

    this.preferenceService.data$
      .pipe(takeUntil(this.destroy$))
      .pipe(throttleTime(1000))
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

  getMeasureOverDays(measureName: string, days = 30) {
    const categoryName = 'nthDay';
    const endDate = DateTime.local();
    const startDate = endDate.minus({ day: days });

    return this.dataCube$.pipe(
      map(dataCube => dataCube
        .getDataFor(
          [categoryName],
          [measureName],
          [betweenDates(startDate.toJSDate(), endDate.toJSDate())],
        )
        .map(row => ({
          date: startDate
            .plus({ days: row.categories.get(categoryName) as number })
            .toJSDate(),
          value: row.values.get(measureName)!,
        })))
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
