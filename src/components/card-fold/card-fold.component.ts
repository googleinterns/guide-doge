import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-fold',
  templateUrl: './card-fold.component.html',
  styleUrls: ['./card-fold.component.scss'],
})
export class CardFoldComponent {
  @Input() title: string;
}
