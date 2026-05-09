import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ReferenceLine, BarChart, Bar } from 'recharts';
import { Activity, ShieldCheck, Info, Layers, AlertCircle, Zap, Box } from 'lucide-react';
import * as mock from '../data/mockData';
import { cn } from '../lib/utils';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';

const Vegetation = () => (
  <div className="space-y-6 animate-in zoom-in-95 duration-500">
    <SectionHeading title="植栽碳匯與生長模擬" subtitle="Biomass Sequestration & Growth Modeling" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[13px] uppercase tracking-widest font-bold text-secondary mb-1">新植喬木</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">142</h4>
          <span className="text-[13px] text-secondary/60">株</span>
        </div>
        <p className="text-[13px] text-secondary/60 mt-1">含大/中喬木，依中位成活率模擬</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[13px] uppercase tracking-widest font-bold text-secondary mb-1">既有保留</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">86</h4>
          <span className="text-[13px] text-secondary/60">株</span>
        </div>
        <p className="text-[13px] text-secondary/60 mt-1">成熟樹碳庫與遮蔭資產</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[13px] uppercase tracking-widest font-bold text-secondary mb-1">30 年累積碳匯</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">1,720</h4>
          <span className="text-[13px] text-secondary/60">tCO2e</span>
        </div>
        <p className="text-[13px] text-secondary/60 mt-1">含新增與既有增量，未含土壤碳</p>
      </div>
      <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
        <p className="text-[13px] uppercase tracking-widest font-bold text-secondary mb-1">年平均碳匯</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-bold text-primary">42.8</h4>
          <span className="text-[13px] text-secondary/60">tCO2e/yr</span>
        </div>
        <p className="text-[13px] text-secondary/60 mt-1">非固定年值，為 30 年平均</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <Card title="30 年植栽固碳曲線 (分情境預測)" icon={Activity}>
          <div className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer debounce={50} width="100%" height="100%">
                <AreaChart data={mock.netCarbonCurve}>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#A8B8A0' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#A8B8A0' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1D2319', border: 'none' }} labelStyle={{ fontSize: '13px' }} itemStyle={{ fontSize: '13px' }} />
                  <Legend verticalAlign="top" align="right" iconSize={8} wrapperStyle={{ fontSize: '13px', paddingBottom: '10px' }} />
                  <Area type="monotone" name="累積植栽碳匯" dataKey="累積碳匯" stroke="#7E9B71" fill="#7E9B71" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" name="累積生命週期排放參考線" dataKey="累積排放" stroke="#BC6C25" fill="transparent" strokeDasharray="5 5" />
                  <ReferenceLine x={24} stroke="#DDA15E" strokeDasharray="3 3" label={{ position: 'top', value: '碳匯抵平參考點', fill: '#DDA15E', fontSize: 13 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[13px] text-secondary/60 italic text-center px-6">
              「植栽碳匯為逐年累積結果，前期成長較慢，5–15 年後碳匯增幅提高，實際結果將受樹種、生長環境、成活率、修剪與維護方式影響。」
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="既有樹保留效益 Existing Tree Value" icon={ShieldCheck}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-[13px]">
                  <div><span className="text-secondary block">既有保留喬木</span><span className="text-ink font-bold">86 株</span></div>
                  <div><span className="text-secondary block">建議優先保留</span><span className="text-primary font-bold">72 株</span></div>
                  <div><span className="text-secondary block">成熟樹冠覆蓋</span><span className="text-ink font-bold">18%</span></div>
                  <div><span className="text-secondary block">移植 / 移除風險</span><span className="text-accent font-bold">中</span></div>
              </div>
              <p className="text-[13px] text-secondary leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                既有成熟喬木應作為既有碳庫、遮蔭效益與生態棲地資產管理。保留成熟樹通常比新植樹更能降低短中期碳匯不確定性。
              </p>
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-[13px] text-primary italic">
                * 方法論提醒：既有樹保留可視為既有碳庫保存與未來增量碳匯，但不應將既有生物量全部重複計入新碳匯。
              </div>
            </div>
          </Card>

          <Card title="主要植栽類型碳匯貢獻" icon={Box}>
            <div className="h-64">
              <ResponsiveContainer debounce={50} width="100%" height="100%">
                <BarChart layout="vertical" data={mock.boqData.vegetation}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#A8B8A0' }} />
                  <Bar dataKey="sink30" fill="#7E9B71" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card title="碳匯模型摘要 Model" icon={Info}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3 text-[13px]">
                <span className="text-secondary">評估年限</span><span className="text-ink font-bold text-right">30 年</span>
                <span className="text-secondary">新植成活率</span><span className="text-primary font-bold text-right">88%</span>
                <span className="text-secondary">既有保留率</span><span className="text-primary font-bold text-right">84%</span>
                <span className="text-secondary">平均補植率</span><span className="text-secondary font-bold text-right">3% / 年</span>
                <span className="text-secondary">模型情境</span><span className="text-ink font-bold text-right">中位情境</span>
            </div>
            <p className="text-[13px] text-secondary/60 leading-relaxed italic border-t border-white/5 pt-3">
              「本頁碳匯為 30 年植栽生長模擬結果，採中位成活率與簡化生長曲線，尚未依單株樹木調查或現地生長監測校正。」
            </p>
          </div>
        </Card>

        <Card title="植栽結構 Planting Structure" icon={Layers}>
           <div className="space-y-2">
              {[
                { label: '大喬木', val: '36%', desc: '長期主力碳匯' },
                { label: '中喬木', val: '28%', desc: '中期穩定碳匯' },
                { label: '小喬木', val: '16%', desc: '空間補足' },
                { label: '灌木', val: '12%', desc: '多層次生態' },
                { label: '地被', val: '6%', desc: '土壤保護' },
                { label: '草坪', val: '2%', desc: '低碳匯高維護' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 bg-white/5 rounded-lg text-[13px]">
                  <span className="text-secondary">{item.label} <span className="text-[8px] opacity-40 ml-1">{item.desc}</span></span>
                  <span className="text-primary font-bold">{item.val}</span>
                </div>
              ))}
           </div>
        </Card>

        <Card title="碳匯不確定性 Uncertainty" icon={AlertCircle}>
          <div className="space-y-3">
            {[
              "成活率下降會延後抵平年份",
              "修剪過度會降低年度碳匯",
              "颱風損失會降低碳庫並增加補植",
              "土壤壓實會使生長低於預期",
              "灌溉不足及病蟲害風險"
            ].map((u, i) => (
              <div key={i} className="flex gap-2 items-start text-[13px] text-accent/80">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                <span>{u}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="建議下一步 Next Actions" icon={Zap}>
          <div className="space-y-2">
            {[
              "檢查高碳匯樹種是否符合基地風險",
              "將草坪比例轉至 Maintenance 頁檢討",
              "前往 Soil 頁確認表土保留策略",
              "前往 Scenario 頁比較方案",
              "補充單株樹木調查提高可信度"
            ].map((action, i) => (
              <button key={i} className="w-full p-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-[13px] text-primary font-bold text-left transition-all">
                {action}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export default Vegetation;
