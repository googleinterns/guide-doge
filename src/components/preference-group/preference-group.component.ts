import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-preference-group',
  templateUrl: './preference-group.component.html',
  styleUrls: ['./preference-group.component.scss'],
})
export class PreferenceGroupComponent {
  @Input() title: string;
  @Input() enabled: boolean;
  @Output() enabledChange = new EventEmitter<boolean>();

  toggleEnabled() {
    this.enabledChange.emit(!this.enabled);
  }
}
