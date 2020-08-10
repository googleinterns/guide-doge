import * as AFRAME from 'aframe';
import * as d3 from 'd3';
import { VRScatterPoint } from '../datasets/queries/vr.query';
import { MetaType } from '../datasets/metas/types';
const PROXY_FLAG = '__keyboard-controls-proxy';
const DATA_PT_RADIUS = .05;
// const CAM_Y_ROTATION = AFRAME.THREE.MathUtils.degToRad(135);

export interface ScatterPlotStyle {
  color: string | number;
  shape: string;
}

export class Scatterplot{
    readonly AILERON_FONT = 'https://cdn.aframe.io/fonts/Aileron-Semibold.fnt';
    private GRID_BOUND = 50;
    private data: VRScatterPoint[];
    private shape: string;
    private container: HTMLElement | null;
    private dataPointContainer: HTMLElement;
    private dataTextContainer: HTMLElement;
    private metrics: string[];
    private cardSelection: any;
    xScale: d3.ScaleLinear<number, number>;
    yScale: d3.ScaleLinear<number, number>;
    zScale: d3.ScaleLinear<number, number>;
    dataType: MetaType;
    loaded = false;
    camera: HTMLElement;


  constructor(shape: string) {
    this.shape = shape;
  }

  init(container: HTMLElement, data: VRScatterPoint[], metrics: string[], dataType: MetaType){
    this.data = data;
    this.metrics = metrics;
    this.dataType = dataType;
    this.container = container;
    this.dataType = dataType;
    this.dataPointContainer = this.createEntity('a-entity', 'dataPts');
    this.dataTextContainer = this.createEntity('a-entity', 'dataTxt');
    container.appendChild(this.dataPointContainer);
    container.appendChild(this.dataTextContainer);
    if (this.data.length > 0 && !this.loaded){
      this.generateText();
      this.generatePts();
      this.setColor('blue');
      this.generateText();
    }
    this.createSky('gray');
    this.createGridPlane();
    this.loaded = true;

    window.onload = () => {
      this.dataTextContainer = this.createEntity('a-entity', 'dataTxt');
      this.generateText();
      this.camera = document.querySelector('[camera]');
      this.camera.appendChild(this.dataTextContainer);
      this.container!.removeChild(this.dataTextContainer);
      window.addEventListener('keydown', (event) => {
        const camPos = document.querySelector('[camera]').object3D.position;
        if (event.code === 'KeyQ'){
          camPos.set(
            document.querySelector('[camera]').object3D.position.x,
            document.querySelector('[camera]').object3D.position.y + 1,
            document.querySelector('[camera]').object3D.position.z
          );
        }
        if (event.code === 'KeyZ'){
          camPos.set(
            camPos.x,
            camPos.y - 1,
            camPos.z
          );
        }
      });
    };
  }

  private createEntity(entity: string, id: string): HTMLElement {
    const retEntity = document.createElement(entity);
    retEntity.id = id;
    return retEntity;
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
    this.xScale = this.dimScales(maxXValue);
    this.yScale = this.dimScales(maxYValue);
    this.zScale = this.dimScales(maxZValue);
  }

  private dimScales(maxVal: number): d3.ScaleLinear<number, number> {
     // scale positions based on largest value found in xyz to absVal(maxGridDimension)
    return d3.scaleLinear().domain([0, maxVal]).range([0, this.GRID_BOUND]);
  }

  private generatePts() {
    this.scalePosition();
     // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.dataPointContainer).selectAll(this.shape).data(this.data).enter().append(this.shape);
    // d is data at index, i within
    // select all shapes within given container
    d3.select(this.dataPointContainer).selectAll(this.shape).attr('radius', DATA_PT_RADIUS).attr('position', (d, i) => {
      const x = this.xScale((d as VRScatterPoint).x);
      const y = this.yScale((d as VRScatterPoint).y);
      const z = this.zScale((d as VRScatterPoint).z);
      return `${x.toFixed(2)} ${y.toFixed(2)} ${z.toFixed(2)}`;
    });
  }

  private generateText(){
    this.scalePosition();
    // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.dataTextContainer).selectAll('a-entity').data(this.data).enter().append('a-entity');
    this.cardSelection =  d3.select(this.dataTextContainer).selectAll('a-entity');
    this.cardSelection
      .attr('geometry', 'primitive: plane; height: auto; width: .5')
      .attr('position', (d, i) => {
        // added padding for z-fighting - when merged with hover feature, can set to z = -1 (or other constant)
        return `${.25} ${-.25} ${-(.5 + i * .005)}`;
      })
      .attr('material', 'color: blue')
      // d is data at index, i within
      // select all shapes within given container
    .attr('text', (d, i) => {
      const x = (d as VRScatterPoint).x;
      const y = (d as VRScatterPoint).y;
      const z = (d as VRScatterPoint).z;
      return `
      value: POSITION:\n\n${this.metrics[0]} (x): ${x}\n\n${this.metrics[1]} (y): ${y}\n\n${this.metrics[2]} (z): ${z}`;
    })
    .attr('visible', true);
  }

  private setColor(color) {
    d3.select(this.container).selectAll(this.shape).attr('color', () => {
      return color;
    });
  }

  private createGridPlane(){
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
