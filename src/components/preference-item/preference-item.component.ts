import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-preference-item',
  templateUrl: './preference-item.component.html',
  styleUrls: ['./preference-item.component.scss'],
})
export class PreferenceItemComponent<T> {
  @Input() name: string;
  @Input() subject: BehaviorSubject<T>;

  get type(): string {
    return typeof this.value;
  }

  get value(): T {
    return this.subject.value;
  }

  set value(value: T) {
    this.subject.next(value);
  }
}
