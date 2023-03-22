<template>
  <div style="width: 10px;height:10px;position:absolute" :style="style" class="circle" />
</template>

<script lang="ts" setup>
const props = defineProps({
  position: {
    type: Object,
    default: {},

  },
})
const style = {
  background: getColor(),
  ...getPostion(props.position)
}



function getColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
}
/* 获取随机位置 */
function getPostion(position: any) {
  const { width, height } = position
  return { left: Math.ceil(Math.random() * width) + 'px', top: Math.ceil(Math.random() * height) + 'px' }
}

</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

