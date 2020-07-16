import { Component } from '@angular/core';
import { PreferenceService } from '../../services/preference/preference.service';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { takeUntil } from 'rxjs/operators';
import { Meta } from '../../datasets/metas/types';
import { AUDIFICATION_PREFERENCE, DATA_PREFERENCE, DATA_TABLE_PREFERENCE, TEXT_SUMMARY_PREFERENCE } from '../../i18n';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // manual destructuring for easy access in template
  audification$ = this.preferenceService.audification$;
  dataset$ = this.preferenceService.dataset$;
  dataTable$ = this.preferenceService.dataTable$;
  textSummary$ = this.preferenceService.textSummary$;
  componentMetas: Meta[];
  private destroy$ = new Subject();

  DATA_PREFERENCE = DATA_PREFERENCE;
  AUDIFICATION_PREFERENCE = AUDIFICATION_PREFERENCE;
  DATA_TABLE_PREFERENCE = DATA_TABLE_PREFERENCE;
  TEXT_SUMMARY_PREFERENCE = TEXT_SUMMARY_PREFERENCE;

  constructor(
    private dataService: DataService,
    private preferenceService: PreferenceService,
  ) {
    this.dataService.dataset$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dataset => {
        this.componentMetas = dataset.metas;
      });
  }
}
