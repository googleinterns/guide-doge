import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferenceItemComponent } from './preference-item.component';
import { BehaviorSubject } from 'rxjs';

describe('PreferenceItemComponent', () => {
  let fixture: ComponentFixture<PreferenceItemComponent<any>>;
  let component: PreferenceItemComponent<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PreferenceItemComponent,
      ],
    });
    fixture = TestBed.createComponent(PreferenceItemComponent);
    component = fixture.componentInstance;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(PreferenceItemComponent);
  });

  it('should return the correct type of the subject.', () => {
    component.subject = new BehaviorSubject<boolean>(true);
    expect(component.type).toBe('boolean');
    component.subject = new BehaviorSubject<number>(42);
    expect(component.type).toBe('number');
  });

  it('should synchronize `value` with `subject`.', () => {
    component.subject = new BehaviorSubject<boolean>(false);
    component.value = true;
    expect(component.subject.value).toBe(component.value);
    component.value = false;
    expect(component.subject.value).toBe(component.value);
  });
});
