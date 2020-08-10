import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { TabbedChartsMeta } from '../../datasets/metas/tabbed-charts.meta';
import { LineChartMeta } from '../../datasets/metas/line-chart.meta';
import { MetaType } from '../../datasets/metas/types';

describe('CardComponent', () => {
  let tabbedFixture: ComponentFixture<CardComponent<TabbedChartsMeta>>;
  let tabbedComponent: CardComponent<TabbedChartsMeta>;
  let lineFixture: ComponentFixture<CardComponent<LineChartMeta>>;
  let lineComponent: CardComponent<LineChartMeta>;

  const testChartMeta1: LineChartMeta = {
    type: MetaType.LINE_CHART,
    title: 'testChart1',
    queryData: () => [],
  };
  const testChartMeta2: LineChartMeta = {
    type: MetaType.LINE_CHART,
    title: 'testChart2',
    queryData: () => [],
  };
  const testTabbedChartsMeta: TabbedChartsMeta = {
    type: MetaType.TABBED_CHARTS,
    title: 'testTabbedCharts',
    metas: [testChartMeta1, testChartMeta2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
      ],
      imports: [
        MatCardModule
      ]
    });
    tabbedFixture = TestBed.createComponent<CardComponent<TabbedChartsMeta>>(CardComponent);
    tabbedComponent = tabbedFixture.componentInstance;
    lineFixture = TestBed.createComponent<CardComponent<LineChartMeta>>(CardComponent);
    lineComponent = lineFixture.componentInstance;
  });

  it('should instantiate.', () => {
    expect(tabbedComponent).toBeInstanceOf(CardComponent);
    expect(lineComponent).toBeInstanceOf(CardComponent);
  });

  it('should set current chart title when init.', () => {
    lineComponent.meta = testChartMeta1;
    lineComponent.ngOnInit();
    expect(lineComponent.currentChart.title).toBe(testChartMeta1.title);

    tabbedComponent.meta = testTabbedChartsMeta;
    tabbedComponent.ngOnInit();
    expect(tabbedComponent.currentChart.title).toBe(testChartMeta1.title);
  });

  it('should return whether input meta is tabbed charts or not.', () => {
    lineComponent.meta = testChartMeta1;
    expect(lineComponent.isTabbedChartsMetaCard()).toBeFalse();
    tabbedComponent.meta = testTabbedChartsMeta;
    expect(tabbedComponent.isTabbedChartsMetaCard()).toBeTrue();
  });

  it('should return input meta titles.', () => {
    lineComponent.meta = testChartMeta1;
    expect(lineComponent.titles).toEqual([testChartMeta1.title]);
    tabbedComponent.meta = testTabbedChartsMeta;
    expect(tabbedComponent.titles).toEqual([testChartMeta1.title, testChartMeta2.title]);
  });

  it('should set current chart.', () => {
    lineComponent.meta = testChartMeta1;
    expect(lineComponent.currentChart.title).toBe(testChartMeta1.title);
    lineComponent.setCurrentTabTitle('REDUNDANT SET TITLE');
    expect(lineComponent.currentChart.title).toBe(testChartMeta1.title);

    tabbedComponent.meta = testTabbedChartsMeta;
    expect(tabbedComponent.currentChart.title).toBe(testChartMeta1.title);
    tabbedComponent.setCurrentTabTitle(testChartMeta2.title);
    expect(tabbedComponent.currentChart.title).toBe(testChartMeta2.title);
  });
});
