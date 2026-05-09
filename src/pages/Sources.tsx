import { Info, Database, ShieldCheck, AlertCircle, Zap, Tag } from 'lucide-react';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

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
        <p className="text-[13px] text-secondary/80 leading-relaxed max-w-3xl">
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
            <span className="text-[13px] text-secondary font-bold uppercase tracking-widest">{kpi.label}</span>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-xl font-black", kpi.color)}>{kpi.val}</span>
              <span className="text-[13px] text-secondary/60">{kpi.unit}</span>
            </div>
            <p className="text-[8px] text-secondary/50 leading-tight">{kpi.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card title="係數註冊表 (Factor Registry)" icon={Database}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
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
                        <div className="text-[13px] text-secondary/60 mt-1">{f.source}</div>
                      </td>
                      <td className="py-4 px-3 text-secondary">{f.category}</td>
                      <td className="py-4 px-3 font-mono text-ink font-bold">{f.value}</td>
                      <td className="py-4 px-3 text-secondary">{f.unit}</td>
                      <td className="py-4 px-3">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[13px] font-bold border",
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
                   <div key={i} className="flex gap-3 text-[13px] text-secondary leading-relaxed p-2 bg-white/5 rounded-lg border border-white/5">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{rule}</span>
                   </div>
                 ))}
               </div>
            </Card>

            <Card title="數據缺口分析 (Data Gaps)" icon={AlertCircle}>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-[13px]">
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
                     <span className="text-[13px] font-black text-primary">{step.v}</span>
                     <span className="text-[13px] text-secondary text-center leading-tight">{step.t}</span>
                  </div>
                ))}
             </div>
             <p className="text-[13px] text-secondary/60 italic text-center mt-4">
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
                        <span className={cn("text-[13px] font-black", grade.color)}>Grade {grade.g}</span>
                        <span className="text-[13px] text-ink font-bold">{grade.label}</span>
                     </div>
                     <p className="text-[13px] text-secondary/60 leading-tight">{grade.desc}</p>
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
                     <p className="text-[13px] text-secondary opacity-60 italic">{status.desc}</p>
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sources;
