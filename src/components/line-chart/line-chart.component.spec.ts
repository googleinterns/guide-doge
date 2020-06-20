import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';
import { DataModule } from '../../services/data/data.module';
import { SimpleChange } from '@angular/core';

describe('LineChartComponent', () => {
  let fixture: ComponentFixture<LineChartComponent>;
  let component: LineChartComponent;
  const mockDatum = { date: new Date(), value: 0 };

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
    component.activeDatum = mockDatum;
    expect(component.ACTIVE_DATUM).toBeTruthy();
  });

  it('should synchronize data with data$.', () => {
    component.data = [];
    expect(component.data$.value).toBe(component.data);
    component.data = [mockDatum];
    expect(component.data$.value).toBe(component.data);
  });

  it('should synchronize activeActiveDatum with activeDatum$.', () => {
    component.activeDatum = null;
    expect(component.activeDatum$.value).toBe(component.activeDatum);
    component.activeDatum = mockDatum;
    expect(component.activeDatum$.value).toBe(component.activeDatum);
  });

  it('should render d3 on init.', () => {
    spyOn(component.lineChartD3, 'render');
    component.ngOnInit();
    expect(component.lineChartD3.render).toHaveBeenCalled();
  });

  it('should clear d3 on destroy.', () => {
    spyOn(component.lineChartD3, 'clear');
    component.ngOnDestroy();
    expect(component.lineChartD3.clear).toHaveBeenCalled();
  });

  it('should recreate data as the measure changes.', () => {
    component.measureName = 'activeUsers';
    component.ngOnChanges({ measureName: new SimpleChange(null, component.measureName, true) });
    const activeUsersData = component.data;

    component.measureName = 'revenue';
    component.ngOnChanges({ measureName: new SimpleChange(null, component.measureName, false) });
    const revenueData = component.data;

    expect(activeUsersData).not.toEqual(revenueData);
  });
});
