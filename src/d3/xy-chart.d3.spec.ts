import { ElementRef } from '@angular/core';
import { Datum, XYChartD3 } from './xy-chart.d3';
import { Subject } from 'rxjs';

describe('XYChartD3', () => {
  // since XYChartD3 is an abstract class, make a concrete child class
  class TestXYChartD3 extends XYChartD3 {
    // the flags below will be used to check if the methods have been called at the right time
    activeDatumFlag = 0;
    dataFlag = 0;

    protected renderData() {
      this.dataFlag = 1;
    }

    protected updateData(data: Datum[]) {
      this.dataFlag = 2;
    }

    protected renderActiveDatum() {
      this.activeDatumFlag = 1;
    }

    protected updateActiveDatum(activeDatum: Datum | null) {
      this.activeDatumFlag = 2;
    }
  }

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
    data$: new Subject<Datum[]>(),
    activeDatum$: new Subject<Datum | null>(),
  };
  let xyChartD3: TestXYChartD3;

  beforeEach(() => {
    xyChartD3 = new TestXYChartD3(renderOptions);
  });

  afterEach(() => {
    xyChartD3.clear();
  });

  it('should instantiate.', () => {
    expect(xyChartD3).toBeInstanceOf(XYChartD3);
  });

  it('should render the data and update upon changes.', () => {
    expect(xyChartD3.dataFlag).toBe(0);
    xyChartD3.render();
    expect(xyChartD3.dataFlag).toBe(1);
    renderOptions.data$.next([]);
    expect(xyChartD3.dataFlag).toBe(2);
  });

  it('should render the active datum and update upon changes.', () => {
    expect(xyChartD3.activeDatumFlag).toBe(0);
    xyChartD3.render();
    expect(xyChartD3.activeDatumFlag).toBe(1);
    renderOptions.activeDatum$.next(null);
    expect(xyChartD3.activeDatumFlag).toBe(2);
  });

  it('should render two g elements for the axis.', () => {
    xyChartD3.render();
    const gElements = svgElement.querySelectorAll('g');
    expect(gElements.length).toBe(2);
  });
});
