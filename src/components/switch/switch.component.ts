import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  id = `switch-${uuid.v4()}`;
  @Input() value: boolean;
  @Output() valueChange = new EventEmitter<boolean>();

  setValue(value) {
    this.valueChange.emit(value);
  }
}
