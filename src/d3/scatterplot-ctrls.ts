import * as AFRAME from 'aframe';
import { Scatterplot } from './scatterplot.d3';

const tilePos: Record<string, string> = {
  ['xPos']: '-1.25 1 -4',
  ['xNeg']: '-2.25 1 -4',
  ['yPos']: '-1.75 1.5 -4',
  ['yNeg']: '-1.75 .5 -4',
  ['zPos']: '1.25 1.5 -4',
  ['zNeg']: '1.25 .5 -4',
};
const speedPos: Record<string, string> = {
    ['minus']: '-.5 1.75 -3',
    ['plus']: '.5 1.75 -3',
    ['label']: '0 1.7 -3.01',
};
const xScalePos: Record<string, string> = {
    ['decrement']: '-.5 1.35 -3',
    ['increment']: '.5 1.35 -3',
    ['label']: '0 1.3 -3.01',
};

const yScalePos: Record<string, string> = {
    ['decrement']: '-.5 .95 -3',
    ['increment']: '.5 .95 -3',
    ['label']: '0 .9 -3.01',
};

const zScalePos: Record<string, string> = {
    ['decrement']: '-.5 .55 -3',
    ['increment']: '.5 .55 -3',
    ['label']: '0 .5 -3.01',
};

const allScalePos: Record<string, string> = {
    ['decrement']: '-.5 0 -3',
    ['increment']: '.5 0 -3',
    ['label']: '0 -.05 -3.01',
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
    (navTilePos as AFRAME.Entity).setAttribute('geometry', 'primitive: plane; height: .75; width: .75');
    (navTileNeg as AFRAME.Entity).setAttribute('geometry', 'primitive: plane; height: .75; width: .75');
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
    for (const dimension of dimensions){
      this.createScaleCtrls(dimension);
    }
}

//create speedctrls and 'speed' label based on sign parameter
createSpeedCtrls(sign: string){
    const speedTile = document.createElement('a-entity') as AFRAME.Entity;
    document.querySelector('[camera]').appendChild(speedTile);
    // document.getElementById('ctrls')!.appendChild(navTile);
    if (sign === 'plus'){
      speedTile.setAttribute('geometry', 'primitive: plane; height: .4; width: .4');
      speedTile.setAttribute('position', speedPos.plus);
      speedTile.setAttribute('material', 'color: white; opacity: .75; src: ../assets/plus.png;');
      (speedTile as AFRAME.Entity).addEventListener('mousedown', () => {
        this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() + .1);
        console.log(this.scatter.getDaydreamNavSpeed());
      });
      } else if (sign === 'neg'){
          speedTile.setAttribute('geometry', 'primitive: plane; height: .4; width: .4');
          speedTile.setAttribute('position', speedPos.minus);
          speedTile.setAttribute('material', 'color: white; opacity: .75; src: ../assets/negative.png');
          (speedTile as AFRAME.Entity).addEventListener('mousedown', () => {
            if (this.scatter.DAYDREAM_NAV_SPEED > 0){
              this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() - .1);
              console.log(this.scatter.getDaydreamNavSpeed());
            }
          });
      } 
      else if (sign === 'label'){
          // speedTile.setAttribute('geometry', 'primitive: plane; height: auto; width: auto');
          speedTile.setAttribute('position', speedPos.label);
          speedTile.setAttribute('text', `value: Speed; align: center; color: black; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/rubikmonoone/RubikMonoOne-Regular.json;`);
          speedTile.setAttribute('scale', '3 3 1');  
          speedTile.addEventListener('mousedown', () => {
          });   
      }
  }

  createScaleCtrls(dim: string){
    const scaleTilePos = document.createElement('a-entity') as AFRAME.Entity;
    document.querySelector('[camera]').appendChild(scaleTilePos);
    const scaleTileNeg = document.createElement('a-entity') as AFRAME.Entity;
    document.querySelector('[camera]').appendChild(scaleTileNeg);
    const labelTile = document.createElement('a-entity') as AFRAME.Entity;
    document.querySelector('[camera]').appendChild(labelTile);

    scaleTilePos.setAttribute('geometry', 'primitive: plane; height: .4; width: .4');  
    scaleTilePos.setAttribute('material', 'color: white; opacity: .75; src: ../assets/plus.png;');
    scaleTileNeg.setAttribute('geometry', 'primitive: plane; height: .4; width: .4');  
    scaleTileNeg.setAttribute('material', 'color: white; opacity: .75; src: ../assets/negative.png;');
    var xScaleDelta = 0;
    var yScaleDelta = 0;
    var zScaleDelta = 0;
    var positivePos = '';
    var negativePos = '';
    var labelPos = '';
    var labelName = '';
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
    }
    // document.getElementById('ctrls')!.appendChild(navTile);
    
    scaleTilePos.setAttribute('position', positivePos);
    (scaleTilePos as AFRAME.Entity).addEventListener('mousedown', () => {
    this.scatter.changeScales(
        this.scatter.getGridBound('x') + xScaleDelta,
        this.scatter.getGridBound('y') + yScaleDelta,
        this.scatter.getGridBound('z') + zScaleDelta);
    });    
    scaleTileNeg.setAttribute('position', negativePos);
    (scaleTileNeg as AFRAME.Entity).addEventListener('mousedown', () => {
    this.scatter.changeScales(
        this.scatter.getGridBound('x') - xScaleDelta,
        this.scatter.getGridBound('y') - yScaleDelta,
        this.scatter.getGridBound('z') - zScaleDelta);
    });   
    labelTile.setAttribute('position', labelPos);
    labelTile.setAttribute('text', `value: ${labelName}; align: center; color: black; shader: msdf; font: https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/rubikmonoone/RubikMonoOne-Regular.json;`);
    labelTile.setAttribute('scale', '3 3 1');    
  }
}

