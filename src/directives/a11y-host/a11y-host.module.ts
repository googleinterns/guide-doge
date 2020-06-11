import { NgModule } from '@angular/core';
import { A11yHostDirective } from './a11y-host.directive';

@NgModule({
  declarations: [
    A11yHostDirective,
  ],
  exports: [
    A11yHostDirective,
  ],
})
export class A11yHostModule {
}
