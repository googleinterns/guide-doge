import 'aframe';
import 'aframe-extras';
import 'super-hands';
import 'aframe-haptics-component';
import { Hapticplot } from './hapticplot.d3';
import { Entity, Scene } from 'aframe';
import { Vector3 } from 'three';
import * as helpers from './hapticplot-testhelpers';
import { VRScatterPoint } from 'src/datasets/queries/vr.query';

const POINT_SIZE = 0.02;
const DEFAULT_COLOR = '#F0A202';
const HOVER_COLOR = 'red';

describe('VR Haptic Plot', () => {
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
  const expPosArray0: Vector3[] = [];
  const expPosArray1: Vector3[] = [new Vector3(0, 1, -0.35)];
  const expPosArray2: Vector3[] = [
    new Vector3(0, 0.30000000000000004, -0.35),
    new Vector3(0, 1, -0.35),
    new Vector3(0, 1.7, -0.35)
  ];

  beforeEach( () =>  {
    // Scene and Controller Mock Setup
    scene = document.createElement('a-scene');
    controller = document.createElement('a-entity');
    controller.setAttribute('class', 'controller');
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
    const promise =  helpers.getPositionsAsync(hapticplot, scene, hapticPlotData0, shape);
    promise.then((positions) => expect(positions).toEqual(expPosArray0));
  });

  it('places points for each datum in a one datum array', () => {
    const promise =  helpers.getPositionsAsync(hapticplot, scene, hapticPlotData1, shape);
    promise.then((positions) => expect(positions).toEqual(expPosArray1));
  });

  it('places points for each datum in a three datum array', () => {
    const promise =  helpers.getPositionsAsync(hapticplot, scene, hapticPlotData2, shape);
    promise.then((positions) => expect(positions).toEqual(expPosArray2));
  });

  it('places points for each datum and sets the correct color property on the resulting data points', () => {
    const promise =  helpers.getColorsAsync(hapticplot, scene, hapticPlotData2, shape);
    promise.then((colors) => expect(colors).toEqual([DEFAULT_COLOR, DEFAULT_COLOR , DEFAULT_COLOR]));
  });

  it('places points for each datum and sets the correct size property on the resulting shape entities', () => {
    const promise =  helpers.getRadiiAsync(hapticplot, scene, hapticPlotData2, shape);
    promise.then((radii) => expect(radii).toEqual([POINT_SIZE.toString(), POINT_SIZE.toString(), POINT_SIZE.toString()]));
  });

  it('places points for each datum and sets the correct hoverable property on the resulting shape entities', () => {
    const promise =  helpers.getHoverableAsync(hapticplot, scene, hapticPlotData2, shape);
    promise.then((component) => expect(component).toEqual(['hoverable', 'hoverable', 'hoverable']));
  });

  it('sets the correct color property on shape entities after a hover event', () => {
    const promise =  helpers.getHoveredColorAsync(hapticplot, scene, hapticPlotData2, shape);
    promise.then((color) => expect(color).toEqual([HOVER_COLOR, HOVER_COLOR, HOVER_COLOR]));
  });

  it('sets the correct color property on shape entities after a hover-end event', () => {
    const promise =  helpers.getHoverEndedColorAsync(hapticplot, scene, hapticPlotData2, shape);
    promise.then((color) => expect(color).toEqual([HOVER_COLOR, HOVER_COLOR, HOVER_COLOR]));
  });

  it('initilizes the controller entitys and attaches the haptic component', () => {
    expect(helpers.hasHaptics(controller)).toEqual(true);
  });

  it('initilizes data points with sound components', () => {
    const promise = helpers.hasSoundsAsync(hapticplot, scene, hapticPlotData2, shape);
    promise.then((hasSounds) => expect(hasSounds).toEqual(true));
  });

  it('attaches audio triggers to initilized data points', () => {
    const promise = helpers.hasSoundTriggersAsync(hapticplot, scene, hapticPlotData2, shape);
    promise.then((hasSoundTriggers) => expect(hasSoundTriggers).toEqual(true));
  });

  it('controller has guidance component', () => {
    expect(helpers.hasGuidance(controller)).toEqual(true);
  });

  it('guide component initizes currentInterval with value intervalDuration (100ms)', () => {
    const promise =  helpers.getGuidanceIntervalAsync(hapticplot, scene, hapticPlotData1, controller);
    promise.then((interval) => expect(interval).toEqual(100));
  });

  it('when controller is near a datapoint, guidance component has haptic intensity between 0 and 1', () => {
    const promise =  helpers.getGuidanceHapticIntensityAsync(hapticplot, scene, hapticPlotData1, controller);
    promise.then((intensity) => expect(intensity > 0 && intensity < 1).toEqual(true));
  });

  it('when controller is in contact with datapoint, guidance component has haptic intensity 1 in front half of interval', () => {
    const promise =  helpers.getIntervalIntensityFrontAsync(hapticplot, scene, hapticPlotData1, controller);
    promise.then((interval) => expect(interval).toEqual(1));
  });

  it('when controller is in contact with datapoint, guidance component has haptic intensity 0 in back half of interval', () => {
    const promise =  helpers.getIntervalIntensityBackAsync(hapticplot, scene, hapticPlotData1, controller);
    promise.then((interval) => expect(interval).toEqual(0));
  });

  it('when haptic guidance interval elapses, the current interval is reset to 100ms', () => {
    const promise =  helpers.getIntervalResetAsync(hapticplot, scene, hapticPlotData1, controller);
    promise.then((interval) => expect(interval).toEqual(100));
  });

  it('when the X or A button are pressed before the controller has been in contact with a datapoint, the datapoints sound component is unchanged', () => {
    const promise = helpers.hasNoButtonTriggersBeforeHoverAsync(hapticplot, scene, hapticPlotData1, controller, shape);
    promise.then((hasNoButton) => expect(hasNoButton).toEqual(true));
  });

  it('when the X or A button are pressed while the controller is no longer in contact with a datapoint, after making contact, the datapoints sound component is unchanged', () => {
    const promise = helpers.hasNoButtonTriggersAfterHoverAsync(hapticplot, scene, hapticPlotData1, controller, shape);
    promise.then((hasButton) => expect(hasButton).toEqual(true));
  });

  it('when the X or A button are pressed while the controller is in contact with a datapoint, the datapoints sound component is set to the appropriate sequence of audio sources, then resets to the original source', () => {
    const promise =  helpers.getAudioSrcSequenceAsync(hapticplot, scene, hapticPlotData1, controller, shape);
    promise.then((sequence) => expect(sequence).toEqual([
      'url(assets/marimbaNotes/14.mp3)',
      'url(assets/tts/ttsX.mp3)',
      'url(assets/tts/tts0.mp3)',
      'url(assets/tts/ttsY.mp3)',
      'url(assets/tts/tts1.mp3)',
      'url(assets/tts/tts0.mp3)',
      'url(assets/tts/ttsZ.mp3)',
      'url(assets/tts/tts0.mp3)',
      'url(assets/marimbaNotes/14.mp3)'
    ]));
  });

  it('audio source sequencing is handled properly for a single point in a scene with multiple points', () => {
    const promise =  helpers.getAudioSrcSequenceAsync(hapticplot, scene, hapticPlotData2, controller, shape);
    promise.then((sequence) => expect(sequence).toEqual([
      'url(assets/marimbaNotes/0.mp3)',
      'url(assets/tts/ttsX.mp3)',
      'url(assets/tts/tts0.mp3)',
      'url(assets/tts/ttsY.mp3)',
      'url(assets/tts/tts0.mp3)',
      'url(assets/tts/ttsZ.mp3)',
      'url(assets/tts/tts0.mp3)',
      'url(assets/marimbaNotes/0.mp3)'
    ]));
  });


  it('audio source sequencing handled properly for a single point in a scene with multiple points and negative position values', () => {
    const promise =  helpers.getAudioSrcSequenceAsync(hapticplot, scene, hapticPlotData3, controller, shape);
    promise.then((sequence) => expect(sequence).toEqual([
      'url(assets/marimbaNotes/27.mp3)',
      'url(assets/tts/ttsX.mp3)',
      'url(assets/tts/tts1.mp3)',
      'url(assets/tts/ttsY.mp3)',
      'url(assets/tts/tts-.mp3)',
      'url(assets/tts/tts4.mp3)',
      'url(assets/tts/ttsZ.mp3)',
      'url(assets/tts/tts4.mp3)',
      'url(assets/tts/tts5.mp3)',
      'url(assets/marimbaNotes/27.mp3)'
    ]));
  });

  it('Data point positions list remains empty after a recentered at position (100, 100, 100) in a scene with no data', () => {
    const promise =  helpers.getRecenteredPointPositionsAsync(hapticplot, scene, hapticPlotData0, controller, shape);
    promise.then((positions) => expect(positions).toEqual([
        [],
        []
      ]));
  });

  it('A single points position is recentered correctly after a thumbstickup event at position (100, 100, 100)', () => {
    const promise =  helpers.getRecenteredPointPositionsAsync(hapticplot, scene, hapticPlotData1, controller, shape);
    promise.then((positions) => expect(positions).toEqual([
        [new Vector3(0, 1, -0.35)],
        [new Vector3(100, 100, 100)]
      ]));
  });

  it('Multiple data points positions are recentered correctly after a thumbstickup event at position (100, 100, 100)', () => {
    const promise =  helpers.getRecenteredPointPositionsAsync(hapticplot, scene, hapticPlotData2, controller, shape);
    promise.then((positions) => expect(positions).toEqual([
        [
          new Vector3(0, 0.30000000000000004, -0.35),
          new Vector3(0, 1, -0.35),
          new Vector3(0, 1.7, -0.35)
        ],
        [
          new Vector3(100, 99.3, 100),
          new Vector3(100, 100, 100),
          new Vector3(100, 100.7, 100)
        ]
      ]));
  });


  it('Grid positions update properly after a recentered at position (100, 100, 100) in a scene with no data', () => {
    const promise =  helpers.getRecenteredGridPositionsAsync(hapticplot, scene, hapticPlotData0, controller);
    promise.then((positions) => expect(positions).toEqual([
        [
          new Vector3(0, 0, 0),
          new Vector3(0, 0, 0),
          new Vector3(0,  0, 0)
        ],
        [
          new Vector3(100, 100, 100),
          new Vector3(100, 100, 100),
          new Vector3(100, 100, 100)
        ]
      ]));
  });

  it('Grid positions are recentered correctly after a thumbstickup event at position (100, 100, 100) in a scene with data', () => {
    const promise =  helpers.getRecenteredGridPositionsAsync(hapticplot, scene, hapticPlotData2, controller);
    promise.then((positions) => expect(positions).toEqual([
        [
          new Vector3(0, 0, 0),
          new Vector3(0, 0, 0),
          new Vector3(0,  0, 0)
        ],
        [
          new Vector3(100, 100, 100),
          new Vector3(100, 100, 100),
          new Vector3(100, 100, 100)
        ]
      ]));
  });
});
