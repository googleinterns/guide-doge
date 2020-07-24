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

interface BaseTerritory<Parent, Child, Level extends TerritoryLevel> {
  level: Level;
  id: string;
  parent: Parent;
  children: Record<string, Child>;
  name: string;
}

export interface City extends BaseTerritory<Country, null, TerritoryLevel.CITY> {
  lat: number;
  lng: number;
  population: number;
}

export interface Country extends BaseTerritory<Subcontinent, City, TerritoryLevel.COUNTRY> {
  geometry: Polygon | MultiPolygon | null;
}

export interface Subcontinent extends BaseTerritory<Continent, Country, TerritoryLevel.SUBCONTINENT> {
  geometry: MultiPolygon | null;
}

export interface Continent extends BaseTerritory<null, Subcontinent, TerritoryLevel.CONTINENT> {
  geometry: MultiPolygon | null;
}

export type Territory = Continent | Subcontinent | Country | City;

export interface World {
  [TerritoryLevel.CONTINENT]: Record<string, Continent>;
  [TerritoryLevel.SUBCONTINENT]: Record<string, Subcontinent>;
  [TerritoryLevel.COUNTRY]: Record<string, Country>;
  [TerritoryLevel.CITY]: Record<string, City>;
  topology: Topology<{ land: GeometryCollection }>;
}
