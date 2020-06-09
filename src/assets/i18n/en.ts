import { AUDIFICATION, GUIDE_DOGE, I18n, VISUALIZATION } from './types';

const en: I18n = {
  [GUIDE_DOGE.TITLE]: 'Guide-Doge',
  [GUIDE_DOGE.VISUALIZATION]: 'Data visualization',
  [GUIDE_DOGE.AUDIFICATION]: 'Data audification',

  [VISUALIZATION.ACTIVE_DATUM]: '%(y)s on %(x)s',

  [AUDIFICATION.INSTRUCTIONS]: 'Hold down <kbd>SPACE</kbd> to play audification and <kbd>SHIFT</kbd> + <kbd>SPACE</kbd> to play it backward. <br/>Press <kbd>X</kbd> or <kbd>Y</kbd> to read the domain and range. <br/>Press <kbd>0</kbd> ... <kbd>9</kbd> to move playhead.',
  [AUDIFICATION.DOMAIN]: 'Domain from %(min)s to %(max)s',
  [AUDIFICATION.RANGE]: 'Range from %(min)s to %(max)s',
  [AUDIFICATION.ACTIVE_DATUM]: '%(y)s on %(x)s',
};

export default en;
