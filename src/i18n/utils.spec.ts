import { getLanguage, Language, setLanguage, t, tA11y } from './utils';
import { AUDIFICATION, GUIDE_DOGE } from './types';

describe('I18n', () => {
  it('should correctly set and get a language.', () => {
    const languages: Language[] = ['en', 'ko'];
    for (const lang of languages) {
      setLanguage(lang);
      expect(getLanguage()).toBe(lang);
    }
  });

  it('should provide a text in the configured language.', () => {
    setLanguage('en');
    expect(t(GUIDE_DOGE.VISUALIZATION)).toBe('Data visualization');
    setLanguage('ko');
    expect(t(GUIDE_DOGE.VISUALIZATION)).toBe('데이터 시각화');
  });

  it('should provide a screen-reader friendly text.', () => {
    expect(t(AUDIFICATION.INSTRUCTIONS).includes('<kbd>')).toBeTrue();
    expect(tA11y(AUDIFICATION.INSTRUCTIONS).includes('<kbd>')).toBeFalse();
  });
});
