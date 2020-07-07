import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';
import { DataModule } from '../../services/data/data.module';
import { SimpleChange } from '@angular/core';
import { mockDatum } from '../../utils/mocks.spec';

describe('LineChartComponent', () => {
  let fixture: ComponentFixture<LineChartComponent>;
  let component: LineChartComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataModule,
      ],
      declarations: [
        LineChartComponent,
      ],
    });
    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(LineChartComponent);
  });

  it('should have truthy i18n values.', () => {
    component.activePoint = mockDatum;
    expect(component.ACTIVE_DATUM).toBeTruthy();
  });

  // it('should synchronize data with data$.', () => {
  //   const data = [mockDatum];

  //   component.data = data;

  //   expect(component.data$.value).toBe(data);
  //   expect(component.data).toBe(data);
  // });

  it('should synchronize activeActivePoint with activePoint$.', () => {
    const activePoint = mockDatum;

    component.activePoint = activePoint;

    expect(component.activePoint$.value).toBe(activePoint);
    expect(component.activePoint).toBe(activePoint);
  });

  it('should render d3 on init.', () => {
    spyOn(component['lineChartD3'], 'render');
    component.ngOnInit();
    expect(component['lineChartD3'].render).toHaveBeenCalled();
  });

  it('should clear d3 on destroy.', () => {
    spyOn(component['lineChartD3'], 'clear');
    component.ngOnDestroy();
    expect(component['lineChartD3'].clear).toHaveBeenCalled();
  });

  // it('should recreate data as the measure changes.', () => {
  //   component.measureName = 'activeUsers';
  //   component.ngOnChanges({ measureName: new SimpleChange(null, component.measureName, true) });
  //   const activeUsersData = component.data;

  //   component.measureName = 'revenue';
  //   component.ngOnChanges({ measureName: new SimpleChange(null, component.measureName, false) });
  //   const revenueData = component.data;

  //   expect(activeUsersData).not.toEqual(revenueData);
  // });
});
