import 'aframe';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';
import { Hapticplot } from '../d3/hapticplot.d3';
import { Entity, Scene } from 'aframe';
import { Vector3 } from 'three';
import * as helpers from './kdtree-testhelpers';
import { VRScatterPoint } from 'src/datasets/queries/vr.query';

describe('haptic plot with kd tree selection', () => {
  const shape = 'a-sphere';
  let scene: HTMLElement;
  let controller: HTMLElement;
  let hapticplot: Hapticplot;
  const hapticPlotData0: VRScatterPoint[]  = [];
  const hapticPlotData1: VRScatterPoint[]  = [
    {categories: {}, x: 0, y: 10, z: 0}
  ];
  const hapticPlotData2: VRScatterPoint[]  = [
    {categories: {}, x: 0, y: 0, z: 0},
    {categories: {}, x: 0, y: 10, z: 0},
    {categories: {}, x: 0, y: 20, z: 0},
  ];
  const hapticPlotData3: VRScatterPoint[]  = [
    {categories: {}, x: 1, y: -4, z: 45},
    {categories: {}, x: -32.34, y: -5, z: 3},
    {categories: {}, x: 23, y: -45, z: 3},
  ];

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
  });

  it('kdtree for an empty set of data points is null', () => {
    const promise =  helpers.get3DTreeAsync(hapticplot, scene, hapticPlotData0, shape);
    promise.then((tree) => expect(tree).toEqual(null));
  });

  it('builds a correct k-d tree for a scene with a single datapoints', () => {
    const promise =  helpers.get3DTreeAsync(hapticplot, scene, hapticPlotData1, shape);
    promise.then((tree) => expect(tree).toEqual({
      position: new Vector3(0, 1, -0.35),
      left: null,
      right: null
    }));
  });

  it('builds a correct k-d tree of multiple datapoints', () => {
    const promise =  helpers.get3DTreeAsync(hapticplot, scene, hapticPlotData2, shape);
    promise.then((tree) => expect(tree).toEqual({
      position: new Vector3(0, 1, -0.35),
      left: {
        position: new Vector3( 0, 0.30000000000000004, -0.35),
        left: null,
        right: null
      },
      right: {
        position: new Vector3( 0, 1.7, -0.35),
        left: null,
        right: null
      }
    }));
  });

  it('builds a correct k-d tree of negative and repeating values', () => {
    const promise =  helpers.get3DTreeAsync(hapticplot, scene, hapticPlotData3, shape);
    promise.then((tree) => expect(tree).toEqual({
      position: new Vector3(0.14344054933140593, 1.7, 0.35),
      left: {
        position: new Vector3(-0.7, 1.6658536585365853, -1.0499999999999998),
        left: null,
        right: null
      },
      right: {
        position: new Vector3(0.7, 0.30000000000000004, -1.0499999999999998),
        left: null,
        right: null
      }
    }));
  });

  it('distance to closest point is null when no points are in the scene', () => {
    const promise =  helpers.getDistToNearestPointAsync(hapticplot, scene, hapticPlotData0, controller, shape);
    promise.then((distance) => expect(distance).toEqual(null));
  });

  it('correctly identifies the distance to the nearest datapoint in a single point scene', () => {
    const promise =  helpers.getDistToNearestPointAsync(hapticplot, scene, hapticPlotData1, controller, shape);
    promise.then((distance) => expect(distance).toEqual(1.0594810050208545));
  });

  it('correctly identifies the distance to the nearest datapoint when its positon is the same as the controllers', () => {
    const promise =  helpers.getDistToTouchingPointAsync(hapticplot, scene, hapticPlotData1, controller, shape);
    promise.then((distance) => expect(distance).toEqual(0));
  });

  it('correctly identifies the distance to the nearest datapoint when that data point is the root of the kdtree', () => {
    const promise =  helpers.getDistToNearestPointAsync(hapticplot, scene, hapticPlotData1, controller, shape);
    promise.then((distance) => expect(distance).toEqual(1.0594810050208545));
  });

  it('correctly identifies the distance to the nearest datapoint in multi point scene after controller movement', () => {
    const promise =  helpers.getDistToNearestPointAfterMovementAsync(hapticplot, scene, hapticPlotData2, controller, shape);
    promise.then((distance) => expect(distance).toEqual(100));
  });
});


