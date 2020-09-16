
import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, map } from 'rxjs/operators';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { TimeSeriesPoint } from 'src/datasets/metas/types';

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

  pointsByLabels$(labels: string[]): Observable<Point[][]> {
    return this.data$
      .pipe(map(data =>
        data
          .filter(datum => labels.includes(datum.label))
          .map(datum => datum.points)
      ))
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
