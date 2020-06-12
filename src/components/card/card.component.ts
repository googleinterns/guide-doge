import { Component, Input, OnInit } from '@angular/core';
import { Datum } from '../../d3/xy-chart.d3';
import { DataService } from '../../services/data/data.service';
import { GUIDE_DOGE, t } from '../../assets/i18n';
import { humanizeMeasureName } from '../../utils/formatters';

export type CardType = 'line' | 'bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() tabbed = false;
  @Input() type: CardType;
  @Input() measureNames: string[];
  humanizeMeasureName = humanizeMeasureName;
  activeDatum: Datum | null;
  data: Datum[];
  currentMeasureName: string;

  constructor(
    private dataService: DataService,
  ) {
  }

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  ngOnInit() {
    this.setMeasureName(this.measureNames[0]);
  }

  setMeasureName(measureName) {
    this.currentMeasureName = measureName;
    this.data = this.dataService.getMeasureOverDays(this.currentMeasureName);
    this.activeDatum = null;
  }
}
