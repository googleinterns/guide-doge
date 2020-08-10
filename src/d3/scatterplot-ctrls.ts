import * as AFRAME from 'aframe';
import { Scatterplot } from './scatterplot.d3';

const tilePos: Record<string, string> = {
  ['xPos']: '-1 1 -4',
  ['xNeg']: '-2 1 -4',
  ['yPos']: '-1.5 1.5 -4',
  ['yNeg']: '-1.5 .5 -4',
  ['zPos']: '1 1.5 -4',
  ['zNeg']: '1 .5 -4',
};

const speedPos: Record<string, string> = {
    ['minus']: '-.75 1.5 -4',
    ['plus']: '.25 1.5 -4',
    ['label']: '-.25 1.5 -4',
   
  };

export function addQZCtrls(){
document.addEventListener('keydown', (event) => {
  const camPos = document.querySelector('[camera]').object3D.position;
  if (event.code === 'KeyQ'){
    camPos.set(
      camPos.x,
      camPos.y + .2,
      camPos.z
    );
    }
    if (event.code === 'KeyZ'){
      camPos.set(
        camPos.x,
        camPos.y - .2,
        camPos.z
        );
    }
  });
}

export function createNavTiles(DAYDREAM_NAV_SPEED: number){
  createNavTile('x', DAYDREAM_NAV_SPEED);
  createNavTile('x', -DAYDREAM_NAV_SPEED);
  createNavTile('y', DAYDREAM_NAV_SPEED);
  createNavTile('y', -DAYDREAM_NAV_SPEED);
  createNavTile('z', DAYDREAM_NAV_SPEED);
  createNavTile('z', -DAYDREAM_NAV_SPEED);
}

function createNavTile(dim: string, velocity: number){
    let rigPos = (document.getElementById('rig') as AFRAME.Entity).object3D.position;
    const navTile = document.createElement('a-entity');
    // document.querySelector('[camera]').appendChild(navTile);
    document.querySelector('[camera]').appendChild(navTile);
    (navTile as AFRAME.Entity).setAttribute('geometry', 'primitive: plane; height: .5; width: .5');
    if (dim === 'x'){
      if (velocity > 0){
        (navTile as AFRAME.Entity).setAttribute('position', tilePos.xPos);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/right_arrow.png');
      } else {
        (navTile as AFRAME.Entity).setAttribute('position', tilePos.xNeg);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/left_arrow.png');
      }
      (navTile as AFRAME.Entity).addEventListener('mousedown', () => {
        rigPos.set(
          rigPos.x + velocity,
          rigPos.y,
          rigPos.z
        );
      });
    } else if (dim === 'y'){
      if (velocity > 0){
        (navTile as AFRAME.Entity).setAttribute('position', tilePos.yPos);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/up_arrow.png');
      } else {
        (navTile as AFRAME.Entity).setAttribute('position', tilePos.yNeg);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/down_arrow.png');
      }
      (navTile as AFRAME.Entity).addEventListener('mousedown', () => {
        rigPos.set(
          rigPos.x,
          rigPos.y + velocity,
          rigPos.z
        );
      });
    } else if (dim === 'z'){
      if (velocity > 0){
        (navTile as AFRAME.Entity).setAttribute('position', tilePos.zPos);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/up_arrow.png');
      } else {
        (navTile as AFRAME.Entity).setAttribute('position', tilePos.zNeg);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/down_arrow.png');
      }
      (navTile as AFRAME.Entity).addEventListener('mousedown', () => {
        rigPos.set(
          rigPos.x,
          rigPos.y,
          rigPos.z + velocity
        );
      });
    }
  }

export function createCtrlPanel(scatter: Scatterplot){
    createSpeedCtrls('plus', scatter);
    createSpeedCtrls('neg', scatter);
    createSpeedCtrls('label', scatter);
}

function createSpeedCtrls(sign: string, scatter: Scatterplot){
    const speedTile = document.createElement('a-entity') as AFRAME.Entity;
    document.querySelector('[camera]').appendChild(speedTile);
    // document.getElementById('ctrls')!.appendChild(navTile);
    if (sign === 'plus'){
      speedTile.setAttribute('geometry', 'primitive: plane; height: .35; width: .35');
      speedTile.setAttribute('position', speedPos.plus);
      speedTile.setAttribute('material', 'color: white; opacity: .75; src: ../assets/plus.png;');
      speedTile.addEventListener('mousedown', () => {
        scatter.DAYDREAM_NAV_SPEED = scatter.DAYDREAM_NAV_SPEED + .1;
        speedTile.setAttribute('text', `value: Speed ${scatter.DAYDREAM_NAV_SPEED}; align: center; color: black; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/rubikmonoone/RubikMonoOne-Regular.json;`);

      });
      } else if (sign === 'neg'){
          speedTile.setAttribute('geometry', 'primitive: plane; height: .35; width: .35');
          speedTile.setAttribute('position', speedPos.minus);
          speedTile.setAttribute('material', 'color: white; opacity: .75; src: ../assets/negative.png');
          speedTile.addEventListener('mousedown', () => {
            if (scatter.DAYDREAM_NAV_SPEED === 0){
              scatter.DAYDREAM_NAV_SPEED = 0;
            } else{
              scatter.DAYDREAM_NAV_SPEED = scatter.DAYDREAM_NAV_SPEED - .1;
              speedTile.setAttribute('text', `value: Speed ${scatter.DAYDREAM_NAV_SPEED}; align: center; color: black; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/rubikmonoone/RubikMonoOne-Regular.json;`);

            }
          });
      } else if (sign === 'label'){
          // speedTile.setAttribute('geometry', 'primitive: plane; height: auto; width: auto');
          speedTile.setAttribute('position', speedPos.label);
          speedTile.setAttribute('text', `value: Speed ${scatter.DAYDREAM_NAV_SPEED}; align: center; color: black; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/rubikmonoone/RubikMonoOne-Regular.json;`);
          speedTile.setAttribute('scale', '4 4 1');     
      }
  }

