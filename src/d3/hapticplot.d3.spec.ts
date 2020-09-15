import 'aframe';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';
import { Hapticplot } from './hapticplot.d3';
import { Entity, Scene } from 'aframe';
import { Vector3 } from 'three';
import * as helpers from './hapticplot-testhelpers';

const POINT_SIZE = 0.02;
const DEFAULT_COLOR = '#F0A202';
const HOVER_COLOR = 'red';

describe('VR Haptic Plot', () => {
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

  it('places no points bc 1:1 correspondence with empty data array', () => {
    hapticplot.init(scene, []);
    const expectedPosArray = [];
    const result = helpers.getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum in a one datum array', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    const expectedPosArray = [new Vector3(0, 1.7, -0.35)];
    const result = helpers.getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum in a three datum array', () => {
    const dataArray = [0, 10, 20];
    hapticplot.init(scene, [0, 10, 20]);
    const expectedPosArray = [new Vector3(0, 1, -0.35), new Vector3((0.7 / 3), 1.35, -0.35), new Vector3((0.7 / 3) * 2, 1.7, -0.35)];
    const result = helpers.getPositions(scene, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each datum and sets the correct color property on the resulting data points', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedColorArray = [DEFAULT_COLOR, DEFAULT_COLOR , DEFAULT_COLOR];
    const result = helpers.getColors(scene, shape);
    expect(result).toEqual(expectedColorArray);
  });

  it('places points for each datum and sets the correct size property on the resulting shape entities', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedSizeArray = [POINT_SIZE.toString(), POINT_SIZE.toString(), POINT_SIZE.toString()];
    const result = helpers.getRadii(scene, shape);
    expect(result).toEqual(expectedSizeArray);
  });

  it('places points for each datum and sets the correct hoverable property on the resulting shape entities', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedAttrArray = ['hoverable', 'hoverable', 'hoverable'];
    const result = helpers.getHoverable(scene, shape);
    expect(result).toEqual(expectedAttrArray);
  });

  it('sets the correct color property on shape entities after a hover event', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedAttrArray = [HOVER_COLOR, HOVER_COLOR, HOVER_COLOR];
    const result = helpers.getHoveredColor(scene, shape);
    expect(result).toEqual(expectedAttrArray);
  });

  it('sets the correct color property on shape entities after a hover-end event', () => {
    hapticplot.init(scene, [10, 20, 30]);
    const expectedAttrArray = [DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR];
    const result = helpers.getHoverEndedColor(scene, shape);
    expect(result).toEqual(expectedAttrArray);
  });

  it('initilizes the controller entitys and attaches the haptic component', () => {
    expect(helpers.hasHaptics(controller)).toEqual(true);
  });

  it('initilizes data points with sound components', () => {
    hapticplot.init(scene, [10, 20, 30]);
    expect(helpers.hasSounds(scene, shape)).toEqual(true);
  });

  it('attaches audio triggers to initilized data points', () => {
    hapticplot.init(scene, [10, 20, 30]);
    expect(helpers.hasSoundTriggers(scene, shape)).toEqual(true);
  });

  it('controller has guidance component', () => {
    expect(helpers.hasGuidance(controller)).toEqual(true);
  });

  it('guide component initizes currentInterval with value intervalDuration (100ms)', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(helpers.getGuidanceInterval(controller)).toEqual(100);
  });

  it('when controller is near a datapoint, guidance component has haptic intensity between 0 and 1', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(helpers.getGuidanceHapticIntensity(controller) > 0 && helpers.getGuidanceHapticIntensity(controller) < 1).toEqual(true);
  });

  it('when controller is in contact with datapoint, guidance component has haptic intensity 1 in front half of interval', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(helpers.getIntervalIntensityFront(controller)).toEqual(1);
  });

  it('when controller is in contact with datapoint, guidance component has haptic intensity 0 in back half of interval', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(helpers.getIntervalIntensityBack(controller)).toEqual(0);
  });

  it('when haptic guidance interval elapses, the current interval is reset to 100ms', () => {
    const dataArray = [10];
    hapticplot.init(scene, dataArray);
    expect(helpers.getIntervalReset(controller)).toEqual(100);
  });

});
