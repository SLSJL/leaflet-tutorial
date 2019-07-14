import Vue from "vue";
import Router from "vue-router";
import Map1 from "./../views/Map.1.vue";
import AddGraphics from "./../views/AddGraphics.vue";
import Cluster from "./../views/Cluster.vue";
import Point from "./../views/Point.vue";
import Polyline from "./../views/Polyline.vue";
import Polygon from "./../views/Polygon.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "map",
      component: Map1
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
    }
  ]
});
