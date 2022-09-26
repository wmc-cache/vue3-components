<template>
  <div
    id="wrap"
    class="wrap"
    ref="wrapRef"
    :style="wrapStyle"
    :class="{ fixed: affixed }"
  >
    <slot></slot>
  </div>
  <div ref="placeholderRef" v-if="affixed" :style="placeholderStyle"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
const props = defineProps({
  offsetTop: {
    type: Number,
    default: 100,
  },
});
const wrapRef = ref<HTMLElement>();
const placeholderRef = ref<HTMLElement>();
const wrapStyle = ref({});
const placeholderStyle = ref({});
const affixed = ref(false);

const updatePosition = () => {
  if (!wrapRef.value) return;
  const { top, width, height } = wrapRef.value.getBoundingClientRect();
  let placeholderTop = 0;
  if (placeholderRef.value) {
    const { top } = placeholderRef.value.getBoundingClientRect();
    placeholderTop = top;
  }
  if (top <= props.offsetTop && !affixed.value) {
    affixed.value = true;
    wrapStyle.value = {
      width: width + "px",
      height: height + "px",
      top: props.offsetTop + "px",
    };
    placeholderStyle.value = {
      width: width + "px",
      height: height + "px",
    };
  } else if (top > props.offsetTop) {
    affixed.value = false;
    placeholderStyle.value = {
      width: 0,
      height: 0,
    };
  } else if (placeholderTop >= props.offsetTop) {
    affixed.value = false;
    placeholderStyle.value = {
      width: 0,
      height: 0,
    };
  }
};
onMounted(() => {
  window.addEventListener("scroll", updatePosition, false);
});
onUnmounted(() => {
  window.removeEventListener("scroll", updatePosition, false);
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

