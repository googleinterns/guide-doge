import { Hapticplot } from './hapticplot.d3';
import { $ } from 'protractor';


describe('VR Haptic Plot', () => {
  const shape = 'a-sphere';
  let element: HTMLElement;
  let hapticplot: Hapticplot;

  beforeEach( () =>  {
    element = document.createElement('a-scene');
    hapticplot = new Hapticplot(shape);
  });

  it('places no points bc 1:1 correspondence with empty element array', () => {
    hapticplot.init(element, []);
    const expectedPosArray = [];
    const result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each element in a one element array', () => {
    hapticplot.init(element, [10]);
    const expectedPosArray = [{ x: 0, y: 10, z: -1 }];
    const result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each element in a two element array', () => {
    hapticplot.init(element, [10, 10]);
    const expectedPosArray = [{ x: 0, y: 10, z: -1 }, { x: 0.1, y: 10, z: -1 }];
    const result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each element in a eight element array', () => {
    hapticplot.init(element, [10, 10, 20, 20, 30, 30, 40, 40]);
    const expectedPosArray = [
      { x: 0, y: 10, z: -1 }, { x: 0.10, y: 10, z: -1 },
      { x: 0.2, y: 20, z: -1 }, { x: 0.3, y: 20, z: -1 },
      { x: 0.4, y: 30, z: -1 }, { x: 0.5, y: 30, z: -1 },
     { x: 0.6, y: 40, z: -1 }, { x: 0.7, y: 40, z: -1 }];
    const result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each element in a three element array, and checks their color property', () => {
    hapticplot.init(element, [10, 20, 30]);
    const expectedColorArray = ['green', 'green' , 'green'];
    const result = getColor(element, shape);
    expect(result).toEqual(expectedColorArray);
  });

  it('places points for each element in a three element array, and checks their size property', () => {
    hapticplot.init(element, [10, 20, 30]);
    const expectedSizeArray = ['0.05', '0.05', '0.05'];
    const result = getRadius(element, shape);
    expect(result).toEqual(expectedSizeArray);
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

/*
*
Helper Functions
*
*/

// returns array of each generated objects color
function getColor(element: HTMLElement, shape: string): Array<string>{
  const childrenArray = element.querySelectorAll(shape);
  const colorArray: Array<string> = [];
  for (const child of (childrenArray as any)){
    colorArray.push((child as any).getAttribute('color'));
  }
  return colorArray;
}

// returns array of each generated objects radius
function getRadius(element: HTMLElement, shape: string): Array<string>{
  const childrenArray = element.querySelectorAll(shape);
  const sizeArray: Array<string> = [];
  for (const child of (childrenArray as any)){
    sizeArray.push((child as any).getAttribute('radius'));
  }
  return sizeArray;
}
