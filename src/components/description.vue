<script setup lang="ts">
// 导入vue功能
import { toRef } from 'vue'

// 获取配置信息
const props = defineProps(['details'])
const details = toRef(props, 'details')

</script>
<template>
  <div class="description">
    {{ details }}
  </div>
</template>
<style lang="less" scoped>
</style>
