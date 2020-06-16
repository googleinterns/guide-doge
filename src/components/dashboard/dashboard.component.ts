import { Component } from '@angular/core';
import { PreferencesService } from '../../services/preferences/preferences.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // manual destructuring for easy access in template
  audification = this.preferencesService.audification;
  dataTable = this.preferencesService.dataTable;
  textSummary = this.preferencesService.textSummary;

  constructor(
    private preferencesService: PreferencesService,
  ) {
  }
}
