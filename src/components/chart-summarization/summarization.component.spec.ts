import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSummarizationComponent } from './summarization.component';

describe('ChartSummarizationComponent', () => {
  let component: ChartSummarizationComponent;
  let fixture: ComponentFixture<ChartSummarizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSummarizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSummarizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
