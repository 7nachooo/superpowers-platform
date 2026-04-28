"use client";

import { RefreshIndicator } from "@/app/components/dashboard/RefreshIndicator";

interface Props {
  title: string;
  lastUpdated: string | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export function TopBar({ title, lastUpdated, isLoading, onRefresh }: Props) {
  return (
    <header className="flex items-center justify-between border-b border-slate-700 bg-slate-900/80 px-6 py-4 backdrop-blur-sm">
      <h1 className="text-lg font-semibold text-white">{title}</h1>
      <RefreshIndicator
        lastUpdated={lastUpdated}
        isLoading={isLoading}
        onRefresh={onRefresh}
      />
    </header>
  );
}
