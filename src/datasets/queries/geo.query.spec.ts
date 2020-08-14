import { generateCube } from '../../models/data-cube/generation';
import { Category } from '../../models/data-cube/types';
import { activeUserMeasure, eventCountMeasure, revenueMeasure } from '../../models/data-cube/presets';
import { createGeoQuery, GeoQuery } from './geo.query';
import { DAY } from '../../utils/timeUnits';
import { TerritoryLevel, World } from '../geo.types';
import { fetchWorld } from '../geo.dataset';
import { atlantaCityId, easternEuropeSubcontinentId, oceaniaContinentId, southKoreaCountryId } from '../../utils/mocks.spec';

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

describe('GeoQuery', () => {
  let geoQuery: GeoQuery;
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * DAY);
  let world: World;

  beforeEach(async () => {
    world = await fetchWorld();
    const cities = world[CITY];
    const cityCategory: Category = {
      name: 'city',
      values: Object.entries(cities).map(([cityId, city]) => ({
        name: cityId,
        weight: city.population,
      })),
    };
    const categories = [cityCategory];
    const measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];
    const dataCube = generateCube(categories, measures);
    const measureNames = measures.map(measure => measure.name);
    geoQuery = createGeoQuery(dataCube, measureNames, world);
  });

  describe('should query geo data in the following unit:', () => {
    it('City', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: null,
        unit: CITY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.territory.id in world[CITY])).toBeTrue();
    });

    it('Country', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: null,
        unit: COUNTRY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.territory.id in world[COUNTRY])).toBeTrue();
    });

    it('Subcontinent', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: null,
        unit: SUBCONTINENT,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.territory.id in world[SUBCONTINENT])).toBeTrue();
    });

    it('Continent', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: null,
        unit: CONTINENT,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.territory.id in world[CONTINENT])).toBeTrue();
    });
  });

  describe('should filter with the following territory:', () => {
    it('Atlanta (City)', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: world[CITY][atlantaCityId],
        unit: CITY,
      });
      expect(geoData[0].territory.id).toBe(atlantaCityId);
    });

    it('South Korea (Country)', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: world[COUNTRY][southKoreaCountryId],
        unit: CITY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => world[CITY][geoDatum.territory.id].parent.id === southKoreaCountryId)).toBeTrue();
    });

    it('Eastern Europe (Subcontinent)', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: world[SUBCONTINENT][easternEuropeSubcontinentId],
        unit: CITY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => world[CITY][geoDatum.territory.id].parent.parent.id === easternEuropeSubcontinentId))
        .toBeTrue();
    });

    it('Oceania (Continent)', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        territory: world[CONTINENT][oceaniaContinentId],
        unit: CITY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => world[CITY][geoDatum.territory.id].parent.parent.parent.id === oceaniaContinentId)).toBeTrue();
    });
  });
});
