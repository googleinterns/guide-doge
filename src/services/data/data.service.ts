import { DateTime } from 'luxon';
import {
  activeUserMeasure,
  browserCategory,
  countryCategory,
  eventCountMeasure,
  revenueMeasure,
  sourceCategory,
} from '../../models/data-cube/presets';
import { betweenDates } from '../../models/data-cube/filters';
import { generateCube } from 'src/models/data-cube/generation';
import { Datum } from '../../d3/xy-chart.d3';

export class DataService {
  private dataCube = generateCube(
    [countryCategory, browserCategory, sourceCategory],
    [activeUserMeasure, revenueMeasure, eventCountMeasure],
    {
      avgHits: 10000,
      hitStdDev: 100,
      avgUsers: 100,
      userStdDev: 1,
      avgSessionsPerUser: 5,
      sessionsPerUserStdDev: 3,
    },
  );

  getMeasureOverDays(measureName: string, days = 30): Datum[] {
    const categoryName = 'nthDay';
    const endDate = DateTime.local();
    const startDate = endDate.minus({ day: days });

    return this.dataCube
      .getDataFor(
        [categoryName],
        [measureName],
        [betweenDates(startDate.toJSDate(), endDate.toJSDate(), { excludeStartDate: true })],
      )
      .map(row => ({
        date: startDate
          .plus({ days: row.categories.get(categoryName) as number })
          .toJSDate(),
        value: row.values.get(measureName)!,
      }));
  }
}
