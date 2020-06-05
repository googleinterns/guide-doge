import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fold',
  templateUrl: './fold.component.html',
  styleUrls: ['./fold.component.scss'],
})
export class FoldComponent {
  @Input() title: string;
}
