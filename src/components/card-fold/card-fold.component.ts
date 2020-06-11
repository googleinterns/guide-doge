import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-card-fold',
  templateUrl: './card-fold.component.html',
  styleUrls: ['./card-fold.component.scss'],
})
export class CardFoldComponent {
  @ViewChild(TemplateRef, { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;
}
