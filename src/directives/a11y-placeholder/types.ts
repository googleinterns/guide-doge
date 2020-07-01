import { Type } from '@angular/core';

export interface LazyA11yModule<Component> {
  A11yComponent: Type<Component>;
}
