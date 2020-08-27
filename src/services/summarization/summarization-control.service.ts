import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged, pluck, filter, map } from 'rxjs/operators';
import { asyncScheduler, ReplaySubject, Subject, Observable, Observer, of, zip } from 'rxjs';
import { datasets } from '../../datasets';
import { Dataset } from '../../datasets/types';
import { SummaryGroup, SummarizationMeta } from './types';

@Injectable({
  providedIn: 'any',
})
export class SummarizationControlService implements OnDestroy {
  public data$ = new ReplaySubject<any[]>(1);
  private summarizationServicesSummaries$ = new Map<string, (config: any, template: any) => Observable<SummaryGroup[]>>();
  private destroy$ = new Subject();

  constructor() {
    console.log('SummarizationControlService created');
    this.data$.subscribe((e) => {
      console.log('ControlService get data::', e);
    });
  }

  register(summarizationName: string, summaries$: (config: any, template: any) => Observable<SummaryGroup[]>) {
    this.summarizationServicesSummaries$.set(summarizationName, summaries$);
  }

  summaries$(summarizationMetas: SummarizationMeta[]): Observable<SummaryGroup[]> {
    const summariesObservables: Observable<SummaryGroup[]>[] = summarizationMetas.map((meta) => {
      const {
        summarizationName,
        config = {},
        template = {},
      } = meta;

      if (this.summarizationServicesSummaries$.has(summarizationName)) {
        const summaries$
          = (this.summarizationServicesSummaries$.get(summarizationName) as (config: any, template: any) => Observable<SummaryGroup[]>);
        return summaries$(config, template);
      } else {
        return of([]);
      }
    });

    return zip(...summariesObservables).pipe(map(summaryGroups => summaryGroups.flat()));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
