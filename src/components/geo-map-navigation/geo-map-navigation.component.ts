import { Component, ElementRef, HostBinding, HostListener, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AUDIFICATION, GEO_MAP_NAVIGATION, t, tA11y } from '../../i18n';
import { GeoMapNavigationPreference } from '../../services/preference/types';
import { ScreenReaderComponent } from '../screen-reader/screen-reader.component';
import { GeoMapComponent } from '../geo-map/geo-map.component';
import { TerritoryLevel } from '../../datasets/geo.types';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { formatY, humanizeMeasureName, humanizeTerritoryLevel } from '../../utils/formatters';

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

  get measureNames() {
    return this.host.measureNames;
  }

  private get i18nActiveDatumArgs() {
    const activeDatum = this.data[this.activeDatumIndex];
    if (!activeDatum) {
      return null;
    }
    const measureName = this.measureNames[this.activeMeasureIndex];
    return {
      territory: activeDatum.territory.name,
      value: formatY(activeDatum.values[measureName]),
      measure: humanizeMeasureName(measureName),
    };
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
    switch (key) {
      case '-':
      case '_':
        this.unit = Math.max(this.unit - 1, this.filteringTerritory?.level ?? 0);
        return this.readOutUnitAndFilteringTerritory();
      case '+':
      case '=':
        this.unit = Math.min(this.unit + 1, CITY);
        return this.readOutUnitAndFilteringTerritory();
      case 'Enter':
        if (shiftKey) {
          this.filteringTerritory = this.filteringTerritory?.parent ?? null;
        } else if (this.activeDatumIndex >= 0) {
          this.filteringTerritory = this.data[this.activeDatumIndex].territory;
        } else {
          break;
        }
        return this.readOutUnitAndFilteringTerritory();
      case '/':
        this.keywordElement.focus();
        return true;
      case 'ArrowDown':
        this.activeDatumIndex = Math.min(this.activeDatumIndex + 1, this.data.length - 1);
        return this.readOutActiveDatum();
      case 'ArrowUp':
        this.activeDatumIndex = Math.max(this.activeDatumIndex - 1, 0);
        return this.readOutActiveDatum();
      case 'ArrowRight':
        this.activeMeasureIndex = Math.min(this.activeMeasureIndex + 1, this.measureNames.length - 1);
        return this.readOutActiveMeasure();
      case 'ArrowLeft':
        this.activeMeasureIndex = Math.max(this.activeMeasureIndex - 1, 0);
        return this.readOutActiveMeasure();
      case '?':
        return this.readOutInstructions();
    }
    return false;
  }

  @HostListener('focus', ['$event'])
  handleFocus() {
    return this.readOutUnitAndFilteringTerritory();
  }

  @HostListener('blur', ['$event'])
  handleBlur() {
    this.activeDatumIndex = -1;
    this.activeMeasureIndex = -1;
  }

  ngOnInit() {
    this.screenReaderComponent.breakSilence(tA11y(AUDIFICATION.BREAK_SILENCE));

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

  private readOutUnitAndFilteringTerritory() {
    const { hierarchicalTerritories } = this.host;
    return this.screenReaderComponent.readOut(t(GEO_MAP_NAVIGATION.UNIT_AND_FILTERING_TERRITORY, {
      unit: humanizeTerritoryLevel(this.unit, true),
      hierarchical_territories: hierarchicalTerritories.length > 0
        ? hierarchicalTerritories
          .reverse()
          .map(territory => territory.name)
          .join(', ')
        : 'the world',
    }));
  }

  private async readOutActiveDatum() {
    const { i18nActiveDatumArgs } = this;
    if (i18nActiveDatumArgs === null) {
      return false;
    }
    return this.screenReaderComponent.readOut(t(GEO_MAP_NAVIGATION.ACTIVE_DATUM, i18nActiveDatumArgs));
  }

  private async readOutActiveMeasure() {
    const { i18nActiveDatumArgs } = this;
    if (i18nActiveDatumArgs === null) {
      const measureName = this.measureNames[this.activeMeasureIndex];
      return this.screenReaderComponent.readOut(humanizeMeasureName(measureName));
    }
    return this.screenReaderComponent.readOut(t(GEO_MAP_NAVIGATION.ACTIVE_MEASURE, i18nActiveDatumArgs));
  }

  private readOutInstructions() {
    return this.screenReaderComponent.readOut(tA11y(GEO_MAP_NAVIGATION.INSTRUCTIONS));
  }
}
