import { I18n } from './types';
import { sprintf } from 'sprintf-js';
import en from './en';
import * as striptags from 'striptags';

type Language = keyof typeof dictionary;

const dictionary = { en };

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
export function t(key: keyof I18n, ...args: any[]) {
  return sprintf(dictionary[language][key], ...args);
}

/**
 * Returns a screen-reader friendly formatted i18n string using sprintf-js.
 *
 * @param key The key of an i18n string.
 * @param args The arguments to format the string with.
 */
export function tA11y(key: keyof I18n, ...args: any[]) {
  return striptags(t(key, ...args));
}