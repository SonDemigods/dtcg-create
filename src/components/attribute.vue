<script setup lang="ts">
// 导入vue功能
import { reactive } from 'vue'

// 导入卡片类型
import cardType from '@/config/cardType'

// 表单数据
const formData = reactive({
  // 卡种
  type: 0,
  // 费用显示
  costShow: true,
  // 费用
  cost: 0,
  // 费用显示
  dpShow: true,
  // DP
  dp: 1,

  // 进化信息数量
  evolutionSize: 1,
  // 进化信息
  evolutionInfo: [],
  // 颜色数量
  colorSize: 1,
  // 颜色信息
  color: [],
  // 等级
  level: 2,
  // 名称
  name: '数码宝贝',
  // 编号
  number: '',
  // 罕贵
  rarity: 0,
  // 分类
  kind: 1,
  // 特征
  characteristicInfo: {
    // 形态
    shape: 1,
    // 属性
    property: 1,
    // 类型
    type: ''
  },
  // 技能描述
  description: ''
})
</script>
<template>
  <div class="title">配置选项</div>
  <div class="box">
    <Form :model="formData" label-position="top">
      <Divider orientation="left">基本信息</Divider>
      <FormItem label="类型">
        <RadioGroup v-model="formData.type">
          <Radio v-for="item in cardType" :key="item.code" :label="item.code">{{
            item.name
          }}</Radio>
        </RadioGroup>
      </FormItem>
      <Divider orientation="left">费用</Divider>
      <Row>
        <Col span="6">
          <FormItem label="是否展示">
            <Switch v-model="formData.costShow" />
          </FormItem>
        </Col>
        <Col span="18">
          <FormItem label="费用">
            <InputNumber v-model="formData.cost" controls-outside :min="0" :max="20" />
          </FormItem>
        </Col>
      </Row>
      <Divider orientation="left">DP</Divider>
      <Row>
        <Col span="6">
          <FormItem label="是否展示">
            <Switch v-model="formData.dpShow" />
          </FormItem>
        </Col>
        <Col span="18">
          <FormItem label="数值">
            <InputNumber v-model="formData.dp" controls-outside :min="1" :max="99" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<style lang="less">
.title {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: bold;
  background: #ffffff;
  box-shadow: 0 1px 6px #bbbbbb;
  border-bottom: solid 1px #f2f2f2;
}

.box {
  height: calc(100vh - 40px);
  padding: 20px;
  overflow: auto;
  background: #ffffff;
}
</style>
