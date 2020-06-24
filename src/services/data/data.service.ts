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
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class DataService implements OnDestroy {
  private dataCube$ = new BehaviorSubject<DataCube>(generateCube(
    [countryCategory, browserCategory, sourceCategory],
    [activeUserMeasure, revenueMeasure, eventCountMeasure],
    {
      avgHits: 10000,
      hitStdDev: 100,
      avgUsers: 100,
      userStdDev: 1,
      avgSessionsPerUser: 5,
      sessionsPerUserStdDev: 3,
    },
  ));
  private destroy$ = new Subject();

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
