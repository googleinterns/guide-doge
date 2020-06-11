import { Component, ViewChild } from '@angular/core';
import { activeUserMeasure, eventCountMeasure, revenueMeasure } from '../../models/data-cube/presets';
import { DataService } from '../../services/data/data.service';
import { Datum } from '../../d3/xy-chart.d3';
import { GUIDE_DOGE, t } from '../../assets/i18n';
import { humanizeMeasureName } from '../../utils/formatters';
import { A11yHostDirective } from '../../directives/a11y-host/a11y-host.directive';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  @ViewChild(A11yHostDirective, { static: true }) a11yHost: A11yHostDirective;

  humanizeMeasureName = humanizeMeasureName;
  activeDatum: Datum | null;
  data: Datum[];
  measureNames = [activeUserMeasure, revenueMeasure, eventCountMeasure].map(measure => measure.name);
  currentMeasureName: string;

  constructor(
    private dataService: DataService,
  ) {
    this.setMeasureName(this.measureNames[0]);
  }

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  setMeasureName(measureName) {
    this.currentMeasureName = measureName;
    this.data = this.dataService.getMeasureOverDays(this.currentMeasureName);
    this.activeDatum = null;
  }
}
