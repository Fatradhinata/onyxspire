import React from "react";
import Link from "next/link";

/* ─────────────────────────── Icon Components ─────────────────────────── */

const IconChevronDown = () => (
  <svg
    className="w-4 h-4 text-slate-400 ml-2 cursor-pointer hover:text-sky-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const IconSettings = () => (
  <svg
    className="w-5 h-5"
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
);

const IconAlert = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const IconClock = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconPlay = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconRefresh = () => (
  <svg
    className="w-4 h-4 text-sky-500 animate-spin-slow"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const IconLock = () => (
  <svg
    className="w-3 h-3 text-slate-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

/* ─────────────────────────── Sub-components ─────────────────────────── */

const HealthScoreCard: React.FC = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-5">
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-slate-100"
          strokeWidth="3"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-yellow-500"
          strokeDasharray="72, 100"
          strokeWidth="3"
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute font-mono font-bold text-lg text-slate-800">
        72
      </div>
    </div>
    <div>
      <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
        Health Score
      </p>
      <h3 className="font-bold text-slate-800">Fair / Needs Review</h3>
    </div>
  </div>
);

const ThreatsCard: React.FC = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-5">
    <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
      <IconAlert />
    </div>
    <div>
      <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
        Threats Detected
      </p>
      <h3 className="font-mono font-bold text-2xl text-slate-800">
        14{" "}
        <span className="text-xs font-sans font-normal text-slate-500">
          Active
        </span>
      </h3>
    </div>
  </div>
);

const LastScanCard: React.FC = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-5">
    <div className="w-14 h-14 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500">
      <IconClock />
    </div>
    <div>
      <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
        Last Perimeter Scan
      </p>
      <h3 className="font-bold text-slate-800 text-sm">Today, 08:12 PM</h3>
      <p className="text-xs text-slate-500">Automated Routine</p>
    </div>
  </div>
);

/* ─── Execution Panel ─── */

const ExecutionPanel: React.FC = () => (
  <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden">
    {/* Decorative blur */}
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-50 rounded-full blur-2xl pointer-events-none" />

    <div className="flex justify-between items-start mb-6 relative z-10">
      <div>
        <h3 className="font-mono font-bold text-lg text-slate-800">
          Execution Panel
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Initialize targeted scan sequence.
        </p>
      </div>
      <span className="bg-green-100 text-green-700 border border-green-200 px-2 py-1 rounded text-[10px] font-bold font-mono uppercase">
        Engine Idle
      </span>
    </div>

    <div className="space-y-2 mb-6 relative z-10">
      <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        Target Domain / IP
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 font-mono text-sm">
          https://
        </span>
        <input
          type="text"
          defaultValue="beast.com"
          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-lg border border-slate-200 focus:ring-sky-500 focus:border-sky-500 text-sm font-mono text-slate-900 outline-none"
        />
      </div>
    </div>

    <button className="w-full bg-slate-900 hover:bg-sky-600 text-white font-mono font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 relative z-10">
      <IconPlay />
      RUN DIAGNOSTIC SCAN
    </button>

    <div className="mt-auto pt-6 relative z-10">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
            Pro Tier Quota
          </span>
          <span className="font-mono text-xs font-bold text-slate-800">
            8 / 10 Runs
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-1.5 mb-4">
          <div
            className="bg-sky-500 h-1.5 rounded-full"
            style={{ width: "80%" }}
          />
        </div>
        <div className="flex justify-between items-center border-t border-slate-200 pt-3">
          <div className="flex items-center gap-2">
            <IconRefresh />
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
              Cooldown Timer
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-slate-800">
            READY
          </span>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Toolkit ─── */

interface ToolCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  variant?: "default" | "defense";
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon,
  name,
  description,
  variant = "default",
}) => {
  if (variant === "defense") {
    return (
      <div className="border border-indigo-200 bg-indigo-50/30 rounded-xl p-4 hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer group relative overflow-hidden">
        <div className="absolute -right-6 top-2 w-24 text-center text-[10px] tracking-wider bg-indigo-500 text-white font-bold py-1 rotate-45 shadow-sm">
          DEF
        </div>
        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3 group-hover:bg-indigo-200 transition-colors">
          {icon}
        </div>
        <h4 className="font-mono font-bold text-sm text-slate-800 mb-1">
          {name}
        </h4>
        <p className="text-xs text-slate-500 leading-tight">{description}</p>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:border-sky-300 hover:bg-sky-50/30 transition-all cursor-pointer group">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 mb-3 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
        {icon}
      </div>
      <h4 className="font-mono font-bold text-sm text-slate-800 mb-1">
        {name}
      </h4>
      <p className="text-[10px] text-slate-500 leading-tight">{description}</p>
    </div>
  );
};

const CentralizedToolkit: React.FC = () => {
  const tools: ToolCardProps[] = [
    {
      name: "SQLMAP",
      description: "Database injection flaw detection.",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
    },
    {
      name: "WPSCAN",
      description: "WordPress core & plugin audit.",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
    },
    {
      name: "PORT SCAN",
      description: "Identify open pathways & services.",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "HYDRA",
      description: "Brute-force credential testing.",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      ),
    },
    {
      name: "FFUF",
      description: "Directory & hidden asset discovery.",
      icon: (
        <svg
          className="w-4 h-4"
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
      ),
    },
    {
      name: "OBFUSCATOR",
      description: "Code shielding & logic scrambling.",
      variant: "defense",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="font-mono font-bold text-lg text-slate-800">
            Centralized Toolkit
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Offensive & Defensive modules ready for deployment.
          </p>
        </div>
        <a
          href="#"
          className="text-xs font-mono text-sky-600 font-bold hover:underline"
        >
          View All Modules →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {tools.map((tool) => (
          <ToolCard key={tool.name} {...tool} />
        ))}
      </div>
    </div>
  );
};

/* ─── Audit Logs ─── */

type Severity = "HIGH" | "LOW" | "CRITICAL";

interface AuditLog {
  timestamp: string;
  module: string;
  severity: Severity;
  status: string;
  locked?: boolean;
}

const severityConfig: Record<
  Severity,
  { bg: string; text: string; border: string; dot: string }
> = {
  HIGH: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  LOW: {
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    border: "border-yellow-200",
    dot: "bg-yellow-500",
  },
  CRITICAL: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },
};

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const cfg = severityConfig[severity];
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${cfg.bg} ${cfg.text} border ${cfg.border} px-2 py-1 rounded text-xs font-bold font-mono`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {severity}
    </span>
  );
};

const AuditLogs: React.FC = () => {
  const logs: AuditLog[] = [
    {
      timestamp: "2026-03-09 18:45",
      module: "SQLMAP Injector",
      severity: "HIGH",
      status: "Completed",
    },
    {
      timestamp: "2026-03-08 14:20",
      module: "WPSCAN Audit",
      severity: "LOW",
      status: "Completed",
    },
    {
      timestamp: "2026-03-05 09:12",
      module: "Deep FFUF Scan",
      severity: "CRITICAL",
      status: "Completed",
      locked: true,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="font-mono font-bold text-lg text-slate-800">
            Recent Audit Logs
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Review historical data and access mitigation protocols.
          </p>
        </div>
        <button className="text-xs font-mono font-bold text-slate-600 border border-slate-300 bg-white px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
          Export All (PDF)
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-6">Timestamp</th>
              <th className="py-3 px-6">Target Module</th>
              <th className="py-3 px-6">Severity Found</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-right">Mitigation Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {logs.map((log) => (
              <tr
                key={log.timestamp}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="py-4 px-6 font-mono text-xs text-slate-500">
                  {log.timestamp}
                </td>
                <td className="py-4 px-6 font-bold text-slate-800">
                  {log.module}
                </td>
                <td className="py-4 px-6">
                  <SeverityBadge severity={log.severity} />
                </td>
                <td className="py-4 px-6 text-slate-500 text-xs">
                  {log.status}
                </td>
                <td className="py-4 px-6 text-right relative">
                  {log.locked ? (
                    <>
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-end pr-6 pointer-events-none">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded">
                          <IconLock />
                          ENTERPRISE ONLY
                        </div>
                      </div>
                      <button
                        className="text-xs font-bold text-slate-300 border border-slate-200 px-3 py-1.5 rounded"
                        disabled
                      >
                        View Solution
                      </button>
                    </>
                  ) : (
                    <button className="text-xs font-bold text-sky-600 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded transition-colors">
                      View Solution
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ─────────────────────────── Main Page ─────────────────────────── */

const CentralCommand: React.FC = () => {
  return (
    /*
     * Tailwind v4: ganti kelas custom berikut di global CSS:
     *
     * @import "tailwindcss";
     *
     * @utility bg-dashboard-grid {
     *   background-image:
     *     linear-gradient(to right, rgb(14 165 233 / 0.05) 1px, transparent 1px),
     *     linear-gradient(to bottom, rgb(14 165 233 / 0.05) 1px, transparent 1px);
     *   background-size: 40px 40px;
     * }
     *
     * @keyframes spin-slow { to { transform: rotate(360deg); } }
     * @utility animate-spin-slow {
     *   animation: spin-slow 3s linear infinite;
     * }
     */
    <div className="font-sans bg-[#f8fafc] text-slate-800 h-screen overflow-hidden flex selection:bg-sky-500 selection:text-white">
      <main className="flex-1 flex flex-col h-full relative bg-dashboard-grid z-10">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div>
            <h2 className="font-mono font-bold text-xl text-slate-800 tracking-tight">
              System Posture &amp; Execution
            </h2>
            <p className="text-xs font-mono text-slate-500 mt-0.5">
              Automated Security Suite Operations
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-mono text-xs font-bold text-slate-600">
                Target: beast.com
              </span>
              <IconChevronDown />
            </div>
            <Link
              href="/settings"
              className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <IconSettings />
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HealthScoreCard />
              <ThreatsCard />
              <LastScanCard />
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <ExecutionPanel />
              <CentralizedToolkit />
            </div>

            {/* Audit Logs */}
            <AuditLogs />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CentralCommand;
