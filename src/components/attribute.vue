<script setup lang="ts">
// 导入组件
import { Message } from 'view-ui-plus'

// 导入vue功能
import { ref, watch } from 'vue'

// 导入类型
import type { Ref } from 'vue'
import type {
  evolutionInfoInterface,
  formDataInterface,
  configInterface
} from '@/interface/formData'

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

// 表单数据
const formData: Ref<formDataInterface> = ref({
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
      colorLabel: '红',
      level: 2,
      levelLabel: 'lv.2',
      cost: 0
    }
  ],

  // 特殊进化
  specialEvolution: '',
  // 是否展示合步进化
  mergeEvolutionShow: false,
  // 合步进化数量
  mergeEvolutionSize: 2,
  // 合步进化颜色
  mergeEvolutionInfo: [
    {
      color: 1,
      colorLabel: '红',
      level: 2,
      levelLabel: 'lv.2',
      cost: 0
    },
    {
      color: 1,
      colorLabel: '红',
      level: 2,
      levelLabel: 'lv.2',
      cost: 0
    }
  ],
  // 合步进化费用
  mergeEvolutionCost: 0,
  // 效果
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
 * @functionName checkCardConfigFormat
 * @description 文件格式校验错误
 * @author 张航
 * @date 2023-04-26 16:05:39
 * @version V1.0.0
 */
const checkCardConfigFormat = () => {
  Message.error('文件格式错误，请上传.json格式的文件！')
}

/**
 * @functionName checkCardConfigSize
 * @description 文件大小校验
 * @author 张航
 * @date 2023-04-26 16:06:06
 * @version V1.0.0
 */
const checkCardConfigSize = () => {
  Message.error('文件太大，请上传不大于10MB的配置！')
}

/**
 * @functionName checkCardImageFormat
 * @description 文件格式校验错误
 * @author 张航
 * @date 2023-04-26 16:05:39
 * @version V1.0.0
 */
const checkCardImageFormat = () => {
  console.log('error')
  Message.error('文件格式错误，请上传.jpg，.jpeg，.png格式的图片！')
}

/**
 * @functionName checkCardImageSize
 * @description 文件大小校验
 * @author 张航
 * @date 2023-04-26 16:06:06
 * @version V1.0.0
 */
const checkCardImageSize = () => {
  Message.error('文件太大，请上传不大于10MB的图片！')
}

/**
 * @functionName updateCardImageUrl
 * @param {Object} file 文件对象
 * @param {String} name 更新字段
 * @description 更新图片地址
 * @author 张航
 * @date 2023-04-26 16:06:36
 * @version V1.0.0
 */
const updateCardImageUrl = (file: any, name: string) => {
  console.log(file)
  const { type = '' } = file

  if (type.indexOf('jpg') > 0 || type.indexOf('jpeg') > 0 || type.indexOf('png') > 0) {
    file2base(file).then((res: string) => {
      if (name === 'cardImage') {
        formData.value.cardImage = res
      }
      if (name === 'originImage') {
        formData.value.originImage = res
      }
    })
  } else {
    checkCardImageFormat()
  }

  return false
}

// 是否打开图片预览
const cardImageShow = ref(false)
// 图片预览地址
const imagePreviewUrl = ref('')

/**
 * @functionName openCardImageView
 * @description 打开图片预览
 * @author 张航
 * @date 2023-04-26 16:04:41
 * @version V1.0.0
 */
const openCardImageView = (url: string) => {
  imagePreviewUrl.value = url
  cardImageShow.value = true
}

/**
 * @functionName removeCardImage
 * @param {String} name 参数
 * @description 根据name删除对应的图片
 * @author 张航
 * @date 2023-04-26 16:03:47
 * @version V1.0.0
 */
const removeCardImage = (name: string) => {
  if (name === 'cardImage') {
    formData.value.cardImage = ''
  }
  if (name === 'originImage') {
    formData.value.originImage = ''
  }
}

/**
 * @functionName file2base
 * @param {Object} file 文件对象
 * @return {Promise} 返回base64数据
 * @description 把文件转成base64
 * @author 张航
 * @date 2023-04-26 15:09:27
 * @version V1.0.0
 */
const file2base = (file: any): Promise<any> => {
  const reader = new FileReader()

  return new Promise((resolve) => {
    reader.readAsDataURL(file)
    reader.onload = () => {
      const { result = '' } = reader
      resolve(result)
    }
  })
}

/**
 * @functionName changeEvolutionSize
 * @param {Number} value 进化信息数量
 * @description 进化信息数量变更时，更新进化信息详情
 * @author 张航
 * @date 2023-03-10 14:31:48
 * @version V1.0.0
 */
const changeEvolutionSize = (value: number) => {
  // 结果数组
  let res: Array<evolutionInfoInterface> = []
  const { evolutionInfo = [] } = formData.value

  if (value < evolutionInfo.length) {
    res = evolutionInfo.slice(0, value)
  } else {
    res = [...evolutionInfo]
    for (let index = res.length; index < value; index++) {
      res.push({
        color: 1,
        colorLabel: '红',
        level: 2,
        levelLabel: 'lv.2',
        cost: 0
      })
    }
  }
  formData.value.evolutionInfo = res
}

/**
 * @functionName changeMergeEvolutionSize
 * @param {Number} value 合步进化信息数量
 * @description 合步进化信息数量变更时，更新合步进化信息详情
 * @author 张航
 * @date 2023-05-05 14:31:48
 * @version V1.0.0
 */
 const changeMergeEvolutionSize = (value: number) => {
  // 结果数组
  let res: Array<evolutionInfoInterface> = []
  const { mergeEvolutionInfo = [] } = formData.value

  if (value < mergeEvolutionInfo.length) {
    res = mergeEvolutionInfo.slice(0, value)
  } else {
    res = [...mergeEvolutionInfo]
    for (let index = res.length; index < value; index++) {
      res.push({
        color: 1,
        colorLabel: '红',
        level: 2,
        levelLabel: 'lv.2',
        cost: 0
      })
    }
  }
  formData.value.mergeEvolutionInfo = res
}

/**
 * @functionName updateFormLabel
 * @param {Number} key 值
 * @param {Array} config 可选项配置
 * @return {String} 返回结果
 * @description 根据key更新label显示内容
 * @author 张航
 * @date 2023-04-24 09:42:20
 * @version V1.0.0
 */
const updateFormLabel = (key: number, config: Array<configInterface>) => {
  let res = `${key}`
  config.map((item) => {
    if (item.code === key) {
      res = item.name
    }
  })
  return res
}

/**
 * @functionName updateColorLabelValue
 * @param {Number} key 值
 * @param {Array} config 可选项配置
 * @return {Object} 返回结果
 * @description 根据key更新label显示内容和value的值
 * @author 张航
 * @date 2023-04-24 10:34:38
 * @version V1.0.0
 */
const updateColorLabelValue = (key: number, config: Array<configInterface>) => {
  let res = {
    label: '',
    first: '',
    second: '',
    third: '',
    fourth: ''
  }
  config.map((item) => {
    if (item.code === key) {
      ;(res.label = item.name),
        (res.first = item.first || ''),
        (res.second = item.second || ''),
        (res.third = item.third || ''),
        (res.fourth = item.fourth || '')
    }
  })
  return res
}

/**
 * @functionName updateCardConfig
 * @param {Object} file 文件对象
 * @description 导入配置
 * @author 张航
 * @date 2023-04-27 17:08:54
 * @version V1.0.0
 */
const updateCardConfig = (file: any) => {
  const { type = '' } = file
  if (type.indexOf('json') > 0) {
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = () => {
      const result = String(reader.result || '')
      formData.value = JSON.parse(result)
    }
  } else {
    checkCardConfigFormat()
  }
}

// 组件事件
const emit = defineEmits(['on-change'])

// 监听表单数据变化
watch(
  formData,
  (newValue, oldValue) => {
    let res = { ...newValue }
    // 更新字段label
    res.cardTypeLabel = updateFormLabel(newValue.cardType, cardTypeData)
    res.levelLabel = updateFormLabel(newValue.level, levelData)
    res.rarityLabel = updateFormLabel(newValue.rarity, rarityData)
    res.shapeLabel = updateFormLabel(newValue.shape, shapeData)
    res.propertyLabel = updateFormLabel(newValue.property, propertyData)
    res.kindLabel = updateFormLabel(newValue.kind, kindData)

    // 更新颜色
    res.colorsLabel = []
    res.colorsFirst = []
    res.colorsSecond = []
    res.colorsThird = []
    res.colorsFourth = []
    res.nameSecond = '#ffffff'
    res.nameThird = '#ffffff'
    res.colors.map((item, index) => {
      const {
        label = '',
        first = '',
        second = '',
        third = '',
        fourth = ''
      } = updateColorLabelValue(item, colorData)
      res.colorsLabel![index] = label
      res.colorsFirst![index] = first
      res.colorsSecond![index] = second
      res.colorsThird![index] = third
      res.colorsFourth![index] = fourth

      // 特殊名字颜色
      if (index === 0) {
        res.nameSecond = second
        res.nameThird = third
        res.nameFourth = fourth
      }
    })

    // 更新进化信息
    res.evolutionInfo.map((item) => {
      const {
        label = '',
        first = '',
        second = '',
        third = '',
        fourth = ''
      } = updateColorLabelValue(item.color, colorData)
      item.colorLabel = label
      item.colorFirst = first
      item.colorSecond = second
      item.colorThird = third
      item.colorFourth = fourth
      item.levelLabel = updateFormLabel(item.level, levelData)
    })

    // 更新合步进化信息
    res.mergeEvolutionInfo.map((item) => {
      const {
        label = '',
        first = '',
        second = '',
        third = '',
        fourth = ''
      } = updateColorLabelValue(item.color, colorData)
      item.colorLabel = label
      item.colorFirst = first
      item.colorSecond = second
      item.colorThird = third
      item.colorFourth = fourth
      item.levelLabel = updateFormLabel(item.level, levelData)
    })

    emit('on-change', res)
  },
  { deep: true }
)
</script>
<template>
  <ImagePreview v-model="cardImageShow" :preview-list="[imagePreviewUrl]" :mask-closable="false" />
  <div class="title">
    配置选项
    <div class="right">
      <Upload
        :show-upload-list="false"
        :format="['json']"
        :max-size="1024 * 10"
        :on-format-error="checkCardConfigFormat"
        :on-exceeded-size="checkCardConfigSize"
        :before-upload="(file: object) => updateCardConfig(file)"
      >
        <Button>导入配置</Button>
      </Upload>
    </div>
  </div>
  <div class="box">
    <Form label-position="top">
      <Divider orientation="left">基本信息</Divider>
      <FormItem label="卡图">
        <Upload
          v-if="formData.cardImage.length === 0"
          :show-upload-list="false"
          :format="['jpg', 'jpeg', 'png']"
          :max-size="1024 * 10"
          :on-format-error="checkCardImageFormat"
          :on-exceeded-size="checkCardImageSize"
          :before-upload="(file: object) => updateCardImageUrl(file, 'cardImage')"
          style="display: inline-block; width: 100px; vertical-align: top"
        >
          <div class="uploadImageBox">
            <Icon type="ios-camera" size="30"></Icon>
          </div>
        </Upload>
        <div class="uploadImagePreviewBox" v-else>
          <Image :src="formData.cardImage" fit="contain" width="100px" height="100px" />
          <div class="upload-cover">
            <Icon type="ios-eye-outline" @click="openCardImageView(formData.cardImage)"></Icon>
            <Icon type="ios-trash-outline" @click="removeCardImage('cardImage')"></Icon>
          </div>
        </div>
      </FormItem>
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
          <Option v-for="item in levelData" :value="item.code" :key="item.code">
            LV.{{ item.name }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="颜色">
        <Select v-model="formData.colors" multiple style="width: 100%">
          <Option v-for="item in colorData" :value="item.code" :key="item.code">{{
            item.name
          }}</Option>
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
                <Option v-for="item in levelData" :value="item.code" :key="item.code">
                  LV.{{ item.name }}
                </Option>
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
      <FormItem label="是否展示特征">
        <Switch v-model="formData.characteristicShow" />
      </FormItem>
      <FormItem label="形态">
        <Select v-model="formData.shape" style="width: 100%">
          <Option v-for="item in shapeData" :value="item.code" :key="item.code">{{
            item.name
          }}</Option>
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

      <Divider orientation="left">特殊进化</Divider>
      <FormItem label="特殊进化">
        <Input
          v-model="formData.specialEvolution"
          type="textarea"
          :rows="6"
          :maxlength="400"
          show-word-limit
        />
      </FormItem>

      <Divider orientation="left">合步进化</Divider>
      <FormItem label="是否展示合步进化">
        <Switch v-model="formData.mergeEvolutionShow" />
      </FormItem>
      <FormItem label="合步进化数量">
        <InputNumber
          v-model="formData.mergeEvolutionSize"
          controls-outside
          :min="2"
          :max="6"
          style="width: 100%"
          @on-change="changeMergeEvolutionSize"
        />
      </FormItem>
      <FormItem label="合步进化颜色">
        <div class="evolutionInfo">
          <Row class="title-box">
            <Col span="12">
              <div class="item">颜色</div>
            </Col>
            <Col span="12">
              <div class="item">等级</div>
            </Col>
          </Row>
          <Row v-for="(evolution, index) in formData.mergeEvolutionInfo" :key="index" class="data-box">
            <Col span="12">
              <Select v-model="evolution.color" style="width: 100%">
                <Option v-for="item in colorData" :value="item.code" :key="item.code">{{
                  item.name
                }}</Option>
              </Select>
            </Col>
            <Col span="12">
              <Select v-model="evolution.level" style="width: 100%">
                <Option v-for="item in levelData" :value="item.code" :key="item.code">
                  LV.{{ item.name }}
                </Option>
              </Select>
            </Col>
          </Row>
        </div>
      </FormItem>
      <FormItem label="合步进化费用">
        <InputNumber
          v-model="formData.mergeEvolutionCost"
          controls-outside
          :min="0"
          :max="20"
          style="width: 100%"
        />
      </FormItem>

      <Divider orientation="left">效果</Divider>
      <FormItem label="效果">
        <Input
          v-model="formData.description"
          type="textarea"
          :rows="8"
          :maxlength="600"
          show-word-limit
        />
      </FormItem>

      <Divider orientation="left">进化源</Divider>
      <FormItem label="是否展示进化源效果">
        <Switch v-model="formData.originShow" />
      </FormItem>
      <FormItem label="进化源图片">
        <Upload
          v-if="formData.originImage.length === 0"
          :show-upload-list="false"
          :format="['jpg', 'jpeg', 'png']"
          :max-size="1024 * 10"
          :on-format-error="checkCardImageFormat"
          :on-exceeded-size="checkCardImageSize"
          :before-upload="(file: object) => updateCardImageUrl(file, 'originImage')"
          style="display: inline-block; width: 100px; vertical-align: top"
        >
          <div class="uploadImageBox">
            <Icon type="ios-camera" size="30"></Icon>
          </div>
        </Upload>
        <div class="uploadImagePreviewBox" v-else>
          <Image :src="formData.originImage" fit="contain" width="100px" height="100px" />
          <div class="upload-cover">
            <Icon type="ios-eye-outline" @click="openCardImageView(formData.originImage)"></Icon>
            <Icon type="ios-trash-outline" @click="removeCardImage('originImage')"></Icon>
          </div>
        </div>
      </FormItem>
      <FormItem label="进化源效果">
        <Input
          v-model="formData.origin"
          type="textarea"
          :rows="6"
          :maxlength="400"
          show-word-limit
        />
      </FormItem>

      <Divider orientation="left">安防</Divider>
      <FormItem label="是否展示安防效果">
        <Switch v-model="formData.securityShow" />
      </FormItem>
      <FormItem label="安防效果">
        <Input
          v-model="formData.security"
          type="textarea"
          :rows="6"
          :maxlength="400"
          show-word-limit
        />
      </FormItem>
    </Form>
  </div>
</template>
<style lang="less" scoped>
.title {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: bold;
  background: #ffffff;
  box-shadow: 0 1px 6px #bbbbbb;
  border-bottom: solid 1px #f2f2f2;

  .right {
    float: right;
    // margin: 4px 0;
  }
}

.box {
  height: calc(100vh - 40px);
  padding: 20px;
  overflow: auto;
  background: #ffffff;
}

.uploadImageBox {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #dcdee2;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    border-color: #2d8cf0;
  }
}

.uploadImagePreviewBox {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;

  .upload-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);

    i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 8px;
    }
  }

  &:hover .upload-cover {
    display: block;
  }
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
