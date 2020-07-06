import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferenceGroupComponent } from './preference-group.component';
import { SwitchModule } from '../switch/switch.module';
import { BehaviorSubject } from 'rxjs';

describe('PreferenceGroupComponent', () => {
  let fixture: ComponentFixture<PreferenceGroupComponent>;
  let component: PreferenceGroupComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SwitchModule,
      ],
      declarations: [
        PreferenceGroupComponent,
      ],
    });
    fixture = TestBed.createComponent(PreferenceGroupComponent);
    component = fixture.componentInstance;
    component.subject = new BehaviorSubject<boolean>(false);
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(PreferenceGroupComponent);
  });

  it('should synchronize `enabled` with `subject`.', () => {
    component.enabled = true;
    expect(component.subject.value).toBe(component.enabled);
    component.enabled = false;
    expect(component.subject.value).toBe(component.enabled);
  });
});
