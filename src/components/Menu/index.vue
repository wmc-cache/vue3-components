<template>
  <div v-for="(item, index) in data" :key="index" class="wrap">
    <div @click="item.show = !item.show" :style="{ marginLeft: item.rank * 5 + 'px' }" class="item">
      <span v-if="item.children"> > </span>
      <span v-else>+</span>
      {{ item.text }}
    </div>


    <tree v-if="item.children && item.show" :data="item.children">


    </tree>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
interface Tree {
  rank: number;
  text: string;
  children?: Tree[];
  show: boolean;
}
const props = defineProps({
  data: {
    type: Array as () => Tree[] | [],
    required: true,
  },
});
const data = reactive(props.data);
</script>

<script lang="ts">
export default {
  name: "tree",
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
