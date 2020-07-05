import { OnDestroy } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged, pluck, filter, map } from 'rxjs/operators';
import { asyncScheduler, ReplaySubject, Subject } from 'rxjs';
import { PreferenceService } from '../preference/preference.service';
import { datasets } from '../../datasets';
import { Dataset } from '../../datasets/types';
import { createDefault } from '../../utils/preferences';
import { PreferenceItemMeta } from '../preference/types';

export class DataService implements OnDestroy {
  static;

  public dataset$ = new ReplaySubject<Dataset>(1);
  private destroy$ = new Subject();


  constructor(private preferenceService: PreferenceService) {
    this.preferenceService.dataset$
      .pipe(takeUntil(this.destroy$))
      .pipe(throttleTime(500, asyncScheduler, { leading: true, trailing: true }))
      .pipe(filter(preference => {
        if (!(preference.name in datasets)) {
          return false;
        } else {
          const dataset = datasets[preference.name];
          return (Object.entries(dataset.configMeta) as [string, PreferenceItemMeta][])
          .every(([key, meta]) => {
            if (!(key in preference)) {
              return false;
            } else if (meta.type === 'select') {
              return dataset.configMeta[key].options.includes(preference[key]);
            } else {
              return typeof preference[key] === meta.type;
            }
          });
        }
      }))
      // TODO: Deep object comparison
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe(preference => {
        this.dataset$.next(datasets[preference.name].create(preference));
      });

    this.preferenceService.dataset$
      .pipe(takeUntil(this.destroy$))
      .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
      .pipe(pluck('name'))
      .pipe(map(name => name || Object.keys(datasets)[0]))
      .subscribe(name => {
        const meta = {
          enabled: {
            type: 'boolean',
            defaultValue: true,
          },
          name: {
            type: 'select',
            defaultValue: name,
            options: Object.keys(datasets),
          },
          ...datasets[name].configMeta,
        };

        this.preferenceService.dataset$.next({
          ...createDefault(meta),
          _meta: meta,
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
