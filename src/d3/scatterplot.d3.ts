import * as AFRAME from 'aframe';
import * as d3 from 'd3';
import { VRPoint } from '../datasets/queries/vr.query';
import { MetaType } from '../datasets/metas/types';


export interface ScatterPlotStyle {
  color: string | number;
  shape: string;
}

export class Scatterplot{
    private data: VRPoint[];
    private shape: string;
    private container: HTMLElement | null;
    timeScale: d3.ScaleTime<number, number>;
    dataType: MetaType;

  constructor(shape: string) {
    this.shape = shape;
  }
  init(container: HTMLElement, data: VRPoint[], dataType: MetaType){
    this.data = data;
    this.dataType = dataType;
    this.container = container;
    this.dataType = dataType;
    this.generatePts();
    this.setColor('blue');
    this.createSky('gray');
    this.createGridPlane();
  }
  private scaleTime(date: Date): number{
    const startTime = this.data[0].x;
    const endTime = this.data[this.data.length - 1].x;
    this.timeScale = d3.scaleTime().domain([startTime, endTime]).rangeRound([0, 31]);
    return this.timeScale(date);
  }

  private generatePts() {
     // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.container).selectAll(this.shape).data(this.data).enter().append(this.shape);
    // d is data at index, i within
    // select all shapes within given container
    d3.select(this.container).selectAll(this.shape).attr('position', (d, i) => {
      const x = (d as VRPoint).x;
      const y = (d as VRPoint).y;
      const z = (d as VRPoint).z;
      return `${x} ${y} ${z}`;
    });
  }
  private setColor(color) {
    d3.select(this.container).selectAll(this.shape).attr('color', () => {
      return color;
    });
  }
  private createGridPlane()
  {
    const xGrid = document.createElement('a-entity');
    xGrid.className = 'grids';
    xGrid.id = 'xGrid';
    xGrid.className = 'grids';
    this.container!.appendChild(xGrid);
    xGrid.object3D.add(new AFRAME.THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#xGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#xGrid').attr('rotation', '0 0 0');

    const yGrid = document.createElement('a-entity');
    yGrid.className = 'grids';
    yGrid.id = 'yGrid';
    yGrid.className = 'grids';
    this.container!.appendChild(yGrid);
    yGrid.object3D.add(new AFRAME.THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#yGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#yGrid').attr('rotation', '0 0 -90');

    const zGrid = document.createElement('a-entity');
    zGrid.className = 'grids';
    zGrid.id = 'zGrid';
    zGrid.className = 'grids';
    this.container!.appendChild(zGrid);
    zGrid.object3D.add(new AFRAME.THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#zGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#zGrid').attr('rotation', '-90 0 0');
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
