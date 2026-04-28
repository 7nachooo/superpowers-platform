"use client";

import { TopBar } from "@/app/components/layout/TopBar";
import { KPIGrid } from "@/app/components/dashboard/KPIGrid";
import { useSheetData } from "@/hooks/useSheets";

const POLL = parseInt(process.env.NEXT_PUBLIC_POLL_INTERVAL ?? "15000", 10);

export default function ReportesPage() {
  const { lastUpdated, isLoading, refresh, totalRows } = useSheetData("Sheet1", POLL);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar
        title="Reportes"
        lastUpdated={lastUpdated}
        isLoading={isLoading}
        onRefresh={refresh}
      />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-white">Métricas generales</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Calculado en tiempo real sobre {totalRows.toLocaleString()} registros en Sheets
          </p>
        </div>
        <KPIGrid />
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Exportar reporte</h3>
          <p className="text-sm text-slate-400 mb-4">
            Descarga todos los datos actuales desde la vista de Clientes.
          </p>
          <a
            href="/clientes"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
          >
            Ir a Clientes → Exportar CSV
          </a>
        </div>
      </div>
    </div>
  );
}
