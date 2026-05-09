import * as mock from '../data/mockData';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import { cn } from '../lib/utils';
import { Info, AlertCircle, Activity } from 'lucide-react';

const Boundary = () => (
  <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
    <SectionHeading title="專案邊界與評估設定" subtitle="定義系統評價範疇與時間尺度" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card title="基本設定">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[13px] text-secondary font-bold uppercase">專案名稱</label>
              <input type="text" defaultValue={mock.mockProject.name} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-ink outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] text-secondary font-bold uppercase">評估年限</label>
              <select defaultValue="30 年" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-ink outline-none">
                <option>10 年</option><option>20 年</option><option>30 年</option><option>50 年</option>
              </select>
            </div>
          </div>
        </Card>
        <Card title="生命週期階段 (LCA Stages)">
          <div className="grid grid-cols-2 gap-4">
            {mock.mockProject.boundary.modules.map(mod => (
              <div key={mod.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/50 transition-all">
                <span className="text-[13px] text-ink">{mod.label}</span>
                <div className={cn("w-10 h-5 rounded-full relative transition-colors p-1", mod.active ? "bg-primary" : "bg-white/10")}>
                  <div className={cn("w-3 h-3 bg-white rounded-full transition-all", mod.active ? "ml-5" : "ml-0")} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card title="邊界摘要狀態" className="h-fit">
        <div className="space-y-6">
          <p className="text-[13px] text-secondary leading-relaxed border-b border-white/10 pb-4 italic">
            「本評估以台北數位森林公園全區為對象，採 30 年 Cradle-to-Grave 邊界，納入材料、施工、維護、營運、退役及植栽 / 土壤碳匯，並以 Prototype Mock Data 進行設計階段模擬。」
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <div className="text-[13px] uppercase font-bold text-primary mb-1">評估深度</div>
              <div className="text-lg font-bold text-primary">Cradle-to-Grave</div>
            </div>
            <ul className="text-[13px] space-y-3">
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">評估目的</span><span className="text-ink font-bold">設計階段模擬</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">評估年限</span><span className="text-ink font-bold">30 年</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">計算對象</span><span className="text-ink font-bold">台北數位森林公園全區</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">功能單位</span><span className="text-ink font-bold">整體基地</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">納入碳匯</span><span className="text-primary font-bold">植栽 / 土壤</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">地理邊界</span><span className="text-ink font-bold">基地地籍線</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-secondary">數據來源</span><span className="text-accent underline font-bold transition-all hover:opacity-80">Mock v0.1</span></li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="text-[13px] uppercase font-bold text-secondary tracking-widest">納入 / 排除項目 Summary</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-[13px] text-primary font-bold uppercase">納入 (Included)</div>
                <ul className="text-[13px] text-secondary space-y-1 list-disc list-inside">
                  <li>A1-A3 材料生產</li>
                  <li>A4 材料運輸</li>
                  <li>A5 施工安裝</li>
                  <li>B2-B4 維護修繕</li>
                  <li>B6-B7 營運能源</li>
                  <li>C 退役處理</li>
                  <li>植栽 / 土壤碳匯</li>
                </ul>
              </div>
              <div className="space-y-1">
                <div className="text-[13px] text-accent font-bold uppercase">排除 (Excluded)</div>
                <ul className="text-[13px] text-secondary space-y-1 list-disc list-inside opacity-60">
                  <li>外部碳抵換</li>
                  <li>熱島降溫效益</li>
                  <li>第三方查證庫</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-[13px] uppercase font-bold text-secondary tracking-widest">適用層級 Applicability</div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-secondary">使用狀態</span>
                <span className="text-primary font-bold">Prototype / Demo</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-secondary">適用用途</span>
                <span className="text-ink">設計比較 / 業主簡報</span>
              </div>
              <div className="text-[13px] text-accent italic opacity-80 leading-tight">
                * 限制：不可作為第三方查證或正式碳權申請依據
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-[13px] uppercase font-bold text-secondary tracking-widest">不確定性提示</div>
            <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl space-y-1.5">
              {[
                "部分材料係數為示範值",
                "植栽成活率採中位假設",
                "土壤碳模型為簡化版",
                "維護頻率尚未校正"
              ].map((t, i) => (
                <div key={i} className="flex gap-2 items-start text-[13px] text-accent/80">
                  <span className="mt-1 w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default Boundary;
