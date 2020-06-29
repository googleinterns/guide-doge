import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-preference-group',
  templateUrl: './preference-group.component.html',
  styleUrls: ['./preference-group.component.scss'],
})
export class PreferenceGroupComponent {
  @Input() title: string;
  @Input() subject: BehaviorSubject<boolean>;

  get enabled() {
    return this.subject.value;
  }

  set enabled(value) {
    this.subject.next(value);
  }
}
