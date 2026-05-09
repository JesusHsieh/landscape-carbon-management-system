import { ShieldCheck, CheckSquare, Database, Zap, AlertCircle, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

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
              { v: 'v0.1', t: 'Frontend Prototype', active: false },
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

export default SystemStatus;
