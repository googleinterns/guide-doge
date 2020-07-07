import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LineChartD3, LineChartStyle } from '../../d3/line-chart.d3';
import { RenderOptions } from '../../d3/xy-chart.d3';
import { GUIDE_DOGE, t } from '../../i18n';
import { formatX, formatY } from '../../utils/formatters';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { DAY } from '../../utils/timeUnits';
import { map, takeUntil } from 'rxjs/operators';
import { LineChartMeta } from '../../datasets/metas/line-chart.meta';
import { TimeSeriesDatum, TimeSeriesPoint, TimeSeriesQueryOptions } from '../../datasets/queries/time-series.query';

export type LineChartDatum = TimeSeriesDatum<LineChartStyle>;

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

  formatX = formatX;
  formatY = formatY;

  queryOptions$ = new BehaviorSubject<TimeSeriesQueryOptions>(this.queryOptions);
  data$ = new BehaviorSubject<LineChartDatum[]>([]);
  activePoint$ = new BehaviorSubject<TimeSeriesPoint | null>(null);
  lineChartD3: LineChartD3;
  private destroy$ = new Subject();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    this.lineChartD3 = new LineChartD3(this);
  }

  get data() {
    return this.data$.value;
  }

  get activePoint() {
    return this.activePoint$.value;
  }

  set activePoint(activePoint) {
    this.activePoint$.next(activePoint);
  }

  get queryOptions(): TimeSeriesQueryOptions {
    return {
      range: [this.startDate, this.endDate],
    };
  }

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  ngOnInit() {
    this.queryOptions$
      .pipe(takeUntil(this.destroy$))
      .pipe(map(queryOption => {
        this.activePoint$.next(null);
        return this.meta.query(queryOption);
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
    if (['startDate', 'endDate', 'meta'].some(key => key in changes)) {
      this.queryOptions$.next(this.queryOptions);
    }
  }

  getCorrespondingPoint(datum: LineChartDatum, point: TimeSeriesPoint) {
    return datum.points.find(p => p.x.getTime() === point.x.getTime());
  }
}
