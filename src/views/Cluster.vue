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
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    };
  },
  mounted() {
    this.map = this.$utils.map.createMap("map-container", {
      maxZoom: 18
    });
    this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});
    this.map.setView([51.505, -0.09], 13);

    let cluster = this.$utils.map.createMakerCluster();
    for (let i = 0; i < 200; i++) {
      let latlng = this.$utils.map.getRandomLatLng();
      let maker = this.$utils.map.createMakerByLatlng(latlng);
      cluster.addLayer(maker);
    }

    this.map.addLayer(cluster);
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
