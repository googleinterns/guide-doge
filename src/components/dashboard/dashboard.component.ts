import { Component } from '@angular/core';
import { PreferenceService } from '../../services/preference/preference.service';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { takeUntil } from 'rxjs/operators';
import { Meta } from '../../datasets/metas/types';
import { AUDIFICATION_PREFERENCE, DATA_PREFERENCE, LAYOUT_PREFERENCE, GEO_MAP_NAVIGATION_PREFERENCE, SUMMARIZATION_PREFERENCE } from '../../i18n';

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
  summarization$ = this.preferenceService.summarization$;
  geoMapNavigation$ = this.preferenceService.geoMapNavigation$;
  layout$ = this.preferenceService.layout$;
  componentMetas: Meta[];

  DATA_PREFERENCE = DATA_PREFERENCE;
  AUDIFICATION_PREFERENCE = AUDIFICATION_PREFERENCE;
  GEO_MAP_NAVIGATION_PREFERENCE = GEO_MAP_NAVIGATION_PREFERENCE;
  LAYOUT_PREFERENCE = LAYOUT_PREFERENCE;
  SUMMARIZATION_PREFERENCE = SUMMARIZATION_PREFERENCE;

  private destroy$ = new Subject();

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

  get cardWidth() {
    return this.layout$.value.cardWidth;
  }
}
