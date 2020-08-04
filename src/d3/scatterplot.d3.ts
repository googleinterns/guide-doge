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
    xScale: d3.ScaleLinear<number, number>;
    yScale: d3.ScaleLinear<number, number>;
    zScale: d3.ScaleLinear<number, number>;
    dataType: MetaType;
    loaded = false;


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
    if (this.data.length > 0 && !this.loaded){
      console.log(data);
      this.generatePts();
      this.generateText();
      this.setColor('blue');
    }
    this.createSky('gray');
    this.createGridPlane();
    this.loaded = true;
    window.onload = () => {
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
      })
      // document.querySelector('[camera]').object3D.rotation.set(0, (135 * Math.PI / 180) , 0);
      document.querySelector('[camera]').setAttribute('rotate_camera', '');
      
    };
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
    .on('mouseenter', (d, i) => {
      console.log(this.xScale((d as VRScatterPoint).x));
    });
  }

  private generateText(){
    // enter identifies any DOM elements to be added when # array elements doesn't match
    d3.select(this.dataTextContainer).selectAll('a-entity').data(this.data).enter().append('a-entity');
    d3.select(this.dataTextContainer).selectAll('a-entity')
      .attr('geometry', 'primitive: plane; height: auto; width: .5')
      .attr('material', 'color: blue')
      .attr('text', (d, i) => {
        const categories = (d as VRScatterPoint).categories.browser + ', ' + (d as VRScatterPoint).categories.country
          + ', ' + (d as VRScatterPoint).categories.source;
        // for (let categChild of (d as VRScatterPoint).categories)
        const x = (d as VRScatterPoint).x;
        const y = (d as VRScatterPoint).y;
        const z = (d as VRScatterPoint).z;
        return `
        value: ${categories} POSITION:
        \n \t${this.metrics[0]}: ${x}
        \n \t${this.metrics[1]}: ${y.toFixed(2)}
        \n \t${this.metrics[2]}: ${z}\n;
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
        (g[i] as AFRAME.Entity).setAttribute('show_cards', '');
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
    this.el.object3D.rotation.set(
       document.querySelector('[camera]').object3D.rotation.x,
       document.querySelector('[camera]').object3D.rotation.y,
       document.querySelector('[camera]').object3D.rotation.z,
    );
  }
});

AFRAME.registerComponent('show_cards', {
  tick() {
    if (this.el.object3D.position.distanceTo(document.querySelector('[camera]').object3D.position) < DATA_PT_RADIUS * 40){
      this.el.object3D.visible = true;
    } else {
      this.el.object3D.visible = false;
    }
  }
});

AFRAME.registerComponent('rotate_camera', {
  init() {
    this.el.setAttribute('rotation', '0, 135, 0');
  }
});
