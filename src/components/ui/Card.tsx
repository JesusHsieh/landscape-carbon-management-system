import React from 'react';
import { cn } from '../../lib/utils';

const Card = ({ title, icon: Icon, children, className }: { title: string; icon?: any; children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-card-bg border border-card-border shadow-xl rounded-[20px] overflow-hidden", className)}>
    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
      <h3 className="text-sm font-bold text-primary/90">{title}</h3>
      {Icon && <Icon className="w-4 h-4 text-secondary/20" />}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

export default Card;
