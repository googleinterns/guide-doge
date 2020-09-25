import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VRAccessibilityComponent } from '../vr-accessibility/vr-accessibility.component';
import { MatCardModule } from '@angular/material/card';
import { Hapticplot } from '../../d3/hapticplot.d3';
import { DataService } from '../../services/data/data.service';
import { PreferenceService } from '../../services/preference/preference.service';

describe('VRAccessibilityComponent', () => {
  let fixture: ComponentFixture<VRAccessibilityComponent>;
  let component: VRAccessibilityComponent;
  let hapticplotD3: Hapticplot;
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
        VRAccessibilityComponent,
      ],
      providers: [
        { provide: PreferenceService, useValue: preferenceService },
        { provide: DataService, useValue: dataService },
      ]
    });
    fixture = TestBed.createComponent(VRAccessibilityComponent);
    component = fixture.componentInstance;
    hapticplotD3 = component.vrHapticPlot;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(VRAccessibilityComponent);
  });

  it('should call d3 on init.', () => {
    spyOn(hapticplotD3, 'init').and.callThrough();
    component.initD3HapticPlot();
    expect(hapticplotD3.init).toHaveBeenCalled();
  });
});
