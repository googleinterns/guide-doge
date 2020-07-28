import { generateCube } from '../../models/data-cube/generation';
import { activeUserMeasure, eventCountMeasure, revenueMeasure, browserCategory, sourceCategory, countryCategory } from '../../models/data-cube/presets';
import { LegendItem, createVRQuery, createVRData } from './vr.query';

describe('VRQuery', () => {
    it('Test VRQuery', () => {
      const categories = [browserCategory, countryCategory, sourceCategory];
      const measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];
      const dataCube = generateCube(categories, measures);
      const VRQuery = createVRQuery(dataCube, [{
        labels: ['Active User', 'Revenue', 'Event Count'],
        measureNames: ['activeUsers', 'revenue', 'eventCount'],
    }]);
      expect(VRQuery !== null && VRQuery !== undefined  ).toBeTrue();
    });
    it('Test CreateVRData with 1 Measure/2 Category', () => {
      const categories = [browserCategory, countryCategory];
      const measures = [activeUserMeasure];
      const dataCube = generateCube(categories, measures);
      const rows = dataCube.getDataFor({
        categoryNames: ['browser', 'country'],
        measureNames: ['activeUsers'],
      });
      const VRData = createVRData(rows, ({
        labels: ['Active User'],
        measureNames: ['activeUsers'],
      } as LegendItem));
      expect(VRData.labels.length === measures.length).toBe(true);
        // there should be a point for each unique intersection of categories
      expect(VRData.points.length === browserCategory.values.length * countryCategory.values.length).toBe(true);
    });
    it('Test CreateVRData with 3 Measures/3 Categories', () => {
      const categories = [browserCategory, countryCategory, sourceCategory];
      const measures = [activeUserMeasure, revenueMeasure, eventCountMeasure];
      const dataCube = generateCube(categories, measures);
      const rows = dataCube.getDataFor({
        categoryNames: ['browser', 'country', 'source'],
        measureNames: ['activeUsers', 'revenue', 'eventCount'],
      });
      const VRData = createVRData(rows, {
        labels: ['Active User', 'Revenue', 'Event Count'],
        measureNames: ['activeUsers', 'revenue', 'eventCount'],
      } as LegendItem);
      expect(VRData.labels.length === measures.length).toBe(true);
      // there should be a point for each unique intersection of categories
      expect(VRData.points.length ===
        browserCategory.values.length * countryCategory.values.length * sourceCategory.values.length)
        .toBe(true);
    });
  });
