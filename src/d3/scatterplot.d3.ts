import * as AFRAME from 'aframe';
import * as d3 from 'd3';
import { VRScatterPoint } from '../datasets/queries/vr.query';
import { MetaType } from '../datasets/metas/types';
import { Controls } from './scatterplot-ctrls';
const PROXY_FLAG = '__keyboard-controls-proxy';
const DATA_PT_RADIUS = .05;
// const CAM_Y_ROTATION = AFRAME.THREE.MathUtils.degToRad(135);

const speedPos: Record<string, string> = {
    ['minus']: '-.75 1.5 -4',
    ['plus']: '.25 1.5 -4',
    ['label']: '-.25 1.5 -4',
   
  };

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
    DAYDREAM_NAV_SPEED;
    xScale: d3.ScaleLinear<number, number>;
    yScale: d3.ScaleLinear<number, number>;
    zScale: d3.ScaleLinear<number, number>;
    dataType: MetaType;
    loaded = false;
    cameraRig: HTMLElement = document.createElement('a-entity');


  constructor(shape: string) {
    this.shape = shape;
  }

  init(container: HTMLElement, data: VRScatterPoint[], metrics: string[], dataType: MetaType){
    this.data = data;
    this.metrics = metrics;
    this.dataType = dataType;
    this.container = container;
    this.dataType = dataType;
    this.dataPointContainer = document.createElement('a-entity');
    this.dataPointContainer.className = 'dataPts';
    container.appendChild(this.dataPointContainer);
    if (this.data.length > 0 && !this.loaded){
      this.generatePts();
    }
    this.createSky('gray');
    this.createGridPlane();
    
    if (!this.loaded){
      window.onload = () =>{
        this.DAYDREAM_NAV_SPEED = .1;
        // this.createCtrlPanel();
      };
    setTimeout(() => {
      this.DAYDREAM_NAV_SPEED = .1;
      this.dataTextContainer = document.createElement('a-entity');
      this.dataTextContainer.className = 'dataTxt';
      document.querySelector('[camera]').appendChild(this.dataTextContainer);
      this.generateText();
      const control = new Controls(this);
      // this.createCtrlTools();
    }, 2000);
  }
  this.loaded = true;
}
  // private createCtrlTools(){
  //   addQZCtrls(this);
  //   createNavTiles(this.DAYDREAM_NAV_SPEED, this);
  //   createCtrlPanel(this); 
  // }
  setDaydreamNavSpeed(setSpeed: number){
    this.DAYDREAM_NAV_SPEED = setSpeed;
  }

  getDaydreamNavSpeed(): number{
    return this.DAYDREAM_NAV_SPEED;
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
    d3.select(this.dataPointContainer).selectAll(this.shape).attr('radius', DATA_PT_RADIUS).attr('position', (d, i) => {
      const x = this.xScale((d as VRScatterPoint).x);
      const y = this.yScale((d as VRScatterPoint).y);
      const z = this.zScale((d as VRScatterPoint).z);
      return `${x} ${y} ${z}`;
    })
    .each((d, i, g) => {
      // (g[i] as AFRAME.Entity).setAttribute('hover_cards', '');
      (g[i] as AFRAME.Entity).addEventListener('mouseenter', () => {
        const hoverIdx = i;
        console.log(this.cardSelection);
        this.cardSelection.filter((d, i) => { return i === hoverIdx}).attr('visible', true);
      });
      (g[i] as AFRAME.Entity).addEventListener('mouseleave', () => {
        const hoverIdx = i;
        this.cardSelection.filter((d, i) => { return i === hoverIdx}).attr('visible', false);
      });
    });
  }

  private generateText(){
    // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.dataTextContainer).selectAll('a-entity').data(this.data).enter().append('a-entity');
    this.cardSelection =  d3.select(this.dataTextContainer).selectAll('a-entity');
    this.cardSelection
      .attr('geometry', 'primitive: plane; height: auto; width: .5')
      .attr('material', 'color: blue; opacity: .5')
      .attr('text', (d, i) => {
        const categories = (d as VRScatterPoint).categories.browser + ', ' + (d as VRScatterPoint).categories.country
          + ', ' + (d as VRScatterPoint).categories.source;
        // for (let categChild of (d as VRScatterPoint).categories)
        const x = (d as VRScatterPoint).x;
        const y = (d as VRScatterPoint).y;
        const z = (d as VRScatterPoint).z;
        const nbsp = 'nbsp;';
        return `
        value: \n${categories} Position:\n\n\u00A0\u00A0\u00A0${this.metrics[0]} (x): ${x}\n\n\t${this.metrics[1]}(y): ${y.toFixed(2)}\n\n\t${this.metrics[2]} (z): ${z}\n;
        xOffset: ${DATA_PT_RADIUS / 3};
        shader: msdf; 
        font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/rubikmonoone/RubikMonoOne-Regular.json;`;
      })
      .attr('visible', false)
      .attr('position', (d, i) => {
        const x = this.xScale((d as VRScatterPoint).x);
        const y = this.yScale((d as VRScatterPoint).y);
        const z = this.zScale((d as VRScatterPoint).z);
        return `${0} ${0} ${-(.25)}`;
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

AFRAME.registerComponent('rotate_cards', {
  tick() {
    // need to include rig to account for initial rotation of camera rig
    const rigRot = (document.getElementById('rig') as AFRAME.Entity).object3D.rotation;
    const camRot = (document.querySelector('[camera]') as AFRAME.Entity).object3D.rotation;
    this.el.object3D.rotation.set(
       rigRot.x + camRot.x,
       rigRot.y + camRot.y,
       rigRot.z + camRot.z,
    );
  }
});


