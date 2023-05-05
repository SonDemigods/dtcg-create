<script setup lang="ts">
// 导入组件
import preview from '@/components/preview.vue'
import attribute from '@/components/attribute.vue'

// 导入vue功能
import { ref } from 'vue'

// 导入类型
import type { Ref } from 'vue'
import type { formDataInterface } from '@/interface/formData'

// 默认左面板比例
const split = ref(0.7)
// 左侧面板最小值
const min = ref('820px')
// 右侧面板最小值
const max = ref('350px')

// 配置数据
const configData: Ref<formDataInterface> = ref({
  // 卡图
  cardImage: '',
  // 卡种
  cardType: 1,
  // 名称
  name: '数码宝贝',
  nameSecond: '#ffffff',
  nameThird: '#ffffff',
  nameFourth: '#000000',
  // 等级
  level: 2,
  // 颜色信息
  colors: [1],
  colorsFirst: ['#e6002d'],
  colorsSecond: ['#ffffff'],
  colorsThird: ['#ffffff'],
  colorsFourth: ['#000000'],
  // 编号
  number: 'BT1-001',
  // 罕贵
  rarity: 1,

  // 是否展示特征
  characteristicShow: true,
  // 形态
  shape: 1,
  // 属性
  property: 1,
  // 类型
  type: '',

  // 分类显示
  kindShow: true,
  // 分类
  kind: 1,

  // 费用显示
  costShow: true,
  // 费用
  cost: 0,

  // DP显示
  dpShow: true,
  // DP
  dp: 1,

  // 进化信息数量
  evolutionSize: 1,
  // 进化信息
  evolutionInfo: [
    {
      color: 1,
      level: 2,
      cost: 0
    }
  ],

  // 技能描述
  description: '',
  // 进化源效果显示
  originShow: false,
  // 进化源图片
  originImage: '',
  // 进化源效果
  origin: '',
  // 安防效果显示
  securityShow: false,
  // 安防效果
  security: ''
})

/**
 * @functionName changeConfigData
 * @param {Object} data
 * @description 更新配置数据
 * @author 张航
 * @date 2023-03-15 17:42:11
 * @version V1.0.0
 */
const changeConfigData = (data: formDataInterface) => {
  configData.value = data
}

</script>
<template>
  <div class="split">
    <Split v-model="split" :min="min" :max="max">
      <template #left>
        <div class="split-pane">
          <preview :config="configData" />
        </div>
      </template>
      <template #right>
        <div class="split-pane">
          <attribute @on-change="changeConfigData" />
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
