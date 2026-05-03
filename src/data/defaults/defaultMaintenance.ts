import type { MaintenanceInput, MaintenanceScenario } from '../../types';

export const maintenanceScenarios: MaintenanceScenario[] = [
  { id: 'low',      label: '低維護情境（Low）',      annualCarbonTco2e: 2.8 },
  { id: 'medium',   label: '中等維護情境（Mid）',     annualCarbonTco2e: 4.2 },
  { id: 'high',     label: '高維護情境（High）',      annualCarbonTco2e: 7.1 },
  { id: 'baseline', label: '基準情境（Baseline）',    annualCarbonTco2e: 5.5 },
];

export const defaultMaintenance: MaintenanceInput = {
  selectedScenario: 'medium',
  annualMaintenanceCarbon: 4.2,
  irrigationIntensity: 'medium',
  mowingFrequency: '每月 2 次',
  pruningFrequency: '每季 1 次',
  replacementRate: 3,
};
