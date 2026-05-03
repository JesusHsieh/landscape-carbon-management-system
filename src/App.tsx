import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Trees, 
  FileText, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Search,
  ArrowDownToLine,
  Leaf,
  Factory,
  AlertCircle,
  Box,
  Map,
  CheckSquare,
  ClipboardList,
  Layers,
  Thermometer,
  Wrench,
  Calculator,
  Compass,
  TrendingDown,
  TrendingUp,
  PieChart as PieChartIcon,
  Info,
  Database,
  Calendar,
  Globe,
  Tag,
  Menu,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import * as mock from './data/mockData';
import { ProjectProvider, useProject } from './store/projectStore';
import { maintenanceScenarios } from './data/defaults/defaultMaintenance';

// --- Shared Components ---

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
  [key: string]: any; 
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-xs font-medium border-l-4",
      active 
        ? "bg-primary/10 text-primary border-primary shadow-[inset_0_0_12px_rgba(126,155,113,0.05)]" 
        : "text-secondary hover:bg-white/5 hover:text-primary border-transparent"
    )}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-6">
    <h2 className="text-xl font-extrabold text-primary tracking-tight">{title}</h2>
    {subtitle && <p className="text-xs text-secondary mt-1">{subtitle}</p>}
  </div>
);

const Card = ({ title, icon: Icon, children, className }: { title: string, icon?: any, children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-card-bg border border-card-border shadow-xl rounded-[20px] overflow-hidden", className)}>
    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
      <h3 className="text-sm font-bold text-primary/90">{title}</h3>
      {Icon && <Icon className="w-4 h-4 text-secondary/20" />}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

interface MetricProps {
  label: string;
  value: string;
  unit: string;
  trend?: string;
  color?: string;
  [key: string]: any;
}

const Metric = ({ label, value, unit, trend, color = "text-accent" }: MetricProps) => (
  <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
    <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">{label}</p>
    <div className="flex items-baseline gap-1">
      <h4 className={cn("text-2xl font-bold", color)}>{value}</h4>
      <span className="text-[10px] text-secondary/60 font-medium">{unit}</span>
    </div>
    {trend && <div className="mt-2 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-full w-fit">{trend}</div>}
  </div>
);

// --- Page Components ---

const Dashboard = () => {
  const { computed, state } = useProject();
  const py = computed.paybackYear;
  const years = state.projectInfo.assessmentYears;
  return (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <Metric label="預估總碳排" value={computed.totalInitialCarbon.toLocaleString()} unit="tCO2e" trend="含 A1-A5 估算" color="text-accent" />
      <Metric label="年度碳匯速率" value={computed.annualSequestration.toFixed(1)} unit="tCO2e/yr" trend="植栽＋土壤" color="text-primary" />
      <Metric label="淨碳抵平年份" value={py ? `Year ${py}` : '未抵平'} unit="" trend={`${years}yr 中位估算`} color="text-secondary" />
      <Metric label={`${years}yr 淨碳排`} value={computed.netCarbon30Y.toLocaleString()} unit="tCO2e" trend={computed.netCarbon30Y < 0 ? "已達長期碳正效益" : "尚未達碳正效益"} color={computed.netCarbon30Y < 0 ? "text-primary" : "text-accent"} />
      <Metric label="資料可信度" value={computed.dataConfidence} unit="" trend="Prototype Data" color="text-secondary" />
      <Metric label="主要碳熱點" value="鋪面" unit="" trend="混凝土" color="text-accent" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card title="方法論摘要 Method Summary" icon={Info} className="lg:col-span-1">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-y-3 text-[11px]">
            <span className="text-secondary">評估年限</span>
            <span className="text-ink font-bold text-right">30 年</span>
            <span className="text-secondary">生命週期範圍</span>
            <span className="text-primary font-bold text-right">A1-A5, B2-B4, B6-B7, C</span>
            <span className="text-secondary">碳匯範圍</span>
            <span className="text-primary font-bold text-right">植栽碳匯、土壤碳匯</span>
            <span className="text-secondary">資料狀態</span>
            <span className="text-accent font-bold text-right">Prototype Mock Data</span>
          </div>
          <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-[10px] text-accent leading-relaxed italic">
            * 報告狀態：僅供設計階段模擬，不可作為第三方查證依據。
          </div>
        </div>
      </Card>

      <Card title="關鍵洞察 Key Insights" icon={ShieldCheck} className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "目前專案初始碳排主要來自硬鋪面與混凝土基礎",
            "中位情境下約於第 24 年達成碳匯抵平",
            "高維護草坪可能推升長期維護碳排",
            "提高喬木覆蓋率有助提前抵平年份",
            "目前資料可信度為 B-，部分係數仍為示範值"
          ].map((insight, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="mt-1 w-1 h-1 rounded-full bg-primary shrink-0" />
              <span className="text-[11px] text-secondary leading-tight">{insight}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="生命週期階段排放分析" icon={Factory}>
        <div className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer debounce={50} width="100%" height="100%">
              <BarChart data={mock.lcaLifecycleData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D3628" />
                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A8B8A0' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A8B8A0' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#21281D', border: '1px solid #2D3628', color: '#F8F9F5' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Legend verticalAlign="top" align="right" iconSize={8} wrapperStyle={{ fontSize: '10px', paddingBottom: '10px' }} />
                <Bar dataKey="emission" fill="#BC6C25" radius={[4, 4, 0, 0]} name="生命週期排放" />
                <Bar dataKey="sink" fill="#7E9B71" radius={[4, 4, 0, 0]} name="植栽與土壤碳匯" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-secondary/60 italic text-center">
            「碳匯數值為 30 年累積模擬結果，非完工當年度抵減量。」
          </p>
        </div>
      </Card>

      <Card title="30 年累積淨碳曲線" icon={Activity}>
        <div className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer debounce={50} width="100%" height="100%">
              <AreaChart data={mock.netCarbonCurve}>
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7E9B71" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7E9B71" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A8B8A0' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A8B8A0' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1D2319', border: 'none' }} labelStyle={{ fontSize: '10px' }} itemStyle={{ fontSize: '10px' }} />
                <Legend verticalAlign="top" align="right" iconSize={8} wrapperStyle={{ fontSize: '10px', paddingBottom: '10px' }} />
                <Area type="monotone" name="累積排放" dataKey="累積排放" stroke="#BC6C25" fill="#BC6C25" fillOpacity={0.1} />
                <Area type="monotone" name="累積碳匯" dataKey="累積碳匯" stroke="#7E9B71" fill="url(#colorNet)" />
                <Area type="monotone" name="淨碳排" dataKey="淨碳排" stroke="#F8F9F5" strokeDasharray="5 5" fill="transparent" />
                <ReferenceLine x={24} stroke="#DDA15E" strokeDasharray="3 3" label={{ position: 'top', value: 'Year 24 抵平點', fill: '#DDA15E', fontSize: 10 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-secondary/60 italic text-center">
            「Year 24 為中位情境下基地內累積碳匯首次抵平累積排放的時間點。」
          </p>
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card title="風險與不確定性 Risk & Uncertainty">
        <div className="space-y-4">
          {[
            "新植喬木成活率將影響抵平年份",
            "草坪維護頻率可能提高 B2-B4 排放",
            "材料運距目前採示範值估算",
            "土壤碳模型為簡化模擬版"
          ].map((risk, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-accent/5 rounded-xl border border-accent/10">
              <AlertCircle className="w-3 h-3 text-accent shrink-0" />
              <span className="text-[11px] text-accent leading-tight">{risk}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="減碳建議清單" className="lg:col-span-1">
        <div className="space-y-3">
          {[
            "降低混凝土與石材鋪面比例，改用透水鋪面與植栽帶",
            "保留現有的 86 株成熟喬木並進行表土保護",
            "將高維護草坪改為低維護地被",
            "使用在地材料降低運輸碳排",
            "枝葉現地循環以降低清運碳排"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
              <TrendingDown className="w-3 h-3 text-primary mt-0.5 shrink-0" />
              <span className="text-[11px] text-secondary leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="建議下一步 Recommended Next Actions">
        <div className="space-y-3">
          {[
            { label: "檢查鋪面與混凝土數量清單", icon: ClipboardList },
            { label: "比較 Low Carbon 與 Nature Positive 方案", icon: Compass },
            { label: "補充植栽成活率與維護情境參數", icon: Layers },
            { label: "生成景觀專案碳管理報告預覽", icon: FileText }
          ].map((action, i) => (
            <button key={i} className="w-full flex items-center justify-between p-3 bg-primary/10 hover:bg-primary/20 rounded-xl border border-primary/20 transition-all text-left">
              <div className="flex items-center gap-3">
                <action.icon className="w-3 h-3 text-primary" />
                <span className="text-[11px] text-ink font-bold">{action.label}</span>
              </div>
              <Zap className="w-3 h-3 text-primary/40" />
            </button>
          ))}
        </div>
      </Card>
    </div>
  </div>
  );
};

const Boundary = () => (
  <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
    <SectionHeading title="專案邊界與評估設定" subtitle="定義系統評價範疇與時間尺度" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card title="基本設定">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] text-secondary font-bold uppercase">專案名稱</label>
              <input type="text" defaultValue={mock.mockProject.name} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-ink outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-secondary font-bold uppercase">評估年限</label>
              <select defaultValue="30 年" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-ink outline-none">
                <option>10 年</option><option>20 年</option><option>30 年</option><option>50 年</option>
              </select>
            </div>
          </div>
        </Card>
        <Card title="生命週期階段 (LCA Stages)">
          <div className="grid grid-cols-2 gap-4">
            {mock.mockProject.boundary.modules.map(mod => (
              <div key={mod.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/50 transition-all">
                <span className="text-xs text-ink">{mod.label}</span>
                <div className={cn("w-10 h-5 rounded-full relative transition-colors p-1", mod.active ? "bg-primary" : "bg-white/10")}>
                  <div className={cn("w-3 h-3 bg-white rounded-full transition-all", mod.active ? "ml-5" : "ml-0")} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card title="邊界摘要狀態" className="h-fit">
        <div className="space-y-6">
          <p className="text-[11px] text-secondary leading-relaxed border-b border-white/10 pb-4 italic">
            「本評估以台北數位森林公園全區為對象，採 30 年 Cradle-to-Grave 邊界，納入材料、施工、維護、營運、退役及植栽 / 土壤碳匯，並以 Prototype Mock Data 進行設計階段模擬。」
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <div className="text-[10px] uppercase font-bold text-primary mb-1">評估深度</div>
              <div className="text-lg font-bold text-primary">Cradle-to-Grave</div>
            </div>
            <ul className="text-xs space-y-3">
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">評估目的</span><span className="text-ink font-bold">設計階段模擬</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">評估年限</span><span className="text-ink font-bold">30 年</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">計算對象</span><span className="text-ink font-bold">台北數位森林公園全區</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">功能單位</span><span className="text-ink font-bold">整體基地</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">納入碳匯</span><span className="text-primary font-bold">植栽 / 土壤</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">地理邊界</span><span className="text-ink font-bold">基地地籍線</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">數據來源</span><span className="text-accent underline font-bold transition-all hover:opacity-80">Mock v0.1</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-[10px] uppercase font-bold text-secondary tracking-widest">納入 / 排除項目 Summary</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-[9px] text-primary font-bold uppercase">納入 (Included)</div>
                <ul className="text-[9px] text-secondary space-y-1 list-disc list-inside">
                  <li>A1-A3 材料生產</li>
                  <li>A4 材料運輸</li>
                  <li>A5 施工安裝</li>
                  <li>B2-B4 維護修繕</li>
                  <li>B6-B7 營運能源</li>
                  <li>C 退役處理</li>
                  <li>植栽 / 土壤碳匯</li>
                </ul>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] text-accent font-bold uppercase">排除 (Excluded)</div>
                <ul className="text-[9px] text-secondary space-y-1 list-disc list-inside opacity-60">
                  <li>外部碳抵換</li>
                  <li>熱島降溫效益</li>
                  <li>第三方查證庫</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-secondary tracking-widest">適用層級 Applicability</div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-secondary">使用狀態</span>
                <span className="text-primary font-bold">Prototype / Demo</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-secondary">適用用途</span>
                <span className="text-ink">設計比較 / 業主簡報</span>
              </div>
              <div className="text-[9px] text-accent italic opacity-80 leading-tight">
                * 限制：不可作為第三方查證或正式碳權申請依據
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-secondary tracking-widest">不確定性提示</div>
            <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl space-y-1.5">
              {[
                "部分材料係數為示範值",
                "植栽成活率採中位假設",
                "土壤碳模型為簡化版",
                "維護頻率尚未校正"
              ].map((t, i) => (
                <div key={i} className="flex gap-2 items-start text-[10px] text-accent/80">
                  <span className="mt-1 w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const SiteData = () => (
  <div className="space-y-6 animate-in zoom-in-95 duration-500 font-sans">
    <SectionHeading title="基地資料與現況分析" subtitle="Site Characteristics & Pre-assessment" />
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Metrics and Detailed Blocks */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "基地面積", val: "18,500 m²", icon: Map },
            { label: "綠覆率", val: "62%", icon: Trees },
            { label: "平均氣溫", val: "23.5°C", icon: Thermometer },
            { label: "年降雨量", val: "2,400 mm", icon: Activity },
            { label: "透水率", val: "48%", icon: ArrowDownToLine },
            { label: "硬鋪面比例", val: "38%", icon: Box },
            { label: "既有喬木", val: "86 株", icon: Trees },
            { label: "土壤壓實風險", val: "中高", icon: AlertCircle, color: "text-accent" },
            { label: "淹水潛勢", val: "中", icon: Activity, color: "text-accent" },
            { label: "熱島風險", val: "中高", icon: Thermometer, color: "text-accent" },
          ].map(item => (
            <div key={item.label} className="bg-card-bg p-3 rounded-2xl border border-card-border flex flex-col gap-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-secondary/60">
                <item.icon className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
              </div>
              <span className={cn("text-base font-bold", item.color || "text-ink")}>{item.val}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="既有植栽 Existing Vegetation" icon={Trees}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                 <div><span className="text-secondary block">既有喬木</span><span className="text-ink font-bold">86 株</span></div>
                 <div><span className="text-secondary block">建議保留</span><span className="text-primary font-bold">72 株</span></div>
                 <div><span className="text-secondary block">既有樹冠覆蓋</span><span className="text-ink font-bold">18%</span></div>
                 <div><span className="text-secondary block">移植 / 移除風險</span><span className="text-accent font-bold">中</span></div>
              </div>
              <p className="text-[10px] text-secondary leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                成熟喬木保留可降低碳匯抵平時間風險，並減少新植樹前期碳匯不足的問題。
              </p>
            </div>
          </Card>

          <Card title="土壤與水文 Soil & Hydrology" icon={Activity}>
             <div className="space-y-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[11px]">
                 <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">土壤排水性</span><span className="text-ink">中等</span></div>
                 <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">土壤壓實風險</span><span className="text-accent">中高</span></div>
                 <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">表土保留潛力</span><span className="text-primary">中</span></div>
                 <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">淹水潛勢</span><span className="text-accent">中</span></div>
                 <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">雨水入滲潛力</span><span className="text-primary">中高</span></div>
                 <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">灌溉依賴風險</span><span className="text-primary">中低</span></div>
              </div>
              <p className="text-[10px] text-secondary leading-relaxed italic border-t border-white/5 pt-3">
                「年降雨量充足，但若土壤壓實或硬鋪面比例偏高，將降低入滲與植栽生長效益，並可能提高維護補植需求。」
              </p>
            </div>
          </Card>
        </div>

        <Card title="基地風險 Site Risks" icon={AlertCircle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "夏季高溫可能影響新植喬木成活率與灌溉需求",
              "土壤壓實會降低根系發展與土壤碳累積",
              "硬鋪面集中會增加熱島與雨洪逕流",
              "草坪活動區可能提高割草、灌溉與維護碳排",
              "淹水潛勢會影響樹種選擇與根系健康"
            ].map((risk, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-red-400/5 rounded-xl border border-red-400/10">
                <AlertCircle className="w-3 h-3 text-red-400/60 mt-0.5 shrink-0" />
                <span className="text-[10px] text-secondary leading-tight">{risk}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Column: Visualization and Analysis */}
      <div className="space-y-6">
        <Card title="基地條件評估">
          <div className="space-y-4">
            <div className="h-[250px]">
              <ResponsiveContainer debounce={50} width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                  { subject: '植栽潛力', A: 85 },
                  { subject: '土壤碳潛力', A: 70 },
                  { subject: '雨洪調節', A: 60 },
                  { subject: '熱島改善', A: 90 },
                  { subject: '維護壓力', A: 75 },
                ]}>
                  <PolarGrid stroke="#2D3628" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#A8B8A0' }} />
                  <Radar name="Site" dataKey="A" stroke="#7E9B71" fill="#7E9B71" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-secondary/60 leading-relaxed italic text-center px-2">
              「雷達圖用於快速判斷基地在植栽碳匯、土壤碳、水文韌性、熱島改善與維護壓力上的相對表現。分數為 Prototype Mock Data，未來可由 GIS、現地調查與維護紀錄校正。」
            </p>
          </div>
        </Card>

        <Card title="基地碳潛力 Site Carbon Potential" icon={Zap}>
          <div className="space-y-4">
            <div className="space-y-2">
               {[
                 { label: "植栽碳匯潛力", val: "中高", color: "text-primary" },
                 { label: "土壤碳匯潛力", val: "中", color: "text-ink" },
                 { label: "維護碳排風險", val: "中", color: "text-ink" },
                 { label: "雨洪韌性潛力", val: "中高", color: "text-primary" },
                 { label: "熱島改善潛力", val: "高", color: "text-primary" },
               ].map(p => (
                 <div key={p.label} className="flex justify-between items-center bg-white/5 p-2 px-3 rounded-lg border border-white/5">
                   <span className="text-[11px] text-secondary">{p.label}</span>
                   <span className={cn("text-[11px] font-bold", p.color)}>{p.val}</span>
                 </div>
               ))}
            </div>
            <p className="text-[10px] text-primary/80 leading-relaxed bg-primary/5 p-3 rounded-xl border border-primary/10 font-medium">
              「基地具備中高植栽碳匯潛力，但土壤壓實、硬鋪面比例與後續維護頻率將影響 30 年淨碳表現。」
            </p>
          </div>
        </Card>

        <Card title="資料狀態 Data Status" icon={Info}>
          <div className="space-y-3">
             <div className="text-[10px] text-secondary space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-1"><span>基地面積</span><span className="font-bold text-ink">Mock / CAD, GIS 導入</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span>綠覆率</span><span className="font-bold text-ink">Mock / 人工估算</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span>氣溫雨量</span><span className="font-bold text-ink">Mock / 氣象資料導入</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span>土壤條件</span><span className="font-bold text-ink">Mock / 現地調查需</span></div>
                <div className="flex justify-between"><span>既有植栽</span><span className="font-bold text-ink">Mock / 樹木調查表</span></div>
             </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const BOQ = () => {
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = [
    '全部', '鋪面工程', '土方工程', '構造物工程', '植栽工程', '機電 / 灌溉', '高碳項目', '待確認項目'
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <SectionHeading title="工程數量清單與初步計算" subtitle="Bill of Quantities Carbon Mapping" />
      
      {/* BOQ KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "工程項目數", val: "24", unit: "項" },
          { label: "已映射材料係數", val: "18 / 24", unit: "", color: "text-primary" },
          { label: "預估 BOQ 碳排", val: "865", unit: "tCO2e", color: "text-accent" },
          { label: "高碳類別", val: "鋪面 / 混凝土", unit: "", color: "text-accent" },
          { label: "資料完整度", val: "75%", unit: "", color: "text-primary" },
          { label: "待確認項目", val: "木材 / 再生", unit: "", color: "text-secondary" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-card-bg p-4 rounded-2xl border border-card-border shadow-sm">
            <p className="text-[9px] uppercase font-bold text-secondary mb-1">{kpi.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-lg font-black", kpi.color || "text-ink")}>{kpi.val}</span>
              <span className="text-[9px] text-secondary/60">{kpi.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[11px] font-bold transition-all border",
                  activeCategory === cat 
                    ? "bg-primary/20 text-primary border-primary/40 shadow-[0_0_15px_rgba(126,155,113,0.1)]" 
                    : "bg-white/5 text-secondary border-white/5 hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <Card title="工程項目詳細清單 (Expanded BOQ Table)">
            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="border-b border-white/10 text-secondary uppercase tracking-tighter whitespace-nowrap">
                    <th className="py-3 px-3">工程分類</th>
                    <th className="py-3 px-3">項目</th>
                    <th className="py-3 px-3">材料</th>
                    <th className="py-3 px-3">數量 / 單位</th>
                    <th className="py-3 px-3">規格</th>
                    <th className="py-3 px-3">壽命</th>
                    <th className="py-3 px-3">運距</th>
                    <th className="py-3 px-3">損耗%</th>
                    <th className="py-3 px-3">階段</th>
                    <th className="py-3 px-3">數據源</th>
                    <th className="py-3 px-3">可信度</th>
                    <th className="py-3 px-3 text-accent text-right">碳排 (tCO2e)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { cat: '鋪面', item: '花崗石鋪面', mat: '花崗石', qty: '1200 m²', spec: '50mm', life: 30, dist: 450, loss: 5, stage: 'A1-A4', src: '廠商EPD', conf: 'A', carbon: 420 },
                    { cat: '鋪面', item: '透水磚鋪面', mat: '再生混凝土磚', qty: '2400 m²', spec: '60mm', life: 20, dist: 45, loss: 8, stage: 'A1-A4', src: '工業平均', conf: 'B', carbon: 180 },
                    { cat: '鋪面', item: '混凝土路面', mat: 'C210混凝土', qty: '800 m²', spec: '100mm', life: 40, dist: 30, loss: 3, stage: 'A1-A4', src: '政府公告', conf: 'A', carbon: 310 },
                    { cat: '構造', item: 'RC 花台', mat: 'RC', qty: '150 m', spec: 'W60, H45', life: 50, dist: 30, loss: 5, stage: 'A1-A5', src: '模擬推估', conf: 'C', carbon: 80 },
                    { cat: '構造', item: '木平台', mat: '防腐松木', qty: '350 m²', spec: '30mm', life: 15, dist: 120, loss: 10, stage: 'A1-B4', src: '文獻資料', conf: 'B', carbon: 12, special: '潛力 -45' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="py-3 px-3"><span className="px-2 py-0.5 bg-sidebar rounded border border-white/5 text-secondary">{row.cat}</span></td>
                      <td className="py-3 px-3 font-bold text-ink">{row.item}</td>
                      <td className="py-3 px-3 text-secondary">{row.mat}</td>
                      <td className="py-3 px-3 text-ink font-medium">{row.qty}</td>
                      <td className="py-3 px-3 text-secondary">{row.spec}</td>
                      <td className="py-3 px-3 text-secondary">{row.life} yr</td>
                      <td className="py-3 px-3 text-secondary">{row.dist} km</td>
                      <td className="py-3 px-3 text-secondary">{row.loss}</td>
                      <td className="py-3 px-3 text-secondary">{row.stage}</td>
                      <td className="py-3 px-3 text-secondary/60">{row.src}</td>
                      <td className="py-3 px-3">
                        <span className={cn(
                          "px-1.5 py-0.5 rounded font-black",
                          row.conf === 'A' ? "text-primary bg-primary/10" : "text-accent bg-accent/10"
                        )}>{row.conf}</span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="font-mono font-bold text-accent">{row.carbon}</div>
                        {row.special && <div className="text-[8px] text-primary whitespace-nowrap italic">{row.special}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-sidebar/50 rounded-2xl border border-white/5 text-[10px] text-secondary leading-relaxed">
              <span className="text-secondary/40 font-bold block mb-1 uppercase tracking-widest">資料狀態 Data Status</span>
              目前為 Prototype Mock Data。未來可由 CAD、Excel、BIM、GIS 或人工輸入匯入。材料係數將由 Materials 頁統一管理。
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="高碳項目排行 Top Hotspots" icon={AlertCircle}>
            <div className="space-y-3">
              {[
                { name: '花崗石鋪面', carbon: 420 },
                { name: '混凝土鋪面', carbon: 310 },
                { name: '透水磚鋪面', carbon: 180 },
                { name: '土方外運', carbon: 95 },
                { name: 'RC 花台', carbon: 80 },
              ].map((h, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-ink font-medium">{h.name}</span>
                    <span className="text-accent font-mono font-bold">{h.carbon} t</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent/50" style={{ width: `${(h.carbon/420)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="BOQ 碳排映射狀態" icon={Zap}>
            <div className="space-y-4">
              <ul className="text-[11px] space-y-3">
                <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">數量來源</span><span className="text-ink">Mock v0.1</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">已映射係數</span><span className="text-primary font-bold">75%</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">高碳熱點</span><span className="text-accent">鋪面 / 混凝土</span></li>
              </ul>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
                 <span className="text-[10px] text-secondary/60 font-bold uppercase block">待確認項目</span>
                 <p className="text-[10px] text-ink leading-tight">木材、再生材料、施工機具</p>
              </div>
              <button className="w-full py-2.5 bg-primary/10 border border-primary/20 text-primary rounded-xl text-[10px] font-bold hover:bg-primary hover:text-bg transition-all">
                前往 Materials 確認係數
              </button>
            </div>
          </Card>

          <Card title="材料碳足跡提醒" icon={Info}>
            <div className="space-y-4 text-[10px] text-secondary leading-relaxed">
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1 shrink-0" />
                <p>材料排放需拆分 A1-A3 材料生產、A4 運輸、A5 施工安裝。</p>
              </div>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1 shrink-0" />
                <p>木材可能有生物碳儲存潛力，但不應在未定義方法論前直接視為負排放。</p>
              </div>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1 shrink-0" />
                <p>材料壽命與替換週期會影響 B4 更換排放。</p>
              </div>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1 shrink-0" />
                <p>材料來源、運距與損耗率會影響總碳排與資料可信度。</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Maintenance = () => (
  <div className="space-y-6 animate-in fade-in duration-500 font-sans">
    <SectionHeading title="營運維護階段碳排分析" subtitle="Long-term Operational Carbon (B2-B4, B6-B7)" />
    
    {/* Scenario Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center gap-4 text-center group hover:border-red-400/30 transition-all">
        <div className="p-3 bg-red-400/10 rounded-full"><TrendingDown className="w-8 h-8 text-red-400 rotate-180" /></div>
        <h4 className="font-bold text-ink">高強度維護情境</h4>
        <p className="text-[11px] text-secondary leading-relaxed">密集除草、自動灌溉、高頻率修剪</p>
        <div className="space-y-1">
          <div className="text-xl font-bold text-ink">12.5 tCO2e/yr</div>
          <div className="text-[10px] text-accent font-bold">30 年累積約 375 tCO2e</div>
          <div className="text-[9px] text-secondary/60">相較標準情境 +198%</div>
        </div>
      </div>
      <div className="p-6 bg-primary/20 rounded-3xl border border-primary/20 flex flex-col items-center gap-4 text-center ring-2 ring-primary/40 group hover:ring-primary transition-all">
        <div className="p-3 bg-primary/10 rounded-full"><TrendingDown className="w-8 h-8 text-primary" /></div>
        <h4 className="font-bold text-ink">標準維護情境 (設計方案)</h4>
        <p className="text-[11px] text-secondary leading-relaxed">季節性修剪、分區平衡灌溉</p>
        <div className="space-y-1">
          <div className="text-xl font-bold text-primary">4.2 tCO2e/yr</div>
          <div className="text-[10px] text-primary font-bold">30 年累積約 126 tCO2e</div>
          <div className="text-[9px] text-secondary/60">作為本案基準維護模型</div>
        </div>
      </div>
      <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center gap-4 text-center group hover:border-primary/30 transition-all">
        <div className="p-3 bg-secondary/10 rounded-full"><Leaf className="w-8 h-8 text-secondary" /></div>
        <h4 className="font-bold text-ink">近自然維護情境</h4>
        <p className="text-[11px] text-secondary leading-relaxed">現地循環堆肥、原生多樣地被</p>
        <div className="space-y-1">
          <div className="text-xl font-bold text-ink">0.8 tCO2e/yr</div>
          <div className="text-[10px] text-primary font-bold">30 年累積約 24 tCO2e</div>
          <div className="text-[9px] text-secondary/60">相較標準情境 -81%</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        {/* Scenario Definition Table */}
        <Card title="情境定義 Scenario Definition" icon={ClipboardList}>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-[10px]">
               <thead>
                 <tr className="border-b border-white/10 text-secondary uppercase tracking-wider">
                   <th className="py-3 px-3">管理細項</th>
                   <th className="py-3 px-3 text-red-400">高強度維護</th>
                   <th className="py-3 px-3 text-primary">標準維護</th>
                   <th className="py-3 px-3">近自然維護</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {[
                   { label: '修剪頻率', high: '12次/年', std: '4次/年', nat: '必要時修剪' },
                   { label: '草坪割草', high: '24次/年', std: '8次/年', nat: '2次/年' },
                   { label: '灌溉方式', high: '全區高頻自動', std: '分區平衡感測', nat: '極低人工補水' },
                   { label: '施肥頻率', high: '高頻化學肥', std: '季節性緩釋粉', nat: '有機質回舖' },
                   { label: '平均補植率', high: '5%', std: '3%', nat: '1.5%' },
                   { label: '枝葉處理', high: '清運外地處置', std: '部分現地循環', nat: '全量現地循環' },
                   { label: '維護機具', high: '全燃油機具', std: '電動/手動混合', nat: '全手動/極低能耗' },
                 ].map((row, i) => (
                   <tr key={i} className="hover:bg-white/5 transition-colors">
                     <td className="py-3 px-3 text-secondary font-bold">{row.label}</td>
                     <td className="py-3 px-3 text-ink">{row.high}</td>
                     <td className="py-3 px-3 text-ink">{row.std}</td>
                     <td className="py-3 px-3 text-ink">{row.nat}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="碳排組成 Carbon Breakdown" icon={Activity}>
             <div className="space-y-4">
                <div className="space-y-2">
                   {[
                     { label: '灌溉用水 / 泵浦', val: '22%', color: '#7E9B71' },
                     { label: '草坪割草', val: '18%', color: '#BC6C25' },
                     { label: '喬灌木修剪', val: '15%', color: '#DDA15E' },
                     { label: '補植與苗圃輸送', val: '14%', color: '#4A6741' },
                     { label: '施肥與土壤改良', val: '12%', color: '#A8B8A0' },
                     { label: '枝葉清運與處理', val: '10%', color: '#606C38' },
                     { label: '維護車輛 / 機具', val: '9%', color: '#283618' },
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-secondary">{item.label}</span>
                          <span className="text-ink font-bold font-mono">{item.val}</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full" style={{ width: item.val, backgroundColor: item.color }} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </Card>

          <Card title="30 年累積影響 30-Year Impact" icon={Calculator}>
             <div className="space-y-6">
                <div className="space-y-4">
                   {[
                     { label: '高強度維護', val: 375, color: 'text-red-400', bg: 'bg-red-400/10' },
                     { label: '標準維護', val: 126, color: 'text-primary', bg: 'bg-primary/10' },
                     { label: '近自然維護', val: 24, color: 'text-ink', bg: 'bg-white/5' },
                   ].map((impact, i) => (
                     <div key={i} className={cn("p-4 rounded-2xl border border-white/5", impact.bg)}>
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-bold text-ink">{impact.label}</span>
                           <span className={cn("text-lg font-black font-mono", impact.color)}>{impact.val} <span className="text-[10px]">tCO2e</span></span>
                        </div>
                     </div>
                   ))}
                </div>
                <p className="text-[10px] text-secondary leading-relaxed italic border-t border-white/5 pt-4">
                  「即使單年度差距看似有限，30 年累積下維護策略差異將顯著影響整體專案淨碳表現。」
                </p>
             </div>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card title="維護情境摘要 Summary" icon={Info}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3 text-[11px]">
               <span className="text-secondary">評估年限</span><span className="text-ink font-bold text-right">30 年</span>
               <span className="text-secondary">顯示單位</span><span className="text-primary font-bold text-right">tCO2e/yr</span>
               <span className="text-secondary">資料狀態</span><span className="text-accent font-bold text-right">Prototype Mock</span>
            </div>
            <p className="text-[10px] text-secondary/60 leading-relaxed italic border-t border-white/5 pt-3">
               「本頁反映營運維護階段的年度碳排差異，主要受修剪頻率、草坪管理、灌溉方式、補植率與維護機具使用影響。」
            </p>
          </div>
        </Card>

        <Card title="風險與不確定性 Risks" icon={AlertCircle}>
          <div className="space-y-3">
             {[
               "草坪活動需求升高時，割草與灌溉可能超出預設",
               "新植初期死亡率高時，補植碳排會提高",
               "管理偏好改變可能使實際模式轉向高維護",
               "乾旱與高溫將提高灌溉需求",
               "枝葉若未現地循環，清運碳排高於估算"
             ].map((r, i) => (
               <div key={i} className="flex gap-2 items-start text-[10px] text-accent/80">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span>{r}</span>
               </div>
             ))}
             <p className="text-[9px] text-secondary mt-2 opacity-60 leading-tight">
               * 維護碳排不僅受設計影響，也高度取決於後續管理制度與方式。
             </p>
          </div>
        </Card>

        <Card title="模組連動 Model Linkages" icon={Compass}>
          <div className="space-y-2">
             {[
               { target: 'Vegetation', text: '過度修剪可能降低碳匯' },
               { target: 'Soil', text: '影響 SOC 穩定性' },
               { target: 'Scenario', text: '降低長期 B2-B4 排放' },
               { target: 'Reporting', text: '需獨立揭露年度運維排' },
             ].map((l, i) => (
               <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5 text-[10px]">
                  <span className="text-primary font-bold">{l.target}</span>
                  <span className="text-secondary italic">{l.text}</span>
               </div>
             ))}
          </div>
        </Card>

        <Card title="建議下一步 Next Actions" icon={Zap}>
          <div className="space-y-2">
             {[
               "檢查草坪面積與維護頻率設定",
               "檢查灌溉是否可改為感測控制",
               "於 Vegetation 檢討高維護樹種",
               "於 Soil 確認覆蓋物與循環策略",
               "於 Scenario 比較各方案效益",
             ].map((action, i) => (
               <button key={i} className="w-full text-left p-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-[10px] text-primary font-bold transition-all">
                  {action}
               </button>
             ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const Scenario = () => (
  <div className="space-y-6 animate-in fade-in duration-500 font-sans">
    <SectionHeading title="設計情境比較與方案評選" subtitle="Multi-criteria Scenario Assessment" />
    
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left Column: Visualization */}
      <div className="lg:col-span-2 space-y-6">
        <Card title="方案綜合雷達圖" icon={Compass}>
          <div className="space-y-6">
            <div className="h-[400px]">
              <ResponsiveContainer debounce={50} width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mock.scenarioData}>
                  <PolarGrid stroke="#2D3628" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#A8B8A0' }} />
                  <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '10px' }} />
                  <Radar name="Baseline" dataKey="Baseline" stroke="#BC6C25" fill="#BC6C25" fillOpacity={0.1} />
                  <Radar name="Low Carbon" dataKey="LowCarbon" stroke="#DDA15E" fill="#DDA15E" fillOpacity={0.1} />
                  <Radar name="Natural Design (Nature Positive)" dataKey="Natural" stroke="#7E9B71" fill="#7E9B71" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-secondary/60 leading-relaxed italic text-center border-t border-white/5 pt-4">
              「雷達圖顯示 Baseline、Low Carbon、Natural Design 三方案於五項準則的標準化表現，分數越高代表整體表現越佳。」
            </p>
          </div>
        </Card>

        <Card title="方案定義 Scenario Definitions" icon={Layers}>
           <div className="space-y-4">
             {[
               { name: 'Baseline', desc: '現行一般景觀配置與常規維護模式。', color: 'text-[#BC6C25]' },
               { name: 'Low Carbon', desc: '優先替換低碳材料、降低初始材料碳排。', color: 'text-[#DDA15E]' },
               { name: 'Natural Design / Nature Positive', desc: '提高原生喬木比例、降低高維護草坪、提升生態與碳匯效益。', color: 'text-primary' },
             ].map((s, i) => (
               <div key={i} className="flex flex-col gap-1 p-3 bg-white/5 rounded-xl border border-white/5">
                 <span className={cn("text-[11px] font-bold", s.color)}>{s.name}</span>
                 <p className="text-[10px] text-secondary leading-relaxed">{s.desc}</p>
               </div>
             ))}
           </div>
        </Card>
      </div>

      {/* Right Column: Analysis and Recommendations */}
      <div className="lg:col-span-3 space-y-6">
        <div className="p-8 bg-primary/10 rounded-[32px] border border-primary/20 space-y-6 shadow-2xl shadow-primary/5">
          <div className="flex justify-between items-start">
             <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest"><Zap className="w-4 h-4" /> 系統推薦方案</div>
                <h3 className="text-2xl font-black text-ink">Nature Positive 生態正效益方案</h3>
                <div className="text-xs font-bold text-primary/80">推薦模式：平衡模式（Carbon + Ecology Balanced）</div>
             </div>
             <div className="text-right">
                <div className="text-[10px] text-secondary font-bold uppercase">綜合得分</div>
                <div className="text-4xl font-black text-primary">87<span className="text-sm opacity-40">/100</span></div>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { label: '碳中和時間', val: '第 18 年', sub: '較 Baseline -6年' },
               { label: '30年淨貢獻', val: '186 tCO2e', sub: '碳匯盈餘' },
               { label: '減碳率', val: '25%', sub: 'Initial Case' },
               { label: '碳匯增長', val: '40%', sub: 'Vegetation Up' },
             ].map((m, i) => (
               <div key={i} className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <span className="block text-[10px] text-secondary font-bold uppercase mb-1">{m.label}</span>
                  <span className="text-lg font-bold text-ink block">{m.val}</span>
                  <span className="text-[9px] text-primary/60 font-medium">{m.sub}</span>
               </div>
             ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-primary/10">
             <div className="text-[11px] font-bold text-ink uppercase tracking-wider">推薦原因 Why This Scenario</div>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                {[
                  "本方案在碳匯增量與生物多樣性表現最佳",
                  "相較 Baseline，長期淨碳表現更佳",
                  "相較 Low Carbon，整體長期效益最佳",
                  "在低碳、生態與景觀品質間取得最佳平衡"
                ].map((reason, i) => (
                  <li key={i} className="flex gap-2 items-start text-[10px] text-secondary leading-relaxed">
                     <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                     {reason}
                  </li>
                ))}
             </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="評分邏輯 Scoring Logic" icon={Calculator}>
             <div className="space-y-4">
                <div className="space-y-3">
                   {[
                     { label: '初始碳排', weight: '25%' },
                     { label: '碳匯增量', weight: '25%' },
                     { label: '維護碳排', weight: '15%' },
                     { label: '景觀美學', weight: '15%' },
                     { label: '生物多樣性', weight: '20%' },
                   ].map((w, i) => (
                     <div key={i} className="flex flex-col gap-1">
                        <div className="flex justify-between text-[11px]">
                           <span className="text-secondary">{w.label}</span>
                           <span className="text-primary font-bold">{w.weight}</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-primary" style={{ width: w.weight }} />
                        </div>
                     </div>
                   ))}
                </div>
                <p className="text-[10px] text-secondary/60 leading-relaxed italic border-t border-white/5 pt-3">
                  「雷達圖已將各指標統一正向化，分數越高代表整體表現越好；初始碳排與維護碳排已轉換為正向表現分數（排放越低，分數越高）。」
                </p>
             </div>
          </Card>

          <Card title="取捨與風險 Trade-offs" icon={AlertCircle}>
             <div className="space-y-3">
                {[
                  "原生喬木比例提高，前期成活率需控制",
                  "近自然設計可能降低部分可使用草坪面積",
                  "若偏好低落葉景觀，維護模式需同步調整",
                  "若管理仍採高維護，方案效益可能被稀釋"
                ].map((risk, i) => (
                  <div key={i} className="flex gap-3 p-2 bg-white/5 rounded-lg border border-white/5">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                     <p className="text-[10px] text-secondary leading-relaxed">{risk}</p>
                  </div>
                ))}
             </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card title="備選方案 Alternative Option" icon={Layers}>
              <div className="space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                    <div className="text-[10px] text-secondary font-bold uppercase">備選方案</div>
                    <div className="text-sm font-bold text-ink">Low Carbon 材料導向方案</div>
                 </div>
                 <div className="space-y-2">
                    <div className="text-[10px] text-secondary font-bold uppercase">改選條件</div>
                    <ul className="space-y-2">
                       {[
                         "專案優先目標為縮減初始碳排",
                         "業主偏重施工可行性與成本控制",
                         "原生植栽取得或維護條件不足"
                       ].map((cond, i) => (
                         <li key={i} className="flex gap-2 items-start text-[10px] text-secondary opacity-80">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                            {cond}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </Card>

           <Card title="建議下一步 Next Actions" icon={Zap}>
              <div className="grid grid-cols-1 gap-2">
                 {[
                   "前往 Reduction 查看減碳策略清單",
                   "前往 Vegetation 檢視原生喬木模型",
                   "前往 Maintenance 確認維護可行性",
                   "前往 Reporting 匯出方案比較報表",
                   "鎖定本方案作為設計深化基準",
                 ].map((action, i) => (
                   <button key={i} className="w-full text-left p-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/10 rounded-xl text-[10px] text-primary font-bold transition-all truncate">
                      {action}
                   </button>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  </div>
);

const Reporting = () => {
  const { computed, state } = useProject();
  const proj = state.projectInfo;
  return (
  <div className="space-y-6 animate-in fade-in duration-500 font-sans">
    <div className="space-y-2">
      <SectionHeading title="報表輸出與報告預覽" subtitle="Generate Professional Carbon Reports" />
      <p className="text-[10px] text-secondary/70 leading-relaxed italic border-l-2 border-primary/30 pl-3">
        「本報告整合 Boundary、Site Data、BOQ、Materials、Vegetation、Soil、Maintenance、Engine、Scenario 與 Reduction 模組結果，形成設計階段景觀碳管理摘要。」
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Control Panel */}
      <div className="lg:col-span-1 space-y-4">
        <Card title="報告配置控制">
          <div className="space-y-6">
            <button className="w-full py-4 bg-primary text-bg font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              <FileText className="w-5 h-5" /> 生成景觀碳管理報告
            </button>
            
            <div className="space-y-3">
              <label className="text-[9px] text-secondary font-bold uppercase tracking-widest">報告版本資訊</label>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1.5 font-mono text-[9px]">
                <div className="flex justify-between"><span className="text-secondary">Version</span><span className="text-ink">v1.0 Preview</span></div>
                <div className="flex justify-between"><span className="text-secondary">Engine</span><span className="text-ink">NCMS v0.1</span></div>
                <div className="flex justify-between"><span className="text-secondary">Data</span><span className="text-primary">Mock v0.1</span></div>
                <div className="flex justify-between"><span className="text-secondary">Status</span><span className="text-accent font-bold">Demo Only</span></div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] text-secondary font-bold uppercase tracking-widest">報告類型</label>
              <div className="grid grid-cols-1 gap-2">
                {['摘要版 (業主簡報)', '標準版 (設計檢討)', '技術版 (詳細模型)', '作品集版 (Portfolio)'].map((t, i) => (
                  <button key={i} className={cn("text-left p-3 rounded-xl border text-[10px] font-bold transition-all", i === 1 ? "bg-primary/10 border-primary/40 text-primary" : "bg-white/5 border-white/10 text-secondary hover:border-white/20")}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] text-secondary font-bold uppercase tracking-widest">報告章節勾選</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {[
                  "專案基本資料", "評估邊界", "方法論摘要", "工程數量摘要", "材料碳排分析", 
                  "植栽碳匯分析", "土壤碳與基地擾動", "維護碳排分析", "情境比較", 
                  "減碳策略", "資料來源與可信度", "不確定性與限制"
                ].map((chapter, i) => (
                  <label key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                    <div className="w-4 h-4 border border-white/20 rounded flex items-center justify-center group-hover:border-primary/50">
                      <div className="w-2 h-2 bg-primary rounded-sm" />
                    </div>
                    <span className="text-[10px] text-secondary group-hover:text-ink">{chapter}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="text-[9px] text-secondary font-bold uppercase tracking-widest">輸出格式</label>
              <div className="grid grid-cols-2 gap-2">
                {['PDF', 'XLSX', 'HTML', 'Markdown'].map(f => (
                  <button key={f} className="p-2 border border-white/10 rounded-lg text-xs font-bold text-secondary hover:bg-white/5 hover:text-ink">{f}</button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card title="報告產出檢查" icon={ShieldCheck}>
           <div className="space-y-2">
              {[
                { label: 'Boundary 邊界設定', status: '完成' },
                { label: 'Site Data 基本輸入', status: '完成' },
                { label: 'BOQ 數量資料', status: '部分完成' },
                { label: 'Materials 材料係數', status: '部分 Mock' },
                { label: 'Vegetation 模型', status: 'Prototype' },
                { label: 'Soil 成長模型', status: 'Prototype' },
                { label: 'Maintenance 情境', status: '完成' },
                { label: 'Sources 資料來源', status: '待補正' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-[9px] p-2 bg-white/5 rounded-lg">
                   <span className="text-secondary">{item.label}</span>
                   <span className={cn("font-bold px-1.5 py-0.5 rounded", item.status === '完成' ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent")}>{item.status}</span>
                </div>
              ))}
              <div className="pt-2 text-[8px] text-accent font-bold text-center italic">
                 ! 可輸出報告：Demo Only
              </div>
           </div>
        </Card>
      </div>

      {/* Report Preview */}
      <div className="lg:col-span-3 space-y-6">
        <Card title="報告預覽 (Report Preview)">
          <div className="bg-[#FAF9F6] text-[#2D2D2D] p-10 rounded-2xl font-serif space-y-12 h-[800px] overflow-y-auto shadow-2xl relative custom-scrollbar">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Leaf className="w-32 h-32 text-primary" />
            </div>

            <div className="text-center border-b-2 border-primary/20 pb-12 space-y-4">
              <div className="text-[10px] tracking-widest uppercase font-bold text-primary opacity-60">Professional Landscape Carbon Management Report</div>
              <h1 className="text-4xl font-black text-[#1A1A1A]">景觀專案生命週期碳管理報告</h1>
              <div className="text-sm font-bold tracking-widest uppercase text-secondary">TAIPEI DIGITAL FOREST LANDSCAPE LCA REPORT v1.0</div>
              <div className="flex justify-center gap-6 text-[10px] font-bold text-secondary uppercase pt-4">
                  <span>Engine: NCMS v0.1</span>
                  <span>Date: 2024.05.02</span>
                  <span>Author: NCMS Engine</span>
              </div>
            </div>
            
            <section className="space-y-6">
              <h3 className="text-lg font-black text-primary border-b-2 border-primary/10 pb-2">0. 報告章節目錄 Contents</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm font-medium text-secondary/80">
                 {[
                   "1. 摘要預覽 Abstract", "2. 專案基本資料 Project Info", "3. 評估邊界 Boundary",
                   "4. 方法論摘要 Methodology", "5. 工程數量摘要 BOQ Summary", "6. 材料碳排分析 Materials Carbon",
                   "7. 植栽碳匯分析 Vegetation", "8. 土壤碳與基地擾動 Soil Carbon", "9. 維護碳排分析 Maintenance",
                   "10. 情境比較 Scenario", "11. 減碳策略建議 Reduction", "12. 資料來源與可信度 Sources",
                   "13. 不確定性與限制 Uncertainty", "14. 附錄 Appendix"
                 ].map((t, i) => (
                   <div key={i} className="flex justify-between border-b border-black/5 pb-1">
                      <span>{t}</span>
                      <span className="font-mono">P.{i+1}</span>
                   </div>
                 ))}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-lg font-black text-primary border-b-2 border-primary/10 pb-2">1. 摘要預覽 Abstract</h3>
              <p className="text-sm leading-relaxed text-[#4A4A4A]">
                本評估報告摘要了「{proj.projectName}」在 {proj.assessmentYears} 年生命週期內的碳排放與碳匯表現。根據現行的設計方案模擬結果，專案初始排放量分佈主要集中在材料生產與運輸（A1-A4 階段），其中混凝土鋪面為主要貢獻者。透過策略性地提高喬木覆蓋與低維護地被替代，專案預計{computed.paybackYear ? `可於第 ${computed.paybackYear} 年` : '（抵平年份待計算）'}達到碳中和。
              </p>
            </section>

            <section className="space-y-8">
              <h3 className="text-lg font-black text-primary border-b-2 border-primary/10 pb-2">核心量化結果 Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-[#2D2D2D]">
                {[
                  { label: '生命週期總排放', val: computed.totalInitialCarbon.toLocaleString(), unit: 'tCO2e' },
                  { label: `${proj.assessmentYears} 年淨碳排`, val: computed.netCarbon30Y.toLocaleString(), unit: 'tCO2e', highlight: computed.netCarbon30Y < 0 ? 'text-primary' : undefined },
                  { label: '抵平點', val: computed.paybackYear ? `Year ${computed.paybackYear}` : '—', unit: 'Est.', highlight: 'text-primary' },
                  { label: '年度平均碳匯', val: computed.annualSequestration.toFixed(1), unit: 'tCO2e/yr' },
                  { label: `${proj.assessmentYears} 年植栽碳匯`, val: computed.totalSequestration30Y.toLocaleString(), unit: 'tCO2e' },
                  { label: '土壤固碳潛力', val: String(state.soilInput.soilCarbonPotential), unit: 'tCO2e' },
                  { label: '維護碳排', val: String(state.maintenanceInput.annualMaintenanceCarbon), unit: 'tCO2e/yr' },
                  { label: '喬木總數', val: String(computed.totalTrees), unit: '株' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                     <div className="text-[10px] text-secondary font-bold uppercase tracking-widest">{item.label}</div>
                     <div className={cn("text-2xl font-black font-mono", item.highlight || "text-[#1A1A1A]")}>{item.val}<span className="text-[10px] ml-1 opacity-60 font-sans">{item.unit}</span></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 flex justify-between items-center">
                 <div className="text-xs font-bold text-secondary">高碳熱點：<span className="text-accent underline underline-offset-4">鋪面 / 混凝土</span></div>
                 <div className="text-xs font-bold text-secondary">推薦方案：<span className="text-primary">Nature Positive</span></div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <section className="space-y-4">
                  <h3 className="text-sm font-black text-primary uppercase tracking-widest">報告來源對應 Mapping</h3>
                  <div className="space-y-2">
                     {[
                       { section: '專案基本資料', module: 'Boundary / Site Data' },
                       { section: '生命週期碳排', module: 'Engine' },
                       { section: '材料分析', module: 'Materials' },
                       { section: '植栽/土壤', module: 'Vegetation / Soil' },
                       { section: '維護分析', module: 'Maintenance' },
                       { section: '減碳策略', module: 'Reduction' },
                     ].map((m, i) => (
                       <div key={i} className="flex justify-between text-[11px] border-b border-black/5 pb-1">
                          <span className="text-secondary font-medium">{m.section}</span>
                          <span className="text-primary font-bold font-mono">{m.module}</span>
                       </div>
                     ))}
                  </div>
               </section>

               <section className="space-y-4">
                  <h3 className="text-sm font-black text-primary uppercase tracking-widest">可信度報告 Confidence</h3>
                  <div className="flex items-center gap-4 mb-4">
                     <div className="text-4xl font-black text-primary">{computed.dataConfidence}</div>
                     <div className="space-y-0.5">
                        <div className="text-[10px] font-bold text-secondary uppercase">及格 / 待優化</div>
                        <div className="text-[10px] text-accent font-bold">Prototype Mock Data</div>
                     </div>
                  </div>
                  <div className="text-[10px] text-secondary space-y-1.5 leading-relaxed italic border-t border-black/5 pt-4">
                     <p>• 材料係數：部分示範值</p>
                     <p>• 植栽模型：簡化成長模型</p>
                     <p>• 重點限制：不可作為正式查證使用</p>
                  </div>
               </section>
            </div>

            <section className="space-y-4">
               <h3 className="text-sm font-black text-primary uppercase tracking-widest">報告後續建議 Next Steps</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    "補充正式材料 EPD 資料", "匯入 CAD/Excel 數量表", "補充樹木調查表與修正成活率", 
                    "補充土壤檢測與保存策略", "重新生成正式核算報告", "匯出 Markdown 作品展示"
                  ].map((step, i) => (
                    <div key={i} className="flex gap-2 items-start text-[10px] text-secondary bg-black/5 p-3 rounded-lg border border-black/5">
                       <CheckSquare className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                       {step}
                    </div>
                  ))}
               </div>
            </section>

            <div className="pt-12 border-t border-black/10 text-[10px] text-secondary leading-relaxed space-y-4">
              <p className="font-bold">免責聲明 Disclaimer：</p>
              <p className="italic opacity-80">
                本報告所列碳排、碳匯、抵平年份與減碳潛力，均基於 NCMS Prototype v0.1 示範資料與簡化模型產出。材料係數、植栽成長模型、土壤有機碳變化與維護頻率尚未經第三方查證，亦未接入正式 EPD、官方係數庫或現地監測資料。因此本報告僅供設計階段方案比較、內部溝通與概念展示使用，不可作為正式碳盤查、碳權申請、第三方驗證或法規申報依據。
              </p>
              <div className="flex justify-between font-mono pt-4 text-[8px] opacity-40">
                 <span>REPORT_UID: NCMS-20240502-001</span>
                 <span>GENERATED_BY_NCMS_ENGINE_V0.1</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
  );
};

const Sources = () => {
  const factors = [
    {
      name: "Taiwan Electricity Emission Factor",
      category: "Energy (能源)",
      value: "0.495",
      unit: "kgCO2e/kWh",
      region: "Taiwan (台灣)",
      year: "Demo Year (示範年份)",
      stage: "B6",
      type: "Official (官方)",
      source: "經濟部能源署 / 官方電力排放係數",
      grade: "A",
      status: "Report Ready (報告就緒)",
      engine: "Yes (可用)",
      freq: "Annual (年度)",
      notes: "用於計算營運階段之用電相關排放。"
    },
    {
      name: "C210 Concrete Carbon Factor",
      category: "Materials (材料)",
      value: "245",
      unit: "kgCO2e/m³",
      region: "Taiwan / Product Specific",
      year: "Demo Year",
      stage: "A1-A3",
      type: "EPD / Vendor",
      source: "供應商 EPD 或產品碳足跡數據",
      grade: "B/C",
      status: "Need Verification (待查證)",
      engine: "Conditional (受限)",
      freq: "Project-based (專案)",
      notes: "需要核實產品邊界、EPD 狀態與混凝土配比設計。"
    },
    {
      name: "Urban Tree Annual Sequestration Factor",
      category: "Vegetation (植栽)",
      value: "18.5",
      unit: "kgCO2e/tree/year",
      region: "Taiwan / Urban Context",
      year: "Demo Year",
      stage: "Biogenic Sequestration",
      type: "Academic / Research",
      source: "都市樹木固碳量參考文獻",
      grade: "B",
      status: "Design Estimate (設計評估)",
      engine: "Yes (可用)",
      freq: "Model-based (模型)",
      notes: "用於設計階段評估，非特定樹種之實測核實。"
    },
    {
      name: "Construction Equipment Fuel Factor",
      category: "Equipment (機具)",
      value: "Dynamic",
      unit: "L/hr or kgCO2e/hr",
      region: "Project Specific",
      year: "Demo Year",
      stage: "A5",
      type: "Assumption / Mock",
      source: "專案層級施工情境技術假設",
      grade: "C/D",
      status: "Scenario Only (僅限情境)",
      engine: "Conditional (受限)",
      freq: "Project-based (專案)",
      notes: "需要機具型號、燃料類型、工作時間與現場操作數據。"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <div className="space-y-2">
        <SectionHeading title="Sources｜數據治理中心 (Data Governance Center)" subtitle="Transparency & Data Integrity | 資料透明度與完整性" />
        <p className="text-[11px] text-secondary/80 leading-relaxed max-w-3xl">
          本頁面定義了 NCMS 中所有碳係數的來源品質、信心等級 (Confidence Grade)、使用狀態 (Usage Status) 與計算適用性。示範數據 (Prototype Data) 已與報告級數據 (Report-ready Data) 明確區隔。
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: '係數總數 (Total Factors)', val: '24', unit: 'demo factors', desc: '目前原型系統中的所有可用碳係數。', color: 'text-ink' },
          { label: '報告就緒 (Report Ready)', val: '6', unit: 'factors', desc: '適用於報告級揭露並具有正式來源引用。', color: 'text-primary' },
          { label: '待查證 (Need Verification)', val: '9', unit: 'factors', desc: '在正式使用前需要人工審核的係數。', color: 'text-accent' },
          { label: '僅供示範 (Demo Only)', val: '9', unit: 'factors', desc: '僅用於原型展示的模擬或假設性係數。', color: 'text-secondary' },
          { label: '平均信心度 (Avg Confidence)', val: 'B-', unit: '', desc: '目前數據集的整體可信度等級。', color: 'text-primary' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col gap-2">
            <span className="text-[9px] text-secondary font-bold uppercase tracking-widest">{kpi.label}</span>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-xl font-black", kpi.color)}>{kpi.val}</span>
              <span className="text-[9px] text-secondary/60">{kpi.unit}</span>
            </div>
            <p className="text-[8px] text-secondary/50 leading-tight">{kpi.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card title="係數註冊表 (Factor Registry)" icon={Database}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="border-b border-white/10 text-secondary uppercase tracking-widest">
                    <th className="py-4 px-3 font-bold">係數名稱 (Factor Name)</th>
                    <th className="py-4 px-3">類別 (Category)</th>
                    <th className="py-4 px-3">數值 (Value)</th>
                    <th className="py-4 px-3">單位 (Unit)</th>
                    <th className="py-4 px-3">分級 (Grade)</th>
                    <th className="py-4 px-3">狀態 (Status)</th>
                    <th className="py-4 px-3">核心 (Engine)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {factors.map((f, i) => (
                    <tr key={i} className="group hover:bg-white/5 transition-colors cursor-pointer">
                      <td className="py-4 px-3">
                        <div className="font-bold text-ink">{f.name}</div>
                        <div className="text-[9px] text-secondary/60 mt-1">{f.source}</div>
                      </td>
                      <td className="py-4 px-3 text-secondary">{f.category}</td>
                      <td className="py-4 px-3 font-mono text-ink font-bold">{f.value}</td>
                      <td className="py-4 px-3 text-secondary">{f.unit}</td>
                      <td className="py-4 px-3">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-bold border",
                          f.grade.startsWith('A') ? "bg-primary/20 text-primary border-primary/20" :
                          f.grade.startsWith('B') ? "bg-blue-400/20 text-blue-400 border-blue-400/20" :
                          f.grade.startsWith('C') ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/20" :
                          f.grade.startsWith('D') ? "bg-accent/20 text-accent border-accent/20" :
                          "bg-white/10 text-secondary border-white/10"
                        )}>GRADE {f.grade}</span>
                      </td>
                      <td className="py-4 px-3">
                         <span className={cn(
                           "px-2 py-0.5 rounded text-[8px] font-bold whitespace-nowrap",
                           f.status.startsWith('Report Ready') ? "bg-primary/10 text-primary" : "bg-white/10 text-secondary"
                         )}>{f.status}</span>
                      </td>
                      <td className="py-4 px-3">
                        <span className={cn(
                           "px-2 py-0.5 rounded text-[8px] font-bold",
                           f.engine.startsWith('Yes') ? "bg-primary/20 text-primary" : 
                           f.engine.startsWith('Conditional') ? "bg-yellow-400/20 text-yellow-400" : "bg-accent/20 text-accent"
                        )}>{f.engine}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="數據使用規則 (Data Usage Rules)" icon={ShieldCheck}>
               <div className="space-y-3">
                 {[
                   "缺少單位 (Unit) 的係數無法進入 Engine 計算。",
                   "缺少來源 (Source) 的係數預設標記為僅供示範 (Demo Only)。",
                   "年份 (Year) 或邊界 (Boundary) 不明者，標記為待查證 (Need Verification)。",
                   "模擬數據 (Mock Data) 不可用於第三方查證、碳權申請或法規披露。",
                   "報告就緒 (Report Ready) 係數必須披露來源、年份、區域與生命週期階段。",
                   "Engine 計算結果應揭露所使用的最低信心等級 (Lowest Grade)。"
                 ].map((rule, i) => (
                   <div key={i} className="flex gap-3 text-[10px] text-secondary leading-relaxed p-2 bg-white/5 rounded-lg border border-white/5">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{rule}</span>
                   </div>
                 ))}
               </div>
            </Card>

            <Card title="數據缺口分析 (Data Gaps)" icon={AlertCircle}>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-[9px]">
                   <thead>
                     <tr className="border-b border-white/10 text-secondary uppercase tracking-widest font-bold">
                       <th className="py-2 px-2">數據缺口 (Data Gap)</th>
                       <th className="py-2 px-2">影響 (Impact)</th>
                       <th className="py-2 px-2">優先級 (Priority)</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5 text-secondary">
                     {[
                       { gap: 'Local landscape material EPD data', impact: '材料碳排準確度', priority: 'High', pColor: 'text-accent' },
                       { gap: 'Taiwan urban tree sequestration factors', impact: '植栽固碳模型', priority: 'High', pColor: 'text-accent' },
                       { gap: 'Local soil organic carbon data', impact: '土壤碳匯潛力', priority: 'Med', pColor: 'text-primary' },
                       { gap: 'Maintenance machine emission data', impact: '運維排放準確度', priority: 'Low', pColor: 'text-secondary' },
                       { gap: 'Construction distance data', impact: 'A4 運輸排放', priority: 'Low', pColor: 'text-secondary' },
                     ].map((gap, i) => (
                       <tr key={i}>
                         <td className="py-3 px-2 text-ink font-bold">{gap.gap}</td>
                         <td className="py-3 px-2">{gap.impact}</td>
                         <td className={cn("py-3 px-2 font-bold", gap.pColor)}>{gap.priority}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </Card>
          </div>

          <Card title="數據連接器路線圖 (Future Data Connector Roadmap)" icon={Zap}>
             <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                {[
                  { v: 'v0.1', t: '示範數據 (Mock)' },
                  { v: 'v0.2', t: '手動輸入 (Manual)' },
                  { v: 'v0.3', t: '文件匯入 (CSV)' },
                  { v: 'v0.4', t: '雲端同步 (Sheet)' },
                  { v: 'v0.5', t: '在地計算 (Local)' },
                  { v: 'v1.0', t: '資料庫 (API)' },
                ].map((step, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center gap-1">
                     <span className="text-[10px] font-black text-primary">{step.v}</span>
                     <span className="text-[9px] text-secondary text-center leading-tight">{step.t}</span>
                  </div>
                ))}
             </div>
             <p className="text-[10px] text-secondary/60 italic text-center mt-4">
                目前版本為原型數據治理介面。正式的 API 或資料庫連接將在方法論與係數架構穩定後進行開發。
             </p>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="信心分級規則 (Grade Rules)" icon={ShieldCheck}>
             <div className="space-y-4">
                {[
                  { g: 'A', label: 'Official / Verified', color: 'text-primary', desc: '官方發佈、經核實之 EPD 或第三方查證數據。適用於報告揭露。' },
                  { g: 'B', label: 'Research / Average', color: 'text-blue-400', desc: '學術研究、政府報告或公認之行業平均係數。適用於設計評估。' },
                  { g: 'C', label: 'Vendor / Project', color: 'text-yellow-400', desc: '供應商資料、未經核實之 EPD。需要透明文件與人工審核。' },
                  { g: 'D', label: 'Assumption / Mock', color: 'text-accent', desc: '使用者假設或 AI 估算值。僅適用於情境測試或展示說明。' },
                  { g: 'E', label: 'Incomplete / Invalid', color: 'text-secondary', desc: '遺漏單位、來源或年份。不建議進入 Engine 計算。' },
                ].map((grade, i) => (
                  <div key={i} className="space-y-1">
                     <div className="flex justify-between items-center">
                        <span className={cn("text-xs font-black", grade.color)}>Grade {grade.g}</span>
                        <span className="text-[10px] text-ink font-bold">{grade.label}</span>
                     </div>
                     <p className="text-[9px] text-secondary/60 leading-tight">{grade.desc}</p>
                  </div>
                ))}
             </div>
          </Card>

          <Card title="使用狀態規則 (Usage Status)" icon={Tag}>
             <div className="grid grid-cols-1 gap-2">
                {[
                  { s: 'Report Ready (報告就緒)', desc: '可直接用於報告輸出並引用來源。', color: 'bg-primary/20 text-primary' },
                  { s: 'Design Estimate (設計評估)', desc: '適用於早期階段設計模擬。', color: 'bg-blue-400/20 text-blue-400' },
                  { s: 'Scenario Only (僅限情境)', desc: '僅供方案間的相對比較。', color: 'bg-yellow-400/20 text-yellow-400' },
                  { s: 'Demo Only (僅供展示)', desc: '原型展示用的模擬數據。', color: 'bg-white/10 text-secondary' },
                  { s: 'Need Verification (待查證)', desc: '需要人工複核方可使用。', color: 'bg-accent/20 text-accent' },
                  { s: 'Rejected (已遭拒絕)', desc: '不允許進入計算引擎。', color: 'bg-accent/10 text-accent opacity-50' },
                ].map((status, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1 hover:border-white/20 transition-all">
                     <div className={cn("px-1.5 py-0.5 rounded text-[8px] font-bold w-fit", status.color)}>{status.s}</div>
                     <p className="text-[9px] text-secondary opacity-60 italic">{status.desc}</p>
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const SystemStatus = () => (
  <div className="space-y-6 animate-in fade-in duration-500 font-sans">
    <SectionHeading title="系統狀態 System Status" subtitle="原型成熟度、資料狀態與開發路線圖" />
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card title="Prototype Status｜原型狀態" icon={ShieldCheck}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '目前版本', val: 'v0.2', sub: 'UI Prototype' },
              { label: '資料模式', val: 'Mock Data', sub: 'Enabled', color: 'text-accent' },
              { label: '連線狀態', val: 'No Backend', sub: 'Local Prototype', color: 'text-secondary' },
              { label: '計算模式', val: 'Static Logic', sub: 'Preview Only', color: 'text-primary' },
              { label: '報表模式', val: 'Preview Only', sub: 'Draft Mode' },
              { label: '整體可信度', val: 'B-', sub: 'Demo Only', color: 'text-primary' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                <span className="text-[9px] text-secondary font-bold uppercase tracking-widest">{stat.label}</span>
                <div className="flex flex-col">
                  <span className={cn("text-lg font-black leading-tight", stat.color || "text-ink")}>{stat.val}</span>
                  <span className="text-[9px] text-secondary font-medium">{stat.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Methodology Readiness｜方法論成熟度" icon={CheckSquare}>
          <div className="space-y-3">
            {[
              { label: "專案邊界 Boundary Definition", status: "已建立", done: true },
              { label: "係數資料表 Factor Registry", status: "建構中", done: false },
              { label: "材料碳排邏輯 Material Carbon Logic", status: "概念已定義", done: true },
              { label: "植栽碳匯邏輯 Vegetation Sequestration Logic", status: "概念已定義", done: true },
              { label: "土壤碳邏輯 Soil Carbon Logic", status: "概念已定義", done: true },
              { label: "維護碳排邏輯 Maintenance Carbon Logic", status: "概念已定義", done: true },
              { label: "情境評分邏輯 Scenario Scoring Logic", status: "草案中", done: false },
              { label: "報告輸出架構 Reporting Structure", status: "草案中", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", item.done ? "border-primary bg-primary/20" : "border-white/10")}>
                    {item.done && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </div>
                  <span className="text-xs text-secondary">{item.label}</span>
                </div>
                <span className={cn("text-[10px] font-bold", item.done ? "text-primary" : "text-secondary/40")}>{item.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="Data Readiness｜資料成熟度" icon={Database}>
          <div className="space-y-4">
            {[
              { label: 'Mock Data', status: '已啟用', progress: 100, color: 'bg-primary' },
              { label: 'Manual Input', status: '規劃中', progress: 30, color: 'bg-secondary' },
              { label: 'JSON / CSV 匯入', status: '規劃中', progress: 10, color: 'bg-secondary' },
              { label: 'Google Sheet 匯入', status: '未來功能', progress: 5, color: 'bg-white/10' },
              { label: 'Database / API', status: '未來功能', progress: 5, color: 'bg-white/10' },
              { label: 'Verified EPD / Official Factors', status: '未來功能', progress: 0, color: 'bg-white/5' },
            ].map((d, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-ink font-bold">{d.label}</span>
                  <span className="text-secondary">{d.status}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={cn("h-full transition-all duration-1000", d.color)} style={{ width: `${d.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Development Roadmap｜開發路線圖" icon={Zap}>
          <div className="space-y-4">
            {[
              { v: 'v0.1', t: 'AI Studio UI Prototype', active: false },
              { v: 'v0.2', t: 'UI 架構整理與 Code 重構', active: true },
              { v: 'v0.3', t: 'Mock Data Schema', active: false },
              { v: 'v0.4', t: 'CSV / JSON / Google Sheet 匯入', active: false },
              { v: 'v0.5', t: '簡化計算邏輯', active: false },
              { v: 'v1.0', t: 'Database + API + Report Export', active: false },
              { v: 'v2.0', t: 'Localhost Learning System + Advanced Scoring Model', active: false },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start relative pb-4 last:pb-0">
                {i < 6 && <div className="absolute left-4 top-8 bottom-0 w-px bg-white/5" />}
                <div className={cn("w-8 h-8 rounded-xl border-2 flex items-center justify-center shrink-0 z-10", step.active ? "border-primary bg-primary/20 text-primary" : "border-white/5 bg-white/5 text-secondary/40")}>
                  <span className="text-[10px] font-black">{step.v}</span>
                </div>
                <div className="flex flex-col pt-1">
                  <span className={cn("text-xs font-bold", step.active ? "text-ink" : "text-secondary/60")}>{step.t}</span>
                  {step.v === 'v1.0' && <span className="text-[9px] text-primary/60 italic">ISO 對齊式碳管理報告架構</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Prototype Disclaimer｜原型限制聲明" className="border-accent/20 bg-accent/5">
          <div className="flex gap-4">
            <AlertCircle className="w-10 h-10 text-accent opacity-40 shrink-0" />
            <div className="space-y-2">
              <p className="text-[11px] text-accent font-bold leading-relaxed">
                本系統目前為概念學習、原型驗證與設計階段決策支援工具。
              </p>
              <p className="text-[10px] text-secondary leading-relaxed">
                目前資料與計算結果不得用於第三方查證、碳權申請、法規申報或正式 ESG 揭露。若需正式使用，必須導入經驗證之係數來源、正式盤查邊界、資料版本控管與第三方查證流程。
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
      <h4 className="text-xs font-black text-secondary tracking-widest uppercase">功能區域分工</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-primary">1. 右上角全域操作區</div>
          <p className="text-[10px] text-secondary leading-relaxed">用於搜尋、通知與使用者狀態，不負責系統管理。</p>
        </div>
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-primary">2. 右下角快速設定</div>
          <p className="text-[10px] text-secondary leading-relaxed">用於語言、單位、顯示模式與圖表細節，不改變資料與計算邏輯。</p>
        </div>
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-primary">3. 系統狀態頁</div>
          <p className="text-[10px] text-secondary leading-relaxed">用於顯示原型成熟度、資料成熟度、方法論成熟度與未來 Roadmap，不提供後台管理功能。</p>
        </div>
      </div>
    </div>
  </div>
);

// Placeholder for other pages to avoid huge file in one turn
const Materials = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <SectionHeading title="材料碳排與生命週期分析" subtitle="Embedded Carbon in Hardscape & Structures" />
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <Card title="材料碳排排行與各階段拆解" className="lg:col-span-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px]">
            <thead>
              <tr className="border-b border-white/10 text-secondary uppercase tracking-widest whitespace-nowrap">
                <th className="py-4 px-3">排名</th>
                <th className="py-4 px-3">材料名稱</th>
                <th className="py-4 px-3">分類</th>
                <th className="py-4 px-3">對應 BOQ</th>
                <th className="py-4 px-3">A1-A3</th>
                <th className="py-4 px-3">A4</th>
                <th className="py-4 px-3">A5</th>
                <th className="py-4 px-3">壽命</th>
                <th className="py-4 px-3 text-accent text-right">總排放 (tCO2e)</th>
                <th className="py-4 px-3">等級</th>
                <th className="py-4 px-3">替代方案</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'C210 混凝土', cat: '混凝土', boq: '基礎/路面', a13: 400, a4: 30, a5: 20, life: 50, carbon: 450, grade: 'A', alt: '低碳混凝土' },
                { name: '進口花崗石', cat: '石材', boq: '鋪面', a13: 320, a4: 90, a5: 10, life: 30, carbon: 420, grade: 'B', alt: '在地石材' },
                { name: '高壓水泥磚', cat: '鋪面磚', boq: '步道', a13: 150, a4: 15, a5: 15, life: 20, carbon: 180, grade: 'A', alt: '再生透水磚' },
                { name: '鋼筋', cat: '金屬', boq: '構造/擋土', a13: 105, a4: 5, a5: 10, life: 50, carbon: 120, grade: 'B', alt: '回收鋼材' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-3 text-secondary font-mono">{i + 1}</td>
                  <td className="py-4 px-3 font-bold text-ink">{row.name}</td>
                  <td className="py-4 px-3 text-secondary">{row.cat}</td>
                  <td className="py-4 px-3 text-secondary">{row.boq}</td>
                  <td className="py-4 px-3 text-secondary">{row.a13}</td>
                  <td className="py-4 px-3 text-secondary">{row.a4}</td>
                  <td className="py-4 px-3 text-secondary">{row.a5}</td>
                  <td className="py-4 px-3 text-secondary">{row.life}yr</td>
                  <td className="py-4 px-3 text-right font-bold text-accent">{row.carbon}</td>
                  <td className="py-4 px-3">
                    <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[9px] font-bold">{row.grade}</span>
                  </td>
                  <td className="py-4 px-3 text-primary/80 italic">{row.alt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="space-y-6">
        <Card title="材料熱點摘要 Hotspots" icon={AlertCircle}>
          <div className="space-y-3">
            <div className="flex justify-between text-[11px]"><span className="text-secondary">最高排放材料</span><span className="text-ink font-bold">C210 混凝土</span></div>
            <div className="flex justify-between text-[11px]"><span className="text-secondary">次高排放材料</span><span className="text-ink font-bold">進口花崗石</span></div>
            <div className="flex justify-between text-[11px]"><span className="text-secondary">前兩項合計占比</span><span className="text-accent font-bold">63%</span></div>
            <div className="flex justify-between text-[11px] border-t border-white/5 pt-2"><span className="text-secondary">主要熱點階段</span><span className="text-primary font-bold">A1-A3 生產</span></div>
            <div className="flex justify-between text-[11px]"><span className="text-secondary">次要熱點階段</span><span className="text-primary font-bold">A4 運輸</span></div>
          </div>
        </Card>

        <Card title="高量排優化對策" icon={Zap}>
          <div className="space-y-4">
            {[
              { label: '混凝土', alt: '低碳配方', saving: '-81 t' },
              { label: '花崗石', alt: '在地石材', saving: '-50 t' },
              { label: '水泥磚', alt: '再生透水', saving: '-27 t' },
              { label: '鋼筋', alt: '回收鋼材', saving: '-18 t' },
            ].map(opt => (
              <div key={opt.label} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-secondary font-bold uppercase">{opt.label}</div>
                  <div className="text-xs text-ink">{opt.alt}</div>
                </div>
                <div className="text-primary font-bold text-xs">{opt.saving}</div>
              </div>
            ))}
            <button className="w-full py-3 bg-primary text-bg rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              套用所有減碳策略
            </button>
          </div>
        </Card>

        <Card title="材料替代效益預覽" icon={TrendingDown}>
           <div className="space-y-3">
              <div className="flex justify-between text-[11px]"><span className="text-secondary">基準方案總排</span><span className="text-ink">1,285 t</span></div>
              <div className="flex justify-between text-[11px]"><span className="text-secondary">減碳策略合計</span><span className="text-primary font-bold">-176 t</span></div>
              <div className="flex justify-between text-[11px] border-t border-white/5 pt-2"><span className="text-secondary">優化後總量</span><span className="text-primary font-black">1,109 t</span></div>
           </div>
        </Card>

        <Card title="係數信心等級 Factor" icon={Info}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-[11px]">
               <div><span className="text-secondary block">已建立係數</span><span className="text-ink font-bold">4 / 8</span></div>
               <div><span className="text-secondary block">平均可信度</span><span className="text-accent font-bold">B-</span></div>
               <div><span className="text-secondary block">Mock比例</span><span className="text-ink font-bold">50%</span></div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] text-secondary">
               <span className="block font-bold mb-1 uppercase tracking-widest opacity-50">待補資料</span>
               木材、再生材料、施工損耗率
            </div>
          </div>
        </Card>

        <Card title="生命週期分析提醒" icon={FileText}>
          <div className="space-y-3 text-[10px] text-secondary/80 leading-relaxed italic">
            <p>• 材料碳排需拆分 A1-A3、A4、A5</p>
            <p>• 壽命不足評估年限者需納入 B4 更換</p>
            <p>• 木材生物碳儲存應與材料排放分開顯示</p>
            <p>• 資料來源：Mock / 產業平均 / 廠商資料</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const Vegetation = () => (
  <div className="space-y-6 animate-in zoom-in-95 duration-500">
    <SectionHeading title="植栽碳匯與生長模擬" subtitle="Biomass Sequestration & Growth Modeling" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">新植喬木</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">142</h4>
          <span className="text-[10px] text-secondary/60">株</span>
        </div>
        <p className="text-[9px] text-secondary/60 mt-1">含大/中喬木，依中位成活率模擬</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">既有保留</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">86</h4>
          <span className="text-[10px] text-secondary/60">株</span>
        </div>
        <p className="text-[9px] text-secondary/60 mt-1">成熟樹碳庫與遮蔭資產</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">30 年累積碳匯</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">1,720</h4>
          <span className="text-[10px] text-secondary/60">tCO2e</span>
        </div>
        <p className="text-[9px] text-secondary/60 mt-1">含新增與既有增量，未含土壤碳</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">年平均碳匯</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">42.8</h4>
          <span className="text-[10px] text-secondary/60">tCO2e/yr</span>
        </div>
        <p className="text-[9px] text-secondary/60 mt-1">非固定年值，為 30 年平均</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <Card title="30 年植栽固碳曲線 (分情境預測)" icon={Activity}>
          <div className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer debounce={50} width="100%" height="100%">
                <AreaChart data={mock.netCarbonCurve}>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A8B8A0' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A8B8A0' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1D2319', border: 'none' }} labelStyle={{ fontSize: '10px' }} itemStyle={{ fontSize: '10px' }} />
                  <Legend verticalAlign="top" align="right" iconSize={8} wrapperStyle={{ fontSize: '10px', paddingBottom: '10px' }} />
                  <Area type="monotone" name="累積植栽碳匯" dataKey="累積碳匯" stroke="#7E9B71" fill="#7E9B71" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" name="累積生命週期排放參考線" dataKey="累積排放" stroke="#BC6C25" fill="transparent" strokeDasharray="5 5" />
                  <ReferenceLine x={24} stroke="#DDA15E" strokeDasharray="3 3" label={{ position: 'top', value: '碳匯抵平參考點', fill: '#DDA15E', fontSize: 10 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-secondary/60 italic text-center px-6">
              「植栽碳匯為逐年累積結果，前期成長較慢，5–15 年後碳匯增幅提高，實際結果將受樹種、生長環境、成活率、修剪與維護方式影響。」
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="既有樹保留效益 Existing Tree Value" icon={ShieldCheck}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                  <div><span className="text-secondary block">既有保留喬木</span><span className="text-ink font-bold">86 株</span></div>
                  <div><span className="text-secondary block">建議優先保留</span><span className="text-primary font-bold">72 株</span></div>
                  <div><span className="text-secondary block">成熟樹冠覆蓋</span><span className="text-ink font-bold">18%</span></div>
                  <div><span className="text-secondary block">移植 / 移除風險</span><span className="text-accent font-bold">中</span></div>
              </div>
              <p className="text-[10px] text-secondary leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                既有成熟喬木應作為既有碳庫、遮蔭效益與生態棲地資產管理。保留成熟樹通常比新植樹更能降低短中期碳匯不確定性。
              </p>
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-[10px] text-primary italic">
                * 方法論提醒：既有樹保留可視為既有碳庫保存與未來增量碳匯，但不應將既有生物量全部重複計入新碳匯。
              </div>
            </div>
          </Card>

          <Card title="主要植栽類型碳匯貢獻" icon={Box}>
            <div className="h-64">
              <ResponsiveContainer debounce={50} width="100%" height="100%">
                <BarChart layout="vertical" data={mock.boqData.vegetation}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A8B8A0' }} />
                  <Bar dataKey="sink30" fill="#7E9B71" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card title="碳匯模型摘要 Model" icon={Info}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3 text-[11px]">
                <span className="text-secondary">評估年限</span><span className="text-ink font-bold text-right">30 年</span>
                <span className="text-secondary">新植成活率</span><span className="text-primary font-bold text-right">88%</span>
                <span className="text-secondary">既有保留率</span><span className="text-primary font-bold text-right">84%</span>
                <span className="text-secondary">平均補植率</span><span className="text-secondary font-bold text-right">3% / 年</span>
                <span className="text-secondary">模型情境</span><span className="text-ink font-bold text-right">中位情境</span>
            </div>
            <p className="text-[10px] text-secondary/60 leading-relaxed italic border-t border-white/5 pt-3">
              「本頁碳匯為 30 年植栽生長模擬結果，採中位成活率與簡化生長曲線，尚未依單株樹木調查或現地生長監測校正。」
            </p>
          </div>
        </Card>

        <Card title="植栽結構 Planting Structure" icon={Layers}>
           <div className="space-y-2">
              {[
                { label: '大喬木', val: '36%', desc: '長期主力碳匯' },
                { label: '中喬木', val: '28%', desc: '中期穩定碳匯' },
                { label: '小喬木', val: '16%', desc: '空間補足' },
                { label: '灌木', val: '12%', desc: '多層次生態' },
                { label: '地被', val: '6%', desc: '土壤保護' },
                { label: '草坪', val: '2%', desc: '低碳匯高維護' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 bg-white/5 rounded-lg text-[10px]">
                  <span className="text-secondary">{item.label} <span className="text-[8px] opacity-40 ml-1">{item.desc}</span></span>
                  <span className="text-primary font-bold">{item.val}</span>
                </div>
              ))}
           </div>
        </Card>

        <Card title="碳匯不確定性 Uncertainty" icon={AlertCircle}>
          <div className="space-y-3">
            {[
              "成活率下降會延後抵平年份",
              "修剪過度會降低年度碳匯",
              "颱風損失會降低碳庫並增加補植",
              "土壤壓實會使生長低於預期",
              "灌溉不足及病蟲害風險"
            ].map((u, i) => (
              <div key={i} className="flex gap-2 items-start text-[10px] text-accent/80">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                <span>{u}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="建議下一步 Next Actions" icon={Zap}>
          <div className="space-y-2">
            {[
              "檢查高碳匯樹種是否符合基地風險",
              "將草坪比例轉至 Maintenance 頁檢討",
              "前往 Soil 頁確認表土保留策略",
              "前往 Scenario 頁比較方案",
              "補充單株樹木調查提高可信度"
            ].map((action, i) => (
              <button key={i} className="w-full p-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-[10px] text-primary font-bold text-left transition-all">
                {action}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const Soil = () => (
  <div className="space-y-6 animate-in fade-in duration-500 font-sans">
    <SectionHeading title="土壤碳管與基地擾動分析" subtitle="Soil Organic Carbon (SOC) & Site Disturbance" />
    
    {/* KPI Metrics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">表土保留面積</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">8,200</h4>
          <span className="text-[10px] text-secondary/60">m²</span>
        </div>
        <p className="text-[9px] text-secondary/60 mt-1">保護既有 SOC 基礎</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">土壤改良面積</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">5,600</h4>
          <span className="text-[10px] text-secondary/60">m²</span>
        </div>
        <p className="text-[9px] text-secondary/60 mt-1">改善根域與有機碳累積條件</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">有機覆蓋面積</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">3,400</h4>
          <span className="text-[10px] text-secondary/60">m²</span>
        </div>
        <p className="text-[9px] text-secondary/60 mt-1">保水、降溫、減少裸露流失</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">土壤固碳潛力</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">286</h4>
          <span className="text-[10px] text-secondary/60">tCO2e</span>
        </div>
        <p className="text-[9px] text-secondary/60 mt-1">30 年 SOC 潛力，未含植栽地上部碳匯</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Columns: Main Analysis */}
      <div className="lg:col-span-2 space-y-6">
        <Card title="土壤策略分區與判讀 Zone Summary" icon={Layers}>
          <div className="space-y-4">
            {[
              { zone: '都市森林區', strategy: '最大化有機質回填', risk: '低', sink: '120 t', desc: '高土壤碳潛力、低擾動風險、優先保留表土與有機質' },
              { zone: '多功能草坪區', strategy: '減少壓實、定期更新', risk: '中', sink: '45 t', desc: '中等固碳、維護更新頻率較高，需控制翻土與高維護強度' },
              { zone: '雨水花園區', strategy: '高滲透機質混合', risk: '低', sink: '65 t', desc: '具滲透與有機質累積優勢，但需控制土壤沖刷與積水風險' },
              { zone: '硬鋪面周圍', strategy: '根系誘導與通氣', risk: '高', sink: '12 t', desc: '固碳潛力低、擾動風險高，應改善根域、透氣與入滲條件' },
            ].map((row, i) => (
              <div key={i} className="flex flex-col gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-ink">{row.zone}</span>
                    <span className="text-[10px] text-primary">{row.strategy}</span>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div>
                      <span className="text-[10px] text-secondary font-bold uppercase block">擾動風險</span>
                      <span className={cn("text-xs font-bold", row.risk === '低' ? "text-primary" : "text-accent")}>{row.risk}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-secondary font-bold uppercase block">30年固碳</span>
                      <span className="text-sm font-mono font-bold text-primary">{row.sink}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-secondary/70 leading-relaxed border-t border-white/5 pt-2">{row.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="土壤擾動風險 Disturbance Risks" icon={AlertCircle}>
             <div className="space-y-4">
                <div className="space-y-2">
                   {[
                     { label: '開挖與翻土', val: '高' },
                     { label: '土壤壓實', val: '高' },
                     { label: '硬鋪面封閉', val: '高' },
                     { label: '客土 / 外運', val: '中' },
                     { label: '排水不良', val: '中' },
                     { label: '有機質不足', val: '中' },
                   ].map(item => (
                     <div key={item.label} className="flex justify-between items-center text-[11px] bg-white/5 p-2 rounded-lg">
                        <span className="text-secondary">{item.label}</span>
                        <span className={cn("font-bold px-2 py-0.5 rounded", item.val === '高' ? "text-accent bg-accent/10" : "text-ink bg-white/5")}>{item.val}</span>
                     </div>
                   ))}
                </div>
                <p className="text-[10px] text-secondary italic leading-relaxed">
                  「土壤碳的增加速度通常低於植栽碳匯，若基地施工擾動過大，原有土壤碳庫可能先流失，再進入長期恢復期。」
                </p>
             </div>
          </Card>

          <Card title="策略貢獻 Strategy Contribution" icon={Zap}>
             <div className="space-y-3">
                {[
                  { label: '表土保留', desc: '主要保住既有 SOC，不讓碳流失' },
                  { label: '土壤改良', desc: '提升有機質、滲透性與根系發展' },
                  { label: '有機覆蓋', desc: '穩定增加有機質、保水、減少裸露' },
                  { label: '分區管理', desc: '依都市森林、草坪採不同策略' },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 bg-white/5 rounded-lg border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <div className="text-[11px] font-bold text-ink">{s.label}</div>
                      <div className="text-[10px] text-secondary">{s.desc}</div>
                    </div>
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </div>

      {/* Right Column: Model and Reference */}
      <div className="space-y-6">
        <Card title="土壤碳模型摘要 SOC Model Summary" icon={Info}>
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-y-3 text-[11px]">
                <span className="text-secondary">評估年限</span><span className="text-ink font-bold text-right">30 年</span>
                <span className="text-secondary">計算範圍</span><span className="text-ink font-bold text-right">表土層 0–30 cm</span>
                <span className="text-secondary">模型類型</span><span className="text-ink font-bold text-right">簡化 SOC 潛力估算</span>
                <span className="text-secondary">資料狀態</span><span className="text-accent font-bold text-right">Prototype Mock</span>
             </div>
             <p className="text-[10px] text-secondary/60 leading-relaxed italic border-t border-white/5 pt-3">
               「本頁土壤碳為 30 年土壤有機碳潛力模擬結果，主要反映管理效益，尚未依現地檢測校正。」
             </p>
          </div>
        </Card>

        <Card title="納入 / 排除範圍 Included / Excluded" icon={Layers}>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-[9px] text-primary font-bold uppercase">納入</div>
                <ul className="text-[9px] text-secondary space-y-1 list-disc list-inside">
                  <li>表土保留效益</li>
                  <li>土壤改良有機質</li>
                  <li>覆蓋物長期貢獻</li>
                  <li>施工擾動風險</li>
                </ul>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] text-accent font-bold uppercase">排除</div>
                <ul className="text-[9px] text-secondary space-y-1 list-disc list-inside opacity-60">
                  <li>植栽地上部碳匯</li>
                  <li>外部碳抵換</li>
                  <li>深層土壤碳分析</li>
                  <li>實際實驗室檢測</li>
                </ul>
              </div>
           </div>
        </Card>

        <Card title="模組連動 Model Linkages" icon={Compass}>
           <div className="space-y-2">
              {[
                { m: 'Vegetation', text: '影響成活率與生長速度' },
                { m: 'Maintenance', text: '決定 SOC 穩定性' },
                { m: 'Scenario', text: '比較不同策略潛力' },
                { m: 'Reporting', text: '獨立於植栽碳匯揭露' },
              ].map((l, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5 text-[10px]">
                  <span className="text-primary font-bold">{l.m}</span>
                  <span className="text-secondary italic">{l.text}</span>
                </div>
              ))}
           </div>
        </Card>

        <Card title="不確定性與提醒" icon={FileText}>
           <div className="space-y-4">
              <div className="space-y-1.5">
                 {[
                   "基地土壤調查尚未實施",
                   "土層深度與容重採示範值",
                   "有機質含量未經實測",
                   "變化受氣候與施工干擾"
                 ].map((u, i) => (
                   <div key={i} className="flex gap-2 items-start text-[10px] text-secondary">
                      <div className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{u}</span>
                   </div>
                 ))}
              </div>
              <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-[10px] text-accent leading-tight italic">
                「土壤固碳潛力為 30 年長期累積潛力，不應視為完工當年度即可直接抵減的固定量。」
              </div>
           </div>
        </Card>

        <Card title="建議下一步 Next Actions" icon={Zap}>
           <div className="space-y-2">
              {[
                "補充土壤調查或簡易剖面資料",
                "確認表土保留與回鋪策略",
                "於 Vegetation 頁交叉檢查",
                "於 Maintenance 檢討補充頻率",
                "於 Scenario 頁比較方案差異",
              ].map((action, i) => (
                 <button key={i} className="w-full text-left p-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-[10px] text-primary font-bold transition-all">
                    {action}
                 </button>
              ))}
           </div>
        </Card>
      </div>
    </div>
  </div>
);

const Engine = () => (
  <div className="space-y-6 animate-in fade-in duration-500 font-sans">
    <SectionHeading title="碳排計算引擎與邏輯" subtitle="NCMS Engine v0.1 Calculation Methodology" />
    <p className="text-[11px] text-secondary/80 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5 italic">
      「Engine v0.1 將 Boundary、BOQ、Materials、Vegetation、Soil 與 Maintenance 的輸入整合為生命週期排放、碳匯、淨碳曲線與抵平年份；目前結果為 Prototype Mock Data，僅供設計階段模擬。」
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="生命週期階段排放比重" icon={PieChartIcon}>
            <div className="space-y-4">
              <div className="h-64">
                <ResponsiveContainer debounce={50} width="100%" height="100%">
                  <PieChart>
                    <Pie data={mock.emissionScopeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                      {mock.emissionScopeData.map((_, i) => <Cell key={i} fill={['#7E9B71', '#DDA15E', '#BC6C25', '#A8B8A0', '#4A6741', '#606C38', '#283618'][i % 7]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1D2319', border: 'none', fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {mock.emissionScopeData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px]">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#7E9B71', '#DDA15E', '#BC6C25', '#A8B8A0', '#4A6741', '#606C38', '#283618'][i % 7] }} />
                    <span className="text-secondary">{d.name}</span>
                    <span className="text-ink font-bold ml-auto">{d.value}%</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-secondary/60 leading-relaxed text-center italic border-t border-white/5 pt-4">
                「圓環圖顯示生命週期各階段對總排放的相對貢獻；碳匯項目另以負向抵減或獨立曲線呈現，避免與排放階段混淆。」
              </p>
            </div>
          </Card>

          <Card title="計算範圍 Calculation Scope" icon={Box}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="text-[10px] text-primary font-bold uppercase tracking-wider">納入 (Included)</div>
                <ul className="text-[10px] text-secondary space-y-1.5 list-disc list-inside">
                  <li>A1-A3 材料生產</li>
                  <li>A4 材料運輸</li>
                  <li>A5 施工安裝</li>
                  <li>B2-B4 維護修繕更換</li>
                  <li>B6-B7 營運能源/用水</li>
                  <li>C 退役處理</li>
                  <li>植栽碳匯</li>
                  <li>土壤碳匯</li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="text-[10px] text-accent font-bold uppercase tracking-wider">排除 (Excluded)</div>
                <ul className="text-[10px] text-secondary space-y-1.5 list-disc list-inside opacity-60">
                  <li>外部碳抵換</li>
                  <li>熱島降溫效益</li>
                  <li>第三方查證庫</li>
                  <li>正式碳權認列</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card title="核心計算公式說明 Core Formulas" icon={Calculator}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-[10px]">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">材料碳排 (E_material)</p>
              <p className="text-ink leading-relaxed">Σ(Quantity_i × EmissionFactor_i × LossRate_i)</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">運輸碳排 (E_transport)</p>
              <p className="text-ink leading-relaxed">Σ(Mass_i × Distance_i × TransportFactor_i)</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">施工碳排 (E_construction)</p>
              <p className="text-ink leading-relaxed">Σ(EquipHours_i × FuelUse_i × FuelFactor_i)</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">維護碳排 (E_maintenance)</p>
              <p className="text-ink leading-relaxed">Σ(Freq_i × EmissionPerAct_i × Years)</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">植栽碳匯 (S_vegetation)</p>
              <p className="text-ink leading-relaxed">Σ(BiomassGain_j × CarbonContent × 44/12 × SurvivalRate_j)</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">土壤大部 (S_soil)</p>
              <p className="text-ink leading-relaxed">Σ(Area_k × SOCRate_k × Years × Management_k)</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 lg:col-span-3">
              <p className="text-primary font-bold">淨碳結果 (NetCarbon)</p>
              <p className="text-ink leading-relaxed font-bold">NetCarbon = E_lifecycle - S_vegetation - S_soil - D_benefits</p>
            </div>
          </div>
        </Card>

        <Card title="輸入來源對照 Input Mapping" icon={ClipboardList}>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-[10px]">
               <thead>
                 <tr className="border-b border-white/10 text-secondary uppercase tracking-widest">
                   <th className="py-3 px-3 min-w-[120px]">輸入資料</th>
                   <th className="py-3 px-3">來源模組</th>
                   <th className="py-3 px-3">影響結果</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {[
                   { input: '工程數量', module: 'BOQ', impact: '材料、施工、運輸排放' },
                   { input: '材料係數', module: 'Materials / Sources', impact: 'A1-A3 排放' },
                   { input: '材料運距', module: 'BOQ / Materials', impact: 'A4 排放' },
                   { input: '植栽數量與樹種', module: 'Vegetation', impact: '植栽碳匯' },
                   { input: '土壤改良面積', module: 'Soil', impact: '土壤碳匯' },
                   { input: '維護頻率', module: 'Maintenance', impact: 'B2-B4 排放' },
                   { input: '評估年限', module: 'Boundary', impact: '所有累積結果' },
                   { input: '納入/排除項目', module: 'Boundary', impact: '計算邊界' },
                 ].map((row, i) => (
                   <tr key={i} className="hover:bg-white/5 transition-colors group">
                     <td className="py-3 px-3 font-bold text-ink">{row.input}</td>
                     <td className="py-3 px-3 text-primary font-bold uppercase">{row.module}</td>
                     <td className="py-3 px-3 text-secondary italic opacity-80">{row.impact}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="資料流 Data Flow" icon={Zap}>
           <div className="space-y-1">
             {[
               'Boundary 邊界設定', 'Site Data 基地條件', 'BOQ 工程數量', 'Materials 材料係數', 'Vegetation 植栽碳匯',
               'Soil 土壤碳', 'Maintenance 維護碳排', 'Engine 整合計算', 'Scenario 情境比較', 'Reporting 報表輸出'
             ].map((flow, i) => (
               <div key={i} className="flex flex-col items-center">
                 <div className="w-full py-2 px-3 bg-white/5 rounded-lg border border-white/5 text-[9px] text-secondary text-center hover:bg-primary/10 hover:text-primary transition-all cursor-default">
                    {flow}
                 </div>
                 {i < 9 && <div className="h-2 border-l border-white/10 my-0.5" />}
               </div>
             ))}
           </div>
        </Card>

        <Card title="輸出結果 Engine Outputs" icon={TrendingUp}>
           <div className="grid grid-cols-1 gap-2">
              {[
                '生命週期總碳排', '各階段碳排分析', '植栽碳匯總量', '土壤碳匯潛力', '淨碳排放曲線', '碳抵平預估年份', '工程材料碳熱點', '數據來源可信度'
              ].map(output => (
                <div key={output} className="flex items-center gap-2 text-[10px] p-2 bg-white/5 rounded-lg border border-white/5">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-secondary">{output}</span>
                </div>
              ))}
           </div>
        </Card>

        <Card title="不確定性與敏感度" icon={AlertCircle}>
          <div className="space-y-4">
             <div className="space-y-2">
                {[
                  { label: '植栽成活率', impact: '抵平年份/累積碳匯' },
                  { label: '材料碳係數', impact: 'A1-A3 排放' },
                  { label: '材料運距', impact: 'A4 運輸' },
                  { label: '維護頻率', impact: 'B2-B4 排放' },
                  { label: '土壤碳變化率', impact: '長期累積碳匯' },
                ].map(item => (
                  <div key={item.label} className="text-[10px] flex justify-between bg-white/5 p-2 rounded-lg">
                    <span className="text-secondary">{item.label}</span>
                    <span className="text-accent font-bold">敏感度高</span>
                  </div>
                ))}
             </div>
             <p className="text-[10px] text-secondary/60 leading-relaxed italic border-t border-white/5 pt-3">
               「Engine v0.1 使用中位情境與 mock data，結果應視為設計階段敏感度模擬，而非正式查證結果。」
             </p>
          </div>
        </Card>

        <Card title="資料可信度 Data Confidence" icon={ShieldCheck}>
           <div className="space-y-4">
              <div className="flex flex-col items-center p-4 bg-primary/10 rounded-2xl border border-primary/20">
                 <div className="text-[10px] uppercase font-bold text-secondary mb-1">目前平均可信度</div>
                 <div className="text-4xl font-black text-primary">B-</div>
              </div>
              <ul className="text-[10px] space-y-2">
                <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">材料係數</span><span className="text-ink font-bold">部分 Mock</span></li>
                <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">植栽模型</span><span className="text-ink font-bold">簡化生長曲線</span></li>
                <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">土壤模型</span><span className="text-ink font-bold">簡化 SOC</span></li>
                <li className="flex justify-between"><span className="text-secondary">維護模型</span><span className="text-ink font-bold">情境假設</span></li>
              </ul>
           </div>
        </Card>

        <Card title="方法論限制 Method Limits" icon={Info}>
           <div className="space-y-3 text-[10px] text-secondary leading-relaxed italic opacity-70">
              <p>• 本頁為 Prototype v0.1 計算邏輯</p>
              <p>• 未接入正式 EPD / 官方係數庫</p>
              <p>• 未進行第三方查證</p>
              <p>• 植栽與土壤模型需依現地資料校正</p>
              <p>• 木材生物碳、外部抵換與 D 階段效益需依 Boundary 設定才可納入</p>
           </div>
        </Card>
      </div>
    </div>
  </div>
);

const ReductionStrategy = () => {
  const enhancedStrategies = [
    {
      name: '減少硬鋪面比例',
      priority: 'P1',
      impact: '-95 tCO2e',
      effort: '中',
      phase: 'A1-A3、A5、B6-B7',
      benefit: '提高透水率、降低熱島、增加植栽空間',
      cost: '低～中',
      construction: '中',
      maintenance: '降低',
      notes: '需保留必要動線、無障礙與活動承載',
      id: 1,
      pos: { x: 40, y: 80 } // for matrix
    },
    {
      name: '使用低碳混凝土',
      priority: 'P1',
      impact: '-81 tCO2e',
      effort: '低',
      phase: 'A1-A3',
      benefit: '不大幅改變設計圖面',
      cost: '中',
      construction: '低',
      maintenance: '持平',
      notes: '確認配比、強度、供應商與現場施工性',
      id: 2,
      pos: { x: 20, y: 70 }
    },
    {
      name: '提高喬木覆蓋率',
      priority: 'P1',
      impact: '+220 tCO2e',
      effort: '中',
      phase: 'Vegetation、Soil、Heat Island',
      benefit: '遮蔭、生物多樣性、微氣候改善',
      cost: '中',
      construction: '中',
      maintenance: '前期增加、長期降低',
      notes: '確認樹種、根域、土壤與灌溉條件',
      id: 3,
      pos: { x: 60, y: 90 }
    },
    {
      name: '低維護地被替代',
      priority: 'P2',
      impact: '-36 tCO2e',
      effort: '低',
      phase: 'B2-B4、Maintenance、Soil',
      benefit: '降低割草、灌溉、補植與清運',
      cost: '中',
      construction: '低',
      maintenance: '降低',
      notes: '需確認使用者對草坪活動與景觀整潔度需求',
      id: 4,
      pos: { x: 15, y: 40 }
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <SectionHeading title="減碳策略建議與優先權" subtitle="Landscape Decarbonization Roadmap" />
      
      <p className="text-[11px] text-secondary/80 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5 italic">
        「Reduction 頁將 Dashboard、BOQ、Materials、Vegetation、Soil、Maintenance 與 Scenario 的分析結果轉換為可執行的減碳策略。策略優先級依減碳潛力、實施難度、成本影響、施工難度與長期維護綜合判斷。」
      </p>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: '已識別策略', val: '12', unit: '項', color: 'text-primary' },
          { label: '高優先策略', val: '4', unit: '項', color: 'text-accent' },
          { label: '預估減碳潛力', val: '280', unit: 'tCO2e', color: 'text-primary' },
          { label: '抵平提前', val: '3-5', unit: '年', color: 'text-primary' },
          { label: '低難度策略', val: '5', unit: '項', color: 'text-secondary' },
          { label: '主要熱點', val: '鋪面/混凝土', unit: '', color: 'text-ink' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-center">
            <span className="text-[9px] text-secondary font-bold uppercase tracking-wider mb-1">{kpi.label}</span>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-xl font-black", kpi.color)}>{kpi.val}</span>
              <span className="text-[9px] text-secondary/60">{kpi.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {enhancedStrategies.map(s => (
           <div key={s.name} className="p-5 bg-card-bg border border-card-border rounded-3xl space-y-4 hover:border-primary/50 transition-all flex flex-col group">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform"><TrendingDown className="w-4 h-4" /></div>
                <span className="text-[10px] font-bold bg-ink text-white px-2 py-0.5 rounded tracking-widest">{s.priority}</span>
              </div>
              <h4 className="font-bold text-sm text-ink leading-tight">{s.name}</h4>
              
              <div className="space-y-3 flex-1">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                   <div className="flex flex-col">
                      <span className="text-secondary/60 text-[9px] uppercase font-bold">預估效益</span>
                      <span className="text-primary font-bold">{s.impact}</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-secondary/60 text-[9px] uppercase font-bold">實施難度</span>
                      <span className="text-accent font-bold">{s.effort}</span>
                   </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/5">
                   <div className="text-[9px]"><span className="text-secondary font-bold">影響：</span><span className="text-ink">{s.phase}</span></div>
                   <div className="text-[9px]"><span className="text-secondary font-bold">附加：</span><span className="text-ink">{s.benefit}</span></div>
                   <div className="grid grid-cols-3 gap-1 pt-1 opacity-80">
                      <div className="text-[8px] bg-white/5 px-1 py-0.5 rounded">成本: {s.cost}</div>
                      <div className="text-[8px] bg-white/5 px-1 py-0.5 rounded">施工: {s.construction}</div>
                      <div className="text-[8px] bg-white/5 px-1 py-0.5 rounded">維護: {s.maintenance}</div>
                   </div>
                </div>
              </div>

              <div className="pt-2 italic text-[9px] text-secondary/60 leading-tight border-t border-white/5 mt-auto">
                 {s.notes}
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card title="策略優先矩陣 Priority Matrix" icon={Compass} className="lg:col-span-3">
          <div className="space-y-6">
             <div className="relative h-64 border-l-2 border-b-2 border-white/10 ml-8 mb-8 mt-4">
                {/* Labels */}
                <div className="absolute -left-10 top-1/2 -rotate-90 text-[10px] font-bold text-secondary uppercase tracking-widest">減碳 / 碳匯效益</div>
                <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 text-[10px] font-bold text-secondary uppercase tracking-widest">實施難度 (左低右高)</div>
                
                {/* Quadrant Lines */}
                <div className="absolute inset-x-0 top-1/2 border-t border-white/5" />
                <div className="absolute inset-y-0 left-1/2 border-l border-white/5" />

                {/* Quadrant Names */}
                <div className="absolute top-2 left-2 text-[9px] text-primary/40 font-bold">效益高 / 難度低：立即執行</div>
                <div className="absolute top-2 right-2 text-[9px] text-primary/40 font-bold">效益高 / 難度高：設計深化</div>
                <div className="absolute bottom-2 left-2 text-[9px] text-secondary/40 font-bold">效益低 / 難度低：快速優化</div>
                <div className="absolute bottom-2 right-2 text-[9px] text-secondary/40 font-bold">效益低 / 難度高：暫緩</div>

                {/* Strategy Bubbles */}
                {enhancedStrategies.map(s => (
                  <div 
                    key={s.id} 
                    className="absolute w-8 h-8 -ml-4 -mt-4 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center text-[10px] text-primary font-bold shadow-lg shadow-primary/10 hover:scale-125 transition-transform cursor-help"
                    style={{ left: `${s.pos.x}%`, bottom: `${s.pos.y}%` }}
                    title={s.name}
                  >
                    #{s.id}
                  </div>
                ))}
             </div>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                {enhancedStrategies.map(s => (
                  <div key={s.id} className="text-[10px] text-secondary">
                    <span className="text-primary font-bold mr-1">#{s.id}</span> {s.name}
                  </div>
                ))}
             </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card title="策略組合 Strategy Bundles" icon={Layers}>
             <div className="space-y-4">
                {[
                  { name: '快速減碳包', items: ['低碳混凝土', '在地材料', '減少鋪面厚度'] },
                  { name: '自然增匯包', items: ['提高喬木覆蓋', '多層次植栽', '土壤改良'] },
                  { name: '低維護營運包', items: ['地被替代草坪', '枝葉現地循環', '分區灌溉'] },
                  { name: 'Nature Positive 包', items: ['原生樹種', '雨水花園', '土壤有機質', '低維護植栽'] },
                ].map((bundle, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
                     <div className="text-[10px] font-bold text-primary uppercase">{bundle.name}</div>
                     <div className="flex flex-wrap gap-1">
                        {bundle.items.map(item => (
                          <span key={item} className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-secondary italic">
                            {item}
                          </span>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
          </Card>

          <Card title="建議下一步 Next Actions" icon={Zap}>
             <div className="space-y-2">
                {[
                  { label: "套用 P1 策略到 Scenario 方案", icon: Compass },
                  { label: "前往 BOQ 調整鋪面數量", icon: ClipboardList },
                  { label: "前往 Materials 確認材料替代係數", icon: Factory },
                  { label: "前往 Vegetation 檢查配置與成活率", icon: Trees },
                  { label: "前往 Reporting 輸出策略摘要", icon: FileText }
                ].map((action, i) => (
                  <button key={i} className="w-full flex items-center gap-3 p-3 bg-primary/10 hover:bg-primary/20 rounded-xl border border-primary/20 transition-all text-left">
                    <action.icon className="w-3 h-3 text-primary" />
                    <span className="text-[11px] text-ink font-bold">{action.label}</span>
                  </button>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ---- Data Types ----
const INPUT_TABS = ['專案設定', '工程數量 BOQ', '植栽輸入', '土壤輸入', '維護設定', '碳係數'];


const LabeledInput = ({ label, value, onChange, unit, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void;
  unit?: string; type?: string; placeholder?: string;
}) => (
  <div className="space-y-1.5">
    <label className="text-[10px] text-secondary font-bold uppercase tracking-widest">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
      />
      {unit && <span className="text-[10px] text-secondary/60 shrink-0">{unit}</span>}
    </div>
  </div>
);

const DataInput = () => {
  const { state, dispatch, computed, save, load, reset, clear } = useProject();
  const [tab, setTab] = useState(0);
  const [saveMsg, setSaveMsg] = useState('');

  const proj = state.projectInfo;
  const boundary = state.lcaBoundary;
  const boqItems = state.boqItems;
  const boqSummary = state.boqSummary;
  const veg = state.vegetationInput;
  const soil = state.soilInput;
  const maint = state.maintenanceInput;
  const factors = state.carbonFactors;

  const handleSave = () => {
    save();
    setSaveMsg('已儲存 ' + new Date().toLocaleTimeString('zh-TW'));
    setTimeout(() => setSaveMsg(''), 3000);
  };
  const handleLoad = () => {
    const ok = load();
    setSaveMsg(ok ? '已載入本機草稿' : '無草稿資料');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const boundaryModules = [
    { key: 'a13' as const, label: 'A1-A3 材料生產' },
    { key: 'a4' as const, label: 'A4 材料運輸' },
    { key: 'a5' as const, label: 'A5 施工安裝' },
    { key: 'b24' as const, label: 'B2-B4 維護修繕' },
    { key: 'b67' as const, label: 'B6-B7 營運能源' },
    { key: 'c' as const, label: 'C 退役處理' },
    { key: 'vegetationSequestration' as const, label: '植栽碳匯' },
    { key: 'soilCarbon' as const, label: '土壤碳匯' },
    { key: 'externalOffset' as const, label: '外部碳抵換' },
    { key: 'heatIslandIndirectBenefit' as const, label: '熱島間接效益' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeading title="數據輸入 Data Input" subtitle="手動輸入專案數值，覆寫 Mock Data" />
        <div className="flex items-center gap-2 flex-wrap">
          {saveMsg && <span className="text-[10px] text-primary font-bold animate-pulse">{saveMsg}</span>}
          <button onClick={handleLoad}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold border border-white/10 bg-white/5 text-secondary hover:bg-white/10 transition-all">
            載入草稿
          </button>
          <button onClick={handleSave}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all">
            儲存草稿
          </button>
          <button onClick={reset}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold border border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 transition-all">
            重置 Mock
          </button>
          <button onClick={clear}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold border border-white/5 bg-white/5 text-secondary/50 hover:text-secondary transition-all">
            清除本機
          </button>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] flex-wrap">
        <span className={cn('w-2 h-2 rounded-full shrink-0', state.dataSource === 'mock' ? 'bg-accent' : 'bg-primary animate-pulse')} />
        <span className="text-secondary">資料狀態：<span className="text-ink font-bold">{state.dataSource === 'mock' ? 'Mock Data（尚未覆寫）' : '已有自訂輸入'}</span></span>
        {state.lastSaved && <span className="text-secondary/50">上次儲存：{new Date(state.lastSaved).toLocaleString('zh-TW')}</span>}
        <span className="ml-auto text-secondary/60">可信度：<span className="text-ink font-bold">{computed.dataConfidence}</span></span>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '基地面積', val: proj.siteAreaM2.toLocaleString(), unit: 'm²', color: 'text-ink' },
          { label: 'BOQ 預估碳排', val: computed.totalInitialCarbon.toLocaleString(), unit: 'tCO2e', color: 'text-accent' },
          { label: `${proj.assessmentYears}yr 碳匯`, val: computed.totalSequestration30Y.toLocaleString(), unit: 'tCO2e', color: 'text-primary' },
          { label: '喬木總數', val: computed.totalTrees.toString(), unit: '株', color: 'text-primary' },
        ].map(k => (
          <div key={k.label} className="bg-card-bg p-4 rounded-2xl border border-card-border">
            <p className="text-[9px] uppercase font-bold text-secondary tracking-widest mb-1">{k.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-black ${k.color}`}>{k.val}</span>
              <span className="text-[9px] text-secondary/60">{k.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2">
        {INPUT_TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={cn('px-4 py-2 rounded-xl text-[11px] font-bold border transition-all',
              tab === i ? 'bg-primary/20 text-primary border-primary/40' : 'bg-white/5 text-secondary border-white/5 hover:bg-white/10'
            )}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab 0: 專案設定 ── */}
      {tab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="基本資料 Project Info" icon={FileText}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LabeledInput label="專案名稱" value={proj.projectName}
                onChange={v => dispatch({ type: 'SET_PROJECT_INFO', payload: { projectName: v } })} />
              <LabeledInput label="專案編號" value={proj.projectCode}
                onChange={v => dispatch({ type: 'SET_PROJECT_INFO', payload: { projectCode: v } })} />
              <LabeledInput label="基地面積" value={String(proj.siteAreaM2)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_PROJECT_INFO', payload: { siteAreaM2: parseFloat(v) || 0 } })} />
              <div className="space-y-1.5">
                <label className="text-[10px] text-secondary font-bold uppercase tracking-widest">評估年限</label>
                <select value={proj.assessmentYears}
                  onChange={e => dispatch({ type: 'SET_PROJECT_INFO', payload: { assessmentYears: parseInt(e.target.value) as 10|20|30|50 } })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-primary/50">
                  {[10, 20, 30, 50].map(y => <option key={y} value={y}>{y} 年</option>)}
                </select>
              </div>
              <LabeledInput label="地點 / 行政區" value={proj.location}
                onChange={v => dispatch({ type: 'SET_PROJECT_INFO', payload: { location: v } })} />
              <LabeledInput label="設計階段" value={proj.designStage}
                onChange={v => dispatch({ type: 'SET_PROJECT_INFO', payload: { designStage: v } })} />
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] text-secondary font-bold uppercase tracking-widest">專案類型</label>
                <select value={proj.projectType}
                  onChange={e => dispatch({ type: 'SET_PROJECT_INFO', payload: { projectType: e.target.value } })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-primary/50">
                  {['都市公園景觀', '校園景觀', '社區綠地', '屋頂綠化', '路側植栽', '生態廊道', '私人庭園', '其他'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </Card>

          <Card title="生命週期模組 LCA Boundary" icon={Layers}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {boundaryModules.map(mod => (
                <button key={mod.key}
                  onClick={() => dispatch({ type: 'SET_LCA_BOUNDARY', payload: { [mod.key]: !boundary[mod.key] } as any })}
                  className={cn('flex items-center justify-between p-3 rounded-xl border transition-all text-left',
                    boundary[mod.key] ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-white/5 border-white/5 text-secondary'
                  )}>
                  <span className="text-xs font-bold">{mod.label}</span>
                  <div className={cn('w-4 h-4 rounded border-2 flex items-center justify-center shrink-0',
                    boundary[mod.key] ? 'border-primary bg-primary' : 'border-white/20')}>
                    {boundary[mod.key] && <div className="w-2 h-2 bg-white rounded-sm" />}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ── Tab 1: BOQ ── */}
      {tab === 1 && (
        <div className="space-y-6">
          <Card title="BOQ 彙總輸入 Summary" icon={ClipboardList}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <LabeledInput label="BOQ 預估碳排" value={String(boqSummary.estimatedBOQCarbon)} unit="tCO2e" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { estimatedBOQCarbon: parseFloat(v) || 0 } })} />
              <LabeledInput label="硬鋪面面積" value={String(boqSummary.hardscapeArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { hardscapeArea: parseFloat(v) || 0 } })} />
              <LabeledInput label="混凝土用量" value={String(boqSummary.concreteVolume)} unit="m³" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { concreteVolume: parseFloat(v) || 0 } })} />
              <LabeledInput label="石材鋪面面積" value={String(boqSummary.stonePavingArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { stonePavingArea: parseFloat(v) || 0 } })} />
              <LabeledInput label="木作面積" value={String(boqSummary.timberArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { timberArea: parseFloat(v) || 0 } })} />
              <LabeledInput label="平均運距" value={String(boqSummary.transportDistanceAverage)} unit="km" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { transportDistanceAverage: parseFloat(v) || 0 } })} />
            </div>
          </Card>

          <Card title="工程數量明細 BOQ Items" icon={ClipboardList}>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px]">
                  <thead>
                    <tr className="border-b border-white/10 text-secondary uppercase tracking-tight whitespace-nowrap">
                      <th className="py-2 px-2">分類</th>
                      <th className="py-2 px-2">項目名稱</th>
                      <th className="py-2 px-2">材料</th>
                      <th className="py-2 px-2">數量</th>
                      <th className="py-2 px-2">單位</th>
                      <th className="py-2 px-2">運距 km</th>
                      <th className="py-2 px-2 text-accent">碳排 tCO2e</th>
                      <th className="py-2 px-2">等級</th>
                      <th className="py-2 px-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {boqItems.map(row => (
                      <tr key={row.id} className="group">
                        {(['cat', 'item', 'material', 'qty', 'unit', 'dist', 'carbon'] as const).map(field => (
                          <td key={field} className="py-1.5 px-2">
                            <input value={row[field]}
                              onChange={e => dispatch({ type: 'UPDATE_BOQ_ITEM', id: row.id, field, value: e.target.value })}
                              className="w-full bg-transparent border-b border-transparent focus:border-primary/50 outline-none text-ink px-1 py-0.5 transition-all min-w-[50px]" />
                          </td>
                        ))}
                        <td className="py-1.5 px-2">
                          <select value={row.conf}
                            onChange={e => dispatch({ type: 'UPDATE_BOQ_ITEM', id: row.id, field: 'conf', value: e.target.value })}
                            className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[9px] text-ink outline-none">
                            {['A', 'B', 'C', 'D'].map(g => <option key={g}>{g}</option>)}
                          </select>
                        </td>
                        <td className="py-1.5 px-2">
                          <button onClick={() => dispatch({ type: 'DELETE_BOQ_ITEM', id: row.id })}
                            className="opacity-0 group-hover:opacity-100 text-accent/60 hover:text-accent transition-all text-lg leading-none">×</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button onClick={() => dispatch({ type: 'ADD_BOQ_ITEM' })}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-[11px] text-primary font-bold transition-all">
                  <span className="text-base leading-none">+</span> 新增工程項目
                </button>
                <div className="text-[11px] text-secondary">
                  明細合計：<span className="text-accent font-bold">{computed.totalInitialCarbon.toLocaleString()} tCO2e</span>
                </div>
              </div>
              <p className="text-[9px] text-secondary/40 italic">點擊儲存格直接編輯，滑過列顯示刪除按鈕。明細合計自動連動 Dashboard。</p>
            </div>
          </Card>
        </div>
      )}

      {/* ── Tab 2: 植栽輸入 ── */}
      {tab === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="植栽數量輸入" icon={Trees}>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px]">
                  <thead>
                    <tr className="border-b border-white/10 text-secondary uppercase tracking-tight">
                      <th className="py-2 px-2">植栽類型</th>
                      <th className="py-2 px-2">數量 / 株 m²</th>
                      <th className="py-2 px-2 text-primary">{proj.assessmentYears}yr 固碳 tCO2e</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {veg.rows.map((row, i) => (
                      <tr key={row.type}>
                        <td className="py-2 px-2 text-ink font-bold">{row.type}</td>
                        {(['count', 'sink30'] as const).map(field => (
                          <td key={field} className="py-1.5 px-2">
                            <input type="number" value={row[field]}
                              onChange={e => dispatch({ type: 'UPDATE_VEG_ROW', index: i, field, value: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-ink outline-none focus:border-primary/50 transition-all" />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pt-2 border-t border-white/5 text-[11px] text-secondary flex justify-between">
                <span>{proj.assessmentYears}yr 碳匯小計</span>
                <span className="text-primary font-bold">{computed.totalSequestration30Y.toLocaleString()} tCO2e</span>
              </div>
            </div>
          </Card>

          <Card title="植栽參數設定" icon={Map}>
            <div className="space-y-4">
              <LabeledInput label="新植喬木數" value={String(veg.newTrees)} unit="株" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { newTrees: parseInt(v) || 0 } })} />
              <LabeledInput label="保留喬木數" value={String(veg.preservedTrees)} unit="株" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { preservedTrees: parseInt(v) || 0 } })} />
              <LabeledInput label="新植成活率" value={String(veg.survivalRate)} unit="%" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { survivalRate: parseFloat(v) || 0 } })} />
              <LabeledInput label="年均碳匯速率" value={String(veg.averageAnnualSequestration)} unit="tCO2e/yr" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { averageAnnualSequestration: parseFloat(v) || 0 } })} />
              <LabeledInput label={`${proj.assessmentYears}yr 預估總碳匯`} value={String(veg.thirtyYearSequestration)} unit="tCO2e" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { thirtyYearSequestration: parseFloat(v) || 0 } })} />
              <LabeledInput label="高固碳樹種佔比" value={String(veg.highSequestrationSpeciesRatio)} unit="%" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { highSequestrationSpeciesRatio: parseFloat(v) || 0 } })} />
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-secondary">喬木總數（新植＋保留）</span>
                  <span className="text-ink font-bold">{computed.totalTrees} 株</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">預估有效成活</span>
                  <span className="text-primary font-bold">{Math.round(veg.newTrees * veg.survivalRate / 100 + veg.preservedTrees)} 株</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── Tab 3: 土壤輸入 ── */}
      {tab === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="土壤保護與改善面積" icon={Layers}>
            <div className="space-y-4">
              <LabeledInput label="表土保留面積" value={String(soil.topsoilPreservedArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_SOIL', payload: { topsoilPreservedArea: parseFloat(v) || 0 } })} />
              <LabeledInput label="土壤改良面積" value={String(soil.soilImprovementArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_SOIL', payload: { soilImprovementArea: parseFloat(v) || 0 } })} />
              <LabeledInput label="有機覆蓋物面積" value={String(soil.organicMulchArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_SOIL', payload: { organicMulchArea: parseFloat(v) || 0 } })} />
              <LabeledInput label={`${proj.assessmentYears}yr 土壤固碳潛力`} value={String(soil.soilCarbonPotential)} unit="tCO2e" type="number"
                onChange={v => dispatch({ type: 'SET_SOIL', payload: { soilCarbonPotential: parseFloat(v) || 0 } })} />
            </div>
          </Card>

          <Card title="土壤擾動風險" icon={AlertCircle}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-secondary font-bold uppercase tracking-widest">壓實風險等級</label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map(level => {
                    const labels = { low: '低', medium: '中', high: '高' };
                    const active = { low: 'bg-primary/10 border-primary/40 text-primary', medium: 'bg-accent/10 border-accent/40 text-accent', high: 'bg-red-500/10 border-red-500/40 text-red-400' };
                    return (
                      <button key={level}
                        onClick={() => dispatch({ type: 'SET_SOIL', payload: { compactionRisk: level } })}
                        className={cn('flex-1 py-2 rounded-xl border text-xs font-bold transition-all',
                          soil.compactionRisk === level ? active[level] : 'bg-white/5 border-white/5 text-secondary hover:bg-white/10'
                        )}>
                        {labels[level]}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-secondary">土壤固碳貢獻（{proj.assessmentYears}yr）</span>
                  <span className="text-primary font-bold">
                    {boundary.soilCarbon ? `${soil.soilCarbonPotential} tCO2e` : '（已排除於邊界外）'}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-[10px] text-accent/80 italic">
                * 土壤固碳模型為 Prototype 簡化估算，非正式碳盤查數值。
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── Tab 4: 維護設定 ── */}
      {tab === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="維護情境選擇" icon={Wrench}>
            <div className="space-y-3">
              {maintenanceScenarios.map(scenario => (
                <button key={scenario.id}
                  onClick={() => dispatch({ type: 'SET_MAINTENANCE', payload: { selectedScenario: scenario.id, annualMaintenanceCarbon: scenario.annualCarbonTco2e } })}
                  className={cn('w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left',
                    maint.selectedScenario === scenario.id ? 'bg-primary/10 border-primary/40' : 'bg-white/5 border-white/5 hover:bg-white/10'
                  )}>
                  <div>
                    <span className={cn('text-sm font-bold', maint.selectedScenario === scenario.id ? 'text-primary' : 'text-ink')}>{scenario.label}</span>
                    <p className="text-[10px] text-secondary mt-0.5">年度碳排：{scenario.annualCarbonTco2e} tCO2e/yr</p>
                  </div>
                  <div className={cn('w-4 h-4 rounded-full border-2 shrink-0',
                    maint.selectedScenario === scenario.id ? 'border-primary bg-primary' : 'border-white/20')} />
                </button>
              ))}
            </div>
          </Card>

          <Card title="維護細部設定" icon={Settings}>
            <div className="space-y-4">
              <LabeledInput label="年度維護碳排（自訂）" value={String(maint.annualMaintenanceCarbon)} unit="tCO2e/yr" type="number"
                onChange={v => dispatch({ type: 'SET_MAINTENANCE', payload: { annualMaintenanceCarbon: parseFloat(v) || 0 } })} />
              <div className="space-y-1.5">
                <label className="text-[10px] text-secondary font-bold uppercase tracking-widest">灌溉強度</label>
                <select value={maint.irrigationIntensity}
                  onChange={e => dispatch({ type: 'SET_MAINTENANCE', payload: { irrigationIntensity: e.target.value as any } })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-primary/50">
                  <option value="none">無（雨水滿足）</option>
                  <option value="low">低（每月 2 次）</option>
                  <option value="medium">中（每週 1 次）</option>
                  <option value="high">高（每日灌溉）</option>
                </select>
              </div>
              <LabeledInput label="除草頻率" value={maint.mowingFrequency} placeholder="例：每月 2 次"
                onChange={v => dispatch({ type: 'SET_MAINTENANCE', payload: { mowingFrequency: v } })} />
              <LabeledInput label="修剪頻率" value={maint.pruningFrequency} placeholder="例：每季 1 次"
                onChange={v => dispatch({ type: 'SET_MAINTENANCE', payload: { pruningFrequency: v } })} />
              <LabeledInput label="年均補植率" value={String(maint.replacementRate)} unit="%" type="number"
                onChange={v => dispatch({ type: 'SET_MAINTENANCE', payload: { replacementRate: parseFloat(v) || 0 } })} />
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-secondary">年度維護碳排</span>
                  <span className="text-accent font-bold">{maint.annualMaintenanceCarbon} tCO2e/yr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">{proj.assessmentYears}yr 維護總碳排</span>
                  <span className="text-accent font-bold">{computed.maintenanceCarbon30Y} tCO2e</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── Tab 5: 碳係數 ── */}
      {tab === 5 && (
        <Card title="碳係數登錄 Carbon Factor Registry" icon={Database}>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="border-b border-white/10 text-secondary uppercase tracking-tight whitespace-nowrap">
                    <th className="py-2 px-2">係數名稱</th>
                    <th className="py-2 px-2">數值</th>
                    <th className="py-2 px-2">單位</th>
                    <th className="py-2 px-2">來源</th>
                    <th className="py-2 px-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {factors.map((row, i) => (
                    <tr key={i} className="group">
                      {(['name', 'value', 'unit', 'source'] as const).map(field => (
                        <td key={field} className="py-1.5 px-2">
                          <input value={row[field]}
                            onChange={e => dispatch({ type: 'UPDATE_FACTOR', index: i, field, value: e.target.value })}
                            className="w-full bg-transparent border-b border-transparent focus:border-primary/50 outline-none text-ink px-1 py-0.5 transition-all min-w-[60px]" />
                        </td>
                      ))}
                      <td className="py-1.5 px-2">
                        <button onClick={() => dispatch({ type: 'DELETE_FACTOR', index: i })}
                          className="opacity-0 group-hover:opacity-100 text-accent/60 hover:text-accent transition-all text-lg leading-none">×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <button onClick={() => dispatch({ type: 'ADD_FACTOR' })}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-[11px] text-primary font-bold transition-all">
                <span className="text-base leading-none">+</span> 新增係數
              </button>
              <span className="text-[9px] text-secondary/40">共 {factors.length} 筆係數</span>
            </div>
            <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-[10px] text-accent/80 italic">
              * 此頁輸入的係數將對應 Sources 頁的係數登錄表，未來版本將自動連結計算引擎。
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [prefs, setPrefs] = useState({
    language: '繁體中文',
    unit: 'kgCO2e',
    mode: 'Demo 模式',
    confidence: true,
    detail: '精簡',
    theme: '深色模式'
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: 'dashboard', label: '專案總覽 Dashboard', icon: LayoutDashboard },
    { id: 'boundary', label: '專案邊界 Boundary', icon: Box },
    { id: 'site', label: '基地資料 Site Data', icon: Map },
    { id: 'boq', label: '工程數量 BOQ', icon: ClipboardList },
    { id: 'materials', label: '材料碳排 Materials', icon: Factory },
    { id: 'vegetation', label: '植栽碳匯 Vegetation', icon: Trees },
    { id: 'soil', label: '土壤碳 Soil', icon: Layers },
    { id: 'maintenance', label: '維護碳排 Maintenance', icon: Wrench },
    { id: 'engine', label: '碳排計算 Engine', icon: Calculator },
    { id: 'scenario', label: '情境比較 Scenario', icon: Compass },
    { id: 'reduction', label: '減碳策略 Reduction', icon: TrendingDown },
    { id: 'reporting', label: '報表輸出 Reporting', icon: FileText },
    { id: 'sources', label: '資料來源 Sources', icon: Info },
    { id: 'input', label: '數據輸入 Data Input', icon: Database },
    { id: 'admin', label: '系統狀態 System Status', icon: ShieldCheck },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center text-primary">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-6"
        />
        <p className="text-secondary font-mono tracking-widest text-[10px] uppercase font-bold">Initializing NCMS Engine...</p>
      </div>
    );
  }

  return (
    <ProjectProvider>
    <div className="flex h-screen bg-bg font-sans text-ink selection:bg-primary/30">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-sidebar border-r border-card-border p-4 flex flex-col hidden xl:flex">
        <div className="flex items-center gap-3 px-3 py-6">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Leaf className="w-5 h-5 text-bg" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-primary tracking-tighter leading-none block">NCMS</span>
            <span className="text-[9px] text-secondary uppercase font-bold tracking-widest mt-1 block">Landscape Carbon Management System</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-1 custom-scrollbar">
          {navItems.map(item => (
            <SidebarItem 
              key={item.id} 
              icon={item.icon} 
              label={item.label} 
              active={activeTab === item.id} 
              onClick={() => setActiveTab(item.id)} 
            />
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">System Info</span>
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(126,155,113,0.5)]" />
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-secondary/60">Mode: <span className="text-primary font-bold">Local Prototype</span></p>
              <p className="text-[9px] text-secondary/60">Data: <span className="text-accent font-bold">Mock Enabled</span></p>
              <p className="text-[9px] text-secondary/60">Confidence: <span className="text-ink">Demo</span></p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Mobile Nav --- */}
      <div className="xl:hidden">
        {/* Hamburger button */}
        <button
          className="fixed top-4 left-4 z-50 bg-sidebar p-3 rounded-full border border-card-border shadow-lg"
          onClick={() => setIsMobileNavOpen(true)}
        >
          <Menu className="w-5 h-5 text-primary" />
        </button>

        {/* Backdrop */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMobileNavOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Drawer */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 bg-sidebar border-r border-card-border p-4 flex flex-col z-50 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                    <Leaf className="w-5 h-5 text-bg" />
                  </div>
                  <div>
                    <span className="font-extrabold text-lg text-primary tracking-tighter leading-none block">NCMS</span>
                    <span className="text-[9px] text-secondary uppercase font-bold tracking-widest mt-1 block">Landscape Carbon Mgmt</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileNavOpen(false)}
                  className="p-2 text-secondary hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 space-y-1 overflow-y-auto px-1 custom-scrollbar mt-2">
                {navItems.map(item => (
                  <SidebarItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activeTab === item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileNavOpen(false); }}
                  />
                ))}
              </nav>

              {/* System info */}
              <div className="mt-auto pt-4 border-t border-white/5">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">System Info</span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(126,155,113,0.5)]" />
                  </div>
                  <p className="text-[9px] text-secondary/60">Mode: <span className="text-primary font-bold">Local Prototype</span></p>
                  <p className="text-[9px] text-secondary/60">Data: <span className="text-accent font-bold">Mock Enabled</span></p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <header className="sticky top-0 z-30 bg-bg/85 backdrop-blur-xl border-b border-white/5 px-8 xl:px-8 pl-16 xl:pl-8 h-20 flex items-center justify-between">
          <div className="animate-in slide-in-from-left duration-500">
            <h1 className="text-xl font-black text-ink tracking-tight flex items-center gap-2">
              {mock.mockProject.name}
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{activeTab}</span>
            </h1>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1 opacity-70 italic">{mock.mockProject.phase}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="搜尋模組、材料、植栽或碳係數…" 
                className="pl-10 pr-4 py-2 bg-white/5 border border-transparent rounded-xl text-xs focus:ring-1 focus:ring-primary/50 transition-all outline-none w-64 group-focus-within:bg-white/10"
              />
            </div>
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
               <button className="p-2 text-secondary hover:text-primary transition-colors relative group">
                 <AlertCircle className="w-5 h-5" />
                 <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border-2 border-bg" />
                 {/* Tooltip or Popover for notifications could go here */}
                 <div className="absolute top-full right-0 mt-2 w-64 bg-card-bg border border-card-border p-4 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all z-50">
                    <h4 className="text-[10px] font-black text-secondary tracking-widest uppercase mb-3">通知 Notification</h4>
                    <div className="space-y-2 text-[10px]">
                       <div className="p-2 bg-white/5 rounded-lg border border-white/5 flex gap-2">
                          <AlertCircle className="w-3 h-3 text-accent shrink-0" />
                          <span>有 9 筆係數需要人工確認</span>
                       </div>
                       <div className="p-2 bg-white/5 rounded-lg border border-white/5 flex gap-2">
                          <Info className="w-3 h-3 text-primary shrink-0" />
                          <span>目前資料模式為 Mock Data</span>
                       </div>
                       <div className="p-2 bg-white/5 rounded-lg border border-white/5 flex gap-2">
                          <ShieldCheck className="w-3 h-3 text-secondary shrink-0" />
                          <span>報告僅供 Prototype 預覽</span>
                       </div>
                    </div>
                 </div>
               </button>
               <div className="flex items-center gap-3 group relative cursor-help">
                 <div className="text-right hidden sm:block">
                   <p className="text-xs font-bold text-ink">Jesus Hsieh</p>
                   <p className="text-[9px] text-secondary font-bold">Landscape Carbon Consultant</p>
                 </div>
                 <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-xs">JH</div>
                 
                 {/* Profile Card */}
                 <div className="absolute top-full right-0 mt-2 w-48 bg-card-bg border border-card-border p-4 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all z-50">
                    <div className="space-y-3">
                       <div className="border-b border-white/5 pb-2">
                          <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">使用者角色</p>
                          <p className="text-xs text-ink font-bold">Landscape Carbon Consultant</p>
                       </div>
                       <div className="border-b border-white/5 pb-2">
                          <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">專案權限</p>
                          <p className="text-xs text-primary font-bold">Demo User</p>
                       </div>
                       <div className="space-y-1">
                          <button className="w-full text-left text-[10px] text-secondary hover:text-primary py-1 transition-colors">查看角色資訊</button>
                          <button className="w-full text-left text-[10px] text-secondary hover:text-primary py-1 transition-colors">Demo 權限說明</button>
                          <button className="w-full text-left text-[10px] text-accent/50 py-1 cursor-not-allowed" disabled>登出 (Demo only)</button>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1440px] mx-auto min-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'boundary' && <Boundary />}
              {activeTab === 'site' && <SiteData />}
              {activeTab === 'boq' && <BOQ />}
              {activeTab === 'materials' && <Materials />}
              {activeTab === 'vegetation' && <Vegetation />}
              {activeTab === 'soil' && <Soil />}
              {activeTab === 'maintenance' && <Maintenance />}
              {activeTab === 'engine' && <Engine />}
              {activeTab === 'scenario' && <Scenario />}
              {activeTab === 'reduction' && <ReductionStrategy />}
              {activeTab === 'reporting' && <Reporting />}
              {activeTab === 'sources' && <Sources />}
              {activeTab === 'input' && <DataInput />}
              {activeTab === 'admin' && <SystemStatus />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Floating Preferences --- */}
        <div className="fixed bottom-8 right-8 z-50">
           <AnimatePresence>
             {showPreferences && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="absolute bottom-16 right-0 w-72 bg-card-bg/95 backdrop-blur-2xl border border-card-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[32px] overflow-hidden"
               >
                 <div className="p-6 space-y-6">
                   <div className="flex items-center justify-between border-b border-white/5 pb-4">
                     <h4 className="text-sm font-black text-primary">快速偏好設定</h4>
                     <Settings className="w-4 h-4 text-secondary/40" />
                   </div>

                   <div className="space-y-4">
                     <div className="space-y-2">
                       <label className="text-[10px] text-secondary font-bold uppercase tracking-widest">語言 Language</label>
                       <div className="grid grid-cols-2 gap-2">
                         {['繁體中文', 'English'].map(l => (
                           <button 
                             key={l}
                             onClick={() => setPrefs({...prefs, language: l})}
                             className={cn("py-2 rounded-xl text-[10px] font-bold border transition-all", prefs.language === l ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-secondary border-white/5")}
                           >
                             {l}
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-[10px] text-secondary font-bold uppercase tracking-widest">單位顯示 Unit Display</label>
                       <div className="grid grid-cols-2 gap-2">
                         {['kgCO2e', 'tCO2e'].map(u => (
                           <button 
                             key={u}
                             onClick={() => setPrefs({...prefs, unit: u})}
                             className={cn("py-2 rounded-xl text-[10px] font-bold border transition-all", prefs.unit === u ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-secondary border-white/5")}
                           >
                             {u}
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-[10px] text-secondary font-bold uppercase tracking-widest">顯示模式 Mode</label>
                       <div className="grid grid-cols-1 gap-2">
                         {[
                           { m: 'Demo 模式', d: '適合簡報展示，資訊較精簡。' },
                           { m: 'Expert 模式', d: '顯示更多來源、公式與可信度。' },
                           { m: 'Report 模式', d: '接近報告輸出視角。' }
                         ].map(item => (
                           <button 
                             key={item.m}
                             onClick={() => setPrefs({...prefs, mode: item.m})}
                             className={cn("p-3 rounded-2xl text-left border transition-all space-y-1", prefs.mode === item.m ? "bg-primary/20 border-primary/30" : "bg-white/5 border-white/5")}
                           >
                             <div className={cn("text-[10px] font-bold", prefs.mode === item.m ? "text-primary" : "text-ink")}>{item.m}</div>
                             <div className="text-[9px] text-secondary/60 leading-tight">{item.d}</div>
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="space-y-0.5">
                           <div className="text-[10px] font-bold text-ink">可信度標籤 Overlay</div>
                           <div className="text-[9px] text-secondary/60">顯示 A-E 分級標籤</div>
                        </div>
                        <button 
                          onClick={() => setPrefs({...prefs, confidence: !prefs.confidence})}
                          className={cn("w-10 h-5 rounded-full relative p-1 transition-colors", prefs.confidence ? "bg-primary" : "bg-white/10")}
                        >
                          <div className={cn("w-3 h-3 bg-white rounded-full transition-all", prefs.confidence ? "ml-5" : "ml-0")} />
                        </button>
                     </div>

                     <div className="space-y-2">
                       <label className="text-[10px] text-secondary font-bold uppercase tracking-widest">圖表細節 Chart Detail</label>
                       <div className="grid grid-cols-2 gap-2">
                         {['精簡', '詳細'].map(d => (
                           <button 
                             key={d}
                             onClick={() => setPrefs({...prefs, detail: d})}
                             className={cn("py-2 rounded-xl text-[10px] font-bold border transition-all", prefs.detail === d ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-secondary border-white/5")}
                           >
                             {d}
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-[10px] text-secondary font-bold uppercase tracking-widest">主題 Theme</label>
                       <div className="grid grid-cols-2 gap-2">
                         {['深色模式', '淺色 (未來)'].map(t => (
                           <button 
                             key={t}
                             onClick={() => t === '深色模式' ? setPrefs({...prefs, theme: t}) : null}
                             className={cn("py-2 rounded-xl text-[10px] font-bold border transition-all", prefs.theme === t ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-secondary border-white/5", t !== '深色模式' && "opacity-50 cursor-not-allowed")}
                           >
                             {t}
                           </button>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
           <button 
             onClick={() => setShowPreferences(!showPreferences)}
             className={cn(
               "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-95 group",
               showPreferences ? "bg-white/10 text-primary border border-primary/30" : "bg-accent text-bg shadow-accent/20 hover:scale-110"
             )}
            >
             <Settings className={cn("w-6 h-6 transition-transform duration-500", showPreferences ? "rotate-90" : "group-hover:rotate-90")} />
           </button>
        </div>
      </main>
    </div>
    </ProjectProvider>
  );
}
