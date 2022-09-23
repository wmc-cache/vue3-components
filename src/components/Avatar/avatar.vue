<template>
  <span
    :style="style"
    :class="{
      'ant-avatar': true,
      'ant-avatar-lg': props.size === 'large',
      'ant-avatar-sm': props.size === 'small',
      'ant-avatar-image': props.src,
      [`ant-avatar-${props.shape}`]: props.shape,
    }"
    ref="wraperRef"
  >
    <div v-if="props.src">
      <img :src="props.src" />
    </div>
    <span ref="stringRef" class="ant-avatar-string">
      <slot> </slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import ResizeObserver from "resize-observer-polyfill";
const props = defineProps({
  size: {
    type: [Number, String],
    values: ["small", "medium", "large"],
    default: "medium",
  },
  shape: {
    type: String,
    values: ["circle", "square"],
    default: "circle",
  },
  src: {
    type: String,
    default: "",
  },
  style: {
    type: String,
    default: "",
  },
});
const wraperRef = ref();
const stringRef = ref();
const scale = ref<number>(1);

nextTick(() => {
  const reRender = () => {
    const wraperNode = wraperRef.value;
    const stringNode = stringRef.value;
    if (!wraperNode) {
      return;
    }
    const wraperWidth = wraperNode.offsetWidth;
    const textWidth = stringNode.offsetWidth;
    console.log("wraperWidth", wraperWidth, "textWidth", textWidth);
    const gap = 4;
    scale.value =
      wraperWidth - gap * 2 < textWidth
        ? (wraperWidth - gap * 2) / textWidth
        : 1;
  };
  reRender()
  stringRef.value.style.lineHeight = `${props.size}px`;
  stringRef.value.style.transform = `scale(${scale.value}) translateX(-50%)`;
  
  // const ob = new ResizeObserver(reRender);
  // ob.observe(stringRef.value);
});

const style =
  typeof props.size === "number"
    ? {
        width: `${props.size}px`,
        height: `${props.size}px`,
        lineHeight: `${props.size}px`,
        fontSize: `${props.size / 2}px`,
      }
    : props.style;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

