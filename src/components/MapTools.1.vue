<template>
  <div class="map-tools">
    <ul>
      <li @click="$emit('maker')">Maker</li>
      <li @click="$emit('polyline')">Polyline</li>
      <li @click="$emit('polygon')">Polygon</li>
      <li @click="$emit('tooltip')">tooltips</li>
      <li @click="$emit('popup1')">Popup</li>
      <li @click="$emit('popup2')">BindPopup</li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "mapNavigation"
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

    li:hover {
      background-color: rgb(212, 224, 246);
    }
  }
}
</style>
