import { Component, ElementRef, HostBinding, HostListener, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GEO_MAP_NAVIGATION, t, tA11y } from '../../i18n';
import { GeoMapNavigationPreference } from '../../services/preference/types';
import { ScreenReaderComponent } from '../screen-reader/screen-reader.component';
import { GeoMapComponent } from '../geo-map/geo-map.component';
import { TerritoryLevel } from '../../datasets/geo.types';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

@Component({
  selector: 'app-geo-map-navigation',
  templateUrl: './geo-map-navigation.component.html',
  styleUrls: ['./geo-map-navigation.component.scss'],
})
export class GeoMapNavigationComponent implements GeoMapNavigationPreference, OnInit, OnDestroy {
  @ViewChild(ScreenReaderComponent, { static: true }) screenReaderComponent: ScreenReaderComponent;

  @Input() enabled: boolean;

  @HostBinding('attr.tabindex') private readonly tabindex = 0;

  private destroy$ = new Subject();

  constructor(
    @Inject('host') private host: GeoMapComponent,
    public elementRef: ElementRef<HTMLElement>,
  ) {
  }

  get INSTRUCTIONS() {
    return t(GEO_MAP_NAVIGATION.INSTRUCTIONS);
  }

  get data() {
    return this.host.data;
  }

  get unit() {
    return this.host.unit;
  }

  set unit(unit) {
    this.host.unit = unit;
  }

  get filteringTerritory() {
    return this.host.filteringTerritory;
  }

  set filteringTerritory(filteringTerritory) {
    this.host.filteringTerritory = filteringTerritory;
  }

  get meta() {
    return this.host.meta;
  }

  get keywordElement() {
    return this.host.keywordRef.nativeElement;
  }

  get activeDatumIndex() {
    return this.host.activeDatumIndex;
  }

  set activeDatumIndex(activeDatumIndex) {
    this.host.activeDatumIndex = activeDatumIndex;
  }

  get activeMeasureIndex() {
    return this.host.activeMeasureIndex;
  }

  set activeMeasureIndex(activeMeasureIndex) {
    this.host.activeMeasureIndex = activeMeasureIndex;
  }

  focus() {
    this.elementRef.nativeElement.focus();
  }

  @HostListener('keydown', ['$event'])
  async handleKeyDown($event: KeyboardEvent): Promise<boolean> {
    const { key, shiftKey, altKey, ctrlKey, metaKey } = $event;
    if (altKey || ctrlKey || metaKey || key === 'Tab') {
      return false;
    }
    $event.preventDefault();
    $event.stopPropagation();
    if (key === '-' || key === '_') {
      this.unit = Math.max(this.unit - 1, this.filteringTerritory?.level ?? 0);
    } else if (key === '+' || key === '=') {
      this.unit = Math.min(this.unit + 1, CITY);
    } else if (key === 'Enter') {
      if (shiftKey) {
        this.filteringTerritory = this.filteringTerritory?.parent ?? null;
      } else if (this.activeDatumIndex >= 0) {
        this.filteringTerritory = this.data[this.activeDatumIndex]?.territory ?? null;
      }
    } else if (key === '/') {
      this.keywordElement.focus();
    } else if (key === 'ArrowDown') {
      this.activeDatumIndex = Math.min(this.activeDatumIndex + 1, this.data.length - 1);
    } else if (key === 'ArrowUp') {
      this.activeDatumIndex = Math.max(this.activeDatumIndex - 1, 0);
    } else if (key === 'ArrowRight') {
      this.activeMeasureIndex = Math.min(this.activeMeasureIndex + 1, this.host.measureNames.length - 1);
    } else if (key === 'ArrowLeft') {
      this.activeMeasureIndex = Math.max(this.activeMeasureIndex - 1, 0);
    }
    return false;
  }

  @HostListener('focus', ['$event'])
  handleFocus() {
  }

  @HostListener('blur', ['$event'])
  handleBlur() {
  }

  ngOnInit() {
    merge(
      this.host.filteringTerritory$
        .pipe(takeUntil(this.destroy$)),
      fromEvent<KeyboardEvent>(this.keywordElement, 'keydown')
        .pipe(takeUntil(this.destroy$))
        .pipe(filter(e => e.key === 'Escape')),
    ).subscribe(() => {
      this.focus();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private readOutInstructions() {
    return this.screenReaderComponent.readOut(tA11y(GEO_MAP_NAVIGATION.INSTRUCTIONS));
  }
}
