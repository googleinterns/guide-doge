import * as d3 from 'd3';
import { TerritoryLevel } from '../datasets/geo.types';

export const formatX = d3.timeFormat('%B %d');

export const formatY = (value: number) => Number.isInteger(value) ? `${value}` : value.toFixed(1);

export const humanizeMeasureName = (str: string) => str
  .replace(/([A-Z])/g, ' $1')
  .replace(/^./, firstCharacter => firstCharacter.toUpperCase());

export const humanizeTerritoryLevel = (level: TerritoryLevel) => {
  // TODO: i18n
  return [
    'Continent',
    'Subcontinent',
    'Country',
    'City',
  ][level];
};
