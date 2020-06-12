import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { LineChartD3 } from '../../d3/line-chart.d3';
import { BehaviorSubject } from 'rxjs';
import { Datum, RenderOptions } from '../../d3/xy-chart.d3';
import { t } from '../../assets/i18n/utils';
import { formatX, formatY } from '../../utils/formatters';
import { AUDIFICATION } from '../../assets/i18n';
import { A11yHostDirective } from '../../directives/a11y-host/a11y-host.directive';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements RenderOptions, OnChanges, OnInit, OnDestroy {
  @ViewChild(A11yHostDirective, { static: true }) a11yHost: A11yHostDirective;

  @Input() height = 500;
  @Input() width = 800;
  @Input() marginTop = 20;
  @Input() marginRight = 30;
  @Input() marginBottom = 30;
  @Input() marginLeft = 40;
  @Input() data: Datum[];
  @Input() activeDatum: Datum | null;
  @Output() activeDatumChange = new EventEmitter<Datum | null>();
  private lineChartD3: LineChartD3;

  private dataSubject = new BehaviorSubject<Datum[]>([]);
  dataObservable = this.dataSubject.asObservable();

  private activeDatumSubject = new BehaviorSubject<Datum | null>(null);
  activeDatumObservable = this.activeDatumSubject.asObservable();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    this.lineChartD3 = new LineChartD3(this);
  }

  get formattedActiveDatum() {
    if (!this.activeDatum) {
      return null;
    }
    const { date, value } = this.activeDatum;
    return t(AUDIFICATION.ACTIVE_DATUM, {
      x: formatX(date),
      y: formatY(value),
    });
  }

  ngOnInit() {
    this.lineChartD3.render();
  }

  ngOnDestroy() {
    this.lineChartD3.clear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.dataSubject.next(this.data);
    }
    if ('activeDatum' in changes) {
      this.activeDatumSubject.next(this.activeDatum);
    }
  }
}
