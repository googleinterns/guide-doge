import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Hapticplot } from '../../d3/hapticplot.d3';
import { Scene} from 'aframe';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';



@Component({
  selector: 'app-vr-accessibility',
  templateUrl: './vr-accessibility.component.html'
})
export class VRAccessibilityComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit{
  private vrHapticPlot: Hapticplot = new Hapticplot('a-sphere');
  private shape: string;
  private color: string;
  @ViewChild('theScene') theScene: ElementRef;


  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(){
    const scene = this.theScene.nativeElement;
    this.vrHapticPlot.init(scene, [0, 1 / 5, 2 / 5, 3 / 5, 4 / 5, 5 / 5, 6 / 5]);
  }

}
