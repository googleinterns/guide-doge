import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import * as topojson from 'topojson';
import { combineLatest, Observable, Subject } from 'rxjs';
import { GeoDatum } from '../datasets/queries/geo.query';
import * as GeoJSON from 'geojson';
import { GeometryCollection } from 'topojson-specification';
import { isNotNullish, linearScale, logScale, squaredLinearScale } from '../utils/misc';
import { City, Territory, TerritoryLevel, World } from '../datasets/geo.types';
import * as chroma from 'chroma-js';
import { SECOND } from '../utils/timeUnits';
import { easing } from 'transition-timing';

export interface RenderOptions extends BaseRenderOptions {
  world: World;
  data$: Observable<GeoDatum[]>;
  activeDatumIndex$: Subject<number>;
  filteringTerritory$: Subject<Territory | null>;
}

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

export class GeoMapD3 extends BaseD3<RenderOptions> {
  static animFPS = 30;
  static animDuration = SECOND;
  static animTimingFunction = easing('easeInOut');
  static minOpacity = .1;
  static maxOpacity = .8;
  static minRadius = 1;
  static maxRadius = 30;
  static latitudeBounds = [-84, 84];
  static paddingScale = .9;
  static rawProjection = d3.geoMercator()
    .scale(1)
    .translate([0, 0]);
  static rawGeoPath = d3.geoPath(GeoMapD3.rawProjection);

  protected zoom: d3.ZoomBehavior<SVGSVGElement, unknown>;
  private animationId?: number;
  protected projection: d3.GeoProjection;
  private geoPath: d3.GeoPath;
  private centerY: number;
  private lastTransform: d3.ZoomTransform | null;
  private landPath: d3.Selection<SVGPathElement, GeoJSON.FeatureCollection<GeoJSON.Geometry, {}>, null, undefined>;
  private boundaryPath: d3.Selection<SVGPathElement, GeoJSON.MultiLineString, null, undefined>;
  private dataG: d3.Selection<SVGGElement, unknown, null, undefined>;
  private territoryPaths: (d3.Selection<SVGPathElement, any, null, undefined> | null)[] | null;
  private territoryCircles: d3.Selection<SVGCircleElement, any, null, undefined>[] | null;

  private get geoTransform() {
    return datum => `translate(${this.projection([datum.lng, datum.lat])})`;
  }

  private static accessValue(datum: GeoDatum) {
    return datum.values.activeUsers;
  }

  private static getColor(valueRatio: number) {
    const { primaryColor, minOpacity, maxOpacity } = GeoMapD3;
    const opacity = logScale(valueRatio, minOpacity, maxOpacity);
    return chroma.scale(['#FFFFFF', primaryColor])(opacity).hex('rgb');
  }

  render() {
    super.render();

    const { data$, activeDatumIndex$, filteringTerritory$ } = this.renderOptions;

    this.renderMap();
    this.renderData();

    data$
      .pipe(this.takeUntilCleared())
      .subscribe(data => {
        this.updateData(data);
      });

    filteringTerritory$
      .pipe(this.takeUntilCleared())
      .subscribe(filteringTerritory => {
        this.fit(filteringTerritory);
      });

    combineLatest([
      data$,
      activeDatumIndex$,
    ]).pipe(this.takeUntilCleared())
      .subscribe(([, activeDatumIndex]) => {
        this.updateActiveDatum(activeDatumIndex);
      });
  }

  private renderMap() {
    const { height, width, world } = this.renderOptions;

    this.landPath = this.svg
      .append('path')
      .attr('class', 'geo_map-land')
      .datum(topojson.feature(world.topology, world.topology.objects.land));

    const countryGeometryCollection: GeometryCollection = {
      type: 'GeometryCollection',
      geometries: Object.values(world[COUNTRY]).map(country => country.geometry).filter(isNotNullish),
    };

    this.boundaryPath = this.svg
      .append('path')
      .attr('class', 'geo_map-boundary')
      .datum(topojson.mesh(world.topology, countryGeometryCollection, (a, b) => a !== b));

    this.projection = d3.geoMercator()
      .scale(1)
      .translate([width / 2, height / 2]);

    const { minX, maxX, minY, maxY } = this.getProjectionBounds();
    const minScale = width / (maxX - minX);
    this.centerY = (minY + maxY) / 2;

    this.lastTransform = null;

    this.zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([minScale, 50 * minScale]);
    this.zoom.scaleTo(this.svg, minScale);
    this.zoom.on('zoom', this.handleZoomAndPan.bind(this));
    this.svg
      .call(this.zoom)
      .on('dblclick.zoom', null);

    this.geoPath = d3.geoPath(this.projection);
    this.fit(null);
  }

  private getProjectionBounds() {
    const { latitudeBounds } = GeoMapD3;

    const [longitude] = this.projection.rotate();
    const hemisphere = 180.0 - Number.EPSILON;

    const [minX, minY] = this.projection([-longitude - hemisphere, latitudeBounds[1]])!;
    const [maxX, maxY] = this.projection([-longitude + hemisphere, latitudeBounds[0]])!;

    return { minX, minY, maxX, maxY };
  }

  private adjustOutOfProjectionBounds() {
    const { height } = this.renderOptions;

    const [translationX, translationY] = this.projection.translate();
    const { minY, maxY } = this.getProjectionBounds();
    const overflowTop = minY;
    const overflowBottom = height - maxY;
    if (overflowTop > 0) {
      this.projection.translate([translationX, translationY - overflowTop]);
    } else if (overflowBottom > 0) {
      this.projection.translate([translationX, translationY + overflowBottom]);
    }
  }

  private fit(territory: Territory | null) {
    const { rawGeoPath, rawProjection, paddingScale } = GeoMapD3;
    const { width, height, world } = this.renderOptions;

    if (!territory) {
      const [minScale] = this.zoom.scaleExtent();
      this.animate(0, height / 2, minScale);
    } else if (territory.level === CITY) {
      this.fit(territory.parent);
    } else if (territory.geometry) {

      const feature = topojson.feature(world.topology, territory.geometry);
      const [[left, top], [right, bottom]] = rawGeoPath.bounds(feature);
      const boundingWidth = right - left;
      const boundingHeight = bottom - top;
      const boundingCenterX = boundingWidth / 2 + left;
      const boundingCenterY = boundingHeight / 2 + top;

      const [minScale] = this.zoom.scaleExtent();
      const scale = Math.max(minScale, Math.min(width / boundingWidth, height / boundingHeight) * paddingScale);
      const [longitude, latitude] = rawProjection.invert!([boundingCenterX, boundingCenterY])!;
      const y = this.centerY - rawProjection([longitude, latitude])![1] * scale;

      this.animate(longitude, y, scale);
    }
  }

  private animate(newLongitude, newY, newScale) {
    if (this.animationId !== undefined) {
      window.clearInterval(this.animationId);
      this.animationId = undefined;
    }

    const { animDuration, animTimingFunction, animFPS } = GeoMapD3;

    const oldLongitude = -this.projection.rotate()[0];
    const [x, oldY] = this.projection.translate();
    const oldScale = this.projection.scale();

    const animStartedAt = Date.now();
    this.animationId = window.setInterval(() => {
      let timingRatio = (Date.now() - animStartedAt) / animDuration;
      if (timingRatio >= 1) {
        timingRatio = 1;
        window.clearInterval(this.animationId);
      }
      const animRatio = animTimingFunction(timingRatio);
      const longitude = linearScale(animRatio, oldLongitude, newLongitude);
      const y = linearScale(animRatio, oldY, newY);
      const scale = linearScale(animRatio, oldScale, newScale);
      this.projection
        .rotate([-longitude, 0])
        .translate([x, y])
        .scale(scale);
      this.lastTransform = null;
      this.zoom.scaleTo(this.svg, scale);
    }, SECOND / animFPS);
  }

  private handleZoomAndPan() {
    const { width, height } = this.renderOptions;
    const event = d3.event as d3.D3ZoomEvent<SVGSVGElement, unknown>;
    const { transform } = event;

    if (this.lastTransform) {
      const {
        k: scale,
        x,
        y,
      } = transform;
      const {
        k: lastScale,
        x: lastX,
        y: lastY,
      } = this.lastTransform;
      const [minScale] = this.zoom.scaleExtent();

      const translation = this.projection.translate();
      const translationX = translation[0];
      let translationY = translation[1];
      let [longitude] = this.projection.rotate();

      function getDeltaLongitude(deltaX: number) {
        return 360 * (deltaX / width) * (minScale / scale);
      }

      if (scale !== lastScale) {
        const [cursorX, cursorY] = d3.mouse(this.svgElement);
        const scaleRatio = scale / lastScale;

        const deltaX = cursorX - width / 2;
        const pivotLongitude = longitude + getDeltaLongitude(deltaX);
        longitude = linearScale(scaleRatio, pivotLongitude, longitude);

        const pivotY = this.centerY + (cursorY - height / 2) * (minScale / scale);
        translationY = linearScale(scaleRatio, pivotY, translationY);
      } else {
        const deltaX = x - lastX;
        const deltaY = y - lastY;

        longitude += getDeltaLongitude(deltaX);
        translationY += deltaY;
      }

      this.projection
        .rotate([longitude, 0])
        .translate([translationX, translationY])
        .scale(scale);
    }

    this.adjustOutOfProjectionBounds();
    this.updateMap();
    this.lastTransform = transform;
  }

  private updateMap() {
    [
      this.landPath,
      this.boundaryPath,
      ...(this.territoryPaths ?? []),
    ].filter(isNotNullish).forEach(path => path.attr('d', this.geoPath));
    this.territoryCircles?.forEach(circle => circle.attr('transform', this.geoTransform));
  }

  private renderData() {
    this.dataG = this.svg.append('g');
    this.territoryPaths = null;
    this.territoryCircles = null;
  }

  private updateData(data: GeoDatum[]) {
    this.dataG.html('');

    const { accessValue } = GeoMapD3;
    const maxValue = data.reduce((acc, datum) => Math.max(acc, accessValue(datum)), 0);

    if (data[0]?.territory.level === CITY) {
      this.territoryPaths = null;
      this.territoryCircles = data.map((datum, datumIndex) => {
        const territory = datum.territory as City;
        const valueRatio = accessValue(datum) / maxValue;
        return this.appendCityCircle(territory, valueRatio, datumIndex);
      });
    } else {
      this.territoryCircles = null;
      this.territoryPaths = data.map((datum, datumIndex) => {
        const territory = datum.territory as Exclude<Territory, City>;
        const valueRatio = accessValue(datum) / maxValue;
        return this.appendTerritoryPath(territory, valueRatio, datumIndex);
      });
    }
  }

  private appendTerritoryPath(territory: Exclude<Territory, City>, valueRatio: number, datumIndex: number) {
    if (!territory.geometry) {
      return null;
    }
    const { world } = this.renderOptions;
    return this.dataG
      .append('path')
      .datum(topojson.feature(world.topology, territory.geometry))
      .attr('d', this.geoPath)
      .call(this.setupTerritorySelection(territory, valueRatio, datumIndex));
  }

  private appendCityCircle(city: City, valueRatio: number, datumIndex: number) {
    const { minRadius, maxRadius } = GeoMapD3;
    return this.dataG
      .append('circle')
      .datum(city)
      .attr('transform', this.geoTransform)
      .attr('r', squaredLinearScale(valueRatio, minRadius, maxRadius))
      .call(this.setupTerritorySelection(city, valueRatio, datumIndex));
  }

  private setupTerritorySelection<T extends SVGGraphicsElement>(territory: Territory, valueRatio: number, datumIndex: number) {
    const { activeDatumIndex$, filteringTerritory$ } = this.renderOptions;
    return (selection: d3.Selection<T, any, null, undefined>) => {
      selection
        .attr('class', 'geo_map-territory')
        .classed(`level-${territory.level}`, true)
        .attr('fill', GeoMapD3.getColor(valueRatio))
        .on('click', () => {
          filteringTerritory$.next(territory);
        })
        .on('mouseover', () => {
          activeDatumIndex$.next(datumIndex);
        })
        .on('mouseout', () => {
          activeDatumIndex$.next(-1);
        });
    };
  }

  private updateActiveDatum(activeDatumIndex: number | null) {
    this.svg.select('.geo_map-territory.active')
      .classed('active', false);
    if (activeDatumIndex !== null) {
      const selection = (this.territoryCircles ?? this.territoryPaths)?.[activeDatumIndex];
      if (selection) {
        const isCity = selection.classed(`level-${CITY}`);
        if (!isCity) {
          selection.raise();
        }
        selection.classed('active', true);
      }
    }
  }
}
