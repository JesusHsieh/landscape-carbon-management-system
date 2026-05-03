/**
 * NCMS TypeScript Types v0.1
 * Prototype only — not for third-party verification
 */

export interface ProjectInfo {
  projectName: string;
  projectCode: string;
  siteAreaM2: number;
  assessmentYears: 10 | 20 | 30 | 50;
  location: string;
  designStage: string;
  projectType: string;
}

export interface LCABoundary {
  a13: boolean;
  a4: boolean;
  a5: boolean;
  b24: boolean;
  b67: boolean;
  c: boolean;
  vegetationSequestration: boolean;
  soilCarbon: boolean;
  externalOffset: boolean;
  heatIslandIndirectBenefit: boolean;
}

export interface BOQItem {
  id: number;
  cat: string;
  item: string;
  material: string;
  qty: string;
  unit: string;
  dist: string;
  carbon: string;
  conf: string;
}

export interface BOQSummary {
  estimatedBOQCarbon: number;
  hardscapeArea: number;
  concreteVolume: number;
  stonePavingArea: number;
  timberArea: number;
  transportDistanceAverage: number;
}

export interface MaterialFactor {
  name: string;
  value: string;
  unit: string;
  source: string;
  grade: 'A' | 'B' | 'C' | 'Demo';
}

export interface VegetationRow {
  type: string;
  count: string;
  sink30: string;
}

export interface VegetationInput {
  rows: VegetationRow[];
  newTrees: number;
  preservedTrees: number;
  survivalRate: number;
  averageAnnualSequestration: number;
  thirtyYearSequestration: number;
  highSequestrationSpeciesRatio: number;
}

export interface SoilInput {
  topsoilPreservedArea: number;
  soilImprovementArea: number;
  organicMulchArea: number;
  soilCarbonPotential: number;
  compactionRisk: 'low' | 'medium' | 'high';
}

export interface MaintenanceScenario {
  id: string;
  label: string;
  annualCarbonTco2e: number;
}

export interface MaintenanceInput {
  selectedScenario: string;
  annualMaintenanceCarbon: number;
  irrigationIntensity: 'none' | 'low' | 'medium' | 'high';
  mowingFrequency: string;
  pruningFrequency: string;
  replacementRate: number;
}

export interface CarbonFactor {
  name: string;
  value: string;
  unit: string;
  source: string;
}

export interface ScenarioOption {
  id: string;
  name: string;
  initialCarbonReduction: number;
  sinkMultiplier: number;
  maintenanceMultiplier: number;
}

export interface ReportReadiness {
  boundary: 'complete' | 'partial' | 'mock';
  siteData: 'complete' | 'partial' | 'mock';
  boq: 'complete' | 'partial' | 'mock';
  materials: 'complete' | 'partial' | 'mock';
  vegetation: 'complete' | 'partial' | 'mock';
  soil: 'complete' | 'partial' | 'mock';
  maintenance: 'complete' | 'partial' | 'mock';
}

export interface ProjectState {
  projectInfo: ProjectInfo;
  lcaBoundary: LCABoundary;
  boqItems: BOQItem[];
  boqSummary: BOQSummary;
  carbonFactors: CarbonFactor[];
  vegetationInput: VegetationInput;
  soilInput: SoilInput;
  maintenanceInput: MaintenanceInput;
  dataSource: 'mock' | 'user-partial' | 'user';
  lastSaved: string | null;
}

export interface ComputedValues {
  totalInitialCarbon: number;
  totalSequestration30Y: number;
  maintenanceCarbon30Y: number;
  netCarbon30Y: number;
  paybackYear: number | null;
  annualSequestration: number;
  totalTrees: number;
  dataConfidence: string;
}
