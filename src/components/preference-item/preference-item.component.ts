import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { Preference, PreferenceWithMeta, PreferenceItemMeta, SelectPreferenceItemMeta } from '../../services/preference/types';
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
  @Input() preference$: BehaviorSubject<PreferenceWithMeta<T>>;
  @Input() property: U;

  constructor(
    @Optional() @Host() private host: PreferenceGroupComponent<T> | null,
  ) {
  }

  get meta(): PreferenceItemMeta {
    return this.preference$.value._meta[this.property];
  }

  get type(): string {
    return this.meta.type;
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

  get options(): string[] {
    if (this.meta.type === 'select') {
      return (this.meta as SelectPreferenceItemMeta).options;
    } else {
      return [];
    }
  }

  ngOnInit() {
    if (this.host && !this.preference$) {
      this.preference$ = this.host.preference$;
    }
  }
}
