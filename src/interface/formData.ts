export interface evolutionInfoInterface {
  color: number,
  level: number,
  cost: number
}

export interface formDataInterface {
  // 卡种
  cardType: number,
  // 名称
  name: string,
  // 等级
  level: number,
  // 颜色信息
  colors: Array<number>,
  // 编号
  number: string,
  // 罕贵
  rarity: number,

  // 形态
  shape: number,
  // 属性
  property: number,
  // 类型
  type: string,

  // 分类显示
  kindShow: boolean,
  // 分类
  kind: number,

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