<template>
  <div class="map-container">
    <div id="map-container"></div>
    <NavigationCtrl @zoomIn="zoomIn" @zoomOut="zoomOut" @resetMap="resetMap"></NavigationCtrl>
    <MapTools
      @maker="addMaker"
      @polyline="addPolyline"
      @polygon="addPolygon"
      @tooltip="addToolitps"
      @popup1="addPopUp"
      @popup2="bindPopup"
    ></MapTools>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationCtrl from "@/components/NavigationCtrl.vue";
import MapTools from "@/components/MapTools.vue";

export default {
  name: "mapView",
  components: { NavigationCtrl, MapTools },
  data() {
    return {
      map: null,
      arr: [],
      singleLine: [
        [51.517288954651875, -0.16685485839843753],
        [51.51194758264939, -0.1474571228027344],
        [51.51878442657495, -0.13320922851562503],
        [51.530426064343594, -0.1419639587402344],
        [51.53640593191922, -0.11209487915039064]
      ],
      miltipleLine: [
        [
          [51.49282033577651, -0.11432647705078126],
          [51.48010001366223, -0.10265350341796876],
          [51.48084836613703, -0.08222579956054689],
          [51.49591970845512, -0.08239746093750001]
        ],
        [
          [51.47614423230301, -0.08909225463867188],
          [51.47571655971428, -0.05973815917968751],
          [51.4829864484029, -0.03398895263671876],
          [51.49025517833079, -0.008239746093750002],
          [51.477641054786694, 0.008583068847656252],
          [51.487796767005534, 0.021800994873046875]
        ]
      ],
      singlePolygon: [
        [51.50203767899114, -0.13977527618408206],
        [51.505777518488806, -0.13072013854980472],
        [51.505109712517786, -0.1296043395996094],
        [51.50388092395907, -0.12921810150146487],
        [51.50345351147583, -0.12921810150146487],
        [51.50302609498369, -0.12947559356689456],
        [51.502545246638114, -0.12973308563232425],
        [51.50219796412198, -0.12990474700927737],
        [51.50177053585362, -0.12990474700927737],
        [51.5014232474337, -0.12999057769775393],
        [51.50043479667606, -0.13891696929931643],
        [51.50134310357634, -0.1399040222167969],
        [51.50195753621433, -0.13973236083984378],
        [51.50195753621433, -0.13973236083984378]
      ],
      miltiplePolygon: [
        [
          [51.481703611072156, -0.09407043457031251],
          [51.480313829908056, -0.09080886840820312],
          [51.481703611072156, -0.08531570434570314],
          [51.482131227525315, -0.07415771484375001],
          [51.48394855271953, -0.07415771484375001],
          [51.48426924964768, -0.07638931274414064],
          [51.486941636341456, -0.07604598999023438],
          [51.485552014806856, -0.07947921752929689],
          [51.48426924964768, -0.0830841064453125],
          [51.48320025111633, -0.08754730224609376],
          [51.4826657424533, -0.08943557739257814],
          [51.481489801341986, -0.09441375732421875],
          [51.481489801341986, -0.09441375732421875]
        ],
        [
          [51.49869827721546, -0.05613327026367188],
          [51.498377681772325, -0.05922317504882813],
          [51.49506473014368, -0.05802154541015626],
          [51.49132401147376, -0.05407333374023438],
          [51.49143089340988, -0.05184173583984376],
          [51.492072179764314, -0.05046844482421876],
          [51.49292721420453, -0.04978179931640626],
          [51.49388910878061, -0.04840850830078125],
          [51.49506473014368, -0.05149841308593751],
          [51.49602657961649, -0.05270004272460938],
          [51.49709527744871, -0.05373001098632813],
          [51.498484547170605, -0.05647659301757813],
          [51.49869827721546, -0.05699157714843751],
          [51.49762961696847, -0.06025314331054688],
          [51.49762961696847, -0.06025314331054688]
        ]
      ],
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    };
  },
  mounted() {
    let _self = this;
    this.map = this.$utils.map.createMap("map-container", {
      zoomControl: false
    });
    this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});
    this.map.setView([51.505, -0.09], 13);
    this.map.on("click", function(evt) {
      _self.arr.push([evt.latlng.lat, evt.latlng.lng]);
    });
  },
  methods: {
    zoomIn() {
      this.map.zoomIn();
    },
    zoomOut() {
      this.map.zoomOut();
    },
    resetMap() {
      this.map.flyTo([51.505, -0.09], 13);
    },
    addMaker() {
      this.$utils.map.createMakerByXY(this.map, [-0.09, 51.505]);

      let gifIcon = this.$utils.map.createIcon({
        iconUrl: require("./../assets/images/sample.gif"),
        iconSize: [32, 32]
      });
      this.$utils.map.createMakerByXY(this.map, [-0.095, 51.505], {
        icon: gifIcon
      });

      let pngJpgIcon = this.$utils.map.createIcon({
        iconUrl: require("./../assets/images/tree.png"),
        iconSize: [52, 42]
      });
      this.$utils.map.createMakerByXY(this.map, [-0.09, 51.49], {
        icon: pngJpgIcon
      });
    },
    addPolyline() {
      let singleLineStyle = {
        stroke: true,
        color: "#de0000",
        fill: "",
        weight: 3,
        opacity: 1
      };

      this.$utils.map.createPolyline(
        this.map,
        this.singleLine,
        singleLineStyle
      );

      let multipleLineStyle = {
        stroke: true,
        color: "#0085fb",
        weight: 4,
        opacity: 1
      };
      this.$utils.map.createPolyline(
        this.map,
        this.miltipleLine,
        multipleLineStyle
      );
    },
    addPolygon() {
      let singleAreaStyle = {
        stroke: true,
        color: "#de0000",
        weight: 2,
        opacity: 1,
        fill: true,
        fillColor: "#0085fb",
        fillOpacity: 0.45
      };

      this.$utils.map.createPolyline(
        this.map,
        this.singlePolygon,
        singleAreaStyle
      );

      let multipleAreaStyle = {
        stroke: true,
        color: "#0085fb",
        weight: 2,
        opacity: 1,
        fill: true,
        fillColor: "#de0000",
        fillOpacity: 0.45
      };
      this.$utils.map.createPolyline(
        this.map,
        this.miltiplePolygon,
        multipleAreaStyle
      );
    },
    addToolitps() {
      let pngJpgIcon = this.$utils.map.createIcon({
        iconUrl: require("./../assets/images/tree.png"),
        iconSize: [52, 42]
      });
      let marker = this.$utils.map.createMakerByXY(this.map, [-0.09, 51.49], {
        icon: pngJpgIcon
      });
      let toolitps = () => {
        let tpl = `<h1> tooltips <h1><p>test massage for tooltips</p>`;
        return tpl;
      };
      marker.bindTooltip(toolitps, { className: "sample-tooltips" });
    },
    addPopUp() {
      let popup = this.$utils.map.createPopup(this.map, {
        maxWidth: 200,
        minWidth: 100,
        className: "sample-popup"
      });

      popup
        .setLatLng(this.$utils.map.createLatlonByArray([51.505, -0.09]))
        .setContent(
          `<h1>popup demo</h1><p>This is the content of the popup demo. The length of the content might be so very that maybe beyond the maxWidth that we set on the popup</p>`
        )
        .openOn(this.map);
    },
    bindPopup() {
      let popup = this.$utils.map.createPopup(this.map, {
        maxWidth: 200,
        minWidth: 100,
        className: "sample-popup"
      });

      popup.setContent(
        `<h1>popup demo</h1><p>This is the content of the popup demo. The length of the content might be so very that maybe beyond the maxWidth that we set on the popup</p>`
      );

      let gifIcon = this.$utils.map.createIcon({
        iconUrl: require("./../assets/images/sample.gif"),
        iconSize: [32, 32]
      });
      let marker = this.$utils.map.createMakerByXY(this.map, [-0.095, 51.505], {
        icon: gifIcon
      });
      marker.bindPopup(popup);
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
}
#map-container {
  width: 100%;
  height: 100%;
}
</style>
