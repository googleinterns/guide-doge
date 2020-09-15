import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { PieChartD3 } from './pie-chart.d3';
import { CategoricalPoint } from '../datasets/metas/types';
import { PieChartDatum } from '../components/pie-chart/pie-chart.component';
import { RenderOptions } from './xy-chart.d3';

interface SubjectRenderOptions extends RenderOptions<CategoricalPoint, PieChartDatum> {
  data$: Subject<PieChartDatum[]>;
}

const mockData = [...Array(10).keys()].map(datumIndex => ({
  label: `Datum ${datumIndex}`,
  points: [...Array(10).keys()].map(pointIndex => ({
    x: `Category ${pointIndex}`,
    y: Math.random() * 10,
  })),
}));

describe('PieChartD3', () => {
  let containerElement: HTMLElement;
  let svgElement: HTMLElement;
  let renderOptions: SubjectRenderOptions;
  let pieChartD3: PieChartD3;
  const transitionDelay = 1000;

  beforeEach(() => {
    svgElement = document.createElement('svg');
    containerElement = document.createElement('div');
    containerElement.appendChild(svgElement);
    renderOptions = {
      elementRef: new ElementRef<HTMLElement>(containerElement),
      width: 256,
      height: 256,
      data$: new Subject<PieChartDatum[]>(),
    };
    pieChartD3 = new PieChartD3(renderOptions);
  });

  afterEach(() => {
    pieChartD3.clear();
  });

  it('should instantiate.', () => {
    expect(pieChartD3).toBeInstanceOf(PieChartD3);
  });

  it('should update the data upon changes.', async () => {
    pieChartD3.render();
    renderOptions.data$.next([mockData[0]]);
    await new Promise(resolve => setTimeout(resolve, transitionDelay));
    const pathElements = Array.from(svgElement.querySelectorAll('path'));
    expect(pathElements.length).toBeGreaterThan(0);

    if (pathElements.length > 0) {
      const dAttribute = pathElements.map(el => el.getAttribute('d'));
      renderOptions.data$.next([mockData[1]]);

      await new Promise(resolve => setTimeout(resolve, transitionDelay));

      const newPathElements = Array.from(svgElement.querySelectorAll('path'));
      const newDAttribute = newPathElements.map(el => el.getAttribute('d'));
      expect(newDAttribute).not.toEqual(dAttribute);
    }
  });
});
