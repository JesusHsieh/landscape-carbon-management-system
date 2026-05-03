import type { CarbonFactor } from '../../types';

export const defaultFactors: CarbonFactor[] = [
  { name: '電力排碳係數', value: '0.495', unit: 'kgCO2e/kWh', source: '經濟部能源署 2023' },
  { name: '混凝土 EPD（C210）', value: '245', unit: 'kgCO2e/m³', source: '廠商提供' },
  { name: '樟樹固碳係數', value: '18.5', unit: 'kgCO2e/株/yr', source: '林務局研究' },
  { name: '土壤有機碳變化率', value: '0.42', unit: 'tC/ha/yr', source: '學術論文估算' },
  { name: '施工機具油耗', value: '2.65', unit: 'kgCO2e/L', source: '示範值 (Demo)' },
];
