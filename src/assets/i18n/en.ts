import { AUDIFICATION, GUIDE_DOGE, I18n, VISUALIZATION } from './types';

const en: I18n = {
  [GUIDE_DOGE.TITLE]: 'Guide-Doge',

  [VISUALIZATION.ACTIVE_DATUM]: '%(y)s on %(x)s',

  [AUDIFICATION.INSTRUCTIONS]: 'Hold down SPACE to play audification and SHIFT + SPACE to play it backward. Press X or Y to read the domain and range. Press 0 to 9 to move playhead.',
  [AUDIFICATION.DOMAIN]: 'Domain from %(min)s to %(max)s',
  [AUDIFICATION.RANGE]: 'Range from %(min)s to %(max)s',
  [AUDIFICATION.ACTIVE_DATUM]: '%(y)s on %(x)s',
};

export default en;
