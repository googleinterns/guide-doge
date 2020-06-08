import { Component } from '@angular/core';
import { activeUserMeasure, eventCountMeasure, revenueMeasure } from '../../models/data-cube/presets';
import { DataService } from '../../services/data/data.service';
import { Datum } from '../../d3/xy-chart.d3';
import { GUIDE_DOGE, t } from '../../assets/i18n';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent {
  activeDatum: Datum | null;
  data: Datum[];
  private measureNames = [activeUserMeasure, revenueMeasure, eventCountMeasure].map(measure => measure.name);
  private measureName: string;

  constructor(
    private dataService: DataService,
  ) {
    this.setMeasureIndex(0);
  }

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  toggleMeasure() {
    const index = this.measureNames.indexOf(this.measureName);
    const nextIndex = (index + 1) % this.measureNames.length;
    this.setMeasureIndex(nextIndex);
  }

  setMeasureIndex(index) {
    this.measureName = this.measureNames[index];
    this.data = this.dataService.getMeasureOverDays(this.measureName);
    this.activeDatum = null;
  }
}
