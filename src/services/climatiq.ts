/**
 * Climatiq API Service
 * Free tier: 500 requests/month
 * Docs: https://www.climatiq.io/docs
 */

const BASE_URL = 'https://api.climatiq.io';
const API_KEY = import.meta.env.VITE_CLIMATIQ_API_KEY as string | undefined;

// ---------- Types ----------

export interface ClimatiqFactor {
  activity_id: string;
  name: string;
  category: string;
  sector: string;
  source: string;
  source_dataset: string;
  year: number;
  region: string;
  region_name: string;
  unit_type: string[];
  unit: string;
  factor: number;
  factor_calculation_method: string;
  factor_calculation_origin: string;
  constituent_gases: {
    co2e_total: number | null;
    co2e_other: number | null;
    co2: number | null;
    ch4: number | null;
    n2o: number | null;
  };
}

export interface ClimatiqSearchResponse {
  results: ClimatiqFactor[];
  total_results: number;
  last_updated: string;
}

export interface ClimatiqSearchParams {
  query: string;
  data_version?: string;
  unit_type?: string;
  region?: string;
  year?: number;
  source?: string;
  results_per_page?: number;
}

// ---------- Helpers ----------

function getHeaders(): HeadersInit {
  if (!API_KEY) throw new Error('VITE_CLIMATIQ_API_KEY is not set');
  return {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };
}

function buildQuery(params: ClimatiqSearchParams): string {
  const q = new URLSearchParams();
  q.set('query', params.query);
  q.set('data_version', params.data_version ?? '^6');
  if (params.unit_type) q.set('unit_type', params.unit_type);
  if (params.region) q.set('region', params.region);
  if (params.year) q.set('year', String(params.year));
  if (params.source) q.set('source', params.source);
  q.set('results_per_page', String(params.results_per_page ?? 10));
  return q.toString();
}

// ---------- API Calls ----------

export async function searchEmissionFactors(
  params: ClimatiqSearchParams
): Promise<ClimatiqSearchResponse> {
  const url = `${BASE_URL}/data/v1/search?${buildQuery(params)}`;
  const res = await fetch(url, { headers: getHeaders() });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ?? `Climatiq API error: ${res.status}`
    );
  }

  return res.json() as Promise<ClimatiqSearchResponse>;
}

/** Check if API key is configured */
export function isClimatiqConfigured(): boolean {
  return !!API_KEY && API_KEY.length > 0;
}

/** Map a Climatiq result to our internal CarbonFactor shape */
export function toCarbonFactor(f: ClimatiqFactor) {
  return {
    name: f.name,
    value: String(f.factor),
    unit: `kgCO2e/${f.unit}`,
    source: `Climatiq · ${f.source} ${f.year} · ${f.region_name || f.region}`,
  };
}
