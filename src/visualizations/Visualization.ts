import {DateTime} from 'luxon';
import {DataCube} from '../datagen/DataCube';
import {betweenDates} from '../datagen/filters';

export interface Datum {
  date: Date;
  value: number;
}

export abstract class Visualization {
  protected data: Datum[];

  constructor(cube: DataCube, day = 30) {
    const endDate = DateTime.local();
    const startDate = endDate.minus({day});

    this.data = cube
      .getDataFor(
        ['nthDay'],
        ['activeUsers'],
        [betweenDates(startDate.toJSDate(), endDate.toJSDate())]
      )
      .map(datum => ({
        date: startDate
          .plus({days: datum.categories.get('nthDay') as number})
          .toJSDate(),
        value: datum.values.get('activeUsers')!,
      }));
  }

  abstract async render(): Promise<Element>;
}
