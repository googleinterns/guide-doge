import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, shareReplay } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Point } from './summarization-data-source.service';
import { SummaryGroup } from './types';

export interface BaseConfig {
  /* The target labels of datums to create summaries */
  datumLabels: string[];
}

@Injectable({
  providedIn: 'any',
})
export abstract class SummarizationService<PointT extends Point, PropertiesT, ConfigT extends BaseConfig> implements OnDestroy {
  destroy$ = new Subject();
  cachedDataProperties$ = new Map<string, Observable<PropertiesT>>();
  cachedSummaries$ = new Map<string, Observable<SummaryGroup[]>>();

  protected hashObject(obj: Record<string, any>): string {
    return JSON.stringify(obj, Object.keys(obj).sort());
  }

  /**
   * Create the summaries in rxjs.Observable. The summaries are wrapped in summary group.
   * The creation of summaries depends on the data properties in the same summarization service.
   * It can also depend on the data and data properties from other summarization services.
   *
   * @param rawConfig The config for summarizations. `datumLabels` must be provided
   * in the config. The config will be propagated to all dependent summarization services.
   */
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

  /**
   * Create the summarization related data properties in rxjs.Observable. Data properties are
   * the intermediate computational results that are going to be used when creating the summaries.
   * It can also be reused and shared with other summarization services. The compuration of
   * data properties may depend on the data and data properties from other smumarization services.
   *
   * @param rawConfig The config for summarizations. `datumLabels` must be provided
   * in the config. The config will be propagated to all dependent summarization services.
   */
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
