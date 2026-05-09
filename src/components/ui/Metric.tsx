import { cn } from '../../lib/utils';

interface MetricProps {
  label: string;
  value: string;
  unit: string;
  trend?: string;
  color?: string;
  [key: string]: any;
}

const Metric = ({ label, value, unit, trend, color = "text-accent" }: MetricProps) => (
  <div className="bg-card-bg p-5 rounded-2xl border border-card-border shadow-lg">
    <p className="text-[13px] uppercase tracking-widest font-bold text-secondary mb-1">{label}</p>
    <div className="flex items-baseline gap-1">
      <h4 className={cn("text-2xl font-bold", color)}>{value}</h4>
      <span className="text-[13px] text-secondary/60 font-medium">{unit}</span>
    </div>
    {trend && <div className="mt-2 text-[13px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-full w-fit">{trend}</div>}
  </div>
);

export default Metric;
