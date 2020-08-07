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
    readonly AILERON_FONT = 'https://cdn.aframe.io/fonts/Roboto-msdf.json';
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
    tilePosition: Record<string, string> = {
      ['xPos']: '-1 1 -4',
      ['xNeg']: '-2 1 -4',
      ['yPos']: '-1.5 1.5 -4',
      ['yNeg']: '-1.5 .5 -4',
      ['zPos']: '1 1.5 -4',
      ['zNeg']: '1 .5 -4',
  };
//   speedPosition: Record<string, string> = {
//     ['plus']: '1 2 -1.98',
//     ['minus']: '-1 2 -1.98',
//     ['label']: '0 2 -1.98'
// };
speedPosition: Record<string, string> = {
  ['plus']: '.25 1 -4',
  ['minus']: '-.25 1 -4',
  ['label']: '0 2 -1.98'
};
    cameraRig: HTMLElement = document.createElement('a-entity');
    ctrlPanel: HTMLElement = document.createElement('a-entity');


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
      this.setColor('royalblue');
    }
    this.createSky('lightgray');
    this.createGridPlane();
    this.createCtrlTools();
    this.loaded = true;
  }
  private createCtrlTools(){
    window.onload = () => {
      this.cameraRig = document.getElementById('rig')!;
      console.log(document.getElementById('rig')!);
      document.addEventListener('keydown', (event) => {
        if (event.keyCode === 81){
          document.querySelector('[camera]').object3D.position.set(
            document.querySelector('[camera]').object3D.position.x,
            document.querySelector('[camera]').object3D.position.y + .2,
            document.querySelector('[camera]').object3D.position.z
          );
        }
        if (event.keyCode === 90){
          document.querySelector('[camera]').object3D.position.set(
            document.querySelector('[camera]').object3D.position.x,
            document.querySelector('[camera]').object3D.position.y - .2,
            document.querySelector('[camera]').object3D.position.z
          );
        }
      });
    this.createNavTile('x', this.DAYDREAM_NAV_SPEED);
    this.createNavTile('x', -this.DAYDREAM_NAV_SPEED);
    this.createNavTile('y', this.DAYDREAM_NAV_SPEED);
    this.createNavTile('y', -this.DAYDREAM_NAV_SPEED);
    this.createNavTile('z', this.DAYDREAM_NAV_SPEED);
    this.createNavTile('z', -this.DAYDREAM_NAV_SPEED);
    this.createCtrlPanel();
    // this.createSpeedCtrls('plus');
    // this.createSpeedCtrls('neg');
    };
    
  }
  createCtrlPanel(){
    // const panel = this.ctrlPanel as AFRAME.Entity;
    // panel.id = 'ctrls';
    // document.querySelector('[camera]').appendChild(panel);
    // panel.setAttribute('position', '0 0 -2');
    // panel.addEventListener('mousedown', () => {
    //   panel.setAttribute('visible', !panel.object3D.visible);
    // });
    // panel.addEventListener('mouseleave', () => {
    //   panel.setAttribute('visible', !panel.object3D.visible);
    // });
    // // const backgrd = document.createElement('a-entity') as AFRAME.Entity;
    // // panel!.appendChild(backgrd);
    // panel.setAttribute('geometry', 'primitive: plane; height: 3; width: 2');
    // // backgrd.setAttribute('position', '0 0 -.25');
    // panel.setAttribute('material', 'color: white; opacity: .5');
    // const titleTile = document.createElement('a-entity') as AFRAME.Entity;
    // document.getElementById('ctrls')!.appendChild(titleTile);
    // titleTile.setAttribute('position', this.speedPosition.label);
    // titleTile.setAttribute('text', 'value: WebVR Control Panel; align: center; color: black;');
    // titleTile.setAttribute('scale', '6 6 1');
    // titleTile.setAttribute('position', '0 2.5 -1.98');
    this.createSpeedCtrls('plus');
    this.createSpeedCtrls('neg');
    this.createSpeedCtrls('label');

    // (panel as AFRAME.Entity).setAttribute('visible', false);
  }
  createSpeedCtrls(sign: string){
    const speedTile = document.createElement('a-entity') as AFRAME.Entity;
    document.querySelector('[camera]').appendChild(speedTile);
    // document.getElementById('ctrls')!.appendChild(navTile);
    if (sign === 'plus'){
      speedTile.setAttribute('geometry', 'primitive: plane; height: .35; width: .35');
      speedTile.setAttribute('position', this.speedPosition.plus);
      speedTile.setAttribute('material', 'color: white; opacity: .75; src: ../assets/plus.png;');
      speedTile.addEventListener('mousedown', () => {
        if (this.DAYDREAM_NAV_SPEED === 0){
          this.DAYDREAM_NAV_SPEED = 0;
        } else{
          this.DAYDREAM_NAV_SPEED = this.DAYDREAM_NAV_SPEED - .2;
        }
      });
      } else if (sign === 'neg'){
          speedTile.setAttribute('geometry', 'primitive: plane; height: .35; width: .35');
          speedTile.setAttribute('position', this.speedPosition.minus);
          speedTile.setAttribute('material', 'color: white; opacity: .75; src: ../assets/negative.png');
          speedTile.addEventListener('mousedown', () => {
            this.DAYDREAM_NAV_SPEED = this.DAYDREAM_NAV_SPEED + .2;
          });
      } else if (sign === 'label'){
          // speedTile.setAttribute('geometry', 'primitive: plane; height: auto; width: auto');
          speedTile.setAttribute('position', this.speedPosition.label);
          speedTile.setAttribute('text', 'value: Speed; align: center; color: black');
          speedTile.setAttribute('scale', '4 4 1');     
      }
  }
  createNavTile(dim: string, velocity: number){
    let rigPos = (document.getElementById('rig') as AFRAME.Entity).object3D.position;
    const navTile = document.createElement('a-entity');
    // document.querySelector('[camera]').appendChild(navTile);
    document.querySelector('[camera]').appendChild(navTile);
    // this.container!.appendChild(navTile);
    (navTile as AFRAME.Entity).setAttribute('geometry', 'primitive: plane; height: .5; width: .5');
    let sign = 1;
    if (dim === 'x'){
      if (velocity > 0){
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePosition.xPos);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/right_arrow.png');
      } else {
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePosition.xNeg);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/left_arrow.png');
        sign = -1;
      }
      (navTile as AFRAME.Entity).addEventListener('mousedown', () => {
        rigPos.set(
          rigPos.x + sign * this.DAYDREAM_NAV_SPEED,
          rigPos.y,
          rigPos.z
        );
      });
    } else if (dim === 'y'){
      if (velocity > 0){
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePosition.yPos);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/up_arrow.png');
      } else {
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePosition.yNeg);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/down_arrow.png');
         sign = -1;
      }
      (navTile as AFRAME.Entity).addEventListener('mousedown', () => {
        rigPos.set(
          rigPos.x,
          rigPos.y + sign * this.DAYDREAM_NAV_SPEED,
          rigPos.z
        );
      });
    } else if (dim === 'z'){
      if (velocity > 0){
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePosition.zPos);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/up_arrow.png');
      } else {
        (navTile as AFRAME.Entity).setAttribute('position', this.tilePosition.zNeg);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/down_arrow.png');
        sign = -1;

      }
      (navTile as AFRAME.Entity).addEventListener('mousedown', () => {
        rigPos.set(
          rigPos.x,
          rigPos.y,
          rigPos.z + sign * this.DAYDREAM_NAV_SPEED
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
      .attr('material', 'color: royalblue')
      .attr('text', (d, i) => {
        const categories = (d as VRScatterPoint).categories.browser + ', ' + (d as VRScatterPoint).categories.country
          + ', ' + (d as VRScatterPoint).categories.source;
        // for (let categChild of (d as VRScatterPoint).categories)
        const x = (d as VRScatterPoint).x;
        const y = (d as VRScatterPoint).y;
        const z = (d as VRScatterPoint).z;
        return `
        value: \n${categories} POSITION:
        \n \t${this.metrics[0]}: ${x}
        \n \t${this.metrics[1]}: ${y.toFixed(2)}
        \n \t${this.metrics[2]}: ${z} \n\n;
        font: ${this.AILERON_FONT};
        xOffset: ${DATA_PT_RADIUS / 3}`;
      })
      .attr('visible', false)
      .attr('position', (d, i) => {
        const x = this.xScale((d as VRScatterPoint).x);
        const y = this.yScale((d as VRScatterPoint).y);
        const z = this.zScale((d as VRScatterPoint).z);
        return `${x + DATA_PT_RADIUS} ${y + 2 * DATA_PT_RADIUS} ${z}`;
      })
      .each((d, i, g) => {
        (g[i] as AFRAME.Entity).setAttribute('rotate_cards', '');
        // (g[i] as AFRAME.Entity).setAttribute('show_cards', '');
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


