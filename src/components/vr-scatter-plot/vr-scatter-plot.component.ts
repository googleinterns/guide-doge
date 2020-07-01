import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Scatterplot } from '../../d3/scatterplot.d3';



@Component({
  selector: 'app-vr-scatter-plot',
  templateUrl: './vr-scatter-plot.component.html'
})
export class VRScatterPlotComponent implements OnDestroy, OnChanges, OnInit{
  private vrScatterPlot: Scatterplot;
  private shape: string;
  private color: string;

  constructor(
  ) {
    this.vrScatterPlot = new Scatterplot('a-sphere');
  }

  ngOnInit() {
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
