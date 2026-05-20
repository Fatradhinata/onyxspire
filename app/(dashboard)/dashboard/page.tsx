"use client"
import React, { useState } from "react";
import Link from "next/link";

/* ─────────────────────────── Types & Data ─────────────────────────── */
type Status = "Critical" | "Secured" | "Elevated Risk";
type Severity = "HIGH" | "LOW" | "CRITICAL";

interface AuditHistory {
  id: string;
  tool: string;
  timestamp: string;
  status: string;
  severity: Severity;
}

interface Asset {
  id: number;
  domain: string;
  ip: string;
  score: number;
  lastAudit: string;
  status: Status;
  history: AuditHistory[];
}

const ASSETS: Asset[] = [
  {
    id: 1,
    domain: "beast.com",
    ip: "192.168.1.10",
    score: 42,
    lastAudit: "2026-03-09 22:26",
    status: "Critical",
    history: [
      { id: "h1", tool: "SQLMAP Injector", timestamp: "2026-03-09 18:45", status: "Completed", severity: "HIGH" },
      { id: "h2", tool: "WPSCAN Audit", timestamp: "2026-03-08 14:20", status: "Completed", severity: "LOW" },
    ]
  },
  {
    id: 2,
    domain: "horizon-defense.io",
    ip: "10.8.0.5",
    score: 95,
    lastAudit: "2026-03-01 08:00",
    status: "Secured",
    history: [
      { id: "h3", tool: "Deep FFUF Scan", timestamp: "2026-03-01 08:00", status: "Completed", severity: "LOW" }
    ]
  },
  {
    id: 3,
    domain: "nexus-retail.net",
    ip: "172.16.254.1",
    score: 78,
    lastAudit: "2026-02-28 14:15",
    status: "Elevated Risk",
    history: [
      { id: "h4", tool: "Deep Port Scan", timestamp: "2026-02-28 14:15", status: "Completed", severity: "CRITICAL" }
    ]
  },
];

/* ─────────────────────────── Icon Components ─────────────────────────── */

const IconSettings = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

/* ─────────────────────────── Sub-components ─────────────────────────── */

function StatusBadge({ status }: { status: Status }) {
  if (status === "Critical") {
    return (
      <div className="inline-flex items-center gap-2 border border-red-200 text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-2 py-1 rounded">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_#ef4444]" />
        Critical
      </div>
    );
  }
  if (status === "Secured") {
    return (
      <div className="inline-flex items-center gap-2 border border-green-200 text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-2 py-1 rounded">
        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
        Secured
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2 border border-amber-200 text-amber-600 font-bold text-xs uppercase tracking-wider bg-amber-50 px-2 py-1 rounded">
      <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_5px_#f59e0b]" />
      Elevated Risk
    </div>
  );
}

const severityConfig: Record<Severity, { bg: string; text: string; border: string; dot: string }> = {
  HIGH: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-500" },
  LOW: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200", dot: "bg-yellow-500" },
  CRITICAL: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", dot: "bg-orange-500" },
};

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const cfg = severityConfig[severity];
  return (
    <span className={`inline-flex items-center gap-1.5 ${cfg.bg} ${cfg.text} border ${cfg.border} px-2 py-1 rounded text-[10px] font-bold font-mono tracking-widest`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {severity}
    </span>
  );
};

function ScoreBar({ score }: { score: number }) {
  const color = score < 50 ? "text-red-600" : score < 80 ? "text-amber-500" : "text-green-600";
  const barColor = score < 50 ? "bg-red-500" : score < 80 ? "bg-amber-500" : "bg-green-500";

  return (
    <div className="flex items-center gap-2">
      <span className={`${color} font-bold font-mono`}>{score}</span>
      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full ${barColor}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function rowAccentClass(status: Status): string {
  if (status === "Critical") return "hover:shadow-[inset_4px_0_0_0_#ef4444]";
  if (status === "Secured") return "hover:shadow-[inset_4px_0_0_0_#22c55e]";
  return "hover:shadow-[inset_4px_0_0_0_#f59e0b]";
}

/* ─────────────────────────── Main Page ─────────────────────────── */

export default function CentralCommand() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="font-sans bg-[#f8fafc] text-slate-800 h-screen overflow-hidden flex selection:bg-sky-500 selection:text-white">
      <main className="flex-1 flex flex-col h-full relative bg-dashboard-grid z-10">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm flex-shrink-0">
          <div>
            <h2 className="font-mono font-bold text-xl text-slate-800 tracking-tight">Command Center</h2>
            <p className="text-xs font-mono text-slate-500 mt-0.5 uppercase tracking-widest">Global Security Posture</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/settings"
              className="bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl transition-all inline-flex items-center justify-center shadow-lg active:scale-95"
            >
              <IconSettings />
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 terminal-scroll">
          <div className="max-w-7xl mx-auto space-y-6 pb-20">
            
            {/* ── Compact Global Overview Widget ── */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-1 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
              
              <div className="bg-slate-950 rounded-[1.4rem] p-6 md:p-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 shadow-inner relative">
                    <div className="absolute inset-0 border border-sky-500/20 rounded-2xl animate-ping-radar" />
                    <svg className="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-amarillo text-2xl text-white tracking-widest mb-1 uppercase">SYSTEM <span className="text-sky-500">READY</span></h3>
                    <p className="text-slate-500 font-mono-custom text-[10px] uppercase tracking-[0.2em]">All monitoring nodes currently operational.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <Link 
                    href="/reports" 
                    className="px-6 py-3 bg-slate-800 border border-slate-700 text-white font-mono-custom font-bold text-[11px] rounded-xl hover:bg-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    VIEW REPORTS
                  </Link>
                  <Link 
                    href="/scanner" 
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono-custom font-bold text-[11px] rounded-xl transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center gap-2"
                  >
                    LAUNCH SCAN
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Monitored Domains Table ── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <h3 className="font-mono font-bold text-lg text-slate-800">Monitored Domains</h3>
                  <span className="bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase">3 Registered Nodes</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-4 px-6 font-normal border-r border-slate-200">Target Domain</th>
                      <th className="py-4 px-6 font-normal border-r border-slate-200">IPv4 Node</th>
                      <th className="py-4 px-6 font-normal border-r border-slate-200">Posture Score</th>
                      <th className="py-4 px-6 font-normal border-r border-slate-200">Last Audit</th>
                      <th className="py-4 px-6 font-normal">System Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    {ASSETS.map((asset) => (
                      <React.Fragment key={asset.id}>
                        <tr
                          onClick={() => toggleExpand(asset.id)}
                          className={`cursor-pointer hover:bg-slate-50 ${rowAccentClass(asset.status)} transition-all bg-white`}
                        >
                          <td className="py-4 px-6 font-bold text-slate-900 font-mono">
                            <div className="flex items-center gap-2">
                              <GlobeIcon className="w-4 h-4 text-slate-400" />
                              {asset.domain}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-500 font-mono text-xs">{asset.ip}</td>
                          <td className="py-4 px-6"><ScoreBar score={asset.score} /></td>
                          <td className="py-4 px-6 font-mono text-xs text-slate-500">{asset.lastAudit}</td>
                          <td className="py-4 px-6"><StatusBadge status={asset.status} /></td>
                        </tr>

                        {expandedRow === asset.id && (
                          <tr className="bg-slate-50/50">
                            <td colSpan={5} className="p-0 border-b border-slate-200">
                              <div className="p-6">
                                <h4 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                  <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Audit History & Execution Logs
                                </h4>
                                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                  <table className="w-full text-left">
                                    <thead>
                                      <tr className="bg-slate-50 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-200">
                                        <th className="py-3 px-4">Timestamp</th>
                                        <th className="py-3 px-4">Tool Used</th>
                                        <th className="py-3 px-4">Severity Found</th>
                                        <th className="py-3 px-4 text-right">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {asset.history.map(h => (
                                        <tr key={h.id} className="text-xs hover:bg-slate-50 transition-colors">
                                          <td className="py-3 px-4 text-slate-500 font-mono">{h.timestamp}</td>
                                          <td className="py-3 px-4 font-bold text-slate-700">{h.tool}</td>
                                          <td className="py-3 px-4"><SeverityBadge severity={h.severity} /></td>
                                          <td className="py-3 px-4 text-slate-500 text-right">{h.status}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="mt-4 flex justify-end">
                                   <Link href="/reports" className="text-[10px] font-mono-custom font-bold text-sky-600 hover:underline uppercase tracking-widest">
                                      Full Report Details →
                                   </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
