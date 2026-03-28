"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  // Helper udah gue upgrade biar bisa bedain Main Menu sama Sub Menu
  const getNavClass = (path: string, isSubMenu: boolean = false) => {
    const isActive = pathname === path;

    if (isActive) {
      return isSubMenu
        ? // Style Aktif buat Sub Menu (Nyala biru, ada garis pinggir)
          "flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-sky-500/10 to-transparent text-sky-400 rounded-xl border border-sky-500/20 transition-all shadow-[inset_0_1px_4px_rgba(14,165,233,0.1)] relative"
        : // Style Aktif buat Menu Utama (Background gelap, teks putih)
          "flex items-center gap-3 px-3 py-2.5 bg-slate-800 text-white shadow-inner rounded-xl transition-all group";
    }

    // Style Tidak Aktif (Sama rata)
    return isSubMenu
      ? "flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-all group"
      : "flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 hover:shadow-inner rounded-xl transition-all group";
  };

  const isSecuritySectionActive =
    pathname === "/scanner" || pathname === "/port-scanner";

  return (
    <aside
      id="sidebar"
      className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between h-full flex-shrink-0 fixed md:relative z-50 shadow-[4px_0_24px_rgba(0,0,0,0.2)] transition-transform duration-300 -translate-x-full md:translate-x-0"
    >
      <div>
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800/60 bg-slate-950 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-sky-500/10 blur-xl rounded-full" />
          <div className="w-8 h-8 bg-gradient-to-br from-sky-400/20 to-indigo-500/20 border border-sky-400/40 flex items-center justify-center transform rotate-45 shadow-[0_0_10px_rgba(14,165,233,0.2)]">
            <svg
              className="w-4 h-4 text-sky-400 transform -rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="relative z-10">
            <h1 className="font-amarillo text-xl text-white tracking-widest mt-1">
              ONYXSPIRE
            </h1>
            <div className="font-mono-custom text-[9px] text-sky-400 uppercase tracking-widest">
              Workspace: Tenant_01
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1 mt-2 overflow-y-auto max-h-[calc(100vh-170px)] terminal-scroll">
          <p className="px-3 text-[10px] font-mono-custom font-bold text-slate-500 uppercase tracking-wider mb-3">
            Main Modules
          </p>

          {/* === INI YANG BENER: PAKE getNavClass === */}
          <Link href="/dashboard" className={getNavClass("/dashboard")}>
            <svg
              className={`w-5 h-5 transition-colors ${pathname === "/dashboard" ? "text-sky-400" : "group-hover:text-sky-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span className="font-mono-custom text-sm">Command Center</span>
          </Link>

          <Link href="/assets" className={getNavClass("/assets")}>
            <svg
              className={`w-5 h-5 transition-colors ${pathname === "/assets" ? "text-sky-400" : "group-hover:text-sky-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            <span className="font-mono-custom text-sm">Asset Management</span>
          </Link>

          <div className="py-1.5">
            <div
              className={`flex items-center gap-3 px-3 py-2 transition-colors ${isSecuritySectionActive ? "text-white" : "text-slate-500"}`}
            >
              <svg
                className={`w-5 h-5 transition-all ${isSecuritySectionActive ? "text-sky-500 drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]" : "text-slate-500"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span
                className={`font-mono-custom text-sm transition-all ${isSecuritySectionActive ? "font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" : "font-medium text-slate-500"}`}
              >
                Security Scans
              </span>
            </div>
            <div className="ml-6 pl-4 border-l-2 border-slate-800/80 space-y-1.5 mt-1 relative">
              {/* === SUB MENU PAKE getNavClass(path, true) === */}
              <Link href="/scanner" className={getNavClass("/scanner", true)}>
                {pathname === "/scanner" && (
                  <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-[18px] h-[2px] bg-sky-500/80 rounded-r-full shadow-[0_0_5px_rgba(14,165,233,0.8)]"></div>
                )}
                <span
                  className={`font-mono-custom text-xs ${pathname === "/scanner" ? "text-sky-500 drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]" : "text-slate-600 group-hover:text-sky-400 transition-colors"}`}
                >
                  &gt;
                </span>
                <span
                  className={`font-mono-custom text-xs ${pathname === "/scanner" ? "font-bold" : ""}`}
                >
                  Automated Hub
                </span>
              </Link>

              <Link
                href="/port-scanner"
                className={getNavClass("/port-scanner", true)}
              >
                {pathname === "/port-scanner" && (
                  <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-[18px] h-[2px] bg-sky-500/80 rounded-r-full shadow-[0_0_5px_rgba(14,165,233,0.8)]"></div>
                )}
                <span
                  className={`font-mono-custom text-xs ${pathname === "/port-scanner" ? "text-sky-500 drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]" : "text-slate-600 group-hover:text-sky-400 transition-colors"}`}
                >
                  &gt;
                </span>
                <span
                  className={`font-mono-custom text-xs ${pathname === "/port-scanner" ? "font-bold" : ""}`}
                >
                  Deep Port Scan
                </span>
              </Link>
            </div>
          </div>

          <Link href="/reports" className={getNavClass("/reports")}>
            <svg
              className={`w-5 h-5 transition-colors ${pathname === "/reports" ? "text-sky-400" : "group-hover:text-sky-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-mono-custom text-sm">Audit Reports</span>
          </Link>

          <p className="px-3 text-[10px] font-mono-custom font-bold text-slate-500 uppercase tracking-wider mb-3 mt-8">
            Administration
          </p>

          <Link href="/billing" className={getNavClass("/billing")}>
            <svg
              className={`w-5 h-5 transition-colors ${pathname === "/billing" ? "text-sky-400" : "group-hover:text-sky-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span className="font-mono-custom text-sm">
              Billing &amp; Quota
            </span>
          </Link>

          <Link href="/settings" className={getNavClass("/settings")}>
            <svg
              className={`w-5 h-5 transition-colors ${pathname === "/settings" ? "text-sky-400" : "group-hover:text-sky-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-mono-custom text-sm">
              Profile &amp; Security
            </span>
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-12 h-12 bg-sky-500/20 blur-md rounded-full" />
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold font-mono-custom text-sm shadow-inner relative z-10">
            FN
          </div>
          <div className="flex-1 overflow-hidden relative z-10">
            <p className="text-xs font-bold text-white truncate">
              Fines Need Hug
            </p>
            <p className="text-[10px] text-slate-400 font-mono-custom truncate">
              admin@tenant.com
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between px-2">
          <span className="text-[10px] font-mono-custom text-slate-500 uppercase">
            Current Plan
          </span>
          <span className="bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded text-[10px] font-bold font-mono-custom flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse shadow-[0_0_5px_#38bdf8]" />{" "}
            PRO TIER
          </span>
        </div>
      </div>
    </aside>
  );
}
