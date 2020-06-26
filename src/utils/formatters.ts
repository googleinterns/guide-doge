import * as d3 from 'd3';
import { HumanizeDuration, HumanizeDurationLanguage } from 'humanize-duration-ts';
import { DAY, MONTH, WEEK, YEAR } from './timeUnits';

export const formatX = d3.timeFormat('%B %d');

export const formatY = (value: number) => Number.isInteger(value) ? value : value.toFixed(1);

export const humanizeMeasureName = (str: string) => str
  .replace(/([A-Z])/g, ' $1')
  .replace(/^./, firstCharacter => firstCharacter.toUpperCase());

const humanizer = new HumanizeDuration(new HumanizeDurationLanguage());
export const humanizeDuration = (duration: number) => humanizer.humanize(duration, {
  unitMeasures: {
    y: YEAR,
    mo: MONTH,
    w: WEEK,
    d: DAY,
  },
});
