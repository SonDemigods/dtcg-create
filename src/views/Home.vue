<script setup lang="ts">
import preview from '@/components/preview.vue'
import attribute from '@/components/attribute.vue'

// 导入vue功能
import { ref } from 'vue'
// 默认左面板比例
const split = ref(0.7)
// 左侧面板最小值
const min = ref('820px')
// 右侧面板最小值
const max = ref('350px')
</script>
<template>
  <div class="split">
    <Split v-model="split" :min="min" :max="max">
      <template #left>
        <div class="split-pane">
          <preview />
        </div>
      </template>
      <template #right>
        <div class="split-pane">
          <attribute />
        </div>
      </template>
    </Split>
  </div>
</template>
<style lang="less" scoped>
.split {
  height: 100vh;
  &-pane {
    height: 100vh;
    // padding: 10px;
    background: #f8f8f8;
    overflow: auto;
  }
}
</style>
