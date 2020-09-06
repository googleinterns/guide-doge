import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app.module';
import { guideComponent } from './aframe_components/custom-components';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Register custom aframe components
AFRAME.registerComponent('guide', guideComponent);
