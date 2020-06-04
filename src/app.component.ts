import { Component } from '@angular/core';
import { GUIDE_DOGE, t } from './assets/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  get title() {
    return t(GUIDE_DOGE.TITLE);
  }
}
