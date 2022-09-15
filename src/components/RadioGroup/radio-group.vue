<template>
  <span :class="{ 'ant-radio-group': true }">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import "./index.scss";
import mitt from "mitt" 
import { onMounted, onUnmounted } from "vue-demi";
export const emitter = mitt();
</script>

<script lang="ts" setup>
onMounted(()=>{
   emitter.on('radioClick',(data:any)=>{
      console.log(data.value)
      emitter.emit('valueChange',data.value)
   }) 
})
onUnmounted(()=>{
  emitter.off('radioClick')
})
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  disabled: {
    type:Boolean,
    default:false,
  },
});
</script>

