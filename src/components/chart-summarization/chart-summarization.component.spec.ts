import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartSummarizationComponent } from './chart-summarization.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { SimpleChange } from '@angular/core';
import { ScreenReaderModule } from '../screen-reader/screen-reader.module';
import { MatCardModule } from '@angular/material/card';
import { createLineChartMeta } from '../../datasets/metas/line-chart.meta';
import { mockData } from '../../utils/mocks.spec';

describe('ChartSummarizationComponent', () => {
  let fixture: ComponentFixture<ChartSummarizationComponent>;
  let component: ChartSummarizationComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [
        LineChartComponent,
      ],
    });
    const hostFixture = TestBed.createComponent(LineChartComponent);
    const host = hostFixture.componentInstance;
    host.meta = createLineChartMeta(
      'Title',
      () => mockData,
    );
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      imports: [
        ScreenReaderModule,
      ],
      providers: [
        { provide: 'host', useValue: host },
      ],
      declarations: [
        ChartSummarizationComponent,
      ],
    });
    fixture = TestBed.createComponent(ChartSummarizationComponent);

    // init component inputs
    component = fixture.componentInstance;
    component.enabled = true;
    component.validityThreshold = 0.5;

    host.ngOnInit();
    host.ngOnChanges({
      meta: new SimpleChange(null, host.meta, true),
    });
    component.ngOnInit();
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(ChartSummarizationComponent);
  });

  it('should have summaries.', () => {
    expect(component.hasSummaries).toBeTrue();
  });

  it('should have summaries with validity greater than or equal to threshold.', () => {
    for (const summary of component.summaries) {
      expect(summary.validity).toBeGreaterThanOrEqual(component.validityThreshold);
    }
  });

  it('should sort summaries by validity in descending order.', () => {
    const summaries = component.summaries;
    for (let i = 1; i < summaries.length; i++) {
      const currentValidity = summaries[i].validity;
      const previousValidity = summaries[i - 1].validity;
      expect(currentValidity).toBeLessThanOrEqual(previousValidity);
    }
  });
});
