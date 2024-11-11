<template>
    <div class="home-view">
        <div class="map-layer" id="map"></div>
    </div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';

onMounted(() => {
    const bounds = L.latLngBounds(L.latLng(0, 0), L.latLng(-256, 256))
    // 初始化地图
    let map = L.map('map', {
        center: [-102, 148],
        maxBounds: bounds,
        crs: L.CRS.Simple,
        attributionControl: false,
        zoomControl: false,
        maxZoom: 7,
        minZoom: 4,
        zoom: 5

    })

    L.tileLayer('images/map/{z}/{x}/{y}.png', {
        minZoom: 4,
        maxZoom: 7,
        noWrap: true
    }).addTo(map)




});
</script>

<style>
.home-view {
    position: relative;
    height: 100vh;
    width: 100vw;
}

.map-layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
