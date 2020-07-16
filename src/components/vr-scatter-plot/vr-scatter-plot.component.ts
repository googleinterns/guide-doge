import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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

@Component({
  selector: 'app-vr-scatter-plot',
  templateUrl: './vr-scatter-plot.component.html'
})
export class VRScatterPlotComponent<T extends Meta>implements OnInit, OnChanges, OnDestroy{
  @Input() endDate = new Date();
  @Input() startDate = new Date(this.endDate.getTime() - 30 * DAY);
  @Input() meta: Meta;
  @Input() meta2: LineChartMeta;
  private vrScatterPlot: Scatterplot;
  componentMetas: Meta[];
  queryOptions$ = new BehaviorSubject<TimeSeriesQueryOptions>({
    range: [this.startDate, this.endDate],
  });
  datum$ = new BehaviorSubject<LineChartDatum>({
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
      // dataset.metas[0].type = 'tabbed' and dataset.metas[1] = 'line'
      this.meta = dataset.metas[0];
      if (this.isTabbed()) {
        this.meta2 = (this.meta as any).metas[0];
        console.log(this.meta2);
      } else {
        this.meta2 = this.meta[0];
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
      return this.meta2.queryData(queryOption)[0];
    }))
    .subscribe(this.datum$);
    this.vrScatterPlot.init(document.querySelector('a-scene'), this.datum$.value.points);
  }

  isTabbed(): boolean {
    return 'tabbed' === this.meta.type;
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
