import { TrendingDown, Compass, Layers, Zap, ClipboardList, Factory, Trees, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

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

      <p className="text-[13px] text-secondary/80 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5 italic">
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
            <span className="text-[13px] text-secondary font-bold uppercase tracking-wider mb-1">{kpi.label}</span>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-xl font-black", kpi.color)}>{kpi.val}</span>
              <span className="text-[13px] text-secondary/60">{kpi.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {enhancedStrategies.map(s => (
           <div key={s.name} className="p-5 bg-card-bg border border-card-border rounded-3xl space-y-4 hover:border-primary/50 transition-all flex flex-col group">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform"><TrendingDown className="w-4 h-4" /></div>
                <span className="text-[13px] font-bold bg-ink text-white px-2 py-0.5 rounded tracking-widest">{s.priority}</span>
              </div>
              <h4 className="font-bold text-sm text-ink leading-tight">{s.name}</h4>

              <div className="space-y-3 flex-1">
                <div className="grid grid-cols-2 gap-2 text-[13px]">
                   <div className="flex flex-col">
                      <span className="text-secondary/60 text-[13px] uppercase font-bold">預估效益</span>
                      <span className="text-primary font-bold">{s.impact}</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-secondary/60 text-[13px] uppercase font-bold">實施難度</span>
                      <span className="text-accent font-bold">{s.effort}</span>
                   </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/5">
                   <div className="text-[13px]"><span className="text-secondary font-bold">影響：</span><span className="text-ink">{s.phase}</span></div>
                   <div className="text-[13px]"><span className="text-secondary font-bold">附加：</span><span className="text-ink">{s.benefit}</span></div>
                   <div className="grid grid-cols-3 gap-1 pt-1 opacity-80">
                      <div className="text-[8px] bg-white/5 px-1 py-0.5 rounded">成本: {s.cost}</div>
                      <div className="text-[8px] bg-white/5 px-1 py-0.5 rounded">施工: {s.construction}</div>
                      <div className="text-[8px] bg-white/5 px-1 py-0.5 rounded">維護: {s.maintenance}</div>
                   </div>
                </div>
              </div>

              <div className="pt-2 italic text-[13px] text-secondary/60 leading-tight border-t border-white/5 mt-auto">
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
                <div className="absolute -left-10 top-1/2 -rotate-90 text-[13px] font-bold text-secondary uppercase tracking-widest">減碳 / 碳匯效益</div>
                <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 text-[13px] font-bold text-secondary uppercase tracking-widest">實施難度 (左低右高)</div>

                {/* Quadrant Lines */}
                <div className="absolute inset-x-0 top-1/2 border-t border-white/5" />
                <div className="absolute inset-y-0 left-1/2 border-l border-white/5" />

                {/* Quadrant Names */}
                <div className="absolute top-2 left-2 text-[13px] text-primary/40 font-bold">效益高 / 難度低：立即執行</div>
                <div className="absolute top-2 right-2 text-[13px] text-primary/40 font-bold">效益高 / 難度高：設計深化</div>
                <div className="absolute bottom-2 left-2 text-[13px] text-secondary/40 font-bold">效益低 / 難度低：快速優化</div>
                <div className="absolute bottom-2 right-2 text-[13px] text-secondary/40 font-bold">效益低 / 難度高：暫緩</div>

                {/* Strategy Bubbles */}
                {enhancedStrategies.map(s => (
                  <div
                    key={s.id}
                    className="absolute w-8 h-8 -ml-4 -mt-4 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center text-[13px] text-primary font-bold shadow-lg shadow-primary/10 hover:scale-125 transition-transform cursor-help"
                    style={{ left: `${s.pos.x}%`, bottom: `${s.pos.y}%` }}
                    title={s.name}
                  >
                    #{s.id}
                  </div>
                ))}
             </div>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                {enhancedStrategies.map(s => (
                  <div key={s.id} className="text-[13px] text-secondary">
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
                     <div className="text-[13px] font-bold text-primary uppercase">{bundle.name}</div>
                     <div className="flex flex-wrap gap-1">
                        {bundle.items.map(item => (
                          <span key={item} className="text-[13px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-secondary italic">
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
                    <span className="text-[13px] text-ink font-bold">{action.label}</span>
                  </button>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReductionStrategy;
