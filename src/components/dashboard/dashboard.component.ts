import { Component } from '@angular/core';
import { PreferenceService } from '../../services/preference/preference.service';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { takeUntil } from 'rxjs/operators';
import { ChartMetaType } from '../../datasets/types';

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
  charts: ChartMetaType[];
  private destroy$ = new Subject();

  constructor(
    private dataService: DataService,
    private preferenceService: PreferenceService,
  ) {
    this.dataService.dataset$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dataset => {
        this.charts = dataset.charts;
      });
  }
}
