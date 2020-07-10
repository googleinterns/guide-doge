import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Scatterplot } from '../../d3/scatterplot.d3';
import { PreferenceService } from '../../services/preference/preference.service';
import { DataService } from '../../services/data/data.service';
import { AUDIFICATION_PREFERENCE, DATA_PREFERENCE, DATA_TABLE_PREFERENCE, TEXT_SUMMARY_PREFERENCE } from '../../i18n';
import { Meta } from '../../datasets/metas/types';
import { TimeSeriesDatum, TimeSeriesPoint, TimeSeriesQueryOptions, createTimeSeriesQuery } from '../../datasets/queries/time-series.query';
import { LineChartDatum} from '../line-chart/line-chart.component';
import { query } from '@angular/animations';
import { XYPoint } from '../../datasets/metas/types';
import { LineChartMeta, createLineChartMeta } from '../../datasets/metas/line-chart.meta';
import { BehaviorSubject, Subject } from 'rxjs';
import { DAY } from '../../utils/timeUnits';
import { datasets } from '../../datasets/'
import { map, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-vr-scatter-plot',
  templateUrl: './vr-scatter-plot.component.html'
})
export class VRScatterPlotComponent implements OnInit, OnChanges, OnDestroy{
  @Input() endDate = new Date();
  @Input() startDate = new Date(this.endDate.getTime() - 30 * DAY);
  meta: LineChartMeta;
  private vrScatterPlot: Scatterplot;
  private shape: string;
  private color: string;
  dataset$ = this.preferenceService.dataset$;
  dataTable$ = this.preferenceService.dataTable$;
  textSummary$ = this.preferenceService.textSummary$;
  time = new Date(Date.now() - 100 * DAY);
  data: XYPoint<Date, number>[] = [];
  componentMetas: Meta[];
  queryOptions$ = new BehaviorSubject<TimeSeriesQueryOptions>({
    range: [this.startDate, this.endDate],
  });
  datum$ = new BehaviorSubject<LineChartDatum>({
    label: '',
    points: [],
  });
  private destroy$ = new Subject();
  activePoint$ = new BehaviorSubject<TimeSeriesPoint | null>(null);
 

  constructor(
    private dataService: DataService,
    private preferenceService: PreferenceService,
  ) {
    //dataService.preference
   
    dataService = new DataService(preferenceService);
    for (let i = 1; i <= 100; i++) {
      this.data.push({
        x: new Date(this.time.getTime() + i * DAY),
        y: 20,
      });
    }
    this.meta = createLineChartMeta(
      'Line Chart',
      (options: TimeSeriesQueryOptions) => [{
        label: 'Dummy Data',
        points: this.data,
      }],
    );
    
      this.dataService.dataset$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dataset => {
        this.componentMetas = dataset.metas
         this.meta = dataset.metas[0] as any;
      });

      // this.dataService.dataset$ will print out data array points
      console.log(dataService.dataset$);
      this.vrScatterPlot = new Scatterplot('a-sphere');
  }

  get datum() {
    return this.datum$.value;
  }

  ngOnInit() {
    this.queryOptions$
    .pipe(takeUntil(this.destroy$))
    .pipe(map(queryOption => {
      console.log(this.meta.query(queryOption)[0]);
      return this.meta.query(queryOption)[0];
    }))
    .subscribe(this.datum$);
    console.log(this.datum$.value.points);
    
   this.vrScatterPlot.init(document.querySelector('a-scene'), this.data);
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    }
  }
