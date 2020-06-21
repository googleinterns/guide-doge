import { BaseD3, RenderOptions } from './base.d3';
import { ElementRef } from '@angular/core';

describe('BaseD3', () => {
  // since BaseD3 is an abstract class, make a concrete child class
  class TestBaseD3 extends BaseD3<RenderOptions> {
  }

  const svgElement = document.createElement('svg');
  const containerElement = document.createElement('div');
  containerElement.appendChild(svgElement);
  const renderOptions = {
    elementRef: new ElementRef<HTMLElement>(containerElement),
    height: 256,
    width: 256,
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
    marginLeft: 8,
  };
  let baseD3: TestBaseD3;

  beforeEach(() => {
    baseD3 = new TestBaseD3(renderOptions);
  });

  afterEach(() => {
    baseD3.clear();
  });

  it('should instantiate.', () => {
    expect(baseD3).toBeInstanceOf(BaseD3);
  });

  it('should render on the svg element.', async () => {
    baseD3.render();
    const viewBox = svgElement.getAttribute('viewBox');
    expect(viewBox).toBe(`0 0 ${renderOptions.width} ${renderOptions.height}`);
  });

  it('should change the config.', () => {
    const newWidth = 128;
    baseD3.config({
      ...renderOptions,
      width: newWidth,
    }).render();
    const viewBox = svgElement.getAttribute('viewBox');
    expect(viewBox).toBe(`0 0 ${newWidth} ${renderOptions.height}`);
  });
});
