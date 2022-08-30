<template>
    <div v-for="(item, index) in data" :key="index">
        <div :style="{ marginLeft: item.rank * 10 + 'px' }">
            <span v-if="item.children" @click="item.show = !item.show"> > </span>
            <span v-else>+</span>
            {{ item.text }}
        </div>
        <tree v-if="item.children&&item.show" :data="item.children">
        </tree>
    </div>
</template>

<script lang="ts" setup>
import { defineProps,computed,reactive } from 'vue'
interface Tree {
    rank: number
    text: string
    children?: Tree[],
    show:boolean
}
const props = defineProps({
    data: {
        type: Array as () => Tree[] | [],
        required: true
    }
})
const data = reactive(props.data)
console.log(data)
</script>

<script lang="ts">
export default {
    name: "tree",
}
</script>
