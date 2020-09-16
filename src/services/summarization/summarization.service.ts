import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged, pluck, filter, map, shareReplay } from 'rxjs/operators';
import { asyncScheduler, BehaviorSubject, Subject, Observable, Observer, zip } from 'rxjs';
import { datasets } from '../../datasets';
import { Dataset } from '../../datasets/types';
import { PreferenceItemMeta } from '../preference/types';
import { SummarizationDataSourceService, Point } from './summarization-data-source.service';
import { SummaryGroup } from './types';

export interface BaseConfig {
  datumLabels: string[];
}

@Injectable({
  providedIn: 'any',
})
export abstract class SummarizationService<PointT extends Point, PropertiesT, ConfigT extends BaseConfig> implements OnDestroy {
  destroy$ = new Subject();
  cachedProperties$ = new Map<string, Observable<PropertiesT>>();
  cachedSummaries$ = new Map<string, Observable<SummaryGroup[]>>();

  hashObject(obj: Record<string, any>): string {
    return JSON.stringify(obj, Object.keys(obj).sort());
  }

  summaries$(rawConfig: BaseConfig & Partial<ConfigT>): Observable<SummaryGroup[]> {
    const config = this.prepareConfig(rawConfig);
    const hashKey = this.hashObject(rawConfig);

    if (!this.cachedSummaries$.has(hashKey)) {
      const observable = this.createSummaries$(config)
        .pipe(shareReplay(1))
        .pipe(takeUntil(this.destroy$));
      this.cachedSummaries$.set(hashKey, observable);
    }

    return this.cachedSummaries$.get(hashKey) as Observable<SummaryGroup[]>;
  }

  properties$(rawConfig: BaseConfig & Partial<ConfigT>): Observable<PropertiesT> {
    const config = this.prepareConfig(rawConfig);

    const hashKey = this.hashObject(rawConfig);
    if (!this.cachedProperties$.has(hashKey)) {
      const observable = this.createProperties$(config)
        .pipe(shareReplay(1))
        .pipe(takeUntil(this.destroy$));
      this.cachedProperties$.set(hashKey, observable);
    }
    return this.cachedProperties$.get(hashKey) as Observable<PropertiesT>;
  }

  // abstract prepareConfig(config: Partial<Config>): Config;
  // abstract prepareTemplate(template: Partial<Template>): Template;
  prepareConfig(config: Partial<ConfigT>): ConfigT { return config as ConfigT; }
  abstract createSummaries$(config: ConfigT): Observable<SummaryGroup[]>;
  abstract createProperties$(config: ConfigT): Observable<PropertiesT>;


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
