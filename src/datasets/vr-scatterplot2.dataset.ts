import { Dataset } from './types';
import {
  activeUserMeasure,
  browserCategory,
  countryCategory,
  eventCountMeasure,
  revenueMeasure,
  sourceCategory,
} from '../models/data-cube/presets';
import { generateCube } from '../models/data-cube/generation';
import { createVRQuery } from './queries/vr2.query';
import { createVRScatterplotMeta } from './metas/vr-scatter-plot.meta';
import { PreferenceMeta } from '../services/preference/types';
import { createDefault } from '../utils/preferences';
// tslint:disable-next-line
export interface Config{}
export const configMeta: PreferenceMeta<Config> = {};

export function create(config: Config): Dataset {
  const categories = [countryCategory, browserCategory, sourceCategory];
  const measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];

  const defaultConfig = createDefault(configMeta);
  const dataCube = generateCube(categories, measures, {
    ...defaultConfig,
    ...config,
  });


  const vrScatterplotMeta = createVRScatterplotMeta(
      'VR Scatterplot 2',
      createVRQuery(dataCube, [{
          labels: ['Active User', 'Revenue', 'Event Count'],
          measureNames: ['activeUsers', 'revenue', 'eventCount'],
      }])
  );
  const metas = [
    vrScatterplotMeta
  ];

  return {
    metas,
    dataCube,
  };
}
