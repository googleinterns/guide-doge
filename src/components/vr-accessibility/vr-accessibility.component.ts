import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Hapticplot } from '../../d3/hapticplot.d3';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';
import { PreferenceService } from '../../services/preference/preference.service';
import { DataService } from '../../services/data/data.service';
import { Meta } from '../../datasets/metas/types';
import { ScatterPlotStyle as ScatterPlotLegendItemStyle } from '../../d3/scatterplot.d3';
import { VRScatterplotMeta } from '../../datasets/metas/vr-scatter-plot.meta';
import { VRData, VRQueryOptions, VRScatterPoint } from '../../datasets/queries/vr.query';
import { BehaviorSubject, Subject } from 'rxjs';
import { DAY } from '../../utils/timeUnits';
import { map, takeUntil } from 'rxjs/operators';
import { DATA_PREFERENCE } from '../../i18n';
import 'aframe';
export type VRScatterplotData = VRData<ScatterPlotLegendItemStyle>;
import { MetaType} from '../../datasets/metas/types';


@Component({
  selector: 'app-vr-accessibility',
  templateUrl: './vr-accessibility.component.html',
  styleUrls: ['./vr-accessibility.component.scss'],
})
export class VRAccessibilityComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit{
  private TIME_MAX = 31;
  @Input() endDate = new Date();
  @Input() startDate = new Date(this.endDate.getTime() - this.TIME_MAX * DAY);
  datasetPref: VRScatterplotMeta | null;
  private vrHapticPlot: Hapticplot = new Hapticplot('a-sphere');
  dataset$ = this.preferenceService.dataset$;
  DATA_PREFERENCE = DATA_PREFERENCE;
  componentMetas: Meta[];
  queryOptions$ = new BehaviorSubject<VRQueryOptions>({
    range: [this.startDate, this.endDate],
  });
  datum$ = new BehaviorSubject<VRScatterplotData>({
    labels: [],
    points: [],
  });
  private destroy$ = new Subject();
  dataService: DataService;
  @ViewChild('theScene') theScene: ElementRef;


  constructor(private readonly preferenceService: PreferenceService){
    this.preferenceService = preferenceService;
    this.dataService = new DataService(this.preferenceService);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(){
    this.dataService.dataset$
    .pipe(takeUntil(this.destroy$))
    .subscribe(dataset => {
      // componentMetas is initialized to different dataset metas - will help funnel dataset
      this.componentMetas = dataset.metas;
      switch (dataset.metas[0].type){
        case MetaType.SCATTER_PLOT: {
          this.datasetPref = dataset.metas[0] as VRScatterplotMeta;
          break;
        }
        // TODO: write error handling for cases outside of SCATTER_PLOT
        case MetaType.TABBED_CHARTS: {
          this.datasetPref = null;
          alert('You chose an invalid dataset. Please choose a VR-compatible dataset.');
          break;
        }
        case MetaType.LINE_CHART: {
          this.datasetPref = null;
          alert('You chose an invalid dataset. Please choose a VR-compatible dataset.');
          break;
        }
        case MetaType.GEO_MAP: {
          this.datasetPref = null;
          alert('You chose an invalid dataset. Please choose a VR-compatible dataset.');
          break;
        }
      }
      let dataValues: VRScatterPoint[] = [];
      if (this.datasetPref){
        this.queryOptions$
        .pipe(takeUntil(this.destroy$))
        .pipe(map(queryOption => {
          return this.datasetPref!.queryData(queryOption)[0];
        })).subscribe(this.datum$);
        dataValues = this.datum$.value.points.slice(0, this.datum$.value.points.length * 3 / 8);
      }
      this.initD3HapticPlot(dataValues);
    });
  }

  initD3HapticPlot(dataValues: VRScatterPoint[]){
    const scene = this.theScene.nativeElement;
    this.vrHapticPlot.init(scene, dataValues);
  }

  get datum() {
    return this.datum$.value;
  }

}
