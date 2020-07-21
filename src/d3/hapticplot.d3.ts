import * as d3 from 'd3';
import * as THREE from 'three';

export class Hapticplot{
    private data: number[];
    private shape: string;
    private container: HTMLElement | null = null;
    private hscale: d3.ScaleLinear<number, number>;

  constructor(shape: string) {
    this.shape = shape;
  }

  init(container: HTMLElement | null, data: number[]){
    this.data = data;
    this.container = container;
    // create a scale so that there is correspondence between data set and screen render,
    // a linear mapping of data set values to values from 0 to 10
    this.hscale = d3.scaleLinear();
    this.hscale.domain([0, d3.max(this.data) as number])  // max of dataset
      .range([0, 100]);
    this.setupPoints('green', 0.05);
    this.createSky();
    this.createGridPlane();
  }


  private getShapes(){
    /*
    selects all entities of type this.shape
    */
    return d3.select(this.container).selectAll('datapoint');
  }

  private setupPoints(color, size) {
    /*
    Generates points in the scene based on initilization data
      - represented in scene as this.shape type entities
    */
    this.getShapes()
      // Adds points of type this.shape to the scene
      //  - "enter" identifies any DOM elements to be added when # array
      //    elements & # DOM elements don't match
      .data(this.data).enter().append(this.shape).classed('datapoint', true)
      // Updates points positions based on ingested data
      .attr('position', (d, i) =>  this.generatePositions(d, i))
      // Adds given color property to all points
      .attr('color', color)
      // Sets points radius property
      .attr('radius', size)
      // Enables controller interaction with points using superhands' tags
      .attr('hoverable', '')
      .attr('grabbable', '')
      .attr('stretchable', '')
      .attr('draggable', '')
      .attr('dropppable', '')
      // Adds listeners for state change events, which trigger a change in the
      // point's color property when a hover event occurs
      .on('hover-start',  (d, i, g) => this.onHoverStart(g[i], d, 'red'))
      .on('hover-end',  (d, i, g) => this.onHoverEnd(g[i], 'green'));

  }

  private generatePositions(data, index){
    /*
      Generates a world space position for each data entity, based on ingested data
    */
    const x = index / 10;
    const y = data;
    const z = -1;
    return `${x} ${y} ${z}`;
  }

  private onHoverStart(entity, hapticIntensity, color){
    /*
    When an object begins being hovered by the controller entity
     - triggers a haptic pulse
     - changes the entities color to indicate a pulse has fired
    */
    d3.event.detail.hand.components.haptics.pulse(hapticIntensity, 1000);
    d3.select(entity).attr('color', color);
  }

  private onHoverEnd(entity, color){
    /*
    When an object stops being hovered by the controller entity
     - changes the entities color to indicate hovering has ended
    */
    d3.select(entity).attr('color', color);
  }

  private createSky(){
    /*
    creates and adds a sky box to the scene
    */
    const aSky = document.createElement('a-sky');
    this.container!.appendChild(aSky);
    d3.select(this.container).selectAll('a-sky').attr('color', () => {
      return '#f2b9af';
    });
  }

  private createGridPlane()
  {
    /*
    creates and adds grid 3D grid lines to the scene
    */
    const xGrid = document.createElement('a-entity');
    xGrid.id = 'xGrid';
    this.container!.appendChild(xGrid);
    xGrid.object3D.add(new THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#xGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#xGrid').attr('rotation', '0 0 0');

    const yGrid = document.createElement('a-entity');
    yGrid.id = 'yGrid';
    this.container!.appendChild(yGrid);
    yGrid.object3D.add(new THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#yGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#yGrid').attr('rotation', '0 0 -90');

    const zGrid = document.createElement('a-entity');
    zGrid.id = 'zGrid';
    this.container!.appendChild(zGrid);
    zGrid.object3D.add(new THREE.GridHelper(50, 50, 0xffffff, 0xffffff));
    d3.select(this.container).select('#zGrid').attr('position', '0 0 0');
    d3.select(this.container).select('#zGrid').attr('rotation', '-90 0 0');
  }
}
