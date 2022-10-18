<template>
  <Teleport to="body">
    <div
      ref="contentRef"
      v-if="props.visible"
      class="overlay"
      :style="positionStyle"
    >
      <div>
        <div v-if="props.hasMask">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { PropType, watch, ref, reactive, onMounted, nextTick } from "vue";
import { PlacementType, getPlacement } from "./placement";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  hasMask: {
    type: Boolean,
    default: true,
  },
  placement: {
    type: String as PropType<PlacementType>,
    default: "top",
  },
  target: {
    type: HTMLElement,
  },
});

const contentRef = ref(null);
let positionStyle = ref({});
const emit = defineEmits(["close"]);

const handleMouseDown = (e: Event) => {
  const safeNodeList: any = [];
  // 弹窗默认为安全节点
  if (contentRef.value) {
    safeNodeList.push(contentRef.value);
  }
  const clickNode = e.target;
  console.log("clickNode", clickNode);
  for (let index = 0; index < safeNodeList.length; index++) {
    const node = safeNodeList[index];
    if (node && node.contains(clickNode)) {
      return;
    }
  }
  emit("close");
};

const initOverlayPosition = () => {
  positionStyle.value = {};
  nextTick(() => {
    if (props.target && contentRef.value) {
      let positionData: { top?: string; left?: string } = getPlacement({
        target: props.target,
        overlay: contentRef.value,
        placement: props.placement,
      });
      console.log("positionData", positionData);
      positionData.top = `${positionData.top}px`;
      positionData.left = `${positionData.left}px`;
      positionStyle.value = positionData;
    }
  });
};

watch(
  () => props.visible,
  () => {
    if (props.visible) {
      initOverlayPosition();
      document.addEventListener("mousedown", handleMouseDown);
    } else {
      document.removeEventListener("mousedown", handleMouseDown);
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

