<script setup lang="ts">
// 导入vue功能
import { ref, toRef, watch } from 'vue'

// 获取配置信息
const props = defineProps(['details'])
const details = toRef(props, 'details')

// 渲染数据
const detailsArr = ref()

// 监听数据变化
watch(details, (newValue, oldValue) => {
  // 分割行
  const newValueRow = newValue ? newValue.split(/\n/g) : []

  // 分割关键词
  const newValueReplace: Array<any> = []
  newValueRow.map((item: string, index: number) => {
    let temp = item.replace(/【/g, '@@【')
    temp = temp.replace(/】/g, '@@')
    temp = temp.replace(/≪/g, '@@≪')
    temp = temp.replace(/≫/g, '@@')
    temp = temp.replace(/［/g, '@@［')
    temp = temp.replace(/］/g, '@@')
    newValueRow[index] = temp
    newValueReplace[index] = temp.split('@@')
  })
  // 结果数组
  const res: Array<any> = []
  newValueReplace.map((row: Array<string>, rowIndex: number) => {
    res[rowIndex] = []

    row.map((col: string, colIndex: number) => {
      const first = col.substring(0, 1)

      let temp = {}
      if (first === '【') {
        temp = {
          type: 1,
          content: col.substring(1)
        }
      } else if (first === '≪') {
        temp = {
          type: 2,
          content: col.substring(1)
        }
      } else if (first === '［') {
        temp = {
          type: 3,
          content: col.substring(1)
        }
      } else {
        temp = {
          type: 0,
          content: col
        }
      }

      res[rowIndex][colIndex] = temp
    })
  })

  detailsArr.value = res
})
</script>
<template>
  <div class="description">
    <div class="description-row" v-for="(row, rowIndex) in detailsArr" :key="rowIndex">
      <template v-for="(col, colIndex) in row" :key="colIndex">
        <template v-if="col.type === 1">
          <b class="type1">{{ col.content }}</b>
        </template>
        <template v-if="col.type === 2">
          <b class="type2">{{ col.content }}</b>
        </template>
        <template v-if="col.type === 3">
          <b class="type3">{{ col.content }}</b>
        </template>
        <template v-if="col.type === 0">
          {{ col.content }}
        </template>
      </template>
    </div>
  </div>
</template>
<style lang="less" scoped>
.description {
  padding: 4px;
  font-size: 22px;
  line-height: 30px;
  color: #ffffff;
  text-shadow: -1px 1px 3px #000000, 1px 1px 3px #000000, 1px -1px 3px #000000,
    -1px -1px 3px #000000;

  &-row {
    margin-bottom: 6px;

    .type1,
    .type2,
    .type3 {
      display: inline-block;
      padding: 2px 6px;
      margin-right: 10px;
      margin-top: 1px;
      border-style: solid;
      border-width: 2px;
      border-color: #000000;
      font-size: 18px;
      font-weight: 400;
      line-height: 20px;
      vertical-align: top;
      text-shadow: none;
    }

    .type1 {
      border-radius: 4px;
      background-image: -moz-linear-gradient(90deg, rgb(29, 85, 176) 0%, rgb(15, 18, 23) 100%);
      background-image: -webkit-linear-gradient(90deg, rgb(29, 85, 176) 0%, rgb(15, 18, 23) 100%);
      background-image: -ms-linear-gradient(90deg, rgb(29, 85, 176) 0%, rgb(15, 18, 23) 100%);
    }

    .type2 {
      position: relative;
      padding: 2px;
      margin-left: 20px;
      margin-right: 20px;
      border-width: 2px 0;
      background-image: -moz-linear-gradient(90deg, rgb(209, 122, 60) 0%, rgb(129, 29, 16) 100%);
      background-image: -webkit-linear-gradient(90deg, rgb(209, 122, 60) 0%, rgb(129, 29, 16) 100%);
      background-image: -ms-linear-gradient(90deg, rgb(209, 122, 60) 0%, rgb(129, 29, 16) 100%);

      &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -15px;
        display: block;
        width: 16px;
        height: 28px;
        background-image: url('../assets/description_type2_1.png');
        background-size: cover;
      }

      &::after {
        content: '';
        position: absolute;
        top: -2px;
        right: -15px;
        display: block;
        width: 16px;
        height: 28px;
        background-image: url('../assets/description_type2_2.png');
        background-size: cover;
      }
    }

    .type3 {
      border-radius: 20px;
      background-image: -moz-linear-gradient(90deg, rgb(191, 80, 138) 0%, rgb(70, 7, 22) 100%);
      background-image: -webkit-linear-gradient(90deg, rgb(191, 80, 138) 0%, rgb(70, 7, 22) 100%);
      background-image: -ms-linear-gradient(90deg, rgb(191, 80, 138) 0%, rgb(70, 7, 22) 100%);
    }
  }
}
</style>
