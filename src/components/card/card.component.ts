import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.setMeasureName(this.measureNames[0]);
  }

  setMeasureName(measureName) {
    this.currentMeasureName = measureName;
  }
}
