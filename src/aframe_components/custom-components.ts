import { Vector3 } from 'three';
import { Component } from 'aframe';
import { build3DTree, distToNearestPoint, KDNode} from './kdtree';

const HAPTIC_RANGE = 0.3;
const COLLISION_DISTANCE = 0.029;
const HAPTIC_EXPONENT = 2;
const HAPTIC_GROWTH_MODIFIER = 4;
const HAPTIC_DURATION = 5000;
const INTERVAL_DURATION = 100;

interface State {
  currInterval: number;
  currPosition: Vector3;
  currDistance: number;
  currDistanceScaled: number;
  intensity: number;
}

export interface Guidance extends Component {
  state: State;
  pointPositions: Vector3[];
  kdtree: KDNode | null;

  updateState(timeDelta: number): State;
  setIntensityNear(newState: State): State;
  setIntensityContact(newState: State, timeDelta: number): State;
}

export const guideComponent: Partial<Guidance> = {
  state: {
    currInterval: INTERVAL_DURATION,
    currPosition: new Vector3(0, 0, 0),
    currDistance: HAPTIC_RANGE,
    currDistanceScaled: (HAPTIC_RANGE - COLLISION_DISTANCE) * (HAPTIC_RANGE) / (HAPTIC_RANGE - COLLISION_DISTANCE),
    intensity: 0,
  },

  pointPositions: [],
  kdtree: null,

  init(){
    this.pointPositions =
      Array.from((this.el.sceneEl.querySelectorAll('a-sphere') as Element[])).map((point: Element) =>
      point.getAttribute('position'));
    this.kdtree = build3DTree(this.pointPositions, 0);
    this.state.currInterval = INTERVAL_DURATION;
  },

  /**
   * A function called each render frame which handles the controller haptics
   * - increases haptic intensity as controller nears a datapoint within HAPTIC_RANGE
   * - sends hapic pulses on a repeating interval once contact is made with a point
   * @param time global scene uptime
   * @param timeDelta time elapsed since previous frame
   */
  tick(time, timeDelta) {
    this.state = this.updateState(timeDelta);

    if (this.el.components?.haptics?.hasOwnProperty('data')){
      this.el.components.haptics.pulse(this.state.intensity, HAPTIC_DURATION);
    }
  },

  /**
   * Returns a state variable containing the updated state of the scene after a tick of duration timeDelta
   * - determines the distance between the controller and the nearest point
   * - sets the state's haptic intensity to the appropriate value based on proximity and change in time
   * - intensity has three modes: far (intensity = 0), near (intensity ranges 0-1), contact (interval intensity)
   * @param timeDelta time elapsed since previous frame
   */
  updateState(timeDelta: number) {
    let newState = this.state;
    newState.currPosition = this.el.object3D.position;
    newState.currDistance = distToNearestPoint(newState.currPosition, this.kdtree);
     // If the closest point is not found, or is found but is out of range, intensity is zero
    if (newState.currDistance == null || newState.currDistance > HAPTIC_RANGE){
      newState.intensity = 0;
    }
    // If a datapoint is within haptic range, send haptic feedback based on its proximity
    // - uses a combination of quadratic functions to map proximity to haptic intensity
    else if (COLLISION_DISTANCE < newState.currDistance && newState.currDistance < HAPTIC_RANGE){
      newState = this.setIntensityNear(newState);
    }
    // If the controller is touching a data point, fire haptics in an on-off sequence of duration INTERVAL_DURATION
    // - uses timeDelta to maintain interval consistency between frame refresh rate changes
    else {
      newState = this.setIntensityContact(newState, timeDelta);
    }
    return newState;
  },

  /**
   * If the nearest point is within the haptic range, the haptic intensity is determined
   * by taking the max of two quadratic functions
   * - the first function determines a slow intensity growth at distant proximities
   * - the second function maps to a rapid growth at near proximity
   * - the distance is also scaled, to a range from 0 to the haptic range, in order to map to the desired intensity values
   * @param newState the state variable being genrated from the current frame
   */
  setIntensityNear(newState){
    // Translates distance from COLLISION_DISTANCE -> HAPTIC_RANGE to 0 -> HAPTIC_RANGE, for use in intensity calculations
    newState.currDistanceScaled =
      (newState.currDistance - COLLISION_DISTANCE) * (HAPTIC_RANGE) / (HAPTIC_RANGE - COLLISION_DISTANCE);
    newState.intensity = Math.max(
      Math.pow((newState.currDistanceScaled - HAPTIC_RANGE) / (HAPTIC_RANGE * 2), HAPTIC_EXPONENT),
      Math.pow((newState.currDistanceScaled - HAPTIC_RANGE) / HAPTIC_RANGE, HAPTIC_EXPONENT * HAPTIC_GROWTH_MODIFIER));
    return newState;
  },

  /**
   * If the controller is in contact with a point, the haptic motor is fired in an on/off interval
   * - decreases the time remaining in the current interval by timeDelta
   * - sets the haptic intensity to 1 if in the font half of the interval, 0 if in the back half
   * @param newState the state variable being genrated from the current frame
   * @param timeDelta the real world time elapsed since the previous frame
   */
  setIntensityContact(newState, timeDelta){
    newState.currInterval -= timeDelta;
    newState.intensity = (newState.currInterval > INTERVAL_DURATION / 2) ? 1 : 0;
    if (newState.currInterval <= 0){
      newState.currInterval = INTERVAL_DURATION;
    }
    return newState;
  }
};
