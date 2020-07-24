import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { GeoMapD3, RenderOptions } from './geo-map.d3';
import { GeoDatum } from '../datasets/queries/geo.query';

describe('GeoMapD3', () => {
  let containerElement: HTMLElement;
  let svgElement: HTMLElement;
  let renderOptions: RenderOptions;
  let geoMapD3: GeoMapD3;

  beforeEach(() => {
    svgElement = document.createElement('svg');
    containerElement = document.createElement('div');
    containerElement.appendChild(svgElement);
    renderOptions = {
      elementRef: new ElementRef<HTMLElement>(containerElement),
      width: 256,
      height: 256,
      topoJsonUrl: 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json',
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
});
