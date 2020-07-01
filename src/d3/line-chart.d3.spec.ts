import { ElementRef } from '@angular/core';
import { DNPoint } from './xy-chart.d3';
import { Subject } from 'rxjs';
import { LineChartD3 } from './line-chart.d3';
import { mockDatum } from '../utils/mocks.spec';
import { XYChartData } from '../datasets/types';

describe('LineChartD3', () => {
  const svgElement = document.createElement('svg');
  const containerElement = document.createElement('div');
  containerElement.appendChild(svgElement);
  const renderOptions = {
    elementRef: new ElementRef<HTMLElement>(containerElement),
    height: 256,
    width: 256,
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
    marginLeft: 8,
    data$: new Subject<XYChartData>(),
    activeDatum$: new Subject<DNPoint | null>(),
  };
  let lineChartD3: LineChartD3;
  const transitionDelay = 350;

  beforeEach(() => {
    lineChartD3 = new LineChartD3(renderOptions);
  });

  afterEach(() => {
    lineChartD3.clear();
  });

  it('should instantiate.', () => {
    expect(lineChartD3).toBeInstanceOf(LineChartD3);
  });

  it('should render a path element for the data.', () => {
    lineChartD3.render();
    const pathElement = svgElement.querySelector('path');
    expect(pathElement).toBeTruthy();
  });

  it('should update the path element upon the data change.', async () => {
    lineChartD3.render();
    const pathElement = svgElement.querySelector('path')!;
    const dAttribute = pathElement.getAttribute('d');
    renderOptions.data$.next({
      points: [mockDatum]
    });
    await new Promise(resolve => setTimeout(resolve, transitionDelay));
    const newDAttribute = pathElement.getAttribute('d');
    expect(newDAttribute).not.toBe(dAttribute);
  });

  it('should render a circle element for the active datum.', async () => {
    lineChartD3.render();
    const circleElement = svgElement.querySelector('circle');
    expect(circleElement).toBeTruthy();
  });

  it('should update the circle element upon the active datum changes.', async () => {
    lineChartD3.render();
    const circleElement = svgElement.querySelector('circle')!;
    const transformAttribute = circleElement.getAttribute('transform');
    renderOptions.activeDatum$.next(mockDatum);
    await new Promise(resolve => setTimeout(resolve, transitionDelay));
    const newTransformAttribute = circleElement.getAttribute('transform');
    expect(newTransformAttribute).not.toBe(transformAttribute);
  });

  it('should only show the circle element when the active datum is non-null.', async () => {
    lineChartD3.render();
    const circleElement = svgElement.querySelector('circle')!;

    renderOptions.activeDatum$.next(mockDatum);
    await new Promise(resolve => setTimeout(resolve, transitionDelay));
    expect(circleElement.getAttribute('display')).toBe('inherit');

    renderOptions.activeDatum$.next(null);
    await new Promise(resolve => setTimeout(resolve, transitionDelay));
    expect(circleElement.getAttribute('display')).toBe('none');
  });
});
