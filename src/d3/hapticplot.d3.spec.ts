import { Hapticplot } from './hapticplot.d3';
import { resolve } from 'dns';

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
