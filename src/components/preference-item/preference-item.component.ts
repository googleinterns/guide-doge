import { Component, Input } from '@angular/core';
import { PreferenceKey, PreferencesService } from '../../services/preferences/preferences.service';
import { BehaviorSubject } from 'rxjs';

type PreferenceType = 'number' | 'boolean';

@Component({
  selector: 'app-preference-item',
  templateUrl: './preference-item.component.html',
  styleUrls: ['./preference-item.component.scss'],
})
export class PreferenceItemComponent {
  @Input() name: string;
  @Input() key: PreferenceKey;
  @Input() type: PreferenceType;

  constructor(
    public preferencesService: PreferencesService,
  ) {
  }

  get value$() {
    return this.preferencesService[this.key] as BehaviorSubject<boolean>;
  }

  get value() {
    return this.value$.value;
  }

  set value(value) {
    this.value$.next(value);
  }
}
