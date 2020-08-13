import * as AFRAME from 'aframe';
import { Scatterplot } from './scatterplot.d3';
import { rollup } from 'd3';
const ROBOTO = 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/roboto/Roboto-Medium.json';

const tilePos: Record<string, string> = {
  ['xPos']: '-1.15 1 -4',
  ['xNeg']: '-2.15 1 -4',
  ['yPos']: '-1.65 1.5 -4',
  ['yNeg']: '-1.65 .5 -4',
  ['zPos']: '1.25 1.5 -4',
  ['zNeg']: '1.25 .5 -4',
};
const speedPos: Record<string, string> = {
    ['minus']: '-.35 .5 -2',
    ['plus']: '.35 .5 -2',
    ['label']: '0 .45 -2',
};
const xScalePos: Record<string, string> = {
    ['decrement']: '-.35 .25 -2',
    ['increment']: '.35 .25 -2',
    ['label']: '0 .2 -2',
};

const yScalePos: Record<string, string> = {
    ['decrement']: '-.35 0 -2',
    ['increment']: '.35 0 -2',
    ['label']: '0 -.05 -2',
};

const zScalePos: Record<string, string> = {
    ['decrement']: '-.35 -0.25 -2',
    ['increment']: '.35 -0.25 -2',
    ['label']: '0 -0.3 -2',
};

const allScalePos: Record<string, string> = {
    ['decrement']: '-.35 -.5 -2',
    ['increment']: '.35 -.5 -2',
    ['label']: '0 -.55 -2',
};

const toggleBarPos: Record<string, string> = {
  ['bar']: '0 -.725 -2',
  ['label']: '0 -.775 -1.98',
};

const bckgrdPos: Record<string, string> = {
  ['place']: '0 -.1 -2.01',
};

const dimensions = ['x', 'y', 'z'];

export class Controls{
  showCtrls: boolean;
  loadingFlag: boolean;
  scatter: Scatterplot;

  constructor(scatter: Scatterplot){
    this.loadingFlag = true;
    this.showCtrls = true;
    this.scatter = scatter;
    this.addQZCtrls();
    this.createNavTiles(this.scatter.DAYDREAM_NAV_SPEED);
    this.createCtrlPanel(); 
    this.addDemoKeys();
  }

  addDemoKeys(){
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Minus'){
        if (this.scatter.DAYDREAM_NAV_SPEED > .1){
          this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() - .1);
          console.log(this.scatter.getDaydreamNavSpeed());
        } 
      }
      if (event.code === 'Equal'){
        this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() + .1);
        console.log(this.scatter.getDaydreamNavSpeed());
      }
      // increase x scale
      if (event.code === 'Numpad9' || event.code === 'Digit9'){
        this.scatter.changeScales(
          this.scatter.getGridBound('x') + 10,
          this.scatter.getGridBound('y'),
          this.scatter.getGridBound('z'));
      }
      // decrease x scale
      if (event.code === 'Numpad7' || event.code === 'Digit7'){
        this.scatter.changeScales(
          this.scatter.getGridBound('x') - 10,
          this.scatter.getGridBound('y'),
          this.scatter.getGridBound('z'));
      }
       // increase y scale
       if (event.code === 'Numpad6' || event.code === 'Digit6'){
        this.scatter.changeScales(
          this.scatter.getGridBound('x'),
          this.scatter.getGridBound('y') + 10,
          this.scatter.getGridBound('z'));
      }
      // decrease y scale
      if (event.code === 'Numpad4' || event.code === 'Digit4'){
        this.scatter.changeScales(
          this.scatter.getGridBound('x'),
          this.scatter.getGridBound('y') - 10,
          this.scatter.getGridBound('z'));
      }
      // increase z scale
      if (event.code === 'Numpad3' || event.code === 'Digit3'){
      this.scatter.changeScales(
        this.scatter.getGridBound('x'),
        this.scatter.getGridBound('y'),
        this.scatter.getGridBound('z') + 10);
      }
      // decrease z scale
      if (event.code === 'Numpad1' || event.code === 'Digit1'){
        this.scatter.changeScales(
          this.scatter.getGridBound('x'),
          this.scatter.getGridBound('y'),
          this.scatter.getGridBound('z') - 10);
      }
      if (event.code === 'Numpad8' || event.code === 'Digit8'){
        this.scatter.changeScales(
          this.scatter.getGridBound('x') + 10,
          this.scatter.getGridBound('x') + 10,
          this.scatter.getGridBound('x') + 10);
      }
      if (event.code === 'Numpad5' || event.code === 'Digit5'){
        this.scatter.changeScales(
          this.scatter.getGridBound('x') - 10,
          this.scatter.getGridBound('x') - 10,
          this.scatter.getGridBound('x') - 10);
      }
      if(event.code === 'KeyT'){
        const nonTxtControlItems = document.getElementsByClassName('nonTextToggle');
        for (let item of (nonTxtControlItems as unknown as Array<Element>)){
          if (!this.showCtrls)
            (item as AFRAME.Entity).setAttribute('scale', '1 1 1');
          else
            (item as AFRAME.Entity).setAttribute('scale', '.01 .01 .01');
        }
        const controlItems = document.getElementsByClassName('toggle');
        for (let item of (controlItems as unknown as Array<Element>)){
          (item as AFRAME.Entity).setAttribute('visible', !this.showCtrls);
        }
        this.showCtrls = !this.showCtrls;
      }
    });
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
    (navTilePos as AFRAME.Entity).setAttribute('material', `color: black; opacity: .95; src: ${imagePos}`);
    (navTileNeg as AFRAME.Entity).setAttribute('material', `color: black; opacity: .95; src: ${imageNeg}`);
    var intervalPos; 
    var intervalNeg;
    // set event listeners with scatter.DAYDREAM... delta in order to have updated speeds
    (navTilePos as AFRAME.Entity).addEventListener('mousedown', () => {
        intervalPos = setInterval(() => {
          var xDelta = 0;
          var yDelta = 0;
          var zDelta = 0;
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
      (navTilePos as AFRAME.Entity).addEventListener('mouseup', () => { clearInterval(intervalPos);});
    (navTileNeg as AFRAME.Entity).addEventListener('mousedown', () => {
      intervalNeg = setInterval(() => {
        var xDelta = 0;
        var yDelta = 0;
        var zDelta = 0;
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
    (navTileNeg as AFRAME.Entity).addEventListener('mouseup', () => { clearInterval(intervalNeg);}); 
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
    this.invisibleToggleElem();
}

invisibleToggleElem(){
  const elems = document.getElementsByClassName('toggle');
  for (let elem of (elems as unknown as Array<Element>)){
    (elem as AFRAME.Entity).setAttribute('visible', false);
  }
}

//create speedctrls and 'speed' label based on sign parameter
createSpeedCtrls(sign: string){
    const speedTile = document.createElement('a-entity') as AFRAME.Entity;
    speedTile.className = 'toggle nonTextToggle';
    document.querySelector('[camera]').appendChild(speedTile);
    if (sign === 'plus'){
      speedTile.setAttribute('geometry', 'primitive: plane; height: .25; width: .25');
      speedTile.setAttribute('position', speedPos.plus);
      speedTile.setAttribute('material', 'color: black; opacity: .95; src: ../assets/plus.png;');
      (speedTile as AFRAME.Entity).addEventListener('mousedown', () => {
        this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() + .1);
      });
      } else if (sign === 'neg'){
          speedTile.setAttribute('geometry', 'primitive: plane; height: .25; width: .25');
          speedTile.setAttribute('position', speedPos.minus);
          speedTile.setAttribute('material', 'color: black; opacity: .95; src: ../assets/negative.png');
          (speedTile as AFRAME.Entity).addEventListener('mousedown', () => {
            if (this.scatter.DAYDREAM_NAV_SPEED > .1){
              this.scatter.setDaydreamNavSpeed(this.scatter.getDaydreamNavSpeed() - .1);
            } 
          });
      } 
      else if (sign === 'label'){
        const speedLabelTile = document.createElement('a-entity') as AFRAME.Entity;
        document.querySelector('[camera]').appendChild(speedLabelTile);
        speedLabelTile.className = 'toggle';
        speedLabelTile.setAttribute('position', speedPos.label);
        speedLabelTile.setAttribute('text', `value: Speed; align: center; color: black; shader: msdf; font: ${ROBOTO};`);
        speedLabelTile.setAttribute('scale', '2 2 1');    
      }
  }

  createScaleCtrls(dim: string){
    const scaleTilePos = document.createElement('a-entity') as AFRAME.Entity;
    scaleTilePos.className = 'toggle nonTextToggle';
    document.querySelector('[camera]').appendChild(scaleTilePos);
    const scaleTileNeg = document.createElement('a-entity') as AFRAME.Entity;
    scaleTileNeg.className = 'toggle nonTextToggle';
    document.querySelector('[camera]').appendChild(scaleTileNeg);
    const labelTile = document.createElement('a-entity') as AFRAME.Entity;
    labelTile.className = 'toggle';
    document.querySelector('[camera]').appendChild(labelTile);

    scaleTilePos.setAttribute('geometry', 'primitive: plane; height: .25; width: .25');  
    scaleTilePos.setAttribute('material', 'color: black; opacity: .95; src: ../assets/plus.png;');
    scaleTileNeg.setAttribute('geometry', 'primitive: plane; height: .25; width: .25');  
    scaleTileNeg.setAttribute('material', 'color: black; opacity: .95; src: ../assets/negative.png;');
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

  private createToggleBar(){
    const toggleBar = document.createElement('a-entity');
    document.querySelector('[camera]').appendChild(toggleBar);
    toggleBar.setAttribute('geometry', 'primitive: plane; height: .15; width:.75');
    toggleBar.setAttribute('material', 'color: #4385f4; opacity: 1');
    toggleBar.setAttribute('position', toggleBarPos.bar);
    const toggleText = document.createElement('a-entity');
    document.querySelector('[camera]').appendChild(toggleText);
    toggleText.setAttribute('position', toggleBarPos.label);
    toggleText.setAttribute('text', `value: Control Panel; align: center; color: black; shader: msdf; font: ${ROBOTO};`);
    toggleText.setAttribute('scale', '2 2 1');
    toggleBar.addEventListener('mousedown', () => {
      const nonTxtControlItems = document.getElementsByClassName('nonTextToggle');
        for (let item of (nonTxtControlItems as unknown as Array<Element>)){
          if (!this.showCtrls)
            (item as AFRAME.Entity).setAttribute('scale', '1 1 1');
          else
            (item as AFRAME.Entity).setAttribute('scale', '.01 .01 .01');
        }
        const controlItems = document.getElementsByClassName('toggle');
        for (let item of (controlItems as unknown as Array<Element>)){
          (item as AFRAME.Entity).setAttribute('visible', !this.showCtrls);
        }
      this.showCtrls = !this.showCtrls;
    });
  }

  private createBackground(){
    const bckgrd = document.createElement('a-entity');
    document.querySelector('[camera]').appendChild(bckgrd);
    bckgrd.className = 'toggle nonTextToggle';
    bckgrd.setAttribute('geometry', 'primitive: plane; height: 1.5; width: 1');
    bckgrd.setAttribute('material', 'color: #4385f4; opacity: .75;');
    bckgrd.setAttribute('position', bckgrdPos.place);
  }
}

