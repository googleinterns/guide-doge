import { SummarizationDataSourceService } from './summarization-data-source.service';
import { WeekdayWeekendRelativeSummarizationService } from './weekday-weekend-relative.summarization.service';
import { TimeSeriesPoint } from '../../datasets/metas/types';
import { testSummaries, hasHighValidity, hasLowValidity, isTextPartsInSummary, norSummaryFilters } from './utils/tests';


describe('WeekdayWeekendRelativeSummarizationService', () => {
  const points: TimeSeriesPoint[] = [];
  for (let i = 1; i <= 31; i++) {
    points.push({
      x: new Date(2020, 6, i),
      y: i,
    });
  }

  let summarizationDataSourceService: SummarizationDataSourceService;
  let weekdayWeekendRelativeSummarizationService: WeekdayWeekendRelativeSummarizationService;

  beforeEach(() => {
    summarizationDataSourceService = new SummarizationDataSourceService();
    weekdayWeekendRelativeSummarizationService = new WeekdayWeekendRelativeSummarizationService(
      summarizationDataSourceService
    );
  });

  it('should return all combinations of linguistic variables.', done => {
    testSummaries(
      weekdayWeekendRelativeSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        const nQuantifierOptions = 2;
        const nTrafficOptions = 3;
        expect(summaries.length).toBe(nQuantifierOptions * nTrafficOptions);
        done();
      },
    );

  });

  it('should have validity value between 0 and 1.', done => {
    testSummaries(
      weekdayWeekendRelativeSummarizationService,
      summarizationDataSourceService,
      points,
      {},
      summaries => {
        for (const summary of summaries) {
          expect(summary.validity).toBeGreaterThanOrEqual(0.0);
          expect(summary.validity).toBeLessThanOrEqual(1.0);
        }
        done();
      },
    );
  });
});
