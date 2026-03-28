"use client"
import { useState } from "react";

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────
type Status = "Critical" | "Secured" | "Elevated Risk";

interface Asset {
  id: number;
  domain: string;
  ip: string;
  score: number;
  lastAudit: string;
  status: Status;
}

// ────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────
const ASSETS: Asset[] = [
  {
    id: 1,
    domain: "beast.com",
    ip: "192.168.1.10",
    score: 42,
    lastAudit: "2026-03-09 22:26",
    status: "Critical",
  },
  {
    id: 2,
    domain: "horizon-defense.io",
    ip: "10.8.0.5",
    score: 95,
    lastAudit: "2026-03-01 08:00",
    status: "Secured",
  },
  {
    id: 3,
    domain: "nexus-retail.net",
    ip: "172.16.254.1",
    score: 78,
    lastAudit: "2026-02-28 14:15",
    status: "Elevated Risk",
  },
];

// ────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "Critical") {
    return (
      <div className="inline-flex items-center gap-2 border border-red-200 text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-2 py-1 rounded">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.642 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.358-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
            clipRule="evenodd"
          />
        </svg>
        Critical
      </div>
    );
  }

  if (status === "Secured") {
    return (
      <div className="inline-flex items-center gap-2 border border-green-200 text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-2 py-1 rounded">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" />
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

function ScoreBar({ score }: { score: number }) {
  const color =
    score < 50
      ? "text-red-600"
      : score < 80
        ? "text-amber-500"
        : "text-green-600";
  const barColor =
    score < 50 ? "bg-red-500" : score < 80 ? "bg-amber-500" : "bg-green-500";

  return (
    <div className="flex items-center gap-2">
      <span className={`${color} font-bold`}>{score}</span>
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

// ────────────────────────────────────────────────────────────
// Add Asset Modal
// ────────────────────────────────────────────────────────────
interface AddAssetModalProps {
  open: boolean;
  onClose: () => void;
}

function AddAssetModal({ open, onClose }: AddAssetModalProps) {
  const [domain, setDomain] = useState("");
  const [env, setEnv] = useState("Production (Live)");
  const [authorized, setAuthorized] = useState(false);

  if (!open) return null;

  function handleSave() {
    alert("Asset Initialized to Database.");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md animate-[modalFadeIn_0.3s_ease-out_forwards]">
        <div className="bg-slate-950 border border-slate-800 shadow-2xl shadow-sky-900/20 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
            <h3 className="font-mono font-bold text-white text-sm flex items-center gap-2">
              <span className="text-sky-500">&gt;</span> REGISTER_NEW_TARGET
            </h3>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-red-400 transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            <div>
              <label className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Primary Domain / IP
              </label>
              <input
                type="text"
                placeholder="e.g., api.new-target.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-sky-300 text-sm px-4 py-3 outline-none focus:border-sky-500 font-mono placeholder-slate-600"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Environment Tag
              </label>
              <select
                value={env}
                onChange={(e) => setEnv(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-300 text-sm px-4 py-3 outline-none focus:border-sky-500 font-mono appearance-none cursor-pointer"
              >
                <option>Production (Live)</option>
                <option>Staging</option>
                <option>Development</option>
              </select>
            </div>
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="auth-check"
                className="mt-1 accent-sky-500"
                checked={authorized}
                onChange={(e) => setAuthorized(e.target.checked)}
              />
              <label
                htmlFor="auth-check"
                className="text-xs font-mono text-slate-500 leading-relaxed cursor-pointer"
              >
                I verify that I have authorization to perform security audits on
                this asset according to terms of service.
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 font-mono text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-slate-950 font-mono font-bold text-xs transition-colors"
            >
              SAVE ASSET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Main Page
// ────────────────────────────────────────────────────────────
export default function AssetManagement() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggleSelect(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(ASSETS.map((a) => a.id)) : new Set());
  }

  return (
    <>
      <main
        className="flex-1 flex flex-col h-screen overflow-y-auto relative bg-dashboard-grid z-10"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* ── Header ── */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm flex-shrink-0">
          <div>
            <h2
              className="font-bold text-xl text-slate-800 tracking-tight flex items-center gap-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Target Inventory Vault
            </h2>
            <p
              className="text-xs text-slate-500 mt-0.5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Granular repository for authorized operational targets.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-none focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 transition-all w-64">
              <svg
                className="w-4 h-4 text-slate-400"
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
              <input
                type="text"
                placeholder="grep target_domain..."
                className="bg-transparent border-none outline-none text-xs ml-2 w-full text-slate-700 placeholder-slate-400"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
            </div>

            {/* Register button */}
            <button
              onClick={() => setModalOpen(true)}
              className="bg-slate-900 hover:bg-sky-600 text-white border border-slate-900 font-bold text-xs px-4 py-2 rounded-none transition-colors flex items-center gap-2 shadow-md"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              [+] REGISTER TARGET
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[90rem] mx-auto w-full space-y-6 pb-20">
          {/* ── Directive Banner ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md relative overflow-hidden mb-2 mt-4">
            <div className="absolute left-0 top-0 w-1.5 h-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.6)]" />
            <div className="absolute right-0 top-0 w-64 h-64 bg-sky-500/10 rounded-full filter blur-[60px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-700 text-sky-400 flex items-center justify-center flex-shrink-0 shadow-inner">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h3
                  className="font-bold text-white text-sm uppercase tracking-widest mb-2 flex items-center gap-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Operational Directive
                  <span className="bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2.5 py-0.5 rounded text-[9px] animate-pulse">
                    READ FIRST
                  </span>
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-4xl">
                  Welcome to the <strong>Target Inventory Vault</strong>. This
                  repository is designed to eliminate manual data entry.
                  Register your authorized domains or IPs once, and seamlessly
                  manage their long-term security posture across all operations.
                </p>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 hover:border-sky-500/50 transition-colors">
                    <svg
                      className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0"
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
                    <div>
                      <span className="text-white font-bold text-sm block mb-1">
                        1-Click Execution
                      </span>
                      <span className="text-slate-500 leading-relaxed">
                        Hit the{" "}
                        <span className="text-sky-400 font-bold px-1 rounded bg-sky-900/30">
                          Quick Scan
                        </span>{" "}
                        button on any row to instantly port the target directly
                        into the Scanner Hub engine.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 hover:border-emerald-500/50 transition-colors">
                    <svg
                      className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <span className="text-white font-bold text-sm block mb-1">
                        Posture Tracking
                      </span>
                      <span className="text-slate-500 leading-relaxed">
                        Identify decaying security scores instantly. Critical
                        assets are highlighted in{" "}
                        <span className="text-red-400 font-bold">Red</span> to
                        prioritize your mitigation efforts.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Assets",
                value: "14",
                labelClass: "text-slate-400",
                valueClass: "text-slate-800",
                icon: (
                  <svg
                    className="w-8 h-8 text-slate-200"
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
                ),
              },
              {
                label: "Critical State",
                value: "2",
                labelClass: "text-red-500",
                valueClass: "text-red-600",
                icon: (
                  <svg
                    className="w-8 h-8 text-red-100"
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
                ),
              },
              {
                label: "Needs Review",
                value: "5",
                labelClass: "text-amber-500",
                valueClass: "text-amber-600",
                icon: (
                  <svg
                    className="w-8 h-8 text-amber-100"
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
                ),
              },
              {
                label: "Secured",
                value: "7",
                labelClass: "text-green-500",
                valueClass: "text-green-600",
                icon: (
                  <svg
                    className="w-8 h-8 text-green-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map(({ label, value, labelClass, valueClass, icon }) => (
              <div
                key={label}
                className="bg-white border border-slate-200 p-4 flex items-center justify-between"
              >
                <div>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-widest ${labelClass}`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {label}
                  </p>
                  <p
                    className={`text-2xl font-bold ${valueClass}`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {value}
                  </p>
                </div>
                {icon}
              </div>
            ))}
          </div>

          {/* ── Table Card ── */}
          <div className="bg-white border border-slate-200 shadow-sm relative overflow-hidden rounded-2xl">
            {/* Table toolbar */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/80">
              <div
                className="flex items-center gap-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="text-xs text-sky-600 font-bold">
                  &gt; CONNECTED_NODES
                </span>
                <span className="text-slate-300 text-xs">|</span>
                <button className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-bold">
                  Filter: ALL
                </button>
                <button className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-bold">
                  Sort: RISK_LEVEL
                </button>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 bg-white text-slate-600 hover:text-sky-600 border border-slate-200 rounded shadow-sm transition-colors">
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
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
                <button className="p-1.5 bg-slate-100 text-slate-400 border border-slate-200 rounded cursor-not-allowed">
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
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table
                className="w-full text-left border-collapse whitespace-nowrap"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <th className="py-4 px-6 font-normal border-r border-slate-200 w-10 text-center">
                      <input
                        type="checkbox"
                        className="accent-sky-500"
                        checked={selected.size === ASSETS.length}
                        onChange={(e) => toggleAll(e.target.checked)}
                      />
                    </th>
                    <th className="py-4 px-6 font-normal border-r border-slate-200">
                      TARGET_DOMAIN
                    </th>
                    <th className="py-4 px-6 font-normal border-r border-slate-200">
                      IPv4_NODE
                    </th>
                    <th className="py-4 px-6 font-normal border-r border-slate-200">
                      POSTURE_SCORE
                    </th>
                    <th className="py-4 px-6 font-normal border-r border-slate-200">
                      LAST_AUDIT
                    </th>
                    <th className="py-4 px-6 font-normal border-r border-slate-200">
                      SYS_STATUS
                    </th>
                    <th className="py-4 px-6 font-normal text-right">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                  {ASSETS.map((asset) => (
                    <tr
                      key={asset.id}
                      className={`hover:bg-slate-50 ${rowAccentClass(
                        asset.status,
                      )} transition-all group`}
                    >
                      <td className="py-4 px-6 text-center">
                        <input
                          type="checkbox"
                          className="accent-sky-500"
                          checked={selected.has(asset.id)}
                          onChange={() => toggleSelect(asset.id)}
                        />
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <GlobeIcon className="w-4 h-4 text-slate-400" />
                          {asset.domain}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500">{asset.ip}</td>
                      <td className="py-4 px-6">
                        <ScoreBar score={asset.score} />
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {asset.lastAudit}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={asset.status} />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="bg-white border border-slate-300 hover:border-sky-500 hover:text-sky-600 text-slate-600 font-bold text-[10px] px-3 py-1.5 rounded transition-colors uppercase flex items-center justify-end gap-1 ml-auto shadow-sm group-hover:bg-sky-50">
                          <BoltIcon className="w-3 h-3" />
                          Quick Scan
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-500"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span>Showing 1 to 3 of 14 entries</span>
              <div className="flex gap-4 items-center">
                <button className="hover:text-sky-600 transition-colors font-bold text-slate-400">
                  [ PREV ]
                </button>
                <span className="text-slate-800 font-bold">
                  1 <span className="text-slate-400">/ 5</span>
                </span>
                <button className="hover:text-sky-600 transition-colors font-bold text-slate-400">
                  [ NEXT ]
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Modal ── */}
      <AddAssetModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
