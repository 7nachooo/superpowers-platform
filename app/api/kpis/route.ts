import { NextResponse } from "next/server";
import { getSheetData } from "@/lib/sheets";
import { cacheGet, cacheSet } from "@/lib/cache";
import { SHEETS_CONFIG, POLL_INTERVAL } from "@/lib/config";
import type { KPI, KPIsResponse } from "@/types/sheets";

export async function GET() {
  const cacheKey = "kpis";
  const cached = cacheGet<KPIsResponse>(cacheKey);
  if (cached) return NextResponse.json(cached);

  try {
    const kpis: KPI[] = [];

    const sheetsNeeded = [...new Set(SHEETS_CONFIG.kpis.map((k) => k.sheet))];
    const sheetData: Record<string, { headers: string[]; data: Record<string, string>[] }> = {};

    for (const sheetName of sheetsNeeded) {
      const config = SHEETS_CONFIG.sheets.find((s) => s.name === sheetName);
      if (!config) continue;
      sheetData[sheetName] = await getSheetData(
        SHEETS_CONFIG.spreadsheetId,
        sheetName,
        config.range
      );
    }

    for (const kpiConf of SHEETS_CONFIG.kpis) {
      const sd = sheetData[kpiConf.sheet];
      if (!sd) continue;

      let value: number | string = 0;

      if (kpiConf.fn === "COUNT") {
        value = sd.data.length;
      } else if (kpiConf.fn === "COUNT_WHERE" && kpiConf.column && kpiConf.value) {
        value = sd.data.filter(
          (row) => row[kpiConf.column!] === kpiConf.value
        ).length;
      } else if (kpiConf.fn === "SUM" && kpiConf.column) {
        value = sd.data.reduce(
          (acc, row) => acc + (parseFloat(row[kpiConf.column!]) || 0),
          0
        );
      } else if (kpiConf.fn === "AVG" && kpiConf.column) {
        const nums = sd.data
          .map((row) => parseFloat(row[kpiConf.column!]))
          .filter((n) => !isNaN(n));
        value = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
        value = Math.round(value * 100) / 100;
      }

      kpis.push({ label: kpiConf.label, value, icon: kpiConf.icon });
    }

    const response: KPIsResponse = { kpis, lastUpdated: new Date().toISOString() };
    cacheSet(cacheKey, response, POLL_INTERVAL);
    return NextResponse.json(response);
  } catch (err) {
    console.error("KPIs error:", err);
    return NextResponse.json({ error: "Failed to compute KPIs" }, { status: 500 });
  }
}
