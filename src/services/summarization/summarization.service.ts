import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, shareReplay } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Point } from './summarization-data-source.service';
import { SummaryGroup } from './types';

export interface BaseConfig {
  datumLabels: string[];
}

@Injectable({
  providedIn: 'any',
})
export abstract class SummarizationService<PointT extends Point, PropertiesT, ConfigT extends BaseConfig> implements OnDestroy {
  destroy$ = new Subject();
  cachedDataProperties$ = new Map<string, Observable<PropertiesT>>();
  cachedSummaries$ = new Map<string, Observable<SummaryGroup[]>>();

  hashObject(obj: Record<string, any>): string {
    return JSON.stringify(obj, Object.keys(obj).sort());
  }

  summaries$(rawConfig: BaseConfig & Partial<ConfigT>): Observable<SummaryGroup[]> {
    const config = this.prepareConfig(rawConfig);
    const hashKey = this.hashObject(config);

    if (!this.cachedSummaries$.has(hashKey)) {
      const summariesObservable = this.createSummaries$(config)
        .pipe(shareReplay(1))
        .pipe(takeUntil(this.destroy$));
      this.cachedSummaries$.set(hashKey, summariesObservable);
    }

    return this.cachedSummaries$.get(hashKey) as Observable<SummaryGroup[]>;
  }

  dataProperties$(rawConfig: BaseConfig & Partial<ConfigT>): Observable<PropertiesT> {
    const config = this.prepareConfig(rawConfig);
    const hashKey = this.hashObject(config);

    if (!this.cachedDataProperties$.has(hashKey)) {
      const dataPropertiesObservable = this.createDataProperties$(config)
        .pipe(shareReplay(1))
        .pipe(takeUntil(this.destroy$));
      this.cachedDataProperties$.set(hashKey, dataPropertiesObservable);
    }
    return this.cachedDataProperties$.get(hashKey) as Observable<PropertiesT>;
  }

  prepareConfig(config: Partial<ConfigT>): ConfigT { return config as ConfigT; }
  abstract createSummaries$(config: ConfigT): Observable<SummaryGroup[]>;
  abstract createDataProperties$(config: ConfigT): Observable<PropertiesT>;


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
