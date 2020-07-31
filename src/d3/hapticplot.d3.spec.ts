import { Hapticplot } from './hapticplot.d3';
import { Entity, Scene } from 'aframe';
import { Vector3 } from 'three';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';


describe('VR Haptic Plot', () => {
  const shape = 'a-sphere';
  let scene: HTMLElement;
  let controller: HTMLElement;
  let hapticplot: Hapticplot;

  beforeEach( () =>  {
    scene = document.createElement('a-scene');
    controller = document.createElement('a-entity');
    controller.setAttribute('sphere-collider', '');
    controller.setAttribute('super-hands', '');
    controller.setAttribute('oculus-touch-controls', 'hand: left');
    controller.setAttribute('haptics', 'force: 0');
    (controller as Entity).sceneEl = (scene as Scene);
    scene.appendChild(controller);
    hapticplot = new Hapticplot(shape);
  });

  it('places no points bc 1:1 correspondence with empty data array', () => {
    hapticplot.init(scene, []);
    const expectedPosArray = [];
    const result = getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum in a one datum array', () => {
    hapticplot.init(scene, [10]);
    const expectedPosArray = [new Vector3(0, 10, -1)];
    const result = getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum in a three datum array', () => {
    hapticplot.init(scene, [0, 10, 20]);
    const expectedPosArray = [new Vector3(0, 0, -1), new Vector3(0.1, 10, -1), new Vector3(0.2, 20, -1)];
    const result = getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum and sets the correct color property on the resulting shape entities', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedColorArray = ['green', 'green' , 'green'];
    const result = getColors(scene, shape);
    expect(result).toEqual(expectedColorArray);
  });

  it('places points for each datum and sets the correct size property on the resulting shape entities', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedSizeArray = ['0.05', '0.05', '0.05'];
    const result = getRadii(scene, shape);
    expect(result).toEqual(expectedSizeArray);
  });

  it('places points for each datum and sets the correct hoverable property on the resulting shape entities', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedAttrArray = ['hoverable', 'hoverable', 'hoverable'];
    const result = getHoverable(scene, shape);
    expect(result).toEqual(expectedAttrArray);
  });

  it('places points for each datum and sets the correct color property on the resulting shape entities after a hover event', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedAttrArray = ['red', 'red', 'red'];
    const result = getHoveredColor(scene, shape);
    expect(result).toEqual(expectedAttrArray);
  });

  it('initilizes the controller entitys and attaches the haptic component', () => {
    const expectedRes = true;
    const result = getHaptics(controller);
    expect(result).toEqual(expectedRes);
  });
});

// Helper Functions

// Returns an array of actual position vectors
function getPositions(scene: HTMLElement, shape: string): Vector3[]{
  const attrArray: Vector3[] = [];
  const shapes = scene.querySelectorAll(shape);
  for (const point of shapes){
    attrArray.push(new Vector3(
      (point as Entity).object3D.position.x,
      (point as Entity).object3D.position.y,
      (point as Entity).object3D.position.z));
  }
  return attrArray;
}

// Returns an array of each generated objects color
function getColors(scene: HTMLElement, shape: string): (string | null)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}

// Returns an array of each generated objects radius
function getRadii(scene: HTMLElement, shape: string): (string | null)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('radius'));
}

// Returns an array of each generated objects hover property
function getHoverable(scene: HTMLElement, shape: string): (string | undefined)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => (point as Entity).components.hoverable.attrName);
}

// Returns an array of each generated objects color, after a hover event has occured
function getHoveredColor(scene: HTMLElement, shape: string): (string | null)[]{
  const shapes = scene.querySelectorAll(shape);
  for (const point of shapes){
    point.dispatchEvent(new Event('hover-start'));
  }
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}

// Checks the given controller for a haptic component
function getHaptics(controller: HTMLElement): boolean{
  return (controller as Entity).components.hasOwnProperty('haptics');
}
