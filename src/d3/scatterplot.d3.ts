import * as AFRAME from 'aframe';
import * as d3 from 'd3';
import { VRScatterPoint } from '../datasets/queries/vr.query';
import { MetaType } from '../datasets/metas/types';
import 'aframe-extras/src/controls/qz-keyboard-controls';



export interface ScatterPlotStyle {
  color: string | number;
  shape: string;
}

export class Scatterplot{
    readonly AILERON_FONT = 'https://cdn.aframe.io/fonts/Aileron-Semibold.fnt';
    readonly DATA_PT_RADIUS = .05;
    private GRID_BOUND = 50;
    private data: VRScatterPoint[];
    private shape: string;
    private container: HTMLElement | null;
    private dataPointContainer: HTMLElement;
    private dataTextContainer: HTMLElement;
    xScale: d3.ScaleLinear<number, number>;
    yScale: d3.ScaleLinear<number, number>;
    zScale: d3.ScaleLinear<number, number>;
    dataType: MetaType;


  constructor(shape: string) {
    this.shape = shape;
  }
  init(container: HTMLElement, data: VRScatterPoint[], dataType: MetaType){
    this.data = data;
    console.log(data);
    this.dataType = dataType;
    this.container = container;
    this.dataType = dataType;
    this.dataPointContainer = document.createElement('a-entity');
    this.dataPointContainer.className = 'dataPts';
    this.dataTextContainer = document.createElement('a-entity');
    this.dataTextContainer.className = 'dataTxt';
    container.appendChild(this.dataPointContainer);
    container.appendChild(this.dataTextContainer);
    if (this.data.length > 0){
      this.generatePts();
      this.generateText();
      this.setColor('blue');
    }
    this.createSky('gray');
    this.createGridPlane();
    //this.setYMovementKeys();
  }
 
  private scalePosition(){
    let maxXValue = this.data[0].x;
    let maxYValue = this.data[0].y;
    let maxZValue = this.data[0].z;
    for (const pt of this.data){
      if (pt.x > maxXValue){
        maxXValue = pt.x;
      }
      if (pt.y > maxYValue){
        maxYValue = pt.y;
      }
      if (pt.z > maxZValue){
        maxZValue = pt.z;
      }
    }
    // scale positions based on largest value found in xyz to absVal(maxGridDimension)
    this.xScale = d3.scaleLinear().domain([0, maxXValue]).range([0, this.GRID_BOUND]);
    this.yScale = d3.scaleLinear().domain([0, maxYValue]).range([0, this.GRID_BOUND]);
    this.zScale = d3.scaleLinear().domain([0, maxZValue]).range([0, this.GRID_BOUND]);
  }
  private generatePts() {
    this.scalePosition();
     // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.dataPointContainer).selectAll(this.shape).data(this.data).enter().append(this.shape);
    // d is data at index, i within
    // select all shapes within given container
    d3.select(this.dataPointContainer).selectAll(this.shape).attr('radius', this.DATA_PT_RADIUS).attr('position', (d, i) => {
      const x = this.xScale((d as VRScatterPoint).x);
      const y = this.yScale((d as VRScatterPoint).y);
      const z = this.zScale((d as VRScatterPoint).z);
      return `${x} ${y} ${z}`;
    });
    
    window.onload = function(){
      console.log(document.querySelector('[camera]').getAttribute('keyboard-controls'));
      document.querySelector('[camera]').setAttribute('wasd-controls', 'fly: true');
      document.querySelector('[camera]').setAttribute('wasd-controls', 'wsAxis: y');
      // document.querySelector('[camera]').setAttribute('universal-controls', 'movementControls');
      console.log(document.querySelector('[camera]').getAttribute('wasd-controls'));
      console.log(document.querySelector('[camera]'));
    };
  }
  private generateText(){
       // enter identifies any DOM elements to be added when # array elements doesn't match
       d3.select(this.dataTextContainer).selectAll('a-entity').data(this.data).enter().append('a-entity');
       d3.select(this.dataTextContainer).selectAll('a-plane').data(this.data).enter().append('a-plane')
       .attr('position', (d, i) => {
        const x = this.xScale((d as VRScatterPoint).x);
        const y = this.yScale((d as VRScatterPoint).y);
        const z = this.zScale((d as VRScatterPoint).z);
        return `${x - 6 * this.DATA_PT_RADIUS} ${y + 2 * this.DATA_PT_RADIUS} ${z}`;
       })
       .attr('width', .5)
       .attr('height', .5)
       .attr('color', 'black');
       // d is data at index, i within
       // select all shapes within given container
       d3.select(this.dataTextContainer).selectAll('a-entity')
         .attr('text', (d, i) => {
            const x = (d as VRScatterPoint).x;
            const y = (d as VRScatterPoint).y;
            const z = (d as VRScatterPoint).z;
            return `
            value: POSITION:
            \n\tx: ${x}
            \n\ty: ${y}
            \n\tz:${z}`;
        })
        .attr('text', `font: ${this.AILERON_FONT}`)
        .attr('position', (d, i) => {
          const x = this.xScale((d as VRScatterPoint).x);
          const y = this.yScale((d as VRScatterPoint).y);
          const z = this.zScale((d as VRScatterPoint).z);
          return `${x + this.DATA_PT_RADIUS} ${y + 2 * this.DATA_PT_RADIUS} ${z}`;
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
    xGrid.object3D.add(new AFRAME.THREE.GridHelper(this.GRID_BOUND * 2, this.GRID_BOUND * 2, 0xffffff, 0xffffff));
    d3.select(this.container).select('#xGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#xGrid').attr('rotation', '0 0 0');

    const yGrid = document.createElement('a-entity');
    yGrid.className = 'grids';
    yGrid.id = 'yGrid';
    yGrid.className = 'grids';
    this.container!.appendChild(yGrid);
    yGrid.object3D.add(new AFRAME.THREE.GridHelper(this.GRID_BOUND * 2, this.GRID_BOUND * 2, 0xffffff, 0xffffff));
    d3.select(this.container).select('#yGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#yGrid').attr('rotation', '0 0 -90');

    const zGrid = document.createElement('a-entity');
    zGrid.className = 'grids';
    zGrid.id = 'zGrid';
    zGrid.className = 'grids';
    this.container!.appendChild(zGrid);
    zGrid.object3D.add(new AFRAME.THREE.GridHelper(this.GRID_BOUND * 2, this.GRID_BOUND * 2, 0xffffff, 0xffffff));
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
