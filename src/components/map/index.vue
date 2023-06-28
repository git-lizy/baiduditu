<template>
   <div id="bmap_container"></div> 
</template>

<script setup>
  import { onMounted } from 'vue'
  import { createTrack } from './index'
  let map = null

  function initMap() {
    const { center, current_zoom, max_zoom, min_zoom, city } = bmapcfg
    map = new window.BMap.Map("bmap_container", { minZoom: min_zoom, maxZoom: max_zoom })
    let point = new window.BMap.Point(center.lng, center.lat);  // 创建点坐标  
    map.centerAndZoom(point, current_zoom);  // 初始化地图，设置中心点坐标和地图级别  

    //添加地图类型控件
    // map.addControl(new BMap.MapTypeControl({
    // mapTypes:[
    //   window.BMAP_NORMAL_MAP,
    //   window.BMAP_HYBRID_MAP
    // ]}));	  

    let mapStyle = {
      features: ["road", "building", "water", "land"], //隐藏地图上的"poi",
      style: "dark"
    };
    map.setMapStyle(mapStyle);

    map.setCurrentCity(city)    // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  }

   // 地图初始化
  onMounted(() => {
    initMap();
    const trackAni = createTrack(map)

    setTimeout(() => {trackAni.start();}, 3000)
  });
</script>

<style scoped>
  #bmap_container {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
  }
</style>