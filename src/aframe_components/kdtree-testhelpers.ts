import 'aframe';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';
import { Entity} from 'aframe';
import { Vector3 } from 'three';
import { getPositions } from '../d3/hapticplot-testhelpers';
import { build3DTree, distToNearestPoint } from 'src/aframe_components/kdtree';

// Returns the current inteval value after a tick of duration 100ms
export function get3DTree(scene: HTMLElement, shape: string): object | null{
  const positions = getPositions(scene, shape);
  return build3DTree(positions, 0);
}

// Sets the controller position, then returns the position of the nearest point
export function getDistToNearestPoint(
  controller: HTMLElement, scene: HTMLElement, shape: string, controllerPosition: Vector3): number | null{
    const controllerEntity = controller as Entity;
    const positions = getPositions(scene, shape);
    const root = build3DTree(positions, 0);
    controllerEntity.components.guide.init();
    controllerEntity.object3D.position.set(controllerPosition.x, controllerPosition.y, controllerPosition.z);
    controllerEntity.components.guide.tick!(66, 1);
    const nPointDist = distToNearestPoint(controllerEntity.object3D.position, root);
    return nPointDist;
}

// Changes the controller position between two ticks, the returns the position of the nearest point
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
