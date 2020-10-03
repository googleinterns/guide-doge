import 'aframe';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';
import { Entity} from 'aframe';
import { Vector3 } from 'three';
import { getPositions } from '../d3/hapticplot-testhelpers';
import { build3DTree, distToNearestPoint } from 'src/aframe_components/kdtree';
import { Hapticplot } from 'src/d3/hapticplot.d3';
import { VRScatterPoint } from 'src/datasets/queries/vr.query';

/**
 * Returns the current inteval value after a tick of duration 100ms
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function get3DTree(scene: HTMLElement, shape: string): object | null{
  const positions = getPositions(scene, shape);
  return build3DTree(positions, 0);
}

/**
 * Sets the controller position, then returns the position of the nearest point
 * @param controller The controller element
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 * @param controllerPosition The Controller element's position
 */
export function getDistToNearestPoint(
  controller: HTMLElement,
  scene: HTMLElement,
  shape: string,
  controllerPosition: Vector3
): number | null{
    const controllerEntity = controller as Entity;
    const positions = getPositions(scene, shape);
    const root = build3DTree(positions, 0);
    controllerEntity.components.guide.init();
    controllerEntity.object3D.position.set(controllerPosition.x, controllerPosition.y, controllerPosition.z);
    controllerEntity.components.guide.tick!(66, 1);
    const nPointDist = distToNearestPoint(controllerEntity.object3D.position, root);
    return nPointDist;
}

/**
 * Changes the controller position between two ticks, the returns the position of the nearest point
 * @param controller The controller element
 * @param scene The aframe scene element
 * @param shape Datapoints html tag
 */
export function getDistToNearestPointAfterMovement(controller: HTMLElement, scene: HTMLElement, shape: string): any{
  const controllerEntity = controller as Entity;
  const positions = getPositions(scene, shape);
  const root = build3DTree(positions, 0);
  controllerEntity.components.guide.init();
  controllerEntity.object3D.position.set(0, 1.7, -0.35);
  controllerEntity.components.guide.tick!(65, 65);
  controllerEntity.object3D.position.set(-100, 1.7, -0.35);
  controllerEntity.components.guide.tick!(66, 1);
  const nPointDist = distToNearestPoint(controllerEntity.object3D.position, root);
  return nPointDist;
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
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls get3dTree
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param shape Datapoints html tag
 */
export async function get3DTreeAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  shape: string
): Promise<(object | null)>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return get3DTree(scene, shape);
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getDistanceToNearestPoint with controller position (0,0,0)
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 * @param shape Datapoints html tag
 */
export async function getDistToNearestPointAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement,
  shape: string
): Promise<(number | null)>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getDistToNearestPoint(controller, scene, shape, new Vector3(0, 0, 0));
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getDistToNearestPoint with controller position (0, 1, -0.35)
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 * @param shape Datapoints html tag
 */
export async function getDistToTouchingPointAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement,
  shape: string
): Promise<(number | null)>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getDistToNearestPoint(controller, scene, shape, new Vector3(0, 1, -0.35));
}

/**
 * Initilizes a hapticPlot, waits for initiliation to complete, and then calls getDistToNearestPointAfterMovement
 * @param hapticplot A hapticPlot object
 * @param scene The aframe scene element
 * @param hapticPlotData A VRScatterPoint array containing the hapticPlot's data
 * @param controller The controller element
 * @param shape Datapoints html tag
 */
export async function getDistToNearestPointAfterMovementAsync(
  hapticplot: Hapticplot,
  scene: HTMLElement,
  hapticPlotData: VRScatterPoint[],
  controller: HTMLElement,
  shape: string
): Promise<(number | null)>{
  await initAsync(hapticplot, scene, hapticPlotData);
  return getDistToNearestPointAfterMovement(controller, scene, shape);
}
