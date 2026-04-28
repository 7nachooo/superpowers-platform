import { NextRequest, NextResponse } from "next/server";
import { getSheetData } from "@/lib/sheets";
import { cacheGet, cacheSet } from "@/lib/cache";
import { SHEETS_CONFIG, POLL_INTERVAL } from "@/lib/config";
import type { SheetResponse } from "@/types/sheets";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sheet: string }> }
) {
  const { sheet } = await params;
  const sheetConfig = SHEETS_CONFIG.sheets.find(
    (s) => s.name === sheet || s.displayName === sheet
  );

  if (!sheetConfig) {
    return NextResponse.json({ error: `Sheet "${sheet}" not found` }, { status: 404 });
  }

  const cacheKey = `sheet:${sheetConfig.name}`;
  const cached = cacheGet<SheetResponse>(cacheKey);
  if (cached) return NextResponse.json(cached);

  try {
    const { headers, data } = await getSheetData(
      SHEETS_CONFIG.spreadsheetId,
      sheetConfig.name,
      sheetConfig.range
    );

    const response: SheetResponse = {
      data,
      headers,
      lastUpdated: new Date().toISOString(),
      sheetName: sheetConfig.displayName,
      totalRows: data.length,
    };

    cacheSet(cacheKey, response, POLL_INTERVAL);
    return NextResponse.json(response);
  } catch (err) {
    console.error("Sheets API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch sheet data" },
      { status: 500 }
    );
  }
}
