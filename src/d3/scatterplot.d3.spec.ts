import { Scatterplot } from './scatterplot.d3';
import { TimeSeriesPoint } from '../datasets/queries/time-series.query';
import { VRTimeSeriesPoint } from '../datasets/queries/vr-time-series.query';

const shape = 'a-sphere';
let element: HTMLElement;
let scatterplot: Scatterplot;
let startDate: Date = new Date();

describe('VR Scatter Plot', () => {

  let scatterPlotData1: VRTimeSeriesPoint[]  = [];
  scatterPlotData1.push({categories: [], x: 20, y: 10, z: 10});
  
  let scatterPlotData8: VRTimeSeriesPoint[] = [];
  for (let i = 0; i < 7; i++){
    scatterPlotData8.push({categories: [],x: i * 20, y: i * 10, z: i * 5});
  }

  beforeEach( () =>  {
    element = document.createElement('a-scene');
    scatterplot = new Scatterplot(shape);

  });
  it('places no points bc 1:1 correspondence with empty element array', () => {
    scatterplot.init(element, [], 'line');
    const expectedPosArray = [];
    const result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });
});

describe('Adding VR Grids/Sky', () => {
  let element: HTMLElement;
  let scatterplot: Scatterplot;

  beforeEach( () =>  {
    element = document.createElement('a-scene');
    scatterplot = new Scatterplot('a-sphere');
  });
  it('Check for sky', () => {
    scatterplot.init(element, [], 'vrScatter');
    const sky = document.getElementsByTagName('a-sky');
    let skyPresent = false;
    if (sky !== null){
      skyPresent = true;
    }
    expect(skyPresent).toEqual(true);
  });
  it('Check for xGrid', () => {
    scatterplot.init(element, [], 'vrScatter');
    const xGrid = document.getElementById('xGrid');
    let xGridPresent = false;
    if (xGrid !== null){
      xGridPresent = true;
    }
    expect(xGridPresent).toEqual(true);
  });
  it('Check for yGrid', () => {
    scatterplot.init(element, [], 'vrScatter');
    const yGrid = document.getElementById('yGrid');
    let yGridPresent = false;
    if (yGrid !== null){
      yGridPresent = true;
    }
    expect(yGridPresent).toEqual(true);
  });
  it('Check for zGrid', () => {
    scatterplot.init(element, [], 'vrScatter');
    const zGrid = document.getElementById('zGrid');
    let zGridPresent = false;
    if (zGrid !== null){
      zGridPresent = true;
    }
    expect(zGridPresent).toEqual(true);
  });
});

// returns array of actual position vectors
function getPosition(element: HTMLElement, shape: string): Array<{x: number, y: number, z: number}>{
  const childrenArray = element.querySelectorAll(shape);
  const positionArray: Array<{x: number, y: number, z: number}> = [];
  for (const child of (childrenArray as any)){
    positionArray.push((child as any).components.position.attrValue);
  }
  return positionArray;
}