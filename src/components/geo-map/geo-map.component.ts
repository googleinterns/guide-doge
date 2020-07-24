import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GeoMapD3, RenderOptions } from '../../d3/geo-map.d3';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { GeoMapMeta } from '../../datasets/metas/geo-map.meta';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { GeoDatum, Territory, TerritoryLevel } from '../../datasets/queries/geo.query';
import { DAY } from '../../utils/timeUnits';
import { TerritoryObject, World } from '../../datasets/geo.types';
import { humanizeMeasureName, humanizeTerritoryLevel } from '../../utils/formatters';
import { filter, map, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

type TerritoryObjectEntry = [string, TerritoryObject];
type TerritoryGroupEntry = [TerritoryLevel, TerritoryObjectEntry[]];

const defaultDateRange: [Date, Date] = [new Date(Date.now() - 30 * DAY), new Date()];
const defaultTerritory: Territory = {
  level: TerritoryLevel.SUBCONTINENT,
  id: '151',
};
const defaultUnit = TerritoryLevel.COUNTRY;

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss'],
})
export class GeoMapComponent implements RenderOptions, OnInit, OnDestroy {
  humanizeMeasureName = humanizeMeasureName;
  humanizeTerritoryLevel = humanizeTerritoryLevel;
  territoryLevels = [TerritoryLevel.CONTINENT, TerritoryLevel.SUBCONTINENT, TerritoryLevel.COUNTRY, TerritoryLevel.CITY];

  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective<GeoMapComponent>;

  @Input() meta: GeoMapMeta;
  @Input() height = 500;
  @Input() width = 800;

  keywordControl = new FormControl();
  filteredTerritoryGroupEntries$ = new Observable<TerritoryGroupEntry[]>();

  world: World;
  data$ = new BehaviorSubject<GeoDatum[]>([]);
  geoMapD3: GeoMapD3;
  range$ = new BehaviorSubject(defaultDateRange);
  territory$ = new BehaviorSubject<Territory | undefined>(defaultTerritory);
  unit$ = new BehaviorSubject(defaultUnit);
  private destroy$ = new Subject();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    this.getTerritoryName = this.getTerritoryName.bind(this);
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

  set territory(territory) {
    this.territory$.next(territory);
  }

  getTerritoryName(territory: Territory) {
    return territory && this.world[territory.level][territory.id].name;
  }

  async ngOnInit() {
    this.world = this.meta.world;

    this.filteredTerritoryGroupEntries$ = this.keywordControl.valueChanges
      .pipe(filter(keyword => typeof keyword === 'string'))
      .pipe(map(keyword => {
        const lowerCasedKeyword = keyword.toLowerCase();
        const territoryGroupEntries = this.territoryLevels.map(level => {
          const territoryObjectEntries = Object.entries(this.world[level])
            .filter(([, territoryObject]) => territoryObject.name.toLowerCase().startsWith(lowerCasedKeyword));
          return [level, territoryObjectEntries] as TerritoryGroupEntry;
        });
        return territoryGroupEntries.filter(([, territoryObjectEntries]) => territoryObjectEntries.length > 0);
      }));

    this.geoMapD3 = new GeoMapD3(this);
    await this.geoMapD3.render();
    combineLatest([this.range$, this.territory$, this.unit$])
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
