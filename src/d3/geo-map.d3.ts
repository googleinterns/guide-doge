import * as d3 from 'd3';
import { BaseD3, RenderOptions as BaseRenderOptions } from './base.d3';
import * as topojson from 'topojson';
import { GeometryCollection, Topology } from 'topojson-specification';
import { Observable } from 'rxjs';
import { GeoDatum } from '../datasets/queries/geo.query';
import * as GeoJSON from 'geojson';
import { linearScale } from '../utils/misc';

type CountryGeometry = GeoJSON.Polygon | GeoJSON.MultiPolygon;
type CountrySelectionDatum =
  GeoJSON.Feature<GeoJSON.Geometry, CountryGeometry>
  | GeoJSON.FeatureCollection<GeoJSON.Geometry, CountryGeometry>;
type WorldTopology = Topology<{ land: GeometryCollection, countries: GeometryCollection<CountryGeometry> }>;

export interface RenderOptions extends BaseRenderOptions {
  topoJsonUrl: string;
  data$: Observable<GeoDatum[]>;
}

export class GeoMapD3 extends BaseD3<RenderOptions> {
  static minOpacity = .2;
  static latitudeBounds = [-84, 84];
  static initialLatitude = (GeoMapD3.latitudeBounds[0] + GeoMapD3.latitudeBounds[1]) / 2;
  static initialLongitude = 0;

  private projection: d3.GeoProjection;
  private geoPath: d3.GeoPath;
  private worldTopology: WorldTopology;
  private centerY: number;
  private lastTransform: d3.ZoomTransform | null;
  private zoom: d3.ZoomBehavior<SVGSVGElement, unknown>;
  private landPath: d3.Selection<SVGPathElement, GeoJSON.FeatureCollection<GeoJSON.Geometry, {}>, null, undefined>;
  private boundaryPath: d3.Selection<SVGPathElement, GeoJSON.MultiLineString, null, undefined>;
  private dataG: d3.Selection<SVGGElement, unknown, null, undefined>;
  private dataPaths: d3.Selection<SVGPathElement, CountrySelectionDatum, null, undefined>[];

  private static accessValue(datum: GeoDatum) {
    return datum.values.activeUsers;
  }

  async render() {
    super.render();

    const { data$ } = this.renderOptions;

    await this.renderMap();
    this.renderData();

    data$
      .pipe(this.takeUntilCleared())
      .subscribe(data => {
        this.updateData(data);
      });
  }

  async renderMap() {
    const { height, width, topoJsonUrl } = this.renderOptions;
    const { initialLongitude, initialLatitude } = GeoMapD3;

    this.projection = d3.geoMercator()
      .rotate([-initialLongitude, 0])
      .scale(1)
      .translate([width / 2, height / 2]);

    const { minX, maxX, minY, maxY } = this.getProjectionBounds();
    const minScaleFactor = width / (maxX - minX);
    this.centerY = (minY + maxY) / 2;

    this.lastTransform = null;

    this.zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([minScaleFactor, 50 * minScaleFactor]);
    this.zoom.scaleTo(this.svg, minScaleFactor);
    this.zoom.on('zoom', this.handleZoomAndPan.bind(this));
    this.svg.call(this.zoom);

    this.projection
      .center([initialLongitude, initialLatitude])
      .scale(minScaleFactor);
    this.adjustOutOfProjectionBounds();

    this.geoPath = d3.geoPath()
      .projection(this.projection);

    this.worldTopology = await d3.json(topoJsonUrl) as WorldTopology;
    const { land, countries } = this.worldTopology.objects;

    this.landPath = this.svg
      .append('path')
      .datum(topojson.feature(this.worldTopology, land))
      .attr('d', this.geoPath)
      .attr('fill', '#EEE');

    this.boundaryPath = this.svg
      .append('path')
      .attr('class', 'geo_map-boundary')
      .datum(topojson.mesh(this.worldTopology, countries, (a, b) => a !== b))
      .attr('d', this.geoPath)
      .attr('fill', 'none')
      .attr('stroke', '#FFF')
      .attr('stroke-width', '1px');

    this.updateMap();
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
    const { width, height, data$ } = this.renderOptions;
    const event = d3.event as d3.D3ZoomEvent<SVGSVGElement, unknown>;
    const { transform } = event;

    const {
      k: scale,
      x,
      y,
    } = transform;
    const {
      k: lastScale,
      x: lastX,
      y: lastY,
    } = this.lastTransform ?? transform;
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
      longitude = linearScale(longitude, pivotLongitude, scaleRatio);

      const pivotY = this.centerY + (cursorY - height / 2) * (minScale / scale);
      translationY = linearScale(translationY, pivotY, scaleRatio);
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

    this.adjustOutOfProjectionBounds();

    this.lastTransform = transform;

    [this.landPath, this.boundaryPath, ...this.dataPaths]
      .forEach(dataPath => dataPath.attr('d', this.geoPath));
  }

  private updateMap() {
  }

  private renderData() {
    this.dataG = this.svg.insert('g', '.geo_map-boundary');
    this.dataPaths = [];
  }

  private updateData(data: GeoDatum[]) {
    this.dataG.html('');

    const { colorPrimary, minOpacity, accessValue } = GeoMapD3;

    const { countries } = this.worldTopology.objects;
    const maxValue = data.reduce((acc, datum) => Math.max(acc, accessValue(datum)), 0);

    this.dataPaths = data.map(datum => {
      const countryGeometryObject = countries.geometries.find(geometry => geometry.id === datum.id);
      if (!countryGeometryObject) {
        return null;
      }
      const valueRatio = accessValue(datum) / maxValue;
      return this.dataG
        .append('path')
        .datum(topojson.feature(this.worldTopology, countryGeometryObject))
        .attr('d', this.geoPath)
        .attr('fill', colorPrimary)
        .attr('opacity', minOpacity + valueRatio * (1 - minOpacity));
    }).filter((dataPath): dataPath is d3.Selection<SVGPathElement, CountrySelectionDatum, null, undefined> => dataPath !== null);
  }
}
