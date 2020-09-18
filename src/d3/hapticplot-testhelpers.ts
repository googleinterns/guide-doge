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

// Returns true if an A or X button press has no effect before a data point hover event
export function hasNoButtonTriggersBeforeHover(controller: HTMLElement, scene: HTMLElement, shape: string): boolean{
  const controllerEntity = controller as Entity;
  const point = scene.querySelector(shape) as Entity;
  const originalSrc = point.components.sound.el.getDOMAttribute('sound').src;
  controllerEntity.dispatchEvent(new Event('abuttonup'));
  controllerEntity.dispatchEvent(new Event('xbuttonup'));
  const soundSrc = point.components.sound.el.getDOMAttribute('sound').src;
  return originalSrc === soundSrc ? true : false;
}

// Returns true if an A or X button press has no effect after a data point hover event has ended
export function hasNoButtonTriggersAfterHover(controller: HTMLElement, scene: HTMLElement, shape: string): any{
  const controllerEntity = controller as Entity;
  const point = scene.querySelector(shape) as Entity;
  const hoverStartEvent = new CustomEvent('hover-start', {
    detail: {
      hand: controllerEntity
    }
  });
  const hoverEndEvent = new CustomEvent('hover-end', {
    detail: {
      hand: controllerEntity
    }
  });
  const originalSrc = point.components.sound.el.getDOMAttribute('sound').src;
  point.dispatchEvent(hoverStartEvent);
  point.dispatchEvent(hoverEndEvent);
  controllerEntity.dispatchEvent(new Event('abuttonup'));
  controllerEntity.dispatchEvent(new Event('xbuttonup'));
  const soundSrc = point.components.sound.el.getDOMAttribute('sound').src;
  return originalSrc === soundSrc ? true : false;
}

// Returns audio sources attached to a data point after an A or X button press from a controller in contact with it
export function getAudioSrcSequence(controller: HTMLElement, scene: HTMLElement, shape: string): string[]{
  const controllerEntity = controller as Entity;
  const point = scene.querySelector(shape) as Entity;
  const hoverStartEvent = new CustomEvent('hover-start', {
    detail: {
      hand: controllerEntity
    }
  });
  point.dispatchEvent(hoverStartEvent);
  const res: string[] = [];
  const originalSrc = point.components.sound.el.getDOMAttribute('sound').src;
  res.push(originalSrc);
  controllerEntity.dispatchEvent(new Event('abuttonup'));
  controllerEntity.dispatchEvent(new Event('xbuttonup'));
  let soundSrc = point.components.sound.el.getDOMAttribute('sound').src;
  res.push(soundSrc);
  while (soundSrc !== originalSrc){
    point.dispatchEvent(new Event('sound-ended'));
    soundSrc = point.components.sound.el.getDOMAttribute('sound').src;
    res.push(soundSrc);
  }
  return res;
}

// Returns the postions of the data points in the scene before and after a recenter event is triggered at position (100,100,100)
export function getRecenteredPointPositions(controller: HTMLElement, scene: HTMLElement, shape: string): Vector3[][]{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(100, 100, 100);
  const dataPointPositionsBefore = getPositions(scene, shape);
  controllerEntity.dispatchEvent(new Event('thumbstickup'));
  const dataPointPositionsAfter = getPositions(scene, shape);

  return [dataPointPositionsBefore, dataPointPositionsAfter];
}

// Returns the postions of the grids in the scene before and after a recenter event is triggered at position (100,100,100)
export function getRecenteredGridPositions(controller: HTMLElement, scene: HTMLElement, shape: string): Vector3[][]{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(100, 100, 100);
  const gridPositionsBefore = getPositions(scene, '.grid');
  controllerEntity.dispatchEvent(new Event('thumbstickup'));
  const gridPositionsAfter = getPositions(scene, '.grid');

  return [gridPositionsBefore, gridPositionsAfter];
}
