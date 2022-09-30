<template>
  <div class="square" v-if="props.type === 'square'">
    <div
      :style="{
        backgroundColor: '#073392',
        width: props.percent * 2 + 'px',
        height: '100%',
        borderRadius:'5px',
        transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)'
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    values: ["circle", "square"],
    default: "square",
  },
  percent: {
    type: Number,
    default: 40,
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

