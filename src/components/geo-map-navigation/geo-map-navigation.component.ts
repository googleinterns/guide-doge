import { Component, HostBinding, HostListener, Inject, Input, ViewChild } from '@angular/core';
import { AUDIFICATION, GEO_MAP_NAVIGATION, t, tA11y } from '../../i18n';
import { GeoMapNavigationPreference } from '../../services/preference/types';
import { ScreenReaderComponent } from '../screen-reader/screen-reader.component';
import { GeoMapComponent } from '../geo-map/geo-map.component';

@Component({
  selector: 'app-geo-map-navigation',
  templateUrl: './geo-map-navigation.component.html',
  styleUrls: ['./geo-map-navigation.component.scss'],
})
export class GeoMapNavigationComponent implements GeoMapNavigationPreference {
  @ViewChild(ScreenReaderComponent, { static: true }) screenReaderComponent: ScreenReaderComponent;

  @Input() enabled: boolean;

  @HostBinding('attr.tabindex') private readonly tabindex = 0;

  constructor(
    @Inject('host') private host: GeoMapComponent,
  ) {
  }

  get INSTRUCTIONS() {
    return t(GEO_MAP_NAVIGATION.INSTRUCTIONS);
  }

  get data() {
    return this.host.data;
  }

  get meta() {
    return this.host.meta;
  }

  @HostListener('keydown', ['$event'])
  async handleKeyDown($event: KeyboardEvent): Promise<boolean> {
    const { key, shiftKey, repeat, altKey, ctrlKey, metaKey } = $event;
    if (altKey || ctrlKey || metaKey || key === 'Tab') {
      return false;
    }
    $event.preventDefault();
    $event.stopPropagation();
    if (repeat) {
      return false;
    }
    if (key === ' ') {
    }
    return false;
  }

  @HostListener('focus', ['$event'])
  handleFocus() {
  }

  @HostListener('blur', ['$event'])
  handleBlur() {
  }

  private readOutInstructions() {
    return this.screenReaderComponent.readOut(tA11y(GEO_MAP_NAVIGATION.INSTRUCTIONS));
  }
}
