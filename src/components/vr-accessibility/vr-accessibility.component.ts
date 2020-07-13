import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Scatterplot } from '../../d3/scatterplot.d3';
import 'aframe';
import 'aframe-extras';
import 'super-hands';



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
   this.vrScatterPlot.init(document.querySelector('a-scene'), [0, 1, 2, 3, 4, 5, 6]);
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if ('measureName' in changes) {
    //   this.data = this.dataService.getMeasureOverDays(this.measureName);
    //   this.activeDatum = null;
    }
  }
