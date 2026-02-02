
import { LevelDetail } from './types';

export const COLORS = {
  INK: '#2C2C2C',
  RED: '#94292C',
  JADE: '#4F796C',
  GOLD: '#BFA36F',
  BG: '#F9F7F2',
};

export const LEVELS: LevelDetail[] = [
  {
    id: 2,
    title: "非遗传播大使 (VIP)",
    condition: "支付 ¥20,000 货款预付金即可加入",
    benefit: "核心创业门槛，享受极致拿货折扣与高额分佣。",
    color: "#4F796C",
    icon: "Award",
    kpiDetails: ["门槛 ¥20,000 (货款预付金)", "参加大使岗前培训"],
    privileges: [
      "极低折扣：享受吊牌价5-6折拿货权限",
      "多元收益：直接推荐新大使获得20%奖励 (¥4,000)；向非VIP客户销售产品亦可获得高额零售分佣",
      "团队收益：间接推荐享有5%管理津贴",
      "专属赋能：加入我的搭配师非遗商学院，享受所有商学院课程"
    ],
    strategicRole: "品牌扩张的“先锋官”，是全域裂变模型的核心驱动力。"
  },
  {
    id: 3,
    title: "区域合作商",
    condition: "年度累计结算额达到 ¥600,000",
    benefit: "拥有特定区域的市场开发权与管理权，收益多元化。",
    color: "#60A5FA",
    icon: "Map",
    kpiDetails: ["年销 ¥60万", "团队规模 > 20人"],
    privileges: [
      "区域保护：指定商圈内不再增设同级代理",
      "流量分发：总部在该区域产生的线上订单优先分发",
      "线下沙龙：总部补贴支持每月举办一场高定品鉴会"
    ],
    strategicRole: "区域市场的“守护者”，负责维护当地品牌口碑与代理商协同。"
  },
  {
    id: 5, // 晋升为分公司合作伙伴
    title: "分公司合作伙伴",
    condition: "区域内管理10家以上非遗馆或年销累计 ¥300万",
    benefit: "由总部注资共同成立分公司，进入地区管理层。",
    color: "#9333EA",
    icon: "Building",
    kpiDetails: ["累计销售 ¥300万", "具备跨区域管理能力"],
    privileges: [
      "利润分成：享受该地区分公司年度净利润 40% 分红",
      "管理权限：拥有该地区加盟审核的一票否决权",
      "总部内刊：进入品牌核心策略委员会（预备级）"
    ],
    strategicRole: "品牌经营的“省级节度使”，负责整个区域的生态平衡与扩张。"
  },
  {
    id: 6,
    title: "总部战略合伙人",
    condition: "年度累计结算额达到 ¥1000万",
    benefit: "进入总部决策圈，参与品牌全球供应链配置。",
    color: "#94292C",
    icon: "Users",
    kpiDetails: ["年销 ¥1000万", "三年内无违规经营记录"],
    privileges: [
      "联合开发：参与年度新品的设计评审与联名款建议",
      "全球峰会：每年参加品牌全球战略规划闭门会议"
    ],
    strategicRole: "品牌命运的“共建者”，深度绑定供应链与品牌未来。"
  },
  {
    id: 7,
    title: "总公司股东",
    condition: "累计销售贡献突破 ¥3000万 + 总部考核通过",
    benefit: "持有公司股权，享受年度股东池分红。",
    color: "#BFA36F",
    icon: "Crown",
    kpiDetails: ["终身贡献 ¥3000万", "价值观高度协同"],
    privileges: [
      "年度分红：按持股比例瓜分总利润20%的股东池金",
      "荣誉董事：担任品牌终身名誉董事，享受最高规格接待",
      "传承权：股东身份及相关收益可依照法律规定进行家族传承"
    ],
    strategicRole: "品牌的“基石与归宿”，共同站在非遗复兴的顶峰。"
  },
  {
    id: 4, // 特殊子节点
    title: "国风非遗馆",
    condition: "年销 ¥150万 + 拥有不低于500平米的实体空间",
    benefit: "品牌实体化的重要载体，享受全方位的开店支持。",
    color: "#6366F1",
    icon: "Store",
    kpiDetails: ["年销 ¥150万", "面积 ≥ 500㎡", "符合品牌SI视觉体系"],
    privileges: [
      "陈列指导：首席陈列师到店一对一视觉营销指导",
      "智能系统：免费使用总部ERP及进销存数字化系统",
      "品牌授牌：颁发“非遗香云纱文化传承馆”官方牌匾"
    ],
    strategicRole: "品牌服务与体验的“前哨站”，通过深度沉浸式场景提升客单价。"
  }
];

export const NAV_SECTIONS = [
  { id: 'ecosystem', title: '生态矩阵' },
  { id: 'live-system', title: '直播分佣' },
  { id: 'ladder', title: '晋升体系' },
  { id: 'academy', title: '商学院' },
  { id: 'model', title: '盈利模型' }
];
