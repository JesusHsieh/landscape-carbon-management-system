import { useState, useCallback } from 'react';
import {
  searchEmissionFactors,
  isClimatiqConfigured,
  type ClimatiqFactor,
  type ClimatiqSearchParams,
} from '../services/climatiq';

interface UseClimatiqReturn {
  results: ClimatiqFactor[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  configured: boolean;
  search: (params: ClimatiqSearchParams) => Promise<void>;
  clear: () => void;
}

export function useClimatiq(): UseClimatiqReturn {
  const [results, setResults] = useState<ClimatiqFactor[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const search = useCallback(async (params: ClimatiqSearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchEmissionFactors(params);
      setResults(data.results);
      setTotalResults(data.total_results);
      setLastUpdated(data.last_updated ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResults([]);
    setTotalResults(0);
    setError(null);
    setLastUpdated(null);
  }, []);

  return {
    results,
    totalResults,
    loading,
    error,
    lastUpdated,
    configured: isClimatiqConfigured(),
    search,
    clear,
  };
}
