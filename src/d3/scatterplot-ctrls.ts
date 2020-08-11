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
    ['minus']: '-1 2.5 -4',
    ['plus']: '.25 2.5 -4',
    ['label']: '0 2.5 -4',
   
  };

export class Controls{
  scatter: Scatterplot;
  constructor(scatter: Scatterplot){
  this.scatter = scatter;
  this.addQZCtrls();
  this.createNavTiles(this.scatter.DAYDREAM_NAV_SPEED);
  this.createCtrlPanel(); 
  }


  addQZCtrls(){
document.addEventListener('keydown', (event) => {
  const camPos = document.querySelector('[camera]').object3D.position;
  if (event.code === 'KeyQ'){
    camPos.set(
      camPos.x,
      camPos.y + this.scatter.DAYDREAM_NAV_SPEED,
      camPos.z
    );
    }
    if (event.code === 'KeyZ'){
      camPos.set(
        camPos.x,
        camPos.y - this.scatter.DAYDREAM_NAV_SPEED,
        camPos.z
        );
    }
  });
}

// abstracted calling of creating navigation tiles (3 dimensions - pos/neg direction)
createNavTiles(DAYDREAM_NAV_SPEED: number){
  this.createNavTile('x', DAYDREAM_NAV_SPEED);
  this.createNavTile('x', -DAYDREAM_NAV_SPEED);
  this.createNavTile('y', DAYDREAM_NAV_SPEED);
  this.createNavTile('y', -DAYDREAM_NAV_SPEED);
  this.createNavTile('z', DAYDREAM_NAV_SPEED);
  this.createNavTile('z', -DAYDREAM_NAV_SPEED);
}

// create 6 arrows - 3 per dimenstion - to allow for movement in scene
createNavTile(dim: string, velocity: number){
    let rigPos = (document.getElementById('rig') as AFRAME.Entity).object3D.position;
    const navTile = document.createElement('a-entity');
    // document.querySelector('[camera]').appendChild(navTile);
    document.querySelector('[camera]').appendChild(navTile);
    (navTile as AFRAME.Entity).setAttribute('geometry', 'primitive: plane; height: 1; width: 1');
    if (dim === 'x'){
      if (velocity > 0){
        (navTile as AFRAME.Entity).setAttribute('position', tilePos.xPos);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/right_arrow.png');
      } else {
        (navTile as AFRAME.Entity).setAttribute('position', tilePos.xNeg);
        (navTile as AFRAME.Entity).setAttribute('material', 'color: white; opacity: .75; src: ../assets/left_arrow.png');
      }
      // set event listeners with scatter.DAYDREAM... delta in order to have updated speeds
      (navTile as AFRAME.Entity).addEventListener('mousedown', () => {
        rigPos.set(
          rigPos.x + this.scatter.DAYDREAM_NAV_SPEED,
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
          rigPos.y + this.scatter.DAYDREAM_NAV_SPEED,
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
          rigPos.z + this.scatter.DAYDREAM_NAV_SPEED
        );
      });
    }
  }

// abstracted calling to create collapsible control panel with speed and scale adjustments
createCtrlPanel(){
    this.createSpeedCtrls('plus');
    this.createSpeedCtrls('neg');
    this.createSpeedCtrls('label');
}

//create speedctrls and 'speed' label based on sign parameter
createSpeedCtrls(sign: string){
                  console.log(this.scatter.DAYDREAM_NAV_SPEED);

    const speedTile = document.createElement('a-entity') as AFRAME.Entity;
    document.querySelector('[camera]').appendChild(speedTile);
    // document.getElementById('ctrls')!.appendChild(navTile);
    if (sign === 'plus'){
      speedTile.setAttribute('geometry', 'primitive: plane; height: 1; width: 1');
      speedTile.setAttribute('position', speedPos.plus);
      speedTile.setAttribute('material', 'color: white; opacity: .75; src: ../assets/plus.png;');
      (speedTile as AFRAME.Entity).addEventListener('mousedown', () => {
        this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() + .1);
        console.log(this.scatter.getDaydreamNavSpeed());
      });
      } else if (sign === 'neg'){
          speedTile.setAttribute('geometry', 'primitive: plane; height: 1; width: 1');
          speedTile.setAttribute('position', speedPos.minus);
          speedTile.setAttribute('material', 'color: white; opacity: .75; src: ../assets/negative.png');
          (speedTile as AFRAME.Entity).addEventListener('mousedown', () => {
            if (this.scatter.DAYDREAM_NAV_SPEED > 0){
              this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() - .1);
              console.log(this.scatter.getDaydreamNavSpeed());
            }
          });
      } 
    //   else if (sign === 'label'){
    //       // speedTile.setAttribute('geometry', 'primitive: plane; height: auto; width: auto');
    //       speedTile.setAttribute('position', speedPos.label);
    //       speedTile.setAttribute('text', `value: Speed ${scatter.DAYDREAM_NAV_SPEED}; align: center; color: black; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/rubikmonoone/RubikMonoOne-Regular.json;`);
    //       speedTile.setAttribute('scale', '3 3 1');  
    //       speedTile.addEventListener('mousedown', () => {
    //           console.log(scatter.DAYDREAM_NAV_SPEED);
    //       });   
    //   }
  }
}

