import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LineChartD3 } from '../../d3/line-chart.d3';
import { RenderOptions } from '../../d3/xy-chart.d3';
import { formatX, formatY } from '../../utils/formatters';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { DataService } from '../../services/data/data.service';
import { DAY, MONTH, WEEK } from '../../utils/timeUnits';
import { takeUntil } from 'rxjs/operators';
import { ResultRow } from '../../models/data-cube/types';
import { TimeSeriesQueryOptions } from '../../services/data/types';
import { nameRollingMeasure } from '../../utils/compoundMeasures';

export interface LegendItemStyle {
  color: string;
  width: number;
  opacity: number;
  dashes: number[];
}

export interface LegendItem {
  label: string;
  measureName: string;
  style: Partial<LegendItemStyle>;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements RenderOptions, OnChanges, OnInit, OnDestroy {
  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective<LineChartComponent>;

  // hard-coded default values below will be removed once we implement dataset
  @Input() endDate = new Date();
  @Input() startDate = new Date(this.endDate.getTime() - 30 * DAY);
  @Input() legendItems: LegendItem[] = [{
    label: '1 Day',
    measureName: 'activeUsers',
    style: { opacity: 1 },
  }, {
    label: '7 Day',
    measureName: nameRollingMeasure('activeUsers', WEEK),
    style: { opacity: .7 },
  }, {
    label: '30 Day',
    measureName: nameRollingMeasure('activeUsers', MONTH),
    style: { opacity: .4 },
  }];
  @Input() height = 500;
  @Input() width = 800;

  formatX = formatX;
  formatY = formatY;

  queryOptions$ = new BehaviorSubject(this.queryOptions);
  legendItems$ = new BehaviorSubject(this.legendItems);
  data$ = new BehaviorSubject<ResultRow[]>([]);
  activeDatum$ = new BehaviorSubject<ResultRow | null>(null);
  lineChartD3: LineChartD3;
  private destroy$ = new Subject();

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

  get queryOptions(): TimeSeriesQueryOptions {
    return {
      startDate: this.startDate,
      endDate: this.endDate,
      measureNames: this.legendItems.map(item => item.measureName),
    };
  }

  ngOnInit() {
    this.dataService.observeTimeSeries(this.queryOptions$)
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
    if ('legendItems' in changes) {
      this.legendItems$.next(this.legendItems);
    }
    if (['startDate', 'endDate', 'legendItems'].some(key => key in changes)) {
      this.queryOptions$.next(this.queryOptions);
    }
  }
}
