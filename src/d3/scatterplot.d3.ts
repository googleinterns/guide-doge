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

  constructor(shape: string) {
    this.shape = shape;
  }
  init(container: HTMLElement | null, data: number[]){
    this.data = data;
    this.container = container;
    this.generatePts();
    this.setColor('blue');
  }

  private generatePts() {
    // create a scale so that there is correspondence between data set and screen render
    const hscale = d3.scaleLinear();
    hscale.domain([0, d3.max(this.data) as number])       // max of dataset
    .range([0, 10]);                                      // linear mapping of data set values to values from 0 to 10
     // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.container).selectAll(this.shape).data(this.data).enter().append(this.shape);
    // d is data at index, i within
    // select all shapes within given container
    debugger;
    d3.select(this.container).selectAll(this.shape).attr('position', (d, i) => {
      const x = i * 5;
      const y = i * 10;
      const z = -this.data[i] * 2;
      return `${x} ${y} ${z}`;
    });
    //printing out position of recently populated primitives
    //d3.select(this.container).selectAll(this.shape).attr('position');
    let holla = this.container!.querySelectorAll(this.shape);
  
    for (let i = 0; i < holla.length; i++){
      console.log(holla[i].getAttribute('position'));
      //let position = holla[i].getAttribute('position');
    }
  }
  private setColor(color) {
    d3.select(this.container).selectAll(this.shape).attr('color', () => {
      return color;
    });

  }
}
