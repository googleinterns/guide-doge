import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { LineChartD3 } from '../../d3/line-chart.d3';
import { Datum, RenderOptions } from '../../d3/xy-chart.d3';
import { AUDIFICATION, GUIDE_DOGE, t } from '../../i18n';
import { formatX, formatY } from '../../utils/formatters';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { DataService } from '../../services/data/data.service';
import { DAY } from '../../utils/timeUnits';
import { map, takeUntil } from 'rxjs/operators';
import { TimeSeriesQueryOptions } from '../../services/data/types';

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

  queryOptions$ = new ReplaySubject<TimeSeriesQueryOptions>(1);
  data$ = new BehaviorSubject<Datum[]>([]);
  activeDatum$ = new BehaviorSubject<Datum | null>(null);
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
    if (!this.activeDatum) {
      return null;
    }
    const { date, value } = this.activeDatum;
    return t(AUDIFICATION.ACTIVE_DATUM, {
      x: formatX(date),
      y: formatY(value),
    });
  }

  get VISUALIZATION() {
    return t(GUIDE_DOGE.VISUALIZATION);
  }

  ngOnInit() {
    this.dataService.observeTimeSeries(this.queryOptions$)
      .pipe(takeUntil(this.destroy$))
      // TODO: the pipe below will be removed once line chart supports rendering multiple measures
      .pipe(map(rows => {
        this.activeDatum$.next(null);
        if (!rows.length) {
          return [];
        }
        const firstMeasureName = rows[0].values.keys().next().value;
        return rows.map(row => ({
          date: row.categories.get('date') as Date,
          value: row.values.get(firstMeasureName)!,
        }));
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
    const queryOptions = {
      startDate: this.startDate,
      endDate: this.endDate,
      measureNames: this.measureNames,
    };
    const changed = Object.keys(queryOptions).some(key => key in changes);
    if (changed) {
      this.queryOptions$.next(queryOptions);
    }
  }
}
