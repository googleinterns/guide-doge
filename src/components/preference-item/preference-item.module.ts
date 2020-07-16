import { NgModule } from '@angular/core';
import { PreferenceItemComponent } from './preference-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    PreferenceItemComponent,
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    MatSelectModule,
  ],
  exports: [
    PreferenceItemComponent,
  ],
})
export class PreferenceItemModule {
}
