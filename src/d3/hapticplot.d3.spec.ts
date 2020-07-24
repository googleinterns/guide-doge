import { Hapticplot } from './hapticplot.d3';
import { Entity } from 'aframe';


describe('VR Haptic Plot', () => {
  const shape = 'a-sphere';
  let scene: HTMLElement;
  let hapticplot: Hapticplot;

  beforeEach( () =>  {
    scene = document.createElement('a-scene');
    hapticplot = new Hapticplot(shape);
  });

  it('places no points bc 1:1 correspondence with empty data array', () => {
    hapticplot.init(scene, []);
    const expectedPosArray = [];
    const result = getPosition(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum in a one datum array', () => {
    hapticplot.init(scene, [10]);
    const expectedPosArray = [{ x: 0, y: 10, z: -1 }];
    const result = getPosition(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum in a two datum array', () => {
    hapticplot.init(scene, [10, 10]);
    const expectedPosArray = [{ x: 0, y: 10, z: -1 }, { x: 0.1, y: 10, z: -1 }];
    const result = getPosition(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum in a eight datum array', () => {
    hapticplot.init(scene, [10, 10, 20, 20, 30, 30, 40, 40]);
    const expectedPosArray = [
      { x: 0, y: 10, z: -1 }, { x: 0.10, y: 10, z: -1 },
      { x: 0.2, y: 20, z: -1 }, { x: 0.3, y: 20, z: -1 },
      { x: 0.4, y: 30, z: -1 }, { x: 0.5, y: 30, z: -1 },
     { x: 0.6, y: 40, z: -1 }, { x: 0.7, y: 40, z: -1 }];
    const result = getPosition(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum and sets the correct color property on the resulting shape entities', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedColorArray = ['green', 'green' , 'green'];
    const result = getColor(scene, shape);
    expect(result).toEqual(expectedColorArray);
  });

  it('places points for each datum and sets the correct size property on the resulting shape entities', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedSizeArray = ['0.05', '0.05', '0.05'];
    const result = getRadius(scene, shape);
    expect(result).toEqual(expectedSizeArray);
  });

  it('places points for each datum and sets the correct hoverable property on the resulting shape entities', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedSizeArray = ['hoverable', 'hoverable', 'hoverable'];
    const result = getHoverable(scene, shape);
    expect(result).toEqual(expectedSizeArray);
  });

  it('places points for each datum and sets the correct color property on the resulting shape entities after a hover event', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedSizeArray = ['red', 'red', 'red'];
    const result = getHoveredColor(scene, shape);
    expect(result).toEqual(expectedSizeArray);
  });
});

// Helper Functions

// returns array of actual position vectors
function getPosition(scene: HTMLElement, shape: string): Array<{x: number, y: number, z: number}>{
  const childrenArray = scene.querySelectorAll(shape);
  const positionArray: Array<{x: number, y: number, z: number}> = [];
  for (const child of (childrenArray as any)){
    positionArray.push((child as any).components.position.attrValue);
  }
  return positionArray;
}

// returns array of each generated objects color
function getColor(scene: HTMLElement, shape: string): (string | null)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}

// returns array of each generated objects radius
function getRadius(scene: HTMLElement, shape: string): (string | null)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('radius'));
}

// returns array of each generated objects hover property
function getHoverable(scene: HTMLElement, shape: string): (string | undefined)[]{
  const attrArray: (string | undefined)[] = [];
  Array.from(scene.querySelectorAll(shape)).forEach((child) => { attrArray.push((child as Entity).components.hoverable.attrName); });
  return attrArray;
}

// returns array of each generated objects color, after a hover event has occured
function getHoveredColor(scene: HTMLElement, shape: string): (string | null)[]{
  Array.from(scene.querySelectorAll(shape)).forEach((child) => { child.dispatchEvent(new Event('hover-start')); });
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}
