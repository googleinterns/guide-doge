import { OnDestroy } from '@angular/core';
import { takeUntil, throttleTime, distinctUntilChanged } from 'rxjs/operators';
import { asyncScheduler, ReplaySubject, Subject } from 'rxjs';
import { PreferenceService } from '../preference/preference.service';
import { Dataset } from '../../datasets/types';
import { UserWGNDataset } from '../../datasets/user-wgn.dataset';

export class DataService implements OnDestroy {
  public dataset$ = new ReplaySubject<Dataset>(1);
  private destroy$ = new Subject();

  constructor(private preferenceService: PreferenceService) {
    this.preferenceService.dataset$
      .pipe(takeUntil(this.destroy$))
      .pipe(throttleTime(500, asyncScheduler, { leading: true, trailing: true }))
      // TODO: Deep object comparison
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe(preference => {
        // TODO: Switch between datasets based on preference
        this.dataset$.next(UserWGNDataset(preference));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
