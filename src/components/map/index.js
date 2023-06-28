let PointArr = [
  {
    lng: 87.387469,
    lat: 42.241181,
  },
  {
    lng: 87.399469,
    lat: 42.231181,
  },
  {
    lng: 87.400469,
    lat: 42.235181,
  },
  {
    lng: 87.410469,
    lat: 42.22181,
  },
  {
    lng: 87.412469,
    lat: 42.226181,
  },
  {
    lng: 87.413469,
    lat: 42.221181,
  },
  {
    lng: 87.423469,
    lat: 42.216181,
  },
];



let startMk, stopMk; //先将终点坐标展示的mark对象定义

/**
 * 创建地图轨迹动画
 */
export function createTrack(map) {
  let i = 0, interval = null;

  function start() {
    if (interval !== null) clearInterval(interval);
    startMk = createMarker('/bmap/images/startPoint.png', [PointArr[0].lng, PointArr[0].lat])
    map.addOverlay(startMk);
   
    interval = setInterval(function () {
      if (i >= PointArr.length) {
        clearInterval(interval);
        return;
      }
      drawLine(map, PointArr[i], PointArr[i + 1]); //画线调用
      i = i + 1;
    }, 300);
  }

  return {
    start
  }
}

function createMarker(imgSrc, point) {
  return new BMap.Marker(new BMap.Point(...point),{icon: createIcon(imgSrc)});  // 创建标注);
}

// 划线
function drawLine(map, PointArr, PointArrNext) {
  if (PointArrNext != undefined) {
    var polyline = new BMap.Polyline(
      [
        new BMap.Point(PointArr.lng, PointArr.lat),
        new BMap.Point(PointArrNext.lng, PointArrNext.lat),
      ],
      {
        strokeColor: "black",
        strokeWeight: 4,
        strokeOpacity: 1,
      }
    ); //创建折线
    map.addOverlay(polyline);
    //map.panTo(new BMap.Point(PointArrNext.lng, PointArrNext.lat));
    // addMarkerEnd(
    //   new BMap.Point(PointArrNext.lng, PointArrNext.lat),
    //   'move',
    //   map,
    //   PointArrNext,
    //   new BMap.Point(PointArr.lng, PointArr.lat)
    // ); //添加图标
  } else {
    addMarkerEnd([PointArr.lng, PointArr.lat], "stop", map); //添加终点图标
  }
}

function addMarkerEnd(point, name, mapInit, trackUnit, prePoint) {
  if (name == "move") {
    if (carMk) {
      //先判断第一次进来的时候这个值有没有定义，有的话就清除掉上一次的。然后在进行画图标。第一次进来时候没有定义也就不走这块，直接进行画图标
      mapInit.removeOverlay(carMk);
    }
    //carMk = new BMap.Marker(point, { icon: createIcon("/bmap/images/Mario.png") }); // 创建标注
    //getCarAngle(point, prePoint); // js求解两点之间的角度
    //carMk.setRotation(getCarAngle(point, prePoint) - 90); // 旋转的角度
    //mapInit.addOverlay(carMk); // 将标注添加到地图中
    //carMk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
  } else {
    // mapInit.removeOverlay(carMk);
    stopMk = createMarker('/bmap/images/stopPoint.png', point);  // 创建标注
    mapInit.addOverlay(stopMk);
  }
}

/**
 * 
 * @param {*} imgSrc 
 * @returns 创建图标
 */
function createIcon(imgSrc) {
  return new BMap.Icon(imgSrc, new BMap.Size(64, 48),
    {
      anchor: new BMap.Size(32, 48),
    }
  )
}

//获得角度的函数
function getCarAngle(n, next) {
  var ret;
  var w1 = (n.lat / 180) * Math.PI;
  var j1 = (n.lng / 180) * Math.PI;
  var w2 = (next.lat / 180) * Math.PI;
  var j2 = (next.lng / 180) * Math.PI;
  ret =
    4 * Math.pow(Math.sin((w1 - w2) / 2), 2) -
    Math.pow(Math.sin((j1 - j2) / 2) * (Math.cos(w1) - Math.cos(w2)), 2);
  ret = Math.sqrt(ret);
  // var temp = Math.sin(Math.abs(j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
  var temp = Math.sin((j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
  console.log(temp);
  ret = ret / temp;
  ret = (Math.atan(ret) / Math.PI) * 180;
  ret += 90;
  // 这里用如此臃肿的if..else是为了判定追踪单个点的具体情况,从而调整ret的值
  if (j1 - j2 < 0) {
    if (w1 - w2 < 0) {
      ret;
    } else {
      ret = -ret + 180;
    }
  } else {
    if (w1 - w2 < 0) {
      ret = 180 + ret;
    } else {
      ret = -ret;
    }
  }
  return ret;
}
