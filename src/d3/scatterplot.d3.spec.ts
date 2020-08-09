import { Scatterplot } from './scatterplot.d3';
import { TimeSeriesPoint } from '../datasets/queries/time-series.query';
import { VRScatterPoint } from '../datasets/queries/vr.query';
import { MetaType } from '../datasets/metas/types';
import * as AFRAME from 'aframe';

import { Vector3 } from 'three';
import { AFrame } from 'aframe';

describe('VR Scatter Plot', () => {
  const shape = 'a-sphere';
  let element: HTMLElement;
  let scatterplot: Scatterplot;
  const scatterPlotData1: VRScatterPoint[]  = [];
  scatterPlotData1.push({categories: {}, x: 20, y: 10, z: 5});
  const expPosArray1 = [ {x: 50, y: 50, z: 50}];
  // need to ignore line for `` formatting to not cause error
  // tslint:disable-next-line
  const scatterPlotTxt1: string[] = [`POSITION:\n\nx: ${scatterPlotData1[0].x}\n\ny: ${scatterPlotData1[0].y}\n\nz: ${scatterPlotData1[0].z}`];

  const scatterPlotData8: VRScatterPoint[] = [];
  for (let i = 0; i < 8; i++){
    scatterPlotData8.push({categories: {}, x: i * 5, y: i * 10, z: i * 20});
  }
  const expPosArray8 = [
    {x: 0, y: 0, z: 0},
    {x: 7.14, y: 7.14, z: 7.14},
    {x: 14.29, y: 14.29, z: 14.29},
    {x: 21.43, y: 21.43, z: 21.43},
    {x: 28.57, y: 28.57, z: 28.57},
    {x: 35.71, y: 35.71, z: 35.71},
    {x: 42.86, y: 42.86, z: 42.86},
    {x: 50, y: 50, z: 50}];
  const expPosDataArray8 = [
    {x: 0, y: 0, z: 0},
    {x: 5, y: 10, z: 20},
    {x: 10, y: 20, z: 40},
    {x: 15, y: 30, z: 60},
    {x: 20, y: 40, z: 80},
    {x: 25, y: 50, z: 100},
    {x: 30, y: 60, z: 120},
    {x: 35, y: 70, z: 140}];
  const scatterPlotTxt8: string[] = [];
  for (let i = 0; i < 8; i++){
    scatterPlotTxt8.push(
    `POSITION:\n\nx: ${expPosDataArray8[i].x}\n\ny: ${expPosDataArray8[i].y}\n\nz: ${expPosDataArray8[i].z}`);
  }

  beforeEach( () =>  {
    element = document.createElement('a-scene');
    scatterplot = new Scatterplot(shape);
  });

  it('places no points bc 1:1 correspondence with empty element array', () => {
    scatterplot.init(element, [], MetaType.SCATTER_PLOT);
    const expectedPosArray = [];
    const result = getPosition(element, shape);
    expect(result).toEqual(expectedPosArray);
  });

  it('places points for each element in a one element array', () => {
    scatterplot.init(element, scatterPlotData1, MetaType.SCATTER_PLOT);
    const result = getPosition(element, shape);
    expect(result).toEqual(expPosArray1);
  });

  it('places points for each element in a eight element array', () => {
    scatterplot.init(element, scatterPlotData8, MetaType.SCATTER_PLOT);
    const result = getPosition(element, shape);
    expect(result).toEqual(expPosArray8);
  });

  it('checks for content of hovercards of 0 element array', () => {
    scatterplot.init(element, [], MetaType.SCATTER_PLOT);
    const result = getPositionData(element);
    expect(result).toEqual([]);
  });

  it('checks for content of hovercards of 1 element array', () => {
    scatterplot.init(element, scatterPlotData1, MetaType.SCATTER_PLOT);
    const result = getPositionData(element);
    expect(result).toEqual(scatterPlotTxt1);
  });

  it('checks for content of hovercards of 8 element array', () => {
    scatterplot.init(element, scatterPlotData8, MetaType.SCATTER_PLOT);
    const result = getPositionData(element);
    expect(result).toEqual(scatterPlotTxt8);
  });
});

describe('Checking for presence of', () => {
  let element: HTMLElement;
  let scatterplot: Scatterplot;
  let grids: HTMLCollectionOf<Element>;

  beforeEach( () =>  {
    element = document.createElement('a-scene');
    scatterplot = new Scatterplot('a-sphere');
    scatterplot.init(element, [], MetaType.SCATTER_PLOT);
    grids = element.getElementsByClassName('grids');
  });
  it('aframe sky', () => {
    scatterplot.init(element, [], MetaType.SCATTER_PLOT);
    const sky = document.getElementsByTagName('a-sky');
    let skyPresent = false;
    if (sky !== null){
      skyPresent = true;
    }
    expect(skyPresent).toEqual(true);
  });

  it('GridHelper xGrid', () => {
    const xGridPresent = Array.from(grids).some((grid) => grid.id === 'xGrid');
    expect(xGridPresent).toEqual(true);
  });

  it('GridHelper yGrid', () => {
    const yGridPresent = Array.from(grids).some((grid) => grid.id === 'yGrid');
    expect(yGridPresent).toEqual(true);
  });

  it('GridHelper zGrid', () => {
    const zGridPresent = Array.from(grids).some((grid) => grid.id === 'zGrid');
    expect(zGridPresent).toEqual(true);
  });
});

// returns array of actual position vectors
function getPosition(element: HTMLElement, shape: string): Array<{x: number, y: number, z: number}>{
  const childrenArray = element.querySelectorAll(shape);
  const positionArray: Array<{x: number, y: number, z: number}> = [];
  for (const child of (childrenArray as any)){
    positionArray.push((child as any).components.position.attrValue);
  }
  return positionArray;
}

function getPositionData(element: HTMLElement): string[]{
  const childrenArray = element.getElementsByTagName('a-entity').namedItem('dataTxt')!.querySelectorAll('a-entity');
  const positionDataArray: string[] = [];
  for (const child of (childrenArray as any)){
    positionDataArray.push((child as any).components.text.attrValue.value);
  }
  return positionDataArray;
}

