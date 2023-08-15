<template>
  {{ item1 }}
  <input v-model="item1.name" type="text">
</template>


<script lang="ts" setup>
import { computed,reactive} from 'vue';
const data = reactive([{ name: '', value:''}])


const item1 = computed({
   get() {
    return data[0]
  },
  set(value) {
    data[0] = value
  }
})
</script>