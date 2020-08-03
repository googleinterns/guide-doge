import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { GeoMapD3, RenderOptions } from './geo-map.d3';
import { GeoDatum } from '../datasets/queries/geo.query';
import { fetchWorld } from '../datasets/geo.dataset';
import { TerritoryLevel, World } from '../datasets/geo.types';

interface SubjectRenderOptions extends RenderOptions {
  data$: Subject<GeoDatum[]>;
}

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

describe('GeoMapD3', () => {
  class MockGeoMapD3 extends GeoMapD3 {
    scaleTo(scale) {
      this.zoom.scaleTo(this.svg, scale);
    }

    translateBy(x, y) {
      this.zoom.translateBy(this.svg, x, y);
    }
  }

  let containerElement: HTMLElement;
  let svgElement: HTMLElement;
  let renderOptions: SubjectRenderOptions;
  let geoMapD3: MockGeoMapD3;
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
    geoMapD3 = new MockGeoMapD3(renderOptions);
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

    geoMapD3.scaleTo(100);

    const newDAttribute = landElement.getAttribute('d');
    expect(newDAttribute).not.toBe(dAttribute);
  });

  it('should rerender the map on panning.', async () => {
    await geoMapD3.render();

    const landElement = svgElement.querySelector('.geo_map-land')!;
    const dAttribute = landElement.getAttribute('d');

    geoMapD3.translateBy(10, 10);

    const newDAttribute = landElement.getAttribute('d');
    expect(newDAttribute).not.toBe(dAttribute);
  });

  it('should update territory paths upon changes.', async () => {
    await geoMapD3.render();

    const data = [{
      territory: world[COUNTRY]['410'],
      values: { activeUser: 123 },
    }];
    renderOptions.data$.next(data);

    const territoryCount = svgElement.querySelectorAll('.geo_map-territory').length;

    expect(territoryCount).toBe(data.length);
  });

  it('should update city circles upon changes.', async () => {
    await geoMapD3.render();

    const data = [{
      territory: world[CITY]['1840013660'],
      values: { activeUser: 234 },
    }];
    renderOptions.data$.next(data);

    const cityCount = svgElement.querySelectorAll('.geo_map-city').length;

    expect(cityCount).toBe(data.length);
  });
});
