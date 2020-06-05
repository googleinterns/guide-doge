import { Component } from '@angular/core';
import { activeUserMeasure, eventCountMeasure, revenueMeasure } from '../../models/data-cube/presets';
import { DataService } from '../../services/data/data.service';
import { Datum } from '../../d3/xy-chart.d3';
import { t } from '../../assets/i18n/utils';
import { humanizeMeasureName } from 'src/utils/formatters';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  t = t;
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

  setMeasureName(measureName) {
    this.currentMeasureName = measureName;
    this.data = this.dataService.getMeasureOverDays(this.currentMeasureName);
    this.activeDatum = null;
  }
}
