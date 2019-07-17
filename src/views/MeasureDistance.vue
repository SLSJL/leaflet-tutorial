<template>
  <div class="map-container">
    <div id="map-container"></div>
    <MapMeasureDistance
      @polyline="measurePolyline"
      @showMeasurements="showMeasurements"
      @hideMeasurements="hideMeasurements"
    ></MapMeasureDistance>
  </div>
</template>

<script>
import MapMeasureDistance from "@/components/MapMeasureDistance.vue";

export default {
  name: "map-point",
  components: { MapMeasureDistance },
  data() {
    return {
      map: null,
      OSMUrl: "http://tile.osm.org/{z}/{x}/{y}.png",
      overLayer: {
        polylines: [],
        polygons: [],
        measurements: []
      },
      tempGp: {
        lineNode: [],
        lineNodeLen: 0,
        tempLine: null,
        tempNode: []
      }
    };
  },
  mounted() {
    this.map = this.$utils.map.createMap("map-container");
    this.map.setView([51.505, -0.09], 14);
    this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});
  },
  methods: {
    drawOn() {
      this.clearTemps();
      this.map.doubleClickZoom.disable();

      // 移除监听地图事件
      this.map.off("click");
      this.map.off("mousemove");
      this.map.off("dblclick");
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
    clearTemps() {
      // 清空面中间数据
      this.tempGp.lineNode = [];
      this.tempGp.lineNodeLen = 0;
      if (this.tempGp.tempLine) this.tempGp.tempLine.remove();
      this.tempGp.tempNode.map(el => el.remove());
    },
    measurePolyline() {
      this.$utils.map.addCursorStyle(this.map, "crosshare-cursor");
      this.drawOn();

      let tempPolygonOpts = {
        color: "rgba(255, 0, 0, 0.85)",
        weight: 3,
        opacity: 0.85,
        showMeasurements: true,
        interactive: false,
        measurementOptions: { minDistance: 500 }
      };

      let finalPolygonOpts = {
        color: "rgba(0, 255, 0, 0.85)",
        weight: 3,
        opacity: 0.85,
        showMeasurements: true,
        measurementOptions: { minDistance: 500 }
      };
      this.map.on("click", evt => {
        this.tempGp.lineNode.push([evt.latlng.lat, evt.latlng.lng]);
        this.tempGp.tempNode.push(this.addNode(evt.latlng, this.map));
        this.tempGp.lineNodeLen = this.tempGp.lineNode.length;
      });

      this.map.on("mousemove", evt => {
        if (this.tempGp.lineNodeLen >= 1) {
          if (this.tempGp.tempLine) this.tempGp.tempLine.remove();
          this.tempGp.lineNode[this.tempGp.lineNodeLen] = [
            evt.latlng.lat,
            evt.latlng.lng
          ];

          this.tempGp.tempLine = this.$utils.map.createPolyline(
            this.map,
            this.tempGp.lineNode,
            tempPolygonOpts
          );
        }
      });

      this.map.on("dblclick", () => {
        let polyline = this.$utils.map.createPolyline(
          this.map,
          this.tempGp.lineNode,
          finalPolygonOpts
        );
        this.overLayer.polylines.push(polyline);
        this.clearTemps();
      });
    },
    addNode(latlng, map) {
      let node = this.$utils.map.createIcon({
        iconUrl: require("./../assets/images/node.png"),
        iconSize: [10, 10]
      });
      node = this.$utils.map.createMakerByLatlng(latlng, {
        icon: node,
        interactive: false
      });
      node.addTo(map);
      return node;
    },
    showMeasurements() {
      this.overLayer.polylines.map(el => el.showMeasurements());
    },
    hideMeasurements() {
      this.overLayer.polylines.map(el => el.hideMeasurements());
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
