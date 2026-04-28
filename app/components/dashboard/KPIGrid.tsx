"use client";

import { KPICard } from "./KPICard";
import { useKPIs } from "@/hooks/useSheets";

const POLL = parseInt(process.env.NEXT_PUBLIC_POLL_INTERVAL ?? "15000", 10);

export function KPIGrid() {
  const { kpis, isLoading } = useKPIs(POLL);

  if (!isLoading && kpis.length === 0) return null;

  const items = isLoading && kpis.length === 0
    ? Array.from({ length: 3 }, (_, i) => ({
        label: "",
        value: 0,
        icon: "hash",
        _placeholder: true,
        _id: i,
      }))
    : kpis;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((kpi, i) => (
        <KPICard key={"_id" in kpi ? kpi._id : i} kpi={kpi} loading={isLoading} />
      ))}
    </div>
  );
}
