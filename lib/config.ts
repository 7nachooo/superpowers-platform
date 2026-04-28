import type { SheetsConfig } from "@/types/sheets";

/**
 * Configura aquí las hojas de tu Google Spreadsheet.
 * - name: nombre exacto de la pestaña en Google Sheets
 * - range: rango de columnas (A:Z trae todas)
 * - displayName: nombre que aparece en la UI
 */
export const SHEETS_CONFIG: SheetsConfig = {
  spreadsheetId: process.env.GOOGLE_SHEET_ID!,
  sheets: [
    { name: "Hoja1", range: "A:Z", displayName: "Principal" },
    // Agrega más hojas según tu spreadsheet:
    // { name: "Clientes", range: "A:Z", displayName: "Clientes" },
    // { name: "Proyectos", range: "A:Z", displayName: "Proyectos" },
  ],
  kpis: [
    { label: "Total Registros", sheet: "Hoja1", fn: "COUNT", icon: "hash" },
    // Ejemplos con COUNT_WHERE (cuenta filas donde columna = valor):
    // { label: "Activos", sheet: "Hoja1", fn: "COUNT_WHERE", column: "Estado", value: "Activo", icon: "check-circle" },
    // { label: "Pendientes", sheet: "Hoja1", fn: "COUNT_WHERE", column: "Estado", value: "Pendiente", icon: "clock" },
  ],
};

export const POLL_INTERVAL =
  parseInt(process.env.NEXT_PUBLIC_POLL_INTERVAL ?? "15000", 10);
