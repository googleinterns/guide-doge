import {
  AUDIFICATION,
  AUDIFICATION_PREFERENCE,
  DATA_PREFERENCE,
  GEO_MAP_NAVIGATION,
  GEO_MAP_NAVIGATION_PREFERENCE,
  GUIDE_DOGE,
  I18n,
  PUNCTUATION,
  SUMMARIZATION_PREFERENCE,
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
  [AUDIFICATION.DOMAIN]: 'Domain from %(domain_min)s to %(domain_max)s, each note representing %(domain_unit)s.',
  [AUDIFICATION.RANGE]: 'Range from %(range_min)s to %(range_max)s.',
  [AUDIFICATION.ACTIVE_POINT]: '%(y)s on %(x)s.',
  get [AUDIFICATION.CURRENT_LEGEND_ITEM]() {
    return [
      `The current legend item is '%(label)s'.`,
      en[AUDIFICATION.DOMAIN],
      en[AUDIFICATION.RANGE],
    ].join(' <br/>');
  },
  [AUDIFICATION.DOMAIN_UNIT_DAY]: 'a day',
  [AUDIFICATION.BREAK_SILENCE]: 'Press <kbd>?</kbd> to read out the instructions.',

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
  [AUDIFICATION_PREFERENCE.readBefore]: 'Read out before playing',
  [AUDIFICATION_PREFERENCE.readAfter]: 'Read out after playing',

  [GEO_MAP_NAVIGATION_PREFERENCE.enabled]: 'Geo Map Navigation',

  [SUMMARIZATION_PREFERENCE.enabled]: 'Text Summarization',

  [PUNCTUATION.QUESTION_MARK]: 'QUESTION MARK',
  [PUNCTUATION.SLASH]: 'SLASH',
  [PUNCTUATION.PLUS]: 'PLUS',
  [PUNCTUATION.HYPHEN]: 'MINUS',

  [GEO_MAP_NAVIGATION.INSTRUCTIONS]: [
    'Press <kbd>/</kbd> to search a territory name.',
    'Press <kbd>+</kbd> or <kbd>-</kbd> to change the primary dimension.',
    'Press <kbd>ENTER</kbd> to enter the selected subordinate territory.',
    'Press <kbd>SHIFT</kbd> + <kbd>ENTER</kbd> to exit to the superordinate territory.',
    'Press <kbd>UP</kbd> or <kbd>DOWN</kbd> to switch among subordinate territories.',
    'Press <kbd>LEFT</kbd> or <kbd>RIGHT</kbd> to switch among measures.',
  ].join(' <br/>'),
  [GEO_MAP_NAVIGATION.UNIT_AND_FILTERING_TERRITORY]: '%(unit)s in %(hierarchical_territories)s.',
  [GEO_MAP_NAVIGATION.BREAK_SILENCE]: 'Press <kbd>?</kbd> to read out the instructions.',
};
