import { BehaviorSubject, combineLatest, Observable, ObservedValueOf } from 'rxjs';
import { map } from 'rxjs/operators';

type ObservableDictionary = { [key: string]: Observable<any> };
type ObservedDictionaryOf<T extends ObservableDictionary> = { [key in keyof T]: ObservedValueOf<T[key]> };

export class PreferenceService {
  audification = { // mimic namespace
    enabled: new BehaviorSubject(true),
    lowestPitch: new BehaviorSubject(256),
    highestPitch: new BehaviorSubject(1024),
    noteDuration: new BehaviorSubject(167),
    readBefore: new BehaviorSubject(false),
    readAfter: new BehaviorSubject(true),
  };
  audification$ = this.combineObservableDictionary(this.audification);

  dataTable = {
    enabled$: new BehaviorSubject(false),
  };
  datatable$ = this.combineObservableDictionary(this.dataTable);

  textSummary = {
    enabled$: new BehaviorSubject(false),
  };
  textSummary$ = this.combineObservableDictionary(this.textSummary);

  /**
   * Creates a combined Observable that emits a dictionary of observed values.
   *
   * @param observableDictionary a dictionary of observable values
   * @return a combined Observable
   *
   * @example
   * // returns an observable of type Observable<{a: boolean, b: number}>
   * const combined$ = this.combineObservableDictionary({a: new Subject<boolean>(), b: new Subject<number>>});
   */
  private combineObservableDictionary<T extends ObservableDictionary>(observableDictionary: T): Observable<ObservedDictionaryOf<T>> {
    const keys = Object.keys(observableDictionary);
    const subjects = Object.values(observableDictionary);
    return combineLatest(subjects)
      .pipe(map(values => {
        const observedDictionary: any = {}; // will be of type ObservedDictionaryOf<T> after the iteration below
        values.forEach((value, i) => {
          const key = keys[i];
          observedDictionary[key] = value;
        });
        return observedDictionary;
      }));
  }
}
