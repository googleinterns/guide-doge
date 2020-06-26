import { NgModule } from '@angular/core';
import { PreferenceItemComponent } from './preference-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    PreferenceItemComponent,
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  exports: [
    PreferenceItemComponent,
  ],
})
export class PreferenceItemModule {
}
