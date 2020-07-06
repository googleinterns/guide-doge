import { PreferenceMeta, PreferenceItemMeta } from '../services/preference/types';

export function createDefault<T>(meta: PreferenceMeta<T>): T {
  const entries = Object.entries(meta) as [keyof T, PreferenceItemMeta][];
  return entries.reduce((obj, [key, { defaultValue }]) => {
    obj[key] = defaultValue as any;
    return obj;
  }, {} as T);
}
