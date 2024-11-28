<template>
    <div class="home-view">
        <div class="map-layer" id="map"></div>
        <div class="ui-layer">
            <GuideMarkerUI />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EventManager } from './event-manager'
import GuideMarkerUI from './GuideMarkerUI.vue'

// 使用更强的类型定义
interface Point {
    lat: number;
    lng: number;
    pointId: number;
    icon: string;
    name: string;
}

interface GuideUIItem {
    lat: number;
    lng: number;
    icon: string;
    angle: number;
}

const pointList: Point[] = [
    {
        lat: -54.25,
        lng: 65.0625,
        pointId: 1,
        icon: "https://uploadstatic.mihoyo.com/ys-obc/2020/09/08/75276545/c59585d1fabc9c22ad3fcf94e1622aa8_357413506633071859.png",
        name: "七天"
    },
    {
        lat: -63.875,
        lng: 63.34375,
        pointId: 2,
        icon: "https://uploadstatic.mihoyo.com/ys-obc/2020/09/08/75276545/c59585d1fabc9c22ad3fcf94e1622aa8_357413506633071859.png",
        name: "七天神像"
    },
];

// 使用 ref 来管理地图对象，确保只初始化一次
const map = ref<L.Map>();

onMounted(() => {
    const bounds = L.latLngBounds(L.latLng(0, 0), L.latLng(-256, 256));
    map.value = createMap(bounds);

    // 添加地图功能
    if (map.value) {
        addTileLayer(map.value);
        addMarker(map.value);
        addZoomSlider(map.value);
        addClickEvent(map.value);
        addMoveEvent(map.value);
        calcOutScreenPoints(map.value);
    }
});

// 创建地图
function createMap(bounds: L.LatLngBounds): L.Map {
    return L.map('map', {
        center: [-54.25, 65.0625],
        maxBounds: bounds,
        crs: L.CRS.Simple,
        attributionControl: false,
        zoomControl: false,
        maxZoom: 7,
        minZoom: 4,
        zoom: 5,
    });
}

// 添加瓦片图层
function addTileLayer(map: L.Map) {
    L.tileLayer('images/map/{z}/{x}/{y}.png', {
        minZoom: 4,
        maxZoom: 7,
        noWrap: true,
    }).addTo(map);
}

// 添加标记
function addMarker(map: L.Map) {
    pointList.forEach((point) => {
        L.marker(L.latLng(point.lat, point.lng), {
            icon: L.divIcon({
                className: 'map-mark-item',
                html: `<div class="area-mark-item">${point.name}</div>`,
            }),
        }).addTo(map);
    });
}

// 添加 ZoomSlider 控件
function addZoomSlider(map: L.Map) {
    //@ts-ignore
    map.addControl(new L.Control.Zoomslider({
        position: 'bottomright', stepHeight: 30, knobHeight: 20
    }));
}

// 点击事件处理
function addClickEvent(map: L.Map) {
    map.on('click', (e) => {
        const popupContent = `
      <div style="width:200px;height:200px">
        <div>你点击的坐标是：纬度: ${e.latlng.lat}</div>
        <div>你点击的坐标是：经度: ${e.latlng.lng}</div>
      </div>
    `;
        const popup = L.popup()
            .setLatLng([e.latlng.lat, e.latlng.lng])
            .setContent(popupContent)
            .openOn(map);
    });
}

// 地图移动事件处理
function addMoveEvent(map: L.Map) {
    map.on('moveend', () => {
        if (map) {
            calcOutScreenPoints(map);
        }
    });
}

// 计算出屏点并渲染引导UI
function calcOutScreenPoints(map: L.Map) {
    const guideUIAry: GuideUIItem[] = [];
    const calcPointMap: { [key: string]: { dist: number, pointItem: Point, inScreen: boolean } } = {};

    pointList.forEach((pointItem) => {
        const { name } = pointItem;
        if (!calcPointMap[name]) calcPointMap[name] = { dist: Infinity, pointItem, inScreen: false };

        if (map.getBounds().contains([pointItem.lat, pointItem.lng])) {
            calcPointMap[name].inScreen = true;
        } else {
            const dist = map.getCenter().distanceTo([pointItem.lat, pointItem.lng]);
            if (dist < calcPointMap[name].dist) {
                calcPointMap[name] = { dist, pointItem, inScreen: false };
            }
        }
    });

    for (const key in calcPointMap) {
        const { inScreen, pointItem } = calcPointMap[key];
        if (!inScreen) {
            const directionVector = { x: pointItem.lng - map.getCenter().lng, y: pointItem.lat - map.getCenter().lat };
            const angle = calcVectorAngle({ x: 1, y: 0 }, directionVector);
            guideUIAry.push({ angle, icon: pointItem.icon, lat: pointItem.lat, lng: pointItem.lng });
        }
    }

    EventManager.emit('RenderMapGuideUI', guideUIAry);
}

// 计算向量角度
function calcVectorAngle(vectorA: { x: number; y: number }, vectorB: { x: number; y: number }): number {
    const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
    const magnitudeA = Math.sqrt(vectorA.x * vectorA.x + vectorA.y * vectorA.y);
    const magnitudeB = Math.sqrt(vectorB.x * vectorB.x + vectorB.y * vectorB.y);
    const cosTheta = dotProduct / (magnitudeA * magnitudeB);
    const theta = Math.acos(cosTheta);
    const crossProduct = vectorA.x * vectorB.y - vectorA.y * vectorB.x;
    return (crossProduct > 0 ? 1 : -1) * theta;
}

</script>

<style lang="less" scoped>
.home-view {
    position: relative;
    width: 100vw;
    height: 100vh;

    .map-layer {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            }
            
            .ui-layer {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                z-index: 2;
            }
}
</style>
