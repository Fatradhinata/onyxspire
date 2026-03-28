"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import "./deep-port-scanner.css";

// ── Types ──────────────────────────────────────────────────────────────────

type PortState = "open" | "filtered" | "closed";
type RiskLevel = "high" | "medium" | "low" | "none";
type ProtoType = "TCP" | "UDP" | "BOTH";
type StateFilter = "all" | PortState;

interface ScanResult {
  port: number;
  proto: string;
  state: PortState;
  service: string;
  version: string;
  risk: RiskLevel;
}

interface TimingInfo {
  label: string;
  desc: string;
}

// ── Constants ──────────────────────────────────────────────────────────────

const TIMING_MAP: Record<number, TimingInfo> = {
  0: {
    label: "T0 Paranoid",
    desc: "Extremely slow. Designed to bypass Intrusion Detection Systems (IDS).",
  },
  1: {
    label: "T1 Sneaky",
    desc: "Quite slow. Prioritizes stealth over scanning speed.",
  },
  2: {
    label: "T2 Polite",
    desc: "Slows down the scan to use less bandwidth and target resources.",
  },
  3: {
    label: "T3 Normal",
    desc: "Default speed. Balances scan time and network reliability. Ideal for most situations.",
  },
  4: {
    label: "T4 Aggressive",
    desc: "Fast execution. Assumes a reliable network. May trigger firewall alerts.",
  },
  5: {
    label: "T5 Insane",
    desc: "Maximum speed. Can cause packet loss or crash the target service. Extremely noisy.",
  },
};

const INITIAL_RESULTS: ScanResult[] = [
  {
    port: 80,
    proto: "TCP",
    state: "open",
    service: "http",
    version: "Apache httpd 2.4.54",
    risk: "low",
  },
  {
    port: 443,
    proto: "TCP",
    state: "open",
    service: "https",
    version: "nginx 1.23.1 (SSL)",
    risk: "low",
  },
  {
    port: 3306,
    proto: "TCP",
    state: "filtered",
    service: "mysql",
    version: "—",
    risk: "high",
  },
  {
    port: 8000,
    proto: "TCP",
    state: "closed",
    service: "http-alt",
    version: "—",
    risk: "none",
  },
  {
    port: 8001,
    proto: "TCP",
    state: "closed",
    service: "http-alt",
    version: "—",
    risk: "none",
  },
  {
    port: 8002,
    proto: "TCP",
    state: "closed",
    service: "http-alt",
    version: "—",
    risk: "none",
  },
  {
    port: 8003,
    proto: "TCP",
    state: "closed",
    service: "http-alt",
    version: "—",
    risk: "none",
  },
  {
    port: 8004,
    proto: "TCP",
    state: "closed",
    service: "http-alt",
    version: "—",
    risk: "none",
  },
  {
    port: 8005,
    proto: "TCP",
    state: "closed",
    service: "http-alt",
    version: "—",
    risk: "none",
  },
  {
    port: 8006,
    proto: "TCP",
    state: "closed",
    service: "http-alt",
    version: "—",
    risk: "none",
  },
  {
    port: 8007,
    proto: "TCP",
    state: "closed",
    service: "http-alt",
    version: "—",
    risk: "none",
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-xl border rounded-2xl p-4 shadow-sm text-center ${colorClass}`}
    >
      <p className="font-mono-custom text-[10px] uppercase tracking-widest">
        {label}
      </p>
      <p className="font-mono-custom font-bold text-2xl mt-1 drop-shadow-sm">
        {value}
      </p>
    </div>
  );
}

function StateBadge({ state }: { state: PortState }) {
  if (state === "open")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-[10px] font-bold border border-green-200 font-mono-custom">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e]" />
        OPEN
      </span>
    );
  if (state === "filtered")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-50 text-yellow-700 text-[10px] font-bold border border-yellow-200 font-mono-custom">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_4px_#eab308]" />
        FILTERED
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-200 font-mono-custom">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      CLOSED
    </span>
  );
}

function RiskBadge({ risk }: { risk: RiskLevel }) {
  if (risk === "high")
    return (
      <span className="font-mono-custom text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded-md">
        HIGH
      </span>
    );
  if (risk === "low")
    return (
      <span className="font-mono-custom text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-md">
        LOW
      </span>
    );
  if (risk === "medium")
    return (
      <span className="font-mono-custom text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md">
        MED
      </span>
    );
  return <span className="font-mono-custom text-[10px] text-slate-400">—</span>;
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function DeepPortScanner() {
  // ── State ──
  const [targetHost, setTargetHost] = useState("beast.com");
  const [osDetect, setOsDetect] = useState(false);
  const [versionDetect, setVersionDetect] = useState(true);
  const [timingValue, setTimingValue] = useState(3);
  const [portRange, setPortRange] = useState("80, 443, 3306, 8000-8010");
  const [selectedProto, setSelectedProto] = useState<ProtoType>("TCP");
  const [activePreset, setActivePreset] = useState<string>("custom");
  const [allResults] = useState<ScanResult[]>(INITIAL_RESULTS);
  const [stateFilter, setStateFilter] = useState<StateFilter>("all");
  const [isScanning, setIsScanning] = useState(false);
  const [terminalHtml, setTerminalHtml] = useState("");

  const terminalRef = useRef<HTMLDivElement>(null);

  // ── Derived ──
  const filteredResults =
    stateFilter === "all"
      ? allResults
      : allResults.filter((r) => r.state === stateFilter);

  const statOpen = allResults.filter((r) => r.state === "open").length;
  const statFiltered = allResults.filter((r) => r.state === "filtered").length;
  const statClosed = allResults.filter((r) => r.state === "closed").length;

  // ── Command preview ──
  const commandPreview = useCallback(() => {
    const host = targetHost || "target";
    const t = timingValue;
    const ports = portRange.replace(/\s/g, "") || "1-1024";
    const vFlag = versionDetect ? " -sV" : "";
    const oFlag = osDetect ? " -O" : "";
    return `nmap -sS${vFlag}${oFlag} -T${t} -p ${ports} ${host}`;
  }, [targetHost, timingValue, portRange, versionDetect, osDetect]);

  // ── Terminal initializer ──
  useEffect(() => {
    setTerminalHtml(`
      <div class="text-slate-500 mb-2">$ nmap -sS -sV -T3 -p 80,443,3306,8000-8010 beast.com</div>
      <div><span class="text-sky-400 font-bold">Starting Nmap 7.94 at 2026-03-13 21:55 WIB</span></div>
      <div class="mt-1">Nmap scan report for beast.com <span class="text-slate-500">(104.21.XX.XX)</span></div>
      <div>Host is up <span class="text-green-400">(0.042s latency)</span>.</div>
      <br/>
      <div class="text-yellow-400">[*] Scanning 14 ports on beast.com...</div>
      <div>Discovered open port <span class="text-green-400 font-bold">80/tcp</span> on 104.21.XX.XX</div>
      <div>Discovered open port <span class="text-green-400 font-bold">443/tcp</span> on 104.21.XX.XX</div>
      <div>Port <span class="text-yellow-400">3306/tcp</span> filtered — no response (firewall/drop)</div>
      <div>Ports <span class="text-slate-500">8000-8010/tcp</span> closed — RST response</div>
      <br/>
      <div class="text-slate-400 font-bold">Service detection enabled:</div>
      <div>&nbsp;80/tcp → <span class="text-sky-400">Apache httpd 2.4.54</span></div>
      <div>&nbsp;443/tcp → <span class="text-sky-400">nginx 1.23.1 (SSL)</span></div>
      <br/>
      <div class="text-green-400 font-bold">Nmap done: 1 IP address (1 host up) scanned in 2.14 seconds</div>
      <div class="mt-3">
        <span class="text-sky-500 font-bold drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]">root@engine:~#</span>
        <span class="cursor-blink inline-block w-2.5 h-4 bg-slate-300 align-middle ml-1.5 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></span>
      </div>
    `);
  }, []);

  // ── Auto-scroll terminal ──
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHtml]);

  // ── Scan simulation ──
  function initiateScan() {
    if (isScanning) return;
    setIsScanning(true);

    const host = targetHost || "target";
    const cmd = commandPreview();
    const now = new Date().toLocaleString("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    let html = `<div class="text-slate-600">$ ${cmd}</div>`;
    setTerminalHtml(html);

    const lines: Array<{ t: number; text: string }> = [
      {
        t: 400,
        text: `<div class="mt-1"><span class="text-sky-400 font-bold">Starting Nmap 7.94 at ${now}</span></div>`,
      },
      {
        t: 900,
        text: `<div>Nmap scan report for ${host} <span class="text-slate-500">(resolving...)</span></div>`,
      },
      {
        t: 1400,
        text: `<div>Host is up <span class="text-green-400">(0.038s latency)</span>.</div><br/>`,
      },
      {
        t: 1900,
        text: `<div class="text-yellow-400">[*] Initiating SYN Stealth Scan...</div>`,
      },
      {
        t: 2400,
        text: `<div>Discovered open port <span class="text-green-400 font-bold">80/tcp</span> on host</div>`,
      },
      {
        t: 2700,
        text: `<div>Discovered open port <span class="text-green-400 font-bold">443/tcp</span> on host</div>`,
      },
      {
        t: 3200,
        text: `<div>Port <span class="text-yellow-400">3306/tcp</span> filtered — firewall dropped probe</div>`,
      },
      {
        t: 3600,
        text: `<br/><div class="text-slate-400 font-bold">Running service detection (-sV)...</div>`,
      },
      {
        t: 4100,
        text: `<div>&nbsp;80/tcp&nbsp; → <span class="text-sky-400">Apache httpd 2.4.54</span></div><div>&nbsp;443/tcp → <span class="text-sky-400">nginx 1.23.1 (SSL/TLS)</span></div>`,
      },
      {
        t: 4600,
        text: `<br/><div class="text-green-400 font-bold">Nmap done: 1 IP address scanned in 4.21 seconds</div>`,
      },
    ];

    lines.forEach(({ t, text }) => {
      setTimeout(() => {
        html += text;
        setTerminalHtml(html);
      }, t);
    });

    setTimeout(() => {
      html += `<div class="mt-3"><span class="text-sky-500 font-bold drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]">root@engine:~#</span><span class="cursor-blink inline-block w-2.5 h-4 bg-slate-300 align-middle ml-1.5 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></span></div>`;
      setTerminalHtml(html);
      setIsScanning(false);
    }, 5200);
  }

  // ── Export CSV ──
  function exportCSV() {
    const rows = [
      "Port,Protocol,State,Service,Version,Risk",
      ...allResults.map(
        (r) =>
          `${r.port},${r.proto},${r.state},${r.service},"${r.version}",${r.risk}`,
      ),
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([rows], { type: "text/csv" }));
    a.download = `port-scan-${Date.now()}.csv`;
    a.click();
  }

  // ── Clear terminal ──
  function clearTerminal() {
    setTerminalHtml(
      `<div class="text-slate-600">$ _</div><div class="mt-2"><span class="text-sky-500 font-bold drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]">root@engine:~#</span><span class="cursor-blink inline-block w-2.5 h-4 bg-slate-300 align-middle ml-1.5"></span></div>`,
    );
  }

  // ── Apply preset ──
  function applyPreset(id: string, ports: string) {
    setActivePreset(id);
    setPortRange(ports);
  }

  // ── Timing label color ──
  const timingLabelClass =
    timingValue >= 4
      ? "font-mono-custom text-[10px] font-bold text-amber-600 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200 transition-colors duration-200"
      : "font-mono-custom text-[10px] font-bold text-sky-600 bg-sky-100 px-2.5 py-1 rounded-md border border-sky-200 transition-colors duration-200";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="font-inter text-slate-800 h-screen overflow-hidden flex selection:bg-sky-500 selection:text-white bg-slate-50">
      <main className="flex-1 flex flex-col h-full relative bg-dashboard-grid overflow-y-auto overflow-x-hidden">
        {/* ── Header ── */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="font-mono-custom font-bold text-xl text-slate-800 tracking-tight">
                Deep Port Scanner
              </h2>
              <p className="text-xs font-mono-custom text-slate-500 mt-0.5 hidden sm:block">
                Advanced Network Reconnaissance Module
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Scanning badge */}
            <div
              className={`items-center gap-2 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl shadow-sm ${isScanning ? "flex" : "hidden"}`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-radar absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
              </span>
              <span className="font-mono-custom text-[10px] font-bold text-sky-600 uppercase tracking-widest">
                Scanning Network
              </span>
            </div>

            {/* Engine status */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
              <span className="font-mono-custom text-[10px] font-bold text-slate-600 uppercase tracking-widest hidden sm:inline-block">
                Engine Online
              </span>
            </div>
          </div>
        </header>

        {/* ── Body ── */}
        <div className="p-4 sm:p-8 mx-auto w-full max-w-[1600px] flex-1 flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch flex-1 pb-10">
            {/* ══ LEFT PANEL ══════════════════════════════════════════════ */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Target Endpoint */}
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden flex-shrink-0">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-bl from-sky-100 to-transparent opacity-60 rounded-full pointer-events-none" />

                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shadow-sm border border-sky-200">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-mono-custom font-bold text-slate-800 text-sm uppercase tracking-wider">
                    Target Endpoint
                  </h3>
                </div>

                <div className="mb-5 relative z-10">
                  <div className="flex shadow-sm rounded-xl overflow-hidden border-2 border-slate-200 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/10 transition-all bg-white">
                    <span className="inline-flex items-center px-4 bg-slate-50 text-slate-400 font-mono-custom text-xs border-r border-slate-200">
                      HOST
                    </span>
                    <input
                      type="text"
                      value={targetHost}
                      onChange={(e) => setTargetHost(e.target.value)}
                      placeholder="domain.com or IP"
                      className="flex-1 px-4 py-3.5 min-w-0 outline-none font-mono-custom text-slate-800 text-sm font-bold placeholder-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 relative z-10">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-colors">
                    <div>
                      <p className="font-mono-custom text-[10px] font-bold text-slate-700">
                        OS Detect
                      </p>
                      <p className="font-mono-custom text-[9px] text-slate-400 mt-0.5">
                        -O flag
                      </p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={osDetect}
                        onChange={(e) => setOsDetect(e.target.checked)}
                      />
                      <span className="slider" />
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-colors">
                    <div>
                      <p className="font-mono-custom text-[10px] font-bold text-slate-700">
                        Version
                      </p>
                      <p className="font-mono-custom text-[9px] text-slate-400 mt-0.5">
                        -sV probe
                      </p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={versionDetect}
                        onChange={(e) => setVersionDetect(e.target.checked)}
                      />
                      <span className="slider" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Scan Options */}
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl shadow-slate-200/40 relative z-10 flex-shrink-0">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200">
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-mono-custom font-bold text-slate-800 text-sm uppercase tracking-wider">
                    Scan Options
                  </h3>
                </div>

                {/* Technique Lock */}
                <div className="mb-6">
                  <p className="font-mono-custom text-[10px] text-slate-500 uppercase tracking-widest mb-2.5 font-bold">
                    Technique Lock
                  </p>
                  <div className="flex items-center justify-between p-4 border-2 border-sky-500/80 bg-gradient-to-r from-sky-50 to-transparent rounded-2xl relative overflow-hidden shadow-[inset_0_1px_4px_rgba(14,165,233,0.1)]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-sky-100">
                        <span className="w-3 h-3 bg-sky-500 rounded-full shadow-[0_0_8px_#38bdf8]" />
                      </div>
                      <div>
                        <p className="font-mono-custom font-bold text-sm text-slate-800">
                          Light Scan (SYN Stealth)
                        </p>
                        <p className="font-mono-custom text-[10px] text-slate-500 mt-0.5">
                          -sS Flag enforced for safety
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-sky-400 opacity-60"
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
                  </div>
                </div>

                {/* Timing */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-mono-custom text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      Timing Template
                    </p>
                    <span className={timingLabelClass}>
                      {TIMING_MAP[timingValue].label}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    value={timingValue}
                    onChange={(e) => setTimingValue(Number(e.target.value))}
                    className="mb-2 w-full cursor-pointer"
                    style={
                      {
                        "--val": `${(timingValue / 5) * 100}%`,
                      } as React.CSSProperties
                    }
                  />
                  <div className="flex justify-between font-mono-custom text-[9px] text-slate-400 font-medium mb-3">
                    <span>T0 Paranoid</span>
                    <span>T5 Insane</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-3 items-start">
                    <svg
                      className="w-4 h-4 text-sky-500 mt-0.5 shrink-0"
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
                    <p className="font-mono-custom text-[10px] text-slate-600 leading-relaxed">
                      {TIMING_MAP[timingValue].desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Network Ports */}
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl shadow-slate-200/40 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm border border-amber-200">
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
                    </div>
                    <h3 className="font-mono-custom font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                      Network Ports
                      <span className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-2 py-0.5 rounded text-[8px] font-bold font-mono-custom tracking-widest shadow-[0_2px_4px_rgba(99,102,241,0.3)]">
                        PRO
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Protocol selector */}
                <div className="flex gap-2 mb-6">
                  {(["TCP", "UDP", "BOTH"] as ProtoType[]).map((proto) => (
                    <button
                      key={proto}
                      className={`proto-btn ${selectedProto === proto ? "active" : ""}`}
                      onClick={() => setSelectedProto(proto)}
                    >
                      {proto === "BOTH" ? "TCP + UDP" : proto}
                    </button>
                  ))}
                </div>

                {/* Port presets */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    {
                      id: "top20",
                      label: "Top 20",
                      ports:
                        "21,22,23,25,53,80,110,111,135,139,143,443,445,993,995,1723,3306,3389,5900,8080",
                    },
                    {
                      id: "top100",
                      label: "Top 100",
                      ports:
                        "21,22,23,25,53,80,110,111,135,139,143,443,445,993,995,1723,3306,3389,5900,8080,8443,8888,9000,9200,27017,5432,6379,11211,2181,5672",
                    },
                    {
                      id: "custom",
                      label: "Custom",
                      ports: "80,443,3306,8000-8010",
                    },
                    { id: "all", label: "All (65k)", ports: "1-65535" },
                  ].map(({ id, label, ports }) => (
                    <button
                      key={id}
                      className={`port-chip ${activePreset === id ? "active" : ""}`}
                      onClick={() => applyPreset(id, ports)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={portRange}
                  onChange={(e) => setPortRange(e.target.value)}
                  placeholder="e.g. 21, 22, 80, 443, 8000-8080"
                  className="w-full flex-1 min-h-[80px] border-2 border-slate-200 rounded-2xl p-4 font-mono-custom text-xs text-slate-700 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all resize-none placeholder-slate-300 leading-relaxed shadow-inner bg-slate-50"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="font-mono-custom text-[9px] text-slate-400">
                    Commas for individual, hyphens for range.
                  </p>
                  <p className="font-mono-custom text-[9px] font-bold text-sky-600">
                    Full 65k unlocked
                  </p>
                </div>
              </div>

              {/* CLI Preview + Scan Button */}
              <div className="flex-shrink-0 mt-4">
                <div className="bg-[#0b1120] border border-slate-700/80 rounded-2xl p-4 mb-5 shadow-inner relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 blur-2xl rounded-full pointer-events-none transition-all group-hover:bg-sky-500/20" />
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-mono-custom text-[9px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-2">
                      <svg
                        className="w-3.5 h-3.5 text-sky-500"
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
                      CLI Preview
                    </p>
                    <span className="flex gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                    </span>
                  </div>
                  <p className="font-mono-custom text-xs text-sky-300 break-all leading-relaxed drop-shadow-[0_0_5px_rgba(56,189,248,0.4)] relative z-10">
                    <span className="text-slate-500 select-none mr-1">$</span>
                    {commandPreview()}
                  </p>
                </div>

                <button
                  onClick={initiateScan}
                  disabled={isScanning}
                  className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-mono-custom font-bold text-sm px-7 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] overflow-hidden border border-sky-400/50 hover:border-white/50 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />
                  <span className="relative z-10 tracking-widest drop-shadow-md">
                    {isScanning ? "SCANNING NETWORK..." : "INITIATE DISCOVERY"}
                  </span>
                  <svg
                    className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 drop-shadow-md"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* end LEFT PANEL */}

            {/* ══ RIGHT PANEL ═════════════════════════════════════════════ */}
            <div className="lg:col-span-8 flex flex-col gap-6 h-full">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
                <StatCard
                  label="Scanned"
                  value={allResults.length}
                  colorClass="border-slate-200/80 text-slate-800"
                />
                <StatCard
                  label="Open"
                  value={statOpen}
                  colorClass="bg-green-50/80 border-green-200/80 text-green-600"
                />
                <StatCard
                  label="Filtered"
                  value={statFiltered}
                  colorClass="bg-yellow-50/80 border-yellow-200/80 text-yellow-600"
                />
                <StatCard
                  label="Closed"
                  value={statClosed}
                  colorClass="border-slate-200/80 text-slate-500"
                />
              </div>

              {/* Discovery Matrix */}
              <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/30 overflow-hidden flex flex-col flex-1 min-h-[350px]">
                {/* Table header */}
                <div className="flex flex-col border-b border-slate-200 flex-shrink-0">
                  <div className="px-6 py-4 bg-white/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-mono-custom font-bold text-slate-800 text-sm">
                        Discovery Matrix
                      </h3>
                      <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md text-[9px] font-bold font-mono-custom uppercase tracking-wider">
                        {filteredResults.length} Ports
                      </span>
                    </div>
                    <button
                      onClick={exportCSV}
                      className="font-mono-custom text-[10px] font-bold text-slate-600 bg-white hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 rounded-lg px-4 py-2 transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Export CSV
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-2 sm:border-r border-slate-300 sm:pr-4">
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
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                      <span className="font-mono-custom text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        Advanced Filters
                      </span>
                      <span className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-1.5 py-0.5 rounded text-[8px] font-bold font-mono-custom tracking-widest shadow-[0_2px_4px_rgba(99,102,241,0.3)]">
                        PRO
                      </span>
                    </div>

                    <div className="flex items-center flex-wrap gap-2">
                      <select
                        value={stateFilter}
                        onChange={(e) =>
                          setStateFilter(e.target.value as StateFilter)
                        }
                        className="font-mono-custom text-[10px] font-bold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 outline-none bg-white hover:bg-slate-50 cursor-pointer transition-colors focus:border-sky-400 focus:ring-1 focus:ring-sky-400 shadow-sm"
                      >
                        <option value="all">Port State: All</option>
                        <option value="open">State: Open Only</option>
                        <option value="filtered">State: Filtered</option>
                        <option value="closed">State: Closed</option>
                      </select>

                      <select className="font-mono-custom text-[10px] font-bold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 outline-none bg-white hover:bg-slate-50 cursor-pointer transition-colors focus:border-sky-400 focus:ring-1 focus:ring-sky-400 shadow-sm">
                        <option>Risk: All Levels</option>
                        <option>Risk: High</option>
                        <option>Risk: Medium</option>
                        <option>Risk: Low</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto relative">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/90 backdrop-blur-md sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <tr className="font-mono-custom text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200">
                        <th className="py-4 px-6 font-bold">Port</th>
                        <th className="py-4 px-6 font-bold">Proto</th>
                        <th className="py-4 px-6 font-bold">State</th>
                        <th className="py-4 px-6 font-bold">Service</th>
                        <th className="py-4 px-6 font-bold hidden sm:table-cell">
                          Version Info
                        </th>
                        <th className="py-4 px-6 font-bold text-right">
                          Risk Level
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-mono-custom text-xs text-slate-600 divide-y divide-slate-100/80">
                      {filteredResults.map((r) => {
                        const isClosed = r.state === "closed";
                        const portColor = isClosed
                          ? "text-slate-500"
                          : "text-slate-800";
                        const serviceColor =
                          r.state === "open"
                            ? "text-sky-600 font-bold"
                            : "text-slate-500";
                        return (
                          <tr
                            key={`${r.port}-${r.proto}`}
                            className={`row-hover transition-all duration-200 cursor-default ${isClosed ? "opacity-60" : ""}`}
                          >
                            <td
                              className={`py-3.5 px-6 font-bold ${portColor}`}
                            >
                              {r.port}
                            </td>
                            <td className="py-3.5 px-6 text-slate-400 text-[11px]">
                              {r.proto}
                            </td>
                            <td className="py-3.5 px-6">
                              <StateBadge state={r.state} />
                            </td>
                            <td className={`py-3.5 px-6 ${serviceColor}`}>
                              {r.service}
                            </td>
                            <td className="py-3.5 px-6 text-slate-500 text-[11px] hidden sm:table-cell">
                              {r.version}
                            </td>
                            <td className="py-3.5 px-6 text-right">
                              <RiskBadge risk={r.risk} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Terminal */}
              <div className="bg-[#0f172a] rounded-3xl border border-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.4)] overflow-hidden flex flex-col h-[280px] flex-shrink-0">
                <div className="bg-[#1e293b] border-b border-slate-800/80 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-green-500 shadow-inner" />
                    </div>
                    <span className="font-mono-custom text-[10px] text-slate-400 tracking-widest uppercase ml-2">
                      nmap_engine_worker
                    </span>
                  </div>
                  <button
                    onClick={clearTerminal}
                    className="font-mono-custom text-[10px] font-bold text-slate-500 hover:text-sky-400 bg-slate-800/50 hover:bg-slate-800 px-3 py-1 rounded transition-colors"
                  >
                    CLEAR
                  </button>
                </div>

                <div
                  ref={terminalRef}
                  className="p-5 overflow-y-auto terminal-scroll font-mono-custom text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#020617] flex-1"
                  dangerouslySetInnerHTML={{ __html: terminalHtml }}
                />
              </div>
            </div>
            {/* end RIGHT PANEL */}
          </div>
        </div>
      </main>
    </div>
  );
}
