<script lang="ts" setup>
import Menu from "@/components/Menu/index.vue";
import Icon from "@/components/Icon/index";
import Radio from "@/components/Radio/index.vue";
import RadioGroup from "@/components/RadioGroup/radio-group.vue";
import Affix from "@/components/Affix/affix.vue";
import Avatar from "@/components/Avatar/avatar.vue";
import ProgressVue from "@/components/Progress/progress.vue";
import Overlay from "@/components/Overlay/overlay.vue";
import Select from "@/components/Select/select.vue";
import List from "@/components/List/list.vue";
import manyPoint from "@/components/Point/manyPoint.vue";
import pdf from "@/components/Pdf/pdf.vue";
import LowcodeEditor from "@/components/LowcodeEditor/index.vue";
import {createMessage} from "@/components/Message/message"
import { useDebounceRef } from "@/hooks/useDebounceRef";
import computed  from "@/components/Computed/index.vue";
import { ref } from "vue";

interface Tree {
  rank: number;
  text: string;
  children?: Tree[];
  show: boolean;
  id: number;
}
const arr: Tree[] | [] = [
  {
    id: 1,
    rank: 1,
    text: "菜单1",
    show: true,
    children: [
      {
        id: 2,
        rank: 2,
        text: "菜单1-1",
        show: false,
        children: [
          {
            id: 3,
            rank: 3,
            text: "菜单1-1-1",
            show: true,
            children: [
              {
                id: 4,
                rank: 4,
                text: "菜单1-1-2",
                show: false,
                children: [
                  {
                    id: 5,
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
  { id: 6, rank: 1, text: "菜单2", show: true },
];
const data = ref([
  { id: 1, text: "111", checked: false },
  { id: 2, text: "222", checked: false },
  { id: 1, text: "111", checked: false },
  { id: 2, text: "222", checked: false },
  { id: 1, text: "111", checked: false },
  { id: 2, text: "222", checked: false },
  { id: 1, text: "111", checked: false },
  { id: 2, text: "222", checked: false },
  { id: 1, text: "111", checked: false },
  { id: 2, text: "222", checked: false },
]);
// const close = createMessage({
//   type: 'error',
//   message: 'This is a success message.',
//   duration: 15000
// })


// const close2 = createMessage({
//   type: 'success',
//   message: 'This is a success message.',
//   duration: 5000,
// })

// setTimeout(()=>{
//    close()
// },3000)
const value = useDebounceRef("");
let id = 1;
const getData = () => {
  setTimeout(() => {
    data.value.push({ id: id++, text: "1", checked: false });
  }, 3000);
};
</script>

<template>
  <div>
  <LowcodeEditor></LowcodeEditor>
    <!-- <Menu :data="arr"></Menu> -->
   <!-- <pdf></pdf> -->
   <!-- <computed></computed> -->

    <!-- <el-input v-model="value" placeholder=""></el-input> -->

    <!-- <List></List> -->

    <!-- <many-point></many-point> -->

    <!-- <Icon :size="50" type="fixed"></Icon> -->
    
    <!-- <Select multiple @finally="getData" :data="data">
      <template #item="{ id, text }">
        <div>{{ id }}-{{ text }}</div>
      </template>
    </Select> -->
    <!-- <Table></Table> -->
  </div>
</template>

