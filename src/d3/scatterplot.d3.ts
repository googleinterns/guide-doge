// run `tsc Scatterplot.ts` to compile into Scatterplot.js file

// for running on browser
// import * as _d3 from 'd3';

// declare global {
// const d3: typeof _d3;
// }

// for running on unit tests
import * as d3 from 'd3';
import * as AFRAME from 'aframe';
import * as THREE from 'three';
import { TimeSeriesPoint } from '../datasets/queries/time-series.query';
import { VRTimeSeriesPoint } from '../datasets/queries/vr-time-series.query';

export interface ScatterPlotStyle {
  color: string | number;
  shape: string
}

export class Scatterplot{
    private data: VRTimeSeriesPoint[];
    private shape: string;
    private container: HTMLElement | null;
    timeScale: d3.ScaleTime<number, number>;
    dataType: string;

  constructor(shape: string) {
    this.shape = shape;
  }
  init(container: HTMLElement, data: VRTimeSeriesPoint[], dataType: string){
    this.data = data;
    this.container = container;
    this.dataType = dataType;
    this.generatePts();
    this.setColor('blue');
    this.createSky('gray');
    this.createGridPlane();
  }
  private scaleTime(date: Date): number{
    console.log(this.data[0].x);
    console.log(this.data[this.data.length -1].x);
    const startTime = this.data[0].x;
    const endTime = this.data[this.data.length -1].x;
    this.timeScale = d3.scaleTime().domain([startTime, endTime]).rangeRound([0, 31]);
    console.log(this.timeScale(date)); 
    return this.timeScale(date);
  }

  private generatePts() {
    // create a scale so that there is correspondence between data set and screen render
    // const hscale = d3.scaleLinear();
    // hscale needs to be reassessed - this.data not of type number - need to write function to return max of each dimension
    // hscale.domain([0, d3.max(this.data)]       // max of dataset
    // .range([0, 10]);                                      // linear mapping of data set values to values from 0 to 10
     // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.container).selectAll(this.shape).data(this.data).enter().append(this.shape);
    // d is data at index, i within
    // select all shapes within given container
    d3.select(this.container).selectAll(this.shape).attr('position', (d, i) => {
      const x = (d as VRTimeSeriesPoint).x;
      const y = (d as VRTimeSeriesPoint).y;
      const z = (d as VRTimeSeriesPoint).z;
      return `${x} ${y} ${z}`;
    });
  }
  private setColor(color) {
    d3.select(this.container).selectAll(this.shape).attr('color', () => {
      return color;
    });
  }

  private createSky(color: string | number){
    const sky = document.createElement('a-sky');
    sky.id = 'sky';
    this.container?.appendChild(sky);
    d3.select(this.container).selectAll('#sky').attr('color', () => {
      return color;
    });
  }
 
  private createGridPlane()
  {
    const xGrid = document.createElement('a-entity');
    xGrid.className = 'grids';
    xGrid.id = 'xGrid';
    this.container!.appendChild(xGrid);
    xGrid.object3D.add(new AFRAME.THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#xGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#xGrid').attr('rotation', '0 0 0');

    const yGrid = document.createElement('a-entity');
    yGrid.className = 'grids';
    yGrid.id = 'yGrid';
    this.container!.appendChild(yGrid);
    yGrid.object3D.add(new AFRAME.THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#yGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#yGrid').attr('rotation', '0 0 -90');

    const zGrid = document.createElement('a-entity');
    zGrid.className = 'grids';
    zGrid.id = 'zGrid';
    this.container!.appendChild(zGrid);
    zGrid.object3D.add(new AFRAME.THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#zGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#zGrid').attr('rotation', '-90 0 0');
  }
}
