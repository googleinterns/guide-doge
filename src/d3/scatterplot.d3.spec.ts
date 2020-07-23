import { Scatterplot } from './scatterplot.d3';
import { TimeSeriesPoint } from '../datasets/queries/time-series.query';
// import { VRTimeSeriesPoint } from '../datasets/queries/vr-time-series.query';

describe('VR Scatter Plot', () => {
  const shape = 'a-sphere';
  let element: HTMLElement;
  let scatterplot: Scatterplot;
  const lineChartData1: TimeSeriesPoint[]  = [];
  lineChartData1.push({x: new Date(), y: 0});

  const lineChartData8: TimeSeriesPoint[] = [];
  for (let i = 0; i < 8; i++){
    lineChartData8.push({x: new Date(), y: i * 10});
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
    scatterplot.init(element, lineChartData1, 'line');
    const expectedPosArray = [{ x: 0, y: 0, z: 0 }];
    const result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });
  it('places points for each element in a eight element array', () => {
    scatterplot.init(element, lineChartData8, 'line');
    const expectedPosArray = [
      { x: 0, y: 0, z: 0 }, { x: 10, y: 10, z: 10 },
      { x: 20, y: 20, z: 20 }, { x: 30, y: 30, z: 30 },
      { x: 40, y: 40, z: 40 }, { x: 50, y: 50, z: 50 },
     { x: 60, y: 60, z: 60 }, { x: 70, y: 70, z: 70 }];
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
    expect(findGrids(grids, 'xGrid')).toEqual(true);
  });

  it('GridHelper yGrid', () => {
    expect(findGrids(grids, 'yGrid')).toEqual(true);
  });

  it('GridHelper zGrid', () => {
    expect(findGrids(grids, 'zGrid')).toEqual(true);
  });
});

function findGrids(entities: HTMLCollectionOf<Element>, gridID: string): boolean{
  for (const entity of (entities as any)){
    if (entity.id === gridID){
      return true;
    }
  }
  return false;
}

// returns array of actual position vectors
function getPosition(element: HTMLElement, shape: string): Array<{x: number, y: number, z: number}>{
  const childrenArray = element.querySelectorAll(shape);
  const positionArray: Array<{x: number, y: number, z: number}> = [];
  for (const child of (childrenArray as any)){
    positionArray.push((child as any).components.position.attrValue);
  }
  return positionArray;
}
