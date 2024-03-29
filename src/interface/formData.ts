export interface evolutionInfoInterface {
  color: number,
  colorLabel?: string,
  colorFirst?: string,
  colorSecond?: string,
  colorThird?: string,
  colorFourth?: string,
  level: number,
  levelLabel?: string,
  cost?: number
}

export interface formDataInterface {
  // 卡图
  cardImage: string,
  // 卡种
  cardType: number,
  cardTypeLabel?: string,
  // 名称
  name: string,
  nameSecond: string,
  nameThird: string,
  nameFourth: string,
  // 等级
  level: number,
  levelLabel?: string,
  // 颜色信息
  colors: Array<number>,
  colorsLabel?: Array<string>,
  colorsFirst?: Array<string>,
  colorsSecond?: Array<string>,
  colorsThird?: Array<string>,
  colorsFourth?: Array<string>,
  // 编号
  number: string,
  // 罕贵
  rarity: number,
  rarityLabel?: string,

  // 是否展示特征
  characteristicShow: boolean,
  // 形态
  shape: number,
  shapeLabel?: string,
  // 属性
  property: number,
  propertyLabel?: string,
  // 类型
  type: string,

  // 块标识显示
  kindShow: boolean,
  // 块标识
  kind: number,
  kindLabel?: string,

  // 费用显示
  costShow: boolean,
  // 费用
  cost: number,

  // DP显示
  dpShow: boolean,
  // DP
  dp: number,

  // 进化信息数量
  evolutionSize: number,
  // 进化信息
  evolutionInfo: Array<evolutionInfoInterface>,

  // 特殊进化
  specialEvolution: string,
  // 是否展示合步进化
  mergeEvolutionShow: boolean,
  // 合步进化数量
  mergeEvolutionSize: number,
  // 合步进化颜色
  mergeEvolutionInfo: Array<evolutionInfoInterface>,
  // 合步进化费用
  mergeEvolutionCost: number,
  // 效果
  description: string,
  // 是否显示数码合体
  composeShow: boolean,
  // 数码合体减少费用
  composeNum: number,
  // 数码合体素材
  composePart: string,
  // 进化源效果显示
  originShow: boolean,
  // 进化源图片
  originImage: string,
  // 进化源效果
  origin: string,
  // 安防效果显示
  securityShow: boolean,
  // 安防效果
  security: string
}

export interface configInterface {
  code: number,
  name: string,
  first?: string,
  second?: string,
  third?: string,
  fourth?: string
}