import { LineChartQuery, LineChartStyle, XYPoint } from '../types';
import { inOneOfDateRanges } from '../../models/data-cube/filters';
import { DAY } from '../../utils/timeUnits';
import { DataCube } from '../../models/data-cube/data-cube.model';

type LegendItem = {
  label: string;
  measureName: string;
  periodOffset?: number;
  windowSize?: number;
  style: Partial<LineChartStyle>;
};

export function createTimeSeriesQuery(dataCube: DataCube, legendItems: LegendItem[]): LineChartQuery {
  return options => {
    const [startDate, endDate] = options.range;
    const measureNames = [...new Set(legendItems.map(item => item.measureName))];

    const windowSizes = legendItems.map(item => item.windowSize).filter(((v): v is number => v !== undefined));
    const periodOffsets = legendItems.map(item => item.periodOffset).filter(((v): v is number => v !== undefined));

    const dateCategoryName = 'date';
    const duration = endDate.getTime() - startDate.getTime();
    const maxWindowSize = Math.max(0, ...windowSizes);
    const dateRanges: [Date, Date][] = [0, ...periodOffsets].map(periodOffset => {
      const periodStart = startDate.getTime() + periodOffset;
      const rangeStartDate = new Date(periodStart - maxWindowSize);
      const rangeEndDate = new Date(periodStart + duration);
      return [rangeStartDate, rangeEndDate];
    });
    const dateFilter = inOneOfDateRanges(dateRanges, { excludeStart: true });

    const rows = dataCube.getDataFor({
      categoryNames: [dateCategoryName],
      measureNames,
      filters: [dateFilter],
      sortBy: [dateCategoryName],
    });

    return legendItems.map(item => {
      const {
        label,
        measureName,
        periodOffset = 0,
        windowSize = DAY,
      } = item;

      const rawPoints: XYPoint<Date, number>[] = rows.map(row => ({
        x: row.categories.date,
        y: row.values[measureName],
      }));

      const periodStart = startDate.getTime() + periodOffset;
      const periodEnd = endDate.getTime() + periodOffset;
      const periodPoints = rawPoints.filter(point => {
        const time = point.x.getTime();
        return periodStart < time && time <= periodEnd;
      });

      const [headPoint, ...tailPoints] = periodPoints;

      const points: XYPoint<Date, number>[] = [];

      // pre-calculate the sum of the window for the very first datum
      const windowStart = headPoint.x.getTime() - windowSize;
      let startIndex = rawPoints.findIndex(point => windowStart < point.x.getTime());
      let endIndex = rawPoints.indexOf(headPoint);
      let sum = rawPoints
        .slice(startIndex, endIndex + 1)
        .reduce((acc, point) => acc + point.y, 0);
      points.push({
        x: headPoint.x,
        y: sum,
      });

      // slide the window for the rest of the data
      for (const point of tailPoints) {
        sum += rawPoints[++endIndex].y;
        sum -= rawPoints[startIndex++].y;
        points.push({
          x: point.x,
          y: sum,
        });
      }

      return {
        points,
        label,
      };
    });
  };
}
