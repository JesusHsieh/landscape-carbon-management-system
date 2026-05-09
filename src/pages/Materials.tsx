import { AlertCircle, Zap, Info, TrendingDown, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

const Materials = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <SectionHeading title="材料碳排與生命週期分析" subtitle="Embedded Carbon in Hardscape & Structures" />
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <Card title="材料碳排排行與各階段拆解" className="lg:col-span-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-white/10 text-secondary uppercase tracking-widest whitespace-nowrap">
                <th className="py-4 px-3">排名</th>
                <th className="py-4 px-3">材料名稱</th>
                <th className="py-4 px-3">分類</th>
                <th className="py-4 px-3">對應 BOQ</th>
                <th className="py-4 px-3">A1-A3</th>
                <th className="py-4 px-3">A4</th>
                <th className="py-4 px-3">A5</th>
                <th className="py-4 px-3">壽命</th>
                <th className="py-4 px-3 text-accent text-right">總排放 (tCO2e)</th>
                <th className="py-4 px-3">等級</th>
                <th className="py-4 px-3">替代方案</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'C210 混凝土', cat: '混凝土', boq: '基礎/路面', a13: 400, a4: 30, a5: 20, life: 50, carbon: 450, grade: 'A', alt: '低碳混凝土' },
                { name: '進口花崗石', cat: '石材', boq: '鋪面', a13: 320, a4: 90, a5: 10, life: 30, carbon: 420, grade: 'B', alt: '在地石材' },
                { name: '高壓水泥磚', cat: '鋪面磚', boq: '步道', a13: 150, a4: 15, a5: 15, life: 20, carbon: 180, grade: 'A', alt: '再生透水磚' },
                { name: '鋼筋', cat: '金屬', boq: '構造/擋土', a13: 105, a4: 5, a5: 10, life: 50, carbon: 120, grade: 'B', alt: '回收鋼材' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-3 text-secondary font-mono">{i + 1}</td>
                  <td className="py-4 px-3 font-bold text-ink">{row.name}</td>
                  <td className="py-4 px-3 text-secondary">{row.cat}</td>
                  <td className="py-4 px-3 text-secondary">{row.boq}</td>
                  <td className="py-4 px-3 text-secondary">{row.a13}</td>
                  <td className="py-4 px-3 text-secondary">{row.a4}</td>
                  <td className="py-4 px-3 text-secondary">{row.a5}</td>
                  <td className="py-4 px-3 text-secondary">{row.life}yr</td>
                  <td className="py-4 px-3 text-right font-bold text-accent">{row.carbon}</td>
                  <td className="py-4 px-3">
                    <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[13px] font-bold">{row.grade}</span>
                  </td>
                  <td className="py-4 px-3 text-primary/80 italic">{row.alt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="space-y-6">
        <Card title="材料熱點摘要 Hotspots" icon={AlertCircle}>
          <div className="space-y-3">
            <div className="flex justify-between text-[13px]"><span className="text-secondary">最高排放材料</span><span className="text-ink font-bold">C210 混凝土</span></div>
            <div className="flex justify-between text-[13px]"><span className="text-secondary">次高排放材料</span><span className="text-ink font-bold">進口花崗石</span></div>
            <div className="flex justify-between text-[13px]"><span className="text-secondary">前兩項合計占比</span><span className="text-accent font-bold">63%</span></div>
            <div className="flex justify-between text-[13px] border-t border-white/5 pt-2"><span className="text-secondary">主要熱點階段</span><span className="text-primary font-bold">A1-A3 生產</span></div>
            <div className="flex justify-between text-[13px]"><span className="text-secondary">次要熱點階段</span><span className="text-primary font-bold">A4 運輸</span></div>
          </div>
        </Card>

        <Card title="高量排優化對策" icon={Zap}>
          <div className="space-y-4">
            {[
              { label: '混凝土', alt: '低碳配方', saving: '-81 t' },
              { label: '花崗石', alt: '在地石材', saving: '-50 t' },
              { label: '水泥磚', alt: '再生透水', saving: '-27 t' },
              { label: '鋼筋', alt: '回收鋼材', saving: '-18 t' },
            ].map(opt => (
              <div key={opt.label} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[13px] text-secondary font-bold uppercase">{opt.label}</div>
                  <div className="text-[13px] text-ink">{opt.alt}</div>
                </div>
                <div className="text-primary font-bold text-[13px]">{opt.saving}</div>
              </div>
            ))}
            <button className="w-full py-3 bg-primary text-bg rounded-xl text-[13px] font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              套用所有減碳策略
            </button>
          </div>
        </Card>

        <Card title="材料替代效益預覽" icon={TrendingDown}>
           <div className="space-y-3">
              <div className="flex justify-between text-[13px]"><span className="text-secondary">基準方案總排</span><span className="text-ink">1,285 t</span></div>
              <div className="flex justify-between text-[13px]"><span className="text-secondary">減碳策略合計</span><span className="text-primary font-bold">-176 t</span></div>
              <div className="flex justify-between text-[13px] border-t border-white/5 pt-2"><span className="text-secondary">優化後總量</span><span className="text-primary font-black">1,109 t</span></div>
           </div>
        </Card>

        <Card title="係數信心等級 Factor" icon={Info}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-[13px]">
               <div><span className="text-secondary block">已建立係數</span><span className="text-ink font-bold">4 / 8</span></div>
               <div><span className="text-secondary block">平均可信度</span><span className="text-accent font-bold">B-</span></div>
               <div><span className="text-secondary block">Mock比例</span><span className="text-ink font-bold">50%</span></div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[13px] text-secondary">
               <span className="block font-bold mb-1 uppercase tracking-widest opacity-50">待補資料</span>
               木材、再生材料、施工損耗率
            </div>
          </div>
        </Card>

        <Card title="生命週期分析提醒" icon={FileText}>
          <div className="space-y-3 text-[13px] text-secondary/80 leading-relaxed italic">
            <p>• 材料碳排需拆分 A1-A3、A4、A5</p>
            <p>• 壽命不足評估年限者需納入 B4 更換</p>
            <p>• 木材生物碳儲存應與材料排放分開顯示</p>
            <p>• 資料來源：Mock / 產業平均 / 廠商資料</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export default Materials;
