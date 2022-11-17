<template>
  <div style="height: 1px"></div>
  <div
    ref="inputRef"
    style="width: 300px; margin-left: 400px; margin-top: 200px"
  >
    <el-input
      @click="visibleRef = true"
      @focus="visibleRef = true"
      type="text"
    />
  </div>
  <Overlay
    v-if="inputRef"
    :target="inputRef"
    :visible="visibleRef"
    @close="visibleRef = false"
    placement="top"
  >
    <div class="item" v-for="(item, index) in props.data" :key="index">
      <slot name="item" v-bind="item">
        {{ item.text }}
      </slot>
    </div>
  </Overlay>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Overlay from "@/components/Overlay/overlay.vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: () => [
      { id: 1, text: "111" },
      { id: 2, text: "222" },
    ],
  },
});
const visibleRef = ref(props.visible);
const inputRef = ref(null);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

