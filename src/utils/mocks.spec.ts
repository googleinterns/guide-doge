import { AudificationPreference, Preference } from '../services/preference/types';
import { TimeSeriesPoint } from '../datasets/queries/time-series.query';
import { activeUserMeasure } from '../models/data-cube/presets';

export const mockPreference: Preference = {
  enabled: false,
};

export const mockAudificationPreference: AudificationPreference = {
  ...mockPreference,
  highestPitch: 0,
  lowestPitch: 0,
  noteDuration: 0,
  readAfter: false,
  readBefore: false,
};

export const mockDatum: TimeSeriesPoint = {
  x: new Date(),
  y: 0,
};

export const mockMeasureName = activeUserMeasure.name;
