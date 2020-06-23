import { BehaviorSubject } from 'rxjs';
import { AudificationPreference, DataTablePreference, TextSummaryPreference } from './types';

export class PreferenceService {
  audification$ = new BehaviorSubject<AudificationPreference>({
    enabled: true,
    lowestPitch: 256,
    highestPitch: 1024,
    noteDuration: 167,
    readBefore: false,
    readAfter: true,
  });

  dataTable$ = new BehaviorSubject<DataTablePreference>({
    enabled: true,
    placeholder: null,
  });

  textSummary$ = new BehaviorSubject<TextSummaryPreference>({
    enabled: true,
    placeholder: null,
  });
}
