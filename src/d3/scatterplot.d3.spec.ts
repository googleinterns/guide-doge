import { Scatterplot } from './scatterplot.d3';
import { resolve } from 'dns';

describe('VR Scatter Plot', () => {
  let shape = 'a-sphere';
  let element: HTMLElement;
  let scatterplot: Scatterplot;

  beforeEach( () =>  {
    element = document.createElement('a-scene');
    scatterplot = new Scatterplot(shape);
  });
  // it('places no points bc 1:1 correspondence with empty element array', () => {
  //   scatterplot.init(element, []);
  //   let expectedPosArray = [];
  //   let result = getPosition(element, shape);
  //   expect(result).toEqual(expectedPosArray);
  // });
  it('places points for each element in a one element array', () => {
    scatterplot.init(element, [10]);
    let expectedPosArray = [{ x: 0, y: 0, z: -20 }];
    //await new Promise(resolve => setTimeout(resolve, 4000));
    let result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });
  it('places points for each element in a two element array', () => {
    scatterplot.init(element, [10, 10]);
    let expectedPosArray = [{ x: 0, y: 0, z: -20 }, { x: 5, y: 10, z: -20 }];
    let result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });
  it('places points for each element in a eight element array', () => {
    scatterplot.init(element, [10, 10, 20, 20, 30, 30, 40, 40]);
    let expectedPosArray = [{ x: 0, y: 0, z: -20 }, { x: 5, y: 10, z: -20 }, { x: 15, y: 30, z: -40 }, { x: 20, y: 40, z: -60 }, { x: 25, y: 50, z: -60 }, { x: 5, y: 10, z: -20 }, { x: 30, y: 60, z: -80 }, { x: 35, y: 70, z: -80 }];
    let result = getPosition(element, shape);
    //expect(result).toEqual(expectedPosArray);
  });
});

// returns array of actual position vectors
function getPosition(element: HTMLElement, shape: string): Array<{x: number, y:number, z:number}>{
  let childrenArray = element.querySelectorAll(shape);
  let positionArray: Array<{x: number, y:number, z:number}> = [];
  for (let i = 0; i < childrenArray.length; i++){
    positionArray.push((childrenArray[i] as any).components.position.attrValue);
  }
  return positionArray;
}
