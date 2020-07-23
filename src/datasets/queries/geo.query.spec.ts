import { generateCube } from '../../models/data-cube/generation';
import { Category } from '../../models/data-cube/types';
import { activeUserMeasure, eventCountMeasure, revenueMeasure } from '../../models/data-cube/presets';
import { createGeoQuery, GeoQuery, TerritoryLevel } from './geo.query';
import { DAY } from '../../utils/timeUnits';
import { World } from '../geo.types';
import { fetchWorld } from '../geo.dataset';

describe('GeoQuery', () => {
  let geoQuery: GeoQuery;
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * DAY);
  let world: World;

  beforeEach(async () => {
    world = await fetchWorld();
    const cityCategory: Category = {
      name: 'city',
      values: Object.entries(world.cities).map(([cityId, city]) => ({
        name: cityId,
        weight: city.population,
      })),
    };
    const categories = [cityCategory];
    const measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];
    const dataCube = generateCube(categories, measures);
    const measureNames = measures.map(measure => measure.name);
    geoQuery = createGeoQuery(dataCube, measureNames, world.cities);
  });

  describe('should query geo data in the following unit:', () => {
    it('City', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        unit: TerritoryLevel.CITY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.territory.id in world.cities)).toBeTrue();
    });

    it('Country', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        unit: TerritoryLevel.COUNTRY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.territory.id in world.countries)).toBeTrue();
    });

    it('Subcontinent', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        unit: TerritoryLevel.SUBCONTINENT,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.territory.id in world.subcontinents)).toBeTrue();
    });

    it('Continent', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        unit: TerritoryLevel.CONTINENT,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.territory.id in world.continents)).toBeTrue();
    });
  });

  describe('should filter with the following territory:', () => {
    it('Atlanta (City)', () => {
      const atlantaCityId = '1840013660';
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: {
          level: TerritoryLevel.CITY,
          id: atlantaCityId,
        },
        unit: TerritoryLevel.CITY,
      });
      expect(geoData[0].territory.id).toBe(atlantaCityId);
    });

    it('South Korea (Country)', () => {
      const southKoreaCountryId = '410';
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: {
          level: TerritoryLevel.COUNTRY,
          id: southKoreaCountryId,
        },
        unit: TerritoryLevel.CITY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => world.cities[geoDatum.territory.id].countryId === southKoreaCountryId)).toBeTrue();
    });

    it('Eastern Europe (Subcontinent)', () => {
      const easternEuropeSubcontinentId = '151';
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: {
          level: TerritoryLevel.SUBCONTINENT,
          id: easternEuropeSubcontinentId,
        },
        unit: TerritoryLevel.CITY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => world.cities[geoDatum.territory.id].subcontinentId === easternEuropeSubcontinentId)).toBeTrue();
    });

    it('Oceania (Continent)', () => {
      const oceaniaContinentId = '009';
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: {
          level: TerritoryLevel.CONTINENT,
          id: oceaniaContinentId,
        },
        unit: TerritoryLevel.CITY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => world.cities[geoDatum.territory.id].continentId === oceaniaContinentId)).toBeTrue();
    });
  });
});
