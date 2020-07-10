import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Scatterplot } from '../../d3/scatterplot.d3';
import 'aframe';



@Component({
  selector: 'app-vr-accessibility',
  templateUrl: './vr-accessibility.component.html'
})
export class VRAccessibilityComponent implements OnInit, OnChanges, OnDestroy{
  private vrScatterPlot: Scatterplot;
  private shape: string;
  private color: string;

  constructor(
  ) {
    this.vrScatterPlot = new Scatterplot('a-sphere');
  }
  ngOnInit() {
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
