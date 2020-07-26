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

type TerritoryGroup = { level: TerritoryLevel, territories: Territory[] };

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

const defaultDateRange: [Date, Date] = [new Date(Date.now() - 30 * DAY), new Date()];
const defaultUnit = COUNTRY;

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss'],
})
export class GeoMapComponent implements RenderOptions, OnInit, OnDestroy {
  humanizeMeasureName = humanizeMeasureName;
  humanizeTerritoryLevel = humanizeTerritoryLevel;
  formatY = formatY;
  territoryLevels = [CONTINENT, SUBCONTINENT, COUNTRY, CITY];

  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective<GeoMapComponent>;

  @Input() meta: GeoMapMeta;
  @Input() height = 500;
  @Input() width = 800;

  keywordControl = new FormControl();
  filteredTerritoryGroups$ = new Observable<TerritoryGroup[]>();

  data$ = new BehaviorSubject<GeoDatum[]>([]);
  geoMapD3: GeoMapD3;
  range$ = new BehaviorSubject(defaultDateRange);
  filteringTerritory$ = new BehaviorSubject<Territory | null>(null);
  unit$ = new BehaviorSubject(defaultUnit);
  private destroy$ = new Subject();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    this.geoMapD3 = new GeoMapD3(this);
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
    return ['id', ...this.measureNames];
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

  get hierarchyTerritories() {
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

  getTerritoryName = (territory: Territory) => {
    return territory?.name;
  };

  handleClickRow(datum: GeoDatum) {
    const { territory } = datum;
    this.filteringTerritory = territory;
    if (territory.level === this.unit) {
      this.unit = Math.min(this.unit + 1, CITY);
    }
  }

  handleSearch(territory: Territory) {
    this.filteringTerritory = territory;
    this.unit = Math.max(this.unit, territory.level);
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
      .subscribe(this.data$);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.geoMapD3.clear();
  }
}
