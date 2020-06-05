import { NgModule } from '@angular/core';
import { PreferenceComponent } from './preference.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PreferenceComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PreferenceComponent,
  ],
})
export class PreferenceModule {
}
