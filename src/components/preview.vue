<script setup lang="ts">
// 导入包
import html2canvas from 'html2canvas';

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
  const dom = window.document.getElementById('export')
  html2canvas(dom).then(res => {
    const base64 = res.toDataURL("image/png", 0.1)

    let btn = document.createElement("a");
    btn.href = base64;
    btn.setAttribute("download", `${config.value.number}-${config.value.name}`);
    btn.click();
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
  saveFile(JSON.stringify(config.value), 'application/json', `${config.value.number}-${config.value.name}`)
}

/**
 * @functionName saveFile
 * @param {*} value 数据对象
 * @param {String} type 文件类型
 * @param {String} name 文件名
 * @description 下载文件
 * @author 张航
 * @date 2023-04-27 16:12:14
 * @version V1.0.0
 */
const saveFile = (value: any, type: string, name: string) => {
  let blob;
  if (typeof window.Blob == "function") {
    blob = new Blob([value], {
      type: type
    });
  } else {
    const BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
    const bb = new BlobBuilder();
    bb.append(value);
    blob = bb.getBlob(type);
  }
  const URL = window.URL || window.webkitURL;
  const bloburl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  if ('download' in anchor) {
    anchor.style.visibility = "hidden";
    anchor.href = bloburl;
    anchor.download = name;
    document.body.appendChild(anchor);
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    anchor.dispatchEvent(evt);
    document.body.removeChild(anchor);
  } else if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, name);
  } else {
    location.href = bloburl;
  }
}

</script>
<template>
  <div class="title">
    卡片预览
    <div class="right">
      <Button type="primary" @click="exportCard" style="margin-right: 10px;">导出图片</Button>
      <Button @click="exportConfig" >导出配置</Button>
    </div>
  </div>
  <div class="box">
    <div class="card" id="export">
      <!-- 卡图 -->
      <img class="card-image" :src="config.cardImage" />

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
          <div class="evolutionInfo-item-color" :style="{ backgroundColor: item.colorFirst }"></div>
          <div
            class="evolutionInfo-item-level"
            :style="{
              backgroundColor: item.color === 7 || item.color === 3 ? item.second : item.colorFirst,
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
        <!-- 效果 -->
        <div class="card-description">
          <description :details="config.description" />
        </div>

        <!-- 信息 -->
        <div class="card-info" :style="{ marginBottom: config.originShow || config.securityShow ? '10px' : '30px'}">
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
                'name-no-level': config.cardType === 3 || config.cardType === 4
              }"
              :style="{
                color: config.nameSecond,
                backgroundColor: config.colors.length > 1 ? config.nameFourth : ''
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

          <div
            v-if="config.cardType === 1 || config.cardType === 2"
            :class="{
              'card-info-level': true,
              'card-info-level-white': config.colors[0] === 5
            }"
          >
            <div class="level" :style="{ color: config.nameThird }">
              <span class="label">Lv.</span>
              <span class="value">{{ config.levelLabel }}</span>
            </div>
            <div class="info" :style="{ color: config.nameThird }">
              <span>{{ config.shapeLabel }}</span>
              <span v-if="config.property"> | {{ config.propertyLabel }}</span>
              <span v-if="config.type"> | {{ config.type }}</span>
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
              backgroundColor: config.colors.length > 1 ? config.nameFourth : ''
            }"
          >
            进化源效果
          </div>
          <div class="card-origin-img" :style="{ borderColor: `${config.nameSecond}aa` }">
            <img class="img" :src="config.originImage" />
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
              backgroundColor: config.colors.length > 1 ? config.nameFourth : ''
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
      width: 100px;
      margin: 0 auto;
      padding: 20px 0;
      background-color: #ffffff;
      font-family: 'Regular';
      text-align: center;
      color: #000000;
      font-size: 20px;
      -webkit-background-clip: text;
      // -webkit-text-fill-color: #000000;
      -webkit-text-stroke: 6px transparent;
    }

    .cost {
      position: absolute;
      top: 20px;
      left: 20px;
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
      top: 20px;
      right: 20px;

      &-main,
      &-sub {
        display: inline-block;
        padding: 0 8px;
        background-color: #ffffff;
        font-family: 'coolvetica';
        font-weight: bold;
        text-align: right;
        color: #000000;
        -webkit-background-clip: text;
        // -webkit-text-fill-color: #000000;
      }

      &-main {
        margin-right: -2px;
        padding-right: 0;
        font-size: 84px;
        line-height: 80px;
        letter-spacing: 8px;
        -webkit-text-stroke: 8px transparent;
      }

      &-title {
        padding-right: 4px;
        font-family: 'Microsoft YaHei';
        font-size: 24px;
        line-height: 24px;
        -webkit-text-stroke: 6px transparent;
      }

      &-number {
        font-size: 38px;
        line-height: 40px;
        letter-spacing: 4px;
        -webkit-text-stroke: 6px transparent;
      }
    }

    .evolutionInfo {
      position: absolute;
      top: 180px;
      left: 20px;

      &-item {
        position: relative;
        width: 86px;
        height: 86px;
        margin-left: 16px;
        margin-top: -4px;
        background-image: url('../assets/evolutionInfo_bg_2.png');
        background-size: cover;

        &:nth-child(1) {
          width: 104px;
          height: 104px;
          margin-left: 0;
          margin-top: 0;
          background-image: url('../assets/evolutionInfo_bg_1.png');
        }

        &-color {
          position: absolute;
          bottom: 7px;
          right: 7px;
          width: 72px;
          height: 72px;
          border-radius: 100%;
          opacity: 0.8;
        }

        &-level {
          position: absolute;
          bottom: 54px;
          right: 12px;
          padding: 0 4px;
          font-family: 'Microsoft YaHei';
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          -webkit-background-clip: text;
          // -webkit-text-fill-color: #ffffff;
          -webkit-text-stroke: 2px transparent;
        }

        &-cost {
          position: absolute;
          bottom: -4px;
          right: 0;
          width: 86px;
          height: 86px;
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
      left: 37px;
      bottom: 0;
      width: 670px;
    }

    .card-description {
      width: 670px;
    }

    .card-info {
      position: relative;
      width: 670px;
      height: 76px;
      margin-top: 20px;
      // margin-bottom: 30px;
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
          -webkit-background-clip: text;
          // -webkit-text-fill-color: #ffffff;
          -webkit-text-stroke: 4px transparent;

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
        background-image: url('../assets/level_bg_1.png');
        background-size: cover;

        &-white {
          background-image: url('../assets/level_bg_2.png');
        }

        .level {
          position: absolute;
          bottom: 0;
          left: 10px;
          width: 100px;
          height: 70px;
          line-height: 58px;
          text-align: center;

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
          right: 10px;
          font-family: 'Microsoft YaHei';
          font-size: 14px;
          line-height: 20px;
        }
      }
    }

    .card-origin {
      position: relative;
      width: 670px;
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
        -webkit-background-clip: text;
        // -webkit-text-fill-color: #ffffff;
        -webkit-text-stroke: 4px transparent;
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
        width: 520px;
        height: 120px;
      }
    }

    .card-security {
      position: relative;
      width: 670px;
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
        -webkit-background-clip: text;
        // -webkit-text-fill-color: #ffffff;
        -webkit-text-stroke: 4px transparent;
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
