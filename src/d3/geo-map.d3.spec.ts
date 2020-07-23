import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { GeoMapD3, RenderOptions } from './geo-map.d3';
import { GeoDatum, TerritoryLevel } from '../datasets/queries/geo.query';
import { fetchWorld } from '../datasets/geo.dataset';
import { World } from '../datasets/geo.types';

interface SubjectRenderOptions extends RenderOptions {
  data$: Subject<GeoDatum[]>;
}

describe('GeoMapD3', () => {
  let containerElement: HTMLElement;
  let svgElement: HTMLElement;
  let renderOptions: SubjectRenderOptions;
  let geoMapD3: GeoMapD3;
  let world: World;

  beforeEach(async () => {
    svgElement = document.createElement('svg');
    containerElement = document.createElement('div');
    containerElement.appendChild(svgElement);
    world = await fetchWorld();
    renderOptions = {
      elementRef: new ElementRef<HTMLElement>(containerElement),
      width: 256,
      height: 256,
      world,
      data$: new Subject<GeoDatum[]>(),
    };
    geoMapD3 = new GeoMapD3(renderOptions);
  });

  afterEach(() => {
    geoMapD3.clear();
  });

  it('should instantiate.', () => {
    expect(geoMapD3).toBeInstanceOf(GeoMapD3);
  });

  it('should render the map.', async () => {
    await geoMapD3.render();

    const landElement = svgElement.querySelector('.geo_map-land');
    const boundaryElement = svgElement.querySelector('.geo_map-boundary');

    expect(landElement).toBeTruthy();
    expect(boundaryElement).toBeTruthy();
  });

  it('should rerender the map on zooming.', async () => {
    await geoMapD3.render();

    const landElement = svgElement.querySelector('.geo_map-land')!;
    const dAttribute = landElement.getAttribute('d');

    // TODO: better way?
    // tslint:disable-next-line:no-string-literal
    geoMapD3['zoom'].scaleTo(geoMapD3['svg'], 100);

    const newDAttribute = landElement.getAttribute('d');
    expect(newDAttribute).not.toBe(dAttribute);
  });

  it('should rerender the map on panning.', async () => {
    await geoMapD3.render();

    const landElement = svgElement.querySelector('.geo_map-land')!;
    const dAttribute = landElement.getAttribute('d');

    // TODO: better way?
    // tslint:disable-next-line:no-string-literal
    geoMapD3['zoom'].translateBy(geoMapD3['svg'], 10, 10);

    const newDAttribute = landElement.getAttribute('d');
    expect(newDAttribute).not.toBe(dAttribute);
  });

  it('should update territory paths upon changes.', async () => {
    await geoMapD3.render();

    const data = [{
      territory: {
        level: TerritoryLevel.COUNTRY,
        id: '410',
      },
      values: { activeUser: 123 },
    }];
    renderOptions.data$.next(data);

    const territoryCount = svgElement.querySelectorAll('.geo_map-territory').length;

    expect(territoryCount).toBe(data.length);
  });

  it('should update city circles upon changes.', async () => {
    await geoMapD3.render();

    const data = [{
      territory: {
        level: TerritoryLevel.CITY,
        id: '1840013660',
      },
      values: { activeUser: 234 },
    }];
    renderOptions.data$.next(data);

    const cityCount = svgElement.querySelectorAll('.geo_map-city').length;

    expect(cityCount).toBe(data.length);
  });
});
