import { NgModule } from '@angular/core';
import { A11yPlaceholderDirective } from './a11y-placeholder.directive';

@NgModule({
  declarations: [
    A11yPlaceholderDirective,
  ],
  exports: [
    A11yPlaceholderDirective,
  ],
})
export class A11yPlaceholderModule {
}
