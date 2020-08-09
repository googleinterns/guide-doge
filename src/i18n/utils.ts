import { sprintf } from 'sprintf-js';
import * as striptags from 'striptags';
import * as dictionary from './languages';
import { I18nKey, PUNCTUATION } from './types';

export type Language = keyof typeof dictionary;

let language: Language = 'en';

export function setLanguage(lang: Language) {
  language = lang;
}

export function getLanguage() {
  return language;
}

/**
 * Returns a formatted i18n string using sprintf-js.
 *
 * @param key The key of an i18n string.
 * @param args The arguments to format the string with.
 */
export function t(key: I18nKey, ...args: any[]) {
  return sprintf(dictionary[language][key], ...args);
}

/**
 * Returns a screen-reader friendly formatted i18n string using sprintf-js.
 *
 * @param key The key of an i18n string.
 * @param args The arguments to format the string with.
 */
export function tA11y(key: I18nKey, ...args: any[]) {
  return striptags(
    t(key, ...args)
      .replace(/\.{3}/g, 'to')
      .replace(/<kbd>(\S+)<\/kbd>/g, `'$1'`)
      .replace(/'\?'/g, `'${t(PUNCTUATION.QUESTION_MARK)}'`)
      .replace(/'\/'/g, `'${t(PUNCTUATION.SLASH)}'`)
      .replace(/'\+'/g, `'${t(PUNCTUATION.PLUS)}'`)
      .replace(/'-'/g, `'${t(PUNCTUATION.HYPHEN)}'`),
  );
}
