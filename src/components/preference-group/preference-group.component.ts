import { Component, Input } from '@angular/core';
import { PreferenceKey, PreferencesService } from '../../services/preferences/preferences.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-preference-group',
  templateUrl: './preference-group.component.html',
  styleUrls: ['./preference-group.component.scss'],
})
export class PreferenceGroupComponent {
  @Input() title: string;
  @Input() key: PreferenceKey;

  constructor(
    public preferencesService: PreferencesService,
  ) {
  }

  get enabled$() {
    return this.preferencesService[this.key] as BehaviorSubject<boolean>;
  }

  get enabled() {
    return this.enabled$.value;
  }

  set enabled(value) {
    this.enabled$.next(value);
  }
}
