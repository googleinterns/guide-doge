import { Component, Input } from '@angular/core';

type PreferenceType = 'number' | 'boolean';

@Component({
  selector: 'app-preference-item',
  templateUrl: './preference-item.component.html',
  styleUrls: ['./preference-item.component.scss'],
})
export class PreferenceItemComponent {
  @Input() name: string;
  @Input() type: PreferenceType;
}
