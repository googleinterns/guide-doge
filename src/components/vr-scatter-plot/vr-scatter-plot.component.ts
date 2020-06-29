import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Scatterplot } from '../../d3/scatterplot.d3';
import { TimeSeriesQueryOptions } from '../../services/data/types';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { ResultRow } from '../../models/data-cube/types';
import { map, takeUntil } from 'rxjs/operators';

import { Data } from '@angular/router';



@Component({
  selector: 'app-vr-scatter-plot',
  templateUrl: './vr-scatter-plot.component.html'
})
export class VRScatterPlotComponent{
  private vrScatterPlot: Scatterplot;
  dataService: DataService;
  data$ = new BehaviorSubject(<ResultRow[]>([]));
  activeDatum$ = new BehaviorSubject<ResultRow[]>([]);
  queryOptions$ = new ReplaySubject<TimeSeriesQueryOptions>(1);
  private destroy$ = new Subject();

  private shape: string;
  private color: string;

  constructor(
  ) {
    //this.shape = shape;
    this.vrScatterPlot = new Scatterplot("a-sphere");
  }

  

  ngOnInit() {
    // this.dataService.observeTimeSeries(this.queryOptions$)
    //   .pipe(takeUntil(this.destroy$))
    //   // TODO: the pipe below will be removed once line chart supports rendering multiple measures
    //   .pipe(map(rows => {
    //     this.activeDatum$.next(null as any);
    //     if (!rows.length) {
    //       return [];
    //     }
    //     const [firstMeasureName] = Object.keys(rows[0].values);
    //     return rows.map(row => ({
    //       date: row.categories.date,
    //       value: row.values[firstMeasureName],
    //     }));
    //   }))
    //   .subscribe(this.data$ as any);
    this.vrScatterPlot.init(document.querySelector('a-scene'), [5, 10, 15, 20]);
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if ('measureName' in changes) {
    //   this.data = this.dataService.getMeasureOverDays(this.measureName);
    //   this.activeDatum = null;
    }
  }
