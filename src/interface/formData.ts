export interface evolutionInfoInterface {
  color: number,
  colorLabel?: string,
  colorValue?: string,
  level: number,
  levelLabel?: string,
  cost: number
}

export interface formDataInterface {
  // 卡种
  cardType: number,
  cardTypeLabel?: string,
  // 名称
  name: string,
  // 等级
  level: number,
  levelLabel?: string,
  // 颜色信息
  colors: Array<number>,
  colorsLabel?: Array<string>,
  colorsValue?: Array<string>,
  // 编号
  number: string,
  // 罕贵
  rarity: number,
  rarityLabel?: string,

  // 形态
  shape: number,
  shapeLabel?: string,
  // 属性
  property: number,
  propertyLabel?: string,
  // 类型
  type: string,

  // 分类显示
  kindShow: boolean,
  // 分类
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

  // 技能描述
  description: string,
  // 进化源显示
  originShow: boolean,
  // 进化源
  origin: string
}

export interface configInterface {
  code: number,
  name: string,
  value?: string
}