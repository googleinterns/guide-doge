import { generateCube } from '../../models/data-cube/generation';
import { cities, continentNames, countryNames, subcontinentNames } from '../../assets/cities.json';
import { Category } from '../../models/data-cube/types';
import { activeUserMeasure, eventCountMeasure, revenueMeasure } from '../../models/data-cube/presets';
import { createGeoQuery, GeoQuery, TerritoryLevel } from './geo.query';
import { DAY } from '../../utils/timeUnits';

describe('GeoQuery', () => {
  let geoQuery: GeoQuery;
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * DAY);

  beforeEach(async () => {
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
    geoQuery = createGeoQuery(dataCube, measureNames, cities);
  });

  describe('should query geo data in the following unit:', () => {
    it('City', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        unit: TerritoryLevel.CITY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.id in cities)).toBeTrue();
    });

    it('Country', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        unit: TerritoryLevel.COUNTRY,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.id in countryNames)).toBeTrue();
    });

    it('Subcontinent', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        unit: TerritoryLevel.SUBCONTINENT,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.id in subcontinentNames)).toBeTrue();
    });

    it('Continent', () => {
      const geoData = geoQuery({
        range: [startDate, endDate],
        unit: TerritoryLevel.CONTINENT,
      });
      expect(geoData.length > 0).toBeTrue();
      expect(geoData.every(geoDatum => geoDatum.id in continentNames)).toBeTrue();
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
      expect(geoData[0].id).toBe(atlantaCityId);
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
      expect(geoData.every(geoDatum => cities[geoDatum.id].countryId === southKoreaCountryId)).toBeTrue();
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
      expect(geoData.every(geoDatum => cities[geoDatum.id].subcontinentId === easternEuropeSubcontinentId)).toBeTrue();
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
      expect(geoData.every(geoDatum => cities[geoDatum.id].continentId === oceaniaContinentId)).toBeTrue();
    });
  });
});
