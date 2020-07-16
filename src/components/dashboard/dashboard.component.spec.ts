import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DataService } from '../../services/data/data.service';
import { PreferenceService } from '../../services/preference/preference.service';
import { PreferenceGroupModule } from '../preference-group/preference-group.module';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let preferenceService: PreferenceService;
  let dataService: DataService;

  beforeEach(() => {
    preferenceService = new PreferenceService();
    dataService = new DataService(preferenceService);

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      imports: [
        PreferenceGroupModule
      ],
      providers: [
        { provide: PreferenceService, useValue: preferenceService },
        { provide: DataService, useValue: dataService },
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(DashboardComponent);
  });

  it('should have preference objects.', () => {
    for (const key of ['dataset$', 'audification$', 'dataTable$', 'textSummary$']) {
      const preference = component[key];
      expect(preference).toBeInstanceOf(Object);
    }
  });
});
