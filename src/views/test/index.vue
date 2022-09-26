<script lang="ts" setup>
// import Menu from "@/components/Menu/index.vue";
// import Popover from "@/components/Popover/index.vue";
// import Icon from "@/components/Icon/index";
import Radio from "@/components/Radio/index.vue";
import RadioGroup from "@/components/RadioGroup/radio-group.vue";
import Affix from "@/components/Affix/affix.vue";
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
    <div style="height: 500px"></div>
    <Avatar> 吴梦成1 </Avatar>
    <Radio value="123"></Radio>
    <Affix>
      <Avatar> 吴梦成0 </Avatar>
    </Affix>
    <Avatar> 吴梦2 </Avatar>
    <div style="height: 1000px"></div>
  </div>
</template>

<style>
</style>