import { Layers, AlertCircle, Zap, Info, Compass, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

const Soil = () => (
  <div className="space-y-6 animate-in fade-in duration-500 font-sans">
    <SectionHeading title="土壤碳管與基地擾動分析" subtitle="Soil Organic Carbon (SOC) & Site Disturbance" />

    {/* KPI Metrics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[13px] uppercase tracking-widest font-bold text-secondary mb-1">表土保留面積</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">8,200</h4>
          <span className="text-[13px] text-secondary/60">m²</span>
        </div>
        <p className="text-[13px] text-secondary/60 mt-1">保護既有 SOC 基礎</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[13px] uppercase tracking-widest font-bold text-secondary mb-1">土壤改良面積</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">5,600</h4>
          <span className="text-[13px] text-secondary/60">m²</span>
        </div>
        <p className="text-[13px] text-secondary/60 mt-1">改善根域與有機碳累積條件</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[13px] uppercase tracking-widest font-bold text-secondary mb-1">有機覆蓋面積</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">3,400</h4>
          <span className="text-[13px] text-secondary/60">m²</span>
        </div>
        <p className="text-[13px] text-secondary/60 mt-1">保水、降溫、減少裸露流失</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[13px] uppercase tracking-widest font-bold text-secondary mb-1">土壤固碳潛力</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">286</h4>
          <span className="text-[13px] text-secondary/60">tCO2e</span>
        </div>
        <p className="text-[13px] text-secondary/60 mt-1">30 年 SOC 潛力，未含植栽地上部碳匯</p>
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
                    <span className="text-[13px] text-primary">{row.strategy}</span>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div>
                      <span className="text-[13px] text-secondary font-bold uppercase block">擾動風險</span>
                      <span className={cn("text-[13px] font-bold", row.risk === '低' ? "text-primary" : "text-accent")}>{row.risk}</span>
                    </div>
                    <div>
                      <span className="text-[13px] text-secondary font-bold uppercase block">30年固碳</span>
                      <span className="text-sm font-mono font-bold text-primary">{row.sink}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[13px] text-secondary/70 leading-relaxed border-t border-white/5 pt-2">{row.desc}</p>
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
                     <div key={item.label} className="flex justify-between items-center text-[13px] bg-white/5 p-2 rounded-lg">
                        <span className="text-secondary">{item.label}</span>
                        <span className={cn("font-bold px-2 py-0.5 rounded", item.val === '高' ? "text-accent bg-accent/10" : "text-ink bg-white/5")}>{item.val}</span>
                     </div>
                   ))}
                </div>
                <p className="text-[13px] text-secondary italic leading-relaxed">
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
                      <div className="text-[13px] font-bold text-ink">{s.label}</div>
                      <div className="text-[13px] text-secondary">{s.desc}</div>
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
             <div className="grid grid-cols-2 gap-y-3 text-[13px]">
                <span className="text-secondary">評估年限</span><span className="text-ink font-bold text-right">30 年</span>
                <span className="text-secondary">計算範圍</span><span className="text-ink font-bold text-right">表土層 0–30 cm</span>
                <span className="text-secondary">模型類型</span><span className="text-ink font-bold text-right">簡化 SOC 潛力估算</span>
                <span className="text-secondary">資料狀態</span><span className="text-accent font-bold text-right">Prototype Mock</span>
             </div>
             <p className="text-[13px] text-secondary/60 leading-relaxed italic border-t border-white/5 pt-3">
               「本頁土壤碳為 30 年土壤有機碳潛力模擬結果，主要反映管理效益，尚未依現地檢測校正。」
             </p>
          </div>
        </Card>

        <Card title="納入 / 排除範圍 Included / Excluded" icon={Layers}>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-[13px] text-primary font-bold uppercase">納入</div>
                <ul className="text-[13px] text-secondary space-y-1 list-disc list-inside">
                  <li>表土保留效益</li>
                  <li>土壤改良有機質</li>
                  <li>覆蓋物長期貢獻</li>
                  <li>施工擾動風險</li>
                </ul>
              </div>
              <div className="space-y-1">
                <div className="text-[13px] text-accent font-bold uppercase">排除</div>
                <ul className="text-[13px] text-secondary space-y-1 list-disc list-inside opacity-60">
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
                <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5 text-[13px]">
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
                   <div key={i} className="flex gap-2 items-start text-[13px] text-secondary">
                      <div className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{u}</span>
                   </div>
                 ))}
              </div>
              <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-[13px] text-accent leading-tight italic">
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

export default Soil;
