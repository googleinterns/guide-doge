import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GeoMapD3, RenderOptions } from '../../d3/geo-map.d3';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { GeoMapMeta } from '../../datasets/metas/geo-map.meta';

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss'],
})
export class GeoMapComponent implements RenderOptions, OnInit, OnDestroy {
  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective<GeoMapComponent>;

  @Input() meta: GeoMapMeta;
  @Input() height = 500;
  @Input() width = 800;

  geoMapD3: GeoMapD3;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    this.geoMapD3 = new GeoMapD3(this);
  }

  ngOnInit() {
    this.geoMapD3.render();
  }

  ngOnDestroy() {
    this.geoMapD3.clear();
  }
}
