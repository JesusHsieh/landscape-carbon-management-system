import type { BOQItem, BOQSummary } from '../../types';

export const defaultBOQItems: BOQItem[] = [
  { id: 1, cat: '鋪面', item: '花崗石鋪面', material: '花崗石', qty: '1200', unit: 'm²', dist: '450', carbon: '420', conf: 'A' },
  { id: 2, cat: '鋪面', item: '透水磚鋪面', material: '再生混凝土磚', qty: '2400', unit: 'm²', dist: '45', carbon: '188', conf: 'B' },
  { id: 3, cat: '結構', item: '混凝土鋪面', material: 'C210混凝土', qty: '800', unit: 'm²', dist: '30', carbon: '310', conf: 'B' },
  { id: 4, cat: '結構', item: 'RC 板', material: 'RC', qty: '150', unit: 'm', dist: '50', carbon: '98', conf: 'C' },
  { id: 5, cat: '鋪面', item: '木平台', material: '防腐松木', qty: '350', unit: 'm²', dist: '120', carbon: '-45', conf: 'B' },
];

export const defaultBOQSummary: BOQSummary = {
  estimatedBOQCarbon: 910,
  hardscapeArea: 4750,
  concreteVolume: 320,
  stonePavingArea: 1200,
  timberArea: 350,
  transportDistanceAverage: 139,
};
