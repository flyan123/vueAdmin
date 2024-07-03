<template>
  <baidu-map
    class="map"
    :center="{ lng: lng, lat: lat }"
    :zoom="15"
    :scroll-wheel-zoom="true"
  >
    <bm-marker
      :position="{ lng: lng, lat: lat }"
      :dragging="true"
      animation="BMAP_ANIMATION_BOUNCE"
    >
    </bm-marker>
  </baidu-map>
</template>

<script>
export default {
  data() {
    return {
      lng: 116.404,
      lat: 39.915,
    }
  },
  methods: {
    setLoacl(lng, lat) {
      this.lng = lng
      this.lat = lat
    },
  },
}
</script>

<style>
.map {
  margin-top: 20px;
  width: 100%;
  height: 300px;
}
</style>