import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { GeoMapD3, RenderOptions } from './geo-map.d3';
import { GeoDatum } from '../datasets/queries/geo.query';
import { fetchWorld } from '../datasets/geo.dataset';
import { Territory, TerritoryLevel, World } from '../datasets/geo.types';
import { atlantaCityId, southKoreaCountryId } from '../utils/mocks.spec';
import * as d3 from 'd3';
import { waitFor } from '../utils/misc';

interface SubjectRenderOptions extends RenderOptions {
  data$: Subject<GeoDatum[]>;
  filteringTerritory$: Subject<Territory | null>;
}

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

describe('GeoMapD3', () => {
  class MockGeoMapD3 extends GeoMapD3 {
    public projection: d3.GeoProjection;

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

  beforeAll(async () => {
    world = await fetchWorld();
  });

  beforeEach(() => {
    svgElement = document.createElement('svg');
    containerElement = document.createElement('div');
    containerElement.appendChild(svgElement);
    renderOptions = {
      elementRef: new ElementRef<HTMLElement>(containerElement),
      width: 256,
      height: 256,
      world,
      data$: new Subject<GeoDatum[]>(),
      activeDatumIndex$: new Subject<number>(),
      filteringTerritory$: new Subject<Territory | null>(),
    };
    geoMapD3 = new MockGeoMapD3(renderOptions);
  });

  afterEach(() => {
    geoMapD3.clear();
  });

  it('should instantiate.', () => {
    expect(geoMapD3).toBeInstanceOf(GeoMapD3);
  });

  it('should render the map.', () => {
    geoMapD3.render();

    const landElement = svgElement.querySelector('.geo_map-land');
    const boundaryElement = svgElement.querySelector('.geo_map-boundary');

    expect(landElement).toBeTruthy();
    expect(boundaryElement).toBeTruthy();
  });

  it('should rerender the map on zooming.', () => {
    geoMapD3.render();
    geoMapD3.scaleTo(50);

    const landElement = svgElement.querySelector('.geo_map-land')!;
    const dAttribute = landElement.getAttribute('d');

    geoMapD3.scaleTo(100);

    const newDAttribute = landElement.getAttribute('d');
    expect(newDAttribute).not.toBe(dAttribute);
  });

  it('should rerender the map on panning.', () => {
    geoMapD3.render();
    geoMapD3.translateBy(0, 0);

    const landElement = svgElement.querySelector('.geo_map-land')!;
    const dAttribute = landElement.getAttribute('d');

    geoMapD3.translateBy(10, 10);

    const newDAttribute = landElement.getAttribute('d');
    expect(newDAttribute).not.toBe(dAttribute);
  });

  it('should update territory paths upon data change.', () => {
    geoMapD3.render();

    const data = [{
      territory: world[COUNTRY][southKoreaCountryId],
      values: { activeUser: 123 },
    }];
    renderOptions.data$.next(data);

    const territoryCount = svgElement.querySelectorAll('path.geo_map-territory').length;

    expect(territoryCount).toBe(data.length);
  });

  it('should update city circles upon data change.', () => {
    geoMapD3.render();

    const data = [{
      territory: world[CITY][atlantaCityId],
      values: { activeUser: 234 },
    }];
    renderOptions.data$.next(data);

    const cityCount = svgElement.querySelectorAll('circle.geo_map-territory').length;

    expect(cityCount).toBe(data.length);
  });

  it('should update projection upon filtering territory changes.', async () => {
    geoMapD3.render();
    const translate = geoMapD3.projection.translate();
    const scale = geoMapD3.projection.scale();

    const city = world[CITY][atlantaCityId];
    const data = [{
      territory: city,
      values: { activeUser: 234 },
    }];
    renderOptions.data$.next(data);
    renderOptions.filteringTerritory$.next(city);

    // wait for the first frame of animation to happen
    await waitFor(50);

    const newTranslate = geoMapD3.projection.translate();
    const newScale = geoMapD3.projection.scale();
    expect(translate).not.toEqual(newTranslate);
    expect(scale).not.toEqual(newScale);
  });
});
