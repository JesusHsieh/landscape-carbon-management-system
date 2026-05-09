import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area, ReferenceLine,
} from 'recharts';
import {
  ShieldCheck, Info, Activity, Factory, TrendingDown, ClipboardList,
  Compass, FileText, Zap, AlertCircle,
} from 'lucide-react';
import * as mock from '../data/mockData';
import { useProject } from '../store/projectStore';
import Card from '../components/ui/Card';
import Metric from '../components/ui/Metric';

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
          <div className="grid grid-cols-2 gap-y-3 text-[13px]">
            <span className="text-secondary">評估年限</span>
            <span className="text-ink font-bold text-right">30 年</span>
            <span className="text-secondary">生命週期範圍</span>
            <span className="text-primary font-bold text-right">A1-A5, B2-B4, B6-B7, C</span>
            <span className="text-secondary">碳匯範圍</span>
            <span className="text-primary font-bold text-right">植栽碳匯、土壤碳匯</span>
            <span className="text-secondary">資料狀態</span>
            <span className="text-accent font-bold text-right">Prototype Mock Data</span>
          </div>
          <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-[13px] text-accent leading-relaxed italic">
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
              <span className="text-[13px] text-secondary leading-tight">{insight}</span>
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
                <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#A8B8A0' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#A8B8A0' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#21281D', border: '1px solid #2D3628', color: '#F8F9F5' }}
                  itemStyle={{ fontSize: '13px' }}
                />
                <Legend verticalAlign="top" align="right" iconSize={8} wrapperStyle={{ fontSize: '13px', paddingBottom: '10px' }} />
                <Bar dataKey="emission" fill="#BC6C25" radius={[4, 4, 0, 0]} name="生命週期排放" />
                <Bar dataKey="sink" fill="#7E9B71" radius={[4, 4, 0, 0]} name="植栽與土壤碳匯" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[13px] text-secondary/60 italic text-center">
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
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#A8B8A0' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#A8B8A0' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1D2319', border: 'none' }} labelStyle={{ fontSize: '13px' }} itemStyle={{ fontSize: '13px' }} />
                <Legend verticalAlign="top" align="right" iconSize={8} wrapperStyle={{ fontSize: '13px', paddingBottom: '10px' }} />
                <Area type="monotone" name="累積排放" dataKey="累積排放" stroke="#BC6C25" fill="#BC6C25" fillOpacity={0.1} />
                <Area type="monotone" name="累積碳匯" dataKey="累積碳匯" stroke="#7E9B71" fill="url(#colorNet)" />
                <Area type="monotone" name="淨碳排" dataKey="淨碳排" stroke="#F8F9F5" strokeDasharray="5 5" fill="transparent" />
                <ReferenceLine x={24} stroke="#DDA15E" strokeDasharray="3 3" label={{ position: 'top', value: 'Year 24 抵平點', fill: '#DDA15E', fontSize: 13 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[13px] text-secondary/60 italic text-center">
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
              <span className="text-[13px] text-accent leading-tight">{risk}</span>
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
              <span className="text-[13px] text-secondary leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="建議下一步 Recommended Next Actions">
        <div className="space-y-3">
          {[
            { label: "檢查鋪面與混凝土數量清單", icon: ClipboardList },
            { label: "比較 Low Carbon 與 Nature Positive 方案", icon: Compass },
            { label: "補充植栽成活率與維護情境參數", icon: FileText },
            { label: "生成景觀專案碳管理報告預覽", icon: FileText }
          ].map((action, i) => (
            <button key={i} className="w-full flex items-center justify-between p-3 bg-primary/10 hover:bg-primary/20 rounded-xl border border-primary/20 transition-all text-left">
              <div className="flex items-center gap-3">
                <action.icon className="w-3 h-3 text-primary" />
                <span className="text-[13px] text-ink font-bold">{action.label}</span>
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

export default Dashboard;
