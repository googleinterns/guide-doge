import 'aframe';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';
import { Entity } from 'aframe';
import { Vector3 } from 'three';
import { Guidance } from 'src/aframe_components/custom-components';

// Returns an array of actual position vectors
export function getPositions(scene: HTMLElement, shape: string): Vector3[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => new Vector3(
    (point as Entity).object3D.position.x,
    (point as Entity).object3D.position.y,
    (point as Entity).object3D.position.z));
}

// Returns an array of each generated objects color
export function getColors(scene: HTMLElement, shape: string): (string | null)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}

// Returns an array of each generated objects radius
export function getRadii(scene: HTMLElement, shape: string): (string | null)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('radius'));
}

// Returns an array of each generated objects hover property
export function getHoverable(scene: HTMLElement, shape: string): (string | undefined)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => (point as Entity).components.hoverable.attrName);
}

// Returns an array of each generated objects color, after a hover event has occured
export function getHoveredColor(scene: HTMLElement, shape: string): (string | null)[]{
  const shapes = scene.querySelectorAll(shape);
  for (const point of shapes){
    point.dispatchEvent(new Event('hover-start'));
  }
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}

// Returns an array of each generated objects color, after a hover event has occured
export function getHoverEndedColor(scene: HTMLElement, shape: string): (string | null)[]{
  const shapes = scene.querySelectorAll(shape);
  for (const point of shapes){
    point.dispatchEvent(new Event('hover-start'));
    point.dispatchEvent(new Event('hover-end'));
  }
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}

// Checks the given controller for a haptic component
export function hasHaptics(controller: HTMLElement): boolean{
  return (controller as Entity).components.hasOwnProperty('haptics');
}

// Returns true if each data point has a sound component attached, otherwise false
export function hasSounds(scene: HTMLElement, shape: string): boolean{
  const points = scene.querySelectorAll(shape);
  for (const point of points){
    if (!(point as Entity).components.hasOwnProperty('sound')){
      return false;
    }
  }
  return true;
}

// Returns true if each data point's sound component has a hover-start event listener, otherwise false
export function hasSoundTriggers(scene: HTMLElement, shape: string): boolean{
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
export function hasGuidance(controller: HTMLElement): boolean{
  return (controller as Entity).components.hasOwnProperty('guide');
}

// Initilizes the guide component, and returns the currInterval
export function getGuidanceInterval(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.components.guide.init();
  return (controllerEntity.components.guide as Guidance).state.currInterval;
}

// Returns haptic intensity when the controller is near a data point
export function getGuidanceHapticIntensity(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1.55, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(1, 1);
  return (controllerEntity.components.guide as Guidance).state.intensity;
}

// Returns haptic intensity during the first half of the vibration interval when the controller is in contact with a data point
export function getIntervalIntensityFront(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1.7, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(1, 1);
  return (controllerEntity.components.guide as Guidance).state.intensity;
}

// Returns haptic intensity during the second half of the vibration interval when the controller is in contact with a data point
export function getIntervalIntensityBack(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1.7, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(65, 65);
  return (controllerEntity.components.guide as Guidance).state.intensity;
}

// Returns the current inteval value after a tick of duration 100ms
export function getIntervalReset(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1.7, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(100, 100);
  return (controllerEntity.components.guide as Guidance).state.currInterval;
}
