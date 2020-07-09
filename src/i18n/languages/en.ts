import {
  AUDIFICATION,
  AUDIFICATION_PREFERENCE,
  DATA_PREFERENCE,
  DATA_TABLE_PREFERENCE,
  GUIDE_DOGE,
  I18n,
  TEXT_SUMMARY_PREFERENCE,
} from '../types';

export const en: I18n = {
  [GUIDE_DOGE.TITLE]: 'Guide-Doge',
  [GUIDE_DOGE.VISUALIZATION]: 'Data visualization',
  [GUIDE_DOGE.AUDIFICATION]: 'Data audification',

  [AUDIFICATION.INSTRUCTIONS]: [
    'Hold down <kbd>SPACE</kbd> to play the audified melody and <kbd>SHIFT</kbd> + <kbd>SPACE</kbd> to play it backward.',
    'Press <kbd>X</kbd> or <kbd>Y</kbd> to read out the domain or range respectively.',
    'Press <kbd>L</kbd> to read out the legend items.',
    'Press <kbd>UP</kbd> or <kbd>DOWN</kbd> to switch among the legend items.',
    'Press <kbd>0</kbd> ... <kbd>9</kbd> to move playhead.',
  ].join(' <br/>'),
  [AUDIFICATION.DOMAIN]: 'Domain from %(min)s to %(max)s.',
  [AUDIFICATION.RANGE]: 'Range from %(min)s to %(max)s.',
  [AUDIFICATION.ACTIVE_POINT]: '%(y)s on %(x)s.',
  [AUDIFICATION.CURRENT_LEGEND_ITEM]: [
    `The current legend item is '%(label)s'.`,
    'Domain from %(domain_min)s to %(domain_max)s.',
    'Range from %(range_min)s to %(range_max)s.',
    'Press <kbd>?</kbd> to read out the instructions.',
  ].join(' <br/>'),

  [DATA_PREFERENCE.enabled]: 'Data Generator',
  [DATA_PREFERENCE.name]: 'Dataset',
  [DATA_PREFERENCE.avgHits]: 'Average Hits',
  [DATA_PREFERENCE.hitStdDev]: 'Hit Std',
  [DATA_PREFERENCE.avgUsers]: 'Average Users',
  [DATA_PREFERENCE.userStdDev]: 'User Std',
  [DATA_PREFERENCE.avgSessionsPerUser]: 'Average Sessions Per User',
  [DATA_PREFERENCE.sessionsPerUserStdDev]: 'Sessions Per User Std',
  [DATA_PREFERENCE.offset]: 'Offset',

  [AUDIFICATION_PREFERENCE.enabled]: 'Audification',
  [AUDIFICATION_PREFERENCE.lowestPitch]: 'Lowest note (Hz)',
  [AUDIFICATION_PREFERENCE.highestPitch]: 'Highest note (Hz)',
  [AUDIFICATION_PREFERENCE.noteDuration]: 'Note duration (ms)',
  [AUDIFICATION_PREFERENCE.readAfter]: 'Read out before playing',
  [AUDIFICATION_PREFERENCE.readBefore]: 'Read out after playing',

  [DATA_TABLE_PREFERENCE.enabled]: 'Data Table',

  [TEXT_SUMMARY_PREFERENCE.enabled]: 'Text Summary',
};
