import { google } from "googleapis";
import type { Row } from "@/types/sheets";

function decodePrivateKey(raw: string): string {
  // Acepta base64, \n escapados, o saltos de línea reales
  try {
    const decoded = Buffer.from(raw, "base64").toString("utf-8");
    if (decoded.includes("BEGIN PRIVATE KEY")) return decoded;
  } catch {}
  return raw.replace(/\\n/g, "\n");
}

function getAuth() {
  const privateKey = decodePrivateKey(process.env.GOOGLE_PRIVATE_KEY ?? "");
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

export async function getSheetData(
  spreadsheetId: string,
  sheetName: string,
  range: string
): Promise<{ headers: string[]; data: Row[] }> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const fullRange = `${sheetName}!${range}`;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: fullRange,
  });

  const rows = res.data.values ?? [];
  if (rows.length === 0) return { headers: [], data: [] };

  const headers = (rows[0] as string[]).map((h) => String(h ?? "").trim());
  const data: Row[] = rows.slice(1).map((row) => {
    const obj: Row = {};
    headers.forEach((header, i) => {
      obj[header] = String((row as string[])[i] ?? "");
    });
    return obj;
  });

  return { headers, data };
}
