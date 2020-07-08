import { Component } from '@angular/core';
import { PreferenceService } from '../../services/preference/preference.service';
import { AUDIFICATION_PREFERENCE, DATA_PREFERENCE, DATA_TABLE_PREFERENCE, TEXT_SUMMARY_PREFERENCE } from '../../i18n';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // manual destructuring for easy access in template
  data$ = this.preferenceService.data$;
  audification$ = this.preferenceService.audification$;
  dataTable$ = this.preferenceService.dataTable$;
  textSummary$ = this.preferenceService.textSummary$;

  DATA_PREFERENCE = DATA_PREFERENCE;
  AUDIFICATION_PREFERENCE = AUDIFICATION_PREFERENCE;
  DATA_TABLE_PREFERENCE = DATA_TABLE_PREFERENCE;
  TEXT_SUMMARY_PREFERENCE = TEXT_SUMMARY_PREFERENCE;

  constructor(
    private preferenceService: PreferenceService,
  ) {
  }
}
