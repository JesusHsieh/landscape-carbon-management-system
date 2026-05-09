import {
  LayoutDashboard,
  Box,
  Map,
  ClipboardList,
  Factory,
  Trees,
  Layers,
  Wrench,
  Calculator,
  Compass,
  TrendingDown,
  FileText,
  Info,
  Database,
  ShieldCheck,
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: '專案總覽 Dashboard', icon: LayoutDashboard },
  { id: 'boundary', label: '專案邊界 Boundary', icon: Box },
  { id: 'site', label: '基地資料 Site Data', icon: Map },
  { id: 'boq', label: '工程數量 BOQ', icon: ClipboardList },
  { id: 'materials', label: '材料碳排 Materials', icon: Factory },
  { id: 'vegetation', label: '植栽碳匯 Vegetation', icon: Trees },
  { id: 'soil', label: '土壤碳 Soil', icon: Layers },
  { id: 'maintenance', label: '維護碳排 Maintenance', icon: Wrench },
  { id: 'engine', label: '碳排計算 Engine', icon: Calculator },
  { id: 'scenario', label: '情境比較 Scenario', icon: Compass },
  { id: 'reduction', label: '減碳策略 Reduction', icon: TrendingDown },
  { id: 'reporting', label: '報表輸出 Reporting', icon: FileText },
  { id: 'sources', label: '資料來源 Sources', icon: Info },
  { id: 'input', label: '數據輸入 Data Input', icon: Database },
  { id: 'admin', label: '系統狀態 System Status', icon: ShieldCheck },
] as const;

export type NavId = typeof NAV_ITEMS[number]['id'];
