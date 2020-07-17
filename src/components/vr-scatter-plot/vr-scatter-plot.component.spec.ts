import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VRScatterPlotComponent } from './vr-scatter-plot.component';
import { mockData } from '../../utils/mocks.spec';
import { MatCardModule } from '@angular/material/card';
import { Scatterplot } from '../../d3/scatterplot.d3';
import { DataService } from '../../services/data/data.service';
import { PreferenceService } from '../../services/preference/preference.service';
import { PreferenceGroupModule } from '../preference-group/preference-group.module';
import { Subject } from 'rxjs';

describe('VRScatterplotComponent', () => {
  let fixture: ComponentFixture<VRScatterPlotComponent>;
  let component: VRScatterPlotComponent;
  let scatterplotD3: Scatterplot;
  let preferenceService: PreferenceService;
  let dataService: DataService;

  beforeEach(() => {
    preferenceService = new PreferenceService();
    dataService = new DataService(preferenceService);

    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
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
    scatterplotD3 = component.vrScatterPlot;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(VRScatterPlotComponent); 
  });

  it('should render d3 on init.', () => {
    spyOn(scatterplotD3, 'init');
    component.ngOnInit();
    expect(scatterplotD3.init).toHaveBeenCalled();
  });
});
