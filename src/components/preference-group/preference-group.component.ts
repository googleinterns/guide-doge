import { Component } from '@angular/core';
import { Preference } from '../../services/preference/types';
import { PreferenceItemComponent } from '../preference-item/preference-item.component';

@Component({
  selector: 'app-preference-group',
  templateUrl: './preference-group.component.html',
  styleUrls: ['./preference-group.component.scss'],
})
export class PreferenceGroupComponent<T extends Preference> extends PreferenceItemComponent<T, 'enabled'> {
  property: 'enabled' = 'enabled';

  constructor() {
    super();
  }
}
