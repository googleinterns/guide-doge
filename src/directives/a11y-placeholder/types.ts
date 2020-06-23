import { ComponentFactory } from '@angular/core';

export interface LazyA11yModule<Component> {
  resolveComponentFactory(): ComponentFactory<Component>;
}
