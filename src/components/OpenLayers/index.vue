<template>
    <div ref="mapContainer" class="map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';

export default defineComponent({
    setup() {
        const mapContainer = ref<HTMLElement | null>(null);

        onMounted(() => {
            if (mapContainer.value) {
                // 创建地图
                const map = new Map({
                    target: mapContainer.value,
                    layers: [
                        new TileLayer({
                            source: new OSM(),
                        }),
                    ],
                    view: new View({
                        center: [13735580.44, 3635037.95],
                        zoom: 8,
                    }),
                });

                // GeoJSON 数据
                const geojsonData = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [[13735580.44, 3635037.95]], // 在这里设置点的经纬度
                            },
                            properties: {
                                name: '中心点',
                            },
                        },
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [[13735581.44, 3635038.95]], // 设置其他点
                            },
                            properties: {
                                name: '其他点',
                            },
                        },
                    ],
                };

                // 创建 Vector Source
                const vectorSource = new VectorSource({
                    features: new GeoJSON().readFeatures(geojsonData, {
                        featureProjection: 'EPSG:3857', // 将坐标投影转换为 Web Mercator
                    }),
                });

                // 创建 Vector Layer
                const vectorLayer = new VectorLayer({
                    source: vectorSource,
                });

                // 将 Vector Layer 添加到地图上
                map.addLayer(vectorLayer);
            }
        });

        return {
            mapContainer,
        };
    },
});
</script>

<style>
.map {
    width: 100%;
    height: 400px;
}
</style>
