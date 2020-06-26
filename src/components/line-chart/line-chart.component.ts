import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { LineChartD3 } from '../../d3/line-chart.d3';
import { RenderOptions } from '../../d3/xy-chart.d3';
import { AUDIFICATION, t } from '../../assets/i18n';
import { formatX, formatY, humanizeDuration } from '../../utils/formatters';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { DataService } from '../../services/data/data.service';
import { DAY, MONTH, WEEK, YEAR } from '../../utils/timeUnits';
import { takeUntil } from 'rxjs/operators';
import { TimeSeriesWithComparisonQueryOptions } from '../../services/data/types';
import { ResultRow } from '../../models/data-cube/types';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements RenderOptions, OnChanges, OnInit, OnDestroy {
  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective<LineChartComponent>;

  @Input() endDate = new Date();
  @Input() startDate = new Date(this.endDate.getTime() - 30 * DAY);
  @Input() measureNames: string[] = [];
  @Input() height = 500;
  @Input() width = 800;
  @Input() marginTop = 20;
  @Input() marginRight = 30;
  @Input() marginBottom = 30;
  @Input() marginLeft = 40;
  rollingUnits = [WEEK, MONTH];
  periodOverPeriodOffsets = [];

  humanizeDuration = humanizeDuration;
  rollingUnitOptions = [WEEK, MONTH];
  periodOverPeriodOffsetOptions = [-MONTH];

  queryOptions$ = new ReplaySubject<TimeSeriesWithComparisonQueryOptions>(1);
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

  get queryOptions(): TimeSeriesWithComparisonQueryOptions {
    return {
      startDate: this.startDate,
      endDate: this.endDate,
      measureNames: this.measureNames,
      rollingUnits: this.rollingUnits,
      periodOverPeriodOffsets: this.periodOverPeriodOffsets,
    };
  }

  emitQueryOptions() {
    this.queryOptions$.next(this.queryOptions);
  }

  ngOnInit() {
    this.dataService.observeTimeSeriesWithComparison(this.queryOptions$)
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
    const { queryOptions } = this;
    const changed = Object.keys(queryOptions).some(key => key in changes);
    if (changed) {
      this.queryOptions$.next(queryOptions);
    }
  }
}
