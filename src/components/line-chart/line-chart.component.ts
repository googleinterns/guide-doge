import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LegendItemStyle, LineChartD3 } from '../../d3/line-chart.d3';
import { RenderOptions } from '../../d3/xy-chart.d3';
import { GUIDE_DOGE, t } from '../../i18n';
import { formatX, formatY } from '../../utils/formatters';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { DAY } from '../../utils/timeUnits';
import { LineChartMeta } from '../../datasets/metas/line-chart.meta';
import { TimeSeriesDatum } from '../../datasets/queries/time-series.query';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import { A11yHostComponent } from '../a11y-host/a11y-host.component';

export type LineChartDatum = TimeSeriesDatum<LegendItemStyle>;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent extends A11yHostComponent implements
  RenderOptions<TimeSeriesPoint, LineChartDatum>, OnChanges, OnInit, OnDestroy {
  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective;

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
    super(elementRef);
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

  get legendItems() {
    if (!this.activePoint) {
      return [];
    }
    const xTime = this.activePoint.x.getTime();
    return this.data
      .map(datum => ({
        label: datum.label,
        activePoint: datum.points.find(point => point.x.getTime() === xTime),
      }))
      .filter((datum): datum is { label: string, activePoint: TimeSeriesPoint } => datum.activePoint !== undefined);
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
      const data = this.meta.queryData({
        range: [this.startDate, this.endDate],
      });
      this.data$.next(data);
      this.activePoint$.next(null);
    }
  }
}
