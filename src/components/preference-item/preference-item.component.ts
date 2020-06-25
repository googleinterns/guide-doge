import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { Preference } from '../../services/preference/types';
import { PreferenceGroupComponent } from '../preference-group/preference-group.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-preference-item',
  templateUrl: './preference-item.component.html',
  styleUrls: ['./preference-item.component.scss'],
})
export class PreferenceItemComponent<T extends Preference, U extends keyof T> implements OnInit {
  @Input() name: string;

  // the component should either be nested under PreferenceGroupComponent, or have the preference$ property provided
  @Input() preference$: BehaviorSubject<T>;
  @Input() property: U;

  constructor(
    @Optional() @Host() private host: PreferenceGroupComponent<T> | null,
  ) {
  }

  get type(): string {
    return typeof this.value;
  }

  get value(): T[U] {
    return this.preference$.value[this.property];
  }

  set value(value: T[U]) {
    if (value !== undefined && value !== null) {
      this.preference$.next({
        ...this.preference$.value,
        [this.property]: value,
      });
    }
  }

  ngOnInit() {
    if (this.host && !this.preference$) {
      this.preference$ = this.host.preference$;
    }
  }
}
