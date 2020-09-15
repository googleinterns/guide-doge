import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { LineChartD3 } from './line-chart.d3';
import { mockData, mockPoint } from '../utils/mocks.spec';
import { TimeSeriesPoint } from '../datasets/metas/types';
import { LineChartDatum } from '../components/line-chart/line-chart.component';
import { RenderOptions } from './xy-chart.d3';

interface SubjectRenderOptions extends RenderOptions<TimeSeriesPoint, LineChartDatum> {
  data$: Subject<LineChartDatum[]>;
  activePoint$: Subject<TimeSeriesPoint | null>;
}

describe('LineChartD3', () => {
  let containerElement: HTMLElement;
  let svgElement: HTMLElement;
  let renderOptions: SubjectRenderOptions;
  let lineChartD3: LineChartD3;
  const transitionDelay = 350;

  beforeEach(() => {
    svgElement = document.createElement('svg');
    containerElement = document.createElement('div');
    containerElement.appendChild(svgElement);
    renderOptions = {
      elementRef: new ElementRef<HTMLElement>(containerElement),
      width: 256,
      height: 256,
      data$: new Subject<LineChartDatum[]>(),
      activePoint$: new Subject<TimeSeriesPoint | null>(),
    };
    lineChartD3 = new LineChartD3(renderOptions);
  });

  afterEach(() => {
    lineChartD3.clear();
  });

  it('should instantiate.', () => {
    expect(lineChartD3).toBeInstanceOf(LineChartD3);
  });

  it('should update the data upon changes.', async () => {
    lineChartD3.render();
    renderOptions.data$.next([mockData[0]]);
    await new Promise(resolve => setTimeout(resolve, transitionDelay));
    const pathElement = svgElement.querySelector('.xy_chart-data path');
    expect(pathElement).not.toBe(null);

    if (pathElement !== null) {
      const dAttribute = pathElement.getAttribute('d');
      renderOptions.data$.next([mockData[1]]);
      await new Promise(resolve => setTimeout(resolve, transitionDelay));
      const newDAttribute = pathElement.getAttribute('d');
      expect(newDAttribute).not.toBe(dAttribute);
    }
  });

  it('should render the active point.', async () => {
    lineChartD3.render();
    const activePointElement = svgElement.querySelector('.line_chart-active_point');
    expect(activePointElement).toBeTruthy();
  });

  it('should update the active point upon changes.', async () => {
    lineChartD3.render();
    const activePointElement = svgElement.querySelector('.line_chart-active_point')!;
    const transformAttribute = activePointElement.getAttribute('transform');
    renderOptions.activePoint$.next(mockPoint);
    await new Promise(resolve => setTimeout(resolve, transitionDelay));
    const newTransformAttribute = activePointElement.getAttribute('transform');
    expect(newTransformAttribute).not.toBe(transformAttribute);
  });

  it('should only show the active point when non-null.', async () => {
    lineChartD3.render();
    const circleElement = svgElement.querySelector('.line_chart-active_point')!;

    renderOptions.activePoint$.next(mockPoint);
    await new Promise(resolve => setTimeout(resolve, transitionDelay));
    expect(circleElement.getAttribute('display')).toBe('inherit');

    renderOptions.activePoint$.next(null);
    await new Promise(resolve => setTimeout(resolve, transitionDelay));
    expect(circleElement.getAttribute('display')).toBe('none');
  });

  it('should render the x and y axis.', () => {
    lineChartD3.render();
    const xAxisElement = svgElement.querySelector('.xy_chart-x_axis');
    const yAxisElement = svgElement.querySelector('.xy_chart-y_axis');
    expect(xAxisElement).not.toBe(null);
    expect(yAxisElement).not.toBe(null);
  });
});
