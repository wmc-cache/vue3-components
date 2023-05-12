<template>
  <div v-for="(item, index) in data" :key="index" class="wrap">
    <div
      @click="item.show = !item.show"
      :style="{ marginLeft: item.rank * 5 + 'px' }"
      class="item"
    >
      <span v-if="item.children">
        <div class="flex-center">
          <svg
            :id="'arrow' + item.id"
            @click="rotate(item.id, item.show)"
            :class="{ 'rotate-90': item.show }"
            class="arrow"
            viewBox="0 0 1024 1024"
            fill="#fff"
            width="25"
            height="25"
          >
            <path d="M384 768 640 512 384 256Z" p-id="1732"></path>
          </svg>
        </div>
      </span>
      <span v-else style="margin-left: 25px"></span>

      <slot v-bind="item">
        {{ item.text }}
      </slot>
    </div>

    <tree v-if="item.children && item.show" :data="item.children">
      <slot v-bind="item">
        {{ item.text }}
      </slot>
    </tree>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
interface Tree {
  rank: number;
  text: string;
  children?: Tree[];
  show: boolean;
  id: number;
}
const props = defineProps({
  data: {
    type: Array as () => Tree[] | [],
    required: true,
  },
});
const data = reactive(props.data);

const rotate = (id: number, show: boolean) => {
  const ele = document.getElementById(`arrow${id}`);
  if (show) {
    ele?.classList.add("rotate-0");
    ele?.classList.remove("rotate-90");
  } else {
    ele?.classList.add("rotate-90");
    ele?.classList.remove("rotate-0");
  }
};
</script>

<script lang="ts">
export default {
  name: "tree",
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
