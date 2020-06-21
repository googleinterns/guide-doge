import { Component, Input, OnInit } from '@angular/core';
import { GUIDE_DOGE, t } from '../../i18n';
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
  currentMeasureName: string;

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  ngOnInit() {
    this.setMeasureName(this.measureNames[0]);
  }

  setMeasureName(measureName) {
    this.currentMeasureName = measureName;
  }
}
