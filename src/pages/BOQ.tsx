import { useState } from 'react';
import { AlertCircle, Zap, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

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
            <p className="text-[13px] uppercase font-bold text-secondary mb-1">{kpi.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-lg font-black", kpi.color || "text-ink")}>{kpi.val}</span>
              <span className="text-[13px] text-secondary/60">{kpi.unit}</span>
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
                  "px-4 py-2 rounded-xl text-[13px] font-bold transition-all border",
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
              <table className="w-full text-left text-[13px]">
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
            <div className="mt-4 p-4 bg-sidebar/50 rounded-2xl border border-white/5 text-[13px] text-secondary leading-relaxed">
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
                  <div className="flex justify-between text-[13px]">
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
              <ul className="text-[13px] space-y-3">
                <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">數量來源</span><span className="text-ink">Mock v0.1</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">已映射係數</span><span className="text-primary font-bold">75%</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">高碳熱點</span><span className="text-accent">鋪面 / 混凝土</span></li>
              </ul>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
                 <span className="text-[13px] text-secondary/60 font-bold uppercase block">待確認項目</span>
                 <p className="text-[13px] text-ink leading-tight">木材、再生材料、施工機具</p>
              </div>
              <button className="w-full py-2.5 bg-primary/10 border border-primary/20 text-primary rounded-xl text-[13px] font-bold hover:bg-primary hover:text-bg transition-all">
                前往 Materials 確認係數
              </button>
            </div>
          </Card>

          <Card title="材料碳足跡提醒" icon={Info}>
            <div className="space-y-4 text-[13px] text-secondary leading-relaxed">
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

export default BOQ;
