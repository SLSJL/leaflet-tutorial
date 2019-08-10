<template>
  <div class="map-layers">
    <ul>
      <li @click="$emit('basemapLayer')">basemapLayer</li>
      <li @click="$emit('tiledMapLayer')">tiledMapLayer</li>
      <li @click="$emit('dynamicMapLayer')">dynamicMapLayer</li>
      <li @click="$emit('imageMapLayer')">imageMapLayer</li>
      <li @click="$emit('featureLayer')">featureLayer</li>
      <li @click="$emit('clusterLayer')">clusterLayer</li>
      <li @click="$emit('heatMap')">heatmap</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "map-layers",
  data() {
    return {
      activeTool: ""
    };
  },
  methods: {
    point() {
      if (this.activeTool !== "point") {
        this.activeTool = "point";
        this.$emit("point");
      } else {
        this.activeTool = "";
        this.$emit("end");
      }
    },
    polyline() {
      if (this.activeTool !== "polyline") {
        this.activeTool = "polyline";
        this.$emit("polyline");
      } else {
        this.activeTool = "";
        this.$emit("end");
      }
    },
    polygon() {
      if (this.activeTool !== "polygon") {
        this.activeTool = "polygon";
        this.$emit("polygon");
      } else {
        this.activeTool = "";
        this.$emit("end");
      }
    }
  }
};
</script>
<style lang="less">
.map-layers {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 999;

  height: 36px;
  box-shadow: 0px 0px 50px 2px rgba(0, 0, 0, 0.35);
  background-color: #fff;
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      padding: 0 15px;
      height: 36px;
      font-size: 13px;
      line-height: 36px;
      cursor: pointer;
    }
    li.active {
      background-color: rgb(102, 156, 255);
      color: #fff;
    }
    li:hover {
      background-color: rgb(212, 224, 246);
    }
  }
}
</style>
