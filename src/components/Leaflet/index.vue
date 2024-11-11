<template>
    <div id="map" style="height: 400px; width: 100%;"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import L, { Map } from 'leaflet';

const map = ref<Map | null>(null); // 用 Map 类型定义 map

onMounted(() => {
    // 初始化地图
    map.value = L.map('map').setView([51.505, -0.09], 13);

    // 加载底图
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);


});
</script>

<style>
#map {
    height: 100%;
    width: 100%;
}
</style>
