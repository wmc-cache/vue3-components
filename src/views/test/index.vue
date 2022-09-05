<template>
   <div>
      <Popover position="bottom" style="margin-top:100px">
         <template v-slot:content>
            <span>
               <test></test>
               <tree :data="arr"></tree>
            </span>
         </template>
         <button>按钮</button>
         <Icon icon="eye"></Icon>
      </Popover>
   </div>
</template>

<script lang="ts" setup>
import test from '@/views/test/test'
import tree from '@/components/Recursive/index.vue'
import Popover from '@/components/Popover/index.vue'
import Icon from "@/components/Icon/index"
interface Tree {
   rank: number
   text: string
   children?: Tree[],
   show:boolean
}
const arr: Tree[] | [] = [
   {
      rank: 1, text: "菜单1", show:true , children: [
         {
            rank: 2, text: "菜单1-1",show:false ,children: [
               {
                  rank: 3, text: "菜单1-1-1",show:true,children: [{
                     rank: 4, text: "菜单1-1-2",show:false ,children: [{
                        rank: 5, text: "菜单1-1-3",show:true
                     }]
                  }]
               },
            ],
         },
      ],
   },
   { rank: 1, text: "菜单2",show:true }
]
</script>

<style>
</style>