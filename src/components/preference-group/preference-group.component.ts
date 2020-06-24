import { Component, Input } from '@angular/core';
import { Preference } from '../../services/preference/types';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-preference-group',
  templateUrl: './preference-group.component.html',
  styleUrls: ['./preference-group.component.scss'],
})
export class PreferenceGroupComponent<T extends Preference> {
  @Input() name: string;
  @Input() preference$: BehaviorSubject<T>;

  get value() {
    return this.preference$.value.enabled;
  }

  set value(value) {
    this.preference$.next({
      ...this.preference$.value,
      enabled: value,
    });
  }
}
