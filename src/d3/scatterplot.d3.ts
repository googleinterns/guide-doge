// run `tsc Scatterplot.ts` to compile into Scatterplot.js file

// for running on browser
// import * as _d3 from 'd3';

// declare global {
// const d3: typeof _d3;
// }

// for running on unit tests
import * as d3 from 'd3';
import * as THREE from 'three';


export class Scatterplot{
    private data: number[];
    private shape: string;
    private container: HTMLElement | null;
    private hscale: d3.ScaleLinear<number, number>;

    private xWidth: number;
    private xHeight: number;
    private yWidth: number;
    private yHeight: number;
    private zWidth: number;
    private zHeight: number;

  constructor(shape: string) {
    this.shape = shape;
  }
  init(container: HTMLElement | null, data: number[]){
    this.data = data;
    this.container = container;
    // create a scale so that there is correspondence between data set and screen render
    this.hscale = d3.scaleLinear();
    this.hscale.domain([0, d3.max(this.data) as number])       // max of dataset
    .range([0, 100]);                                      // linear mapping of data set values to values from 0 to 10
    this.xWidth = 100;
    this.xHeight = 100;
    this.yWidth = 100;
    this.yHeight = 100;
    this.zWidth = 100;
    this.zHeight = 100;
    this.createSky();
    this.generatePts();
    this.setColor('blue');
    this.createGridPlane();
    
  }

  private generatePts() {
     // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.container).selectAll(this.shape).data(this.data).enter().append(this.shape);
    // d is data at index, i within
    // select all shapes within given container
    d3.select(this.container).selectAll(this.shape).attr('position', (d, i) => {
      const x = 0;
      const y = 0;
      const z = this.hscale(-this.data[i] * 2);
      return `${x} ${y} ${z}`;
    });
  }
  private setColor(color) {
    d3.select(this.container).selectAll(this.shape).attr('color', () => {
      return color;
    });
  }
  private createSky(){
    let sky = document.createElement('a-sky');
    this.container!.appendChild(sky);
    // let xPlane = document.createElement('a-plane');
    // this.container!.appendChild(xPlane);
    let xAxis = document.createElement('div');
    xAxis.id = 'res';
    this.container!.appendChild(xAxis);
    d3.select(this.container).selectAll('a-sky').attr('color', () => {
      return "#e3e5fa";
    });
  }
  private createGridPlane()
  {
    let xPlane = document.createElement('a-plane');
    xPlane.id = 'xPlane';
    let yPlane = document.createElement('a-plane');
    yPlane.id = 'yPlane';
    let zPlane = document.createElement('a-plane');
    zPlane.id = 'zPlane';
    this.container!.appendChild(xPlane);
    this.container!.appendChild(yPlane);
    this.container!.appendChild(zPlane);
    d3.select(this.container).select('#xPlane').attr('color', () => {
      return "#ffffff";
    })
    .attr('rotation', "0 0 0")
    .attr('position', `${this.xWidth/2 -2} ${this.yHeight/2 -2} ${-this.zHeight/2-100}`)
    .attr('width', this.xWidth)
    .attr('height', this.xHeight);
    d3.select(this.container).select('#yPlane').attr('color', () => {
      return "#777777";
    })
    .attr('rotation', "0 -90 0 ")
    .attr('position', `${this.xWidth - 2} ${this.yHeight/2 - 2} -100`)
    .attr('width', this.yWidth)
    .attr('height', this.yHeight);
    d3.select(this.container).select('#zPlane').attr('color', () => {
      return "#000000";
    })
    .attr('rotation', "-90 0 0")
    .attr('position', `${this.xWidth/2 -2} -2 -100`)
    .attr('width', this.yWidth)
    .attr('height', this.yHeight);
  }
  
}
