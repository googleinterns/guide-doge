import { AUDIFICATION, GUIDE_DOGE, I18n, VISUALIZATION } from '../types';

export const en: I18n = {
  [GUIDE_DOGE.TITLE]: 'Guide-Doge',
  [GUIDE_DOGE.VISUALIZATION]: 'Data visualization',
  [GUIDE_DOGE.AUDIFICATION]: 'Data audification',

  [VISUALIZATION.ACTIVE_DATUM]: '%(y)s on %(x)s',

  [AUDIFICATION.INSTRUCTIONS]: [
    'Hold down <kbd>SPACE</kbd> to play the audified melody and <kbd>SHIFT</kbd> + <kbd>SPACE</kbd> to play it backward.',
    'Press <kbd>X</kbd> or <kbd>Y</kbd> to read out the domain or range respectively.',
    'Press <kbd>L</kbd> to read out the legend items.',
    'Press <kbd>0</kbd> ... <kbd>9</kbd> to move playhead.',
  ].join(' <br/>'),
  [AUDIFICATION.DOMAIN]: 'Domain from %(min)s to %(max)s',
  [AUDIFICATION.RANGE]: 'Range from %(min)s to %(max)s',
  [AUDIFICATION.ACTIVE_DATUM]: '%(y)s on %(x)s',
};
