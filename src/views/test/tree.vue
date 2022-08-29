<template>
    <div v-for="(item, index) in props.data" :key="index">
        <div :style="{ marginLeft: item.rank * 10 + 'px' }">
            <span v-if="item.children"> > </span>
            <span v-else>*</span>
            {{ item.text }}
        </div>
        <tree v-if="item.children" :data="item.children">
        </tree>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
interface Tree {
    rank: number
    text: string
    children?: Tree[]
}
const props = defineProps({
    data: {
        type: Array as () => Tree[] | [],
        required: true
    }
})
</script>

<script lang="ts">
export default {
    name: "tree",
}
</script>
