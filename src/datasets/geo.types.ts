import { GeometryCollection, MultiPolygon, Polygon, Topology } from 'topojson-specification';

export interface City {
  id: string;
  countryId: string;
  subcontinentId: string;
  continentId: string;
  name: string;
  lat: number;
  lng: number;
  population: number;
}

export interface Country {
  id: string;
  subcontinentId: string;
  continentId: string;
  name: string;
  cities: Record<string, City>;
  geometry?: Polygon | MultiPolygon;
}

export interface Subcontinent {
  id: string;
  continentId: string;
  name: string;
  countries: Record<string, Country>;
}

export interface Continent {
  id: string;
  name: string;
  subcontinents: Record<string, Subcontinent>;
}

export interface World {
  continents: Record<string, Continent>;
  subcontinents: Record<string, Subcontinent>;
  countries: Record<string, Country>;
  cities: Record<string, City>;
  topology: Topology<{ land: GeometryCollection }>;
}
