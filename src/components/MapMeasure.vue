<template>
  <div class="map-tool-measure">
    <ul>
      <li @click="$emit('polyline')">动态线-量测</li>
      <li @click="$emit('polygon')">动态线-量测</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "map-measure"
};
</script>
<style lang="less">
.map-tool-measure {
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
