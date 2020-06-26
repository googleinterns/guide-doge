import { NgModule } from '@angular/core';
import { PreferenceGroupComponent } from './preference-group.component';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    PreferenceGroupComponent,
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    MatCardModule,
  ],
  exports: [
    PreferenceGroupComponent,
  ],
})
export class PreferenceGroupModule {
}
