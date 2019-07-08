import Vue from 'vue'
import Router from 'vue-router'
import Map1 from './../views/Map.1.vue'
import Map2 from './../views/Map.2.vue'
import Map3 from './../views/Map.3.vue'
import Point from './../views/Point.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'map',
      component: Map1
    },
    {
      path: '/map2',
      name: 'map2',
      component: Map2
    },
    {
      path: '/map3',
      name: 'map3',
      component: Map3
    },
    {
      path: '/point',
      name: 'point',
      component: Point
    }
  ]
})
