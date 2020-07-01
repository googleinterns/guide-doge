import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferenceItemComponent } from './preference-item.component';
import { BehaviorSubject } from 'rxjs';
import { Preference } from '../../services/preference/types';

interface TestPreference extends Preference {
  num: number;
  bool: boolean;
}

describe('PreferenceItemComponent', () => {
  let boolFixture: ComponentFixture<PreferenceItemComponent<TestPreference, 'bool'>>;
  let numFixture: ComponentFixture<PreferenceItemComponent<TestPreference, 'num'>>;
  let boolComponent: PreferenceItemComponent<TestPreference, 'bool'>;
  let numComponent: PreferenceItemComponent<TestPreference, 'num'>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PreferenceItemComponent,
      ],
    });
    boolFixture = TestBed.createComponent<PreferenceItemComponent<TestPreference, 'bool'>>(PreferenceItemComponent);
    numFixture = TestBed.createComponent<PreferenceItemComponent<TestPreference, 'num'>>(PreferenceItemComponent);
    boolComponent = boolFixture.componentInstance;
    numComponent = numFixture.componentInstance;
  });

  it('should instantiate.', () => {
    expect(boolComponent).toBeInstanceOf(PreferenceItemComponent);
    expect(numComponent).toBeInstanceOf(PreferenceItemComponent);
  });

  it('should return the correct type of the subject.', () => {
    boolComponent.preference$ = new BehaviorSubject<TestPreference>({ enabled: true, num: 0, bool: true});
    expect(boolComponent.type).toBe('boolean');
    numComponent.preference$ = new BehaviorSubject<TestPreference>({ enabled: true, num: 0, bool: true});
    expect(numComponent.type).toBe('number');
  });

  it('should synchronize `value` with `preference$`.', () => {
    boolComponent.preference$ = new BehaviorSubject<TestPreference>({ enabled: true, num: 0, bool: true});
    boolComponent.value = true;
    expect(boolComponent.value).toBe(true);
    expect(boolComponent.preference$.value.bool).toBe(true);
    boolComponent.value = false;
    expect(boolComponent.value).toBe(false);
    expect(boolComponent.preference$.value.bool).toBe(false);

    numComponent.preference$ = new BehaviorSubject<TestPreference>({ enabled: true, num: 0, bool: true});
    numComponent.value = 1;
    expect(numComponent.value).toBe(1);
    expect(numComponent.preference$.value.num).toBe(1);
    numComponent.value = 2;
    expect(numComponent.value).toBe(2);
    expect(numComponent.preference$.value.num).toBe(2);
  });
});
