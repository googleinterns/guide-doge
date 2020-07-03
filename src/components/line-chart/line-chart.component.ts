import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LineChartD3 } from '../../d3/line-chart.d3';
import { DNPoint, RenderOptions } from '../../d3/xy-chart.d3';
import { AUDIFICATION, GUIDE_DOGE, t } from '../../i18n';
import { formatX, formatY } from '../../utils/formatters';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { DAY } from '../../utils/timeUnits';
import { map, takeUntil } from 'rxjs/operators';
import { LineChartData, LineChartMeta, LineChartQueryOptions } from '../../datasets/types';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements RenderOptions, OnChanges, OnInit, OnDestroy {
  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective<LineChartComponent>;

  @Input() endDate = new Date();
  @Input() startDate = new Date(this.endDate.getTime() - 30 * DAY);
  @Input() meta: LineChartMeta;
  @Input() height = 500;
  @Input() width = 800;
  @Input() marginTop = 20;
  @Input() marginRight = 30;
  @Input() marginBottom = 30;
  @Input() marginLeft = 40;

  queryOptions$ = new BehaviorSubject<LineChartQueryOptions>({
    range: [this.startDate, this.endDate],
  });
  data$ = new BehaviorSubject<LineChartData>({
    label: '',
    points: [],
  });
  activeDatum$ = new BehaviorSubject<DNPoint | null>(null);
  private destroy$ = new Subject();
  private lineChartD3: LineChartD3;

  constructor(
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
    if (!this.activeDatum) {
      return null;
    }
    const { x, y } = this.activeDatum;
    return t(AUDIFICATION.ACTIVE_DATUM, {
      x: formatX(x),
      y: formatY(y),
    });
  }

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  ngOnInit() {
    this.queryOptions$
      .pipe(takeUntil(this.destroy$))
      .pipe(map(queryOption => {
        this.activeDatum$.next(null);
        return this.meta.query(queryOption)[0];
      }))
      .subscribe(this.data$);
    this.lineChartD3.render();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.lineChartD3.clear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changed = ['startDate', 'endDate', 'meta'].some(key => key in changes);
    if (changed) {
      this.queryOptions$.next({
        range: [this.startDate, this.endDate],
      });
    }
  }
}
