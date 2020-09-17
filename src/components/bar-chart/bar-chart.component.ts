import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LegendItemStyle, BarChartD3 } from '../../d3/bar-chart.d3';
import { RenderOptions } from '../../d3/xy-chart.d3';
import { GUIDE_DOGE, t } from '../../i18n';
import { formatX, formatY } from '../../utils/formatters';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { BarChartMeta } from '../../datasets/metas/categorical.meta';
import { CategoricalDatum } from '../../datasets/queries/categorical.query';
import { CategoricalPoint } from '../../datasets/metas/types';
import { A11yHostComponent } from '../a11y-host/a11y-host.component';
import { SummarizationMeta } from '../../services/summarization/types';

export type BarChartDatum = CategoricalDatum<LegendItemStyle>;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent extends A11yHostComponent implements
  RenderOptions<CategoricalPoint, BarChartDatum>, OnChanges, OnInit, OnDestroy {
  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective;

  @Input() meta: BarChartMeta;
  @Input() height = 500;
  @Input() width = 800;

  formatX = formatX;
  formatY = formatY;

  summarizationMetas$ = new BehaviorSubject<SummarizationMeta[]>([]);
  data$ = new BehaviorSubject<CategoricalDatum<LegendItemStyle>[]>([]);
  barChartD3: BarChartD3;
  private destroy$ = new Subject();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    super(elementRef);
    this.barChartD3 = new BarChartD3(this);
  }

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  ngOnInit() {
    this.barChartD3.render();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.barChartD3.clear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('meta' in changes) {
      const data = this.meta.queryData({});
      this.data$.next(data);
      this.summarizationMetas$.next(this.meta.summarizationMetas ?? []);
    }
  }
}
