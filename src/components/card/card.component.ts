import { Component, Input, OnInit } from '@angular/core';
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
  @Input() measureGroups: Record<string, string[]>;
  humanizeMeasureName = humanizeMeasureName;
  currentMeasureGroupKey: string;

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  get measureGroupKeys() {
    return Object.keys(this.measureGroups);
  }

  ngOnInit() {
    this.setMeasureGroupKey(this.measureGroupKeys[0]);
  }

  setMeasureGroupKey(measureGroupKey: string) {
    this.currentMeasureGroupKey = measureGroupKey;
  }
}
