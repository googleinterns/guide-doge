import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Scatterplot } from '../../d3/scatterplot.d3';
import { DNPoint, RenderOptions } from '../../d3/xy-chart.d3';
import { LineChartMeta, LineChartQueryOptions, LineChartData } from '../../datasets/types';
import { BehaviorSubject, Subject } from 'rxjs';
import { DAY } from '../../utils/timeUnits';
import { map, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-vr-scatter-plot',
  templateUrl: './vr-scatter-plot.component.html'
})
export class VRScatterPlotComponent implements OnInit, OnChanges, OnDestroy{
  @Input() endDate = new Date();
  @Input() startDate = new Date(this.endDate.getTime() - 30 * DAY);
  @Input() meta: LineChartMeta;
  private vrScatterPlot: Scatterplot;
  private shape: string;
  private color: string;
  queryOptions$ = new BehaviorSubject<LineChartQueryOptions>({
    range: [this.startDate, this.endDate],
    });
  data$ = new BehaviorSubject<LineChartData>({
    points: [],
    });
  activeDatum$ = new BehaviorSubject<DNPoint | null>(null);
  private destroy$ = new Subject();
 

  constructor(
  ) {
    this.vrScatterPlot = new Scatterplot('a-sphere');
  }
  ngOnInit() {
    this.queryOptions$
      .pipe(takeUntil(this.destroy$))
      .pipe(map(queryOption => {
        this.activeDatum$.next(null);
        return this.meta.query(queryOption)[0];
      }))
      .subscribe(this.data$);
   this.vrScatterPlot.init(document.querySelector('a-scene'), [10, 20, 30, 40, 50, 60]);
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if ('measureName' in changes) {
    //   this.data = this.dataService.getMeasureOverDays(this.measureName);
    //   this.activeDatum = null;
    }
  }
