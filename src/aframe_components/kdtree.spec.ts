import 'aframe';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';
import { Hapticplot } from '../d3/hapticplot.d3';
import { Entity, Scene } from 'aframe';
import { Vector3 } from 'three';
import * as helpers from './kdtree-testhelpers';

describe('haptic plot with kd tree selection', () => {
  const shape = 'a-sphere';
  let scene: HTMLElement;
  let controller: HTMLElement;
  let hapticplot: Hapticplot;

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
    const dataArray = [];
    hapticplot.init(scene, dataArray);
    expect(helpers.get3DTree(scene, shape)).toEqual(null);
  });

  it('builds a correct k-d tree for a scene with a single datapoints', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(helpers.get3DTree(scene, shape)).toEqual({
      position: new Vector3(0, 1.7, -0.35),
      left: null,
      right: null });
  });

  it('builds a correct k-d tree of 4 datapoints', () => {
    const dataArray = [10, 15, 20, 25];
    hapticplot.init(scene, dataArray);
    expect(helpers.get3DTree(scene, shape)).toEqual({
      position: new Vector3(0.35, 1.56, -0.35),
      left: {
        position: new Vector3(0.175, 1.42, -0.35),
        left: {
          position: new Vector3(0, 1.28, -0.35),
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        position: new Vector3( 0.5249999999999999, 1.7, -0.35),
        left: null,
        right: null,
      },
    });
  });

  it('builds a correct k-d tree of 4 datapoints with increasing and deceasing values', () => {
    const dataArray = [10, 15, 18, 13, 9, 17];
    hapticplot.init(scene, dataArray);
    expect(helpers.get3DTree(scene, shape)).toEqual({
      position: new Vector3(0.35, 1.5055555555555555, -0.35),
      left: {
        position: new Vector3(0.11666666666666665, 1.5833333333333335, -0.35),
        left: {
          position: new Vector3(0, 1.3888888888888888, -0.35),
          left: null,
          right: null,
        },
        right: {
             position: new Vector3(0.2333333333333333, 1.7, -0.35),
             left: null,
             right: null,
        }
      },
      right: {
        position: new Vector3(0.5833333333333333, 1.661111111111111, -0.35),
        left: {
          position: new Vector3(0.4666666666666666, 1.35, -0.35),
          left: null,
          right: null,
        },
        right: null,
      }
    });
  });

  it('builds a correct k-d tree for a scene with multiple datapoints with the same value', () => {
    const dataArray = [5, 5, 5, 5];
    hapticplot.init(scene, dataArray);
    expect(helpers.get3DTree(scene, shape)).toEqual({
      position: new Vector3(0.35, 1.7, -0.35),
      left: {
        position: new Vector3(0.175, 1.7, -0.35),
        left: {
          position: new Vector3(0, 1.7, -0.35),
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        position: new Vector3(0.5249999999999999, 1.7, -0.35),
        left: null,
        right: null,
      },
    });
  });

  it('distance to closest point is null when no points are in the scene', () => {
    const dataArray = [];
    hapticplot.init(scene, dataArray);
    expect(helpers.getDistToNearestPoint(controller, scene, shape, new Vector3(0, 0, 0))).toEqual(null);
  });

  it('correctly identifies the nearest data in a single point scene', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(helpers.getDistToNearestPoint(controller, scene, shape, new Vector3(0, 0, 0))).toEqual(1.735655495770978);
  });

  it('correctly identifies the nearest data point when its positon is the same as the controllers', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(helpers.getDistToNearestPoint(controller, scene, shape, new Vector3(0, 1.7, -0.35))).toEqual(0);
  });

  it('correctly identifies the nearest data point when each point has the same value', () => {
    const dataArray = [5, 5, 5, 5];
    hapticplot.init(scene, dataArray);
    expect(helpers.getDistToNearestPoint(controller, scene, shape, new Vector3(0, 0, 0))).toEqual(1.735655495770978);
  });

  it('correctly identifies the nearest data point when that data point is the root of the kdtree', () => {
    const dataArray = [5, 10, 15, 20, 25];
    hapticplot.init(scene, dataArray);
    expect(helpers.getDistToNearestPoint(controller, scene, shape, new Vector3(0.27999999999999997, 1.42, -0.35))).toEqual(0);
  });

  it('moves the controllers to two different position, then correctly identifies the nearest data point', () => {
    const dataArray = [10, 15, 20, 25];
    hapticplot.init(scene, dataArray);
    expect(helpers.getDistToNearestPointAfterMovement(controller, scene, shape)).toEqual(100.00088199611042);
  });

});
