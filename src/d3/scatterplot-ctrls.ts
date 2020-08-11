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
    ['minus']: '-1 2.75 -5',
    ['plus']: '.25 2.75 -5',
    ['label']: '0 2.75 -5',
};
const xScalePos: Record<string, string> = {
    ['decrement']: '-1 -.5 -5',
    ['increment']: '.25 -.5 -5',
    ['label']: '0 -.5 -5',
};

const dimensions = ['x', 'y', 'z'];

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
    // camPos.set(
    //   camPos.x,
    //   camPos.y + this.scatter.DAYDREAM_NAV_SPEED,
    //   camPos.z
    // );
    this.scatter.changeScales(50, 50, this.scatter.ZGRID_BOUND + 50);
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
  for (let dimension of dimensions){
      this.createNavTile(dimension);
  }
}

// create 6 arrows - 3 per dimenstion - to allow for movement in scene
createNavTile(dim: string){
    var rigPos = (document.getElementById('rig') as AFRAME.Entity).object3D.position;
    const navTilePos = document.createElement('a-entity');
    document.querySelector('[camera]').appendChild(navTilePos);
    const navTileNeg = document.createElement('a-entity');
    document.querySelector('[camera]').appendChild(navTileNeg);
    (navTilePos as AFRAME.Entity).setAttribute('geometry', 'primitive: plane; height: 1; width: 1');
    (navTileNeg as AFRAME.Entity).setAttribute('geometry', 'primitive: plane; height: 1; width: 1');
    var positivePos = '';
    var negativePos = '';
    var imagePos = '../assets/up_arrow.png';
    var imageNeg = '../assets/down_arrow.png';
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
    (navTilePos as AFRAME.Entity).setAttribute('material', `color: white; opacity: .75; src: ${imagePos}`);
    (navTileNeg as AFRAME.Entity).setAttribute('material', `color: white; opacity: .75; src: ${imageNeg}`);
    var intervalPos; 
    var intervalNeg;
    // set event listeners with scatter.DAYDREAM... delta in order to have updated speeds
    (navTilePos as AFRAME.Entity).addEventListener('mousedown', () => {
        intervalPos = setInterval(() => {
          var xDelta = 0;
          var yDelta = 0;
          var zDelta = 0;
          if (dim === 'x'){
              xDelta = this.scatter.DAYDREAM_NAV_SPEED;
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
      (navTilePos as AFRAME.Entity).addEventListener('mouseup', () => { clearInterval(intervalPos);});
    (navTileNeg as AFRAME.Entity).addEventListener('mousedown', () => {
      intervalNeg = setInterval(() => {
        var xDelta = 0;
        var yDelta = 0;
        var zDelta = 0;
        if (dim === 'x'){
            xDelta = this.scatter.DAYDREAM_NAV_SPEED;
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
    (navTileNeg as AFRAME.Entity).addEventListener('mouseup', () => { clearInterval(intervalNeg);}); 
  }
  

// abstracted calling to create collapsible control panel with speed and scale adjustments
createCtrlPanel(){
    this.createSpeedCtrls('plus');
    this.createSpeedCtrls('neg');
    this.createSpeedCtrls('label');
    this.createScaleCtrls('increment');
    this.createScaleCtrls('decrement');
    this.createScaleCtrls('label');
}

//create speedctrls and 'speed' label based on sign parameter
createSpeedCtrls(sign: string){
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
    //       speedTile.setAttribute('text', `value: Speed ${this.scatter.DAYDREAM_NAV_SPEED}; align: center; color: black; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/rubikmonoone/RubikMonoOne-Regular.json;`);
    //       speedTile.setAttribute('scale', '3 3 1');  
    //       speedTile.addEventListener('mousedown', () => {
    //       });   
    //   }
  }

  createScaleCtrls(delta: string){
    const speedTile = document.createElement('a-entity') as AFRAME.Entity;
    document.querySelector('[camera]').appendChild(speedTile);
    // document.getElementById('ctrls')!.appendChild(navTile);
    if (delta === 'increment'){
      speedTile.setAttribute('geometry', 'primitive: plane; height: 1; width: 1');
      speedTile.setAttribute('position', xScalePos.increment);
      speedTile.setAttribute('material', 'color: white; opacity: .75; src: ../assets/plus.png;');
      (speedTile as AFRAME.Entity).addEventListener('mousedown', () => {
        this.scatter.changeScales(this.scatter.XGRID_BOUND + 50, 50, 50);
      });
      } else if (delta === 'decrement'){
          speedTile.setAttribute('geometry', 'primitive: plane; height: 1; width: 1');
          speedTile.setAttribute('position', xScalePos.decrement);
          speedTile.setAttribute('material', 'color: white; opacity: .75; src: ../assets/negative.png');
          (speedTile as AFRAME.Entity).addEventListener('mousedown', () => {
            this.scatter.changeScales(this.scatter.XGRID_BOUND - 50, 50, 50);
          });
      } 
    //   else if (delta === 'label'){
    //       // speedTile.setAttribute('geometry', 'primitive: plane; height: auto; width: auto');
    //       speedTile.setAttribute('position', xScalePos.label);
    //       speedTile.setAttribute('text', `value: Speed ${this.scatter.DAYDREAM_NAV_SPEED}; align: center; color: black; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/rubikmonoone/RubikMonoOne-Regular.json;`);
    //       speedTile.setAttribute('scale', '3 3 1');  
    //       speedTile.addEventListener('mousedown', () => {
    //       });   
    //   }
  }
}

