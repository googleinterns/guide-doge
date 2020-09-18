import * as UserWhiteNoiseDataset from './user-white-noise.dataset';
import * as GeoDataset from './geo.dataset';
import * as DummyDataset from './dummy.dataset';
import * as VRScatterplotDataset from './vr-scatterplot.dataset';
import * as VRScatterplot2Dataset from './vr-scatterplot2.dataset';
import * as UserSessionsDataset from './user-sessions.dataset';
import * as UserWorkdayHolidayDataset from './user-workday-holiday.dataset';
import * as UserWorkdayHolidayLinearDataset from './user-workday-holiday-linear.dataset';
import * as CategoryUserSessionsDataset from './category-user-sessions.dataset';
import * as TimeActiveUsersDataset from './time-active-users.dataset';
import * as GADashBoardDataset from './ga-dashboard.dataset';

export const datasets = {
  UserWhiteNoise: UserWhiteNoiseDataset,
  Geo: GeoDataset,
  GoogleAnalyticsDashboard: GADashBoardDataset,
  TimeActiveUsers: TimeActiveUsersDataset,
  CategoryUserSessions: CategoryUserSessionsDataset,
  UserSessions: UserSessionsDataset,
  UserWorkdayHoliday: UserWorkdayHolidayDataset,
  UserWorkdayHolidayLinear: UserWorkdayHolidayLinearDataset,
  Dummy: DummyDataset,
  VRScatterplot : VRScatterplotDataset,
  VRScatterplot2: VRScatterplot2Dataset
};
