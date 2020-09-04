import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeoMapComponent } from './geo-map.component';
import { GeoMapD3 } from '../../d3/geo-map.d3';
import { fetchWorld } from '../../datasets/geo.dataset';
import { MetaType } from '../../datasets/metas/types';
import { GeoMapModule } from './geo-map.module';
import { Country, TerritoryLevel, World } from '../../datasets/geo.types';
import { atlantaCityId, southKoreaCountryId } from '../../utils/mocks.spec';
import { GeoDatum } from '../../datasets/queries/geo.query';

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

describe('GeoMapComponent', async () => {
  let fixture: ComponentFixture<GeoMapComponent>;
  let component: GeoMapComponent;
  let geoMapD3: GeoMapD3;
  let world: World;
  let countries: Country[];
  let mockData: GeoDatum[];

  beforeAll(async () => {
    world = await fetchWorld();
    countries = Object.values(world[COUNTRY]);
    mockData = countries.map(territory => ({
      territory,
      values: {
        activeUsers: 1,
      },
    }));
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        GeoMapModule,
      ],
    });
    fixture = TestBed.createComponent(GeoMapComponent);
    component = fixture.componentInstance;
    component.meta = {
      type: MetaType.GEO_MAP,
      title: 'Map',
      queryData: () => [],
      world: await fetchWorld(),
    };
    geoMapD3 = component.geoMapD3;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(GeoMapComponent);
  });

  it('should render d3 on init.', () => {
    spyOn(geoMapD3, 'render');
    component.ngOnInit();
    expect(geoMapD3.render).toHaveBeenCalled();
  });

  it('should clear d3 on destroy.', () => {
    spyOn(geoMapD3, 'clear');
    component.ngOnDestroy();
    expect(geoMapD3.clear).toHaveBeenCalled();
  });

  it('should have truthy i18n values.', () => {
    component.data$.next(mockData);
    expect(component.TERRITORY_LEVEL).toBeTruthy();
  });

  it('should have a list of hierarchical territories.', () => {
    const city = world[CITY][atlantaCityId];
    component.filteringTerritory = city;
    const { hierarchicalTerritories } = component;
    const country = city.parent;
    const subcontinent = country.parent;
    const continent = subcontinent.parent;
    const expectedTerritories = [continent, subcontinent, country, city];
    expect(hierarchicalTerritories.length).toBe(expectedTerritories.length);
    expect(hierarchicalTerritories.every((territory, i) => expectedTerritories[i] === territory)).toBeTrue();
  });

  it('should show a list of territory autocompletes starting with the keyword.', done => {
    component.ngOnInit();
    const prefix = 'S';
    component.filteredTerritoryGroups$.subscribe(filteredTerritoryGroups => {
      const relevant = filteredTerritoryGroups.every(territoryGroup =>
        territoryGroup.territories.every(territory =>
          territory.name.toLowerCase().startsWith(prefix.toLowerCase()),
        ),
      );
      expect(relevant).toBeTrue();
      done();
    });
    component.keywordControl.setValue(prefix);
  });

  it('should update the filtering territory on clicking a row.', () => {
    const [datum] = mockData;
    component.handleClickRow(datum);
    expect(component.filteringTerritory).toBe(datum.territory);
  });

  it('should update the filtering territory on searching.', () => {
    const [country] = countries;
    component.handleSearch(country);
    expect(component.filteringTerritory).toBe(country);
  });

  it('should have a list of subordinate territory levels.', () => {
    const country = world[COUNTRY][southKoreaCountryId];
    component.filteringTerritory = country;
    expect(component.subordinateTerritoryLevels).toEqual([COUNTRY, CITY]);

    component.filteringTerritory = null;
    expect(component.subordinateTerritoryLevels).toEqual([CONTINENT, SUBCONTINENT, COUNTRY, CITY]);
  });

  it('should have a list of measure names.', () => {
    component.data$.next(mockData);
    expect(component.measureNames).toEqual(['activeUsers']);
  });
});
