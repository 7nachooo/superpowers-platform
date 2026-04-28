"use client";

import { useState } from "react";
import { TopBar } from "./components/layout/TopBar";
import { KPIGrid } from "./components/dashboard/KPIGrid";
import { DataTable } from "./components/dashboard/DataTable";
import { useSheetData } from "@/hooks/useSheets";

const POLL = parseInt(process.env.NEXT_PUBLIC_POLL_INTERVAL ?? "15000", 10);

// Cambia "Hoja1" por el nombre real de tu hoja principal
const DEFAULT_SHEET = process.env.NEXT_PUBLIC_DEFAULT_SHEET ?? "Hoja1";

export default function Dashboard() {
  const [activeSheet, setActiveSheet] = useState(DEFAULT_SHEET);
  const { data, headers, lastUpdated, isLoading, totalRows, refresh } =
    useSheetData(activeSheet, POLL);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar
        title="Dashboard"
        lastUpdated={lastUpdated}
        isLoading={isLoading}
        onRefresh={refresh}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI Cards */}
        <KPIGrid />

        {/* Table header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">
              Datos en tiempo real
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {totalRows.toLocaleString()} filas · Google Sheets → Polling cada {POLL / 1000}s
            </p>
          </div>
        </div>

        {/* Main data table */}
        <DataTable data={data} headers={headers} isLoading={isLoading} />
      </div>
    </div>
  );
}
