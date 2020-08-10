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
    private DAYDREAM_NAV_SPEED;
    xScale: d3.ScaleLinear<number, number>;
    yScale: d3.ScaleLinear<number, number>;
    zScale: d3.ScaleLinear<number, number>;
    dataType: MetaType;
    loaded = false;
    tilePos: Record<string, string> = {
      ['xPos']: '-1 1 -4',
      ['xNeg']: '-2 1 -4',
      ['yPos']: '-1.5 1.5 -4',
      ['yNeg']: '-1.5 .5 -4',
      ['zPos']: '1 1.5 -4',
      ['zNeg']: '1 .5 -4',
  };
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
    this.dataTextContainer = document.createElement('a-entity');
    this.dataTextContainer.className = 'dataTxt';
    container.appendChild(this.dataPointContainer);
    container.appendChild(this.dataTextContainer);
    this.DAYDREAM_NAV_SPEED = .1;
    if (this.data.length > 0 && !this.loaded){
      this.generateText();
      this.generatePts();
      this.setColor('blue');
    }
    this.createSky('gray');
    this.createGridPlane();
    this.createNavTools();
    this.loaded = true;
  }
  private createNavTools(){
    window.onload = () => {
      this.dataTextContainer = document.createElement('a-entity');
      this.dataTextContainer.className = 'dataTxt';
      this.generateText();
      document.querySelector('[camera]').appendChild(this.dataTextContainer);
      this.container.removeChild(this.dataTextContainer);
      this.cameraRig = document.getElementById('rig')!;
      console.log(document.getElementById('rig')!);
      document.addEventListener('keydown', (event) => {
        const camPos = document.querySelector('[camera]').object3D.position;
        if (event.code === 'KeyQ'){
          camPos.set(
            camPos.x,
            camPos.y + .2,
            camPos.z
          );
        }
        if (event.code === 'KeyZ'){
          camPos.set(
            camPos.x,
            camPos.y - .2,
            camPos.z
          );
        }
      });
    this.createNavTile('x', this.DAYDREAM_NAV_SPEED);
    this.createNavTile('x', -this.DAYDREAM_NAV_SPEED);
    this.createNavTile('y', this.DAYDREAM_NAV_SPEED);
    this.createNavTile('y', -this.DAYDREAM_NAV_SPEED);
    this.createNavTile('z', this.DAYDREAM_NAV_SPEED);
    this.createNavTile('z', -this.DAYDREAM_NAV_SPEED);
      
    };
    
  }
  createNavTile(dim: string, velocity: number){
    let rigPos = (document.getElementById('rig') as AFRAME.Entity).object3D.position;
    const navTile = document.createElement('a-entity');
    // document.querySelector('[camera]').appendChild(navTile);
    document.querySelector('[camera]').appendChild(navTile);
    // this.container!.appendChild(navTile);
    (navTile as AFRAME.Entity).setAttribute('geometry', 'primitive: plane; height: .5; width: .5');
    if (dim === 'x'){
      if (velocity > 0){
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePos.xPos);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/right_arrow.png');
      } else {
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePos.xNeg);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/left_arrow.png');
      }
      (navTile as AFRAME.Entity).addEventListener('mousedown', () => {
        rigPos.set(
          rigPos.x + velocity,
          rigPos.y,
          rigPos.z
        );
      });
    } else if (dim === 'y'){
      if (velocity > 0){
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePos.yPos);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/up_arrow.png');
      } else {
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePos.yNeg);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/down_arrow.png');
      }
      (navTile as AFRAME.Entity).addEventListener('mousedown', () => {
        rigPos.set(
          rigPos.x,
          rigPos.y + velocity,
          rigPos.z
        );
      });
    } else if (dim === 'z'){
      if (velocity > 0){
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePos.zPos);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/up_arrow.png');
      } else {
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePos.zNeg);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/down_arrow.png');
      }
      (navTile as AFRAME.Entity).addEventListener('mousedown', () => {
        rigPos.set(
          rigPos.x,
          rigPos.y,
          rigPos.z + velocity
        );
      });
    }
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
    this.scalePosition();
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
        return `
        value: \n${categories} Position:\n\n\t  ${this.metrics[0]} (x): ${x}\n\n\t${this.metrics[1]}(y): ${y.toFixed(2)}\n\n\t${this.metrics[2]} (z): ${z}\n;
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


