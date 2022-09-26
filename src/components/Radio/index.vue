<template>
  <span
    :class="{
      'ant-radio-wrapper': true,
      'ant-radio-wrapper-disabled': disabled,
    }"
    @click="handleClick"
  >
    <span
      :class="{
        'ant-radio': true,
        'ant-radio-checked': checked,
        'ant-radio-disabled': disabled,
      }"
    >
      <input
        :value="value"
        type="radio"
        class="ant-radio-input"
        ref="inputEl"
      />
      <span class="ant-radio-inner"></span>
    </span>
    <span>
      <slot></slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { emitter } from "../RadioGroup/radio-group.vue";
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: "",
  },
});
onMounted(() => {
  emitter.on("valueChange", (value) => {
    checked.value = inputEl.value === value;
  });
});
onUnmounted(()=>{
  emitter.off('valueChange')
})
const checked = ref(props.checked);
const disabled = ref(props.disabled);
const value = ref(props.value);
const inputEl = ref(null);
const handleClick = (e: Event) => {
  emitter.emit("radioClick", inputEl.value);
  if (disabled.value || checked.value) {
    return;
  }
  checked.value = !checked.value;
};
</script>


<style lang="scss" scoped>
  @import "./index.scss";
  </style>

