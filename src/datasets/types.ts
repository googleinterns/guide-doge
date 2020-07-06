import { Meta } from './metas/types';
import { DataCube } from '../models/data-cube/data-cube.model';

export interface Dataset {
  metas: Meta[];
  dataCube: DataCube;
}
