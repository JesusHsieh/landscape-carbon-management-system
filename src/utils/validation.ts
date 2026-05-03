/**
 * NCMS Input Validation Utilities
 * Prototype only — not for regulatory or third-party verification use
 */

import type { ProjectState } from '../types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateSiteArea(val: number): string | null {
  if (!val || val <= 0) return '基地面積必須大於 0 m²';
  if (val > 10_000_000) return '基地面積超出合理範圍（上限 10,000,000 m²）';
  return null;
}

export function validateAssessmentYears(val: number): string | null {
  if (![10, 20, 30, 50].includes(val)) return '評估年限必須為 10、20、30 或 50 年';
  return null;
}

export function validateSurvivalRate(val: number): string | null {
  if (isNaN(val) || val < 0 || val > 100) return '植栽存活率必須介於 0–100%';
  return null;
}

export function validateCarbonValue(val: number, label: string): string | null {
  if (isNaN(val)) return `${label} 不可為非數字值 (NaN)`;
  return null;
}

export function validateFactor(name: string, value: string, unit: string, source: string): string | null {
  if (!name.trim()) return '係數名稱不可為空';
  if (!unit.trim()) return `「${name}」缺少單位 — 標記為 Demo Only`;
  if (!source.trim()) return `「${name}」缺少資料來源 — 標記為 Demo Only`;
  if (isNaN(parseFloat(value)) && value.trim() !== '動態') return `「${name}」數值無效`;
  return null;
}

export function getDataConfidence(state: ProjectState): string {
  const hasUserData = state.dataSource !== 'mock';
  const factorCount = state.carbonFactors.length;
  const demoFactors = state.carbonFactors.filter(f => f.source.includes('示範') || f.source.includes('Demo')).length;

  if (!hasUserData) return 'Demo';
  if (demoFactors / factorCount > 0.5) return 'C';
  if (demoFactors / factorCount > 0.2) return 'B-';
  if (demoFactors > 0) return 'B';
  return 'A-';
}

export function validateProjectState(state: ProjectState): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const areaErr = validateSiteArea(state.projectInfo.siteAreaM2);
  if (areaErr) errors.push(areaErr);

  const yearsErr = validateAssessmentYears(state.projectInfo.assessmentYears);
  if (yearsErr) errors.push(yearsErr);

  const survivalErr = validateSurvivalRate(state.vegetationInput.survivalRate);
  if (survivalErr) errors.push(survivalErr);

  state.carbonFactors.forEach(f => {
    const err = validateFactor(f.name, f.value, f.unit, f.source);
    if (err) warnings.push(err);
  });

  if (state.boqSummary.estimatedBOQCarbon <= 0) {
    warnings.push('BOQ 碳排估算為 0 或負值，請確認輸入');
  }

  const conf = getDataConfidence(state);
  if (conf === 'C' || conf === 'Demo') {
    warnings.push('資料可信度不足 (Demo/C 級)，Reporting 僅供內部預覽');
  }

  return { valid: errors.length === 0, errors, warnings };
}
