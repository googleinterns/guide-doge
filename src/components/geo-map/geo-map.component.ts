import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GeoMapD3, RenderOptions } from '../../d3/geo-map.d3';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { GeoMapMeta } from '../../datasets/metas/geo-map.meta';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { GeoDatum } from '../../datasets/queries/geo.query';
import { DAY } from '../../utils/timeUnits';
import { Territory, TerritoryLevel } from '../../datasets/geo.types';
import { formatY, humanizeMeasureName, humanizeTerritoryLevel } from '../../utils/formatters';
import { filter, map, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { A11yHostComponent } from '../a11y-host/a11y-host.component';

type TerritoryGroup = { level: TerritoryLevel, territories: Territory[] };

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

const defaultDateRange: [Date, Date] = [new Date(Date.now() - 30 * DAY), new Date()];
const defaultUnit = COUNTRY;

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss'],
})
export class GeoMapComponent extends A11yHostComponent implements RenderOptions, OnInit, OnDestroy {
  humanizeMeasureName = humanizeMeasureName;
  humanizeTerritoryLevel = humanizeTerritoryLevel;
  formatY = formatY;
  territoryLevels = [CONTINENT, SUBCONTINENT, COUNTRY, CITY];

  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective;
  @ViewChild('keyword', { static: true }) keywordRef: ElementRef<HTMLInputElement>;

  @Input() meta: GeoMapMeta;
  @Input() height = 500;
  @Input() width = 800;

  keywordControl = new FormControl();
  filteredTerritoryGroups$ = new Observable<TerritoryGroup[]>();
  activeMeasureIndex = -1;

  data$ = new BehaviorSubject<GeoDatum[]>([]);
  activeDatumIndex$ = new BehaviorSubject(-1);
  geoMapD3: GeoMapD3;
  range$ = new BehaviorSubject(defaultDateRange);
  filteringTerritory$ = new BehaviorSubject<Territory | null>(null);
  unit$ = new BehaviorSubject(defaultUnit);

  private destroy$ = new Subject();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    super(elementRef);
    this.geoMapD3 = new GeoMapD3(this);
    this.filteringTerritory$
      .pipe(takeUntil(this.destroy$))
      .subscribe(territory => {
        this.unit = territory ? Math.min(territory.level + 1, CITY) : COUNTRY;
      });
  }

  get world() {
    return this.meta.world;
  }

  get data() {
    return this.data$.value;
  }

  get measureNames() {
    const [datum] = this.data;
    if (!datum) {
      return [];
    }
    return Object.keys(datum.values);
  }

  get displayedColumns() {
    return ['ranking', 'id', ...this.measureNames];
  }

  get TERRITORY_LEVEL() {
    const [datum] = this.data;
    if (!datum) {
      return null;
    }
    return humanizeTerritoryLevel(datum.territory.level);
  }

  get unit() {
    return this.unit$.value;
  }

  set unit(unit) {
    this.unit$.next(unit);
  }

  get filteringTerritory() {
    return this.filteringTerritory$.value;
  }

  set filteringTerritory(territory: Territory | null) {
    this.filteringTerritory$.next(territory);
  }

  get hierarchicalTerritories() {
    const territories: Territory[] = [];
    let { filteringTerritory } = this;
    while (filteringTerritory) {
      territories.unshift(filteringTerritory);
      filteringTerritory = filteringTerritory.parent;
    }
    return territories;
  }

  get subordinateTerritoryLevels() {
    const { filteringTerritory } = this;
    if (!filteringTerritory) {
      return this.territoryLevels;
    }
    return this.territoryLevels.filter(level => level >= filteringTerritory.level);
  }

  get activeDatumIndex() {
    return this.activeDatumIndex$.value;
  }

  set activeDatumIndex(activeDatumIndex) {
    this.activeDatumIndex$.next(activeDatumIndex);
    if (activeDatumIndex >= 0 && this.activeMeasureIndex < 0) {
      this.activeMeasureIndex = 0;
    }
  }

  getTerritoryName = (territory: Territory) => {
    return territory?.name;
  };

  handleClickRow(datum: GeoDatum) {
    const { territory } = datum;
    this.filteringTerritory = territory;
  }

  handleSearch(territory: Territory) {
    this.filteringTerritory = territory;
  }

  ngOnInit() {
    const maxSuggestionsPerLevel = 10;
    this.filteredTerritoryGroups$ = this.keywordControl.valueChanges
      .pipe(filter(keyword => typeof keyword === 'string'))
      .pipe(map(keyword => {
        const lowerCasedKeyword = keyword.toLowerCase();
        const territoryGroups = this.territoryLevels.map(level => {
          const territories = Object.values(this.world[level])
            .filter(territory => territory.name.toLowerCase().startsWith(lowerCasedKeyword))
            .slice(0, maxSuggestionsPerLevel);
          return { level, territories };
        });
        return territoryGroups.filter(({ territories }) => territories.length > 0);
      }));

    this.geoMapD3.render();
    combineLatest([this.range$, this.filteringTerritory$, this.unit$])
      .pipe(takeUntil(this.destroy$))
      .pipe(map(([range, territory, unit]) => this.meta.queryData({ range, territory, unit })))
      .subscribe(data => {
        this.activeDatumIndex = -1;
        this.data$.next(data);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.geoMapD3.clear();
  }
}
