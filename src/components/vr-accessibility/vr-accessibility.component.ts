import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Hapticplot } from '../../d3/hapticplot.d3';
import 'aframe';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';



@Component({
  selector: 'app-vr-accessibility',
  templateUrl: './vr-accessibility.component.html'
})
export class VRAccessibilityComponent implements OnInit, OnChanges, OnDestroy{
  private vrHapticPlot: Hapticplot;
  private shape: string;
  private color: string;

  constructor(
  ) {
    this.vrHapticPlot = new Hapticplot('a-sphere');
  }
  ngOnInit() {
   this.vrHapticPlot.init(document.querySelector('a-scene'), [0, 1/5, 2/5, 3/5, 4/5, 5/5, 6/5]);
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if ('measureName' in changes) {
    //   this.data = this.dataService.getMeasureOverDays(this.measureName);
    //   this.activeDatum = null;
    }
  }
