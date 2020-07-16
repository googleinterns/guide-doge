import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LineChartD3, LineChartStyle } from '../../d3/line-chart.d3';
import { RenderOptions } from '../../d3/xy-chart.d3';
import { AUDIFICATION, GUIDE_DOGE, t } from '../../i18n';
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
  @Input() marginTop = 20;
  @Input() marginRight = 30;
  @Input() marginBottom = 30;
  @Input() marginLeft = 40;

  queryOptions$ = new BehaviorSubject<TimeSeriesQueryOptions>({
    range: [this.startDate, this.endDate],
  });
  datum$ = new BehaviorSubject<LineChartDatum>({
    label: '',
    points: [],
  });
  activePoint$ = new BehaviorSubject<TimeSeriesPoint | null>(null);
  private destroy$ = new Subject();
  private lineChartD3: LineChartD3;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    this.lineChartD3 = new LineChartD3(this);
  }

  get datum() {
    return this.datum$.value;
  }

  get activePoint() {
    return this.activePoint$.value;
  }

  set activePoint(activePoint) {
    this.activePoint$.next(activePoint);
  }

  get ACTIVE_DATUM() {
    if (!this.activePoint) {
      return null;
    }
    const { x, y } = this.activePoint;
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
        this.activePoint$.next(null);
        // TODO: Render multiple data (legend items) on line chart
        // It should render multiple lines when there are more than one datum in the
        // array, but this feature is not yet supported. The workaround here is to
        // render the first datum in the array only.
        return this.meta.queryData(queryOption)[0];
      }))
      .subscribe(this.datum$);
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
