/**
 * NCMS Carbon Calculation Utilities
 * PROTOTYPE SIMPLIFIED CALCULATIONS — not for regulatory, official, or third-party verification use.
 * Values are indicative only and based on simplified models.
 */

import type { ProjectState, ComputedValues } from '../types';

/**
 * Sum carbon from all BOQ line items.
 * Prototype: direct sum of user-entered values, no detailed lifecycle model.
 */
function sumBOQCarbon(state: ProjectState): number {
  const itemSum = state.boqItems.reduce((acc, r) => acc + (parseFloat(r.carbon) || 0), 0);
  // Fall back to summary field if items are empty
  return itemSum !== 0 ? itemSum : state.boqSummary.estimatedBOQCarbon;
}

/**
 * Prototype simplified calculation:
 * totalInitialCarbon = BOQ carbon (A1-A5 combined estimate)
 */
function calcTotalInitialCarbon(state: ProjectState): number {
  return Math.max(0, sumBOQCarbon(state));
}

/**
 * Prototype simplified calculation:
 * totalSequestration30Y = vegetation 30yr + soil carbon potential
 */
function calcTotalSequestration30Y(state: ProjectState): number {
  const vegSink = state.vegetationInput.rows.reduce((acc, r) => acc + (parseFloat(r.sink30) || 0), 0);
  const vegTotal = vegSink > 0 ? vegSink : state.vegetationInput.thirtyYearSequestration;
  const soilTotal = state.lcaBoundary.soilCarbon ? state.soilInput.soilCarbonPotential : 0;
  const survivalFactor = state.vegetationInput.survivalRate / 100;
  return Math.round((vegTotal * survivalFactor + soilTotal) * 10) / 10;
}

/**
 * Prototype simplified calculation:
 * annualMaintenanceCarbon = selected scenario value
 */
function calcAnnualMaintenanceCarbon(state: ProjectState): number {
  return state.maintenanceInput.annualMaintenanceCarbon;
}

/**
 * Prototype simplified calculation:
 * netCarbon30Y = totalInitialCarbon + (annualMaintenance * years) - totalSequestration30Y
 */
function calcNetCarbon30Y(state: ProjectState, years: number, totalInitial: number, totalSink: number, annualMaint: number): number {
  const maintenanceTotal = annualMaint * years;
  return Math.round((totalInitial + maintenanceTotal - totalSink) * 10) / 10;
}

/**
 * Prototype simplified payback estimate:
 * If annualSequestration > annualMaintenanceCarbon,
 * paybackYear ≈ totalInitialCarbon / (annualSequestration - annualMaintenance)
 */
function calcPaybackYear(totalInitial: number, annualSink: number, annualMaint: number): number | null {
  const netAnnual = annualSink - annualMaint;
  if (netAnnual <= 0) return null; // never pays back
  const raw = totalInitial / netAnnual;
  return Math.ceil(raw);
}

function calcTotalTrees(state: ProjectState): number {
  const newTreeRows = state.vegetationInput.rows
    .filter(r => r.type.includes('喬木'))
    .reduce((acc, r) => acc + (parseInt(r.count) || 0), 0);
  const newTrees = newTreeRows > 0 ? newTreeRows : state.vegetationInput.newTrees;
  return newTrees + state.vegetationInput.preservedTrees;
}

function calcDataConfidence(state: ProjectState): string {
  if (state.dataSource === 'mock') return 'Demo';
  const demoFactors = state.carbonFactors.filter(f =>
    f.source.toLowerCase().includes('demo') || f.source.includes('示範')
  ).length;
  const total = state.carbonFactors.length || 1;
  const ratio = demoFactors / total;
  if (ratio > 0.5) return 'C';
  if (ratio > 0.2) return 'B-';
  if (demoFactors > 0) return 'B';
  return 'A-';
}

export function computeValues(state: ProjectState): ComputedValues {
  const years = state.projectInfo.assessmentYears;
  const totalInitialCarbon = calcTotalInitialCarbon(state);
  const totalSequestration30Y = calcTotalSequestration30Y(state);
  const annualMaint = calcAnnualMaintenanceCarbon(state);
  const annualSequestration = Math.round((totalSequestration30Y / years) * 10) / 10;
  const maintenanceCarbon30Y = Math.round(annualMaint * years * 10) / 10;
  const netCarbon30Y = calcNetCarbon30Y(state, years, totalInitialCarbon, totalSequestration30Y, annualMaint);
  const paybackYear = calcPaybackYear(totalInitialCarbon, annualSequestration, annualMaint);
  const totalTrees = calcTotalTrees(state);
  const dataConfidence = calcDataConfidence(state);

  return {
    totalInitialCarbon,
    totalSequestration30Y,
    maintenanceCarbon30Y,
    netCarbon30Y,
    paybackYear,
    annualSequestration,
    totalTrees,
    dataConfidence,
  };
}
