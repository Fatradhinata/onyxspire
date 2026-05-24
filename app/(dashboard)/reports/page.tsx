"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";

/* ─────────────────────────── Types ─────────────────────────── */

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
type ComplianceStatus = "PASSED" | "FAILED" | "PARTIAL";

interface Finding {
  id: string;
  title: string;
  severity: Severity;
  cwe: string;
  tool: string;
  description: string;
  evidence: string;
  remediation: string;
  codeSnippet?: string;
  filePath?: string;
}

interface ReportData {
  domain: string;
  id: string;
  ip: string;
  score: number;
  verified: boolean;
  timestamp: string;
  compliance: {
    owasp: ComplianceStatus;
    iso: ComplianceStatus;
    ssl: ComplianceStatus;
  };
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  findings: Finding[];
}

/* ─────────────────────────── Mock Data ─────────────────────────── */

const MOCK_REPORTS: Record<string, ReportData> = {
  "beast.com": {
    domain: "beast.com",
    id: "AUDIT-BEAST-0903",
    ip: "192.168.1.10",
    score: 42,
    verified: true,
    timestamp: "2026-03-09 22:26",
    compliance: { owasp: "FAILED", iso: "PARTIAL", ssl: "PASSED" },
    summary: { critical: 1, high: 2, medium: 4, low: 12 },
    findings: [
      {
        id: "f1",
        title: "Blind SQL Injection",
        severity: "CRITICAL",
        cwe: "CWE-89",
        tool: "SQLMAP",
        description: "The id parameter in the /api/v1/checkout endpoint is directly concatenated into a SQL query.",
        evidence: "GET /api/v1/checkout?id=1%20AND%20(SELECT%206898%20FROM%20(SELECT(SLEEP(5)))xyz) HTTP/1.1\n# Server response delayed by 5.02s",
        remediation: "Enforce the use of Parameterized Queries (Prepared Statements).",
        codeSnippet: "$stmt = $pdo->prepare('SELECT * FROM orders WHERE id = :id');\n$stmt->execute(['id' => $_GET['id']]);",
        filePath: "app/Controllers/Checkout.php"
      },
      {
        id: "f2",
        title: "Cross-Site Scripting (XSS)",
        severity: "HIGH",
        cwe: "CWE-79",
        tool: "WPSCAN",
        description: "Reflected XSS found in the search parameter ?q=.",
        evidence: "<div class=\"search-results\"><h2>Results for: <script>alert(1)</script></h2>",
        remediation: "HTML encode all user-supplied data before rendering.",
        codeSnippet: "echo htmlspecialchars($_GET['q'], ENT_QUOTES, 'UTF-8');"
      }
    ]
  },
  "horizon-defense.io": {
    domain: "horizon-defense.io",
    id: "AUDIT-HORIZON-1102",
    ip: "10.8.0.5",
    score: 91,
    verified: true,
    timestamp: "2026-03-01 08:00",
    compliance: { owasp: "PASSED", iso: "PASSED", ssl: "PASSED" },
    summary: { critical: 0, high: 0, medium: 1, low: 5 },
    findings: [
      {
        id: "f3",
        title: "Server Banner Disclosure",
        severity: "LOW",
        cwe: "CWE-200",
        tool: "FFUF",
        description: "The server reveals exact version of Nginx in the HTTP headers.",
        evidence: "Server: nginx/1.18.0 (Ubuntu)",
        remediation: "Set 'server_tokens off;' in nginx configuration."
      }
    ]
  },
  "nexus-retail.net": {
    domain: "nexus-retail.net",
    id: "AUDIT-NEXUS-0228",
    ip: "172.16.254.1",
    score: 68,
    verified: false,
    timestamp: "2026-02-28 14:15",
    compliance: { owasp: "PARTIAL", iso: "FAILED", ssl: "PASSED" },
    summary: { critical: 0, high: 3, medium: 5, low: 8 },
    findings: [
      {
        id: "f4",
        title: "Insecure Directory Listing",
        severity: "MEDIUM",
        cwe: "CWE-548",
        tool: "FFUF",
        description: "The /uploads/ directory allows listing of all files.",
        evidence: "Index of /uploads/\n[DIR] config/\n[FILE] backup.sql",
        remediation: "Disable directory indexing in server config."
      }
    ]
  },
  "cyber-vault.tech": {
    domain: "cyber-vault.tech",
    id: "AUDIT-VAULT-0412",
    ip: "45.33.21.18",
    score: 15,
    verified: true,
    timestamp: "2026-04-12 10:30",
    compliance: { owasp: "FAILED", iso: "FAILED", ssl: "FAILED" },
    summary: { critical: 5, high: 12, medium: 8, low: 20 },
    findings: []
  },
  "alpha-labs.org": {
    domain: "alpha-labs.org",
    id: "AUDIT-ALPHA-0515",
    ip: "104.24.11.5",
    score: 75,
    verified: true,
    timestamp: "2026-05-15 16:45",
    compliance: { owasp: "PASSED", iso: "PARTIAL", ssl: "PASSED" },
    summary: { critical: 0, high: 1, medium: 3, low: 15 },
    findings: []
  }
};

/* ─────────────────────────── Sub-components ─────────────────────────── */

function SeverityBadge({ severity }: { severity: Severity }) {
  const styles: Record<Severity, string> = {
    CRITICAL: "bg-red-600 text-white",
    HIGH: "bg-orange-500 text-white",
    MEDIUM: "bg-amber-400 text-slate-900",
    LOW: "bg-sky-400 text-white",
  };
  return (
    <span className={`${styles[severity]} font-mono-custom font-bold text-[10px] px-2.5 py-1 rounded shadow-sm`}>
      {severity}
    </span>
  );
}

function ComplianceCard({ label, status }: { label: string; status: ComplianceStatus }) {
  const configs = {
    PASSED: { bg: "bg-green-50/50", border: "border-green-200", text: "text-green-600", label: "PASSED" },
    FAILED: { bg: "bg-red-50/50", border: "border-red-200", text: "text-red-600", label: "FAILED" },
    PARTIAL: { bg: "bg-yellow-50/50", border: "border-yellow-200", text: "text-yellow-700", label: "PARTIAL" },
  };
  const cfg = configs[status];
  return (
    <div className={`flex items-center justify-between p-3 border ${cfg.border} ${cfg.bg} rounded-xl`}>
      <span className="text-xs font-bold text-slate-700">{label}</span>
      <span className={`text-[10px] font-mono-custom font-bold ${cfg.bg.replace('/50','')} ${cfg.text} px-2 py-1 rounded border ${cfg.border}`}>
        {cfg.label}
      </span>
    </div>
  );
}

/* ─── Searchable Dropdown ─── */

interface SearchableSelectProps {
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
}

function SearchableSelect({ options, selected, onSelect }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => 
    options.filter(opt => opt.toLowerCase().includes(search.toLowerCase())),
    [options, search]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-950 border-2 border-slate-800 hover:border-sky-500 rounded-2xl px-6 py-4 flex items-center justify-between group transition-all shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_8px_#0ea5e9]" />
          <span className="font-mono-custom font-bold text-slate-200 tracking-wider">
            {selected}
          </span>
        </div>
        <svg className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="p-4 border-b border-slate-800 bg-slate-950">
            <div className="relative flex items-center">
              <svg className="absolute left-3 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Filter domains..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                className="w-full bg-slate-900 border border-slate-800 text-sky-400 font-mono-custom text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-sky-500/50"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto terminal-scroll">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onSelect(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-6 py-3 font-mono-custom text-sm transition-colors flex items-center justify-between
                    ${selected === opt ? "bg-sky-500/10 text-sky-400 font-bold" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
                >
                  {opt}
                  {selected === opt && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_5px_#0ea5e9]" />}
                </button>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-slate-600 font-mono-custom text-xs">
                No matching targets found.
              </div>
            )}
          </div>
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-[9px] font-mono-custom text-slate-500 text-center uppercase tracking-widest">
            {options.length} Registered Operational Nodes
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── Main Page ─────────────────────────── */

export default function AuditReportPage() {
  const [selectedDomain, setSelectedDomain] = useState("beast.com");
  const data = MOCK_REPORTS[selectedDomain];

  // ── Export Logic ──
  const handleExportCSV = () => {
    const headers = ["ID", "Title", "Severity", "Tool", "CWE", "Description"];
    const rows = data.findings.map(f => [
      f.id, f.title, f.severity, f.tool, f.cwe, f.description.replace(/,/g, ";")
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Onyxspire-Report-${data.domain}-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    alert(`Generating PDF Report for ${data.domain}...\n\n(Note: In production, this would call a server-side PDF generator like Puppeteer or trigger a window.print() styled layout)`);
    window.print();
  };

  return (
    <div className="font-inter bg-[#f8fafc] text-slate-800 h-screen overflow-hidden flex selection:bg-sky-500 selection:text-white">
      <main className="flex-1 flex flex-col h-full relative bg-dashboard-grid z-10 overflow-y-auto terminal-scroll pb-20">
        
        {/* ── Header ── */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 pl-20 pr-4 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-center sm:justify-between sticky top-0 z-40 shadow-sm flex-shrink-0 gap-2 sm:gap-0 py-2 sm:py-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] sm:text-xs font-mono-custom text-sky-600">Audit Hub</span>
              <span className="text-[10px] sm:text-xs text-slate-400">/</span>
              <span className="text-[10px] sm:text-xs font-mono-custom text-slate-500 truncate max-w-[100px] sm:max-w-none">{data.id}</span>
            </div>
            <h2 className="font-mono-custom font-bold text-sm sm:text-xl text-slate-800 tracking-tight flex items-center gap-2 sm:gap-3">
              <span className="truncate max-w-[150px] sm:max-w-none">{data.domain}</span>
              {data.verified && (
                <span className="bg-green-100 text-green-700 border border-green-200 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] uppercase font-bold tracking-widest shrink-0">
                  Verified
                </span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button 
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none bg-white hover:bg-slate-50 text-slate-600 border border-slate-300 font-mono-custom font-bold text-[9px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CSV
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 font-mono-custom font-bold text-[9px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF
            </button>
          </div>
        </header>

        <div className="p-4 md:p-6 xl:p-8 max-w-[90rem] mx-auto w-full space-y-6 sm:space-y-8">
          
          {/* ── Scalable Domain Selector (THE HUB) ── */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-visible">
             <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
             <div className="relative z-10 flex flex-col items-center">
                <h3 className="font-mono-custom text-[8px] sm:text-[10px] font-bold text-sky-400 uppercase tracking-[0.4em] mb-4 sm:mb-6">
                   Select Audit Target
                </h3>
                
                <SearchableSelect 
                  options={Object.keys(MOCK_REPORTS)} 
                  selected={selectedDomain} 
                  onSelect={setSelectedDomain} 
                />

                <div className="mt-4 sm:mt-6 flex items-center gap-4 sm:gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] sm:text-[9px] font-mono-custom text-slate-500 uppercase tracking-widest mb-1">Target IP</span>
                    <span className="text-[10px] sm:text-xs font-mono-custom text-slate-300 font-bold">{data.ip}</span>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-slate-800" />
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] sm:text-[9px] font-mono-custom text-slate-500 uppercase tracking-widest mb-1">Last Audit</span>
                    <span className="text-[10px] sm:text-xs font-mono-custom text-slate-300 font-bold">{data.timestamp}</span>
                  </div>
                </div>
             </div>
          </section>

          {/* ── Global Index Section ── */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="col-span-1 xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-amber-500" />
              <h3 className="font-mono-custom font-bold text-xs sm:text-sm text-slate-500 uppercase tracking-widest w-full text-center mb-6">
                Global Security Index
              </h3>

              <div className="relative w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9155" fill="none" className="text-slate-100" stroke="currentColor" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" 
                    className={data.score < 50 ? "text-red-500" : data.score < 80 ? "text-amber-500" : "text-green-500"} 
                    stroke="currentColor" strokeWidth="3" 
                    strokeDasharray={`${data.score}, 100`} 
                    strokeLinecap="round" 
                    style={{ transition: "stroke-dasharray 1s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
                  <span className="font-mono-custom font-extrabold text-3xl sm:text-5xl text-slate-900">{data.score}</span>
                  <span className="font-mono-custom text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1">/ 100</span>
                </div>
              </div>

              <p className={`mt-6 text-center text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border 
                ${data.score < 50 ? "text-red-600 bg-red-50 border-red-100" : data.score < 80 ? "text-amber-600 bg-amber-50 border-amber-100" : "text-green-600 bg-green-50 border-green-100"}`}>
                {data.score < 50 ? "Critical Status" : data.score < 80 ? "Elevated Risk" : "Secure Environment"}
              </p>
            </div>

            <div className="col-span-1 xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
              <h3 className="font-mono-custom font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-widest mb-6">
                Industry Compliance
              </h3>
              <div className="space-y-4 flex-1">
                <ComplianceCard label="OWASP Top 10" status={data.compliance.owasp} />
                <ComplianceCard label="ISO 27001 (Web)" status={data.compliance.iso} />
                <ComplianceCard label="SSL/TLS Security" status={data.compliance.ssl} />
              </div>
            </div>
          </div>

          {/* ── Summary Stats ── */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Critical", val: data.summary.critical, color: "border-red-600 text-red-600 bg-red-50" },
                { label: "High", val: data.summary.high, color: "border-orange-500 text-orange-600 bg-orange-50" },
                { label: "Medium", val: data.summary.medium, color: "border-amber-400 text-amber-600 bg-amber-50" },
                { label: "Low / Info", val: data.summary.low, color: "border-sky-400 text-sky-600 bg-sky-50" },
              ].map(stat => (
                <div key={stat.label} className={`bg-white border-l-4 ${stat.color.split(' ')[0]} border-y border-r border-slate-200 rounded-r-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow`}>
                  <span className={`inline-block ${stat.color.split(' ')[2]} ${stat.color.split(' ')[1]} text-[8px] sm:text-[10px] font-mono-custom font-bold uppercase tracking-widest mb-1 sm:mb-2 px-1.5 sm:px-2 py-0.5 rounded shrink-0`}>
                    {stat.label}
                  </span>
                  <p className={`text-2xl sm:text-4xl font-mono-custom font-bold ${stat.color.split(' ')[1]}`}>{stat.val}</p>
                </div>
              ))}
            </div>

            <div className="xl:col-span-1 bg-sky-50 border border-sky-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
              <h4 className="text-[10px] sm:text-xs font-bold text-sky-800 uppercase tracking-widest mb-2 font-mono-custom">Business Impact</h4>
              <p className="text-[11px] sm:text-xs text-sky-700 leading-relaxed relative z-10 italic">
                {data.score < 50 
                  ? "\"Critical vulnerabilities detected. Unauthorized access to database and sensitive data is highly probable.\""
                  : "\"General security posture is maintained, however minor improvements are recommended to prevent reconnaissance.\""}
              </p>
            </div>
          </div>

          {/* ── Technical Findings ── */}
          <div className="mt-8 sm:mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <h3 className="font-amarillo text-xl sm:text-3xl text-slate-900 drop-shadow-sm uppercase">
                Technical <span className="text-sky-500">Findings</span>
              </h3>
              <span className="bg-slate-900 text-white text-[9px] sm:text-[10px] font-mono-custom px-2 sm:px-3 py-1 rounded-full uppercase tracking-widest w-fit">
                {data.findings.length} Unfiltered Log Entries
              </span>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {data.findings.length > 0 ? (
                data.findings.map((f) => (
                  <div key={f.id} className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col xl:flex-row">
                    <div className="w-full xl:w-1/2 border-b xl:border-b-0 xl:border-r border-slate-100 flex flex-col">
                      <div className="bg-slate-50 border-b border-slate-100 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <SeverityBadge severity={f.severity} />
                          <span className="font-mono-custom text-[10px] sm:text-xs text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                            {f.cwe}
                          </span>
                        </div>
                        <span className="font-mono-custom text-[10px] sm:text-xs text-slate-400 font-bold uppercase shrink-0">{f.tool}</span>
                      </div>
                      <div className="p-4 sm:p-6 flex-1">
                        <h4 className="font-bold text-slate-900 text-lg sm:text-xl mb-2">{f.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">{f.description}</p>

                        <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden shadow-inner">
                          <div className="bg-[#1e293b] px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                            <span className="font-mono-custom text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest">Evidence Log</span>
                          </div>
                          <div className="p-3 sm:p-4 font-mono-custom text-[10px] sm:text-xs overflow-x-auto terminal-scroll">
                            <pre className="text-slate-300 whitespace-pre-wrap">{f.evidence}</pre>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full xl:w-1/2 p-4 sm:p-6 bg-slate-50/50 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 text-green-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg mb-4 w-fit shadow-sm">
                        <span className="font-mono-custom text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Remediation Protocol</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mb-4 font-bold">{f.remediation}</p>

                      {f.codeSnippet && (
                        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md">
                          <div className="flex justify-between items-center px-4 py-2 border-b border-slate-700 bg-slate-800/80">
                            <span className="font-mono-custom text-[9px] sm:text-[10px] text-slate-400 truncate max-w-[200px]">{f.filePath || "Suggested Patch"}</span>
                          </div>
                          <div className="p-3 sm:p-4 font-mono-custom text-[10px] sm:text-xs overflow-x-auto terminal-scroll">
                            <pre className="text-sky-300 whitespace-pre-wrap">{f.codeSnippet}</pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl sm:rounded-3xl p-10 sm:p-20 text-center">
                   <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                   </div>
                   <h4 className="font-bold text-slate-400 font-mono-custom uppercase tracking-widest text-xs sm:text-sm">No Vulnerabilities Recorded</h4>
                   <p className="text-slate-400 text-[10px] sm:text-xs mt-2 font-mono-custom">Clean audit path. No technical findings detected for this node.</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Footer CTA ── */}
          <div className="mt-12 sm:mt-16 bg-slate-900 rounded-2xl md:rounded-3xl p-0.5 md:p-1 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 opacity-20 animate-pulse pointer-events-none" />
            <div className="bg-slate-950 rounded-[1rem] md:rounded-[1.4rem] p-6 sm:p-8 md:p-10 flex flex-col xl:flex-row items-center justify-between gap-6 sm:gap-8 relative z-10">
              <div className="flex-1 text-center xl:text-left">
                <h3 className="font-amarillo text-xl sm:text-3xl text-white tracking-widest mb-2 uppercase">AUTOMATE YOUR <span className="text-sky-500">DEFENSES</span></h3>
                <p className="text-slate-400 font-mono-custom text-[11px] sm:text-sm max-w-xl mx-auto xl:mx-0 leading-relaxed">
                  Stop scanning manually. Integrate Onyxspire directly into your CI/CD pipeline.
                </p>
              </div>
              <button className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-mono-custom font-bold text-xs sm:text-sm px-8 py-3 sm:py-4 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-transform transform hover:-translate-y-1 active:scale-95 shrink-0">
                Generate API Keys
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
