import { Hash, CheckCircle, Clock, TrendingUp, BarChart2, Users, AlertCircle } from "lucide-react";
import type { KPI } from "@/types/sheets";

const ICONS: Record<string, React.ReactNode> = {
  hash:         <Hash size={20} />,
  "check-circle": <CheckCircle size={20} />,
  clock:        <Clock size={20} />,
  trending:     <TrendingUp size={20} />,
  chart:        <BarChart2 size={20} />,
  users:        <Users size={20} />,
  alert:        <AlertCircle size={20} />,
};

interface Props {
  kpi: KPI;
  loading?: boolean;
}

export function KPICard({ kpi, loading }: Props) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:bg-slate-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400">{kpi.label}</p>
          {loading ? (
            <div className="mt-2 h-8 w-24 animate-pulse rounded bg-slate-700" />
          ) : (
            <p className="mt-1 text-3xl font-bold text-white">
              {typeof kpi.value === "number"
                ? kpi.value.toLocaleString()
                : kpi.value}
            </p>
          )}
        </div>
        {kpi.icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            {ICONS[kpi.icon] ?? <Hash size={20} />}
          </div>
        )}
      </div>
      {kpi.change !== undefined && (
        <p className={`mt-3 text-sm ${kpi.trend === "up" ? "text-green-400" : kpi.trend === "down" ? "text-red-400" : "text-slate-400"}`}>
          {kpi.trend === "up" ? "↑" : kpi.trend === "down" ? "↓" : "→"} {kpi.change}% vs ayer
        </p>
      )}
    </div>
  );
}
