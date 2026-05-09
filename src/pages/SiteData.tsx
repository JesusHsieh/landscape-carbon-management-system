import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';
import {
  Map, Trees, Thermometer, Activity, ArrowDownToLine, Box, AlertCircle, Zap, Info,
} from 'lucide-react';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

const SiteData = () => (
  <div className="space-y-6 animate-in zoom-in-95 duration-500 font-sans">
    <SectionHeading title="基地資料與現況分析" subtitle="Site Characteristics & Pre-assessment" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

export default SiteData;
