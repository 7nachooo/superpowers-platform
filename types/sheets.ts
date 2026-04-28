export type Row = Record<string, string>;

export interface SheetResponse {
  data: Row[];
  headers: string[];
  lastUpdated: string;
  sheetName: string;
  totalRows: number;
}

export interface KPI {
  label: string;
  value: number | string;
  change?: number;
  trend?: "up" | "down" | "flat";
  icon?: string;
}

export interface KPIsResponse {
  kpis: KPI[];
  lastUpdated: string;
}

export interface SheetConfig {
  name: string;
  range: string;
  displayName: string;
}

export interface KPIConfig {
  label: string;
  sheet: string;
  fn: "COUNT" | "COUNT_WHERE" | "SUM" | "AVG";
  column?: string;
  value?: string;
  icon?: string;
}

export interface SheetsConfig {
  spreadsheetId: string;
  sheets: SheetConfig[];
  kpis: KPIConfig[];
}
