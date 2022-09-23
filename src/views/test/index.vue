<script lang="ts" setup>
// import Menu from "@/components/Menu/index.vue";
// import Popover from "@/components/Popover/index.vue";
// import Icon from "@/components/Icon/index";
// import Radio from "@/components/Radio/index.vue";
// import RadioGroup from "@/components/RadioGroup/radio-group.vue";
// import Affix from "@/components/Affix/affix.vue";
import Avatar from "@/components/Avatar/avatar.vue";
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
</script>

<template>
  <div>
    <!-- <div style="height:500px"></div>
    <Affix>
      <RadioGroup>
        <Radio value="www">123</Radio>
        <Radio value="eee">123</Radio>
        <Radio value="ccc">123</Radio>
      </RadioGroup></Affix
    >
    <div style="height:1000px"></div> -->
    <Avatar shape="square" src="https://apic.douyucdn.cn/upload/avanew/face/201705/12/18/432ff01cc247e5eeacf9b3ee6764049c_middle.jpg" :size="64">
      吴梦成
    </Avatar>
  </div>
</template>

<style>
</style>