<template>
  <div class="map-container">
    <div id="map-container"></div>
    <MapDraw @point="drawPoint" @polyline="drawPolyline" @polygon="drawPolygon" @end="drawOff"></MapDraw>
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
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      overLayer: {
        polylines: [],
        polygons: []
      },
      tempGp: {
        lineNode: [],
        lineNodeLen: 0,
        tempLine: null,
        polygonNode: [],
        polygonNodeLen: 0,
        tempNode: [],
        tempPolygon: null
      }
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
    },
    drawPolyline() {
      this.$utils.map.addCursorStyle(this.map, "crosshare-cursor");
      let tempPolygonOpts = {
        color: "rgba(255, 0, 0, 0.85)",
        weight: 3,
        opacity: 0.85
      };

      let finalPolygonOpts = {
        color: "rgba(0, 255, 0, 0.85)",
        weight: 3,
        opacity: 0.85
      };

      this.drawOn();

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
        this.overLayer.polylines.push(
          this.$utils.map.createPolyline(
            this.map,
            this.tempGp.lineNode,
            finalPolygonOpts
          )
        );
        this.tempGp.lineNode = [];
        this.tempGp.lineNodeLen = 0;
        this.tempGp.tempLine.remove();
        this.tempGp.tempNode.map(el => el.remove());
      });
    },
    addNode(latlng, map) {
      let node = this.$utils.map.createIcon({
        iconUrl: require("./../assets/images/node.png"),
        iconSize: [16, 16]
      });
      node = this.$utils.map.createMakerByLatlng(latlng, {
        icon: node
      });
      node.addTo(map);
      return node;
    },
    drawPolygon() {
      this.$utils.map.addCursorStyle(this.map, "crosshare-cursor");

      let tempPolygonOpts = {
        color: "rgba(255, 0, 0, 0.85)",
        weight: 3,
        opacity: 0.85
      };

      let finalPolygonOpts = {
        color: "rgba(0, 255, 0, 0.85)",
        weight: 3,
        opacity: 0.85
      };

      this.drawOn();

      this.map.on("click", evt => {
        this.tempGp.polygonNode.push([evt.latlng.lat, evt.latlng.lng]);
        this.tempGp.polygonNodeLen = this.tempGp.polygonNode.length;

        this.tempGp.tempNode.push(this.addNode(evt.latlng, this.map));
      });

      this.map.on("mousemove", evt => {
        if (this.tempGp.tempPolygon) this.tempGp.tempPolygon.remove();

        if (this.tempGp.polygonNodeLen == 1) {
          this.tempGp.polygonNode[this.tempGp.polygonNodeLen] = [
            evt.latlng.lat,
            evt.latlng.lng
          ];
          this.tempGp.tempPolygon = this.$utils.map.createPolyline(
            this.map,
            this.tempGp.polygonNode,
            tempPolygonOpts
          );
        } else if (this.tempGp.polygonNodeLen >= 2) {
          this.tempGp.polygonNode[this.tempGp.polygonNodeLen] = [
            evt.latlng.lat,
            evt.latlng.lng
          ];

          this.tempGp.tempPolygon = this.$utils.map.createPolygon(
            this.map,
            this.tempGp.polygonNode,
            tempPolygonOpts
          );
        }
      });

      this.map.on("dblclick", () => {
        this.overLayer.polygons.push(
          this.$utils.map.createPolygon(this.map, this.tempGp.polygonNode, finalPolygonOpts)
        );
        this.tempGp.polygonNode = [];
        this.tempGp.polygonNodeLen = 0;
        this.tempGp.tempPolygon.remove();
        this.tempGp.tempNode.map(el => el.remove());
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
