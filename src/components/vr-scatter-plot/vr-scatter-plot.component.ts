import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { Scatterplot } from '../../d3/scatterplot.d3';
import { PreferenceService } from '../../services/preference/preference.service';
import { DataService } from '../../services/data/data.service';
import { Meta } from '../../datasets/metas/types';
import { TimeSeriesQueryOptions } from '../../datasets/queries/time-series.query';
import { LineChartDatum} from '../line-chart/line-chart.component';
import { LineChartMeta } from '../../datasets/metas/line-chart.meta';
import { BehaviorSubject, Subject } from 'rxjs';
import { DAY } from '../../utils/timeUnits';
import { map, takeUntil } from 'rxjs/operators';
import { DATA_PREFERENCE } from '../../i18n';
import { datasets } from '../../datasets';

@Component({
  selector: 'app-vr-scatter-plot',
  templateUrl: './vr-scatter-plot.component.html',
  styleUrls: ['./vr-scatter-plot.component.scss'],
})
export class VRScatterPlotComponent implements OnInit, OnChanges, OnDestroy{
  @Input() endDate = new Date();
  @Input() startDate = new Date(this.endDate.getTime() - 30 * DAY);
  @Input() datasetPref: LineChartMeta;
  dataset$ = this.preferenceService.dataset$;
  DATA_PREFERENCE = DATA_PREFERENCE;
  vrScatterPlot: Scatterplot;
  componentMetas: Meta[];
  queryOptions$ = new BehaviorSubject<TimeSeriesQueryOptions>({
    range: [this.startDate, this.endDate],
  });
  datum$ = new BehaviorSubject<LineChartDatum>({
    label: '',
    points: [],
  });
  private destroy$ = new Subject();
  dataService: DataService;
  @ViewChild('ascene') ascene: ElementRef;

  constructor(
    private preferenceService: PreferenceService
  ) {
    this.preferenceService = preferenceService;
    this.dataService = new DataService(this.preferenceService);
    this.vrScatterPlot = new Scatterplot('a-sphere');
  }

  ngOnInit() {
    this.dataService.dataset$
    .pipe(takeUntil(this.destroy$))
    .subscribe(dataset => {
      // componentMetas is initialized to different dataset metas - will help funnel dataset
      this.componentMetas = dataset.metas;
      // dataset.metas[0].type = 'tabbed' and dataset.metas[1] = 'line' if chosen UserWhiteNoise
      // dataset.metas[0] - 'line' if Dummy chosen
      if (dataset.metas[0].type === 'tabbed') {
        this.datasetPref = (dataset.metas[0] as any).metas[0];
      } else if (dataset.metas[0].type === 'line') {
        this.datasetPref = dataset.metas[0] as LineChartMeta;
      }
      // calling this.init() from inside bc when code above is in constructor,
      // and code in this.init() is in ngOnInit() there is sync problem
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
    this.vrScatterPlot.init(this.ascene.nativeElement, this.datum$.value.points, this.datasetPref.type);   
  }

  get datum() {
    return this.datum$.value;
  }

  sleep(milliseconds: number) {
      const timeStart = new Date().getTime();
      while (true) {
        const elapsedTime = new Date().getTime() - timeStart;
        if (elapsedTime > milliseconds) {
          break;
        }
      }
    }
}
