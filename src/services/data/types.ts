import { Observable } from 'rxjs';
import { Filter } from '../../models/data-cube/types';

export interface DataQueryOptions {
  categoryNames$?: Observable<string[]>;
  measureNames$?: Observable<string[]>;
  filters$?: Observable<Filter[]>;
  sortBy$?: Observable<string[]>;
}

export interface TimeSeriesQueryOptions extends DataQueryOptions {
  dateRange$: Observable<[Date, Date]>;
}
