import { google } from "googleapis";
import type { Row } from "@/types/sheets";

function getAuth() {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(
    /\\n/g,
    "\n"
  );
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
