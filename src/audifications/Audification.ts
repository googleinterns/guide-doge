import {Visualization} from '../visualizations/Visualization';

export class Audification {
  constructor(protected visualization: Visualization) {
  }

  get data() {
    return this.visualization.data;
  }
}