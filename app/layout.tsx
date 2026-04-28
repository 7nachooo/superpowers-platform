import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/layout/Sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE ?? "Superpowers Dashboard",
  description: "Dashboard en tiempo real con datos de Google Sheets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
