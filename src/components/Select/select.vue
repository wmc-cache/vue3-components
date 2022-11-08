<template>
  <div style="height: 200px"></div>
  <div ref="inputRef" style="width: 300px; margin-left: 200px">
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
    placement="bottom"
  >
    <div class="item">wwww</div>
    <div class="item">wwww</div>
    <div class="item">wwww</div>
    <div class="item">wwww</div>
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
});
const visibleRef = ref(props.visible);
const inputRef = ref(null);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

