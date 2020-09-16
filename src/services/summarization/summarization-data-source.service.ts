
import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged, pluck, filter, map } from 'rxjs/operators';
import { asyncScheduler, ReplaySubject, Subject, Observable, Observer, of, zip } from 'rxjs';
import { datasets } from '../../datasets';
import { Dataset } from '../../datasets/types';
import { SummaryGroup, SummarizationMeta } from './types';
import { TimeSeriesPoint } from 'src/datasets/metas/types';
import { TimeSeriesDatum } from 'src/datasets/queries/time-series.query';

export type Point = TimeSeriesPoint;

export interface Data {
  label: string;
  points: Point[];
}

@Injectable({
  providedIn: 'any',
})
export class SummarizationDataSourceService implements OnDestroy {
  public data$ = new ReplaySubject<Data[]>(1);
  private destroy$ = new Subject();

  constructor() {
    console.log('SummarizationControlService created');
    this.data$.subscribe((e) => {
      console.log('ControlService get data::', e);
    });
  }

  pointsByLabels$(labels: string[]): Observable<Point[][]> {
    return this.data$.pipe(map(data =>
      data
        .filter(datum => labels.includes(datum.label))
        .map(datum => datum.points)
    ));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
