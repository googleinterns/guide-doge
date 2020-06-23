import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preference } from '../../services/preference/types';

@Component({
  selector: 'app-preference-item',
  templateUrl: './preference-item.component.html',
  styleUrls: ['./preference-item.component.scss'],
})
export class PreferenceItemComponent<T extends Preference, U extends keyof T> {
  @Input() name: string;
  @Input() preference$: BehaviorSubject<T>;
  @Input() property: U;

  get type(): string {
    return typeof this.value;
  }

  get value(): T[U] {
    return this.preference$.value[this.property];
  }

  set value(value: T[U]) {
    this.preference$.next({
      ...this.preference$.value,
      [this.property]: value,
    });
  }
}
