
<template>
  <div v-if="isShow" :class="['message', `message-${type}`]">
    {{ message }}
    <button class="message-close" @click="close">x</button>
  </div>
</template>
  
  
<script lang="ts" setup>
import { ref } from "vue";

export type MessageType = "info" | "success" | "warning" | "error";

export interface MessageOption {
  type: MessageType;
  message: string;
  duration?: number;
}

const props = defineProps({
  type: {
    type: String as () => MessageType,
    default: "info",
  },
  message: {
    type: String,
    default: "",
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const isShow = ref(true);

const close = () => {
  isShow.value = false;
};

setTimeout(() => {
  close();
}, props.duration);
</script>



<style scoped>
.message {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  color: #fff;
  position: absolute;
  width: 50vw;
  top:50px;
  left:25vw;
}

.message-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}

.message-info {
  background-color: #2196f3;
}

.message-success {
  background-color: #4caf50;
}

.message-warning {
  background-color: #ff9800;
}

.message-error {
  background-color: #f44336;
}
</style>