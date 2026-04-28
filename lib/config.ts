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
    // "Sheet1" es el nombre por defecto cuando Google Drive convierte un CSV
    { name: "Sheet1", range: "A:Z", displayName: "Clientes" },
  ],
  kpis: [
    { label: "Total Clientes", sheet: "Sheet1", fn: "COUNT", icon: "users" },
    { label: "Activos",        sheet: "Sheet1", fn: "COUNT_WHERE", column: "Estado", value: "Activo",     icon: "check-circle" },
    { label: "Pendientes",     sheet: "Sheet1", fn: "COUNT_WHERE", column: "Estado", value: "Pendiente",  icon: "clock" },
    { label: "New",            sheet: "Sheet1", fn: "COUNT_WHERE", column: "Estado", value: "New",        icon: "trending" },
  ],
};

export const POLL_INTERVAL =
  parseInt(process.env.NEXT_PUBLIC_POLL_INTERVAL ?? "15000", 10);
