<template>
  <div class="map-tools">
    <ul>
      <li :class="[{active: activeTool == 'point'}]" @click="point">Point</li>
      <li :class="[{active: activeTool == 'polyline'}]" @click="polyline">Polyline</li>
      <li :class="[{active: activeTool == 'polygon'}]" @click="polygon">Polygon</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "mapDraw",
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
.map-tools {
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
