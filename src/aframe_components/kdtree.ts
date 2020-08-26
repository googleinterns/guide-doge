import { Vector3 } from 'three';

const AXIS_DICT = {
  0: 'x',
  1: 'y',
  2: 'z',
};

export interface KDNode {
  position: Vector3;
  left: KDNode | null;
  right: KDNode | null;
}

export function build3DTree(positions: Vector3[], depth: number){
  const n = positions.length;
  const mid = Math.floor(n / 2);
  if (n <= 0){
    return null;
  }
  const axis = depth % 3;
  positions.sort((a, b) => a[AXIS_DICT[axis]] - b[AXIS_DICT[axis]]);
  return {
    position: positions[mid],
    left: build3DTree(positions.slice(0, mid), depth + 1),
    right: build3DTree(positions.slice(mid + 1, n), depth + 1),
  };
}

export function distToNearestPoint(controllerPos: Vector3, node: KDNode | null): number | null{
  const nPointDistance = distToNearestPointSq(controllerPos, node, 0);
  return (nPointDistance != null) ? Math.sqrt(nPointDistance) : nPointDistance;
}

function distToNearestPointSq(controllerPos: Vector3, node: KDNode | null, depth: number): number | null{
  if (!node){
    return null;
  }

  const axis = depth % 3;
  let nextNode: KDNode | null = null;
  let otherNode: KDNode | null = null;

  if (controllerPos[AXIS_DICT[axis]] < node.position[AXIS_DICT[axis]]){
    nextNode = node.left;
    otherNode = node.right;
  }
  else{
    nextNode = node.right;
    otherNode = node.left;
  }

  let closest = closerPoint(
    controllerPos,
    node.position,
    distToNearestPointSq(controllerPos, nextNode, depth + 1));

  if (closest > Math.pow(controllerPos[AXIS_DICT[axis]] - node.position[AXIS_DICT[axis]], 2)){
    closest = closerPointUnwind(
      closest,
      distToNearestPointSq(controllerPos, otherNode, depth + 1));
  }

  return closest;
}

function closerPoint(controllerPos: Vector3, pointA: Vector3, distanceSqB: number | null): number{
  const distanceSqA: number = controllerPos.distanceToSquared(pointA);
  if (!distanceSqB){
    return distanceSqA;
  }

  if (distanceSqA < distanceSqB){
    return distanceSqA;
  }
  else{
    return distanceSqB;
  }
}

function closerPointUnwind(distanceSqA: number, distanceSqB: number | null): number{
  if (!distanceSqB){
    return distanceSqA;
  }
  return distanceSqA < distanceSqB ? distanceSqA : distanceSqB;
}
