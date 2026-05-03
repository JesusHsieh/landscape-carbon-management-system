import type { ScenarioOption } from '../../types';

export const defaultScenarios: ScenarioOption[] = [
  { id: 'baseline',      name: 'Baseline',        initialCarbonReduction: 0,   sinkMultiplier: 1.0, maintenanceMultiplier: 1.0 },
  { id: 'low_carbon',    name: 'Low Carbon',       initialCarbonReduction: 18,  sinkMultiplier: 1.1, maintenanceMultiplier: 0.87 },
  { id: 'nature_positive', name: 'Nature Positive', initialCarbonReduction: 25, sinkMultiplier: 1.67, maintenanceMultiplier: 0.5 },
];
