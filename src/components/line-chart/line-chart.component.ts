import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LineChartD3 } from '../../d3/line-chart.d3';
import { BehaviorSubject } from 'rxjs';
import { Datum, RenderOptions } from '../../d3/xy-chart.d3';
import { AUDIFICATION, t } from '../../assets/i18n';
import { formatX, formatY } from '../../utils/formatters';
import { A11yHostDirective } from '../../directives/a11y-host/a11y-host.directive';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements RenderOptions, OnChanges, OnInit, OnDestroy {
  @ViewChild(A11yHostDirective, { static: true }) a11yHost: A11yHostDirective;

  @Input() measureName: string;
  @Input() height = 500;
  @Input() width = 800;
  @Input() marginTop = 20;
  @Input() marginRight = 30;
  @Input() marginBottom = 30;
  @Input() marginLeft = 40;

  private lineChartD3: LineChartD3;

  private dataSubject = new BehaviorSubject<Datum[]>([]);
  dataObservable = this.dataSubject.asObservable();

  private activeDatumSubject = new BehaviorSubject<Datum | null>(null);
  activeDatumObservable = this.activeDatumSubject.asObservable();

  constructor(
    private dataService: DataService,
    public elementRef: ElementRef<HTMLElement>,
  ) {
    this.lineChartD3 = new LineChartD3(this);
  }

  get data() {
    return this.dataSubject.value;
  }

  get activeDatum() {
    return this.activeDatumSubject.value;
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
    if ('measureName' in changes) {
      const data = this.dataService.getMeasureOverDays(this.measureName);
      this.dataSubject.next(data);
      this.activeDatumSubject.next(null);
    }
  }
}
