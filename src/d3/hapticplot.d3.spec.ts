import * as d3 from 'd3';
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
  let graphScale: d3.ScaleLinear<number, number>;

  const POINT_SIZE = 0.02;
  const DEFAULT_COLOR = '#F0A202';
  const HOVER_COLOR = 'red';

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

    graphScale = d3.scaleLinear();
  });

  it('places no points bc 1:1 correspondence with empty data array', () => {
    hapticplot.init(scene, []);
    const expectedPosArray = [];
    const result = getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum in a one datum array', () => {
    const dataArray = [10];
    graphScale.domain([0, d3.max(dataArray) as number])  // max of dataset
      .range([0, 0.5]);
    hapticplot.init(scene, dataArray);
    const expectedPosArray = Array.from(dataArray).map(
      (datum: number, i) =>
      new Vector3((0.5 / dataArray.length) * i, graphScale(datum) + 1, -1));
    const result = getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum in a three datum array', () => {
    const dataArray = [0, 10, 20];
    graphScale.domain([0, d3.max(dataArray) as number])  // max of dataset
      .range([0, 0.5]);
    hapticplot.init(scene, [0, 10, 20]);
    const expectedPosArray = Array.from(dataArray).map(
      (datum: number, i) =>
      new Vector3((0.5 / dataArray.length) * i, graphScale(datum) + 1, -1));
    const result = getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum and sets the correct color property on the resulting shape entities', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedColorArray = [DEFAULT_COLOR, DEFAULT_COLOR , DEFAULT_COLOR];
    const result = getColors(scene, shape);
    expect(result).toEqual(expectedColorArray);
  });

  it('places points for each datum and sets the correct size property on the resulting shape entities', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedSizeArray = [POINT_SIZE.toString(), POINT_SIZE.toString(), POINT_SIZE.toString()];
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
    const expectedAttrArray = [HOVER_COLOR, HOVER_COLOR, HOVER_COLOR];
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
