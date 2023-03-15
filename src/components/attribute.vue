<script setup lang="ts">
// 导入vue功能
import { ref } from 'vue'

// 导入类型
import type { Ref } from 'vue'
import type {evolutionInfoInterface, formDataInterface} from '@/interface/formData'

// 导入卡片类型
import cardTypeData from '@/config/cardType'
// 导入等级
import levelData from '@/config/level'
// 导入罕贵
import rarityData from '@/config/rarity'
// 导入分类
import kindData from '@/config/kind'
// 导入颜色
import colorData from '@/config/color'
// 导入形态
import shapeData from '@/config/shape'
// 导入属性
import propertyData from '@/config/property'

// 进化信息
// const evolutionInfo = ref([])

// 表单数据
const formData:Ref<formDataInterface> = ref({
  // 卡种
  cardType: 1,
  // 名称
  name: '数码宝贝',
  // 等级
  level: 2,
  // 颜色信息
  colors: [1],
  // 编号
  number: 'BT1-001',
  // 罕贵
  rarity: 1,

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
  evolutionInfo: [{
    color: 1,
    level: 2,
    cost: 0
  }],

  // 技能描述
  description: '',
  // 进化源显示
  originShow: true,
  // 进化源
  origin: ''
})

/**
 * @functionName changeEvolutionSize
 * @param {Number} value 进化信息数量
 * @description 进化信息数量变更时，更新进化信息详情
 * @author 张航
 * @date 2023-03-10 14:31:48
 * @version V1.0.0
 */
 const changeEvolutionSize = (value:number) => {
  // 结果数组
  let res:Array<evolutionInfoInterface> = []
  const {evolutionInfo = []} = formData.value;

  if (value < evolutionInfo.length) {
    res = evolutionInfo.slice(0, value)
  } else {
    res = [...evolutionInfo]
    for (let index = res.length; index < value; index++) {
      res.push({
        color: 1,
        level: 2,
        cost: 0
      })
    }
  }
  formData.value.evolutionInfo = res
}

</script>
<template>
  <div class="title">配置选项</div>
  <div class="box">
    <Form label-position="top">
      <Divider orientation="left">基本信息</Divider>
      <FormItem label="类型">
        <RadioGroup v-model="formData.cardType">
          <Radio v-for="item in cardTypeData" :key="item.code" :label="item.code">{{
            item.name
          }}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="名称">
        <Input v-model="formData.name" :maxlength="20" />
      </FormItem>
      <FormItem label="等级">
        <Select v-model="formData.level" style="width: 100%">
          <Option v-for="item in levelData" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="颜色">
        <Select v-model="formData.colors" multiple style="width: 100%">
          <Option v-for="item in colorData" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="编号">
        <Input v-model="formData.number" :maxlength="10" />
      </FormItem>
      <FormItem label="罕贵">
        <Select v-model="formData.rarity" style="width: 100%">
          <Option v-for="item in rarityData" :value="item.code" :key="item.code">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>

      <Divider orientation="left">分类</Divider>
      <Row>
        <Col span="6">
          <FormItem label="是否展示">
            <Switch v-model="formData.kindShow" />
          </FormItem>
        </Col>
        <Col span="18">
          <FormItem label="分类">
            <Select v-model="formData.kind" style="width: 100%">
              <Option v-for="item in kindData" :value="item.code" :key="item.code">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Divider orientation="left">费用</Divider>
      <Row>
        <Col span="6">
          <FormItem label="是否展示">
            <Switch v-model="formData.costShow" />
          </FormItem>
        </Col>
        <Col span="18">
          <FormItem label="费用">
            <InputNumber
              v-model="formData.cost"
              controls-outside
              :min="0"
              :max="20"
              style="width: 100%"
            />
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
            <InputNumber
              v-model="formData.dp"
              controls-outside
              :min="1"
              :max="99"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>

      <Divider orientation="left">进化信息</Divider>
      <FormItem label="进化数量">
        <InputNumber
          v-model="formData.evolutionSize"
          controls-outside
          :min="0"
          :max="7"
          style="width: 100%"
          @on-change="changeEvolutionSize"
        />
      </FormItem>
      <FormItem label="进化信息">
        <div class="evolutionInfo">
          <Row class="title-box">
            <Col span="8">
              <div class="item">颜色</div>
            </Col>
            <Col span="8">
              <div class="item">等级</div>
            </Col>
            <Col span="8">
              <div class="item">费用</div>
            </Col>
          </Row>
          <Row v-for="(evolution, index) in formData.evolutionInfo" :key="index" class="data-box">
            <Col span="8">
              <Select v-model="evolution.color" style="width: 100%">
                <Option v-for="item in colorData" :value="item.code" :key="item.code">{{
                  item.name
                }}</Option>
              </Select>
            </Col>
            <Col span="8">
              <Select v-model="evolution.level" style="width: 100%">
                <Option v-for="item in levelData" :value="item.code" :key="item.code">{{
                  item.name
                }}</Option>
              </Select>
            </Col>
            <Col span="8">
              <InputNumber
                v-model="evolution.cost"
                controls-outside
                :min="0"
                :max="20"
                style="width: 100%"
              />
            </Col>
          </Row>
        </div>
      </FormItem>

      <Divider orientation="left">特征</Divider>
      <FormItem label="形态">
        <Select v-model="formData.shape" style="width: 100%">
          <Option v-for="item in shapeData" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="属性">
        <Select v-model="formData.property" style="width: 100%">
          <Option v-for="item in propertyData" :value="item.code" :key="item.code">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="类型">
        <Input v-model="formData.type" :maxlength="20" />
      </FormItem>

      <Divider orientation="left">效果</Divider>
      <FormItem label="效果">
        <Input
          v-model="formData.description"
          type="textarea"
          :rows="6"
          :maxlength="200"
          show-word-limit
        />
      </FormItem>

      <Divider orientation="left">进化源</Divider>
      <FormItem label="是否展示进化源">
        <Switch v-model="formData.originShow" />
      </FormItem>
      <FormItem label="进化源">
        <Input
          v-model="formData.origin"
          type="textarea"
          :rows="4"
          :maxlength="200"
          show-word-limit
        />
      </FormItem>
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
.evolutionInfo {
  border-top: solid 1px #f2f2f2;
  border-left: solid 1px #f2f2f2;
  // border-radius: 4px;
  // overflow: hidden;
  .ivu-col {
    border-right: solid 1px #f2f2f2;
    border-bottom: solid 1px #f2f2f2;
  }
  .title-box {
    background: #f5f5f5;
    .item {
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
