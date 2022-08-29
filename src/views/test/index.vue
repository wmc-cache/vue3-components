<template>
   <div>
      <Popover position="bottom" style="margin:100px">
         <template v-slot:content>
            <span>
               <test></test>
               <!-- <tree :data="arr"></tree> -->
            </span>
         </template>
         <button>按钮</button>
      </Popover>
   </div>
</template>

<script lang="ts" setup>
import test from '@/views/test/test'
import tree from '@/views/test/tree.vue'
import Popover from '@/components/Popover/index.vue'
interface Tree {
   rank: number
   text: string
   children?: Tree[]
}
const arr: Tree[] | [] = [
   {
      rank: 1, text: "菜单1", children: [
         {
            rank: 2, text: "菜单1-1", children: [
               {
                  rank: 3, text: "菜单1-1-1", children: [{
                     rank: 4, text: "菜单1-1-2", children: [{
                        rank: 5, text: "菜单1-1-3"
                     }]
                  }]
               },
            ],
         },
      ],
   },
   { rank: 1, text: "菜单2" }
]
</script>

<style>
</style>