import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferenceItemComponent } from './preference-item.component';
import { BehaviorSubject } from 'rxjs';
import { Preference, PreferenceWithMeta } from '../../services/preference/types';
import { MatCardModule } from '@angular/material/card';

interface TestPreference extends Preference {
  num: number;
  bool: boolean;
  select: string;
}

describe('PreferenceItemComponent', () => {
  let boolFixture: ComponentFixture<PreferenceItemComponent<TestPreference, 'bool'>>;
  let numFixture: ComponentFixture<PreferenceItemComponent<TestPreference, 'num'>>;
  let selectFixture: ComponentFixture<PreferenceItemComponent<TestPreference, 'select'>>;
  let boolComponent: PreferenceItemComponent<TestPreference, 'bool'>;
  let numComponent: PreferenceItemComponent<TestPreference, 'num'>;
  let selectComponent: PreferenceItemComponent<TestPreference, 'select'>;
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
    selectFixture = TestBed.createComponent<PreferenceItemComponent<TestPreference, 'select'>>(PreferenceItemComponent);
    boolComponent = boolFixture.componentInstance;
    numComponent = numFixture.componentInstance;
    selectComponent = selectFixture.componentInstance;

    preference$ = new BehaviorSubject<PreferenceWithMeta<TestPreference>>({
      enabled: true,
      num: 0,
      bool: true,
      select: 'option1',
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
        select: {
          type: 'select',
          defaultValue: 'option1',
          options: ['option1', 'option2'],
        }
      },
    });

    numComponent.preference$ = preference$;
    numComponent.property = 'num';
    boolComponent.preference$ = preference$;
    boolComponent.property = 'bool';
    selectComponent.preference$ = preference$;
    selectComponent.property = 'select';
  });

  it('should instantiate.', () => {
    expect(boolComponent).toBeInstanceOf(PreferenceItemComponent);
    expect(numComponent).toBeInstanceOf(PreferenceItemComponent);
    expect(selectComponent).toBeInstanceOf(PreferenceItemComponent);
  });

  it('should return the correct type of the subject.', () => {
    expect(boolComponent.type).toBe('boolean');
    expect(numComponent.type).toBe('number');
    expect(selectComponent.type).toBe('select');
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

    selectComponent.value = 'option1';
    expect(selectComponent.value).toBe('option1');
    expect(preference$.value.select).toBe('option1');
    selectComponent.value = 'option2';
    expect(selectComponent.value).toBe('option2');
    expect(preference$.value.select).toBe('option2');
  });

  it('should return select options', () => {
    expect(boolComponent.options).toEqual([]);
    expect(numComponent.options).toEqual([]);
    expect(selectComponent.options).toEqual(['option1', 'option2']);
  });
});
