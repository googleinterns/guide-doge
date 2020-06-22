import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss'],
})
export class PreferenceComponent {
  @Input() title: string;
  @Input() enabled: boolean;
  @Output() enabledChange = new EventEmitter<boolean>();

  toggleEnabled() {
    this.enabledChange.emit(!this.enabled);
  }
}
