import { BehaviorSubject } from 'rxjs';

export type PreferenceKey = keyof PreferencesService;

export class PreferencesService {
  audification = new BehaviorSubject(true);
  'audification.lowestPitch' = new BehaviorSubject(256);
  'audification.highestPitch' = new BehaviorSubject(1024);
  'audification.noteDuration' = new BehaviorSubject(167);
  'audification.readBefore' = new BehaviorSubject(false);
  'audification.readAfter' = new BehaviorSubject(true);
  dataTable = new BehaviorSubject(false);
  textSummary = new BehaviorSubject(false);
}
