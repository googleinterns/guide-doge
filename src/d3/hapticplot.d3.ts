import * as d3 from 'd3';
import * as THREE from 'three';
import { Entity, Component } from 'aframe';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { Vector3 } from 'three';
import { BaseType } from 'd3';
import { VRScatterPoint } from 'src/datasets/queries/vr.query';

const POINT_SIZE = 0.02;
const DEFAULT_COLOR = '#F0A202';
const HOVER_COLOR = 'red';
const SKY_COLOR = '#4d4d4d';
const ASSETS_FOLDER = 'assets/';
const GRAPH_SIZE = 1.4;
const DEFAULT_ORIGIN = new Vector3(0, 1, -0.35);

interface Sound extends Component {
  isPlaying: boolean;
  playSound(): void;
  stopSound(): void;
}

export class Hapticplot{
    private data: VRScatterPoint[];
    private shape: string;
    private container: HTMLElement | null = null;
    private xScale: d3.ScaleLinear<number, number>;
    private yScale: d3.ScaleLinear<number, number>;
    private zScale: d3.ScaleLinear<number, number>;
    private audioScale: d3.ScaleLinear<number, number>;
    private graphOffset: Vector3;

  constructor(shape: string) {
    this.shape = shape;
  }

  init(container: HTMLElement | null, data: VRScatterPoint[]){
    this.data = data;
    this.container = container;
    this.graphOffset = DEFAULT_ORIGIN;
    this.setupScene();
  }

  // when dataset changes, clears current set of points and grids
  private async setupScene(){
    await this.clearPointsAndGrids();
    this.setupScales();
    this.setupPoints(DEFAULT_COLOR, HOVER_COLOR, POINT_SIZE);
    this.setupControllers();
    this.createSky();
    this.createGridPlane();
  }

  // when dataset changes, clears current set of points and grids
  private async clearPointsAndGrids(){
    this.getShapes().remove();
    this.recenterGrids(DEFAULT_ORIGIN);
  }

  /**
   * Selects all elements with html tag this.shape
   */
  private getShapes(){
    return d3.select(this.container).selectAll(this.shape);
  }

  /**
   * Selects all elements of class grid
   */
  private getGrids(){
    return d3.select(this.container).selectAll('.grid');
  }

  /**
   * Sets up the X Y and Z scales to map the given data to the graphs max and min positions
   */
  private setupScales() {
    this.xScale = d3.scaleLinear()
      .domain([
        Math.min.apply(Math, this.data.map((datum) => datum.x)),
        Math.max.apply(Math, this.data.map((datum) => datum.x))])
      .range([- GRAPH_SIZE / 2, GRAPH_SIZE / 2]);

    this.yScale = d3.scaleLinear()
      .domain([
        Math.min.apply(Math, this.data.map((datum) => datum.y)),
        Math.max.apply(Math, this.data.map((datum) => datum.y))])
      .range([- GRAPH_SIZE / 2, GRAPH_SIZE / 2]);

    this.zScale = d3.scaleLinear()
      .domain([
        Math.min.apply(Math, this.data.map((datum) => datum.z)),
        Math.max.apply(Math, this.data.map((datum) => datum.z))])
      .range([- GRAPH_SIZE / 2, GRAPH_SIZE / 2]);

    this.audioScale = d3.scaleLinear()
      .domain([
        Math.min.apply(Math, this.data.map((datum) => datum.y)),
        Math.max.apply(Math, this.data.map((datum) => datum.y))])
      .range([0, 27]);
  }

  /**
   * Generates data points in the scene based on initilization data
   *   - represented in scene as this.shape type entities
   * @param defaultColor Data points default color
   * @param hoverColor Data points color when hovered
   * @param size Size of each point
   */
  private setupPoints(defaultColor: string, hoverColor: string, size: number) {
    this.getShapes()
      // Adds points of type this.shape to the scene
      //  - "enter" identifies any DOM elements to be added when # array
      //    elements & # DOM elements don't match
      .data(this.data).enter().append(this.shape)
      // Adds given color property to all points
      .attr('color', defaultColor)
      // Sets points radius property
      .attr('radius', size)
      // Enables controller interaction with points using superhands' tags
      .attr('hoverable', '')
      // Updates points positions based on ingested data
      .each((d, i , g) => this.setPosition(d, g[i]))
      // Adds audio triggers to points based on ingested data
      .each((d, i , g) => this.setAudio(d, g[i]))
      // Adds listeners for state change events, which trigger a change in the
      // point's color property when a hover event occurs
      .on('hover-start',  (d, i, g) => this.onHoverStart(d, g[i], hoverColor))
      .on('hover-end',  () => this.onHoverEnd());
  }


  /**
   * Sets a world space position for each data point, based on ingested data
   * @param datum the data from which the points positin will be set
   * @param point The point whos position is being set
   */
  private setPosition(datum: VRScatterPoint, point: BaseType){
    const x = this.graphOffset.x + this.xScale(datum.x);
    const y = this.graphOffset.y + this.yScale(datum.y);
    const z = this.graphOffset.z + this.zScale(datum.z);
    (point as Entity).object3D.position.set(x, y, z);
  }

  /**
   * Attaches audio triggers to each point, mapping associated data to mp3 marimba notes
   * @param datum Ingested Data
   * @param point The point who's position is being set
   */
  private setAudio(datum: VRScatterPoint, point: BaseType){
    const sanitizedUrl = sanitizeUrl(`${ASSETS_FOLDER}marimbaNotes/${Math.round(this.audioScale(datum.y))}.mp3`);
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
  private onHoverStart(datum: VRScatterPoint, point: BaseType, hoverColor: string){
    d3.select(point)
      .attr('color', hoverColor);
    if (((point as Entity).components.sound as Sound).isPlaying){
      ((point as Entity).components.sound as Sound).stopSound();
    }
    d3.select(d3.event.detail?.hand)
    .on('abuttonup',  () => this.speakPosition(datum, point))
    .on('xbuttonup',  () => this.speakPosition(datum, point));
  }

  /**
   * Reads out the position of the given point in spoken audio, and resets its sound component to
   * the appropriate marimba note audio upon completion
   * @param datum The datum from which the given points position and audio is generated
   * @param point A data point entity
   */
  private speakPosition(datum: VRScatterPoint, point: BaseType){
    const posString =
      `X${Math.round(datum.x * 100) / 100}` +
      `Y${Math.round(datum.y * 100) / 100}` +
      `Z${Math.round(datum.z * 100) / 100}`;
    this.speakStringRec(datum, posString, 0, point);
  }

  /**
   * This function sets the source of the given point's sound component
   * as the audio file specified by the value in the speech string at the given index.
   * It then sets up an event listener to call itself recursivly once the audio file completes,
   * playing the file at the following index. Once finished, it resets the marimba audio trigger.
   * @param datum The datum from which the given points position and audio is generated
   * @param speechString A string specifying the order in which the tts audio files should be played
   * @param index The index of the next file to be played within the speechString
   * @param point The point whos position is being spoken
   */
  private speakStringRec(datum: VRScatterPoint, speechString: string, index: number, point: BaseType){
    const sanitizedUrlTts = sanitizeUrl(`${ASSETS_FOLDER}tts/tts${speechString[index]}.mp3`);
    d3.select(point)
      .attr('sound', `src: url(${sanitizedUrlTts});`);
    ((point as Entity).components.sound as Sound).playSound();
    index += 1;
    if (index < speechString.length){
      d3.select(point)
        .on('sound-ended',  (d, i, g) => this.speakStringRec(datum, speechString, index, g[i]));
    }
    else {
        d3.select(point)
          .on('sound-ended', () => this.setAudio(datum, point));
    }
  }

  /**
   * Removes X and A button listeners from the controller when a hover event occurs
   */
  private onHoverEnd(){
    d3.select(d3.event.detail?.hand)
      .on('abuttonup',  null)
      .on('xbuttonup',  null);
  }

  /**
   * Adds a listener to the each controller which recenters the grids and data points on thumbstickup events
   */
  private setupControllers() {
    this.getControllers()
      .on('thumbstickup',  (d, i, g) => this.recenterGrids((g[i] as Entity).object3D.position))
      .attr('guide', null)
      .attr('guide', '');
  }

  /**
   * Selects all elements of class controller
   */
  private getControllers(){
    return d3.select(this.container).selectAll('.controller');
  }

  /**
   * Updates the position of the graph and datapoints to place the graph's origin at the controllers current position
   * @param controller the controller who's position will determine the new graph origin
   */
  private recenterGrids(controllerPosition: Vector3) {
    this.graphOffset = controllerPosition;
    this.getGrids().each((d, i, g) =>
      (g[i] as Entity).object3D.position.set(this.graphOffset.x, this.graphOffset.y, this.graphOffset.z)
    );
    this.getShapes().each((d, i , g) => this.setPosition((d as VRScatterPoint), g[i]));
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
    if (this.getGrids().empty()){
      const xGrid = document.createElement('a-entity');
      xGrid.id = 'xGrid';
      this.container!.appendChild(xGrid);
      xGrid.object3D.add(new THREE.GridHelper(GRAPH_SIZE, 50, 0xffffff, 0xffffff));
      d3.select(this.container).select('#xGrid')
        .attr('class', 'grid')
        .attr('position', `${this.graphOffset.x} ${this.graphOffset.y} ${this.graphOffset.z}`)
        .attr('rotation', '0 0 0');

      const yGrid = document.createElement('a-entity');
      yGrid.id = 'yGrid';
      this.container!.appendChild(yGrid);
      yGrid.object3D.add(new THREE.GridHelper(GRAPH_SIZE, 50, 0xffffff, 0xffffff));
      d3.select(this.container).select('#yGrid')
        .attr('class', 'grid')
        .attr('position', `${this.graphOffset.x} ${this.graphOffset.y} ${this.graphOffset.z}`)
        .attr('rotation', '0 0 -90');
      (yGrid as Entity).flushToDOM();

      const zGrid = document.createElement('a-entity');
      zGrid.id = 'zGrid';
      this.container!.appendChild(zGrid);
      zGrid.object3D.add(new THREE.GridHelper(GRAPH_SIZE, 50, 0xffffff, 0xffffff));
      d3.select(this.container).select('#zGrid')
        .attr('class', 'grid')
        .attr('position', `${this.graphOffset.x} ${this.graphOffset.y} ${this.graphOffset.z}`)
        .attr('rotation', '-90 0 0');
    }
  }
}
