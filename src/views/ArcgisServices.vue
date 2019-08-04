<template>
  <div class="map-container" id="map-container"></div>
</template>

<script>
export default {
  name: "mapView",
  components: {},
  data() {
    return {
      map: null,
      layer: null,
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      tileLayer:
        "https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer",
      featureLayer:
        "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/0/",
      dynamicLayer:
        "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/"
    };
  },
  async mounted() {
    this.map = this.$utils.map
      .createMap("map-container")
      .setView([22.302437935904464, 114.17198181152345], 12);

    this.layer = this.$utils.map.addEsirBasemap(this.map, "DarkGray");

    // this.map.setView([38.369572, -97.681121]);
    // this.layer = this.$utils.map.addEsirTiledMapLayer(this.map, {
    //   url: this.tileLayer,
    //   maxZoom: 15
    // });

    // this.map.setView([18.930362, -28.243945], 2);
    // this.layer = this.$utils.map.addEsirFeatureLayer(this.map, {
    //   url: this.featureLayer
    // });

    // this.map.setView([18.930362, -28.243945], 2);
    // this.layer = this.$utils.map.addEsirDynamicMapLayer(this.map, {
    //   url: this.dynamicLayer
    // });

    let self = this;

    this.map.setView([18.930362, -28.243945], 2);

    this.layer = this.$utils.map.addEsirClusterLayer(this.map, {
      url: this.featureLayer,
      // Cluster Options
      polygonOptions: {
        color: "#2d84c8"
      },
      // Feature Layer Options
      pointToLayer: function(geojson, latlng) {
        console.log(1)
        return self.$utils.map.createCircleMaker(latlng, 10, {
          color: "#2D84C8"
        });
      }
    });
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
}
</style>
