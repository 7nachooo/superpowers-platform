"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

interface Props {
  lastUpdated: string | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export function RefreshIndicator({ lastUpdated, isLoading, onRefresh }: Props) {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    if (!lastUpdated) return;
    const update = () => {
      setSecondsAgo(Math.floor((Date.now() - new Date(lastUpdated).getTime()) / 1000));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [lastUpdated]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="pulse-live h-2 w-2 rounded-full bg-green-400" />
      <span className="text-slate-400">
        {isLoading
          ? "Actualizando..."
          : lastUpdated
          ? `Actualizado hace ${secondsAgo}s`
          : "Sin datos"}
      </span>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50"
        title="Refrescar ahora"
      >
        <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
      </button>
    </div>
  );
}
