import Vue from "vue";
import Router from "vue-router";
import MapStart from "./../views/MapStart.vue";
import AddGraphics from "./../views/AddGraphics.vue";
import Cluster from "./../views/Cluster.vue";
import Draw from "./../views/Draw.vue";
import Point from "./../views/Point.vue";
import Polyline from "./../views/Polyline.vue";
import Polygon from "./../views/Polygon.vue";
import StaticMeasure from "./../views/MeasureStatic.vue";
import DynamicMeasure from "./../views/MeasureDynamic.vue";
import MeasureBySelect from "./../views/MeasureBySelect.vue";
import MeasureDistance from "./../views/MeasureDistance.vue";
import Arcgis from "./../views/ArcgisServices.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "map",
      component: MapStart
    },
    {
      path: "/addGraphics",
      name: "addGraphics",
      component: AddGraphics
    },
    {
      path: "/cluster",
      name: "cluster",
      component: Cluster
    },
    {
      path: "/draw",
      name: "draw",
      component: Draw
    },
    {
      path: "/point",
      name: "point",
      component: Point
    },
    {
      path: "/polyline",
      name: "polyline",
      component: Polyline
    },
    {
      path: "/polygon",
      name: "polygon",
      component: Polygon
    },
    {
      path: "/staticmeasure",
      name: "staticmeasure",
      component: StaticMeasure
    },
    {
      path: "/dynamicmeasure",
      name: "dynamicmeasure",
      component: DynamicMeasure
    },
    {
      path: "/measurebyselect",
      name: "MeasureBySelect",
      component: MeasureBySelect
    },
    {
      path: "/measuredistance",
      name: "measuredistance",
      component: MeasureDistance
    },
    {
      path: "/arcgis",
      name: "arcgis",
      component: Arcgis
    }
  ]
});
