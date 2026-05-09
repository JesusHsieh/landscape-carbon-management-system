import { FileText, ShieldCheck, Info, Activity, Zap, Leaf, TrendingUp, AlertCircle, CheckSquare } from 'lucide-react';
import { cn } from '../lib/utils';
import { useProject } from '../store/projectStore';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

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

export default Reporting;
