import { Component } from '@angular/core';
import { PreferenceService } from '../../services/preference/preference.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // manual destructuring for easy access in template
  audification$ = this.preferenceService.audification$;
  data$ = this.preferenceService.data$;
  dataTable$ = this.preferenceService.dataTable$;
  textSummary$ = this.preferenceService.textSummary$;

  sampleMeasureGroups = {
    activeUsers: ['activeUsers', 'revenue'],
    revenue: ['revenue'],
    eventCount: ['eventCount'],
  };

  constructor(
    private preferenceService: PreferenceService,
  ) {
  }
}
