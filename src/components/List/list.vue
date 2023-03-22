<template>
  <div class="list_box" ref="box">

    <div class="scroll_box" :style="{ height: scrollInfo.height + 'px' }" @scroll="handleScroll" ref="scroll">

      <div class="scroll_hold" ref="hold" />

      <div class="context" ref="context">

        <div v-for="(item, index) in renderData.renderList" :key="index" class="list_item">
          <div>{{ item }}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue"

const scroll = ref()
const box = ref()
const context = ref()
const hold = ref()

const scrollInfo = reactive({
  height: 0,     /* 容器高度 */
  bufferCount: 8,  /* 缓冲区个数 */
  itemHeight: 60,  /* 每一个item高度 */
  renderCount: 0,  /* 渲染区个数 */
})


const dataList = new Array(10000).fill(1).map((item, index) => index + 1)

const renderData = reactive({ renderList: [1] })


onMounted(() => {
  const height = box.value.offsetHeight

  const { itemHeight, bufferCount } = scrollInfo

  const renderCount = Math.ceil(height / itemHeight) + bufferCount

  scrollInfo.renderCount = renderCount

  scrollInfo.height = height

  positionCalc()

  hold.value.style.height = dataList.length * itemHeight + 'px'
})


const handleScroll = () => {
  positionCalc()
}


function positionCalc() {
  const { scrollTop } = scroll.value

  const { itemHeight, renderCount } = scrollInfo

  const start = Math.floor(scrollTop / itemHeight)

  const end = start + renderCount

  const currentOffset = scrollTop - (scrollTop % itemHeight)
  // 因为直接使用的话，就每触发一次scroll事件就会改变下偏移量，造成滑动与偏移同时产生，所以就不会这么丝滑了。取余操作的话，表示每经过一个元素块变动一次，不会频繁的触发偏移操作

  context.value.style.transform = `translate3d(0, ${currentOffset}px, 0)` /* 偏移，造成下滑效果 */

  renderData.renderList = dataList.slice(start, end)

  console.log(start, end)
}



</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

