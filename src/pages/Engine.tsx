import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieChartIcon, Box, Calculator, ClipboardList, Zap, TrendingUp, AlertCircle, ShieldCheck, Info } from 'lucide-react';
import * as mock from '../data/mockData';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

const Engine = () => (
  <div className="space-y-6 animate-in fade-in duration-500 font-sans">
    <SectionHeading title="碳排計算引擎與邏輯" subtitle="NCMS Engine v0.1 Calculation Methodology" />
    <p className="text-[13px] text-secondary/80 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5 italic">
      「Engine v0.1 將 Boundary、BOQ、Materials、Vegetation、Soil 與 Maintenance 的輸入整合為生命週期排放、碳匯、淨碳曲線與抵平年份；目前結果為 Prototype Mock Data，僅供設計階段模擬。」
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="生命週期階段排放比重" icon={PieChartIcon}>
            <div className="space-y-4">
              <div className="h-64">
                <ResponsiveContainer debounce={50} width="100%" height="100%">
                  <PieChart>
                    <Pie data={mock.emissionScopeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                      {mock.emissionScopeData.map((_, i) => <Cell key={i} fill={['#7E9B71', '#DDA15E', '#BC6C25', '#A8B8A0', '#4A6741', '#606C38', '#283618'][i % 7]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1D2319', border: 'none', fontSize: '13px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {mock.emissionScopeData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px]">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#7E9B71', '#DDA15E', '#BC6C25', '#A8B8A0', '#4A6741', '#606C38', '#283618'][i % 7] }} />
                    <span className="text-secondary">{d.name}</span>
                    <span className="text-ink font-bold ml-auto">{d.value}%</span>
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-secondary/60 leading-relaxed text-center italic border-t border-white/5 pt-4">
                「圓環圖顯示生命週期各階段對總排放的相對貢獻；碳匯項目另以負向抵減或獨立曲線呈現，避免與排放階段混淆。」
              </p>
            </div>
          </Card>

          <Card title="計算範圍 Calculation Scope" icon={Box}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="text-[13px] text-primary font-bold uppercase tracking-wider">納入 (Included)</div>
                <ul className="text-[13px] text-secondary space-y-1.5 list-disc list-inside">
                  <li>A1-A3 材料生產</li>
                  <li>A4 材料運輸</li>
                  <li>A5 施工安裝</li>
                  <li>B2-B4 維護修繕更換</li>
                  <li>B6-B7 營運能源/用水</li>
                  <li>C 退役處理</li>
                  <li>植栽碳匯</li>
                  <li>土壤碳匯</li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="text-[13px] text-accent font-bold uppercase tracking-wider">排除 (Excluded)</div>
                <ul className="text-[13px] text-secondary space-y-1.5 list-disc list-inside opacity-60">
                  <li>外部碳抵換</li>
                  <li>熱島降溫效益</li>
                  <li>第三方查證庫</li>
                  <li>正式碳權認列</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card title="核心計算公式說明 Core Formulas" icon={Calculator}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-[13px]">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">材料碳排 (E_material)</p>
              <p className="text-ink leading-relaxed">Σ(Quantity_i × EmissionFactor_i × LossRate_i)</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">運輸碳排 (E_transport)</p>
              <p className="text-ink leading-relaxed">Σ(Mass_i × Distance_i × TransportFactor_i)</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">施工碳排 (E_construction)</p>
              <p className="text-ink leading-relaxed">Σ(EquipHours_i × FuelUse_i × FuelFactor_i)</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">維護碳排 (E_maintenance)</p>
              <p className="text-ink leading-relaxed">Σ(Freq_i × EmissionPerAct_i × Years)</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">植栽碳匯 (S_vegetation)</p>
              <p className="text-ink leading-relaxed">Σ(BiomassGain_j × CarbonContent × 44/12 × SurvivalRate_j)</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <p className="text-primary font-bold">土壤大部 (S_soil)</p>
              <p className="text-ink leading-relaxed">Σ(Area_k × SOCRate_k × Years × Management_k)</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 lg:col-span-3">
              <p className="text-primary font-bold">淨碳結果 (NetCarbon)</p>
              <p className="text-ink leading-relaxed font-bold">NetCarbon = E_lifecycle - S_vegetation - S_soil - D_benefits</p>
            </div>
          </div>
        </Card>

        <Card title="輸入來源對照 Input Mapping" icon={ClipboardList}>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-[13px]">
               <thead>
                 <tr className="border-b border-white/10 text-secondary uppercase tracking-widest">
                   <th className="py-3 px-3 min-w-[120px]">輸入資料</th>
                   <th className="py-3 px-3">來源模組</th>
                   <th className="py-3 px-3">影響結果</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {[
                   { input: '工程數量', module: 'BOQ', impact: '材料、施工、運輸排放' },
                   { input: '材料係數', module: 'Materials / Sources', impact: 'A1-A3 排放' },
                   { input: '材料運距', module: 'BOQ / Materials', impact: 'A4 排放' },
                   { input: '植栽數量與樹種', module: 'Vegetation', impact: '植栽碳匯' },
                   { input: '土壤改良面積', module: 'Soil', impact: '土壤碳匯' },
                   { input: '維護頻率', module: 'Maintenance', impact: 'B2-B4 排放' },
                   { input: '評估年限', module: 'Boundary', impact: '所有累積結果' },
                   { input: '納入/排除項目', module: 'Boundary', impact: '計算邊界' },
                 ].map((row, i) => (
                   <tr key={i} className="hover:bg-white/5 transition-colors group">
                     <td className="py-3 px-3 font-bold text-ink">{row.input}</td>
                     <td className="py-3 px-3 text-primary font-bold uppercase">{row.module}</td>
                     <td className="py-3 px-3 text-secondary italic opacity-80">{row.impact}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="資料流 Data Flow" icon={Zap}>
           <div className="space-y-1">
             {[
               'Boundary 邊界設定', 'Site Data 基地條件', 'BOQ 工程數量', 'Materials 材料係數', 'Vegetation 植栽碳匯',
               'Soil 土壤碳', 'Maintenance 維護碳排', 'Engine 整合計算', 'Scenario 情境比較', 'Reporting 報表輸出'
             ].map((flow, i) => (
               <div key={i} className="flex flex-col items-center">
                 <div className="w-full py-2 px-3 bg-white/5 rounded-lg border border-white/5 text-[13px] text-secondary text-center hover:bg-primary/10 hover:text-primary transition-all cursor-default">
                    {flow}
                 </div>
                 {i < 9 && <div className="h-2 border-l border-white/10 my-0.5" />}
               </div>
             ))}
           </div>
        </Card>

        <Card title="輸出結果 Engine Outputs" icon={TrendingUp}>
           <div className="grid grid-cols-1 gap-2">
              {[
                '生命週期總碳排', '各階段碳排分析', '植栽碳匯總量', '土壤碳匯潛力', '淨碳排放曲線', '碳抵平預估年份', '工程材料碳熱點', '數據來源可信度'
              ].map(output => (
                <div key={output} className="flex items-center gap-2 text-[13px] p-2 bg-white/5 rounded-lg border border-white/5">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-secondary">{output}</span>
                </div>
              ))}
           </div>
        </Card>

        <Card title="不確定性與敏感度" icon={AlertCircle}>
          <div className="space-y-4">
             <div className="space-y-2">
                {[
                  { label: '植栽成活率', impact: '抵平年份/累積碳匯' },
                  { label: '材料碳係數', impact: 'A1-A3 排放' },
                  { label: '材料運距', impact: 'A4 運輸' },
                  { label: '維護頻率', impact: 'B2-B4 排放' },
                  { label: '土壤碳變化率', impact: '長期累積碳匯' },
                ].map(item => (
                  <div key={item.label} className="text-[13px] flex justify-between bg-white/5 p-2 rounded-lg">
                    <span className="text-secondary">{item.label}</span>
                    <span className="text-accent font-bold">敏感度高</span>
                  </div>
                ))}
             </div>
             <p className="text-[13px] text-secondary/60 leading-relaxed italic border-t border-white/5 pt-3">
               「Engine v0.1 使用中位情境與 mock data，結果應視為設計階段敏感度模擬，而非正式查證結果。」
             </p>
          </div>
        </Card>

        <Card title="資料可信度 Data Confidence" icon={ShieldCheck}>
           <div className="space-y-4">
              <div className="flex flex-col items-center p-4 bg-primary/10 rounded-2xl border border-primary/20">
                 <div className="text-[13px] uppercase font-bold text-secondary mb-1">目前平均可信度</div>
                 <div className="text-4xl font-black text-primary">B-</div>
              </div>
              <ul className="text-[13px] space-y-2">
                <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">材料係數</span><span className="text-ink font-bold">部分 Mock</span></li>
                <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">植栽模型</span><span className="text-ink font-bold">簡化生長曲線</span></li>
                <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-secondary">土壤模型</span><span className="text-ink font-bold">簡化 SOC</span></li>
                <li className="flex justify-between"><span className="text-secondary">維護模型</span><span className="text-ink font-bold">情境假設</span></li>
              </ul>
           </div>
        </Card>

        <Card title="方法論限制 Method Limits" icon={Info}>
           <div className="space-y-3 text-[13px] text-secondary leading-relaxed italic opacity-70">
              <p>• 本頁為 Prototype v0.1 計算邏輯</p>
              <p>• 未接入正式 EPD / 官方係數庫</p>
              <p>• 未進行第三方查證</p>
              <p>• 植栽與土壤模型需依現地資料校正</p>
              <p>• 木材生物碳、外部抵換與 D 階段效益需依 Boundary 設定才可納入</p>
           </div>
        </Card>
      </div>
    </div>
  </div>
);

export default Engine;
