import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { BarChartD3 } from './bar-chart.d3';
import { CategoricalPoint } from '../datasets/metas/types';
import { BarChartDatum } from '../components/bar-chart/bar-chart.component';
import { RenderOptions } from './xy-chart.d3';

interface SubjectRenderOptions extends RenderOptions<CategoricalPoint, BarChartDatum> {
  data$: Subject<BarChartDatum[]>;
}

const mockData = [...Array(10).keys()].map(datumIndex => ({
  label: `Datum ${datumIndex}`,
  points: [...Array(10).keys()].map(pointIndex => ({
    x: `Category ${pointIndex}`,
    y: Math.random() * 10,
  })),
}));

fdescribe('BarChartD3', () => {
  let containerElement: HTMLElement;
  let svgElement: HTMLElement;
  let renderOptions: SubjectRenderOptions;
  let barChartD3: BarChartD3;
  const transitionDelay = 1000;

  beforeEach(() => {
    svgElement = document.createElement('svg');
    containerElement = document.createElement('div');
    containerElement.appendChild(svgElement);
    renderOptions = {
      elementRef: new ElementRef<HTMLElement>(containerElement),
      width: 256,
      height: 256,
      data$: new Subject<BarChartDatum[]>(),
    };
    barChartD3 = new BarChartD3(renderOptions);
  });

  afterEach(() => {
    barChartD3.clear();
  });

  it('should instantiate.', () => {
    expect(barChartD3).toBeInstanceOf(BarChartD3);
  });

  it('should update the data upon changes.', async () => {
    barChartD3.render();
    renderOptions.data$.next([mockData[0]]);
    await new Promise(resolve => setTimeout(resolve, transitionDelay));
    const barElements = Array.from(svgElement.querySelectorAll('.bar'));
    expect(barElements.length).toBeGreaterThan(0);

    if (barElements.length > 0) {
      const widthAttributes = barElements.map(el => el.getAttribute('width'));
      renderOptions.data$.next([mockData[1]]);

      await new Promise(resolve => setTimeout(resolve, transitionDelay));

      const newBarElements = Array.from(svgElement.querySelectorAll('.bar'));
      const newWidthAttributes = newBarElements.map(el => el.getAttribute('width'));

      expect(newWidthAttributes).not.toEqual(widthAttributes);
    }
  });

  it('should render the x and y axis.', () => {
    barChartD3.render();
    const xAxisElement = svgElement.querySelector('.xy_chart-x_axis');
    const yAxisElement = svgElement.querySelector('.xy_chart-y_axis');
    expect(xAxisElement).not.toBe(null);
    expect(yAxisElement).not.toBe(null);
  });
});
