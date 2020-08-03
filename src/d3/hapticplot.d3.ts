import * as d3 from 'd3';
import * as THREE from 'three';
import { Entity } from 'aframe';

export class Hapticplot{
    private data: number[];
    private shape: string;
    private container: HTMLElement | null = null;
    private graphScale: d3.ScaleLinear<number, number>;
    private hapticScale: d3.ScaleLinear<number, number>;

  constructor(shape: string) {
    this.shape = shape;
  }

  init(container: HTMLElement | null, data: number[]){
    const POINT_SIZE = 0.02;
    const DEFAULT_COLOR = '#F0A202';
    const HOVER_COLOR = 'red';

    this.data = data;
    this.container = container;
    // create a scale so that there is correspondence between data set and screen render,
    // a linear mapping of data set values to values from 0 to 10
    this.graphScale = d3.scaleLinear();
    this.graphScale.domain([0, d3.max(this.data) as number])  // max of dataset
      .range([0, 0.5]);
    this.hapticScale = d3.scaleLinear();
    this.hapticScale.domain([0, d3.max(this.data) as number])  // max of dataset
      .range([0, 1]);
    this.setupPoints(DEFAULT_COLOR, HOVER_COLOR, POINT_SIZE);
    this.createSky();
    this.createGridPlane();
  }

  /**
   * selects all entities of type datapoint
   */
  private getShapes(){
    return d3.select(this.container).selectAll('datapoint');
  }

  /**
   * Generates points in the scene based on initilization data
   *   - represented in scene as this.shape type entities
   * @param defaultColor Points default color
   * @param hoverColor Points color when hovered
   * @param size Size of each point
   */
  private setupPoints(defaultColor, hoverColor, size) {
    this.getShapes()
      // Adds points of type this.shape to the scene
      //  - "enter" identifies any DOM elements to be added when # array
      //    elements & # DOM elements don't match
      .data(this.data).enter().append(this.shape).classed('datapoint', true)
      // Updates points positions based on ingested data
      .each((d, i , g) => this.setPosition(d, i, g[i]))
      // Adds given color property to all points
      .attr('color', defaultColor)
      // Sets points radius property
      .attr('radius', size)
      // Enables controller interaction with points using superhands' tags
      .attr('hoverable', '')
      // Adds listeners for state change events, which trigger a change in the
      // point's color property when a hover event occurs
      .on('hover-start',  (d, i, g) => this.onHoverStart(g[i], this.hapticScale(d), hoverColor, size))
      .on('hover-end',  (d, i, g) => this.onHoverEnd(g[i], defaultColor, size));

  }

  /**
   * Generates a world space position for each data entity, based on ingested data
   * @param data Ingested Data
   * @param index Crrent index in data array
   */
  private setPosition(datum, index, entity){
    const x = (0.5 / this.data.length) * index;
    const y = this.graphScale(datum) + 1;
    const z = -1;
    (entity as Entity).object3D.position.set(x, y, z);
  }

  /**
   * When a data entity begins being hovered by the controller entity
   *  - triggers a haptic pulse
   *  - changes the entities color to indicate a pulse has fired
   * @param entity The entity being hovered
   * @param hapticIntensity A points haptic intensity, based on is associated data
   * @param hoverColor The colorthe entity takes on while hoverec
   */
  private onHoverStart(entity, hapticIntensity, hoverColor, size){
    d3.event.detail?.hand?.components.haptics.pulse(hapticIntensity, 5000);
    d3.select(entity)
      .attr('color', hoverColor)
      .attr('radius', size + (hapticIntensity / 30));
  }

  /**
   * When an object stops being hovered by the controller entity
   *  - changes the entities color to indicate hovering has ended
   * @param entity The data entity which is no longer hovered
   * @param defaultColor The default color of unhovered entities
   */
  private onHoverEnd(entity, defaultColor, size){
    d3.event.detail?.hand?.components.haptics.pulse(0, 1);
    d3.select(entity)
      .attr('color', defaultColor)
      .attr('radius', size);
  }

  // Creates and adds a sky box to the scene
  private createSky(){
    const aSky = document.createElement('a-sky');
    this.container!.appendChild(aSky);
    d3.select(this.container).selectAll('a-sky').attr('color', () => {
      return '#4d4d4d';
    });
  }

  // Creates and adds grid 3D grid lines to the scene
  private createGridPlane()
  {
    const xGrid = document.createElement('a-entity');
    xGrid.id = 'xGrid';
    this.container!.appendChild(xGrid);
    xGrid.object3D.add(new THREE.GridHelper(1, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#xGrid').attr('position', '0 1 -1');
    d3.select(this.container).select('#xGrid').attr('rotation', '0 0 0');

    const yGrid = document.createElement('a-entity');
    yGrid.id = 'yGrid';
    this.container!.appendChild(yGrid);
    yGrid.object3D.add(new THREE.GridHelper(1, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#yGrid').attr('position', '0 1 -1');
    d3.select(this.container).select('#yGrid').attr('rotation', '0 0 -90');

    const zGrid = document.createElement('a-entity');
    zGrid.id = 'zGrid';
    this.container!.appendChild(zGrid);
    zGrid.object3D.add(new THREE.GridHelper(1, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#zGrid').attr('position', '0 1 -1');
    d3.select(this.container).select('#zGrid').attr('rotation', '-90 0 0');
  }
}
