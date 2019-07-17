<template>
  <div class="map-container">
    <div id="map-container"></div>
    <MapDraw @point="drawPoint" @polyline="{}" @polygon="{}" @end="drawOff"></MapDraw>
  </div>
</template>

<script>
import MapDraw from "@/components/MapDraw.vue";

export default {
  name: "map-point",
  components: { MapDraw },
  data() {
    return {
      map: null,
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    };
  },
  mounted() {
    this.map = this.$utils.map.createMap("map-container");
    this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});
    this.map.setView([51.505, -0.09], 13);
  },
  methods: {
    drawOn() {
      // 移除监听地图事件
      this.map.off("click");
      this.map.off("mousemove");
      this.map.off("dblclick");
      this.map.doubleClickZoom.disable();
    },
    drawOff() {
      // 移除监听地图点击事件
      this.map.off("click");
      this.map.off("mousemove");
      this.map.off("dblclick");
      this.map.doubleClickZoom.enable();

      // 复原鼠标平移样式
      this.$utils.map.removerCoursorStyle(this.map);
    },
    drawPoint() {
      this.drawOn();

      this.$utils.map.addCursorStyle(this.map, "pointer-cursor");
      this.map.on("click", evt => {
        this.$utils.map.createMakerByLatlng(evt.latlng).addTo(this.map);
      });
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
