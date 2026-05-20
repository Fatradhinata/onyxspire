"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import "./sql-injector.css";
import { ProductTour, TourStep } from "@/components/ProductTour";

// ── Types ──────────────────────────────────────────────────────────────────

type VulnStatus = "vulnerable" | "secure" | "checking" | "error";
type Severity = "critical" | "high" | "medium" | "low" | "none";

interface VulnResult {
  parameter: string;
  type: string;
  status: VulnStatus;
  payload: string;
  severity: Severity;
}

// ── Constants ──────────────────────────────────────────────────────────────

const TECHNIQUES = [
  { id: "B", label: "Boolean-based blind" },
  { id: "E", label: "Error-based" },
  { id: "U", label: "Union query-based" },
  { id: "S", label: "Stacked queries" },
  { id: "T", label: "Time-based blind" },
  { id: "Q", label: "Inline queries" },
];

const INITIAL_RESULTS: VulnResult[] = [
  {
    parameter: "id",
    type: "Integer-based SQL Injection",
    status: "vulnerable",
    payload: "id=1 AND 1=1",
    severity: "critical",
  },
  {
    parameter: "user",
    type: "String-based SQL Injection",
    status: "checking",
    payload: "—",
    severity: "none",
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string | number;
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

function StatusBadge({ status }: { status: VulnStatus }) {
  if (status === "vulnerable")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 text-red-700 text-[10px] font-bold border border-red-200 font-mono-custom">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]" />
        VULNERABLE
      </span>
    );
  if (status === "checking")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 text-[10px] font-bold border border-sky-200 font-mono-custom">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse shadow-[0_0_4px_#0ea5e9]" />
        CHECKING
      </span>
    );
  if (status === "secure")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-[10px] font-bold border border-green-200 font-mono-custom">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e]" />
        SECURE
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-200 font-mono-custom">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      ERROR
    </span>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  const styles: Record<Severity, string> = {
    critical: "text-purple-600 bg-purple-50 border-purple-200",
    high: "text-red-600 bg-red-50 border-red-200",
    medium: "text-amber-600 bg-amber-50 border-amber-200",
    low: "text-blue-600 bg-blue-50 border-blue-200",
    none: "text-slate-400 bg-slate-50 border-slate-200",
  };

  return (
    <span className={`font-mono-custom text-[10px] font-bold border px-2 py-1 rounded-md uppercase ${styles[severity]}`}>
      {severity}
    </span>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function SqlMapInjector() {
  // ── State ──
  const [targetUrl, setTargetUrl] = useState("http://testphp.vulnweb.com/listproducts.php?cat=1");
  const [level, setLevel] = useState(1);
  const [risk, setRisk] = useState(1);
  const [activeTechs, setActiveTechs] = useState<string[]>(["B", "E", "U"]);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<VulnResult[]>(INITIAL_RESULTS);
  const [terminalHtml, setTerminalHtml] = useState("");
  const [showTour, setShowTour] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);

  // ── Tour Configuration ──
  const tourSteps: TourStep[] = [
    {
      targetId: "tour-target-config",
      title: "Target Endpoint",
      content: "Enter the full URL you want to test. Make sure it includes parameters like ?id=1 for better results.",
      placement: "right"
    },
    {
      targetId: "tour-techniques",
      title: "Exploit Techniques",
      content: "Select the SQL injection types you want to test. Boolean, Error, and Union are the most common.",
      placement: "right"
    },
    {
      targetId: "tour-launch-btn",
      title: "Launch Exploit",
      content: "Once configured, hit this button to start the automated injection process. Watch the terminal for real-time logs!",
      placement: "top"
    },
    {
      targetId: "tour-matrix",
      title: "Discovery Matrix",
      content: "All detected vulnerabilities and payloads will appear here in real-time. Secure parameters will also be logged.",
      placement: "left"
    }
  ];

  // ── Initializers ──
  useEffect(() => {
    // Check if tour should be shown (Daily Reset Logic)
    const lastTourTimestamp = localStorage.getItem("onyx_tour_sql_injector_ts");
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (!lastTourTimestamp || (now - parseInt(lastTourTimestamp)) > twentyFourHours) {
      setTimeout(() => setShowTour(true), 1000); 
    }

    setTerminalHtml(`
      <div class="text-slate-500 mb-2">$ sqlmap -u "http://testphp.vulnweb.com/listproducts.php?cat=1" --batch</div>
      <div><span class="text-sky-400 font-bold">[INFO] starting sqlmap engine...</span></div>
      <div class="mt-1">[INFO] testing connection to the target URL</div>
      <br/>
      <div class="mt-3">
        <span class="text-red-500 font-bold drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">root@onyxspire:~#</span>
        <span class="cursor-blink inline-block w-2.5 h-4 bg-slate-300 align-middle ml-1.5 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></span>
      </div>
    `);
  }, []);

  const completeTour = () => {
    setShowTour(false);
    localStorage.setItem("onyx_tour_sql_injector_ts", Date.now().toString());
  };

  const commandPreview = useCallback(() => {
    const techs = activeTechs.length > 0 ? ` --technique=${activeTechs.join("")}` : "";
    return `sqlmap -u "${targetUrl || "TARGET"}" --level=${level} --risk=${risk}${techs} --batch`;
  }, [targetUrl, level, risk, activeTechs]);

  // ── Auto-scroll terminal ──
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHtml]);

  // ── Helper: Colorize Sqlmap Output ──
  const colorizeSqlmapOutput = (text: string): string => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\[INFO\]/g, '<span class="text-sky-400 font-bold">[INFO]</span>')
      .replace(/\[WARNING\]/g, '<span class="text-yellow-400 font-bold">[WARNING]</span>')
      .replace(/\[ERROR\]/g, '<span class="text-red-400 font-bold">[ERROR]</span>')
      .replace(/\[CRITICAL\]/g, '<span class="text-red-600 font-bold underline">[CRITICAL]</span>')
      .replace(/\[OK\]/g, '<span class="text-green-400 font-bold">[OK]</span>')
      .replace(/(Parameter: .*)/g, '<span class="text-red-400 font-bold">$1</span>')
      .replace(/(Type: .*)/g, '<span class="text-white">$1</span>')
      .replace(/(Payload: .*)/g, '<span class="text-green-400 font-bold">$1</span>');
  };

  // ── Scan Logic ──
  function toggleTech(id: string) {
    setActiveTechs(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  }

  async function startInjection() {
    if (isScanning) return;
    
    // UI Feedback: Start
    setIsScanning(true);
    setResults([]); // Clear previous results for fresh scan
    
    const techs = activeTechs.length > 0 ? activeTechs.join("") : "BEU";
    const args = ["-u", targetUrl, `--level=${level}`, `--risk=${risk}`, `--technique=${techs}`, "--batch"];
    
    let currentHtml = `<div class="text-slate-500">$ sqlmap ${args.join(" ")}</div>`;
    currentHtml += `<div class="text-sky-400 mt-2">[INFO] initializing injection engine...</div>`;
    setTerminalHtml(currentHtml);

    try {
      // ── API CALL (To be connected by Teammate) ──
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          target: targetUrl, 
          tool: "sqlmap", 
          args 
        }),
      });

      // Handle HTTP Errors (404, 500, etc)
      if (!response.ok) {
        throw new Error(`HTTP Error: Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      // Handle Logic Errors from Backend
      if (data.error) {
        currentHtml += `<div class="text-red-500 mt-2">[ERROR] ${data.error}</div>`;
        if (data.details) {
          currentHtml += `<div class="text-slate-400 text-[10px] ml-4 mt-1">Details: ${data.details}</div>`;
        }
      } else {
        // SUCCESS PATH
        currentHtml += `<div class="text-slate-300 mt-2 whitespace-pre-wrap font-mono-custom text-[11px]">${colorizeSqlmapOutput(data.output || "No output returned from engine.")}</div>`;
        
        // Update Table Results (Teammate can add parser here)
        if (data.results && Array.isArray(data.results)) {
          setResults(data.results);
        } else {
          // Fallback dummy result if backend hasn't implemented parsing yet
          setResults([
            {
              parameter: "cat",
              type: "Boolean-based blind",
              status: "vulnerable",
              payload: "cat=1 AND 1=1",
              severity: "high"
            }
          ]);
        }
      }
    } catch (err: any) {
      // CONNECTION ERRORS (API Down / Network Issue)
      currentHtml += `<div class="text-red-500 mt-2 font-bold">[FATAL] Connection to API failed.</div>`;
      currentHtml += `<div class="text-slate-400 text-[10px] mt-1 italic ml-4">Reason: ${err.message}</div>`;
      currentHtml += `<div class="text-amber-500/80 text-[9px] mt-2 border-l-2 border-amber-500/30 pl-2">
        HINT: Make sure the Next.js API route exists at /api/scan and the backend service is running.
      </div>`;
    } finally {
      // Always reset scanning state and update terminal prompt
      currentHtml += `<div class="mt-4"><span class="text-red-500 font-bold drop-shadow-[0_0_5px_rgba(239,68,68,0.3)]">root@onyxspire:~#</span><span class="cursor-blink inline-block w-2.5 h-4 bg-slate-300 align-middle ml-1.5 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></span></div>`;
      setTerminalHtml(currentHtml);
      setIsScanning(false);
    }
  }

  return (
    <div className="font-inter text-slate-800 flex selection:bg-red-500 selection:text-white bg-slate-50">
      <main className="flex-1 flex flex-col relative bg-dashboard-grid">
        {/* ── Header ── */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="font-mono-custom font-bold text-xl text-slate-800 tracking-tight">
                SQL Map Injector
              </h2>
              <p className="text-xs font-mono-custom text-slate-500 mt-0.5 hidden sm:block">
                Advanced SQL Injection Exploitation Module
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl shadow-sm ${isScanning ? "flex" : "hidden"}`}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-radar absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span className="font-mono-custom text-[10px] font-bold text-red-600 uppercase tracking-widest">
                Injecting Payloads
              </span>
            </div>
          </div>
        </header>

        {/* ── Body ── */}
        <div className="p-4 sm:p-8 mx-auto w-full max-w-[1600px] flex-1 flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch flex-1 pb-10">
            {/* ══ LEFT PANEL ══════════════════════════════════════════════ */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Target Configuration */}
              <div id="tour-target-config" className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden flex-shrink-0">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-bl from-red-100 to-transparent opacity-60 rounded-full pointer-events-none" />

                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shadow-sm border border-red-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9c1.657 0 3 4.03 3 9s-1.343 9-3 9m0-18c-1.657 0-3 4.03-3 9s1.343 9 3 9m-9-9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="font-mono-custom font-bold text-slate-800 text-sm uppercase tracking-wider">
                    Target Configuration
                  </h3>
                </div>

                <div className="mb-5 relative z-10">
                  <div className="flex shadow-sm rounded-xl overflow-hidden border-2 border-slate-200 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10 transition-all bg-white">
                    <span className="inline-flex items-center px-4 bg-slate-50 text-slate-400 font-mono-custom text-xs border-r border-slate-200">
                      URL
                    </span>
                    <input
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="http://example.com/api?id=1"
                      className="flex-1 px-4 py-3.5 min-w-0 outline-none font-mono-custom text-slate-800 text-sm font-bold placeholder-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="font-mono-custom text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold flex justify-between">
                       Level <span>{level}</span>
                     </p>
                     <input
                       type="range" min={1} max={5} value={level}
                       onChange={(e) => setLevel(Number(e.target.value))}
                       className="w-full" style={{"--val": `${((level-1)/4)*100}%`} as any}
                     />
                   </div>
                   <div>
                     <p className="font-mono-custom text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold flex justify-between">
                       Risk <span>{risk}</span>
                     </p>
                     <input
                       type="range" min={1} max={3} value={risk}
                       onChange={(e) => setRisk(Number(e.target.value))}
                       className="w-full" style={{"--val": `${((risk-1)/2)*100}%`} as any}
                     />
                   </div>
                </div>
              </div>

              {/* Techniques */}
              <div id="tour-techniques" className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-xl shadow-slate-200/40 relative z-10 flex-shrink-0">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm border border-orange-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="font-mono-custom font-bold text-slate-800 text-sm uppercase tracking-wider">
                    Exploit Techniques
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {TECHNIQUES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggleTech(t.id)}
                      className={`tech-chip text-left flex justify-between items-center ${activeTechs.includes(t.id) ? "active" : ""}`}
                    >
                      <span>{t.label}</span>
                      <span className="opacity-50 text-[9px]">[{t.id}]</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CLI & Action */}
              <div className="flex-shrink-0 mt-auto">
                <div className="bg-[#0b1120] border border-slate-700/80 rounded-2xl p-4 mb-5 shadow-inner">
                  <p className="font-mono-custom text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Generated Command
                  </p>
                  <p className="font-mono-custom text-xs text-red-300 break-all leading-relaxed">
                    <span className="text-slate-500 select-none mr-1">$</span>
                    {commandPreview()}
                  </p>
                </div>

                <button
                  id="tour-launch-btn"
                  onClick={startInjection}
                  disabled={isScanning}
                  className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-mono-custom font-bold text-sm px-7 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 tracking-widest">
                    {isScanning ? "INJECTING..." : "LAUNCH EXPLOIT"}
                  </span>
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ══ RIGHT PANEL ═════════════════════════════════════════════ */}
            <div className="lg:col-span-8 flex flex-col gap-6 h-full">
              {/* Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
                <StatCard label="Vectors" value={results.length} colorClass="border-slate-200" />
                <StatCard label="Vulnerable" value={results.filter(r => r.status === "vulnerable").length} colorClass="bg-red-50 text-red-600 border-red-200" />
                <StatCard label="Risk Level" value="HIGH" colorClass="bg-amber-50 text-amber-600 border-amber-200" />
                <StatCard label="DB Engine" value="MySQL" colorClass="bg-sky-50 text-sky-600 border-sky-200" />
              </div>

              {/* Vulnerability Matrix */}
              <div id="tour-matrix" className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/30 overflow-hidden flex flex-col flex-1 min-h-[350px]">
                <div className="px-6 py-4 border-b border-slate-200 bg-white/50 flex items-center justify-between">
                  <h3 className="font-mono-custom font-bold text-slate-800 text-sm">Vulnerability Matrix</h3>
                  <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md text-[9px] font-bold font-mono-custom uppercase tracking-wider">
                    {results.length} Parameters Tested
                  </span>
                </div>

                <div className="flex-1 overflow-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/90 backdrop-blur-md sticky top-0 z-10">
                      <tr className="font-mono-custom text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200">
                        <th className="py-4 px-6 font-bold">Parameter</th>
                        <th className="py-4 px-6 font-bold">Exploit Type</th>
                        <th className="py-4 px-6 font-bold">Status</th>
                        <th className="py-4 px-6 font-bold">Severity</th>
                        <th className="py-4 px-6 font-bold text-right">Payload</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono-custom text-xs text-slate-600 divide-y divide-slate-100/80">
                      {results.map((r, idx) => (
                        <tr key={idx} className="row-hover transition-all duration-200">
                          <td className="py-4 px-6 font-bold text-slate-800">{r.parameter}</td>
                          <td className="py-4 px-6 text-slate-500">{r.type}</td>
                          <td className="py-4 px-6"><StatusBadge status={r.status} /></td>
                          <td className="py-4 px-6"><SeverityBadge severity={r.severity} /></td>
                          <td className="py-4 px-6 text-right">
                            <code className="bg-slate-100 px-2 py-1 rounded text-[10px] text-red-500 font-bold">
                              {r.payload}
                            </code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Terminal */}
              <div className="bg-[#0f172a] rounded-3xl border border-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.4)] overflow-hidden flex flex-col h-[280px] flex-shrink-0">
                <div className="bg-[#1e293b] border-b border-slate-800/80 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="font-mono-custom text-[10px] text-slate-400 tracking-widest uppercase ml-2">
                      sqlmap_v1.7_stable
                    </span>
                  </div>
                </div>

                <div
                  ref={terminalRef}
                  className="p-5 overflow-y-auto terminal-scroll font-mono-custom text-xs text-slate-300 leading-relaxed bg-[#020617] flex-1"
                  dangerouslySetInnerHTML={{ __html: terminalHtml }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Tour ── */}
        <ProductTour 
          steps={tourSteps} 
          isVisible={showTour} 
          onComplete={completeTour} 
        />
      </main>
    </div>
  );
}
