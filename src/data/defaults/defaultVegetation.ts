import type { VegetationInput } from '../../types';

export const defaultVegetation: VegetationInput = {
  rows: [
    { type: '大喬木', count: '42', sink30: '840' },
    { type: '中喬木', count: '68', sink30: '520' },
    { type: '灌木叢', count: '1200', sink30: '220' },
    { type: '草坪 / 地被', count: '4500', sink30: '45' },
  ],
  newTrees: 110,
  preservedTrees: 86,
  survivalRate: 88,
  averageAnnualSequestration: 54.2,
  thirtyYearSequestration: 1625,
  highSequestrationSpeciesRatio: 45,
};
