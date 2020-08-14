import * as d3 from 'd3';
import * as THREE from 'three';
import { Entity } from 'aframe';
import { sanitizeUrl } from '@braintree/sanitize-url';

const POINT_SIZE = 0.01;
const DEFAULT_COLOR = '#F0A202';
const HOVER_COLOR = 'red';
const SKY_COLOR = '#4d4d4d';
const ASSETS_FOLDER = 'assets/marimbaNotes/';

export class Hapticplot{
    private data: number[];
    private shape: string;
    private container: HTMLElement | null = null;
    private graphScale: d3.ScaleLinear<number, number>;
    private hapticScale: d3.ScaleLinear<number, number>;
    private audioScale: d3.ScaleLinear<number, number>;

  constructor(shape: string) {
    this.shape = shape;
  }

  init(container: HTMLElement | null, data: number[]){
    this.data = data;
    this.container = container;
    // Creates a linear mapping from this.data to graph positions, haptic intensities, and audio selection
    this.graphScale = d3.scaleLinear()
      .domain([0, d3.max(this.data) as number])  // max of dataset
      .range([0, 0.5]);
    this.hapticScale = d3.scaleLinear()
      .domain([0, d3.max(this.data) as number])  // max of dataset
      .range([0, 1]);
    this.audioScale = d3.scaleLinear()
      .domain([0, d3.max(this.data) as number])  // max of dataset
      .range([0, 27]);
    this.setupPoints(DEFAULT_COLOR, HOVER_COLOR, POINT_SIZE);
    this.createSky();
    this.createGridPlane();
  }

  /**
   * Selects all entities of type datapoint
   */
  private getShapes(){
    return d3.select(this.container).selectAll('datapoint');
  }

  /**
   * Generates data points in the scene based on initilization data
   *   - represented in scene as this.shape type entities
   * @param defaultColor Data points default color
   * @param hoverColor Data points color when hovered
   * @param size Size of each point
   */
  private setupPoints(defaultColor, hoverColor, size) {
    this.getShapes()
      // Adds points of type this.shape to the scene
      //  - "enter" identifies any DOM elements to be added when # array
      //    elements & # DOM elements don't match
      .data(this.data).enter().append(this.shape).classed('datapoint', true)
      // Adds given color property to all points
      .attr('color', defaultColor)
      // Sets points radius property
      .attr('radius', size)
      // Enables controller interaction with points using superhands' tags
      .attr('hoverable', '')
      // Updates points positions based on ingested data
      .each((d, i , g) => this.setPosition(d, i, g[i]))
      // Adds audio triggers to points based on ingested data
      .each((d, i , g) => this.setAudio(d, g[i]))
      // Adds listeners for state change events, which trigger a change in the
      // point's color property when a hover event occurs
      .on('hover-start',  (d, i, g) => this.onHoverStart(g[i], this.hapticScale(d), hoverColor, size))
      .on('hover-end',  (d, i, g) => this.onHoverEnd(g[i], defaultColor, size));

  }

  /**
   * Sets a world space position for each point, based on ingested data
   * @param data Ingested Data
   * @param index Crrent index in data array
   * @param point the point whos position is being set
   */
  private setPosition(datum, index, point){
    const x = (0.5 / this.data.length) * index;
    const y = this.graphScale(datum) + 1;
    const z = -1;
    (point as Entity).object3D.position.set(x, y, z);
  }

  /**
   * Attaches audio triggers to each point, mapping associated data to mp3 marimba notes
   * @param datum Ingested Data
   * @param point the point who's position is being set
   */
  private setAudio(datum, point){
    const sanitizedUrl = sanitizeUrl(`${ASSETS_FOLDER}${Math.round(this.audioScale(datum))}.mp3`);
    d3.select(point)
      .attr('sound', `src: url(${sanitizedUrl}); on: hover-start`);
  }

  /**
   * Triggers a haptic pulse and changes a points color and size when a it is hovered by the controller entity
   * @param point The point being hovered
   * @param hapticIntensity A points haptic intensity, based on is associated data
   * @param hoverColor The color the point takes on while hovered
   * @param size The radius of the point being hovered
   */
  private onHoverStart(point, hapticIntensity, hoverColor, size){
    d3.event.detail?.hand?.components.haptics.pulse(hapticIntensity, 5000);
    d3.select(point)
      .attr('color', hoverColor)
      .attr('radius', size + (hapticIntensity / 60));
  }

  /**
   * Changes a points color and size when it stops being hovered by the controller entity
   * @param point The point which is no longer hovered
   * @param defaultColor The default color of unhovered entities
   * @param size The radius of the point no longer being hovered
   */
  private onHoverEnd(point, defaultColor, size){
    d3.event.detail?.hand?.components.haptics.pulse(0, 1);
    d3.select(point)
      .attr('color', defaultColor)
      .attr('radius', size);
  }

  /**
   * Creates and adds a sky box to the scene
   */
  private createSky(){
    const aSky = document.createElement('a-sky');
    this.container!.appendChild(aSky);
    d3.select(this.container).selectAll('a-sky').attr('color', SKY_COLOR);
  }

  /**
   * Creates and adds grid 3D grid lines to the scene
   */
  private createGridPlane()
  {
    const xGrid = document.createElement('a-entity');
    xGrid.id = 'xGrid';
    this.container!.appendChild(xGrid);
    xGrid.object3D.add(new THREE.GridHelper(1, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#xGrid')
      .attr('position', '0 1 -1')
      .attr('rotation', '0 0 0');

    const yGrid = document.createElement('a-entity');
    yGrid.id = 'yGrid';
    this.container!.appendChild(yGrid);
    yGrid.object3D.add(new THREE.GridHelper(1, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#yGrid')
      .attr('position', '0 1 -1')
      .attr('rotation', '0 0 -90');

    const zGrid = document.createElement('a-entity');
    zGrid.id = 'zGrid';
    this.container!.appendChild(zGrid);
    zGrid.object3D.add(new THREE.GridHelper(1, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#zGrid')
      .attr('position', '0 1 -1')
      .attr('rotation', '-90 0 0');
  }
}
