import { Vector3 } from 'three';
import { Component } from 'aframe';

const HAPTIC_RANGE = 0.3;
const COLLISION_DISTANCE = 0.029;
const HAPTIC_EXPONENT = 2;
const HAPTIC_GROWTH_MODIFIER = 4;
const HAPTIC_DURATION = 5000;
const INTERVAL_DURATION = 100;

interface State {
  currInterval: number;
  currPosition: Vector3;
  distances: Vector3[];
  currDistance: number;
  currDistanceScaled: number;
  intensity: number;
}

export interface Guidance extends Component {
  state: State;
  pointPositions: Vector3[];
}

export const guideComponent: Partial<Guidance> = {
  state: {
    currInterval: INTERVAL_DURATION,
    currPosition: new Vector3(0, 0, 0),
    distances: [],
    currDistance: HAPTIC_RANGE,
    currDistanceScaled: (HAPTIC_RANGE - COLLISION_DISTANCE) * (HAPTIC_RANGE) / (HAPTIC_RANGE - COLLISION_DISTANCE),
    intensity: 0,
  },

  pointPositions: [],

  init(){
    this.pointPositions =
      Array.from((this.el.sceneEl.querySelectorAll('a-sphere') as Element[])).map((point: Element) =>
      point.getAttribute('position'));
    this.state.currInterval = INTERVAL_DURATION;
  },

  /**
   * A function called each render frame which handles the controller haptics
   * - increases haptic intensity as controller nears a datapoint within HAPTIC_RANGE
   * - sends hapic pules on a repeating interval once contact is made with a point
   * @param time global scene uptime
   * @param timeDelta time elapsed since previous frame
   */
  tick(time, timeDelta) {
    this.state.currPosition = this.el.object3D.position;
    this.state.distances = Array.from(this.pointPositions as Vector3[]).map((pos: Vector3) => this.state.currPosition.distanceTo(pos));
    this.state.distances.sort();
    this.state.currDistance = this.state.distances[0];
    // If a datapoint is within haptic range, send haptic feedback based on its proximity
    // - uses a combination of quadratic functions to map proximity to haptic intensity
    if (COLLISION_DISTANCE < this.state.currDistance && this.state.currDistance < HAPTIC_RANGE){
      // Translates distance from COLLISION_DISTANCE -> HAPTIC_RANGE to 0 -> HAPTIC_RANGE, for use in intensity calculations
      this.state.currDistanceScaled = (this.state.currDistance - COLLISION_DISTANCE) * (HAPTIC_RANGE) / (HAPTIC_RANGE - COLLISION_DISTANCE);
      this.state.intensity = Math.max(
        Math.pow((this.state.currDistanceScaled - HAPTIC_RANGE) / (HAPTIC_RANGE * 2), HAPTIC_EXPONENT),
        Math.pow((this.state.currDistanceScaled - HAPTIC_RANGE) / HAPTIC_RANGE, HAPTIC_EXPONENT * HAPTIC_GROWTH_MODIFIER));
    }
    // If the controller is touching a data point, fire haptics in an on-off sequence of duration INTERVAL_DURATION
    // - uses timeDelta to maintain interval consistency between frame refresh rate changes
    else if (this.state.currDistance <= COLLISION_DISTANCE){
      this.state.currInterval -= timeDelta;
      if (this.state.currInterval > INTERVAL_DURATION / 2){
        this.state.intensity = 1;
      }
      else {
        this.state.intensity = 0;
      }

      if (this.state.currInterval <= 0){
        this.state.currInterval = INTERVAL_DURATION;
      }
    }
    else {
      this.state.intensity = 0;
    }
    if (this.el.components?.haptics?.hasOwnProperty('data')){
      this.el.components.haptics.pulse(this.state.intensity, HAPTIC_DURATION);
    }
  }
};
