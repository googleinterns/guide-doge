import {ElementSelection, RenderOptions} from '../visualizations/types';
import {Visualization} from '../visualizations/Visualization';

export abstract class Experiment {
  protected constructor(protected visualization: Visualization) {}

  render(renderOptions?: Partial<RenderOptions>): ElementSelection {
    return this.visualization.render(renderOptions);
  }
}
