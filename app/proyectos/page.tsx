"use client";

import { TopBar } from "@/app/components/layout/TopBar";
import { DataTable } from "@/app/components/dashboard/DataTable";
import { useSheetData } from "@/hooks/useSheets";

const POLL = parseInt(process.env.NEXT_PUBLIC_POLL_INTERVAL ?? "15000", 10);

export default function ProyectosPage() {
  const { data, headers, lastUpdated, isLoading, totalRows, refresh } =
    useSheetData("Sheet1", POLL);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar
        title="Proyectos"
        lastUpdated={lastUpdated}
        isLoading={isLoading}
        onRefresh={refresh}
      />
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-white">Proyectos activos</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {totalRows.toLocaleString()} registros · sincronizado desde Google Sheets
          </p>
        </div>
        <DataTable data={data} headers={headers} isLoading={isLoading} />
      </div>
    </div>
  );
}
