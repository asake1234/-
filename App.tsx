
import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Building, 
  ChevronRight, 
  Crown, 
  Map, 
  Store, 
  User, 
  Users, 
  Info,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Target,
  ShieldCheck,
  Zap,
  UserPlus,
  Share2,
  ShoppingBag,
  Wallet,
  PlayCircle,
  Clock,
  LayoutGrid,
  Camera,
  Home,
  AlertCircle,
  Users2,
  Image as ImageIcon,
  BookOpen,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from 'recharts';

import { COLORS, LEVELS, NAV_SECTIONS } from './constants';
import { LevelDetail } from './types';

// --- Simple Animation Wrapper ---
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {children}
    </div>
  );
};

// --- Icons Mapping ---
const iconMap: Record<string, any> = {
  User, Award, Map, Store, Building, Users, Crown
};

const SectionHeader: React.FC<{ title: string; subtitle?: string; accent?: string }> = ({ title, subtitle, accent = COLORS.RED }) => (
  <div className="mb-10">
    <div className="flex items-center space-x-4 mb-2">
      <div className="h-8 w-1.5" style={{ backgroundColor: accent }}></div>
      <h2 className="text-3xl font-serif-zh font-bold text-guofeng-ink">{title}</h2>
    </div>
    {subtitle && <p className="text-guofeng-sub max-w-2xl">{subtitle}</p>}
  </div>
);

const App: React.FC = () => {
  const [activeLevelId, setActiveLevelId] = useState<number>(LEVELS[0].id);
  const [levelImages, setLevelImages] = useState<Record<number, string>>({});
  const [activeNav, setActiveNav] = useState('ecosystem');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeLevel = LEVELS.find(l => l.id === activeLevelId) || LEVELS[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLevelImages(prev => ({
          ...prev,
          [activeLevelId]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlPrompt = () => {
    const url = prompt("请输入图片链接 (URL):");
    if (url) {
      setLevelImages(prev => ({
        ...prev,
        [activeLevelId]: url
      }));
    }
  };

  const commissionData = [
    { name: '分配结构', C: 4000, B: 1000, Company: 15000 }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveNav(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      NAV_SECTIONS.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-guofeng-bg antialiased">
      {/* Hidden file input for uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageUpload} 
      />

      {/* Top Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-guofeng-red rounded-lg flex items-center justify-center text-white">
              <Crown size={18} />
            </div>
            <span className="font-serif-zh font-bold text-guofeng-ink hidden md:block">我的搭配师</span>
          </div>
          <div className="flex space-x-1 md:space-x-4">
            {NAV_SECTIONS.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-2 text-sm font-bold transition-all border-b-2 ${
                  activeNav === section.id 
                    ? 'text-guofeng-red border-guofeng-red' 
                    : 'text-gray-400 border-transparent hover:text-guofeng-ink'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-guofeng-ink text-white pt-24 pb-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-guofeng-red opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <FadeIn>
            <span className="text-guofeng-gold tracking-[0.4em] text-sm font-bold uppercase mb-4 block">Strategic Operations Refinement 2026</span>
            <h1 className="text-4xl md:text-7xl font-serif-zh font-bold mb-8 leading-tight">
              “我的搭配师” <br/> 运营增长与晋升战略
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
              重塑非遗香云纱商业生态：以“七级晋升”为核心，构建从公域流量到终身股东的价值共生闭环。
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center space-x-3">
                <User size={18} className="text-guofeng-gold"/>
                <span className="text-sm">首席运营官 · 战略发布</span>
              </div>
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center space-x-3">
                <Calendar size={18} className="text-guofeng-gold"/>
                <span className="text-sm">执行周期：2026 年度</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16">
        
        {/* Section 1: Ecosystem */}
        <section id="ecosystem" className="bg-white rounded-3xl shadow-xl p-10 mb-16 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-guofeng-jade opacity-5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <SectionHeader title="全域生态矩阵" subtitle="构建从短视频引流到实体馆沉淀的深度增长模型" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-guofeng-bg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-guofeng-jade/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-guofeng-jade" size={24} />
              </div>
              <h3 className="font-bold text-xl mb-4 text-guofeng-ink">公域引流 · 流量池</h3>
              <ul className="space-y-4 text-sm text-guofeng-sub">
                <li className="flex items-start"><CheckCircle2 size={16} className="mt-0.5 mr-3 text-guofeng-jade flex-shrink-0" />视频号中央直播间：每日12小时不间断交易</li>
                <li className="flex items-start"><CheckCircle2 size={16} className="mt-0.5 mr-3 text-guofeng-jade flex-shrink-0" />小红书/美拍：非遗文化高调性种草矩阵</li>
                <li className="flex items-start"><CheckCircle2 size={16} className="mt-0.5 mr-3 text-guofeng-jade flex-shrink-0" />全员推客：蚂蚁雄兵式的社交关系链渗透</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-guofeng-bg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-guofeng-gold/10 rounded-xl flex items-center justify-center mb-6">
                <Store className="text-guofeng-gold" size={24} />
              </div>
              <h3 className="font-bold text-xl mb-4 text-guofeng-ink">线下体验 · 交付场</h3>
              <ul className="space-y-4 text-sm text-guofeng-sub">
                <li className="flex items-start"><CheckCircle2 size={16} className="mt-0.5 mr-3 text-guofeng-gold flex-shrink-0" />非遗生活馆：品牌形象高地与高端量体裁衣</li>
                <li className="flex items-start"><CheckCircle2 size={16} className="mt-0.5 mr-3 text-guofeng-gold flex-shrink-0" />联营合伙店：¥2万超低门槛实现社区化下沉</li>
                <li className="flex items-start"><CheckCircle2 size={16} className="mt-0.5 mr-3 text-guofeng-gold flex-shrink-0" />数字化柜台：线上线下一体化库存，即买即配</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-guofeng-bg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-guofeng-red/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-guofeng-red" size={24} />
              </div>
              <h3 className="font-bold text-xl mb-4 text-guofeng-ink">私域运营 · 价值芯</h3>
              <ul className="space-y-4 text-sm text-guofeng-sub">
                <li className="flex items-start"><CheckCircle2 size={16} className="mt-0.5 mr-3 text-guofeng-red flex-shrink-0" />高定俱乐部：黑卡会员专属的高净值社交圈</li>
                <li className="flex items-start"><CheckCircle2 size={16} className="mt-0.5 mr-3 text-guofeng-red flex-shrink-0" />导师成长营：从普通用户到非遗讲师的养成</li>
                <li className="flex items-start"><CheckCircle2 size={16} className="mt-0.5 mr-3 text-guofeng-red flex-shrink-0" />数字化结算：透明、即时、激励全流程留痕</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Central Live Room & Commission Process */}
        <section id="live-system" className="bg-white rounded-3xl shadow-xl p-10 mb-16 border border-gray-100">
          <SectionHeader title="中央直播间与分佣全流程" subtitle="打通线上销售闭环，实现从注册到提现的极简数字化路径" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="p-6 bg-guofeng-bg rounded-2xl border-l-4 border-guofeng-red">
                <div className="flex items-center space-x-3 mb-4">
                  <PlayCircle className="text-guofeng-red" size={24} />
                  <h4 className="font-bold text-lg text-guofeng-ink">线上销售分佣体系</h4>
                </div>
                <p className="text-sm text-guofeng-sub leading-relaxed">
                  中央直播间不仅是成交中心，更是全员分润的引擎。通过小程序赋能，每一位“搭配师”都能将直播间的高质量内容转化为个人私域的变现动力。非VIP客户的每一笔订单，都将通过系统自动归集并触发实时分佣奖励。
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start space-x-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-guofeng-gold/10 text-guofeng-gold flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h5 className="font-bold text-guofeng-ink flex items-center">注册经销商 <UserPlus size={16} className="ml-2 text-guofeng-sub"/></h5>
                    <p className="text-xs text-guofeng-sub mt-1">进入小程序 -> 点击“我的” -> 申请成为“搭配师”。审核通过后身份自动升级为经销商，界面显示“搭配师”标识。</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-guofeng-gold/10 text-guofeng-gold flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h5 className="font-bold text-guofeng-ink flex items-center">一键分享 <Share2 size={16} className="ml-2 text-guofeng-sub"/></h5>
                    <p className="text-xs text-guofeng-sub mt-1">进入任何商品详情页，点击下方的“分享”按钮。支持海报生成或直接转发给好友/群聊。</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-guofeng-gold/10 text-guofeng-gold flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h5 className="font-bold text-guofeng-ink flex items-center">极速购买 <ShoppingBag size={16} className="ml-2 text-guofeng-sub"/></h5>
                    <p className="text-xs text-guofeng-sub mt-1">客户点击链接，直接进入微信小店支付。无需跳转繁琐环节，确保转化率最大化。</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-guofeng-gold/10 text-guofeng-gold flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <h5 className="font-bold text-guofeng-ink flex items-center">返现提现 <Wallet size={16} className="ml-2 text-guofeng-sub"/></h5>
                    <p className="text-xs text-guofeng-sub mt-1">成为VIP后，所有收益在“个人主页”实时可见。待客户确认收货后，佣金转入余额，点击即可提现至微信钱包。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Mock Phone UI Replicating Screenshot */}
              <div className="bg-[#1a1a1a] rounded-[3.5rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[12px] border-[#222] aspect-[9/19] max-w-[320px] mx-auto relative overflow-hidden">
                <div className="w-full h-full bg-[#f8f8f8] rounded-[2.8rem] overflow-hidden flex flex-col relative text-black text-left">
                  
                  {/* Status Bar */}
                  <div className="h-10 px-8 flex justify-between items-center bg-white shrink-0">
                    <span className="text-[10px] font-bold">9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-black/10"></div>
                      <div className="w-3 h-3 rounded-full bg-black/10"></div>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="px-4 py-3 bg-white flex items-center justify-between border-b border-gray-100 shrink-0">
                    <h6 className="text-sm font-bold">我的推广</h6>
                    <div className="flex items-center space-x-2">
                       <div className="flex bg-gray-100 rounded-md p-0.5">
                         <span className="bg-[#ff4d4f] text-white px-2 py-0.5 rounded-md text-[9px]">全部</span>
                         <span className="text-gray-500 px-2 py-0.5 text-[9px]">今日</span>
                         <span className="text-gray-500 px-2 py-0.5 text-[9px]">7日</span>
                       </div>
                       <span className="text-[9px] text-gray-400">全部订单 &gt;</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto bg-[#fdfaf8] no-scrollbar">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 p-3">
                      {[
                        { label: '成交总额 (元)', val: '288.88' },
                        { label: '成交订单 (笔)', val: '1' },
                        { label: '推客佣金 (元)', val: '2.88' },
                        { label: '邀请推客 (人)', val: '0' }
                      ].map((item, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-50">
                          <div className="text-[9px] text-gray-400 flex items-center mb-1">
                            <span className="w-0.5 h-2.5 bg-[#ff4d4f] mr-1 rounded-sm"></span>
                            {item.label} <Info size={10} className="ml-1 opacity-20" />
                          </div>
                          <div className="text-sm font-bold">{item.val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Commission Card */}
                    <div className="px-3 mb-4">
                      <div className="bg-gradient-to-br from-[#ff5e62] to-[#ff4d4f] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="text-2xl font-bold mb-1">¥ 0.00</div>
                            <div className="text-[10px] opacity-80 flex items-center">可提现佣金 (元) <Info size={10} className="ml-1" /></div>
                          </div>
                          <div className="text-[9px] bg-white/20 px-2 py-1 rounded-full">提现记录 &gt;</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 border-t border-white/20 pt-4 mb-4 text-center">
                          <div>
                            <div className="text-[9px] opacity-70 mb-1">待结算佣金</div>
                            <div className="text-xs font-bold">2.88</div>
                          </div>
                          <div>
                            <div className="text-[9px] opacity-70 mb-1">累计佣金</div>
                            <div className="text-xs font-bold">2.88</div>
                          </div>
                          <div>
                            <div className="text-[9px] opacity-70 mb-1">已提现佣金</div>
                            <div className="text-xs font-bold">0.00</div>
                          </div>
                        </div>

                        <button className="w-full bg-white text-[#ff4d4f] font-bold py-2.5 rounded-full text-xs shadow-md active:scale-95 transition-transform">
                          立即提现
                        </button>

                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="px-3 grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-blue-50/50 p-3 rounded-xl text-center border border-blue-100/50">
                        <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-1">
                          <Users2 size={16} className="text-blue-500" />
                        </div>
                        <div className="text-[10px] font-bold">我的邀请</div>
                        <div className="text-[8px] text-gray-400">0位好友</div>
                      </div>
                      <div className="bg-yellow-50/50 p-3 rounded-xl text-center border border-yellow-100/50">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full mx-auto flex items-center justify-center mb-1">
                          <ImageIcon size={16} className="text-yellow-600" />
                        </div>
                        <div className="text-[10px] font-bold">邀请海报</div>
                        <div className="text-[8px] text-gray-400">锁定成员</div>
                      </div>
                      <div className="bg-pink-50/50 p-3 rounded-xl text-center border border-pink-100/50">
                        <div className="w-8 h-8 bg-pink-100 rounded-full mx-auto flex items-center justify-center mb-1">
                          <BookOpen size={16} className="text-pink-500" />
                        </div>
                        <div className="text-[10px] font-bold">带货攻略</div>
                        <div className="text-[8px] text-gray-400">如何赚钱</div>
                      </div>
                    </div>

                    {/* Order Tabs */}
                    <div className="px-3 mb-10">
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
                        <h6 className="text-[10px] font-bold mb-4">推广订单</h6>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          {[
                            { icon: AlertCircle, color: 'text-pink-500', bg: 'bg-pink-50', label: '未结算' },
                            { icon: CheckCircle2, color: 'text-orange-400', bg: 'bg-orange-50', label: '已结算' },
                            { icon: Clock, color: 'text-purple-400', bg: 'bg-purple-50', label: '取消结算' },
                            { icon: LayoutGrid, color: 'text-blue-400', bg: 'bg-blue-50', label: '全部' }
                          ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center mb-1`}>
                                <item.icon size={18} className={item.color} />
                              </div>
                              <span className="text-[9px] text-gray-500">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab Bar */}
                  <div className="h-14 bg-white border-t border-gray-100 flex justify-around items-center px-4 shrink-0">
                    {[
                      { icon: Home, label: '首页', active: false },
                      { icon: LayoutGrid, label: '分类', active: false },
                      { icon: Camera, label: '发圈', active: false },
                      { icon: PlayCircle, label: '直播', active: false },
                      { icon: User, label: '我的', active: true }
                    ].map((tab, idx) => (
                      <div key={idx} className={`flex flex-col items-center ${tab.active ? 'text-[#ff4d4f]' : 'opacity-30'}`}>
                        <tab.icon size={18} />
                        <span className={`text-[8px] mt-1 ${tab.active ? 'font-bold' : ''}`}>{tab.label}</span>
                      </div>
                    ))}
                  </div>

                </div>
                {/* Dynamic Island / Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#222] rounded-b-2xl"></div>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-guofeng-red opacity-10 rounded-full blur-[80px]"></div>
            </div>
          </div>
        </section>

        {/* Section 3: Growth Ladder - Refined */}
        <section id="ladder" className="mb-20">
          <SectionHeader title="七级加盟晋升体系" subtitle="深度解析各层级的门槛、权益与战略定位，确保每一分投入都有回响" />
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar Select */}
            <div className="lg:w-1/3 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col border border-gray-100 h-fit sticky top-24">
              {LEVELS.map((level) => {
                const Icon = iconMap[level.icon];
                const isActive = activeLevelId === level.id;
                return (
                  <button
                    key={level.id}
                    onClick={() => setActiveLevelId(level.id)}
                    className={`flex items-center p-6 text-left transition-all border-l-4 ${
                      isActive ? 'bg-guofeng-bg border-guofeng-red' : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-5 shadow-sm ${
                      isActive ? 'bg-guofeng-red text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isActive ? 'text-guofeng-red' : 'text-gray-400'}`}>Level {level.id}</div>
                      <div className={`font-bold text-lg ${isActive ? 'text-guofeng-ink' : 'text-gray-500'}`}>{level.title}</div>
                    </div>
                    {isActive && <ChevronRight className="ml-auto text-guofeng-red" size={20} />}
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Content */}
            <div className="lg:w-2/3 bg-white rounded-3xl shadow-xl p-12 border border-gray-100 relative overflow-hidden">
               {/* Background Watermark */}
               <div className="absolute top-20 right-0 opacity-[0.03] pointer-events-none scale-150">
                 {React.createElement(iconMap[activeLevel.icon], { size: 400 })}
               </div>
               
               <div className="relative z-10">
                 <div className="flex justify-between items-start mb-10">
                   <div>
                     <div className="inline-flex items-center space-x-2 px-3 py-1 bg-guofeng-red/10 text-guofeng-red text-xs font-bold rounded-full mb-4">
                       <Zap size={12} />
                       <span>STRATEGIC LEVEL {activeLevel.id}</span>
                     </div>
                     <h3 className="text-5xl font-serif-zh font-bold text-guofeng-ink">{activeLevel.title}</h3>
                   </div>
                   <div className="hidden md:block w-24 h-24 border-2 border-dashed border-gray-100 rounded-full flex items-center justify-center">
                     <div className="text-2xl font-serif-zh font-bold text-gray-200">#{activeLevel.id}</div>
                   </div>
                 </div>
                 
                 {/* CUSTOM IMAGE AREA */}
                 <div className="mb-12">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 text-guofeng-gold font-bold uppercase tracking-widest text-sm">
                        <ImageIcon size={18} />
                        <span>实景/宣传展示区域</span>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-guofeng-bg border border-gray-200 rounded-lg text-[10px] font-bold text-guofeng-ink hover:bg-gray-100 transition-colors"
                        >
                          <Upload size={12} />
                          <span>插入本地图片</span>
                        </button>
                        <button 
                          onClick={handleImageUrlPrompt}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-guofeng-bg border border-gray-200 rounded-lg text-[10px] font-bold text-guofeng-ink hover:bg-gray-100 transition-colors"
                        >
                          <LinkIcon size={12} />
                          <span>链接插入</span>
                        </button>
                      </div>
                   </div>
                   <div className="relative group">
                     {levelImages[activeLevel.id] ? (
                       <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-inner border border-gray-100 bg-gray-50 relative">
                         <img 
                          src={levelImages[activeLevel.id]} 
                          alt={`${activeLevel.title} display`} 
                          className="w-full h-full object-cover"
                         />
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span className="text-white text-xs font-bold border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">点击上方按钮更换图片</span>
                         </div>
                       </div>
                     ) : (
                       <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-video rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-guofeng-gold hover:bg-guofeng-bg transition-all group"
                       >
                         <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-gray-300 group-hover:text-guofeng-gold group-hover:scale-110 transition-all">
                            <ImageIcon size={32} />
                         </div>
                         <div className="text-sm font-bold text-gray-400 group-hover:text-guofeng-gold">点击插入 {activeLevel.title} 实拍/宣传图</div>
                         <div className="text-[10px] text-gray-300 mt-2 font-medium">支持本地上传或输入外部链接</div>
                       </div>
                     )}
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                   {/* KPI & Condition */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3 text-guofeng-red font-bold uppercase tracking-widest text-sm">
                       <Target size={18} />
                       <span>晋升门槛 & KPI</span>
                     </div>
                     <p className="text-xl font-bold text-guofeng-ink leading-tight">{activeLevel.condition}</p>
                     <div className="space-y-3">
                       {activeLevel.kpiDetails.map((kpi, i) => (
                         <div key={i} className="flex items-center text-sm text-guofeng-sub bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                           <CheckCircle2 size={14} className="mr-2 text-guofeng-jade" />
                           {kpi}
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Strategic Role */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3 text-guofeng-jade font-bold uppercase tracking-widest text-sm">
                       <ShieldCheck size={18} />
                       <span>战略定位</span>
                     </div>
                     <p className="text-lg text-guofeng-sub italic leading-relaxed">
                       “{activeLevel.strategicRole}”
                     </p>
                   </div>
                 </div>

                 {/* Privileges List - Hidden if empty */}
                 {activeLevel.privileges.length > 0 && (
                   <div className="bg-guofeng-bg rounded-2xl p-8 border border-gray-100">
                     <h4 className="font-bold text-guofeng-ink mb-6 flex items-center space-x-2">
                       <div className="w-1.5 h-4 bg-guofeng-gold"></div>
                       <span>核心权益与激励回报</span>
                     </h4>
                     <div className="grid grid-cols-1 gap-4">
                       {activeLevel.privileges.map((priv, i) => (
                         <div key={i} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                           <div className="mt-1 w-5 h-5 rounded-full bg-guofeng-gold/10 text-guofeng-gold flex items-center justify-center text-xs font-bold">
                             {i + 1}
                           </div>
                           <span className="text-guofeng-ink font-medium">{priv}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </section>

        {/* Section 4: Financial Models */}
        <section id="model" className="mb-20">
          <SectionHeader title="盈利模型模拟" subtitle="透明的分润体系与持续的增长动力" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-guofeng-ink">裂变分润收益看板</h3>
                <div className="text-xs bg-guofeng-bg px-3 py-1 rounded-full border border-gray-200 text-guofeng-sub font-bold uppercase">Base: ¥20,000 Order</div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart layout="vertical" data={commissionData} margin={{ left: -20, right: 30, top: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px' }}/>
                    <Bar dataKey="C" name="C (传播大使直推) 20%" stackId="a" fill={COLORS.JADE} barSize={40} radius={[0, 0, 0, 0]} />
                    <Bar dataKey="B" name="B (上级间推) 5%" stackId="a" fill="#60A5FA" barSize={40} />
                    <Bar dataKey="Company" name="总公司/供应链/毛利" stackId="a" fill="#F3F4F6" barSize={40} radius={[0, 8, 8, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-guofeng-bg rounded-xl border border-gray-100 text-center">
                  <div className="text-xs text-guofeng-sub mb-1 uppercase tracking-widest">直推收益</div>
                  <div className="text-2xl font-bold text-guofeng-jade">¥4,000</div>
                </div>
                <div className="p-4 bg-guofeng-bg rounded-xl border border-gray-100 text-center">
                  <div className="text-xs text-guofeng-sub mb-1 uppercase tracking-widest">间推收益</div>
                  <div className="text-2xl font-bold text-blue-500">¥1,000</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-guofeng-ink mb-2">综合毛利率分析</h3>
                <p className="text-sm text-guofeng-sub">分销佣金封顶25%，总部保留极致供应链弹性。</p>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-guofeng-ink">营销激励成本</span>
                    <span className="text-guofeng-red">25%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-guofeng-red" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-guofeng-ink">货品生产及研发</span>
                    <span className="text-guofeng-jade">35%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-guofeng-jade" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-guofeng-ink">平台运营及毛利</span>
                    <span className="text-guofeng-gold">40%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-guofeng-gold" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-guofeng-ink text-white py-20 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-16 h-1 bg-guofeng-gold mx-auto mb-10"></div>
          <h2 className="text-4xl font-serif-zh font-bold mb-4">我的搭配师</h2>
          <p className="text-gray-400 text-lg mb-12">中国非遗香云纱 · 全域商业生态领航者</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12 text-sm font-bold text-gray-500 tracking-widest uppercase">
            <span>© 2026 OPERATIONS STRATEGY DEPT.</span>
            <span>SHANGHAI HEADQUARTERS</span>
            <span>CONFIDENTIAL DATA</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
