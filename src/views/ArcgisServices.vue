<template>
  <div class="map-container">
    <div id="map-container"></div>
    <Layers
      @basemapLayer="addBaselayer"
      @tiledMapLayer="addTilelayer"
      @dynamicMapLayer="addDynamiclayer"
      @imageMapLayer="addImageLayer"
      @featureLayer="addFeaturelayer"
      @clusterLayer="addClusterLayer"
      @heatMap="addHeatmap"
    ></Layers>
  </div>
</template>

<script>
import Layers from "@/components/Layers.vue";

export default {
  name: "mapView",
  components: { Layers },
  data() {
    return {
      map: null,
      layers: [],
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      tileLayer:
        "https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer",
      featureLayer:
        "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/0/",
      dynamicLayer:
        "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/",
      imageLayer:
        "https://landsat.arcgis.com/arcgis/rest/services/Landsat/PS/ImageServer"
    };
  },
  async mounted() {
    this.map = this.$utils.map.createMap("map-container", {
      maxZoom: 20
    });
  },
  methods: {
    clearLyrs() {
      this.layers.map(lyr => lyr.remove());
      this.layers = [];
    },
    async addBaselayer() {
      this.clearLyrs();
      this.map.setView([22.302437935904464, 114.17198181152345], 8);
      let layer1 = await this.$utils.map.addEsirBasemap(this.map, "DarkGray");
      let layer2 = await this.$utils.map.addEsirBasemap(
        this.map,
        "TerrainLabels"
      );

      this.layers.push(layer1, layer2);
    },
    async addTilelayer() {
      this.clearLyrs();

      this.map.setView([38.369572, -97.681121], 12);
      let layer = await this.$utils.map.addEsirTiledMapLayer(this.map, {
        url: this.tileLayer,
        maxZoom: 15
      });
      this.layers.push(layer);
    },
    async addDynamiclayer() {
      this.clearLyrs();

      this.map.setView([18.930362, -28.243945], 2);
      let layer = await this.$utils.map.addEsirDynamicMapLayer(this.map, {
        url: this.dynamicLayer
      });
      this.layers.push(layer);
    },
    async addImageLayer() {
      this.clearLyrs();

      let layer = await this.$utils.map.addImageMaplayer(this.map, {
        url: this.imageLayer
      });
      this.layers.push(layer);
    },
    async addFeaturelayer() {
      this.clearLyrs();

      this.map.setView([18.930362, -28.243945], 2);
      let layer = await this.$utils.map.addEsirFeatureLayer(this.map, {
        url: this.featureLayer
      });
      this.layers.push(layer);
    },
    async addClusterLayer() {
      this.clearLyrs();

      let self = this;
      this.map.setView([18.930362, -28.243945], 2);
      let layer1 = await this.$utils.map.addEsirBasemap(this.map, "DarkGray");

      let layer2 = await this.$utils.map.addEsirClusterLayer(this.map, {
        url: this.featureLayer,
        // Cluster Options
        polygonOptions: {
          color: "#2d84c8"
        },
        // Feature Layer Options
        pointToLayer: function(geojson, latlng) {
          return self.$utils.map.createCircleMaker(latlng, 10, {
            color: "#2D84C8"
          });
        }
      });

      this.layers.push(layer1, layer2);
    },
    async addHeatmap() {
      this.clearLyrs();

      this.map.setView([18.930362, -28.243945], 2);
      let layer1 = await this.$utils.map.addEsirBasemap(this.map, "DarkGray");

      let layer2 = await this.$utils.map.addEsriHeatmap(this.map, {
        url: this.featureLayer,
        radius: 12,
        minOpacity: 1,
        blur: 50,
        gradient: { 1: "red", 0.65: "lime", 0: "blue" }
      });
      this.layers.push(layer1, layer2);
    }
  }
};
</script>
<style lang="less">
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  #map-container {
    width: 100%;
    height: 100%;
  }
}
</style>
