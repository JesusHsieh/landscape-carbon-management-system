import { useState } from 'react';
import { FileText, Layers, ClipboardList, Trees, Map, AlertCircle, Database, Settings, Wrench } from 'lucide-react';
import { cn } from '../lib/utils';
import { useProject } from '../store/projectStore';
import { maintenanceScenarios } from '../data/defaults/defaultMaintenance';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

const INPUT_TABS = ['專案設定', '工程數量 BOQ', '植栽輸入', '土壤輸入', '維護設定', '碳係數'];

const LabeledInput = ({ label, value, onChange, unit, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void;
  unit?: string; type?: string; placeholder?: string;
}) => (
  <div className="space-y-1.5">
    <label className="text-[13px] text-secondary font-bold uppercase tracking-widest">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
      />
      {unit && <span className="text-[13px] text-secondary/60 shrink-0">{unit}</span>}
    </div>
  </div>
);

const DataInput = () => {
  const { state, dispatch, computed, save, load, reset, clear } = useProject();
  const [tab, setTab] = useState(0);
  const [saveMsg, setSaveMsg] = useState('');

  const proj = state.projectInfo;
  const boundary = state.lcaBoundary;
  const boqItems = state.boqItems;
  const boqSummary = state.boqSummary;
  const veg = state.vegetationInput;
  const soil = state.soilInput;
  const maint = state.maintenanceInput;
  const factors = state.carbonFactors;

  const handleSave = () => {
    save();
    setSaveMsg('已儲存 ' + new Date().toLocaleTimeString('zh-TW'));
    setTimeout(() => setSaveMsg(''), 3000);
  };
  const handleLoad = () => {
    const ok = load();
    setSaveMsg(ok ? '已載入本機草稿' : '無草稿資料');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const boundaryModules = [
    { key: 'a13' as const, label: 'A1-A3 材料生產' },
    { key: 'a4' as const, label: 'A4 材料運輸' },
    { key: 'a5' as const, label: 'A5 施工安裝' },
    { key: 'b24' as const, label: 'B2-B4 維護修繕' },
    { key: 'b67' as const, label: 'B6-B7 營運能源' },
    { key: 'c' as const, label: 'C 退役處理' },
    { key: 'vegetationSequestration' as const, label: '植栽碳匯' },
    { key: 'soilCarbon' as const, label: '土壤碳匯' },
    { key: 'externalOffset' as const, label: '外部碳抵換' },
    { key: 'heatIslandIndirectBenefit' as const, label: '熱島間接效益' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeading title="數據輸入 Data Input" subtitle="手動輸入專案數值，覆寫 Mock Data" />
        <div className="flex items-center gap-2 flex-wrap">
          {saveMsg && <span className="text-[13px] text-primary font-bold animate-pulse">{saveMsg}</span>}
          <button onClick={handleLoad}
            className="px-3 py-1.5 rounded-lg text-[13px] font-bold border border-white/10 bg-white/5 text-secondary hover:bg-white/10 transition-all">
            載入草稿
          </button>
          <button onClick={handleSave}
            className="px-3 py-1.5 rounded-lg text-[13px] font-bold border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all">
            儲存草稿
          </button>
          <button onClick={reset}
            className="px-3 py-1.5 rounded-lg text-[13px] font-bold border border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 transition-all">
            重置 Mock
          </button>
          <button onClick={clear}
            className="px-3 py-1.5 rounded-lg text-[13px] font-bold border border-white/5 bg-white/5 text-secondary/50 hover:text-secondary transition-all">
            清除本機
          </button>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl text-[13px] flex-wrap">
        <span className={cn('w-2 h-2 rounded-full shrink-0', state.dataSource === 'mock' ? 'bg-accent' : 'bg-primary animate-pulse')} />
        <span className="text-secondary">資料狀態：<span className="text-ink font-bold">{state.dataSource === 'mock' ? 'Mock Data（尚未覆寫）' : '已有自訂輸入'}</span></span>
        {state.lastSaved && <span className="text-secondary/50">上次儲存：{new Date(state.lastSaved).toLocaleString('zh-TW')}</span>}
        <span className="ml-auto text-secondary/60">可信度：<span className="text-ink font-bold">{computed.dataConfidence}</span></span>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '基地面積', val: proj.siteAreaM2.toLocaleString(), unit: 'm²', color: 'text-ink' },
          { label: 'BOQ 預估碳排', val: computed.totalInitialCarbon.toLocaleString(), unit: 'tCO2e', color: 'text-accent' },
          { label: `${proj.assessmentYears}yr 碳匯`, val: computed.totalSequestration30Y.toLocaleString(), unit: 'tCO2e', color: 'text-primary' },
          { label: '喬木總數', val: computed.totalTrees.toString(), unit: '株', color: 'text-primary' },
        ].map(k => (
          <div key={k.label} className="bg-card-bg p-4 rounded-2xl border border-card-border">
            <p className="text-[13px] uppercase font-bold text-secondary tracking-widest mb-1">{k.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-black ${k.color}`}>{k.val}</span>
              <span className="text-[13px] text-secondary/60">{k.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2">
        {INPUT_TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={cn('px-4 py-2 rounded-xl text-[13px] font-bold border transition-all',
              tab === i ? 'bg-primary/20 text-primary border-primary/40' : 'bg-white/5 text-secondary border-white/5 hover:bg-white/10'
            )}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab 0: 專案設定 ── */}
      {tab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="基本資料 Project Info" icon={FileText}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LabeledInput label="專案名稱" value={proj.projectName}
                onChange={v => dispatch({ type: 'SET_PROJECT_INFO', payload: { projectName: v } })} />
              <LabeledInput label="專案編號" value={proj.projectCode}
                onChange={v => dispatch({ type: 'SET_PROJECT_INFO', payload: { projectCode: v } })} />
              <LabeledInput label="基地面積" value={String(proj.siteAreaM2)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_PROJECT_INFO', payload: { siteAreaM2: parseFloat(v) || 0 } })} />
              <div className="space-y-1.5">
                <label className="text-[13px] text-secondary font-bold uppercase tracking-widest">評估年限</label>
                <select value={proj.assessmentYears}
                  onChange={e => dispatch({ type: 'SET_PROJECT_INFO', payload: { assessmentYears: parseInt(e.target.value) as 10|20|30|50 } })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-primary/50">
                  {[10, 20, 30, 50].map(y => <option key={y} value={y}>{y} 年</option>)}
                </select>
              </div>
              <LabeledInput label="地點 / 行政區" value={proj.location}
                onChange={v => dispatch({ type: 'SET_PROJECT_INFO', payload: { location: v } })} />
              <LabeledInput label="設計階段" value={proj.designStage}
                onChange={v => dispatch({ type: 'SET_PROJECT_INFO', payload: { designStage: v } })} />
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[13px] text-secondary font-bold uppercase tracking-widest">專案類型</label>
                <select value={proj.projectType}
                  onChange={e => dispatch({ type: 'SET_PROJECT_INFO', payload: { projectType: e.target.value } })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-primary/50">
                  {['都市公園景觀', '校園景觀', '社區綠地', '屋頂綠化', '路側植栽', '生態廊道', '私人庭園', '其他'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </Card>

          <Card title="生命週期模組 LCA Boundary" icon={Layers}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {boundaryModules.map(mod => (
                <button key={mod.key}
                  onClick={() => dispatch({ type: 'SET_LCA_BOUNDARY', payload: { [mod.key]: !boundary[mod.key] } as any })}
                  className={cn('flex items-center justify-between p-3 rounded-xl border transition-all text-left',
                    boundary[mod.key] ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-white/5 border-white/5 text-secondary'
                  )}>
                  <span className="text-[13px] font-bold">{mod.label}</span>
                  <div className={cn('w-4 h-4 rounded border-2 flex items-center justify-center shrink-0',
                    boundary[mod.key] ? 'border-primary bg-primary' : 'border-white/20')}>
                    {boundary[mod.key] && <div className="w-2 h-2 bg-white rounded-sm" />}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ── Tab 1: BOQ ── */}
      {tab === 1 && (
        <div className="space-y-6">
          <Card title="BOQ 彙總輸入 Summary" icon={ClipboardList}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <LabeledInput label="BOQ 預估碳排" value={String(boqSummary.estimatedBOQCarbon)} unit="tCO2e" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { estimatedBOQCarbon: parseFloat(v) || 0 } })} />
              <LabeledInput label="硬鋪面面積" value={String(boqSummary.hardscapeArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { hardscapeArea: parseFloat(v) || 0 } })} />
              <LabeledInput label="混凝土用量" value={String(boqSummary.concreteVolume)} unit="m³" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { concreteVolume: parseFloat(v) || 0 } })} />
              <LabeledInput label="石材鋪面面積" value={String(boqSummary.stonePavingArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { stonePavingArea: parseFloat(v) || 0 } })} />
              <LabeledInput label="木作面積" value={String(boqSummary.timberArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { timberArea: parseFloat(v) || 0 } })} />
              <LabeledInput label="平均運距" value={String(boqSummary.transportDistanceAverage)} unit="km" type="number"
                onChange={v => dispatch({ type: 'SET_BOQ_SUMMARY', payload: { transportDistanceAverage: parseFloat(v) || 0 } })} />
            </div>
          </Card>

          <Card title="工程數量明細 BOQ Items" icon={ClipboardList}>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-white/10 text-secondary uppercase tracking-tight whitespace-nowrap">
                      <th className="py-2 px-2">分類</th>
                      <th className="py-2 px-2">項目名稱</th>
                      <th className="py-2 px-2">材料</th>
                      <th className="py-2 px-2">數量</th>
                      <th className="py-2 px-2">單位</th>
                      <th className="py-2 px-2">運距 km</th>
                      <th className="py-2 px-2 text-accent">碳排 tCO2e</th>
                      <th className="py-2 px-2">等級</th>
                      <th className="py-2 px-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {boqItems.map(row => (
                      <tr key={row.id} className="group">
                        {(['cat', 'item', 'material', 'qty', 'unit', 'dist', 'carbon'] as const).map(field => (
                          <td key={field} className="py-1.5 px-2">
                            <input value={row[field]}
                              onChange={e => dispatch({ type: 'UPDATE_BOQ_ITEM', id: row.id, field, value: e.target.value })}
                              className="w-full bg-transparent border-b border-transparent focus:border-primary/50 outline-none text-ink px-1 py-0.5 transition-all min-w-[50px]" />
                          </td>
                        ))}
                        <td className="py-1.5 px-2">
                          <select value={row.conf}
                            onChange={e => dispatch({ type: 'UPDATE_BOQ_ITEM', id: row.id, field: 'conf', value: e.target.value })}
                            className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[13px] text-ink outline-none">
                            {['A', 'B', 'C', 'D'].map(g => <option key={g}>{g}</option>)}
                          </select>
                        </td>
                        <td className="py-1.5 px-2">
                          <button onClick={() => dispatch({ type: 'DELETE_BOQ_ITEM', id: row.id })}
                            className="opacity-0 group-hover:opacity-100 text-accent/60 hover:text-accent transition-all text-lg leading-none">×</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button onClick={() => dispatch({ type: 'ADD_BOQ_ITEM' })}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-[13px] text-primary font-bold transition-all">
                  <span className="text-base leading-none">+</span> 新增工程項目
                </button>
                <div className="text-[13px] text-secondary">
                  明細合計：<span className="text-accent font-bold">{computed.totalInitialCarbon.toLocaleString()} tCO2e</span>
                </div>
              </div>
              <p className="text-[13px] text-secondary/40 italic">點擊儲存格直接編輯，滑過列顯示刪除按鈕。明細合計自動連動 Dashboard。</p>
            </div>
          </Card>
        </div>
      )}

      {/* ── Tab 2: 植栽輸入 ── */}
      {tab === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="植栽數量輸入" icon={Trees}>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-white/10 text-secondary uppercase tracking-tight">
                      <th className="py-2 px-2">植栽類型</th>
                      <th className="py-2 px-2">數量 / 株 m²</th>
                      <th className="py-2 px-2 text-primary">{proj.assessmentYears}yr 固碳 tCO2e</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {veg.rows.map((row, i) => (
                      <tr key={row.type}>
                        <td className="py-2 px-2 text-ink font-bold">{row.type}</td>
                        {(['count', 'sink30'] as const).map(field => (
                          <td key={field} className="py-1.5 px-2">
                            <input type="number" value={row[field]}
                              onChange={e => dispatch({ type: 'UPDATE_VEG_ROW', index: i, field, value: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-ink outline-none focus:border-primary/50 transition-all" />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pt-2 border-t border-white/5 text-[13px] text-secondary flex justify-between">
                <span>{proj.assessmentYears}yr 碳匯小計</span>
                <span className="text-primary font-bold">{computed.totalSequestration30Y.toLocaleString()} tCO2e</span>
              </div>
            </div>
          </Card>

          <Card title="植栽參數設定" icon={Map}>
            <div className="space-y-4">
              <LabeledInput label="新植喬木數" value={String(veg.newTrees)} unit="株" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { newTrees: parseInt(v) || 0 } })} />
              <LabeledInput label="保留喬木數" value={String(veg.preservedTrees)} unit="株" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { preservedTrees: parseInt(v) || 0 } })} />
              <LabeledInput label="新植成活率" value={String(veg.survivalRate)} unit="%" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { survivalRate: parseFloat(v) || 0 } })} />
              <LabeledInput label="年均碳匯速率" value={String(veg.averageAnnualSequestration)} unit="tCO2e/yr" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { averageAnnualSequestration: parseFloat(v) || 0 } })} />
              <LabeledInput label={`${proj.assessmentYears}yr 預估總碳匯`} value={String(veg.thirtyYearSequestration)} unit="tCO2e" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { thirtyYearSequestration: parseFloat(v) || 0 } })} />
              <LabeledInput label="高固碳樹種佔比" value={String(veg.highSequestrationSpeciesRatio)} unit="%" type="number"
                onChange={v => dispatch({ type: 'SET_VEGETATION', payload: { highSequestrationSpeciesRatio: parseFloat(v) || 0 } })} />
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-secondary">喬木總數（新植＋保留）</span>
                  <span className="text-ink font-bold">{computed.totalTrees} 株</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">預估有效成活</span>
                  <span className="text-primary font-bold">{Math.round(veg.newTrees * veg.survivalRate / 100 + veg.preservedTrees)} 株</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── Tab 3: 土壤輸入 ── */}
      {tab === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="土壤保護與改善面積" icon={Layers}>
            <div className="space-y-4">
              <LabeledInput label="表土保留面積" value={String(soil.topsoilPreservedArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_SOIL', payload: { topsoilPreservedArea: parseFloat(v) || 0 } })} />
              <LabeledInput label="土壤改良面積" value={String(soil.soilImprovementArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_SOIL', payload: { soilImprovementArea: parseFloat(v) || 0 } })} />
              <LabeledInput label="有機覆蓋物面積" value={String(soil.organicMulchArea)} unit="m²" type="number"
                onChange={v => dispatch({ type: 'SET_SOIL', payload: { organicMulchArea: parseFloat(v) || 0 } })} />
              <LabeledInput label={`${proj.assessmentYears}yr 土壤固碳潛力`} value={String(soil.soilCarbonPotential)} unit="tCO2e" type="number"
                onChange={v => dispatch({ type: 'SET_SOIL', payload: { soilCarbonPotential: parseFloat(v) || 0 } })} />
            </div>
          </Card>

          <Card title="土壤擾動風險" icon={AlertCircle}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[13px] text-secondary font-bold uppercase tracking-widest">壓實風險等級</label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map(level => {
                    const labels = { low: '低', medium: '中', high: '高' };
                    const active = { low: 'bg-primary/10 border-primary/40 text-primary', medium: 'bg-accent/10 border-accent/40 text-accent', high: 'bg-red-500/10 border-red-500/40 text-red-400' };
                    return (
                      <button key={level}
                        onClick={() => dispatch({ type: 'SET_SOIL', payload: { compactionRisk: level } })}
                        className={cn('flex-1 py-2 rounded-xl border text-[13px] font-bold transition-all',
                          soil.compactionRisk === level ? active[level] : 'bg-white/5 border-white/5 text-secondary hover:bg-white/10'
                        )}>
                        {labels[level]}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-secondary">土壤固碳貢獻（{proj.assessmentYears}yr）</span>
                  <span className="text-primary font-bold">
                    {boundary.soilCarbon ? `${soil.soilCarbonPotential} tCO2e` : '（已排除於邊界外）'}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-[13px] text-accent/80 italic">
                * 土壤固碳模型為 Prototype 簡化估算，非正式碳盤查數值。
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── Tab 4: 維護設定 ── */}
      {tab === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="維護情境選擇" icon={Wrench}>
            <div className="space-y-3">
              {maintenanceScenarios.map(scenario => (
                <button key={scenario.id}
                  onClick={() => dispatch({ type: 'SET_MAINTENANCE', payload: { selectedScenario: scenario.id, annualMaintenanceCarbon: scenario.annualCarbonTco2e } })}
                  className={cn('w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left',
                    maint.selectedScenario === scenario.id ? 'bg-primary/10 border-primary/40' : 'bg-white/5 border-white/5 hover:bg-white/10'
                  )}>
                  <div>
                    <span className={cn('text-sm font-bold', maint.selectedScenario === scenario.id ? 'text-primary' : 'text-ink')}>{scenario.label}</span>
                    <p className="text-[13px] text-secondary mt-0.5">年度碳排：{scenario.annualCarbonTco2e} tCO2e/yr</p>
                  </div>
                  <div className={cn('w-4 h-4 rounded-full border-2 shrink-0',
                    maint.selectedScenario === scenario.id ? 'border-primary bg-primary' : 'border-white/20')} />
                </button>
              ))}
            </div>
          </Card>

          <Card title="維護細部設定" icon={Settings}>
            <div className="space-y-4">
              <LabeledInput label="年度維護碳排（自訂）" value={String(maint.annualMaintenanceCarbon)} unit="tCO2e/yr" type="number"
                onChange={v => dispatch({ type: 'SET_MAINTENANCE', payload: { annualMaintenanceCarbon: parseFloat(v) || 0 } })} />
              <div className="space-y-1.5">
                <label className="text-[13px] text-secondary font-bold uppercase tracking-widest">灌溉強度</label>
                <select value={maint.irrigationIntensity}
                  onChange={e => dispatch({ type: 'SET_MAINTENANCE', payload: { irrigationIntensity: e.target.value as any } })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-primary/50">
                  <option value="none">無（雨水滿足）</option>
                  <option value="low">低（每月 2 次）</option>
                  <option value="medium">中（每週 1 次）</option>
                  <option value="high">高（每日灌溉）</option>
                </select>
              </div>
              <LabeledInput label="除草頻率" value={maint.mowingFrequency} placeholder="例：每月 2 次"
                onChange={v => dispatch({ type: 'SET_MAINTENANCE', payload: { mowingFrequency: v } })} />
              <LabeledInput label="修剪頻率" value={maint.pruningFrequency} placeholder="例：每季 1 次"
                onChange={v => dispatch({ type: 'SET_MAINTENANCE', payload: { pruningFrequency: v } })} />
              <LabeledInput label="年均補植率" value={String(maint.replacementRate)} unit="%" type="number"
                onChange={v => dispatch({ type: 'SET_MAINTENANCE', payload: { replacementRate: parseFloat(v) || 0 } })} />
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-secondary">年度維護碳排</span>
                  <span className="text-accent font-bold">{maint.annualMaintenanceCarbon} tCO2e/yr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">{proj.assessmentYears}yr 維護總碳排</span>
                  <span className="text-accent font-bold">{computed.maintenanceCarbon30Y} tCO2e</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── Tab 5: 碳係數 ── */}
      {tab === 5 && (
        <Card title="碳係數登錄 Carbon Factor Registry" icon={Database}>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-white/10 text-secondary uppercase tracking-tight whitespace-nowrap">
                    <th className="py-2 px-2">係數名稱</th>
                    <th className="py-2 px-2">數值</th>
                    <th className="py-2 px-2">單位</th>
                    <th className="py-2 px-2">來源</th>
                    <th className="py-2 px-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {factors.map((row, i) => (
                    <tr key={i} className="group">
                      {(['name', 'value', 'unit', 'source'] as const).map(field => (
                        <td key={field} className="py-1.5 px-2">
                          <input value={row[field]}
                            onChange={e => dispatch({ type: 'UPDATE_FACTOR', index: i, field, value: e.target.value })}
                            className="w-full bg-transparent border-b border-transparent focus:border-primary/50 outline-none text-ink px-1 py-0.5 transition-all min-w-[60px]" />
                        </td>
                      ))}
                      <td className="py-1.5 px-2">
                        <button onClick={() => dispatch({ type: 'DELETE_FACTOR', index: i })}
                          className="opacity-0 group-hover:opacity-100 text-accent/60 hover:text-accent transition-all text-lg leading-none">×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <button onClick={() => dispatch({ type: 'ADD_FACTOR' })}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-[13px] text-primary font-bold transition-all">
                <span className="text-base leading-none">+</span> 新增係數
              </button>
              <span className="text-[13px] text-secondary/40">共 {factors.length} 筆係數</span>
            </div>
            <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-[13px] text-accent/80 italic">
              * 此頁輸入的係數將對應 Sources 頁的係數登錄表，未來版本將自動連結計算引擎。
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DataInput;
