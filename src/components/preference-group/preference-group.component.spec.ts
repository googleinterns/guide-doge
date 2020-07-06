import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferenceGroupComponent } from './preference-group.component';
import { Preference, PreferenceWithMeta } from '../../services/preference/types';
import { BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { I18nKey } from '../../i18n';
import { AUDIFICATION_PREFERENCE } from '../../i18n/types';

interface TestPreference extends Preference {
  testDummyBool: boolean;
}

describe('PreferenceGroupComponent', () => {
  let fixture: ComponentFixture<PreferenceGroupComponent<TestPreference>>;
  let component: PreferenceGroupComponent<TestPreference>;
  const testI18n: any = {
    enabled: AUDIFICATION_PREFERENCE.enabled,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [
        PreferenceGroupComponent,
      ],
    });
    fixture = TestBed.createComponent<PreferenceGroupComponent<TestPreference>>(PreferenceGroupComponent);
    component = fixture.componentInstance;
    component.preference$ = new BehaviorSubject<PreferenceWithMeta<TestPreference>>({
      enabled: true,
      testDummyBool: true,
      _meta: {
        enabled: {
          type: 'boolean',
          defaultValue: true,
        },
        testDummyBool: {
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

  it('should return child properties.', () => {
    expect(component.childProperties).toEqual([]);

    component.i18n = testI18n;
    expect(component.childProperties).toEqual(['testDummyBool']);
  });

  it('should return I18n value.', () => {
    expect(component.getI18nValue('enabled')).toBe('enabled');

    component.i18n = testI18n;
    expect(component.getI18nValue('enabled')).not.toBe('enabled');
    expect(component.getI18nValue('testDummyBool')).toBe('testDummyBool');
  });
});
