import 'aframe';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';
import { Entity } from 'aframe';
import { Vector3 } from 'three';
import { Guidance } from 'src/aframe_components/custom-components';
import { Hapticplot } from './hapticplot.d3';
import { VRScatterPoint } from 'src/datasets/queries/vr.query';

/**
 * Returns an array of actual position vectors
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function getPositions(scene: HTMLElement, shape: string): Vector3[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => new Vector3(
    (point as Entity).object3D.position.x,
    (point as Entity).object3D.position.y,
    (point as Entity).object3D.position.z));
}

/**
 * Returns an array of each generated objects color
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function getColors(scene: HTMLElement, shape: string): (string | null)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}

/**
 * Returns an array of each generated objects radius
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function getRadii(scene: HTMLElement, shape: string): (string | null)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('radius'));
}

/**
 * Returns an array of each generated objects hover property
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function getHoverable(scene: HTMLElement, shape: string): (string | undefined)[]{
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => (point as Entity).components.hoverable.attrName);
}

/**
 * Returns an array of each generated objects color, during a hover event
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function getHoveredColor(scene: HTMLElement, shape: string): (string | null)[]{
  const shapes = scene.querySelectorAll(shape);
  for (const point of shapes){
    point.dispatchEvent(new Event('hover-start'));
  }
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}

/**
 * Returns an array of each generated objects color, after a hover event has occured
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function getHoverEndedColor(scene: HTMLElement, shape: string): (string | null)[]{
  const shapes = scene.querySelectorAll(shape);
  for (const point of shapes){
    point.dispatchEvent(new Event('hover-start'));
    point.dispatchEvent(new Event('hover-end'));
  }
  return Array.from(scene.querySelectorAll(shape)).map((point: Element) => point.getAttribute('color'));
}

/**
 * Checks the given controller for a haptic component
 * @param controller The controller element
 */
export function hasHaptics(controller: HTMLElement): boolean{
  return (controller as Entity).components.hasOwnProperty('haptics');
}

/**
 * Returns true if each data point has a sound component attached, otherwise false
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function hasSounds(scene: HTMLElement, shape: string): boolean{
  const points = scene.querySelectorAll(shape);
  for (const point of points){
    if (!(point as Entity).components.hasOwnProperty('sound')){
      return false;
    }
  }
  return true;
}

/**
 * Returns true if each data point's sound component has a hover-start event listener, otherwise false
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
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

/**
 * Returns true if controller has the guide component attached
 * @param controller The controller element
 */
export function hasGuidance(controller: HTMLElement): boolean{
  return (controller as Entity).components.hasOwnProperty('guide');
}

/**
 * Initilizes the guide component, and returns the currInterval
 * @param controller The controller element
 */
export function getGuidanceInterval(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.components.guide.init();
  return (controllerEntity.components.guide as Guidance).state.currInterval;
}

/**
 * Returns haptic intensity when the controller is near a data point
 * @param controller The controller element
 */
export function getGuidanceHapticIntensity(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1.2, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(1, 1);
  return (controllerEntity.components.guide as Guidance).state.intensity;
}

/**
 * Returns haptic intensity during the first half of the vibration interval when the controller is in contact with a data point
 * @param controller The controller element
 */
export function getIntervalIntensityFront(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(1, 1);
  return (controllerEntity.components.guide as Guidance).state.intensity;
}

/**
 * Returns haptic intensity during the second half of the vibration interval when the controller is in contact with a data point
 * @param controller The controller element
 */
export function getIntervalIntensityBack(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(65, 65);
  return (controllerEntity.components.guide as Guidance).state.intensity;
}

/**
 * Returns the current inteval value after a tick of duration 100ms
 * @param controller The controller element
 */
export function getIntervalReset(controller: HTMLElement): number{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(0, 1, -0.35);
  controllerEntity.components.guide.init();
  controllerEntity.components.guide.tick!(100, 100);
  return (controllerEntity.components.guide as Guidance).state.currInterval;
}

/**
 * Returns true if an A or X button press has no effect before a data point hover event
 * @param controller The controller element
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function hasNoButtonTriggersBeforeHover(controller: HTMLElement, scene: HTMLElement, shape: string): boolean{
  const controllerEntity = controller as Entity;
  const point = scene.querySelector(shape) as Entity;
  const originalSrc = point.components.sound.el.getDOMAttribute('sound').src;
  controllerEntity.dispatchEvent(new Event('abuttonup'));
  controllerEntity.dispatchEvent(new Event('xbuttonup'));
  const soundSrc = point.components.sound.el.getDOMAttribute('sound').src;
  return originalSrc === soundSrc ? true : false;
}

/**
 * Returns true if an A or X button press has no effect after a data point hover event has ended
 * @param controller The controller element
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
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

/**
 * Returns audio sources attached to a data point after an A or X button press from a controller in contact with it
 * @param controller The controller element
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
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

/**
 * Returns the postions of the data points in the scene before and after a recenter event is triggered at position (100,100,100)
 * @param controller The controller element
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function getRecenteredPointPositions(controller: HTMLElement, scene: HTMLElement, shape: string): Vector3[][]{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(100, 100, 100);
  const dataPointPositionsBefore = getPositions(scene, shape);
  controllerEntity.dispatchEvent(new Event('thumbstickup'));
  const dataPointPositionsAfter = getPositions(scene, shape);

  return [dataPointPositionsBefore, dataPointPositionsAfter];
}

/**
 * Returns the postions of the grids in the scene before and after a recenter event is triggered at position (100,100,100)
 * @param controller The controller element
 * @param scene The aframe scene element
 */
export function getRecenteredGridPositions(controller: HTMLElement, scene: HTMLElement): Vector3[][]{
  const controllerEntity = controller as Entity;
  controllerEntity.object3D.position.set(100, 100, 100);
  const gridPositionsBefore = getPositions(scene, '.grid');
  controllerEntity.dispatchEvent(new Event('thumbstickup'));
  const gridPositionsAfter = getPositions(scene, '.grid');

  return [gridPositionsBefore, gridPositionsAfter];
}

/**
 * An asyncronous wrapper for the hapticPlot initilization function
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 */
export async function initAsync(hapticplot: Hapticplot, scene: HTMLElement, hapticPlotData: VRScatterPoint[]){
  hapticplot.init(scene, hapticPlotData);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getPositions
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param shape Datapoints html tag
 */
export async function getPositionsAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  shape: string
): Promise<Vector3[]> {
  await initAsync(hapticplot, scene, hapticPlotData);
  return getPositions(scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getColors
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param shape Datapoints html tag
 */
export async function getColorsAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  shape: string
): Promise<(string | null)[]>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getColors(scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getRadii
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param shape Datapoints html tag
 */
export async function getRadiiAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  shape: string
): Promise<(string | null)[]>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getRadii(scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getHoverable
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param shape Datapoints html tag
 */
export async function getHoverableAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  shape: string
): Promise<(string | undefined)[]>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getHoverable(scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getHoveredColor
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param shape Datapoints html tag
 */
export async function getHoveredColorAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  shape: string
): Promise<(string | null)[]>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getHoveredColor(scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getHoverEndedColor
 */
export async function getHoverEndedColorAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  shape: string
): Promise<(string | null)[]>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getHoverEndedColor(scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls hasSounds
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param shape Datapoints html tag
 */
export async function hasSoundsAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  shape: string
): Promise<boolean>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return hasSounds(scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls hasSoundTriggers
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param shape Datapoints html tag
 */
export async function hasSoundTriggersAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  shape: string
): Promise<boolean>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return hasSoundTriggers(scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getGuidanceInterval
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 */
export async function getGuidanceIntervalAsync(
hapticplot: Hapticplot,
scene: HTMLElement,
hapticPlotData: VRScatterPoint[],
controller: HTMLElement
): Promise<number>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getGuidanceInterval(controller);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getGuidanceHapticIntensity
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 */
export async function getGuidanceHapticIntensityAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement
): Promise<number>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getGuidanceHapticIntensity(controller);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getIntervalIntensityFront
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 */
export async function getIntervalIntensityFrontAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement
): Promise<number>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getIntervalIntensityFront(controller);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getIntervalIntensityBack
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 */
export async function getIntervalIntensityBackAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement
): Promise<number>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getIntervalIntensityBack(controller);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getIntervalReset
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 */
export async function getIntervalResetAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement
): Promise<number>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getIntervalReset(controller);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls hasNoButtonTriggersBeforeHover
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 * @param shape Datapoints html tag
 */
export async function hasNoButtonTriggersBeforeHoverAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement,
  shape: string
): Promise<boolean>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return hasNoButtonTriggersBeforeHover(controller, scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls hasNoButtonTriggersAfterHover
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 * @param shape Datapoints html tag
 */
export async function hasNoButtonTriggersAfterHoverAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement,
  shape: string
): Promise<boolean>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return hasNoButtonTriggersAfterHover(controller, scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getAudioSrcSequence
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 * @param shape Datapoints html tag
 */
export async function getAudioSrcSequenceAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement,
  shape: string
): Promise<string[]>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getAudioSrcSequence(controller, scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getRecenteredPointPositions
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 * @param shape Datapoints html tag
 */
export async function getRecenteredPointPositionsAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement,
  shape: string
): Promise<Vector3[][]>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getRecenteredPointPositions(controller, scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getRecenteredGridPositions
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 */
export async function getRecenteredGridPositionsAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement
): Promise<Vector3[][]>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getRecenteredGridPositions(controller, scene);
}
