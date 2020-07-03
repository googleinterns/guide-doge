import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferenceItemComponent } from './preference-item.component';
import { BehaviorSubject } from 'rxjs';
import { Preference, PreferenceWithMeta } from '../../services/preference/types';
import { MatCardModule } from '@angular/material/card';

interface TestPreference extends Preference {
  num: number;
  bool: boolean;
}

describe('PreferenceItemComponent', () => {
  let boolFixture: ComponentFixture<PreferenceItemComponent<TestPreference, 'bool'>>;
  let numFixture: ComponentFixture<PreferenceItemComponent<TestPreference, 'num'>>;
  let boolComponent: PreferenceItemComponent<TestPreference, 'bool'>;
  let numComponent: PreferenceItemComponent<TestPreference, 'num'>;
  let preference$: BehaviorSubject<PreferenceWithMeta<TestPreference>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [
        PreferenceItemComponent,
      ],
    });
    boolFixture = TestBed.createComponent<PreferenceItemComponent<TestPreference, 'bool'>>(PreferenceItemComponent);
    numFixture = TestBed.createComponent<PreferenceItemComponent<TestPreference, 'num'>>(PreferenceItemComponent);
    boolComponent = boolFixture.componentInstance;
    numComponent = numFixture.componentInstance;

    preference$ = new BehaviorSubject<PreferenceWithMeta<TestPreference>>({
      enabled: true,
      num: 0,
      bool: true,
      _meta: {
        enabled: {
          type: 'boolean',
          defaultValue: true,
        },
        num: {
          type: 'number',
          defaultValue: 0,
        },
        bool: {
          type: 'boolean',
          defaultValue: true,
        },
      },
    });

    numComponent.preference$ = preference$;
    numComponent.property = 'num';
    boolComponent.preference$ = preference$;
    boolComponent.property = 'bool';
  });

  it('should instantiate.', () => {
    expect(boolComponent).toBeInstanceOf(PreferenceItemComponent);
    expect(numComponent).toBeInstanceOf(PreferenceItemComponent);
  });

  it('should return the correct type of the subject.', () => {
    expect(boolComponent.type).toBe('boolean');
    expect(numComponent.type).toBe('number');
  });

  it('should synchronize `value` with `preference$`.', () => {
    boolComponent.value = true;
    expect(boolComponent.value).toBe(true);
    expect(preference$.value.bool).toBe(true);
    boolComponent.value = false;
    expect(boolComponent.value).toBe(false);
    expect(preference$.value.bool).toBe(false);

    numComponent.value = 1;
    expect(numComponent.value).toBe(1);
    expect(preference$.value.num).toBe(1);
    numComponent.value = 2;
    expect(numComponent.value).toBe(2);
    expect(preference$.value.num).toBe(2);
  });
});
