import { NgModule } from '@angular/core';
import { AudificationDirective } from './audification.directive';

@NgModule({
  declarations: [
    AudificationDirective,
  ],
  exports: [
    AudificationDirective,
  ],
})
export class AudificationModule {
}
