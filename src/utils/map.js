import "leaflet/dist/leaflet.css";
import * as $L from "leaflet";

import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import "leaflet-measure-path";
import "leaflet-measure-path/leaflet-measure-path.css";

import {
  basemapLayer,
  featureLayer,
  tiledMapLayer,
  dynamicMapLayer
  // identifyFeatures
} from "esri-leaflet";

// import "esri-leaflet-renderers";
import Cluster from "./cluster";
import "esri-leaflet-cluster"

// 解决默认 maker 无法显示的问题
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = $L.icon({
  iconAnchor: [13, 41],
  iconUrl: icon,
  shadowUrl: iconShadow
});
$L.Marker.prototype.options.icon = DefaultIcon;

let CursorStyle = "";

const createMap = (divId, options) => {
  let map = $L.map(divId, options);
  return map;
};

const createTileLayer = async (map, url, options) => {
  let tileLayer = await $L.tileLayer(url, options);
  tileLayer.addTo(map);
  return tileLayer;
};

/**
 * 创建 Icon
 *
 * @param {Oject} options
 */

const createIcon = options => {
  return $L.icon(options);
};

/**
 * 通过 [x, y] 坐标添加 Maker
 *
 * @param {Object} map
 * @param {Object} latLng
 * @param {Object} options
 *
 */
const createMakerByXY = (map, coordinate, options) => {
  let marker = $L.marker($L.latLng(coordinate[1], coordinate[0]), options);
  marker.addTo(map);
  return marker;
};
const createMakerByLatlng = (latlng, options) => {
  return $L.marker(latlng, options);
};

/**
 * 创建线要素
 *
 * @param {Object} map
 * @param {Array} linePath
 * @param {Object} lineOpts
 */
const createPolyline = (map, linePath, lineOpts) => {
  let polyline = $L.polyline(linePath, lineOpts);
  polyline.addTo(map);
  return polyline;
};

/**
 * 创建面要素
 *
 * @param {Object} map
 * @param {Array} areaPath
 * @param {Object} areaOpts
 */

const createPolygon = (map, areaPath, areaOpts) => {
  let polygon = $L.polygon(areaPath, areaOpts);
  polygon.addTo(map);
  return polygon;
};

const createCircleMaker = (latlng, size, opts) => {
  return $L.circleMarker(latlng, size, opts);
};

const createPopup = (map, options) => {
  let popup = $L.popup(options);
  return popup;
};
const createLatlonByArray = coordinate => {
  let latLng = $L.latLng(coordinate[0], coordinate[1]);
  return latLng;
};

const createMakerCluster = () => {
  return $L.markerClusterGroup();
};

const getRandomLatLng = map => {
  let bounds = map.getBounds(),
    southWest = bounds.getSouthWest(),
    northEast = bounds.getNorthEast(),
    lngSpan = northEast.lng - southWest.lng,
    latSpan = northEast.lat - southWest.lat;

  return $L.latLng(
    southWest.lat + latSpan * Math.random(),
    southWest.lng + lngSpan * Math.random()
  );
};
const getLatLng = (x, y) => {
  return $L.latLng(y, x);
};

const addCursorStyle = (map, cursorStyle) => {
  CursorStyle = cursorStyle;
  $L.DomUtil.addClass(map._container, cursorStyle);
};

const removerCoursorStyle = map => {
  $L.DomUtil.removeClass(map._container, CursorStyle);
};

const addEsirBasemap = async (map, layerName) => {
  return await basemapLayer(layerName).addTo(map);
};

const addEsirFeatureLayer = async (map, opts) => {
  return await featureLayer(opts).addTo(map);
};

const addEsirTiledMapLayer = async (map, opts) => {
  return await tiledMapLayer(opts).addTo(map);
};

const addEsirDynamicMapLayer = async (map, opts) => {
  return await dynamicMapLayer(opts).addTo(map);
};

const addEsirClusterLayer = async (map, opts) => {
  return await Cluster(opts).addTo(map);
};

export default {
  createMap,
  createTileLayer,
  createIcon,
  createMakerByXY,
  createMakerByLatlng,
  createPolyline,
  createPolygon,
  createCircleMaker,
  createPopup,
  createLatlonByArray,
  createMakerCluster,
  getRandomLatLng,
  addCursorStyle,
  removerCoursorStyle,
  getLatLng,
  addEsirBasemap,
  addEsirFeatureLayer,
  addEsirTiledMapLayer,
  addEsirDynamicMapLayer,
  addEsirClusterLayer
};
