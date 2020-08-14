import * as d3 from 'd3';
import { Hapticplot } from './hapticplot.d3';
import { Entity, Scene, Component } from 'aframe';
import { Vector3 } from 'three';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';
import { Guidance } from 'src/aframe_components/custom-components';

const POINT_SIZE = 0.02;
const DEFAULT_COLOR = '#F0A202';
const HOVER_COLOR = 'red';

describe('VR Haptic Plot', () => {
  const shape = 'a-sphere';
  let scene: HTMLElement;
  let controller: HTMLElement;
  let hapticplot: Hapticplot;
  let graphScale: d3.ScaleLinear<number, number>;

  beforeEach( () =>  {
    // Scene and Controller Mock Setup
    scene = document.createElement('a-scene');
    controller = document.createElement('a-entity');
    controller.setAttribute('sphere-collider', '');
    controller.setAttribute('super-hands', '');
    controller.setAttribute('oculus-touch-controls', 'hand: left');
    controller.setAttribute('haptics', 'force: 0');
    controller.setAttribute('guide', '');
    (controller as Entity).sceneEl = (scene as Scene);
    scene.appendChild(controller);
    hapticplot = new Hapticplot(shape);
    // Position Mapping Scaler
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
    hapticplot.init(scene, dataArray);
    const expectedPosArray = [new Vector3(0, 1.7, -0.35)];
    const result = getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum in a three datum array', () => {
    const dataArray = [0, 10, 20];
    hapticplot.init(scene, [0, 10, 20]);
    const expectedPosArray = [new Vector3(0, 1, -0.35), new Vector3((0.7 / 3), 1.35, -0.35), new Vector3((0.7 / 3) * 2, 1.7, -0.35)];
    const result = getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum and sets the correct color property on the resulting data points', () => {
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

  it('sets the correct color property on shape entities after a hover event', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedAttrArray = [HOVER_COLOR, HOVER_COLOR, HOVER_COLOR];
    const result = getHoveredColor(scene, shape);
    expect(result).toEqual(expectedAttrArray);
  });

  it('sets the correct color property on shape entities after a hover-end event', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedAttrArray = [DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR];
    const result = getHoverEndedColor(scene, shape);
    expect(result).toEqual(expectedAttrArray);
  });

  it('initilizes the controller entitys and attaches the haptic component', () => {
    expect(hasHaptics(controller)).toEqual(true);
  });

  it('initilizes data points with sound components', () => {
    hapticplot.init(scene, [10, 20, 30]);
    expect(hasSounds(scene, shape)).toEqual(true);
  });

  it('attaches audio triggers to initilized data points', () => {
    hapticplot.init(scene, [10, 20, 30]);
    expect(hasSoundTriggers(scene, shape)).toEqual(true);
  });

  it('controller has guidance component', () => {
    expect(hasGuidance(controller)).toEqual(true);
  });

  it('guide component initizes currentInterval with value intervalDuration (100ms)', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(getGuidanceInterval(controller)).toEqual(100);
  });

  it('when controller is near a datapoint, guidance component has haptic intensity between 0 and 1', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(getGuidanceHapticIntensity(controller) > 0 && getGuidanceHapticIntensity(controller) < 1).toEqual(true);
  });

  it('when controller is in contact with datapoint, guidance component has haptic intensity 1 in front half of interval', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(getIntervalIntensityFront(controller)).toEqual(1);
  });

  it('when controller is in contact with datapoint, guidance component has haptic intensity 0 in back half of interval', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(getIntervalIntensityBack(controller)).toEqual(0);
  });

  it('when haptic guidance interval elapses, the current interval is reset to 100ms', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(getIntervalReset(controller)).toEqual(100);
  });

});

// Helper Functions

// Returns an array of actual position vectors
function getPositions(scene: HTMLElement, shape: string): Vector3[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => new Vector3(
    (point as Entity).object3D.position.x,
    (point as Entity).object3D.position.y,
    (point as Entity).object3D.position.z));
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

// Returns an array of each generated objects color, after a hover event has occured
function getHoverEndedColor(scene: HTMLElement, shape: string): (string | null)[]{
  const shapes = scene.querySelectorAll(shape);
  for (const point of shapes){
    point.dispatchEvent(new Event('hover-start'));
    point.dispatchEvent(new Event('hover-end'));
  }
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}

// Checks the given controller for a haptic component
function hasHaptics(controller: HTMLElement): boolean{
  return (controller as Entity).components.hasOwnProperty('haptics');
}

// Returns true if each data point has a sound component attached, otherwise false
function hasSounds(scene: HTMLElement, shape: string): boolean{
  const points = scene.querySelectorAll(shape);
  for (const point of points){
    if (!(point as Entity).components.hasOwnProperty('sound')){
      return false;
    }
  }
  return true;
}

// Returns true if each data point's sound component has a hover-start event listener, otherwise false
function hasSoundTriggers(scene: HTMLElement, shape: string): boolean{
  const points = scene.querySelectorAll(shape);
  for (const point of points){
    const pointEntity = (point as Entity);
    pointEntity.flushToDOM();
    const trigger = pointEntity.components.sound.el.getDOMAttribute('sound').on;
    if (trigger !== 'hover-start'){
      return false;
    }
  }
  return true;
}

// Returns true if controller has the guide component attached
function hasGuidance(controller: HTMLElement): boolean{
  return (controller as Entity).components.hasOwnProperty('guide');
}

// Initilizes the guide component, and returns the currInterval
function getGuidanceInterval(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.components.guide.init();
  return (controllerEntity.components.guide as Guidance).state.currInterval;
}

// Returns haptic intensity when the controller is near a data point
function getGuidanceHapticIntensity(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1.5, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(1, 1);
  return (controllerEntity.components.guide as Guidance).state.intensity;
}

// Returns haptic intensity during the first half of the vibration interval when the controller is in contact with a data point
function getIntervalIntensityFront(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1.7, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(1, 1);
  return (controllerEntity.components.guide as Guidance).state.intensity;
}

// Returns haptic intensity during the second half of the vibration interval when the controller is in contact with a data point
function getIntervalIntensityBack(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1.7, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(65, 65);
  return (controllerEntity.components.guide as Guidance).state.intensity;
}

// Returns the current inteval value after a tick of duration 100ms
function getIntervalReset(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1.7, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(100, 100);
  return (controllerEntity.components.guide as Guidance).state.currInterval;
}
