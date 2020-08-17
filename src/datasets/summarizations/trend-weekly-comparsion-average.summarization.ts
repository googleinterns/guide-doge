
import { Summary } from './types';
import { TimeSeriesPoint } from '../metas/types';
import { cacheSummaries } from './utils/commons';
import {
  groupPointsByXWeek,
} from './utils/time-series';
import { formatY } from '../../utils/formatters';

export function queryFactory(points: TimeSeriesPoint[]) {
  return cacheSummaries(() => {
    // Only consider weeks with more than 3 days when creating summaries
    // Weeks with 3 days or less are considered to belong to last/next 30 days
    const weekPointArrays = groupPointsByXWeek(points).filter(weekPoints => weekPoints.length >= 4);
    const nWeeks = weekPointArrays.length;

    const weekAverages = weekPointArrays.map(weekPoints => weekPoints.reduce((p, { y }) => p + y, 0) / weekPoints.length);

    const ordinalTexts = ['first', 'second', 'third', 'fourth', 'fifth'];

    const summaries: Summary[] = [];

    for (let i = 0; i < nWeeks - 1; i++) {
      const percentageIncrease = (weekAverages[i + 1] - weekAverages[i]) / weekAverages[i] * 100;
      const percentageChangeDescriptor = percentageIncrease >= 0 ? 'more' : 'less';
      const percentageIncreaseAbsolute = Math.abs(percentageIncrease);
      const percentageChangeText = percentageIncreaseAbsolute > 5
        ? `${formatY(percentageIncreaseAbsolute)}% ${percentageChangeDescriptor} than`
        : 'similar to';

      const text = `The average active users of the <b>${ordinalTexts[i + 1]} week</b> was <b>${percentageChangeText}</b> the <b>${ordinalTexts[i]} week</b>.`;

      summaries.push({
        text,
        validity: 1.0,
      });
    }

    return summaries;
  });
}
