import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GeoMapD3, RenderOptions } from '../../d3/geo-map.d3';
import { A11yPlaceholderDirective } from '../../directives/a11y-placeholder/a11y-placeholder.directive';
import { GeoMapMeta } from '../../datasets/metas/geo-map.meta';
import { BehaviorSubject } from 'rxjs';
import { GeoDatum, TerritoryLevel } from '../../datasets/queries/geo.query';
import { DAY } from '../../utils/timeUnits';
import { World } from '../../datasets/geo.dataset';

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss'],
})
export class GeoMapComponent implements RenderOptions, OnInit, OnChanges, OnDestroy {
  @ViewChild(A11yPlaceholderDirective, { static: true }) a11yPlaceholder: A11yPlaceholderDirective<GeoMapComponent>;

  @Input() endDate = new Date();
  @Input() startDate = new Date(this.endDate.getTime() - 30 * DAY);
  @Input() meta: GeoMapMeta;
  @Input() height = 500;
  @Input() width = 800;

  world: World;
  data$ = new BehaviorSubject<GeoDatum[]>([]);
  geoMapD3: GeoMapD3;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
  ) {
    this.geoMapD3 = new GeoMapD3(this);
  }

  ngOnInit() {
    this.world = this.meta.world;
    this.geoMapD3.render();
  }

  ngOnDestroy() {
    this.geoMapD3.clear();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (['startDate', 'endDate', 'meta'].some(key => key in changes)) {
      const data = this.meta.queryData({
        range: [this.startDate, this.endDate],
        territory: {
          level: TerritoryLevel.SUBCONTINENT,
          id: '151',
        },
        unit: TerritoryLevel.COUNTRY,
      });
      this.data$.next(data);
    }
  }
}
