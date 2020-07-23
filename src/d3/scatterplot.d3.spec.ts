import { Scatterplot } from './scatterplot.d3';
import { TimeSeriesPoint } from '../datasets/queries/time-series.query';
import { VRTimeSeriesPoint } from '../datasets/queries/vr-time-series.query';

const shape = 'a-sphere';
let element: HTMLElement;
let scatterplot: Scatterplot;

describe('VR Scatter Plot', () => {

  let scatterPlotData1: VRTimeSeriesPoint[]  = [];
  scatterPlotData1.push({categories: [], x: 0, y: 0, z: 0});
  
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
  it('places points for each element in a one element array', () => {
    scatterplot.init(element, scatterPlotData1, 'line');
    const expectedPosArray = [{ x: 0, y: 0, z: 0 }];
    const result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });
  it('places points for each element in a eight element array', () => {
    scatterplot.init(element, scatterPlotData8, 'line');
    const expectedPosArray = [
      { x: 0, y: 0, z: 0 }, { x: 20, y: 10, z: 5 },
      { x: 40, y: 20, z: 10 }, { x: 60, y: 30, z: 15 },
      { x: 80, y: 40, z: 20 }, { x: 100, y: 50, z: 25 },
     { x: 120, y: 60, z: 30 }, { x: 140, y: 70, z: 35 }];
    const result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });
});

describe('Checking for presence of', () => {
  let element: HTMLElement;
  let scatterplot: Scatterplot;
  let grids: HTMLCollectionOf<Element>;

  beforeEach( () =>  {
    element = document.createElement('a-scene');
    scatterplot = new Scatterplot('a-sphere');
    scatterplot.init(element, [], 'vrScatter');
    grids = element.getElementsByClassName('grids');
  });
  it('aframe sky', () => {
    scatterplot.init(element, [], 'vrScatter');
    const sky = document.getElementsByTagName('a-sky');
    let skyPresent = false;
    if (sky !== null){
      skyPresent = true;
    }
    expect(skyPresent).toEqual(true);
  });

  it('GridHelper xGrid', () => {
    const xGridPresent = Array.from(grids).some((grid) => grid.id === 'xGrid');
    expect(xGridPresent).toEqual(true);
  });

  it('GridHelper yGrid', () => {
    const yGridPresent = Array.from(grids).some((grid) => grid.id === 'yGrid');
    expect(yGridPresent).toEqual(true);
  });

  it('GridHelper zGrid', () => {
    const zGridPresent = Array.from(grids).some((grid) => grid.id === 'zGrid');
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