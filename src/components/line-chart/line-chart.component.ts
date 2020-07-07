import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LegendItemStyle, LineChartD3 } from '../../d3/line-chart.d3';
import { RenderOptions } from '../../d3/xy-chart.d3';
import { GUIDE_DOGE, t } from '../../i18n';
import { formatX, formatY } from '../../utils/formatters';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { DAY } from '../../utils/timeUnits';
import { LineChartMeta } from '../../datasets/metas/line-chart.meta';
import { TimeSeriesDatum, TimeSeriesPoint } from '../../datasets/queries/time-series.query';

export type LineChartDatum = TimeSeriesDatum<LegendItemStyle>;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements RenderOptions<LineChartDatum>, OnChanges, OnInit, OnDestroy {
  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective<LineChartComponent>;

  @Input() endDate = new Date();
  @Input() startDate = new Date(this.endDate.getTime() - 30 * DAY);
  @Input() meta: LineChartMeta;
  @Input() height = 500;
  @Input() width = 800;

  formatX = formatX;
  formatY = formatY;

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

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  ngOnInit() {
    this.lineChartD3.render();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.lineChartD3.clear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (['startDate', 'endDate', 'meta'].some(key => key in changes)) {
      const data = this.meta.query({
        range: [this.startDate, this.endDate],
      });
      this.data$.next(data);
      this.activePoint$.next(null);
    }
  }

  getCorrespondingPoint(datum: LineChartDatum, point: TimeSeriesPoint) {
    return datum.points.find(p => p.x.getTime() === point.x.getTime());
  }
}
