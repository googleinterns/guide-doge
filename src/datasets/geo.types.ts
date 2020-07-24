import { GeometryCollection, MultiPolygon, Polygon, Topology } from 'topojson-specification';
import { TerritoryLevel } from './queries/geo.query';

interface RawCity {
  name: string;
  lat: number;
  lng: number;
  population: number;
}

interface RawCountry {
  name: string;
  cities: Record<string, RawCity>;
  geometry: Polygon | MultiPolygon | null;
}

interface RawSubcontinent {
  name: string;
  countries: Record<string, RawCountry>;
}

interface RawContinent {
  name: string;
  subcontinents: Record<string, RawSubcontinent>;
}

export interface RawWorld {
  continents: Record<string, RawContinent>;
  topology: Topology<{ land: GeometryCollection }>;
}

export interface City extends RawCity {
  countryId: string;
  subcontinentId: string;
  continentId: string;
}

export interface Country extends RawCountry {
  subcontinentId: string;
  continentId: string;
  cities: Record<string, City>;
}

export interface Subcontinent extends RawSubcontinent {
  continentId: string;
  countries: Record<string, Country>;
  geometry: MultiPolygon | null;
}

export interface Continent extends RawContinent {
  subcontinents: Record<string, Subcontinent>;
  geometry: MultiPolygon | null;
}

export type TerritoryObject = Continent | Subcontinent | Country | City;

export interface World {
  [TerritoryLevel.CONTINENT]: Record<string, Continent>;
  [TerritoryLevel.SUBCONTINENT]: Record<string, Subcontinent>;
  [TerritoryLevel.COUNTRY]: Record<string, Country>;
  [TerritoryLevel.CITY]: Record<string, City>;
  topology: Topology<{ land: GeometryCollection }>;
}
