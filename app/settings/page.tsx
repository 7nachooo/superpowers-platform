"use client";

import { TopBar } from "@/app/components/layout/TopBar";
import { Settings, Database, RefreshCw, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar title="Ajustes" lastUpdated={null} isLoading={false} onRefresh={() => {}} />
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-2xl">

        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Database size={18} className="text-orange-400" />
            <h3 className="text-sm font-semibold text-white">Fuente de datos</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Spreadsheet ID</span>
              <span className="text-slate-300 font-mono text-xs truncate max-w-[200px]">
                {process.env.NEXT_PUBLIC_SHEET_ID ?? "Configurado en servidor"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Hoja activa</span>
              <span className="text-slate-300">{process.env.NEXT_PUBLIC_DEFAULT_SHEET ?? "Sheet1"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Proveedor</span>
              <span className="text-green-400">Google Sheets API v4</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw size={18} className="text-orange-400" />
            <h3 className="text-sm font-semibold text-white">Actualización en tiempo real</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Intervalo de polling</span>
              <span className="text-slate-300">{(parseInt(process.env.NEXT_PUBLIC_POLL_INTERVAL ?? "15000") / 1000)}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Método</span>
              <span className="text-slate-300">SWR polling + cache TTL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Base de datos</span>
              <span className="text-orange-400 font-medium">Sin Supabase</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={18} className="text-orange-400" />
            <h3 className="text-sm font-semibold text-white">Autenticación</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Método</span>
              <span className="text-slate-300">Service Account (Google Cloud)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Permisos</span>
              <span className="text-slate-300">Viewer (solo lectura)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estado</span>
              <span className="text-green-400">● Conectado</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
