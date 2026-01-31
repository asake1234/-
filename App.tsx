
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
  Link as LinkIcon,
  Sparkles,
  ChevronDown
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
  <div className="mb-10 text-left">
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
  const museumLevel = LEVELS.find(l => l.id === 4); // 特殊处理的非遗馆

  // 过滤出主序列级别（排除 ID 4，按逻辑 ID 排序显示）
  const mainLevels = LEVELS.filter(l => l.id !== 4).sort((a, b) => {
    // 逻辑顺序：2, 3, 5, 6, 7
    const order = [2, 3, 5, 6, 7];
    return order.indexOf(a.id) - order.indexOf(b.id);
  });

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

  const ActiveIcon = iconMap[activeLevel.icon] || User;

  // 获取显示的级别数字逻辑
  const getDisplayLevelNum = (id: number) => {
    const orderMap: Record<number, number> = { 2: 1, 3: 2, 5: 3, 6: 4, 7: 5 };
    return orderMap[id] || '馆';
  };

  return (
    <div className="min-h-screen pb-20 bg-guofeng-bg antialiased text-left">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageUpload} 
      />

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

      <header className="bg-guofeng-ink text-white pt-24 pb-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-guofeng-red opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <FadeIn>
            <span className="text-guofeng-gold tracking-[0.4em] text-sm font-bold uppercase mb-4 block">Strategic Operations Refinement 2026</span>
            <h1 className="text-4xl md:text-7xl font-serif-zh font-bold mb-8 leading-tight">
              “我的搭配师” <br/> 运营增长与晋升战略
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
              重塑非遗香云纱商业生态：以“晋升体系”为核心，构建从公域流量到终身股东的价值共生闭环。
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
        
        {/* Ecosystem Section */}
        <section id="ecosystem" className="bg-white rounded-3xl shadow-xl p-10 mb-16 border border-gray-100 relative overflow-hidden">
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

        {/* Live System Section */}
        <section id="live-system" className="bg-white rounded-3xl shadow-xl p-10 mb-16 border border-gray-100">
          <SectionHeader title="中央直播间与分佣全流程" subtitle="打通线上销售闭环，实现从注册到提现的极简数字化路径" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-left">
              <div className="p-6 bg-guofeng-bg rounded-2xl border-l-4 border-guofeng-red">
                <div className="flex items-center space-x-3 mb-4">
                  <PlayCircle className="text-guofeng-red" size={24} />
                  <h4 className="font-bold text-lg text-guofeng-ink">线上销售分佣体系</h4>
                </div>
                <p className="text-sm text-guofeng-sub leading-relaxed">
                  中央直播间不仅是成交中心，更是全员分润的引擎。通过小程序赋能，每一位“搭配师”都能将直播间的高质量内容转化为个人私域的变现动力。
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 1, title: '注册经销商', icon: UserPlus, desc: '进入小程序申请成为“搭配师”，审核通过后身份自动升级。' },
                  { id: 2, title: '一键分享', icon: Share2, desc: '点击商品分享按钮，支持海报生成或直接转发好友。' },
                  { id: 3, title: '极速购买', icon: ShoppingBag, desc: '客户点击链接直达微信小店，确保转化率最大化。' },
                  { id: 4, title: '返现提现', icon: Wallet, desc: '佣金实时可见，客户确认收货后可提现至微信钱包。' }
                ].map((step) => (
                  <div key={step.id} className="flex items-start space-x-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-guofeng-gold/10 text-guofeng-gold flex items-center justify-center flex-shrink-0 font-bold">{step.id}</div>
                    <div>
                      <h5 className="font-bold text-guofeng-ink flex items-center">{step.title} <step.icon size={16} className="ml-2 text-guofeng-sub"/></h5>
                      <p className="text-xs text-guofeng-sub mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#1a1a1a] rounded-[3.5rem] p-4 shadow-2xl border-[12px] border-[#222] aspect-[9/19] max-w-[320px] mx-auto relative overflow-hidden">
                <div className="w-full h-full bg-[#f8f8f8] rounded-[2.8rem] overflow-hidden flex flex-col relative text-black text-left">
                  <div className="h-10 px-8 flex justify-between items-center bg-white shrink-0">
                    <span className="text-[10px] font-bold">9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-black/10"></div>
                      <div className="w-3 h-3 rounded-full bg-black/10"></div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-white flex items-center justify-between border-b border-gray-100 shrink-0">
                    <h6 className="text-sm font-bold">我的推广</h6>
                    <div className="flex bg-gray-100 rounded-md p-0.5">
                      <span className="bg-[#ff4d4f] text-white px-2 py-0.5 rounded-md text-[9px]">全部</span>
                      <span className="text-gray-500 px-2 py-0.5 text-[9px]">今日</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto bg-[#fdfaf8] no-scrollbar">
                    <div className="grid grid-cols-2 gap-2 p-3">
                      {[
                        { label: '成交总额 (元)', val: '288.88' },
                        { label: '成交订单 (笔)', val: '1' }
                      ].map((item, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-50">
                          <div className="text-[9px] text-gray-400 mb-1"><span className="w-0.5 h-2 bg-red-500 inline-block mr-1"></span>{item.label}</div>
                          <div className="text-sm font-bold">{item.val}</div>
                        </div>
                      ))}
                    </div>
                    <div className="px-3 mb-4">
                      <div className="bg-gradient-to-br from-[#ff5e62] to-[#ff4d4f] rounded-2xl p-5 text-white shadow-lg relative">
                        <div className="text-2xl font-bold">¥ 0.00</div>
                        <div className="text-[10px] opacity-80 mb-4">可提现佣金 (元)</div>
                        <button className="w-full bg-white text-[#ff4d4f] font-bold py-2 rounded-full text-xs">立即提现</button>
                      </div>
                    </div>
                    <div className="px-3 grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-blue-50 p-2 rounded-xl text-center"><Users2 size={16} className="mx-auto text-blue-500 mb-1"/><div className="text-[10px] font-bold">我的邀请</div></div>
                      <div className="bg-yellow-50 p-2 rounded-xl text-center"><ImageIcon size={16} className="mx-auto text-yellow-600 mb-1"/><div className="text-[10px] font-bold">邀请海报</div></div>
                      <div className="bg-pink-50 p-2 rounded-xl text-center"><BookOpen size={16} className="mx-auto text-pink-500 mb-1"/><div className="text-[10px] font-bold">带货攻略</div></div>
                    </div>
                  </div>
                  <div className="h-14 bg-white border-t border-gray-100 flex justify-around items-center shrink-0">
                    <Home size={18} className="opacity-30"/><LayoutGrid size={18} className="opacity-30"/><Camera size={18} className="opacity-30"/><User size={18} className="text-[#ff4d4f]"/>
                  </div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#222] rounded-b-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Ladder Section */}
        <section id="ladder" className="mb-20">
          <SectionHeader title="晋升体系" subtitle="深度解析各层级的门槛、权益与战略定位" />
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar selection */}
            <div className="lg:w-1/3 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col border border-gray-100 h-fit sticky top-24">
              {mainLevels.map((level, index) => {
                const Icon = iconMap[level.icon] || User;
                const isBranchPartner = level.id === 5;
                const isActiveMain = activeLevelId === level.id;
                const isSubActive = activeLevelId === 4; // 国风非遗馆被选中

                return (
                  <React.Fragment key={level.id}>
                    <button
                      onClick={() => setActiveLevelId(level.id)}
                      className={`flex items-center p-6 text-left transition-all border-l-4 ${
                        isActiveMain ? 'bg-guofeng-bg border-guofeng-red' : 'border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-5 shadow-sm ${
                        isActiveMain ? 'bg-guofeng-red text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-[10px] font-bold uppercase mb-1 ${isActiveMain ? 'text-guofeng-red' : 'text-gray-400'}`}>Level {index + 1}</div>
                        <div className={`font-bold text-lg ${isActiveMain ? 'text-guofeng-ink' : 'text-gray-500'}`}>{level.title}</div>
                      </div>
                      {isBranchPartner && <ChevronDown className={`ml-auto text-gray-300 transition-transform ${isActiveMain || isSubActive ? 'rotate-180 text-guofeng-red' : ''}`} size={16} />}
                      {isActiveMain && !isBranchPartner && <ChevronRight className="ml-auto text-guofeng-red" size={20} />}
                    </button>
                    
                    {/* 子节点显示：分公司合作伙伴下方 */}
                    {isBranchPartner && museumLevel && (
                      <div className={`overflow-hidden transition-all duration-300 bg-gray-50/50 ${isActiveMain || isSubActive ? 'max-h-24' : 'max-h-0'}`}>
                        <button
                          onClick={() => setActiveLevelId(4)}
                          className={`w-full flex items-center py-4 pl-16 pr-6 text-left transition-all border-l-4 ${
                            isSubActive ? 'bg-white border-guofeng-jade' : 'border-transparent hover:bg-gray-100'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 ${isSubActive ? 'bg-guofeng-jade text-white' : 'bg-gray-200 text-gray-400'}`}>
                            <Store size={14} />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold text-sm ${isSubActive ? 'text-guofeng-ink' : 'text-gray-400'}`}>国风非遗馆</div>
                            <div className="text-[9px] text-gray-400 uppercase">Strategic Sub-node</div>
                          </div>
                          {isSubActive && <ChevronRight className="ml-auto text-guofeng-jade" size={14} />}
                        </button>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Content Details */}
            <div className="lg:w-2/3 bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
               <div className="absolute top-20 right-0 opacity-[0.03] pointer-events-none scale-150">
                 <ActiveIcon size={400} />
               </div>
               
               <div className="relative z-10 text-left">
                 <div className="flex justify-between items-start mb-10">
                   <div>
                     <div className="inline-flex items-center space-x-2 px-3 py-1 bg-guofeng-red/10 text-guofeng-red text-xs font-bold rounded-full mb-4">
                       <Zap size={12} />
                       <span>{activeLevelId === 4 ? 'SUBSIDIARY STRATEGY' : `STRATEGIC LEVEL ${getDisplayLevelNum(activeLevelId)}`}</span>
                     </div>
                     <h3 className="text-4xl md:text-5xl font-serif-zh font-bold text-guofeng-ink">{activeLevel.title}</h3>
                   </div>
                   <div className="hidden md:block w-20 h-20 border-2 border-dashed border-gray-100 rounded-full flex items-center justify-center">
                     <div className="text-2xl font-serif-zh font-bold text-gray-200">
                        {getDisplayLevelNum(activeLevelId)}
                     </div>
                   </div>
                 </div>
                 
                 {/* Image Area */}
                 <div className="mb-10">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 text-guofeng-gold font-bold uppercase tracking-widest text-sm">
                        <ImageIcon size={18} />
                        <span>实景/宣传展示区域</span>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => fileInputRef.current?.click()} className="flex items-center space-x-1 px-3 py-1.5 bg-guofeng-bg border border-gray-200 rounded-lg text-[10px] font-bold text-guofeng-ink hover:bg-gray-50">
                          <Upload size={12} /> <span>上传</span>
                        </button>
                        <button onClick={handleImageUrlPrompt} className="flex items-center space-x-1 px-3 py-1.5 bg-guofeng-bg border border-gray-200 rounded-lg text-[10px] font-bold text-guofeng-ink hover:bg-gray-50">
                          <LinkIcon size={12} /> <span>链接</span>
                        </button>
                      </div>
                   </div>
                   <div className="relative group min-h-[220px] rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden bg-gray-50/50">
                     {levelImages[activeLevel.id] ? (
                       <img src={levelImages[activeLevel.id]} className="w-full h-full object-cover" alt="preview" />
                     ) : (
                       <div className="text-center p-8 text-gray-300">
                         <ImageIcon size={48} className="mx-auto mb-2 opacity-20" />
                         <p className="text-sm font-bold">点击按钮插入{activeLevel.title}展示图</p>
                       </div>
                     )}
                   </div>
                 </div>

                 {/* Privileges List */}
                 {activeLevel.privileges && activeLevel.privileges.length > 0 && (
                    <div className="mb-12">
                      <div className="flex items-center space-x-3 text-guofeng-jade font-bold uppercase tracking-widest text-sm mb-6">
                        <Sparkles size={18} />
                        <span>核心加盟权益</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeLevel.privileges.map((priv, idx) => (
                          <div key={idx} className="flex items-start p-4 bg-guofeng-bg border border-gray-50 rounded-xl">
                            <CheckCircle2 size={18} className="mr-3 mt-0.5 flex-shrink-0" style={{ color: activeLevel.color }} />
                            <span className="text-sm text-guofeng-ink leading-relaxed">{priv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                 )}

                 {/* Conditions and Role */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                   <div className="space-y-4">
                     <div className="flex items-center space-x-3 text-guofeng-red font-bold uppercase text-xs">
                       <Target size={16} /> <span>晋升门槛</span>
                     </div>
                     <p className="text-lg font-bold text-guofeng-ink leading-relaxed">{activeLevel.condition}</p>
                   </div>
                   <div className="space-y-4">
                     <div className="flex items-center space-x-3 text-guofeng-sub font-bold uppercase text-xs">
                       <ShieldCheck size={16} /> <span>战略定位</span>
                     </div>
                     <p className="text-md text-guofeng-sub italic leading-relaxed">“{activeLevel.strategicRole}”</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Profit Model Section */}
        <section id="model" className="mb-20">
          <SectionHeader title="盈利模型模拟" subtitle="透明的分润体系与持续的增长动力" />
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart layout="vertical" data={commissionData} margin={{ left: -20, right: 30, top: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="C" name="C (直推) 20%" stackId="a" fill={COLORS.JADE} />
                  <Bar dataKey="B" name="B (间推) 5%" stackId="a" fill="#60A5FA" />
                  <Bar dataKey="Company" name="总公司毛利" stackId="a" fill="#F3F4F6" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center text-left">
              <h4 className="text-2xl font-bold mb-4">综合毛利分析</h4>
              <p className="text-guofeng-sub mb-6">通过极致供应链压缩成本，确保分销商有足够的裂变空间，同时品牌方保留持续创新的研发利润。</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-guofeng-bg rounded-xl text-center">
                  <div className="text-xs text-guofeng-sub uppercase">直推收益</div>
                  <div className="text-2xl font-bold text-guofeng-jade">¥4,000</div>
                </div>
                <div className="p-4 bg-guofeng-bg rounded-xl text-center">
                  <div className="text-xs text-guofeng-sub uppercase">间推收益</div>
                  <div className="text-2xl font-bold text-blue-500">¥1,000</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-guofeng-ink text-white py-20 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-16 h-1 bg-guofeng-gold mx-auto mb-10"></div>
          <h2 className="text-4xl font-serif-zh font-bold mb-4">我的搭配师</h2>
          <p className="text-gray-400 text-lg mb-12">中国非遗香云纱 · 全域商业生态领航者</p>
          <div className="flex justify-center space-x-12 text-sm font-bold text-gray-500 tracking-widest uppercase">
            <span>© 2026 OPERATIONS STRATEGY DEPT.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
