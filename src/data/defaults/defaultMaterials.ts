import type { MaterialFactor } from '../../types';

export const defaultMaterials: MaterialFactor[] = [
  { name: '電力排碳係數', value: '0.495', unit: 'kgCO2e/kWh', source: '經濟部能源署', grade: 'A' },
  { name: '混凝土 C210 EPD', value: '245', unit: 'kgCO2e/m³', source: '廠商提供', grade: 'B' },
  { name: '花崗石鋪面', value: '350', unit: 'kgCO2e/m³', source: '學術論文估算', grade: 'C' },
  { name: '透水磚（再生骨材）', value: '180', unit: 'kgCO2e/m³', source: '示範值', grade: 'Demo' },
  { name: '防腐松木', value: '-130', unit: 'kgCO2e/m³', source: '林務局研究', grade: 'B' },
  { name: '施工機具耗能', value: '動態', unit: 'kgCO2e/hr', source: '學術論文', grade: 'C' },
];
