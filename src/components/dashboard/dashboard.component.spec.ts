import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { PreferenceModule } from '../../services/preference/preference.module';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PreferenceModule,
      ],
      declarations: [
        DashboardComponent,
      ],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(DashboardComponent);
  });

  it('should have preference objects.', () => {
    for (const key of ['audification', 'dataTable', 'textSummary']) {
      const preference = component[key];
      expect(preference).toBeInstanceOf(Object);
    }
  });
});
