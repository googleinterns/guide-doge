import { Component, Input } from '@angular/core';
import { Preference } from '../../services/preference/types';
import { BehaviorSubject } from 'rxjs';
import { I18nKey, t } from '../../i18n';

@Component({
  selector: 'app-preference-group',
  templateUrl: './preference-group.component.html',
  styleUrls: ['./preference-group.component.scss'],
})
export class PreferenceGroupComponent<T extends Preference> {
  @Input() name?: string;
  @Input() i18n?: { [key in keyof T]: I18nKey };
  @Input() preference$: BehaviorSubject<T>;

  get enabled() {
    return this.preference$.value.enabled;
  }

  set enabled(value) {
    this.preference$.next({
      ...this.preference$.value,
      enabled: value,
    });
  }

  get childProperties() {
    const properties = Object.keys(this.preference$.value) as (keyof T)[];
    return properties.filter(property => property !== 'enabled');
  }

  getI18nValue(key: keyof T) {
    return this.i18n && t(this.i18n[key]);
  }
}
