import { Component, Inject, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-summary-validity-chip',
  templateUrl: './summary-validity-chip.component.html',
  styleUrls: ['./summary-validity-chip.component.scss'],
  animations: [
    trigger('displayText', [
      state('shown', style({
        overflow: 'hidden',
        opacity: 1,
        'max-width': '100px',
        'margin-right': '5px',
        'padding-right': '5px',
      })),
      state('hidden', style({
        overflow: 'hidden',
        opacity: 0,
        'max-width': '0px',
        'margin-right': '0px',
        'padding-right': '0px',
      })),
      transition('hidden => shown', [
        animate('0.5s')
      ]),
      transition('shown => hidden', [
        animate('0.3s')
      ]),
    ]),
  ],
})
export class SummaryValidityChipComponent implements OnInit {
  @Input() value: number;
  private colorPalette = [
    { background: '#FF5722', text: '#FFFFFFFF' },
    { background: '#FF9800', text: '#FFFFFFFF' },
    { background: '#FFC107', text: '#FFFFFFFF' },
    { background: '#FFEB3B', text: '#00000000' },
    { background: '#CDDC39', text: '#FFFFFFFF' },
    { background: '#8BC34A', text: '#FFFFFFFF' },
    { background: '#4CAF50', text: '#FFFFFFFF' },
  ];
  text = 'Validity';
  textState = 'hidden';

  get color() {
    const colorIndex = Math.min(Math.floor(this.value * this.colorPalette.length), this.colorPalette.length - 1);
    return this.colorPalette[colorIndex];
  }

  get validityDescription() {
    return `The validity of this summary is ${this.value.toFixed(2)}.`;
  }

  showText() {
    this.textState = 'shown';
  }

  hideText() {
    this.textState = 'hidden';
  }

  ngOnInit(): void {
  }

}
