// run `tsc Scatterplot.ts` to compile into Scatterplot.js file

// for running on browser
// import * as _d3 from 'd3';

// declare global {
// const d3: typeof _d3;
// }

// for running on unit tests
import * as d3 from 'd3';
import * as THREE from 'three';
import * as AFRAME from 'aframe';
import { ThrowStmt } from '@angular/compiler';


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
      const x = i * 5;
      const y = i * 10;
      const z = (-this.data[i] * 2);
      return `${x} ${y} ${z}`;
    });
  }
  private setColor(color) {
    d3.select(this.container).selectAll(this.shape).attr('color', () => {
      return color;
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
    const xPlane = document.createElement('a-plane');
    xPlane.id = 'xPlane';
    const yPlane = document.createElement('a-plane');
    yPlane.id = 'yPlane';
    const zPlane = document.createElement('a-plane');
    zPlane.id = 'zPlane';
    // this.container!.appendChild(xPlane);
    // this.container!.appendChild(yPlane);
    // this.container!.appendChild(zPlane);
    // d3.select(this.container).select('#xPlane').attr('color', () => {
    //   return '#ffffff';
    // })
    // .attr('rotation', '0 0 0')
    // .attr('width', this.xWidth)
    // .attr('height', this.xHeight)
    // .attr('wireframe', true)
    // .attr('segments-height', 10)
    // .attr('segments-width', 10);
    // d3.select(this.container).select('#yPlane').attr('color', () => {
    //   return '#777777';
    // })
    // .attr('rotation', '0 -90 0 ')
    // .attr('width', this.yWidth)
    // .attr('height', this.yHeight)
    // .attr('wireframe', true)
    // .attr('segments-height', 10)
    // .attr('segments-width', 10);
    // d3.select(this.container).select('#zPlane').attr('color', () => {
    //   return '#000000';
    // })
    // .attr('rotation', '-90 0 0')
    // .attr('width', this.yWidth)
    // .attr('height', this.yHeight)
    // .attr('wireframe', true)
    // .attr('segments-height', 10)
    // .attr('segments-width', 10);
    // const renderer = new THREE.WebGLRenderer();
    // this.container!.appendChild(renderer.domElement);
    // const grid = new THREE.GridHelper(10, 10);
    // const camera = new THREE.PerspectiveCamera();
    // const scene = new THREE.Scene(this.container);
    // scene.add(grid);
    // renderer.render(scene, camera);
    // this.container!.appendChild(grid.domElement);
    const grid1 = document.createElement('a-entity');
    grid1.id = 'grid1';
    this.container!.appendChild(grid1);
    grid1.object3D.add(new THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#grid1').attr('position', '0 0 0');
    d3.select(this.container).select('#grid1').attr('rotation', '0 0 0');

    const yGrid = document.createElement('a-entity');
    yGrid.id = 'yGrid';
    this.container!.appendChild(yGrid);
    yGrid.object3D.add(new THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#yGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#yGrid').attr('rotation', '0 0 -90');
    d3.select(this.container).select('#yGrid').attr('color', 'blue');

    const zGrid = document.createElement('a-entity');
    zGrid.id = 'zGrid';
    this.container!.appendChild(zGrid);
    zGrid.object3D.add(new THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#zGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#zGrid').attr('rotation', '-90 0 0')
    .attr('color', 'blue')
    .attr('transparent', true)
    .attr('opacity', .02);
    console.log(zGrid.getObject3D('gridd'));
  }
}
