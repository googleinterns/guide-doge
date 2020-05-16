import {DataCube} from '../datagen/DataCube';
import {betweenDates} from '../datagen/filters';
import {Datum, RenderOptions, SVGSelection} from './types';
import {DateTime} from 'luxon';

export abstract class Visualization {
  static defaultRenderOptions: RenderOptions = {
    height: 500,
    width: 800,
    marginTop: 20,
    marginRight: 30,
    marginBottom: 30,
    marginLeft: 40,
  };

  public data: Datum[];

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

  abstract render(renderOptions?: Partial<RenderOptions>): SVGSelection;
}
