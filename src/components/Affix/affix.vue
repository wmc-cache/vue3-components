<template>
  <div
    id="wrap"
    class="wrap"
    ref="wrapRef"
    :style="wrapStyle"
    :class="{ fixed: affixed }"
  >
    {{ wrapStyle }}
    <div v-if="affixed" :style="positionStyle"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { debounce } from "@/util/debounce";
import ResizeObserver from "resize-observer-polyfill";
const props = defineProps({
  offsetTop: {
    type: Number,
    default: 50,
  },
});
const wrapRef = ref<HTMLElement>();
const wrapStyle = ref({});
const positionStyle = ref({});
const affixed = ref(false);

const updatePosition = () => {
  console.log("updataPosition");
  if (!wrapRef.value) return;
  const { top, width, height } = wrapRef.value.getBoundingClientRect();
  console.log(top, width, height);
  if (top < props.offsetTop && !affixed.value) {
    affixed.value = true;
    wrapStyle.value = {
      width,
      height,
      top: props.offsetTop + "px",
    };
    positionStyle.value = {
      width,
      height,
    };
  } else if (top >= props.offsetTop) {
    console.log(affixed.value)
    affixed.value = false;
    console.log(affixed.value)
  }
};
const newUpdatePosition = debounce(updatePosition, 500);
window.addEventListener("scroll", newUpdatePosition, false);

const ob = new ResizeObserver(newUpdatePosition);

nextTick(() => {
  if (wrapRef.value) ob.observe(wrapRef.value);
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

