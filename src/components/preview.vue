<script setup lang="ts">
// 导入包
import html2canvas from 'html2canvas'

// 导入组件
import description from '@/components/description.vue'

// 导入vue功能
import { ref, toRef } from 'vue'

// 导入字体
import '../fonts/index.less'

// 获取配置信息
const props = defineProps(['config'])
const config = toRef(props, 'config')

/**
 * @functionName exportCard
 * @description 导出图片
 * @author 张航
 * @date 2023-04-27 15:41:34
 * @version V1.0.0
 */
const exportCard = () => {
  const dom = window.document.getElementById('export') || window.document.body
  html2canvas(dom).then((res) => {
    const base64 = res.toDataURL('image/png', 0.1)

    const btn = document.createElement('a')
    btn.href = base64
    btn.setAttribute('download', `${config.value.number}-${config.value.name}`)
    btn.click()
  })
}

/**
 * @functionName exportConfig
 * @description 导出配置json
 * @author 张航
 * @date 2023-04-27 16:05:06
 * @version V1.0.0
 */
const exportConfig = () => {
  const data = JSON.stringify(config.value)
  const blob = new Blob([data], { type: 'application/json' })
  const URL = window.URL || window.webkitURL
  const blobUrl = URL.createObjectURL(blob)

  const btn = document.createElement('a')
  btn.href = blobUrl
  btn.setAttribute('download', `${config.value.number}-${config.value.name}`)
  btn.click()
}

/**
 * @functionName calcBorderImage
 * @return {String} 返回结果
 * @description 计算边框颜色
 * @author 张航
 * @date 2023-05-05 14:55:42
 * @version V1.0.0
 */
const calcBorderImage = () => {
  let res = ''
  const { mergeEvolutionSize = 0 } = config.value

  // 颜色位置
  let pos: any = []

  for (let index = 0; index < mergeEvolutionSize; index++) {
    if (index === 0) {
      pos[index] = ' 0%'
    }
    if (index === mergeEvolutionSize) {
      pos[index] = ' 100%'
    }
    if (index > 0 && index < mergeEvolutionSize) {
      const p = 100 / (mergeEvolutionSize - 1)
      pos[index] = ` ${p * index}%`
    }
  }

  // 颜色
  config.value.mergeEvolutionInfo.map((item: any, index: number) => {
    if (index === 0) {
      res = res + `${item.colorFirst} ${pos[index]}`
    } else {
      res = res + `,${item.colorFirst} ${pos[index]}`
    }
  })
  console.log(res)

  return { backgroundImage: `linear-gradient(120deg, ${res})` }
}
</script>
<template>
  <div class="title">
    卡片预览
    <div class="right">
      <Button type="primary" @click="exportCard" style="margin-right: 10px">导出图片</Button>
      <Button @click="exportConfig">导出配置</Button>
    </div>
  </div>
  <div class="box">
    <div class="card" id="export">
      <!-- 卡图 -->
      <img class="card-image" v-if="config.cardImage.length > 0" :src="config.cardImage" />

      <!-- 卡种 -->
      <div class="cardType">{{ config.cardTypeLabel }}</div>

      <!-- 费用 -->
      <div class="cost" v-if="config.costShow">{{ config.cost }}</div>

      <!-- DP -->
      <div class="dp" v-if="config.dpShow">
        <div class="dp-main">{{ config.dp }}</div>
        <div class="dp-sub">
          <div class="dp-title">DP</div>
          <div class="dp-number">000</div>
        </div>
      </div>

      <!-- 进化信息 -->
      <div class="evolutionInfo">
        <div class="evolutionInfo-item" v-for="(item, index) in config.evolutionInfo" :key="index">
          <div
            class="evolutionInfo-item-color"
            :style="{
              backgroundColor: item.colorFirst
            }"
          ></div>
          <div
            class="evolutionInfo-item-level"
            :style="{
              textShadow:
                item.color === 7 || item.color === 3
                  ? 'none'
                  : `
                  -2px 2px 0px ${item.colorFirst}, 
                  2px 2px 0px ${item.colorFirst}, 
                  2px -2px 0px ${item.colorFirst},
                  -2px -2px 0px ${item.colorFirst}
                  `,
              fontWeight: item.color === 7 || item.color === 3 ? 900 : 'bold',
              color: item.colorSecond
            }"
          >
            LV.{{ item.levelLabel }}起
          </div>
          <div class="evolutionInfo-item-cost" :style="{ color: item.colorSecond }">
            {{ item.cost }}
          </div>
        </div>
      </div>

      <div class="card-bottom">
        <!-- 特殊进化 -->
        <span v-if="config.specialEvolution" class="card-special-evolution">
          {{ config.specialEvolution }}
        </span>

        <!-- 合步进化 -->
        <div class="card-merge-evolution" v-if="config.mergeEvolutionShow">
          <span
            class="card-merge-evolution-tag"
            :style="{ width: `${78 + config.mergeEvolutionSize * 83}px` }"
          >
            <span class="card-merge-evolution-tag-bj" :style="calcBorderImage()"></span>
            <span class="card-merge-evolution-tag-content">
              合步：
              <span v-for="(evolution, index) in config.mergeEvolutionInfo" :key="index">
                <span v-if="index === 0"
                  >{{ evolution.colorLabel }} Lv.{{ evolution.levelLabel }}</span
                >
                <span v-else> + {{ evolution.colorLabel }} Lv.{{ evolution.levelLabel }}</span>
              </span>
              起 {{ config.mergeEvolutionCost }}
            </span>
          </span>
          将指定的 {{ config.mergeEvolutionSize }} 只数码宝贝重叠，以活跃状态进化
        </div>

        <!-- 效果 -->
        <div class="card-description" :style="{ marginBottom: config.composeShow ? '0' : '10px' }">
          <description :details="config.description" />
        </div>

        <!-- 数码合体 -->
        <div class="card-compose" v-if="config.composeShow">
          <div class="card-compose-info">
            <span class="card-compose-info-tag">数码合体 -{{config.composeNum}}</span>
            <span class="card-compose-info-part">{{config.composePart}}</span>
          </div>
          <div class="card-compose-illustrate">当将要登场时，可以从手牌 / 战斗区中置于此卡牌的下方。每放置1张减少登场费用。</div>
        </div>

        <!-- 信息 -->
        <div
          class="card-info"
          :style="{ marginBottom: config.originShow || config.securityShow ? '10px' : '30px' }"
        >
          <div class="card-info-bg">
            <div
              class="card-info-bg-item"
              v-for="(item, index) in config.colorsFirst"
              :key="index"
              :style="{ backgroundColor: item }"
            ></div>
          </div>
          <div class="card-info-name">
            <div
              :class="{
                name: true,
                'name-no-level':
                  !config.characteristicShow && (config.cardType === 3 || config.cardType === 4)
              }"
              :style="{
                color: config.nameSecond,
                textShadow:
                  config.colors.length > 1
                    ? `
                    -2px 2px 0px ${config.nameFourth}, 
                    2px 2px 0px ${config.nameFourth}, 
                    2px -2px 0px ${config.nameFourth},
                    -2px -2px 0px ${config.nameFourth}
                    `
                    : ''
              }"
            >
              {{ config.name }}
            </div>
            <div class="card-info-number">
              <div class="number-box">
                <div
                  class="number"
                  :style="{ color: config.colorsSecond[config.colorsSecond.length - 1] }"
                >
                  {{ config.number }}
                </div>
                <div
                  class="rarity"
                  :style="{
                    color: config.colorsFourth[config.colorsFourth.length - 1],
                    backgroundColor: config.colorsSecond[config.colorsSecond.length - 1]
                  }"
                >
                  {{ config.rarityLabel }}
                </div>
              </div>
              <div class="kind" v-if="config.kindShow">{{ config.kindLabel }}</div>
            </div>
          </div>

          <div class="card-info-level">
            <div
              v-if="config.characteristicShow"
              :class="{
                info: true,
                'info-white': config.colors[0] === 5
              }"
              :style="{ color: config.nameThird }"
            >
              <span v-if="config.shape">{{ config.shapeLabel }}</span>
              <span v-if="config.shape && config.property"> | </span>
              <span v-if="config.property">{{ config.propertyLabel }}</span>
              <span v-if="(config.shape || config.property) && config.type.length > 0"> | </span>
              <span v-if="config.type.length > 0">{{ config.type }}</span>
            </div>
            <div
              v-if="config.cardType === 1 || config.cardType === 2"
              :class="{
                level: true,
                'level-white': config.colors[0] === 5
              }"
              :style="{ color: config.nameThird }"
            >
              <span class="label">Lv.</span>
              <span class="value">{{ config.levelLabel }}</span>
            </div>
          </div>
        </div>

        <!-- 进化源 -->
        <div class="card-origin" v-if="config.originShow">
          <div class="card-origin-bg">
            <div
              class="card-origin-bg-item"
              v-for="(item, index) in config.colorsFirst"
              :key="index"
              :style="{ backgroundColor: item }"
            ></div>
          </div>
          <div
            class="card-origin-title"
            :style="{
              color: config.nameSecond,
              textShadow:
                config.colors.length > 1
                  ? `
                  -1px 1px 0px ${config.nameFourth}, 
                  1px 1px 0px ${config.nameFourth}, 
                  1px -1px 0px ${config.nameFourth},
                  -1px -1px 0px ${config.nameFourth}
                  `
                  : ''
            }"
          >
            进化源效果
          </div>
          <div class="card-origin-img" :style="{ borderColor: `${config.nameSecond}aa` }">
            <img class="img" v-if="config.originImage.length > 0" :src="config.originImage" />
          </div>
          <div class="card-origin-description">
            <description :details="config.origin" />
          </div>
        </div>

        <!-- 安防 -->
        <div class="card-security" v-if="config.securityShow">
          <div class="card-security-bg">
            <div
              class="card-security-bg-item"
              v-for="(item, index) in config.colorsFirst"
              :key="index"
              :style="{ backgroundColor: item }"
            ></div>
          </div>
          <div
            :class="{
              'card-security-img': true,
              'card-security-img-black': config.colors[0] === 7
            }"
          >
            <img
              class="img"
              :style="{
                backgroundColor: config.colors[0] === 5 ? '#ffffff66' : '#00000066'
              }"
              src="../assets/security_bg.png"
            />
          </div>
          <div
            class="card-security-title"
            :style="{
              color: config.nameSecond,
              textShadow:
                config.colors.length > 1
                  ? `
              -1px 1px 0px ${config.nameFourth}, 
              1px 1px 0px ${config.nameFourth}, 
              1px -1px 0px ${config.nameFourth},
              -1px -1px 0px ${config.nameFourth}
              `
                  : ''
            }"
          >
            安 防
          </div>
          <div class="card-security-description">
            <description :details="config.security" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.title {
  height: 40px;
  background-color: #ffffff;
  border-bottom: solid 1px #f2f2f2;
  box-shadow: 0 1px 6px #bbbbbb;
  padding: 0 20px;
  font-size: 14px;
  font-weight: bold;
  line-height: 40px;

  .right {
    float: right;
    // margin: 4px 0;
  }
}

.box {
  height: calc(100vh - 40px);
  padding: 20px;
  overflow: auto;

  .card {
    position: relative;
    width: 744px;
    height: 1039px;
    box-sizing: border-box;
    margin: 0 auto;
    background-color: #ffffff;
    background-color: #bbbbbb;
    border-radius: 30px;
    box-shadow: 6px 6px 20px #bbbbbb;
    overflow: hidden;

    .card-image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      width: 744px;
      height: 1039px;
    }

    .cardType {
      position: absolute;
      left: 50%;
      width: 100px;
      margin-left: -50px;
      padding: 14px 0;
      font-family: 'Regular';
      text-align: center;
      color: #000000;
      font-size: 22px;
      text-shadow: -1px 1px 0px #ffffff, 1px 1px 0px #ffffff, 1px -1px 0px #ffffff,
        -1px -1px 0px #ffffff;
    }

    .cost {
      position: absolute;
      top: 14px;
      left: 16px;
      width: 130px;
      height: 130px;
      padding-left: 26px;
      padding-top: 20px;
      background-image: url('../assets/cost_bg.png');
      background-size: cover;
      font-family: 'coolvetica';
      color: #ffffff;
      font-size: 66px;
      font-weight: bold;
      text-align: center;
      line-height: 106px;
      letter-spacing: 6px;
    }

    .dp {
      position: absolute;
      top: 16px;
      right: 30px;

      &-main,
      &-sub {
        display: inline-block;
        padding: 0 8px;
        font-family: 'coolvetica';
        font-weight: bold;
        text-align: right;
        color: #000000;
        text-shadow: -3px 3px 0px #ffffff, 3px 3px 0px #ffffff, 3px -3px 0px #ffffff,
          -3px -3px 0px #ffffff;
      }

      &-sub {
        text-shadow: -2px 2px 0px #ffffff, 2px 2px 0px #ffffff, 2px -2px 0px #ffffff,
          -2px -2px 0px #ffffff;
      }

      &-main {
        margin-right: -2px;
        padding-right: 0;
        font-size: 84px;
        line-height: 80px;
        letter-spacing: 8px;
      }

      &-title {
        padding-right: 4px;
        font-family: 'Microsoft YaHei';
        font-size: 24px;
        line-height: 24px;
      }

      &-number {
        font-size: 38px;
        line-height: 40px;
        letter-spacing: 4px;
      }
    }

    .evolutionInfo {
      position: absolute;
      top: 164px;
      left: 26px;

      &-item {
        position: relative;
        width: 94px;
        height: 94px;
        margin-left: 20px;
        margin-top: -16px;
        background-image: url('../assets/evolutionInfo_bg_2.png');
        background-size: cover;

        &:nth-child(1) {
          width: 114px;
          height: 114px;
          margin-left: 0;
          margin-top: 0;
          background-image: url('../assets/evolutionInfo_bg_1.png');
        }

        &-color {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 78px;
          height: 78px;
          border-radius: 100%;
          opacity: 0.8;
        }

        &-level {
          position: absolute;
          bottom: 60px;
          right: 16px;
          padding: 0 4px;
          font-family: 'Microsoft YaHei';
          font-size: 18px;
          font-weight: bold;
          text-align: center;
        }

        &-cost {
          position: absolute;
          bottom: -6px;
          right: 0;
          width: 94px;
          height: 94px;
          font-family: 'coolvetica';
          font-size: 60px;
          color: #ffffff;
          font-weight: bold;
          text-align: center;
        }
      }
    }

    .card-bottom {
      position: absolute;
      left: 42px;
      bottom: 0;
      width: 660px;
    }

    .card-special-evolution {
      display: inline-block;
      padding: 2px 6px;
      margin-bottom: 10px;
      background-color: #000000;
      border: solid 2px #ffffff;
      border-radius: 10px;
      font-size: 18px;
      line-height: 20px;
      color: #ffffff;
    }

    .card-merge-evolution {
      margin-bottom: 10px;
      font-size: 16px;
      color: #ffffff;
      text-shadow: -1px 1px 3px #000000, 1px 1px 3px #000000, 1px -1px 3px #000000,
        -1px -1px 3px #000000;
      transform: skew(-20deg);

      &-tag {
        position: relative;
        display: inline-block;
        height: 22px;
        vertical-align: top;

        &-bj {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          width: 100%;
          height: 22px;
        }

        &-content {
          position: absolute;
          top: 2px;
          bottom: 2px;
          left: 2px;
          right: 2px;
          // padding: 0 6px;
          background-color: #333333;
          font-size: 18px;
          line-height: 20px;
          text-align: center;
        }
      }
    }

    .card-description {
      width: 660px;
      padding: 4px;
      margin-bottom: 10px;
    }

    .card-compose {
      width: 660px;
      padding: 2px 8px;
      margin-bottom: 10px;
      background-color: rgba(0, 0, 0, .5);
      border: solid 2px #ffffff;
      border-radius: 10px;

      &-info {
        font-size: 22px;
        color: #ffffff;
        position: relative;
        top: -4px;
        line-height: 28px;
        
        &-tag {
          padding: 2px 6px;
          margin-right: 10px;
          margin-top: 1px;
          font-size: 18px;
          font-weight: 400;
          line-height: 20px;
          text-shadow: none;
          border-style: solid;
          border-width: 2px;
          border-color: #000000;
          border-radius: 4px;
          background-image: -moz-linear-gradient(90deg, rgb(63, 129, 74) 0%, rgb(19, 100, 110) 70%, rgb(22, 43, 61) 100%);
          background-image: -webkit-linear-gradient(90deg, rgb(63, 129, 74) 0%, rgb(19, 100, 110) 70%, rgb(22, 43, 61) 100%);
          background-image: -ms-linear-gradient(90deg, rgb(63, 129, 74) 0%, rgb(19, 100, 110) 70%, rgb(22, 43, 61) 100%);
        }

        &-part {
          display: inline-block;
          text-shadow: -1px 1px 3px #000000, 1px 1px 3px #000000, 1px -1px 3px #000000,
          -1px -1px 3px #000000;
          transform: skew(-20deg);
        }
      }

      &-illustrate {
        font-size: 16px;
        color: #ffffff;
        text-shadow: -1px 1px 3px #000000, 1px 1px 3px #000000, 1px -1px 3px #000000,
          -1px -1px 3px #000000;
        transform: skew(-20deg);
      }
    }

    .card-info {
      position: relative;
      width: 660px;
      height: 76px;
      border-radius: 10px;

      &-bg {
        display: flex;
        flex-wrap: nowrap;
        align-content: space-between;
        height: 76px;
        border-radius: 10px;
        overflow: hidden;
        opacity: 0.8;

        &-item {
          flex-grow: 1;
        }
      }

      &-name {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        .name {
          font-family: 'Heavy';
          font-size: 40px;
          text-align: center;
          line-height: 60px;

          &-no-level {
            line-height: 76px;
          }
        }
      }

      &-number {
        position: absolute;
        right: 10px;
        top: 10px;
        font-weight: bold;

        .number {
          display: inline-block;
          vertical-align: top;
          font-family: 'Microsoft YaHei';
          font-size: 18px;
          line-height: 18px;
        }

        .rarity {
          display: inline-block;
          vertical-align: top;
          min-width: 18px;
          margin: 1px 0 1px 4px;
          padding: 0 4px;
          font-family: 'Microsoft YaHei';
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          border-radius: 8px;
        }

        .kind {
          position: absolute;
          right: 0;
          top: 24px;
          width: 36px;
          height: 18px;
          background-image: url('../assets/kind_bg.png');
          background-size: cover;
          font-family: 'Microsoft YaHei';
          font-size: 14px;
          color: #000000;
          text-align: center;
          line-height: 18px;
        }
      }

      &-level {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;

        .level {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 170px;
          height: 70px;
          line-height: 58px;
          // text-align: center;
          padding: 0 14px;
          background-image: url('../assets/level_bg_1.png');
          background-size: cover;

          &-white {
            background-image: url('../assets/level_bg_2.png');
          }

          .label {
            font-family: 'Microsoft YaHei';
            font-weight: bold;
            font-size: 42px;
          }

          .value {
            margin-left: 6px;
            font-family: 'Prohibition';
            font-size: 60px;
          }
        }

        .info {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 20px;
          padding: 0 10px;
          border-radius: 0 0 10px 10px;
          font-family: 'Microsoft YaHei';
          font-size: 14px;
          line-height: 20px;
          text-align: right;
          background-color: #000000;

          &-white {
            background-color: #ffffff;
          }
        }
      }
    }

    .card-origin {
      position: relative;
      width: 660px;
      height: 140px;
      margin-top: 10px;

      &-bg {
        display: flex;
        flex-wrap: nowrap;
        align-content: space-between;
        height: 140px;
        border-radius: 10px 10px 0 0;
        overflow: hidden;
        opacity: 0.8;

        &-item {
          flex-grow: 1;
        }
      }

      &-title {
        position: absolute;
        top: 22px;
        left: 6px;
        width: 20px;
        height: 140px;
        font-family: 'Microsoft YaHei';
        font-size: 16px;
        line-height: 20px;
        text-align: center;
      }

      &-img {
        position: absolute;
        top: 20px;
        left: 30px;
        width: 104px;
        height: 104px;
        border: solid 2px;
        overflow: hidden;

        .img {
          display: block;
          width: 104px;
          height: 104px;
        }
      }

      &-description {
        position: absolute;
        top: 10px;
        left: 140px;
        width: 510px;
        height: 120px;
      }
    }

    .card-security {
      position: relative;
      width: 660px;
      height: 140px;
      margin-top: 10px;
      margin-bottom: 30px;
      border-radius: 10px;

      &-bg {
        display: flex;
        flex-wrap: nowrap;
        align-content: space-between;
        height: 140px;
        border-radius: 10px;
        overflow: hidden;
        opacity: 0.8;

        &-item {
          flex-grow: 1;
        }
      }

      &-img {
        position: absolute;
        top: 8px;
        left: 10px;
        width: 104px;
        height: 104px;
        background-image: url('../assets/security_bor_1.png');
        background-size: cover;
        overflow: hidden;

        &-black {
          background-image: url('../assets/security_bor_2.png');
        }

        .img {
          display: block;
          width: 78px;
          height: 78px;
          margin: 12px auto 0;
          padding: 11px 16px 11px 16px;
          border-radius: 10px;
        }
      }

      &-title {
        position: absolute;
        top: 116px;
        left: 10px;
        width: 104px;
        height: 20px;
        font-family: 'Microsoft YaHei';
        font-size: 16px;
        line-height: 20px;
        text-align: center;
      }

      &-description {
        position: absolute;
        top: 10px;
        left: 120px;
        width: 540px;
        height: 120px;
      }
    }
  }
}
</style>
