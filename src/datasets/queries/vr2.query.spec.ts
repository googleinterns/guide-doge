import { generateCube } from '../../models/data-cube/generation';
import { activeUserMeasure, eventCountMeasure, revenueMeasure, browserCategory, sourceCategory, countryCategory } from '../../models/data-cube/presets';
import { LegendItem, createVRQuery, createVRData } from './vr2.query';

describe('VRQuery2', () => {
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
        // there should be a point for each unique intersection of categories
      expect(VRData.points.length === 700).toBe(true);
    });
  });
