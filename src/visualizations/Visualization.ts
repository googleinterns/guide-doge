import {RenderOptions, SVGSelection} from './types';
import {DataCube} from '../datagen/DataCube';

export abstract class Visualization {
  static defaultRenderOptions: RenderOptions = {
    height: 500,
    width: 800,
    marginTop: 20,
    marginRight: 30,
    marginBottom: 30,
    marginLeft: 40,
  };

  protected constructor(protected dataCube: DataCube) {}

  abstract render(renderOptions?: Partial<RenderOptions>): SVGSelection;
}
