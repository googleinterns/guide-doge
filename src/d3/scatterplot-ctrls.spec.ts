import { Scatterplot } from './scatterplot.d3';
import { VRScatterPoint } from '../datasets/queries/vr.query';
import { MetaType } from '../datasets/metas/types';
import { Controls } from './scatterplot-ctrls';

describe('Checking scatterplot-ctrl functions', () => {
  let element: HTMLElement;
  let scatterplot: Scatterplot;
  let control: Controls;
  let grids: HTMLCollectionOf<Element>;
  const scatterPlotData1: VRScatterPoint[]  = [];
  scatterPlotData1.push({categories: {}, x: 20, y: 10, z: 5});

  beforeEach( () =>  {
    element = document.createElement('a-scene');
    scatterplot = new Scatterplot('a-sphere');
    scatterplot.init(element, scatterPlotData1, [], MetaType.SCATTER_PLOT);
    scatterplot.container!.appendChild(document.createElement('a-camera'));
    control = scatterplot.control;
    grids = element.getElementsByClassName('grids');
  });
  it('for placing navigation tiles', () => {
    control.createScaleCtrls('x');
    const scalesPresent = (element.getElementsByClassName('toggle') != null);
    expect(scalesPresent).toEqual(true);
  });
  it('for placing navigation', () => {
    control.createNavTile('x');
    const navPresent = (document.getElementsByClassName('navigation') != null);
    expect(navPresent).toEqual(true);
  });
  it('for placing speed', () => {
    control.createSpeedCtrls('plus');
    const speedPresent = (document.getElementsByClassName('speed') != null);
    expect(speedPresent).toEqual(true);
  });
  it('for checking for ctrl panel bckgrd', () => {
    control.createBackground();
    const bgPresent = (document.getElementsByClassName('background') != null);
    expect(bgPresent).toEqual(true);
  });
  it('for checking for ctrl panel toggle', () => {
    control.createToggleBar();
    const tbPresent = (document.getElementsByClassName('toggleBar') != null);
    expect(tbPresent).toEqual(true);
  });
  it('for checking for ctrl panel toggle', () => {
    control.createCtrlPanel();
    const tbPresent = (document.getElementsByClassName('toggle') != null);
    expect(tbPresent).toEqual(true);
  });
});
