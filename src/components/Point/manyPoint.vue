<template>
    <div style="width:100vw;height:100vh" ref="box">

        <div v-for="(item, idx) in renderList" :key="idx">

            <Point v-if="fn(idx / 1000)" :position="position">

            </Point>

        </div>
    </div>
</template>

<script lang="ts" setup>

import Point from "./point.vue"

import { ref, onMounted, reactive } from "vue"

import { useDefer } from "@/hooks/useDefer";

const fn = useDefer()

const position = reactive({ width: 0, height: 0 })

let renderList = reactive<number[]>([])

let index = ref(0)

const box = ref()

onMounted(() => {

    const { offsetHeight, offsetWidth } = box.value

    position.height = offsetHeight;

    position.width = offsetWidth

    renderList.push(...new Array(20000).fill(1))

})

</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

