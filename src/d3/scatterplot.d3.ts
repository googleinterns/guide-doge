// run `tsc Scatterplot.ts` to compile into Scatterplot.js file

// for running on browser
// import * as _d3 from 'd3';

// declare global {
// const d3: typeof _d3;
// }

// for running on unit tests
import * as d3 from 'd3';
import * as THREE from 'three';
import { XYPoint, XYZPoint } from '../datasets/metas/types';


export class Scatterplot{
    private data: XYPoint<Date, number>[] | XYZPoint<Date, number, number>[];
    private shape: string;
    private container: HTMLElement | null;

  constructor(shape: string) {
    this.shape = shape;
  }
  init(container: HTMLElement | null, data: XYZPoint<Date, number, number>[] | XYPoint<Date, number>[] ){
    this.data = data;
    this.container = container;
    this.generatePts();
    this.setColor('blue');
    this.createSky('gray');
  }

  private generatePts() {
    // create a scale so that there is correspondence between data set and screen render
    const hscale = d3.scaleLinear();
    // hscale needs to be reassessed - this.data not of type number - need to write function to return max of each dimension
    // hscale.domain([0, d3.max(this.data)]       // max of dataset
    // .range([0, 10]);                                      // linear mapping of data set values to values from 0 to 10
     // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.container).selectAll(this.shape).data(this.data).enter().append(this.shape);
    // d is data at index, i within
    // select all shapes within given container
    d3.select(this.container).selectAll(this.shape).attr('position', (d, i) => {
      const x = (d as XYZPoint<Date, number, number>).y - (d as XYZPoint<Date, number, number>).y;
      const y = (d as XYZPoint<Date, number, number>).y;
      const z = (d as XYZPoint<Date, number, number>).y;
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
}
