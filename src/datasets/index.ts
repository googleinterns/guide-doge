import * as UserWhiteNoiseDataset from './user-white-noise.dataset';
import * as DummyDataset from './dummy.dataset';
import * as UserWorkdayHolidayDataset from './user-workday-holiday.dataset';
import * as UserWorkdayHolidayExpDataset from './user-workday-holiday-exp.dataset';
import * as UserWorkdayHolidayLinearDataset from './user-workday-holiday-linear.dataset';

export const datasets = {
  UserWhiteNoise: UserWhiteNoiseDataset,
  UserWorkdayHoliday: UserWorkdayHolidayDataset,
  UserWorkdayHolidayExp: UserWorkdayHolidayExpDataset,
  UserWorkdayHolidayLinear: UserWorkdayHolidayLinearDataset,
  Dummy: DummyDataset,
};
