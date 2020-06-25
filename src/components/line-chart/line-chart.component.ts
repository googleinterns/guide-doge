import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LineChartD3 } from '../../d3/line-chart.d3';
import { RenderOptions } from '../../d3/xy-chart.d3';
import { AUDIFICATION, t } from '../../assets/i18n';
import { formatX, formatY } from '../../utils/formatters';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { DataService } from '../../services/data/data.service';
import { DAY } from '../../utils/timeUnits';
import { takeUntil } from 'rxjs/operators';
import { TimeSeriesQueryOptions } from '../../services/data/types';
import { ResultRow } from '../../models/data-cube/types';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements TimeSeriesQueryOptions, RenderOptions, OnChanges, OnInit, OnDestroy {
  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective<LineChartComponent>;

  @Input() dateRange: [Date, Date] = [new Date(Date.now() - 30 * DAY), new Date()];
  @Input() measureNames: string[] = [];
  @Input() height = 500;
  @Input() width = 800;
  @Input() marginTop = 20;
  @Input() marginRight = 30;
  @Input() marginBottom = 30;
  @Input() marginLeft = 40;

  dateRange$ = new BehaviorSubject(this.dateRange);
  measureNames$ = new BehaviorSubject(this.measureNames);
  data$ = new BehaviorSubject<ResultRow[]>([]);
  activeDatum$ = new BehaviorSubject<ResultRow | null>(null);
  private destroy$ = new Subject();
  private lineChartD3: LineChartD3;

  constructor(
    private dataService: DataService,
    public elementRef: ElementRef<HTMLElement>,
  ) {
    this.lineChartD3 = new LineChartD3(this);
  }

  get data() {
    return this.data$.value;
  }

  get activeDatum() {
    return this.activeDatum$.value;
  }

  set activeDatum(activeDatum) {
    this.activeDatum$.next(activeDatum);
  }

  get ACTIVE_DATUM() {
    const { activeDatum } = this;
    if (!activeDatum) {
      return null;
    }
    const { date } = activeDatum.categories;
    const measureNames = Object.keys(activeDatum.values);
    return measureNames.map(measureName => {
      return t(AUDIFICATION.ACTIVE_DATUM, {
        x: formatX(date),
        y: formatY(activeDatum.values[measureName]),
      });
    }).join('<br/>');
  }

  ngOnInit() {
    this.dataService.observeTimeSeries(this)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.data$.next(data);
        this.activeDatum$.next(null);
      });
    this.lineChartD3.render();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.lineChartD3.clear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('dateRange' in changes) {
      this.dateRange$.next(this.dateRange);
    }
    if ('measureNames' in changes) {
      this.measureNames$.next(this.measureNames);
    }
  }
}
