import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartComponent } from './bar-chart.component';
import { MatCardModule } from '@angular/material/card';
import { BarChartD3 } from '../../d3/bar-chart.d3';

fdescribe('BarChartComponent', () => {
  let fixture: ComponentFixture<BarChartComponent>;
  let component: BarChartComponent;
  let barChartD3: BarChartD3;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [
        BarChartComponent,
      ],
    });
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line:no-string-literal
    barChartD3 = component['barChartD3'];
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(BarChartComponent);
  });

  it('should have truthy i18n values.', () => {
    expect(component.VISUALIZATION).toBeTruthy();
  });

  it('should render d3 on init.', () => {
    spyOn(barChartD3, 'render');
    component.ngOnInit();
    expect(barChartD3.render).toHaveBeenCalled();
  });

  it('should clear d3 on destroy.', () => {
    spyOn(barChartD3, 'clear');
    component.ngOnDestroy();
    expect(barChartD3.clear).toHaveBeenCalled();
  });
});
