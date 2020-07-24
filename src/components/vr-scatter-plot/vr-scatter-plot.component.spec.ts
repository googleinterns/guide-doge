import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VRScatterPlotComponent } from './vr-scatter-plot.component';
import { Scatterplot } from '../../d3/scatterplot.d3';
import { DataService } from '../../services/data/data.service';
import { PreferenceService } from '../../services/preference/preference.service';

describe('VRScatterplotComponent', () => {
  let fixture: ComponentFixture<VRScatterPlotComponent>;
  let component: VRScatterPlotComponent;
  let scatterPlotD3: Scatterplot;
  let preferenceService: PreferenceService;
  let dataService: DataService;

  beforeEach(() => {
    preferenceService = new PreferenceService();
    dataService = new DataService(preferenceService);

    TestBed.configureTestingModule({
      declarations: [
        VRScatterPlotComponent,
      ],
      providers: [
        { provide: PreferenceService, useValue: preferenceService },
        { provide: DataService, useValue: dataService },
      ]
    });
    fixture = TestBed.createComponent(VRScatterPlotComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line:no-string-literal
    scatterPlotD3 = component['vrScatterPlot'];
  });
  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(VRScatterPlotComponent);
  });
  it('should render d3 on init.', () => {
    spyOn(scatterPlotD3, 'init');
    component.ngOnInit();
    expect(scatterPlotD3.init).toHaveBeenCalled();
  });
});
