import { RenderOptions } from './xy-chart.d3';
import { TimeSeriesChartD3 } from './time-series-chart.d3';
import { Subject } from 'rxjs';
import { TimeSeriesPoint } from '../datasets/metas/types';
import { TimeSeriesDatum } from '../datasets/queries/time-series.query';
import { mockData } from '../utils/mocks.spec';
import { ElementRef } from '@angular/core';
import { LineChartDatum } from '../components/line-chart/line-chart.component';

type TestLegendItemStyle = {};

type TestDatum = TimeSeriesDatum<TestLegendItemStyle>;

interface SubjectRenderOptions extends RenderOptions<TimeSeriesPoint, TestDatum> {
  data$: Subject<TestDatum[]>;
  activePoint$: Subject<TimeSeriesPoint | null>;
}

describe('TimeSeriesChartD3', () => {
  // since TimeSeriesChartD3 is an abstract class, make a concrete child class
  class TestTimeSeriesChartD3 extends TimeSeriesChartD3<TestLegendItemStyle> {
    // the flags below will be used to check if the methods have been called at the right time
    dataFlag = 0;
    activePointFlag = 0;

    protected renderData() {
      super.renderData();
      this.dataFlag = 1;
    }

    protected updateData(data: TestDatum[]) {
      this.dataFlag = 2;
    }

    protected renderActivePoint() {
      this.activePointFlag = 1;
    }

    protected updateActivePoint(activePoint: TimeSeriesPoint | null) {
      this.activePointFlag = 2;
    }

    protected appendLegendItemIcon(itemG: d3.Selection<SVGGElement, unknown, null, undefined>, datum: TestDatum) {
    }
  }

  let containerElement: HTMLElement;
  let svgElement: HTMLElement;
  let renderOptions: SubjectRenderOptions;
  let timeSeriesChartD3: TestTimeSeriesChartD3;

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
    timeSeriesChartD3 = new TestTimeSeriesChartD3(renderOptions);
  });

  afterEach(() => {
    timeSeriesChartD3.clear();
  });

  it('should instantiate.', () => {
    expect(timeSeriesChartD3).toBeInstanceOf(TimeSeriesChartD3);
  });

  it('should render the x and y axis.', () => {
    timeSeriesChartD3.render();
    const xAxisElement = svgElement.querySelector('.xy_chart-x_axis');
    const yAxisElement = svgElement.querySelector('.xy_chart-y_axis');
    expect(xAxisElement).not.toBe(null);
    expect(yAxisElement).not.toBe(null);
  });
});
