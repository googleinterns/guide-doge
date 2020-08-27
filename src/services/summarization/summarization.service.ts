import { OnDestroy, Injectable } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged, pluck, filter, map, shareReplay } from 'rxjs/operators';
import { asyncScheduler, BehaviorSubject, Subject, Observable, Observer, zip } from 'rxjs';
import { datasets } from '../../datasets';
import { Dataset } from '../../datasets/types';
import { PreferenceItemMeta } from '../preference/types';
import { SummarizationControlService } from './summarization-control.service';
import { SummaryGroup } from './types';

@Injectable({
  providedIn: 'any',
})
export abstract class SummarizationService<Properties, Config, Template> implements OnDestroy {
  destroy$ = new Subject();
  cachedProperties$ = new Map<string, Observable<Properties>>();
  cachedSummaries$ = new Map<string, Observable<SummaryGroup[]>>();

  hashObject(obj: Record<string, any>): string {
    return JSON.stringify(obj, Object.keys(obj).sort());
  }

  summaries$(rawConfig: Partial<Config>, rawTemplate: Partial<Template>): Observable<SummaryGroup[]> {
    const config = this.prepareConfig(rawConfig);
    const template = this.prepareTemplate(rawTemplate);

    const hashKey = this.hashObject({ config, template });
    if (!this.cachedSummaries$.has(hashKey)) {
      const observable = this._summaries$(rawConfig, rawTemplate).pipe(takeUntil(this.destroy$));
      this.cachedSummaries$.set(hashKey, observable);
    }
    return this.cachedSummaries$.get(hashKey) as Observable<SummaryGroup[]>;
  }

  properties$(rawConfig: Partial<Config>): Observable<Properties> {
    const config = this.prepareConfig(rawConfig);

    const hashKey = this.hashObject(config);
    if (!this.cachedProperties$.has(hashKey)) {
      const observable = this._properties$(rawConfig).pipe(takeUntil(this.destroy$));
      this.cachedProperties$.set(hashKey, observable);
    }
    return this.cachedProperties$.get(hashKey) as Observable<Properties>;
  }

  // abstract prepareConfig(config: Partial<Config>): Config;
  // abstract prepareTemplate(template: Partial<Template>): Template;
  prepareConfig(config: Partial<Config>): Config { return config as Config; }
  prepareTemplate(template: Partial<Template>): Template { return template as Template; }
  abstract _summaries$(config: Partial<Config>, template: Partial<Template>): Observable<SummaryGroup[]>;
  abstract _properties$(config: Partial<Config>): Observable<Properties>;


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
