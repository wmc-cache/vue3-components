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
const visible = ref(true);
const buttonRef = ref(null);
</script>

<template>
  <div>
    <!-- <div style="height: 500px"></div>
    <Avatar> 吴梦成1 </Avatar>
    <Radio value="123"></Radio>
    <Affix :offsetTop="300">
      <ProgressVue></ProgressVue>
      <Avatar
        src="http://wework.qpic.cn/bizmail/ibLia2gPtIN3csXurYHibwBcwLYzEC8oYs7jWoLsnJzCE6dicpxTZWUzMg/0"
      >
        吴梦成0
      </Avatar>
    </Affix>
    
    <div style="height: 1000px"></div> -->

    <Overlay
      :target="buttonRef"
      :visible="visible"
      @close="visible = false"
      placement="top"
    >
      <Avatar> 吴梦2 </Avatar>
    </Overlay>
    
    <button ref="buttonRef" @click="visible = true">click</button>
    <div style="height:200px">1234141</div>
  </div>
</template>

<style>
</style>