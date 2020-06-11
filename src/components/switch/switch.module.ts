import { NgModule } from '@angular/core';
import { SwitchComponent } from './switch.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SwitchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    SwitchComponent,
  ],
})
export class SwitchModule {
}
