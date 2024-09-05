<template>
  <splitpanes style="height: 400px">
    <!-- 第一个 Pane -->
    <Pane min-size="10" size="20" class="pane">1</Pane>

    <!-- 嵌套的 Splitpanes，设置高度为100% -->
    <Pane size="60" class="pane"> 2 </Pane>

    <!-- 最后一个 Pane -->
    <Pane min-size="10" size="20" class="pane">3</Pane>
  </splitpanes>
</template>

<script lang="ts" setup>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
</script>

<style>
/* 公共 Pane 样式 */
.pane {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5em;
  border: 1px solid rebeccapurple;
  background-color: #333;
  transition: background-color 0.3s ease;
}

/* Pane 鼠标悬停样式 */
.pane:hover {
  background-color: #444;
}

/* Splitter 样式 */
.splitpanes__splitter {
  background-color: aquamarine;
  width: auto;
  cursor: ew-resize;
}

/* 响应式设计：小屏幕字体大小调整 */
@media (max-width: 768px) {
  .pane {
    font-size: 2em;
  }
}

/* 确保嵌套的 Splitpanes 占满父 Pane 的高度 */
.splitpanes {
  height: 100%;
}
</style>
