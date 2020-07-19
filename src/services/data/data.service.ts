import { OnDestroy } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged, pluck, filter, map } from 'rxjs/operators';
import { asyncScheduler, ReplaySubject, Subject } from 'rxjs';
import { PreferenceService } from '../preference/preference.service';
import { datasets } from '../../datasets';
import { Dataset } from '../../datasets/types';
import { createDefault } from '../../utils/preferences';

export class DataService implements OnDestroy {
  public dataset$ = new ReplaySubject<Dataset>(1);
  private destroy$ = new Subject();


  constructor(private preferenceService: PreferenceService) {
    this.preferenceService.dataset$
      .pipe(takeUntil(this.destroy$))
      .pipe(throttleTime(500, asyncScheduler, { leading: true, trailing: true }))
      .pipe(filter(preference => preference.name === preference._meta_name))
      .pipe(distinctUntilChanged((prev, curr) => Object.keys(curr._meta).every(k => prev[k] === curr[k])))
      .subscribe(preference => {
        this.dataset$.next(datasets[preference.name].create(preference));
      });

    const datasetNames = Object.keys(datasets);
    const defaultDatasetName = Object.keys(datasets)[0];
    this.preferenceService.dataset$
      .pipe(takeUntil(this.destroy$))
      .pipe(pluck('name'))
      .pipe(map(name => name ?? defaultDatasetName))
      .pipe(distinctUntilChanged())
      .subscribe(name => {
        const meta = {
          enabled: {
            type: 'boolean',
            defaultValue: true,
          },
          name: {
            type: 'select',
            defaultValue: defaultDatasetName,
            options: datasetNames,
          },
          ...datasets[name].configMeta,
        };

        this.preferenceService.dataset$.next({
          ...createDefault(meta),
          name,
          _meta: meta,
          _meta_name: name,
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
