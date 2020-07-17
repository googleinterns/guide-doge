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
    // create a scale so that there is correspondence between data set and screen render
    this.hscale = d3.scaleLinear();
    this.hscale.domain([0, d3.max(this.data) as number])  // max of dataset
      .range([0, 100]); 
    this.setupPoints('blue', 0.1);                        // linear mapping of data set values to values from 0 to 10
    this.createSky();
    this.createGridPlane();
  }

  // selects all entities of type this.shape
  private getShapes(){
    return d3.select(this.container).selectAll("datapoint");
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
      .data(this.data).enter().append(this.shape).classed("datapoint", true)
      // Updates points positions based on ingested data
      .attr('position', (d, i) => { return this.generatePositions(d, i); })
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
      .on('stateadded', function() {
        if (d3.event.detail === 'hovered'){
          d3.select(this).attr('color', 'orange');
        }
      })
      .on('stateremoved', function() {
        if (d3.event.detail === 'hovered'){
          d3.select(this).attr('color', 'green');
        }
      })
  }

  // Generates a world space position for each data entity, based on ingested data
  private generatePositions  (data, index){
    const x = index/10;
    const y = data;
    const z = -1;
    return `${x} ${y} ${z}`;
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
