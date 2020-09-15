import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LegendItemStyle, PieChartD3 } from '../../d3/pie-chart.d3';
import { RenderOptions } from '../../d3/xy-chart.d3';
import { GUIDE_DOGE, t } from '../../i18n';
import { formatX, formatY } from '../../utils/formatters';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { PieChartMeta } from '../../datasets/metas/categorical.meta';
import { CategoricalDatum } from '../../datasets/queries/categorical.query';
import { CategoricalPoint } from '../../datasets/metas/types';
import { A11yHostComponent } from '../a11y-host/a11y-host.component';

export type PieChartDatum = CategoricalDatum<LegendItemStyle>;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent extends A11yHostComponent implements
  RenderOptions<CategoricalPoint, PieChartDatum>, OnChanges, OnInit, OnDestroy {
  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective;

  @Input() meta: PieChartMeta;
  @Input() height = 500;
  @Input() width = 800;

  formatX = formatX;
  formatY = formatY;

  data$ = new BehaviorSubject<CategoricalDatum<LegendItemStyle>[]>([]);
  pieChartD3: PieChartD3;
  private destroy$ = new Subject();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    super(elementRef);
    this.pieChartD3 = new PieChartD3(this);
  }

  get data() {
    return this.data$.value;
  }

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  ngOnInit() {
    this.pieChartD3.render();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.pieChartD3.clear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('meta' in changes) {
      const data = this.meta.queryData({});
      this.data$.next(data);
    }
  }
}
