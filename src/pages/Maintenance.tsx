import { TrendingDown, Leaf, ClipboardList, Activity, Calculator, Info, AlertCircle, Compass, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

const Maintenance = () => (
  <div className="space-y-6 animate-in fade-in duration-500 font-sans">
    <SectionHeading title="營運維護階段碳排分析" subtitle="Long-term Operational Carbon (B2-B4, B6-B7)" />

    {/* Scenario Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center gap-4 text-center group hover:border-red-400/30 transition-all">
        <div className="p-3 bg-red-400/10 rounded-full"><TrendingDown className="w-8 h-8 text-red-400 rotate-180" /></div>
        <h4 className="font-bold text-ink">高強度維護情境</h4>
        <p className="text-[13px] text-secondary leading-relaxed">密集除草、自動灌溉、高頻率修剪</p>
        <div className="space-y-1">
          <div className="text-xl font-bold text-ink">12.5 tCO2e/yr</div>
          <div className="text-[13px] text-accent font-bold">30 年累積約 375 tCO2e</div>
          <div className="text-[13px] text-secondary/60">相較標準情境 +198%</div>
        </div>
      </div>
      <div className="p-6 bg-primary/20 rounded-3xl border border-primary/20 flex flex-col items-center gap-4 text-center ring-2 ring-primary/40 group hover:ring-primary transition-all">
        <div className="p-3 bg-primary/10 rounded-full"><TrendingDown className="w-8 h-8 text-primary" /></div>
        <h4 className="font-bold text-ink">標準維護情境 (設計方案)</h4>
        <p className="text-[13px] text-secondary leading-relaxed">季節性修剪、分區平衡灌溉</p>
        <div className="space-y-1">
          <div className="text-xl font-bold text-primary">4.2 tCO2e/yr</div>
          <div className="text-[13px] text-primary font-bold">30 年累積約 126 tCO2e</div>
          <div className="text-[13px] text-secondary/60">作為本案基準維護模型</div>
        </div>
      </div>
      <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center gap-4 text-center group hover:border-primary/30 transition-all">
        <div className="p-3 bg-secondary/10 rounded-full"><Leaf className="w-8 h-8 text-secondary" /></div>
        <h4 className="font-bold text-ink">近自然維護情境</h4>
        <p className="text-[13px] text-secondary leading-relaxed">現地循環堆肥、原生多樣地被</p>
        <div className="space-y-1">
          <div className="text-xl font-bold text-ink">0.8 tCO2e/yr</div>
          <div className="text-[13px] text-primary font-bold">30 年累積約 24 tCO2e</div>
          <div className="text-[13px] text-secondary/60">相較標準情境 -81%</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        {/* Scenario Definition Table */}
        <Card title="情境定義 Scenario Definition" icon={ClipboardList}>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-[13px]">
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
                        <div className="flex justify-between text-[13px]">
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
                           <span className="text-[13px] font-bold text-ink">{impact.label}</span>
                           <span className={cn("text-lg font-black font-mono", impact.color)}>{impact.val} <span className="text-[13px]">tCO2e</span></span>
                        </div>
                     </div>
                   ))}
                </div>
                <p className="text-[13px] text-secondary leading-relaxed italic border-t border-white/5 pt-4">
                  「即使單年度差距看似有限，30 年累積下維護策略差異將顯著影響整體專案淨碳表現。」
                </p>
             </div>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card title="維護情境摘要 Summary" icon={Info}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3 text-[13px]">
               <span className="text-secondary">評估年限</span><span className="text-ink font-bold text-right">30 年</span>
               <span className="text-secondary">顯示單位</span><span className="text-primary font-bold text-right">tCO2e/yr</span>
               <span className="text-secondary">資料狀態</span><span className="text-accent font-bold text-right">Prototype Mock</span>
            </div>
            <p className="text-[13px] text-secondary/60 leading-relaxed italic border-t border-white/5 pt-3">
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
               <div key={i} className="flex gap-2 items-start text-[13px] text-accent/80">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span>{r}</span>
               </div>
             ))}
             <p className="text-[13px] text-secondary mt-2 opacity-60 leading-tight">
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
               <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5 text-[13px]">
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
               <button key={i} className="w-full text-left p-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-[13px] text-primary font-bold transition-all">
                  {action}
               </button>
             ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export default Maintenance;
