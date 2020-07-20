import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Scatterplot } from '../../d3/scatterplot.d3';
import { PreferenceService } from '../../services/preference/preference.service';
import { DataService } from '../../services/data/data.service';
import { Meta } from '../../datasets/metas/types';
import { LineChartDatum} from '../line-chart/line-chart.component';
import { LegendItemStyle as LineChartLegendItemStyle } from '../../d3/line-chart.d3';
import { VRScatterplotMeta } from '../../datasets/metas/vr-scatter-plot.meta';
import { LineChartMeta } from '../../datasets/metas/line-chart.meta';
import { TimeSeriesDatum, TimeSeriesQueryOptions } from '../../datasets/queries/time-series.query';
import { VRTimeSeriesDatum,VRTimeSeriesQueryOptions } from '../../datasets/queries/vr-time-series.query';
import { BehaviorSubject, Subject } from 'rxjs';
import { DAY } from '../../utils/timeUnits';
import { map, takeUntil } from 'rxjs/operators';
import { DATA_PREFERENCE } from '../../i18n';
import 'aframe';
import { datasets } from '../../datasets';

export type VRScatterplotDatum = VRTimeSeriesDatum<LineChartLegendItemStyle>;


@Component({
  selector: 'app-vr-scatter-plot',
  templateUrl: './vr-scatter-plot.component.html',
  styleUrls: ['./vr-scatter-plot.component.scss'],
})
export class VRScatterPlotComponent<T extends Meta>implements OnInit, OnChanges, OnDestroy{
  endDate = new Date();
  startDate = new Date(this.endDate.getTime() - 30 * DAY);
  datasetPref: VRScatterplotMeta | LineChartMeta;
  dataset$ = this.preferenceService.dataset$;
  DATA_PREFERENCE = DATA_PREFERENCE;
  vrScatterPlot: Scatterplot;
  componentMetas: Meta[];
  exitVR: boolean = false;
  queryOptions$ = new BehaviorSubject<VRTimeSeriesQueryOptions | TimeSeriesQueryOptions>({
    range: [this.startDate, this.endDate],
  });
  datum$ = new BehaviorSubject<VRScatterplotDatum | LineChartDatum>({
    label: '',
    points: [],
  });
  private destroy$ = new Subject();
 
  constructor(
    private preferenceService: PreferenceService
  ) {
    this.preferenceService = preferenceService;
  }

  ngOnInit() {
    this.vrScatterPlot = new Scatterplot('a-sphere');
    const dataService = new DataService(this.preferenceService);
    dataService.dataset$
    .pipe(takeUntil(this.destroy$))
    .subscribe(dataset => {
      // componentMetas is initialized to different dataset metas - will help funnel dataset
      this.componentMetas = dataset.metas;
      // dataset.metas[0].type = 'tabbed' and dataset.metas[1] = 'line' if chosen UserWhiteNoise
      // dataset.metas[0] - 'line' if Dummy chosen

      if ((dataset.metas[0] as Meta).type === 'tabbed') {
         this.datasetPref = (dataset.metas[0] as any).metas[0];
        // this.exitVR = true;
       } else { 
           if ((dataset.metas[0] as Meta).type === 'line')
             this.datasetPref = dataset.metas[0] as LineChartMeta;
           if ((dataset.metas[0] as Meta).type === 'vrScatter')
             this.datasetPref = dataset.metas[0] as VRScatterplotMeta;
      } 
        this.init();
    });
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  init(){
    this.queryOptions$
    .pipe(takeUntil(this.destroy$))
    .pipe(map(queryOption => {
      // this.meta2.query(queryOption)[0]) has label, points, style and is of type BehaviorSubject<LineChartData>
      return this.datasetPref.queryData(queryOption)[0];
    }))
    .subscribe(this.datum$);
    this.vrScatterPlot.init(document.querySelector('a-scene'), this.datum$.value.points, this.datasetPref.type);
  }

  get datum() {
    return this.datum$.value;
  }

}
