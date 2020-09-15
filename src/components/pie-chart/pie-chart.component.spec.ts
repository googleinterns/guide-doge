import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieChartComponent } from './pie-chart.component';
import { MatCardModule } from '@angular/material/card';
import { PieChartD3 } from '../../d3/pie-chart.d3';

describe('PieChartComponent', () => {
  let fixture: ComponentFixture<PieChartComponent>;
  let component: PieChartComponent;
  let pieChartD3: PieChartD3;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [
        PieChartComponent,
      ],
    });
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line:no-string-literal
    pieChartD3 = component['pieChartD3'];
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(PieChartComponent);
  });

  it('should have truthy i18n values.', () => {
    expect(component.VISUALIZATION).toBeTruthy();
  });

  it('should render d3 on init.', () => {
    spyOn(pieChartD3, 'render');
    component.ngOnInit();
    expect(pieChartD3.render).toHaveBeenCalled();
  });

  it('should clear d3 on destroy.', () => {
    spyOn(pieChartD3, 'clear');
    component.ngOnDestroy();
    expect(pieChartD3.clear).toHaveBeenCalled();
  });
});
