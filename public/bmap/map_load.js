var bmapcfg = {
  imgext: '.png',   //瓦片图的后缀 ------ 根据需要修改，一般是 .png .jpg
  tiles_dir: '',       //普通瓦片图的地址，为空默认在 offlinemap/tiles/ 目录
  tiles_hybrid: '',       //卫星瓦片图的地址，为空默认在 offlinemap/tiles_hybrid/ 目录
  tiles_self: '/bmap/images/tile/',        //自定义图层的地址，为空默认在 offlinemap/tiles_self/ 目录
  city: "马兰",
  center: {lng: 87.387469, lat: 42.241181},
  current_zoom: 15,  // 地图当前缩放级数
  max_zoom: 17, // 地图最大放缩级数
  min_zoom: 10, // 地图最小放缩级数
};

//////////////////下面的保持不动///////////////////////////////////
var scripts = document.getElementsByTagName("script");
var JS__FILE__ = scripts[scripts.length - 1].getAttribute("src");  //获得当前js文件路径
bmapcfg.home = JS__FILE__.substr(0, JS__FILE__.lastIndexOf("/")+1); //地图API主目录
(function(){
  window.BMap_loadScriptTime = (new Date).getTime();
  //加载地图API主文件
  document.write('<script type="text/javascript" src="'+bmapcfg.home+'bmap_offline_api_v3.0_min.js"></script>');
})();
///////////////////////////////////////////////////////////////////
