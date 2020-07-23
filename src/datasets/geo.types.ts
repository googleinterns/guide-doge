import { GeometryCollection, MultiPolygon, Polygon, Topology } from 'topojson-specification';

interface RawCity {
  id: string;
  name: string;
  lat: number;
  lng: number;
  population: number;
}

interface RawCountry {
  id: string;
  name: string;
  cities: Record<string, RawCity>;
  geometry?: Polygon | MultiPolygon;
}

interface RawSubcontinent {
  id: string;
  name: string;
  countries: Record<string, RawCountry>;
}

interface RawContinent {
  id: string;
  name: string;
  subcontinents: Record<string, RawSubcontinent>;
}

interface RawWorld {
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
}

export interface Continent extends RawContinent {
  subcontinents: Record<string, Subcontinent>;
}

export interface World extends RawWorld {
  continents: Record<string, Continent>;
  subcontinents: Record<string, Subcontinent>;
  countries: Record<string, Country>;
  cities: Record<string, City>;
}
