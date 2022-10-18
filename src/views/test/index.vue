<script lang="ts" setup>
// import Menu from "@/components/Menu/index.vue";
// import Popover from "@/components/Popover/index.vue";
// import Icon from "@/components/Icon/index";
import Radio from "@/components/Radio/index.vue";
import RadioGroup from "@/components/RadioGroup/radio-group.vue";
import Affix from "@/components/Affix/affix.vue";
import Avatar from "@/components/Avatar/avatar.vue";
import ProgressVue from "@/components/Progress/progress.vue";
import Overlay from "@/components/Overlay/overlay.vue";
import { ref } from "vue";
interface Tree {
  rank: number;
  text: string;
  children?: Tree[];
  show: boolean;
}
const arr: Tree[] | [] = [
  {
    rank: 1,
    text: "菜单1",
    show: true,
    children: [
      {
        rank: 2,
        text: "菜单1-1",
        show: false,
        children: [
          {
            rank: 3,
            text: "菜单1-1-1",
            show: true,
            children: [
              {
                rank: 4,
                text: "菜单1-1-2",
                show: false,
                children: [
                  {
                    rank: 5,
                    text: "菜单1-1-3",
                    show: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { rank: 1, text: "菜单2", show: true },
];
const visible = ref(false);
const buttonRef = ref(null);
</script>

<template>
  <div>
     <div style="height:600px"></div>

    <Overlay
      v-if="buttonRef"
      :target="buttonRef"
      :visible="visible"
      @close="visible = false"
      placement="bottomRight"
    >
    </Overlay>

    <button style="margin-left: 200px" ref="buttonRef" @click="visible = true">
      click
    </button>

   
  </div>
</template>

<style>
</style>