import { ElementRef } from '@angular/core';
import { XYChartD3 } from './xy-chart.d3';
import { Subject } from 'rxjs';
import { TimeSeriesPoint } from '../datasets/queries/time-series.query';
import { LineChartDatum } from '../components/line-chart/line-chart.component';
import { mockDatum } from '../utils/mocks.spec';

describe('XYChartD3', () => {
  // since XYChartD3 is an abstract class, make a concrete child class
  class TestXYChartD3 extends XYChartD3 {
    // the flags below will be used to check if the methods have been called at the right time
    activePointFlag = 0;
    dataFlag = 0;

    protected renderData() {
      this.dataFlag = 1;
    }

    protected updateData(data: TimeSeriesPoint[]) {
      this.dataFlag = 2;
    }

    protected renderActivePoint() {
      this.activePointFlag = 1;
    }

    protected updateActivePoint(activePoint: TimeSeriesPoint | null) {
      this.activePointFlag = 2;
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
    datum$: new Subject<LineChartDatum>(),
    activePoint$: new Subject<TimeSeriesPoint | null>(),
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
    renderOptions.datum$.next(mockDatum);
    expect(xyChartD3.dataFlag).toBe(2);
  });

  it('should render the active datum and update upon changes.', () => {
    expect(xyChartD3.activePointFlag).toBe(0);
    xyChartD3.render();
    expect(xyChartD3.activePointFlag).toBe(1);
    renderOptions.activePoint$.next(null);
    expect(xyChartD3.activePointFlag).toBe(2);
  });

  it('should render two g elements for the axis.', () => {
    xyChartD3.render();
    const gElements = svgElement.querySelectorAll('g');
    expect(gElements.length).toBe(2);
  });
});
