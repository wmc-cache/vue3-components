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
import { useDebounceRef } from "@/hooks/useDebounceRef";
import computed  from "@/components/Computed/index.vue";
import { ref } from "vue";
import OpenLayers from '@/components/OpenLayers/index.vue'
import Leaflet from '@/components/Leaflet/index.vue'

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

// [13735580.44, 3635037.95]
const value = useDebounceRef('')
</script>

<template>
  <div>
    <!-- <pdf></pdf> -->
    <!-- <computed></computed> -->

    <Leaflet></Leaflet>

    <!-- <OpenLayers></OpenLayers> -->

    <!-- <el-input v-model="value" placeholder=""></el-input> -->

    <!-- <List></List> -->

    <!-- <many-point></many-point> -->

    <!-- <Icon :size="50" type="fixed"></Icon> -->

    <!-- <Select>
                    <template #item="{ id, text }">
                      <div>{{ id }}-{{ text }}</div>
                    </template>
                  </Select> -->

  </div>
</template>

