import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { LineChartMeta, TabbedChartsMeta } from '../../datasets/types';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let component: CardComponent;
  const testChartMeta1: LineChartMeta = {
    type: 'line',
    title: 'testChart1',
    query: () => [],
  };
  const testChartMeta2: LineChartMeta = {
    type: 'line',
    title: 'testChart2',
    query: () => [],
  };
  const testTabbedChartsMeta: TabbedChartsMeta = {
    type: 'tabbed',
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
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(CardComponent);
  });

  it('should set current chart title when init.', () => {
    component.meta = testChartMeta1;
    component.ngOnInit();
    expect(component.currentChart.title).toBe(testChartMeta1.title);

    component.meta = testTabbedChartsMeta;
    component.ngOnInit();
    expect(component.currentChart.title).toBe(testChartMeta1.title);
  });

  it('should return whether input meta is tabbed charts or not.', () => {
    component.meta = testChartMeta1;
    expect(component.tabbed).toBeFalse();
    component.meta = testTabbedChartsMeta;
    expect(component.tabbed).toBeTrue();
  });

  it('should return input meta titles.', () => {
    component.meta = testChartMeta1;
    expect(component.titles).toEqual([testChartMeta1.title]);
    component.meta = testTabbedChartsMeta;
    expect(component.titles).toEqual([testChartMeta1.title, testChartMeta2.title]);
  });

  it('should set current chart.', () => {
    component.meta = testChartMeta1;
    expect(component.currentChart.title).toBe(testChartMeta1.title);
    component.setCurrentTabTitle('REDUNDANT SET TITLE');
    expect(component.currentChart.title).toBe(testChartMeta1.title);

    component.meta = testTabbedChartsMeta;
    expect(component.currentChart.title).toBe(testChartMeta1.title);
    component.setCurrentTabTitle(testChartMeta2.title);
    expect(component.currentChart.title).toBe(testChartMeta2.title);
  });
});
