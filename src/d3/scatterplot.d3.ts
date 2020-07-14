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
    this.createSky();
    this.generatePts();
    this.setColor('blue');
    this.setRadius(0.1);
    this.setInteraction();
    this.addEventListeners();
    this.createGridPlane();
  }

  private generatePts() {
     // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.container).selectAll(this.shape).data(this.data).enter().append(this.shape);
    // d is data at index, i within
    // select all shapes within given container
    d3.select(this.container).selectAll(this.shape).attr('position', (d, i) => {
      const x = i/10;
      const y = this.data[i]/5;
      const z = -1;
      return `${x} ${y} ${z}`;
    });
  }
  private setColor(color) {
    d3.select(this.container).selectAll(this.shape).attr('color', () => {
      return color;
    });
  }

  private setRadius(size) {
    d3.select(this.container).selectAll(this.shape).attr('radius', size);
  }

  private setInteraction() {
    //add interaction options to all objects of type this.shape
    d3.select(this.container).selectAll(this.shape)
      .attr('hoverable', '')
      .attr('grabbable', '')
      .attr('stretchable', '')
      .attr('draggable', '')
      .attr('dropppable', '');

  }

  private addEventListeners() {
    //adding event listeners to react if a data object is hovered or un-hovered
    d3.select(this.container).selectAll(this.shape).on('stateadded', function(d, i) {
      if (d3.event.detail === 'hovered'){
        d3.select(this).attr('color', 'orange');
      }
    });
    d3.select(this.container).selectAll(this.shape).on('stateremoved', function(d, i) {
      if (d3.event.detail === 'hovered'){
        d3.select(this).attr('color', 'blue');
      }
    });
  }



  private createSky(){
    const aSky = document.createElement('a-sky');
    this.container!.appendChild(aSky);
    d3.select(this.container).selectAll('a-sky').attr('color', () => {
      return '#f2b9af';
    });
  }
  private createGridPlane()
  {
    const xGrid = document.createElement('a-entity');
    xGrid.id = 'xGrid';
    this.container!.appendChild(xGrid);
    xGrid.object3D.add(new THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#xGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#xGrid').attr('rotation', '0 0 0');

    const yGrid = document.createElement('a-entity');
    yGrid.id = 'yGrid';
    this.container!.appendChild(yGrid);
    yGrid.object3D.add(new THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#yGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#yGrid').attr('rotation', '0 0 -90');

    const zGrid = document.createElement('a-entity');
    zGrid.id = 'zGrid';
    this.container!.appendChild(zGrid);
    zGrid.object3D.add(new THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#zGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#zGrid').attr('rotation', '-90 0 0');
  }
}
