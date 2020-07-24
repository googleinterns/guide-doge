import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import * as topojson from 'topojson';
import { Observable } from 'rxjs';
import { GeoDatum } from '../datasets/queries/geo.query';
import * as GeoJSON from 'geojson';
import { GeometryCollection, MultiPolygon, Polygon } from 'topojson-specification';
import { isNotNullish, linearScale, linearSquaredScale } from '../utils/misc';
import { City, Territory, TerritoryLevel, World } from '../datasets/geo.types';
import * as chroma from 'chroma-js';

export interface RenderOptions extends BaseRenderOptions {
  world: World;
  data$: Observable<GeoDatum[]>;
}

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

export class GeoMapD3 extends BaseD3<RenderOptions> {
  static colorBorder = '#FFFFFF';
  static colorLand = '#EEEEEE';
  static minOpacity = .2;
  static maxOpacity = .8;
  static minRadius = 5;
  static maxRadius = 30;
  static latitudeBounds = [-84, 84];
  static paddingScale = .9;

  private projection: d3.GeoProjection;
  private geoPath: d3.GeoPath;
  private centerY: number;
  private lastTransform: d3.ZoomTransform | null;
  private zoom: d3.ZoomBehavior<SVGSVGElement, unknown>;
  private landPath: d3.Selection<SVGPathElement, GeoJSON.FeatureCollection<GeoJSON.Geometry, {}>, null, undefined>;
  private boundaryPath: d3.Selection<SVGPathElement, GeoJSON.MultiLineString, null, undefined>;
  private dataG: d3.Selection<SVGGElement, unknown, null, undefined>;
  private territoryPaths: d3.Selection<SVGPathElement, any, null, undefined>[];
  private territoryCircles: d3.Selection<SVGCircleElement, any, null, undefined>[];

  private get geoTransform() {
    return datum => `translate(${this.projection([datum.lng, datum.lat])})`;
  }

  private static accessValue(datum: GeoDatum) {
    return datum.values.activeUsers;
  }

  private static getColor(valueRatio: number) {
    const { colorPrimary, colorBorder, minOpacity, maxOpacity } = GeoMapD3;
    const opacity = linearScale(valueRatio, minOpacity, maxOpacity);
    return chroma.scale([colorBorder, colorPrimary])(opacity).hex('rgb');
  }

  render() {
    super.render();

    const { data$ } = this.renderOptions;

    this.renderMap();
    this.renderData();

    data$
      .pipe(this.takeUntilCleared())
      .subscribe(data => {
        this.updateData(data);
      });
  }

  private renderMap() {
    const { height, width, world } = this.renderOptions;
    const { colorLand } = GeoMapD3;

    this.landPath = this.svg
      .append('path')
      .attr('class', 'geo_map-land')
      .datum(topojson.feature(world.topology, world.topology.objects.land))
      .attr('fill', colorLand);

    const countryGeometryCollection: GeometryCollection = {
      type: 'GeometryCollection',
      geometries: Object.values(world[COUNTRY]).map(country => country.geometry).filter(isNotNullish),
    };

    this.boundaryPath = this.svg
      .append('path')
      .attr('class', 'geo_map-boundary')
      .datum(topojson.mesh(world.topology, countryGeometryCollection, (a, b) => a !== b))
      .attr('fill', 'none')
      .attr('stroke', '#FFF')
      .attr('stroke-width', '1px');

    this.projection = d3.geoMercator()
      .scale(1)
      .translate([width / 2, height / 2]);

    const { minX, maxX, minY, maxY } = this.getProjectionBounds();
    const minScale = width / (maxX - minX);
    this.centerY = (minY + maxY) / 2;

    this.projection
      .rotate([0, 0])
      .translate([width / 2, height / 2])
      .scale(minScale);
    this.lastTransform = null;

    this.zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([minScale, 50 * minScale]);
    this.zoom.scaleTo(this.svg, minScale);
    this.zoom.on('zoom', this.handleZoomAndPan.bind(this));
    this.svg.call(this.zoom);

    this.geoPath = d3.geoPath(this.projection);
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
    ].forEach(path => path.attr('d', this.geoPath));
    this.territoryCircles?.forEach(circle => circle.attr('transform', this.geoTransform));
  }

  private renderData() {
    this.dataG = this.svg.append('g');
    this.territoryPaths = [];
    this.territoryCircles = [];
  }

  private updateData(data: GeoDatum[]) {
    this.dataG.html('');
    this.territoryPaths = [];
    this.territoryCircles = [];

    const { accessValue } = GeoMapD3;
    const maxValue = data.reduce((acc, datum) => Math.max(acc, accessValue(datum)), 0);

    for (const datum of data) {
      const { territory } = datum;
      const valueRatio = accessValue(datum) / maxValue;

      if ('geometry' in territory) { // for continents, subcontinents, and countries
        const { geometry } = territory;
        if (geometry) {
          const territoryPath = this.appendTerritoryPath(geometry, valueRatio);
          this.territoryPaths.push(territoryPath);
        }
      } else { // for cities
        const territoryCircle = this.appendCityCircle(territory, valueRatio);
        this.territoryCircles.push(territoryCircle);
      }
    }
  }

  private appendTerritoryPath(geometry: Polygon | MultiPolygon, valueRatio: number) {
    const { colorBorder } = GeoMapD3;
    const { world } = this.renderOptions;
    return this.dataG
      .append('path')
      .attr('class', 'geo_map-territory')
      .datum(topojson.feature(world.topology, geometry))
      .attr('d', this.geoPath)
      .attr('fill', GeoMapD3.getColor(valueRatio))
      .attr('stroke', colorBorder);
  }

  private appendCityCircle(city: City, valueRatio: number) {
    const { colorBorder, minRadius, maxRadius } = GeoMapD3;
    return this.dataG
      .append('circle')
      .attr('class', 'geo_map-city')
      .datum(city)
      .attr('transform', this.geoTransform)
      .attr('r', linearSquaredScale(valueRatio, minRadius, maxRadius))
      .attr('fill', GeoMapD3.getColor(valueRatio))
      .attr('stroke', colorBorder);
  }
}
