"use client";

import useSWR from "swr";
import type { SheetResponse, KPIsResponse } from "@/types/sheets";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });

export function useSheetData(sheetName: string, refreshInterval = 15000) {
  const { data, error, isLoading, mutate } = useSWR<SheetResponse>(
    `/api/sheets/${encodeURIComponent(sheetName)}`,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  return {
    data: data?.data ?? [],
    headers: data?.headers ?? [],
    lastUpdated: data?.lastUpdated ?? null,
    totalRows: data?.totalRows ?? 0,
    sheetName: data?.sheetName ?? sheetName,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useKPIs(refreshInterval = 15000) {
  const { data, error, isLoading, mutate } = useSWR<KPIsResponse>(
    "/api/kpis",
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  return {
    kpis: data?.kpis ?? [],
    lastUpdated: data?.lastUpdated ?? null,
    isLoading,
    error,
    refresh: mutate,
  };
}
