import * as UserSessionsTimeDataset from './user-sessions-time.dataset';
import * as UserWhiteNoiseDataset from './user-white-noise.dataset';
import * as GADashboardDataset from './ga-dashboard';
import * as GeoDataset from './geo.dataset';
import * as DummyDataset from './dummy.dataset';
import * as VRScatterplotDataset from './vr-scatterplot.dataset';
import * as VRScatterplot2Dataset from './vr-scatterplot2.dataset';
import * as UserSessionsCategoryDataset from './user-sessions-category.dataset';
import * as UserWorkdayHolidayDataset from './user-workday-holiday.dataset';
import * as UserWorkdayHolidayLinearDataset from './user-workday-holiday-linear.dataset';


export const datasets = {
  UserWhiteNoise: UserWhiteNoiseDataset,
  GoogleAnalyticsDashboard: GADashboardDataset,
  UserSessionsTime: UserSessionsTimeDataset,
  UserSessionsCategory: UserSessionsCategoryDataset,
  Geo: GeoDataset,
  UserWorkdayHoliday: UserWorkdayHolidayDataset,
  UserWorkdayHolidayLinear: UserWorkdayHolidayLinearDataset,
  Dummy: DummyDataset,
  VRScatterplot: VRScatterplotDataset,
  VRScatterplot2: VRScatterplot2Dataset
};
