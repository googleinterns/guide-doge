import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferenceGroupComponent } from './preference-group.component';
import { Preference, PreferenceWithMeta } from '../../services/preference/types';
import { BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

describe('PreferenceGroupComponent', () => {
  let fixture: ComponentFixture<PreferenceGroupComponent<Preference>>;
  let component: PreferenceGroupComponent<Preference>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [
        PreferenceGroupComponent,
      ],
    });
    fixture = TestBed.createComponent(PreferenceGroupComponent);
    component = fixture.componentInstance;
    component.preference$ = new BehaviorSubject<PreferenceWithMeta<Preference>>({
      enabled: true,
      _meta: {
        enabled: {
          type: 'boolean',
          defaultValue: true,
        }
      }
    });
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(PreferenceGroupComponent);
  });

  it('should synchronize `enabled`.', () => {
    component.enabled = true;
    expect(component.enabled).toBe(true);
    component.enabled = false;
    expect(component.enabled).toBe(false);
  });
});
