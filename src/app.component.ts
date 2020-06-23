import { Component, OnDestroy, OnInit } from '@angular/core';
import { GUIDE_DOGE, t } from './assets/i18n';
import { ScreenReaderService } from './services/screen-reader/screen-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private screenReaderService: ScreenReaderService,
  ) {
  }

  get TITLE() {
    return t(GUIDE_DOGE.TITLE);
  }

  ngOnInit() {
    this.screenReaderService.init();
  }

  ngOnDestroy() {
    this.screenReaderService.destroy();
  }
}
