import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';
import { mockDatum } from '../../utils/mocks.spec';
import { MatCardModule } from '@angular/material/card';
import { LineChartD3 } from '../../d3/line-chart.d3';

describe('LineChartComponent', () => {
  let fixture: ComponentFixture<LineChartComponent>;
  let component: LineChartComponent;
  let lineChartD3: LineChartD3;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [
        LineChartComponent,
      ],
    });
    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line:no-string-literal
    lineChartD3 = component['lineChartD3'];
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(LineChartComponent);
  });

  it('should have truthy i18n values.', () => {
    component.activeDatum = mockDatum;
    expect(component.ACTIVE_DATUM).toBeTruthy();
  });

  it('should synchronize activeActiveDatum with activeDatum$.', () => {
    const activeDatum = mockDatum;

    component.activeDatum = activeDatum;

    expect(component.activeDatum$.value).toBe(activeDatum);
    expect(component.activeDatum).toBe(activeDatum);
  });

  it('should render d3 on init.', () => {
    spyOn(lineChartD3, 'render');
    component.ngOnInit();
    expect(lineChartD3.render).toHaveBeenCalled();
  });

  it('should clear d3 on destroy.', () => {
    spyOn(lineChartD3, 'clear');
    component.ngOnDestroy();
    expect(lineChartD3.clear).toHaveBeenCalled();
  });
});
