import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts';
import { Compass, Layers, Zap, Calculator, AlertCircle } from 'lucide-react';
import * as mock from '../data/mockData';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

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
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 13, fill: '#A8B8A0' }} />
                  <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '13px' }} />
                  <Radar name="Baseline" dataKey="Baseline" stroke="#BC6C25" fill="#BC6C25" fillOpacity={0.1} />
                  <Radar name="Low Carbon" dataKey="LowCarbon" stroke="#DDA15E" fill="#DDA15E" fillOpacity={0.1} />
                  <Radar name="Natural Design (Nature Positive)" dataKey="Natural" stroke="#7E9B71" fill="#7E9B71" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[13px] text-secondary/60 leading-relaxed italic text-center border-t border-white/5 pt-4">
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
                 <span className={cn("text-[13px] font-bold", s.color)}>{s.name}</span>
                 <p className="text-[13px] text-secondary leading-relaxed">{s.desc}</p>
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
                <div className="flex items-center gap-2 text-primary font-bold text-[13px] uppercase tracking-widest"><Zap className="w-4 h-4" /> 系統推薦方案</div>
                <h3 className="text-2xl font-black text-ink">Nature Positive 生態正效益方案</h3>
                <div className="text-[13px] font-bold text-primary/80">推薦模式：平衡模式（Carbon + Ecology Balanced）</div>
             </div>
             <div className="text-right">
                <div className="text-[13px] text-secondary font-bold uppercase">綜合得分</div>
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
                  <span className="block text-[13px] text-secondary font-bold uppercase mb-1">{m.label}</span>
                  <span className="text-lg font-bold text-ink block">{m.val}</span>
                  <span className="text-[13px] text-primary/60 font-medium">{m.sub}</span>
               </div>
             ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-primary/10">
             <div className="text-[13px] font-bold text-ink uppercase tracking-wider">推薦原因 Why This Scenario</div>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                {[
                  "本方案在碳匯增量與生物多樣性表現最佳",
                  "相較 Baseline，長期淨碳表現更佳",
                  "相較 Low Carbon，整體長期效益最佳",
                  "在低碳、生態與景觀品質間取得最佳平衡"
                ].map((reason, i) => (
                  <li key={i} className="flex gap-2 items-start text-[13px] text-secondary leading-relaxed">
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
                        <div className="flex justify-between text-[13px]">
                           <span className="text-secondary">{w.label}</span>
                           <span className="text-primary font-bold">{w.weight}</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-primary" style={{ width: w.weight }} />
                        </div>
                     </div>
                   ))}
                </div>
                <p className="text-[13px] text-secondary/60 leading-relaxed italic border-t border-white/5 pt-3">
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
                     <p className="text-[13px] text-secondary leading-relaxed">{risk}</p>
                  </div>
                ))}
             </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card title="備選方案 Alternative Option" icon={Layers}>
              <div className="space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                    <div className="text-[13px] text-secondary font-bold uppercase">備選方案</div>
                    <div className="text-sm font-bold text-ink">Low Carbon 材料導向方案</div>
                 </div>
                 <div className="space-y-2">
                    <div className="text-[13px] text-secondary font-bold uppercase">改選條件</div>
                    <ul className="space-y-2">
                       {[
                         "專案優先目標為縮減初始碳排",
                         "業主偏重施工可行性與成本控制",
                         "原生植栽取得或維護條件不足"
                       ].map((cond, i) => (
                         <li key={i} className="flex gap-2 items-start text-[13px] text-secondary opacity-80">
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
                   <button key={i} className="w-full text-left p-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/10 rounded-xl text-[13px] text-primary font-bold transition-all truncate">
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

export default Scenario;
