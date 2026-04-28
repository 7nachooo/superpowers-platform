"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FolderOpen, BarChart2, Settings, Zap } from "lucide-react";

const NAV = [
  { href: "/",          label: "Dashboard",  icon: LayoutDashboard },
  { href: "/clientes",  label: "Clientes",   icon: Users },
  { href: "/proyectos", label: "Proyectos",  icon: FolderOpen },
  { href: "/reportes",  label: "Reportes",   icon: BarChart2 },
  { href: "/settings",  label: "Ajustes",    icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-slate-700 bg-slate-900">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-slate-700 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Zap size={16} className="text-white" />
        </div>
        <span className="text-base font-bold text-white">
          {process.env.NEXT_PUBLIC_APP_TITLE ?? "Dashboard"}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-indigo-600/20 text-indigo-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">
        <p className="text-xs text-slate-500">Datos desde Google Sheets</p>
        <p className="text-xs text-slate-600">Sin Supabase · Tiempo real</p>
      </div>
    </aside>
  );
}
