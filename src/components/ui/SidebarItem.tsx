import { cn } from '../../lib/utils';

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
  [key: string]: any;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-[13px] font-medium border-l-4",
      active
        ? "bg-primary/10 text-primary border-primary shadow-[inset_0_0_12px_rgba(126,155,113,0.05)]"
        : "text-secondary hover:bg-white/5 hover:text-primary border-transparent"
    )}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

export default SidebarItem;
