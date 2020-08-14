import * as AFRAME from 'aframe';
import { Scatterplot } from './scatterplot.d3';
import { rollup } from 'd3';
const ROBOTO = 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/roboto/Roboto-Medium.json';
// define spatial placement of navigation tiles in a-scene
const tilePos: Record<string, string> = {
  ['xPos']: '-1.15 1 -4',
  ['xNeg']: '-2.15 1 -4',
  ['yPos']: '-1.65 1.5 -4',
  ['yNeg']: '-1.65 .5 -4',
  ['zPos']: '1.25 1.5 -4',
  ['zNeg']: '1.25 .5 -4',
};
// define spatial placement of speed tiles in a-scene
const speedPos: Record<string, string> = {
    ['minus']: '-.35 .5 -2',
    ['plus']: '.35 .5 -2',
    ['label']: '0 .45 -2',
};
// define spatial placement of x-scale tiles in a-scene
const xScalePos: Record<string, string> = {
    ['decrement']: '-.35 .25 -2',
    ['increment']: '.35 .25 -2',
    ['label']: '0 .2 -2',
};
// define spatial placement of y-scale tiles in a-scene
const yScalePos: Record<string, string> = {
    ['decrement']: '-.35 0 -2',
    ['increment']: '.35 0 -2',
    ['label']: '0 -.05 -2',
};
// define spatial placement of z-scale tiles in a-scene
const zScalePos: Record<string, string> = {
    ['decrement']: '-.35 -0.25 -2',
    ['increment']: '.35 -0.25 -2',
    ['label']: '0 -0.3 -2',
};
// define spatial placement of all-scale tiles in a-scene
const allScalePos: Record<string, string> = {
    ['decrement']: '-.35 -.5 -2',
    ['increment']: '.35 -.5 -2',
    ['label']: '0 -.55 -2',
};
// define spatial placement of ctrl panel toggle bar in a-scene
const toggleBarPos: Record<string, string> = {
  ['bar']: '0 -.725 -2',
  ['label']: '0 -.775 -1.98',
};
// define spatial placement of ctrl panel background in a-scene
const bckgrdPos: Record<string, string> = {
  ['place']: '0 -.1 -2.01',
};
// constants to add to corresponding scales after 'keydown' event listener
const scaleControls = {
  9: {x: 10, y: 0, z: 0},
  7: {x: -10, y: 0, z: 0},
  6: {x: 0, y: 10, z: 0},
  4: {x: 0, y: -10, z: 0},
  3: {x: 0, y: 0, z: 10},
  1: {x: 0, y: 0, z: -10},
  8: {x: 10, y: 10, z: 10},
  5: {x: -10, y: -10, z: -10},
};
const speedControls = {
  Minus: {val: -.1},
  Equal: {val: .1},
};
const mvmtControls = {
  I: {dim: 'z', direction: 1},
  K: {dim: 'z', direction: -1},
  Q: {dim: 'y', direction: 1},
  Z: {dim: 'y', direction: -1},
  L: {dim: 'x', direction: 1},
  J: {dim: 'x', direction: -1},
};
const dimensions = ['x', 'y', 'z'];
const ADD_SPEED = .1;

export class Controls{
  showCtrls: boolean;
  loadingFlag: boolean;
  scatter: Scatterplot;
  camera: HTMLElement;
  keyEventsLoaded: boolean;

  constructor(scatter: Scatterplot){
    this.keyEventsLoaded = false;
    this.loadingFlag = true;
    this.showCtrls = true;
    this.scatter = scatter;
    this.camera = document.querySelector('[camera]');
    if (this.camera === null){
      document.createElement('a-camera');
    }
    this.createNavTiles();
    this.createCtrlPanel();
    this.addDemoKeys();
  }
  createNavTiles(){
    for (const dimension of dimensions){
      this.createNavTile(dimension);
    }
  }
  // in web desktop version, there is no laser pointer to adjust ctrls/position
  // addDemoKeys allows for user to still use all ctrls through keyboard interface
  addDemoKeys(){
    document.addEventListener('keydown', (event) => {
      // add controls to increase/decrease speed of movement in space with either ijkl mvmt or daydream ctrl panel
      for (const [sign, value] of Object.entries(speedControls)) {
        if ([sign].includes(event.code)) {
          console.log(value.val);
          this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() + value.val);
        }
      }
      // add controls to change scale of x, y, z or all dimensions
      for (const [digit, offsets] of Object.entries(scaleControls)) {
        if (['Numpad' + digit, 'Digit' + digit].includes(event.code)) {
          this.scatter.changeScales(this.scatter.getGridBound('x') + offsets.x,
          this.scatter.getGridBound('y') + offsets.y,
          this.scatter.getGridBound('z') + offsets.z);
        }
      }
      // reset scale back to initial loading scale, where each point's distance from origin per dim. is from 0 to 50
      if (event.code === 'Numpad0' || event.code === 'Digit0'){
        this.scatter.changeScales(
          50, 50, 50);
      }
      const camPos = document.querySelector('[camera]').object3D.position;
      // create movement on keyboard with adjustable speed (speed ctrls diretly affect mvmt of ijkl + qz mvmt)
      for (const [key, value] of Object.entries(mvmtControls)) {
        if (['Key' + key].includes(event.code)) {
          if (value.dim === 'x'){
            camPos.set(
              camPos.x + value.direction * this.scatter.DAYDREAM_NAV_SPEED,
              camPos.y,
              camPos.z
            );
          }
          if (value.dim === 'y'){
            camPos.set(
              camPos.x,
              camPos.y + value.direction * this.scatter.DAYDREAM_NAV_SPEED,
              camPos.z
            );
          }
          if (value.dim === 'z'){
            camPos.set(
              camPos.x,
              camPos.y,
              camPos.z + value.direction * this.scatter.DAYDREAM_NAV_SPEED
            );
          }
        }
      }
      // toggle on/off the Control Panel
      // since there is no laser in desktop version, must use key to toggle panel
      if (event.code === 'KeyT'){
        const nonTxtControlItems = document.getElementsByClassName('nonTextToggle');
        for (const item of (nonTxtControlItems as unknown as Array<Element>)){
          if (!this.showCtrls){
            (item as AFRAME.Entity).setAttribute('scale', '1 1 1');
        }
          else{
            // panel will obstruct cursor => scale size down to keep from entity intersection conflict
            (item as AFRAME.Entity).setAttribute('scale', '.01 .01 .01');
          }
        }
        const controlItems = document.getElementsByClassName('toggle');
        for (const item of (controlItems as unknown as Array<Element>)){
          // toggle on/off the ctrl panel
          (item as AFRAME.Entity).setAttribute('visible', !this.showCtrls);
        }
        this.showCtrls = !this.showCtrls;
      }
    });
    this.keyEventsLoaded = true;
  }

  // create 6 arrows - 3 per dimension - to allow for movement in scene
  createNavTile(dim: string){
    let rigPos: any;
    if (document.getElementById('rig') as AFRAME.Entity != null){
      rigPos = (document.getElementById('rig') as AFRAME.Entity).object3D.position;
    }
    else{
      rigPos = document.createElement('a-camera').object3D.position;
    }
    const navTilePos = document.createElement('a-entity');
    navTilePos.className = 'navigation';
    this.cameraAppendChild(navTilePos);
    const navTileNeg = document.createElement('a-entity');
    navTileNeg.className = 'navigation';
    this.cameraAppendChild(navTileNeg);
    (navTilePos as AFRAME.Entity).setAttribute('geometry', 'primitive: plane; height: .75; width: .75');
    (navTileNeg as AFRAME.Entity).setAttribute('geometry', 'primitive: plane; height: .75; width: .75');
    let positivePos = '';
    let negativePos = '';
    let imagePos = '../assets/up_arrow.png';
    let imageNeg = '../assets/down_arrow.png';
    if (dim === 'x'){
      positivePos = tilePos.xPos;
      negativePos = tilePos.xNeg;
      imagePos = '../assets/right_arrow.png';
      imageNeg = '../assets/left_arrow.png';
    } else if (dim === 'y'){
        positivePos = tilePos.yPos;
        negativePos = tilePos.yNeg;
    } else if (dim === 'z'){
        positivePos = tilePos.zPos;
        negativePos = tilePos.zNeg;
    }
    (navTilePos as AFRAME.Entity).setAttribute('position', positivePos);
    (navTileNeg as AFRAME.Entity).setAttribute('position', negativePos);
    (navTilePos as AFRAME.Entity).setAttribute('material', `color: black; opacity: .95; src: ${imagePos}`);
    (navTileNeg as AFRAME.Entity).setAttribute('material', `color: black; opacity: .95; src: ${imageNeg}`);
    let intervalPos;
    let intervalNeg;
    // set event listeners with scatter.DAYDREAM... delta in order to have updated speeds
    (navTilePos as AFRAME.Entity).addEventListener('mousedown', () => {
      intervalPos = setInterval(() => {
        let xDelta = 0;
        let yDelta = 0;
        let zDelta = 0;
        if (dim === 'x'){
            // add negative bc camera is turned around
            xDelta = -this.scatter.DAYDREAM_NAV_SPEED;
        } else if (dim === 'y'){
            yDelta = this.scatter.DAYDREAM_NAV_SPEED;
        } else if (dim === 'z'){
            zDelta = this.scatter.DAYDREAM_NAV_SPEED;
        }
        rigPos.set(
            rigPos.x + xDelta,
            rigPos.y + yDelta,
            rigPos.z + zDelta
        );
      }, 200);
    });
    (navTilePos as AFRAME.Entity).addEventListener('mouseup', () => { clearInterval(intervalPos); });
    (navTileNeg as AFRAME.Entity).addEventListener('mousedown', () => {
      intervalNeg = setInterval(() => {
        let xDelta = 0;
        let yDelta = 0;
        let zDelta = 0;
        if (dim === 'x'){
          // add negative bc camera is turned around
          xDelta = -this.scatter.DAYDREAM_NAV_SPEED;
        } else if (dim === 'y'){
            yDelta = this.scatter.DAYDREAM_NAV_SPEED;
        } else if (dim === 'z'){
            zDelta = this.scatter.DAYDREAM_NAV_SPEED;
        }
        rigPos.set(
            rigPos.x - xDelta,
            rigPos.y - yDelta,
            rigPos.z - zDelta
        );
      }, 200);
    });
    (navTileNeg as AFRAME.Entity).addEventListener('mouseup', () => { clearInterval(intervalNeg); });
  }
  // abstracted calling to create collapsible control panel with speed and scale adjustments
  createCtrlPanel(){
    this.createBackground();
    this.createSpeedCtrls('plus');
    this.createSpeedCtrls('neg');
    this.createSpeedCtrls('label');
    for (const dimension of dimensions){
      this.createScaleCtrls(dimension);
    }
    this.createScaleCtrls('all');
    this.createToggleBar();
    const elems = document.getElementsByClassName('toggle');
    for (const elem of (elems as unknown as Array<Element>)){
      (elem as AFRAME.Entity).setAttribute('visible', false);
    }
  }
  // create speedctrls and 'speed' label based on sign parameter
  createSpeedCtrls(sign: string){
    const speedTile = document.createElement('a-entity') as AFRAME.Entity;
    speedTile.className = 'toggle nonTextToggle speed';
    this.cameraAppendChild(speedTile);
    if (sign === 'plus'){
      speedTile.setAttribute('geometry', 'primitive: plane; height: .25; width: .25');
      speedTile.setAttribute('position', speedPos.plus);
      speedTile.setAttribute('material', 'color: black; opacity: .95; src: ../assets/plus.png;');
      (speedTile as AFRAME.Entity).addEventListener('mousedown', () => {
        this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() + ADD_SPEED);
      });
      } else if (sign === 'neg'){
          speedTile.setAttribute('geometry', 'primitive: plane; height: .25; width: .25');
          speedTile.setAttribute('position', speedPos.minus);
          speedTile.setAttribute('material', 'color: black; opacity: .95; src: ../assets/negative.png');
          (speedTile as AFRAME.Entity).addEventListener('mousedown', () => {
            if (this.scatter.DAYDREAM_NAV_SPEED > 0){
              this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() - ADD_SPEED);
            }
          });
      }
      else if (sign === 'label'){
        const speedLabelTile = document.createElement('a-entity') as AFRAME.Entity;
        this.cameraAppendChild(speedLabelTile);
        speedLabelTile.className = 'toggle';
        speedLabelTile.setAttribute('position', speedPos.label);
        speedLabelTile.setAttribute('text', `value: Speed; align: center; color: black; shader: msdf; font: ${ROBOTO};`);
        speedLabelTile.setAttribute('scale', '2 2 1');
      }
  }
  // make positive and negative tile for scale adjustment
  // dim: string defines unique attributes of tile, such as src picture, position, which dimension it is re-scaling, etc
  createScaleCtrls(dim: string){
    const scaleTilePos = document.createElement('a-entity') as AFRAME.Entity;
    scaleTilePos.className = 'toggle nonTextToggle';
    this.cameraAppendChild(scaleTilePos);
    const scaleTileNeg = document.createElement('a-entity') as AFRAME.Entity;
    scaleTileNeg.className = 'toggle nonTextToggle';
    this.cameraAppendChild(scaleTileNeg);
    const labelTile = document.createElement('a-entity') as AFRAME.Entity;
    labelTile.className = 'toggle';
    this.cameraAppendChild(labelTile);

    scaleTilePos.setAttribute('geometry', 'primitive: plane; height: .25; width: .25');
    scaleTilePos.setAttribute('material', 'color: black; opacity: .95; src: ../assets/plus.png;');
    scaleTileNeg.setAttribute('geometry', 'primitive: plane; height: .25; width: .25');
    scaleTileNeg.setAttribute('material', 'color: black; opacity: .95; src: ../assets/negative.png;');
    let xScaleDelta = 0;
    let yScaleDelta = 0;
    let zScaleDelta = 0;
    let positivePos = '';
    let negativePos = '';
    let labelPos = '';
    let labelName = '';
    if (dim === 'x'){
      xScaleDelta = 10;
      positivePos = xScalePos.increment;
      negativePos = xScalePos.decrement;
      labelPos = xScalePos.label;
      labelName = 'X-Scale';
    } else if (dim === 'y'){
        yScaleDelta = 10;
        positivePos = yScalePos.increment;
        negativePos = yScalePos.decrement;
        labelPos = yScalePos.label;
        labelName = 'Y-Scale';
    } else if (dim === 'z'){
        zScaleDelta = 10;
        positivePos = zScalePos.increment;
        negativePos = zScalePos.decrement;
        labelPos = zScalePos.label;
        labelName = 'Z-Scale';
    } else if (dim === 'all'){
        // if all scales chosen, then defaults/resets to scale of x bounds
        xScaleDelta = 10;
        positivePos = allScalePos.increment;
        negativePos = allScalePos.decrement;
        labelPos = allScalePos.label;
        labelName = 'XYZ-Scale';
      }
    scaleTilePos.setAttribute('position', positivePos);
    (scaleTilePos as AFRAME.Entity).addEventListener('mousedown', () => {
      if (dim === 'all'){
        this.scatter.changeScales(
          this.scatter.getGridBound('x') + xScaleDelta,
          this.scatter.getGridBound('x') + xScaleDelta,
          this.scatter.getGridBound('x') + xScaleDelta);
      } else {
          this.scatter.changeScales(
          this.scatter.getGridBound('x') + xScaleDelta,
          this.scatter.getGridBound('y') + yScaleDelta,
          this.scatter.getGridBound('z') + zScaleDelta);
      }
    });
    scaleTileNeg.setAttribute('position', negativePos);
    (scaleTileNeg as AFRAME.Entity).addEventListener('mousedown', () => {
      if (dim === 'all'){
        this.scatter.changeScales(
          this.scatter.getGridBound('x') - xScaleDelta,
          this.scatter.getGridBound('x') - xScaleDelta,
          this.scatter.getGridBound('x') - xScaleDelta);
      } else {
          this.scatter.changeScales(
          this.scatter.getGridBound('x') - xScaleDelta,
          this.scatter.getGridBound('y') - yScaleDelta,
          this.scatter.getGridBound('z') - zScaleDelta);
      }
    });
    labelTile.setAttribute('position', labelPos);
    labelTile.setAttribute('text', `value: ${labelName}; align: center; color: black; shader: msdf; font: ${ROBOTO};`);
    labelTile.setAttribute('scale', '2 2 1');
  }
  // create bar to toggle control panel on/off in desktop (KeyT) or mobile version (mousedown)
  createToggleBar(){
    const toggleBar = document.createElement('a-entity');
    toggleBar.className = 'toggleBar';
    this.cameraAppendChild(toggleBar);
    toggleBar.setAttribute('geometry', 'primitive: plane; height: .15; width:.75');
    toggleBar.setAttribute('material', 'color: #4385f4; opacity: 1');
    toggleBar.setAttribute('position', toggleBarPos.bar);
    const toggleText = document.createElement('a-entity');
    this.cameraAppendChild(toggleText);
    toggleText.setAttribute('position', toggleBarPos.label);
    toggleText.setAttribute('text', `value: Control Panel; align: center; color: black; shader: msdf; font: ${ROBOTO};`);
    toggleText.setAttribute('scale', '2 2 1');
    toggleBar.addEventListener('mousedown', () => {
      const nonTxtControlItems = document.getElementsByClassName('nonTextToggle');
      for (const item of (nonTxtControlItems as unknown as Array<Element>)){
        if (!this.showCtrls){
          (item as AFRAME.Entity).setAttribute('scale', '1 1 1');
        }
        else{
          (item as AFRAME.Entity).setAttribute('scale', '.01 .01 .01');
        }
      }
      const controlItems = document.getElementsByClassName('toggle');
      for (const item of (controlItems as unknown as Array<Element>)){
        (item as AFRAME.Entity).setAttribute('visible', !this.showCtrls);
      }
      this.showCtrls = !this.showCtrls;
    });
  }
  createBackground(){
    const bckgrd = document.createElement('a-entity');
    bckgrd.className = 'background';
    this.cameraAppendChild(bckgrd);
    bckgrd.className = 'toggle nonTextToggle';
    bckgrd.setAttribute('geometry', 'primitive: plane; height: 1.5; width: 1');
    bckgrd.setAttribute('material', 'color: #4385f4; opacity: .75;');
    bckgrd.setAttribute('position', bckgrdPos.place);
  }
  // check to make sure camera is not null before trying to append a child to it
  private cameraAppendChild(element: HTMLElement){
    if (this.camera !== null){
      this.camera.appendChild(element);
    }
    else {
     this.scatter.container!.appendChild(element);
    }
  }
}

