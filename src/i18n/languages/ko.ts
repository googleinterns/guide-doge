import { AUDIFICATION, GUIDE_DOGE, I18n, VISUALIZATION } from '../types';
import { en } from './en';

export const ko: I18n = {
  ...en,
  [GUIDE_DOGE.TITLE]: 'Guide-Doge',
  [GUIDE_DOGE.VISUALIZATION]: '데이터 시각화',
  [GUIDE_DOGE.AUDIFICATION]: '데이터 청각화',

  [AUDIFICATION.INSTRUCTIONS]: [
    '<kbd>SPACE</kbd>를 눌러 청각화된 음향을 재생하고 <kbd>SHIFT</kbd> + <kbd>SPACE</kbd>를 눌러 거꾸로 재생합니다.',
    '<kbd>X</kbd> 또는 <kbd>Y</kbd>를 눌러 정의역 또는 치역을 읽습니다.',
    '<kbd>L</kbd>을 눌러 범례 항목들을 읽습니다.',
    '<kbd>UP</kbd> 또는 <kbd>DOWN</kbd>을 눌러 범례 항목을 변경합니다.',
    '<kbd>0</kbd> ... <kbd>9</kbd>를 눌러 재생 위치를 이동합니다.',
  ].join(' <br/>'),
  [AUDIFICATION.DOMAIN]: '정의역은 %(domain_min)s 부터 %(domain_max)s 까지이며 한 음표는 %(domain_unit)s을 나타냅니다.',
  [AUDIFICATION.RANGE]: '치역은 %(range_min)s 부터 %(range_max)s 까지입니다.',
  [AUDIFICATION.ACTIVE_POINT]: '%(y)s, %(x)s.',
};
