/**
 * NCMS Project Store
 * React Context + useReducer — no backend, no API, no database.
 * Prototype only. Data persisted to localStorage for demo purposes.
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { ProjectState, ComputedValues, BOQItem, CarbonFactor, VegetationRow } from '../types';
import { defaultProject } from '../data/defaults/defaultProject';
import { defaultBoundary } from '../data/defaults/defaultBoundary';
import { defaultBOQItems, defaultBOQSummary } from '../data/defaults/defaultBOQ';
import { defaultVegetation } from '../data/defaults/defaultVegetation';
import { defaultSoil } from '../data/defaults/defaultSoil';
import { defaultMaintenance } from '../data/defaults/defaultMaintenance';
import { defaultFactors } from '../data/defaults/defaultFactors';
import { computeValues } from '../utils/carbonCalculations';

const STORAGE_KEY = 'ncms_project_v1';

const defaultState: ProjectState = {
  projectInfo: defaultProject,
  lcaBoundary: defaultBoundary,
  boqItems: defaultBOQItems,
  boqSummary: defaultBOQSummary,
  carbonFactors: defaultFactors,
  vegetationInput: defaultVegetation,
  soilInput: defaultSoil,
  maintenanceInput: defaultMaintenance,
  dataSource: 'mock',
  lastSaved: null,
};

// ---------- Actions ----------

type Action =
  | { type: 'SET_PROJECT_INFO'; payload: Partial<ProjectState['projectInfo']> }
  | { type: 'SET_LCA_BOUNDARY'; payload: Partial<ProjectState['lcaBoundary']> }
  | { type: 'SET_LAST_SAVED'; payload: string }
  | { type: 'SET_BOQ_SUMMARY'; payload: Partial<ProjectState['boqSummary']> }
  | { type: 'ADD_BOQ_ITEM' }
  | { type: 'UPDATE_BOQ_ITEM'; id: number; field: keyof BOQItem; value: string }
  | { type: 'DELETE_BOQ_ITEM'; id: number }
  | { type: 'SET_VEGETATION'; payload: Partial<Omit<ProjectState['vegetationInput'], 'rows'>> }
  | { type: 'UPDATE_VEG_ROW'; index: number; field: keyof VegetationRow; value: string }
  | { type: 'SET_SOIL'; payload: Partial<ProjectState['soilInput']> }
  | { type: 'SET_MAINTENANCE'; payload: Partial<ProjectState['maintenanceInput']> }
  | { type: 'ADD_FACTOR' }
  | { type: 'UPDATE_FACTOR'; index: number; field: keyof CarbonFactor; value: string }
  | { type: 'DELETE_FACTOR'; index: number }
  | { type: 'RESET_TO_DEFAULTS' }
  | { type: 'LOAD_FROM_STORAGE'; payload: ProjectState };

// ---------- Reducer ----------

function reducer(state: ProjectState, action: Action): ProjectState {
  switch (action.type) {
    case 'SET_PROJECT_INFO':
      return {
        ...state,
        projectInfo: { ...state.projectInfo, ...action.payload },
        dataSource: 'user-partial',
      };

    case 'SET_LCA_BOUNDARY':
      return {
        ...state,
        lcaBoundary: { ...state.lcaBoundary, ...action.payload },
        dataSource: 'user-partial',
      };

    case 'SET_BOQ_SUMMARY':
      return {
        ...state,
        boqSummary: { ...state.boqSummary, ...action.payload },
        dataSource: 'user-partial',
      };

    case 'ADD_BOQ_ITEM': {
      const newId = state.boqItems.length > 0 ? Math.max(...state.boqItems.map(r => r.id)) + 1 : 1;
      return {
        ...state,
        boqItems: [...state.boqItems, { id: newId, cat: '', item: '', material: '', qty: '', unit: 'm²', dist: '', carbon: '', conf: 'C' }],
        dataSource: 'user-partial',
      };
    }

    case 'UPDATE_BOQ_ITEM':
      return {
        ...state,
        boqItems: state.boqItems.map(r => r.id === action.id ? { ...r, [action.field]: action.value } : r),
        dataSource: 'user-partial',
      };

    case 'DELETE_BOQ_ITEM':
      return {
        ...state,
        boqItems: state.boqItems.filter(r => r.id !== action.id),
        dataSource: 'user-partial',
      };

    case 'SET_VEGETATION':
      return {
        ...state,
        vegetationInput: { ...state.vegetationInput, ...action.payload },
        dataSource: 'user-partial',
      };

    case 'UPDATE_VEG_ROW':
      return {
        ...state,
        vegetationInput: {
          ...state.vegetationInput,
          rows: state.vegetationInput.rows.map((r, i) =>
            i === action.index ? { ...r, [action.field]: action.value } : r
          ),
        },
        dataSource: 'user-partial',
      };

    case 'SET_SOIL':
      return {
        ...state,
        soilInput: { ...state.soilInput, ...action.payload },
        dataSource: 'user-partial',
      };

    case 'SET_MAINTENANCE':
      return {
        ...state,
        maintenanceInput: { ...state.maintenanceInput, ...action.payload },
        dataSource: 'user-partial',
      };

    case 'ADD_FACTOR':
      return {
        ...state,
        carbonFactors: [...state.carbonFactors, { name: '', value: '', unit: '', source: '' }],
        dataSource: 'user-partial',
      };

    case 'UPDATE_FACTOR':
      return {
        ...state,
        carbonFactors: state.carbonFactors.map((f, i) =>
          i === action.index ? { ...f, [action.field]: action.value } : f
        ),
        dataSource: 'user-partial',
      };

    case 'DELETE_FACTOR':
      return {
        ...state,
        carbonFactors: state.carbonFactors.filter((_, i) => i !== action.index),
        dataSource: 'user-partial',
      };

    case 'SET_LAST_SAVED':
      return { ...state, lastSaved: action.payload };

    case 'RESET_TO_DEFAULTS':
      return { ...defaultState, lastSaved: null };

    case 'LOAD_FROM_STORAGE':
      return { ...action.payload };

    default:
      return state;
  }
}

// ---------- Context ----------

interface ProjectContextValue {
  state: ProjectState;
  dispatch: React.Dispatch<Action>;
  computed: ComputedValues;
  save: () => void;
  load: () => boolean;
  reset: () => void;
  clear: () => void;
  hasDraft: boolean;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const computed = computeValues(state);
  const hasDraft = !!localStorage.getItem(STORAGE_KEY);

  const save = useCallback(() => {
    const timestamp = new Date().toISOString();
    const toSave: ProjectState = { ...state, lastSaved: timestamp };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    dispatch({ type: 'SET_LAST_SAVED', payload: timestamp });
  }, [state]);

  const load = useCallback((): boolean => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw) as ProjectState;
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed });
      return true;
    } catch {
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET_TO_DEFAULTS' });
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET_TO_DEFAULTS' });
  }, []);

  return (
    <ProjectContext.Provider value={{ state, dispatch, computed, save, load, reset, clear, hasDraft }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject(): ProjectContextValue {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used inside <ProjectProvider>');
  return ctx;
}
