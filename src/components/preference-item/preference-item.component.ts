import { Component, Input, Host, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preference } from '../../services/preference/types';
import { PreferenceGroupComponent } from '../preference-group/preference-group.component';

@Component({
  selector: 'app-preference-item',
  templateUrl: './preference-item.component.html',
  styleUrls: ['./preference-item.component.scss'],
})
export class PreferenceItemComponent<T extends Preference, U extends keyof T> {
  @Input() name: string;
  @Input() preference$: BehaviorSubject<T>;
  @Input() property: U;

  constructor(
    @Optional() @Host() private host?: PreferenceGroupComponent<T>
  ) { }

  private get _preference$(): BehaviorSubject<T> {
    if (!this.preference$ && this.host) {
      return this.host.preference$;
    } else {
      return this.preference$;
    }
  }

  get type(): string {
    return typeof this.value;
  }

  get value(): T[U] {
    return this._preference$.value[this.property];
  }

  set value(value: T[U]) {
    this._preference$.next({
      ...this._preference$.value,
      [this.property]: value,
    });
  }
}
