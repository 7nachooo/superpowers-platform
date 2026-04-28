"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, Download } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { Row } from "@/types/sheets";

const STATUS_KEYWORDS = ["estado", "status", "estado"];

interface Props {
  data: Row[];
  headers: string[];
  isLoading: boolean;
}

export function DataTable({ data, headers, isLoading }: Props) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Row>[]>(
    () =>
      headers.map((h) => ({
        accessorKey: h,
        header: h,
        cell: ({ getValue }) => {
          const val = String(getValue() ?? "");
          const isStatus = STATUS_KEYWORDS.some((k) => h.toLowerCase().includes(k));
          if (isStatus && val) return <StatusBadge value={val} />;
          return <span className="text-slate-200">{val || "—"}</span>;
        },
      })),
    [headers]
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 25 } },
  });

  function exportCSV() {
    const rows = [headers, ...data.map((r) => headers.map((h) => r[h] ?? ""))];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!isLoading && headers.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 text-slate-400">
        No hay datos disponibles
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-slate-700 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar en todos los campos..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-700/50 py-2 pl-9 pr-4 text-sm text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">
            {table.getFilteredRowModel().rows.length.toLocaleString()} registros
          </span>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-slate-300 hover:bg-slate-600 transition-colors"
          >
            <Download size={14} />
            CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="data-table w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-slate-700">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" ? (
                        <ChevronUp size={12} />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ChevronDown size={12} />
                      ) : (
                        <ChevronsUpDown size={12} className="opacity-30" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading && data.length === 0
              ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-700/50">
                    {(headers.length || 4) > 0 &&
                      Array.from({ length: headers.length || 4 }).map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 animate-pulse rounded bg-slate-700" />
                        </td>
                      ))}
                  </tr>
                ))
              : table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-700/50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-2 border-t border-slate-700 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Filas por página:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="rounded border border-slate-600 bg-slate-700 px-2 py-1 text-white outline-none"
          >
            {[10, 25, 50, 100].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded px-2 py-1 text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-30"
          >
            ← Anterior
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded px-2 py-1 text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-30"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
