<template>
  <div style="height: 1px"></div>
  <div
    ref="inputRef"
    style="width: 300px; margin-left: 400px; margin-top: 200px"
  >
    <el-input
      v-model="value"
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
    :placement="placement"
  >
    <div @scroll="scroll" style="height: 300px; overflow-y: auto">
      <div
        class="select-item"
        :class="{ 'item-checked': item.checked }"
        @click="selectItem(item)"
        v-for="(item, index) in listData"
        :key="index"
      >
        <slot name="item" v-bind="item">
          {{ item.text }}
        </slot>
      </div>
      <div style="heigth: 50px" v-loading="true"></div>
    </div>
  </Overlay>
</template>

<script lang="ts" setup>
import { PropType, ref, computed, reactive } from "vue";
import Overlay from "@/components/Overlay/overlay.vue";
const props = defineProps({
  placement: {
    type: String,
    default: "bottom",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array as PropType<any[]>,
    default: () => [
      { id: 1, text: "111", checked: false },
      { id: 2, text: "222", checked: false },
    ],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});
const visibleRef = ref(props.visible);

const inputRef = ref(null);

const listData = reactive(props.data);

const value = ref("");

const emit = defineEmits(["finally"]);

const selectItem = (item: any) => {
  if (!props.multiple) {
    listData.forEach((ele) => (ele.checked = false));
  }
  item.checked = !item.checked;
  value.value = item.text;
};

const scroll = (e: any) => {
  // console.log(e)
  if (e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 10) {
    emit("finally");
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

