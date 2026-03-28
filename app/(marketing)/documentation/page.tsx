"use client"; // Wajib karena ada interaksi form dan state
import Link from "next/link";
import { useState, useEffect } from "react";

function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      
      // Balikin ke asal setelah 2 detik
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal copy bro:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-btn transition-colors ${copied ? "text-green-400" : "text-slate-400"}`}
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}


export default function Documentation() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Pas section masuk view, set state-nya
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" } // Sesuai config lu tadi
    );

    // Ambil semua element section
    const sections = document.querySelectorAll(".doc-section");
    sections.forEach((s) => observer.observe(s));

    // Cleanup: Matiin observer pas pindah page biar gak memory leak
    return () => observer.disconnect();
  }, []);

  // Taruh di bawah useEffect, sebelum return
  const getNavLinkClass = (id: string) => {
    const baseClass = "doc-nav-item block font-mono-custom text-xs py-1.5 px-3 rounded-lg transition-all duration-200";
    const activeClass = "bg-white text-sky-600 shadow-sm border-l-4 border-sky-500 font-bold translate-x-1";
    const inactiveClass = "text-slate-500 hover:bg-white hover:shadow-sm";
    
    // Kalau activeSection match sama id, pake activeClass. Kalau nggak, inactiveClass.
    return `${baseClass} ${activeSection === id ? activeClass : inactiveClass}`;
  };

  return (
    <>
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 bg-grid-pattern opacity-50 pointer-events-none" />
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="shape-blob w-[500px] h-[500px] bg-cyan-200 top-[-5%] left-[-8%] animate-blob" />
        <div className="shape-blob w-96 h-96 bg-blue-200 top-[40%] right-[-5%] animate-blob animation-delay-2000" />
        <div className="shape-blob w-[600px] h-[600px] bg-indigo-100 bottom-[-10%] left-[20%] animate-blob animation-delay-4000"></div>
      </div>
      {/* Decorative SVG Shapes */}
      <div className="organic-shape right-[5%] top-32 hidden lg:block">
        <svg
          width={180}
          height={180}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45,-76.3C58.3,-69.3,69.1,-55.3,77.5,-40.4C85.9,-25.5,91.8,-9.7,89.5,5.1C87.2,19.9,76.6,33.7,65.2,45.4C53.8,57.1,41.6,66.7,27.6,73.1C13.6,79.5,-2.1,82.8,-17.7,79.8C-33.3,76.8,-48.9,67.6,-60.8,55.1C-72.7,42.6,-80.9,26.8,-84.6,10.2C-88.3,-6.4,-87.5,-23.8,-79.8,-37.8C-72.1,-51.8,-57.5,-62.4,-42.6,-68.6C-27.7,-74.8,-13.8,-76.5,1.2,-78.6C16.3,-80.7,31.7,-83.3,45,-76.3Z"
            transform="translate(100 100)"
            fill="#0ea5e9"
          />
        </svg>
      </div>
      <div
        className="organic-shape left-[3%] top-[55%] hidden lg:block"
        style={{ opacity: "0.07" }}
      >
        <svg
          width={140}
          height={140}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M54.2,-65.8C69.1,-55.7,79.5,-38.9,81.6,-21.4C83.7,-3.9,77.6,14.3,68.1,29.5C58.7,44.7,46,56.9,31.2,64.1C16.4,71.2,-0.6,73.3,-16.5,68.5C-32.4,63.7,-47.2,52,-57.7,37.4C-68.3,22.8,-74.6,5.3,-72.4,-11.2C-70.2,-27.7,-59.5,-43.2,-46,-53.8C-32.5,-64.4,-16.3,-70.1,1.4,-71.7C19,-73.3,39.3,-75.9,54.2,-65.8Z"
            transform="translate(100 100)"
            fill="#6366f1"
          />
        </svg>
      </div>
      {/* ═══ HERO SECTION ══════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-20 px-6 overflow-hidden border-b border-slate-200/60">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-40"></div>
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 mb-5">
                <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-ping absolute" />
                <span className="relative flex h-2 w-2 rounded-full bg-sky-500" />
                <span className="text-xs font-mono-custom font-bold text-sky-700 tracking-wider">
                  DOCS v2.4 — UPDATED
                </span>
              </div>
              <h1 className="font-amarillo text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-tight mb-4">
                DOCUMENTATION
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
                  &amp; LEARNING
                </span>
              </h1>
              <p className="font-inter text-slate-500 text-lg leading-relaxed max-w-xl mb-8">
                Complete technical reference for every module, tier limitation,
                and integration workflow inside the Onyxspire engine.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#arsenal"
                  className="px-5 py-2.5 bg-slate-900 text-white font-mono-custom text-sm font-bold rounded-xl hover:bg-sky-600 transition-all shadow-lg hover:shadow-sky-500/30 flex items-center gap-2"
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Explore Arsenal
                </a>
                <a
                  href="#tiers"
                  className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 font-mono-custom text-sm font-bold rounded-xl hover:border-sky-300 hover:text-sky-600 transition-all"
                >
                  View Tier Limits
                </a>
              </div>
            </div>
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 lg:w-72">
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="font-amarillo text-3xl text-sky-500 mb-1">
                  05
                </div>
                <div className="font-mono-custom text-xs text-slate-500 uppercase tracking-wider">
                  Attack Modules
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="font-amarillo text-3xl text-indigo-500 mb-1">
                  65K
                </div>
                <div className="font-mono-custom text-xs text-slate-500 uppercase tracking-wider">
                  Ports Scanned
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="font-amarillo text-3xl text-slate-800 mb-1">
                  04
                </div>
                <div className="font-mono-custom text-xs text-slate-500 uppercase tracking-wider">
                  Plan Tiers
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="font-amarillo text-3xl text-emerald-500 mb-1">
                  99%
                </div>
                <div className="font-mono-custom text-xs text-slate-500 uppercase tracking-wider">
                  Uptime SLA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ═══ MAIN CONTENT ══════════════════════════════════ */}
      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-16">
        <div className="flex gap-10 lg:gap-14">
          {/* ── SIDEBAR ─────────────────────────────────── */}
          <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-40 h-fit">
      <div className="doc-sidebar">
        <div className="font-mono-custom text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          On This Page
        </div>
        
        <div className="space-y-0.5">
          <div className="font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-4 mb-2 px-1">
            Getting Started
          </div>
          
          {/* Section: Overview */}
          <a href="#overview" className={getNavLinkClass("overview")}>
            Platform Overview
          </a>
          
          <a href="#quickstart" className={getNavLinkClass("quickstart")}>
            Quickstart Guide
          </a>
          
          <a href="#tiers" className={getNavLinkClass("tiers")}>
            Tier Limitations
          </a>

          <div className="font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-5 mb-2 px-1">
            The Arsenal
          </div>
          
          <a href="#arsenal" className={getNavLinkClass("arsenal")}>
            Module Overview
          </a>
          
          {/* Sub-items (↳) tetep dapet highlight kalau section-nya pas */}
          <a href="#wpscan" className={`${getNavLinkClass("wpscan")} pl-6`}>
            ↳ WPSCAN
          </a>
          
          <a href="#portscan" className={`${getNavLinkClass("portscan")} pl-6`}>
            ↳ PORT SCANNER
          </a>
          
          <a href="#sqlmap" className={`${getNavLinkClass("sqlmap")} pl-6`}>
            ↳ SQLMAP
          </a>

          <div className="font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-5 mb-2 px-1">
            Reference
          </div>
          
          <a href="#sla" className={getNavLinkClass("sla")}>
            SLA &amp; Compliance
          </a>

          <a href="#ethics" className={getNavLinkClass("ethics")}>
            Ethics & Legal
          </a>
        </div>

        {/* Engine Version Card */}
        <div className="mt-8 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="font-mono-custom text-[9px] text-slate-400 uppercase tracking-wider mb-1">
            Engine Version
          </div>
          <div className="font-mono-custom text-xs font-bold text-slate-700">
            onyxspire-core@2.4.1
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono-custom text-[9px] text-emerald-600">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </aside>
          {/* ── MAIN DOCS CONTENT ───────────────────────── */}
          <main className="flex-1 min-w-0 space-y-20">
            {/* ── SECTION: Platform Overview ──────────────── */}
            <section id="overview" className="doc-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-[10px] font-mono-custom font-bold text-slate-500 tracking-widest uppercase">
                    Getting Started
                  </span>
                </div>
              </div>
              <h2 className="font-amarillo text-4xl text-slate-900 mb-4">
                PLATFORM <span className="text-sky-500">OVERVIEW</span>
              </h2>
              <div className="prose-doc">
                <p>
                  Onyxspire is a web-based{" "}
                  <strong className="text-slate-700">
                    Cybersecurity as a Service (CSaaS)
                  </strong>
                  platform that simulates real-world attack vectors against web
                  targets you own or have explicit authorization to test. The
                  engine orchestrates multiple open-source penetration testing
                  tools through a unified, authenticated interface.
                </p>
                <p>
                  All scan operations are isolated per tenant. Your data, scan
                  configurations, and results are encrypted at rest with
                  AES-256-GCM and never shared across accounts. The platform
                  enforces strict ownership verification before any active probe
                  is dispatched.
                </p>
              </div>
              {/* Architecture diagram card */}
              <div className="mt-6 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                  <span className="font-mono-custom text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    System Architecture
                  </span>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                    <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-3 border border-sky-100">
                      <svg
                        className="w-5 h-5 text-sky-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="font-mono-custom text-xs font-bold text-slate-700 mb-1">
                      Client Layer
                    </div>
                    <div className="font-mono-custom text-[10px] text-slate-400">
                      Web UI / API Calls
                    </div>
                  </div>
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-center relative">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                      <span className="tier-badge bg-sky-100 text-sky-700 border border-sky-200">
                        CORE
                      </span>
                    </div>
                    <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center mx-auto mb-3 mt-2">
                      <svg
                        className="w-5 h-5 text-white"
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
                    <div className="font-mono-custom text-xs font-bold text-slate-700 mb-1">
                      Orchestration Engine
                    </div>
                    <div className="font-mono-custom text-[10px] text-slate-400">
                      Task Queue + Workers
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3 border border-indigo-100">
                      <svg
                        className="w-5 h-5 text-indigo-600"
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
                    </div>
                    <div className="font-mono-custom text-xs font-bold text-slate-700 mb-1">
                      Scan Modules
                    </div>
                    <div className="font-mono-custom text-[10px] text-slate-400">
                      WPSCAN · NMAP · SQLMAP
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* ── SECTION: Quickstart ──────────────────────── */}
            <section id="quickstart" className="doc-section">
              <h2 className="font-amarillo text-4xl text-slate-900 mb-2">
                QUICKSTART <span className="text-sky-500">GUIDE</span>
              </h2>
              <p className="font-mono-custom text-sm text-slate-400 mb-6">
                Get your first scan running in under 2 minutes.
              </p>
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="group flex gap-5 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-amarillo text-lg flex-shrink-0 group-hover:bg-sky-500 transition-colors duration-300 shadow-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono-custom font-bold text-sm text-slate-900 mb-1">
                      Register &amp; Select Your Tier
                    </h3>
                    <p className="font-inter text-sm text-slate-500">
                      Create an account and choose a plan. Free Trial gives you
                      1 scan to verify the platform. Pro unlocks the full
                      arsenal.
                    </p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="group flex gap-5 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-amarillo text-lg flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono-custom font-bold text-sm text-slate-900 mb-1">
                      Register Your Target Asset
                    </h3>
                    <p className="font-inter text-sm text-slate-500">
                      Input the URL of your target. Onyxspire requires you to
                      verify ownership via DNS TXT record or file upload before
                      scanning.
                    </p>
                    <div className="code-block mt-3">
                      <div className="code-bar">
                        <span className="font-mono-custom text-[10px] text-slate-400">
                          Ownership Verification
                        </span>
                        <CopyButton textToCopy="_onyxspire-verify.yourdomain.com Value: onyx-verify=a8f3d2e91c7b4056" />
                      </div>
                      <div className="p-4 font-mono-custom text-xs">
                        <span className="text-slate-500">
                          # Add DNS TXT record to your domain:
                        </span>
                        <br />
                        <span className="text-sky-400">_onyxspire-verify</span>
                        <span className="text-slate-400">.</span>
                        <span className="text-green-400">yourdomain.com</span>
                        <br />
                        <span className="text-slate-500">Value: </span>
                        <span className="text-amber-400">
                          onyx-verify=a8f3d2e91c7b4056
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="group flex gap-5 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-amarillo text-lg flex-shrink-0 group-hover:bg-indigo-600 transition-colors duration-300 shadow-lg">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono-custom font-bold text-sm text-slate-900 mb-1">
                      Launch a Scan Module
                    </h3>
                    <p className="font-inter text-sm text-slate-500">
                      Select a module from the Command Center, configure
                      parameters if needed, and dispatch. Results populate in
                      real-time.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* ── SECTION: Tier Limitations ─────────────────── */}
            <section id="tiers" className="doc-section">
              <h2 className="font-amarillo text-4xl text-slate-900 mb-2">
                TIER <span className="text-sky-500">LIMITATIONS</span>
              </h2>
              <p className="font-inter text-slate-500 text-base mb-7">
                Each plan tier enforces specific operational boundaries on the
                scan engine. Review carefully before selecting your plan.
              </p>
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50">
                        <th className="text-left px-5 py-3.5 font-mono-custom text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          Parameter
                        </th>
                        <th className="text-center px-4 py-3.5 font-mono-custom text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          Free Trial
                        </th>
                        <th className="text-center px-4 py-3.5 font-mono-custom text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          Starter
                        </th>
                        <th className="text-center px-4 py-3.5 font-mono-custom text-[10px] bg-sky-50 text-sky-600 uppercase tracking-wider font-bold">
                          Pro
                        </th>
                        <th className="text-center px-4 py-3.5 font-mono-custom text-[10px] text-indigo-600 bg-indigo-50 uppercase tracking-wider font-bold">
                          Enterprise
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono-custom text-sm">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-slate-600 text-xs font-medium">
                          Run Limit
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs text-slate-500">
                          1x / 2 days
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs text-slate-500">
                          2x / 2 days
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-sky-600 bg-sky-50/30">
                          10x / 2 days
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-indigo-600 bg-indigo-50/30">
                          Unlimited
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-slate-600 text-xs font-medium">
                          Port Scan Range
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs text-slate-500">
                          1–1,000
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs text-slate-500">
                          1–10,000
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-sky-600 bg-sky-50/30">
                          1–65,535
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-indigo-600 bg-indigo-50/30">
                          1–65,535
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-slate-600 text-xs font-medium">
                          Cooldown Period
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs text-slate-500">
                          30 min
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs text-slate-500">
                          10 min
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-sky-600 bg-sky-50/30">
                          3 min
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-indigo-600 bg-indigo-50/30">
                          20 sec
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-slate-600 text-xs font-medium">
                          Result Visibility
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs">
                          <span className="text-red-400">Limited</span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs">
                          <span className="text-amber-500">Partial</span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-sky-600 bg-sky-50/30">
                          Full
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-indigo-600 bg-indigo-50/30">
                          Full + Export
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-slate-600 text-xs font-medium">
                          Remediation Steps
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs">
                          <span className="text-red-400">✕</span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs">
                          <span className="text-red-400">✕</span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-sky-600 bg-sky-50/30">
                          ✓
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-indigo-600 bg-indigo-50/30">
                          ✓ + Priority
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-slate-600 text-xs font-medium">
                          HYDRA / FFUF Access
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs">
                          <span className="text-red-400">✕</span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs">
                          <span className="text-red-400">✕</span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-sky-600 bg-sky-50/30">
                          ✓
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-indigo-600 bg-indigo-50/30">
                          ✓
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-slate-600 text-xs font-medium">
                          API Access
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs">
                          <span className="text-red-400">✕</span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs">
                          <span className="text-red-400">✕</span>
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-sky-600 bg-sky-50/30">
                          ✓
                        </td>
                        <td className="px-4 py-3.5 text-center text-xs font-bold text-indigo-600 bg-indigo-50/30">
                          ✓ + Webhooks
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            {/* ── SECTION: The Arsenal ──────────────────────── */}
            <section id="arsenal" className="doc-section">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-[10px] font-mono-custom font-bold text-slate-500 tracking-widest uppercase">
                    The Arsenal
                  </span>
                </div>
              </div>
              <h2 className="font-amarillo text-4xl text-slate-900 mb-3">
                MODULE <span className="text-sky-500">OVERVIEW</span>
              </h2>
              <p className="font-inter text-slate-500 text-base mb-8">
                Onyxspire's engine is powered by battle-tested, open-source
                security tools. Each module is sandboxed, rate-limited, and
                instrumented for audit logging.
              </p>
              {/* Module grid overview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
                <a
                  href="#wpscan"
                  className="group bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-sky-300 hover:shadow-md hover:shadow-sky-500/5 transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-sky-600 group-hover:text-white transition-colors"
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
                  </div>
                  <div>
                    <div className="font-mono-custom text-xs font-bold text-slate-800">
                      WPSCAN
                    </div>
                    <div className="font-mono-custom text-[9px] text-slate-400">
                      WordPress Scanner
                    </div>
                  </div>
                </a>
                <a
                  href="#portscan"
                  className="group bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-custom text-xs font-bold text-slate-800">
                      PORT SCANNER
                    </div>
                    <div className="font-mono-custom text-[9px] text-slate-400">
                      Network Discovery
                    </div>
                  </div>
                </a>
                <a
                  href="#sqlmap"
                  className="group bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-custom text-xs font-bold text-slate-800">
                      SQLMAP
                    </div>
                    <div className="font-mono-custom text-[9px] text-slate-400">
                      SQL Injection Engine
                    </div>
                  </div>
                </a>
                <a
                  href="#hydra-ffuf"
                  className="group bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-rose-300 hover:shadow-md hover:shadow-rose-500/5 transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-rose-100 rounded-lg flex items-center justify-center group-hover:bg-rose-500 transition-colors duration-300 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-rose-600 group-hover:text-white transition-colors"
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
                  <div>
                    <div className="font-mono-custom text-xs font-bold text-slate-800">
                      HYDRA
                    </div>
                    <div className="font-mono-custom text-[9px] text-slate-400">
                      Brute Force Tester
                    </div>
                  </div>
                </a>
                <a
                  href="#hydra-ffuf"
                  className="group bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-amber-300 hover:shadow-md hover:shadow-amber-500/5 transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-amber-600 group-hover:text-white transition-colors"
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
                  </div>
                  <div>
                    <div className="font-mono-custom text-xs font-bold text-slate-800">
                      FFUF
                    </div>
                    <div className="font-mono-custom text-[9px] text-slate-400">
                      Directory Fuzzer
                    </div>
                  </div>
                </a>
              </div>
            </section>
            {/* ── MODULE: WPSCAN ────────────────────────────── */}
            <section id="wpscan" className="doc-section">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono-custom text-[10px] font-bold bg-sky-50 text-sky-600 px-2 py-1 rounded-md border border-sky-100 tracking-wider">
                        [ CMS-AUDIT ]
                      </span>
                      <span className="tier-badge bg-slate-100 text-slate-500 border border-slate-200">
                        ALL TIERS
                      </span>
                    </div>
                    <h3 className="font-amarillo text-2xl text-slate-900">
                      WPSCAN
                    </h3>
                    <p className="font-mono-custom text-xs text-slate-400 mt-1">
                      WordPress Security Scanner — CMS Vulnerability Detection
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-sky-200">
                    <svg
                      className="w-6 h-6 text-sky-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-6 prose-doc">
                  <p>
                    WPSCAN is a specialized black-box security scanner targeting
                    WordPress CMS installations. It enumerates users, themes,
                    and plugins while cross-referencing findings against the
                    WPVulnDB vulnerability database.
                  </p>
                  <h3 className="text-sm">Detection Targets</h3>
                  <ul>
                    <li>Outdated core WordPress version with known CVEs</li>
                    <li>Vulnerable or unmaintained plugins and themes</li>
                    <li>
                      Exposed{" "}
                      <code className="font-mono-custom text-xs bg-slate-100 px-1.5 py-0.5 rounded text-sky-700">
                        wp-config.php
                      </code>
                      and{" "}
                      <code className="font-mono-custom text-xs bg-slate-100 px-1.5 py-0.5 rounded text-sky-700">
                        xmlrpc.php
                      </code>
                      endpoints
                    </li>
                    <li>Username enumeration via author archives</li>
                    <li>Directory listing and backup file exposure</li>
                  </ul>
                  {/* Code block */}
                  <div className="code-block mt-4">
                    <div className="code-bar">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                        <span className="font-mono-custom text-[10px] text-slate-400 ml-2">
                          Sample Output
                        </span>
                      </div>
                      <span className="copy-btn font-mono-custom text-[10px] text-slate-500">
                        copy
                      </span>
                    </div>
                    <div className="p-4 font-mono-custom text-xs space-y-1">
                      <div>
                        <span className="text-green-400">[+]</span>{" "}
                        <span className="text-slate-300">
                          URL: https://target.com/
                        </span>
                      </div>
                      <div>
                        <span className="text-green-400">[+]</span>{" "}
                        <span className="text-slate-300">
                          WordPress version
                        </span>
                        <span className="text-amber-400">6.2.1</span>
                        <span className="text-slate-300"> identified</span>
                      </div>
                      <div>
                        <span className="text-red-400">[!]</span>{" "}
                        <span className="text-slate-300">Plugin </span>
                        <span className="text-red-400">
                          contact-form-7 v5.7.6
                        </span>
                        <span className="text-slate-300"> — CVE-2023-XXXX</span>
                      </div>
                      <div>
                        <span className="text-red-400">[!]</span>{" "}
                        <span className="text-slate-300">xmlrpc.php </span>
                        <span className="text-red-400">enabled</span>
                        <span className="text-slate-300">
                          {" "}
                          — brute force vector
                        </span>
                      </div>
                      <div>
                        <span className="text-sky-400">[i]</span>{" "}
                        <span className="text-slate-300">
                          User(s) Identified:
                        </span>
                        <span className="text-sky-300">admin</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* ── MODULE: PORT SCANNER ──────────────────────── */}
            <section id="portscan" className="doc-section">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono-custom text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 tracking-wider">
                        [ NETWORK ]
                      </span>
                      <span className="tier-badge bg-sky-50 text-sky-600 border border-sky-200">
                        PRO+
                      </span>
                    </div>
                    <h3 className="font-amarillo text-2xl text-slate-900">
                      PORT SCANNER
                    </h3>
                    <p className="font-mono-custom text-xs text-slate-400 mt-1">
                      TCP/UDP Network Discovery — Full Range 1-65535
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-200">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-6 prose-doc">
                  <p>
                    The Port Scanner probes TCP and UDP traffic at a target IP
                    or domain. It identifies open, closed, and filtered services
                    — mapping the attack surface of the exposed network layer.
                  </p>
                  <p>
                    Free Trial and Starter tier users are limited to the first
                    1,000 and 10,000 ports respectively. Pro and Enterprise
                    tiers unlock the complete 65,535 port range, enabling
                    discovery of non-standard services running on high ports.
                  </p>
                  <div className="info-box mt-4 mb-4">
                    <div className="font-mono-custom text-xs font-bold text-sky-600 mb-1">
                      Common Ports to Watch
                    </div>
                    <div className="font-mono-custom text-xs text-slate-500">
                      21 (FTP) · 22 (SSH) · 23 (Telnet) · 80 (HTTP) · 443
                      (HTTPS) · 3306 (MySQL) · 5432 (Postgres) · 8080 (Alt HTTP)
                      · 27017 (MongoDB)
                    </div>
                  </div>
                  <div className="code-block">
                    <div className="code-bar">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                        <span className="font-mono-custom text-[10px] text-slate-400 ml-2">
                          Scan Output
                        </span>
                      </div>
                    </div>
                    <div className="p-4 font-mono-custom text-xs space-y-1">
                      <div>
                        <span className="text-slate-500">
                          PORT STATE SERVICE VERSION
                        </span>
                      </div>
                      <div>
                        <span className="text-sky-400">22/tcp </span>
                        <span className="text-green-400"> open </span>
                        <span className="text-slate-300"> ssh OpenSSH 8.9</span>
                      </div>
                      <div>
                        <span className="text-sky-400">80/tcp </span>
                        <span className="text-green-400"> open </span>
                        <span className="text-slate-300">
                          {" "}
                          http nginx 1.24.0
                        </span>
                      </div>
                      <div>
                        <span className="text-sky-400">443/tcp </span>
                        <span className="text-green-400"> open </span>
                        <span className="text-slate-300">
                          {" "}
                          https nginx 1.24.0
                        </span>
                      </div>
                      <div>
                        <span className="text-sky-400">3306/tcp</span>
                        <span className="text-red-400"> open </span>
                        <span className="text-slate-300">
                          {" "}
                          mysql MySQL 8.0.32{" "}
                        </span>
                        <span className="text-red-400">⚠ exposed</span>
                      </div>
                      <div>
                        <span className="text-sky-400">8080/tcp</span>
                        <span className="text-amber-400"> filtered</span>
                        <span className="text-slate-300"> http-proxy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* ── MODULE: SQLMAP ────────────────────────────── */}
            <section id="sqlmap" className="doc-section">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono-custom text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md border border-indigo-100 tracking-wider">
                        [ SQL-INJECTION ]
                      </span>
                      <span className="tier-badge bg-sky-50 text-sky-600 border border-sky-200">
                        STARTER+
                      </span>
                    </div>
                    <h3 className="font-amarillo text-2xl text-slate-900">
                      SQLMAP
                    </h3>
                    <p className="font-mono-custom text-xs text-slate-400 mt-1">
                      Automated SQL Injection Detection &amp; Exploitation
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-indigo-200">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-6 prose-doc">
                  <p>
                    SQLMAP automates the detection and simulation of SQL
                    Injection vulnerabilities in URL parameters, form inputs,
                    and headers. The engine tests payloads across multiple
                    injection techniques including boolean-based blind,
                    error-based, time-based blind, and UNION-based attacks.
                  </p>
                  <div className="warn-box my-4">
                    <div className="font-mono-custom text-xs font-bold text-amber-600 mb-1">
                      ⚠ Safety Notice
                    </div>
                    <div className="font-inter text-sm text-slate-600">
                      SQLMAP operates in{" "}
                      <strong>read-only simulation mode</strong> on Onyxspire.
                      The engine detects and confirms vulnerability vectors but
                      does not execute database takeover, write operations, or
                      data exfiltration against your target.
                    </div>
                  </div>
                  <h3 className="text-sm">Injection Techniques Tested</h3>
                  <ul>
                    <li>Boolean-based blind injection</li>
                    <li>
                      Error-based injection (MySQL, MSSQL, Oracle, PostgreSQL)
                    </li>
                    <li>Time-based blind injection</li>
                    <li>UNION query-based injection</li>
                    <li>Stacked queries injection</li>
                  </ul>
                  <div className="code-block mt-4">
                    <div className="code-bar">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                        <span className="font-mono-custom text-[10px] text-slate-400 ml-2">
                          Detection Output
                        </span>
                      </div>
                    </div>
                    <div className="p-4 font-mono-custom text-xs space-y-1">
                      <div>
                        <span className="text-slate-500">
                          [*] Target: https://target.com/product?id=5
                        </span>
                      </div>
                      <div>
                        <span className="text-green-400">[+]</span>{" "}
                        <span className="text-slate-300">Parameter </span>
                        <span className="text-sky-400">id</span>
                        <span className="text-slate-300"> is injectable</span>
                      </div>
                      <div>
                        <span className="text-green-400">[+]</span>{" "}
                        <span className="text-amber-400">
                          boolean-based blind
                        </span>
                        <span className="text-slate-300">
                          {" "}
                          — AND 1=1 / AND 1=2
                        </span>
                      </div>
                      <div>
                        <span className="text-green-400">[+]</span>{" "}
                        <span className="text-amber-400">error-based</span>
                        <span className="text-slate-300">
                          {" "}
                          — MySQL &gt;= 5.0 (EXTRACTVALUE)
                        </span>
                      </div>
                      <div>
                        <span className="text-red-400">[!]</span>{" "}
                        <span className="text-slate-300">DBMS: </span>
                        <span className="text-red-300">MySQL 8.0.32</span>
                      </div>
                      <div>
                        <span className="text-sky-400">[i]</span>{" "}
                        <span className="text-slate-400">
                          Exploitation blocked — read-only mode active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* ── MODULE: HYDRA & FFUF ──────────────────────── */}
            <section id="hydra-ffuf" className="doc-section">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* HYDRA */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-5 pt-5 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono-custom text-[10px] font-bold bg-rose-50 text-rose-600 px-2 py-1 rounded-md border border-rose-100 tracking-wider">
                        [ BRUTE-FORCE ]
                      </span>
                      <span className="tier-badge bg-sky-50 text-sky-600 border border-sky-200">
                        PRO+
                      </span>
                    </div>
                    <h3 className="font-amarillo text-xl text-slate-900">
                      HYDRA
                    </h3>
                    <p className="font-mono-custom text-[10px] text-slate-400 mt-1">
                      Network Authentication Brute-Force Tester
                    </p>
                  </div>
                  <div className="p-5 prose-doc">
                    <p className="text-sm">
                      Hydra tests authentication strength on network services by
                      simulating dictionary and brute-force attacks. It
                      validates whether login endpoints are protected against
                      credential stuffing.
                    </p>
                    <h3 className="text-xs">Supported Protocols</h3>
                    <ul className="text-xs">
                      <li>SSH, FTP, Telnet, SMB</li>
                      <li>HTTP/HTTPS form login</li>
                      <li>RDP, MySQL, PostgreSQL</li>
                    </ul>
                    <div className="mt-3 p-3 bg-rose-50 border border-rose-200 border-l-4 border-l-rose-400 rounded-lg">
                      <div className="font-mono-custom text-[10px] font-bold text-rose-600 mb-0.5">
                        Rate Limiting Applied
                      </div>
                      <div className="font-mono-custom text-[10px] text-slate-500">
                        Max 500 attempts/minute to prevent target overload.
                      </div>
                    </div>
                  </div>
                </div>
                {/* FFUF */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-5 pt-5 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono-custom text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded-md border border-amber-100 tracking-wider">
                        [ DIR-FUZZ ]
                      </span>
                      <span className="tier-badge bg-sky-50 text-sky-600 border border-sky-200">
                        PRO+
                      </span>
                    </div>
                    <h3 className="font-amarillo text-xl text-slate-900">
                      FFUF
                    </h3>
                    <p className="font-mono-custom text-[10px] text-slate-400 mt-1">
                      Fuzz Faster U Fool — Web Directory Fuzzer
                    </p>
                  </div>
                  <div className="p-5 prose-doc">
                    <p className="text-sm">
                      FFUF discovers hidden directories, files, and endpoints by
                      fuzzing URL paths against curated wordlists. It surfaces
                      accidentally exposed assets that could become attack entry
                      points.
                    </p>
                    <h3 className="text-xs">Common Discoveries</h3>
                    <ul className="text-xs">
                      <li>
                        Exposed{" "}
                        <code className="font-mono-custom text-[10px] bg-slate-100 px-1 py-0.5 rounded text-sky-700">
                          .env
                        </code>{" "}
                        and config files
                      </li>
                      <li>
                        Admin panels (
                        <code className="font-mono-custom text-[10px] bg-slate-100 px-1 py-0.5 rounded text-sky-700">
                          /admin
                        </code>
                        ,
                        <code className="font-mono-custom text-[10px] bg-slate-100 px-1 py-0.5 rounded text-sky-700">
                          /phpmyadmin
                        </code>
                        )
                      </li>
                      <li>Database backup files</li>
                    </ul>
                    <div className="mt-3 code-block">
                      <div className="p-3 font-mono-custom text-[10px] space-y-1">
                        <div>
                          <span className="text-green-400">200</span>{" "}
                          <span className="text-slate-400">│</span>{" "}
                          <span className="text-slate-300">/admin/</span>
                        </div>
                        <div>
                          <span className="text-green-400">200</span>{" "}
                          <span className="text-slate-400">│</span>{" "}
                          <span className="text-red-400">/.env</span>{" "}
                          <span className="text-amber-400">⚠ EXPOSED</span>
                        </div>
                        <div>
                          <span className="text-slate-500">403</span>{" "}
                          <span className="text-slate-400">│</span>{" "}
                          <span className="text-slate-500">/backup/</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* ── SECTION: SLA & Compliance ─────────────────── */}
            <section id="sla" className="doc-section">
              <h2 className="font-amarillo text-4xl text-slate-900 mb-3">
                SLA &amp; <span className="text-sky-500">COMPLIANCE</span>
              </h2>
              <p className="font-inter text-slate-500 text-base mb-7">
                Onyxspire is built to enterprise compliance standards. Below are
                the operational SLAs governing platform behavior.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <svg
                        className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors"
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
                    </div>
                    <span className="font-mono-custom text-xs font-bold text-slate-700">
                      Uptime Guarantee
                    </span>
                  </div>
                  <div className="font-amarillo text-3xl text-emerald-500 mb-1">
                    99.9%
                  </div>
                  <div className="font-mono-custom text-xs text-slate-400">
                    Monthly uptime SLA across all regions. Scheduled maintenance
                    windows excluded.
                  </div>
                </div>
                <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                      <svg
                        className="w-4 h-4 text-sky-600 group-hover:text-white transition-colors"
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
                    <span className="font-mono-custom text-xs font-bold text-slate-700">
                      Encryption Standard
                    </span>
                  </div>
                  <div className="font-amarillo text-3xl text-sky-500 mb-1">
                    AES-256
                  </div>
                  <div className="font-mono-custom text-xs text-slate-400">
                    All data at rest encrypted with AES-256-GCM. TLS 1.3
                    enforced for all API traffic.
                  </div>
                </div>
                <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                      <svg
                        className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors"
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
                    </div>
                    <span className="font-mono-custom text-xs font-bold text-slate-700">
                      OWASP Alignment
                    </span>
                  </div>
                  <div className="font-amarillo text-3xl text-indigo-500 mb-1">
                    TOP 10
                  </div>
                  <div className="font-mono-custom text-xs text-slate-400">
                    Detection coverage mapped to OWASP Top 10 vulnerability
                    categories for audit compliance.
                  </div>
                </div>
                <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-amber-300 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                      <svg
                        className="w-4 h-4 text-amber-600 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                    <span className="font-mono-custom text-xs font-bold text-slate-700">
                      Data Retention
                    </span>
                  </div>
                  <div className="font-amarillo text-3xl text-amber-500 mb-1">
                    ZERO
                  </div>
                  <div className="font-mono-custom text-xs text-slate-400">
                    Scan results purged on schedule per your preference. No
                    long-term raw data storage.
                  </div>
                </div>
              </div>
            </section>
            {/* ── SECTION: Ethics & Legal ───────────────────── */}
            <section id="ethics" className="doc-section">
              <h2 className="font-amarillo text-4xl text-slate-900 mb-3">
                ETHICS &amp; <span className="text-sky-500">LEGAL</span>
              </h2>
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl">
                <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono-custom text-[10px] text-slate-400 ml-2">
                    onyxspire — responsible-use-policy.md
                  </span>
                </div>
                <div className="p-6 font-mono-custom text-xs space-y-3">
                  <div className="flex gap-3">
                    <span className="text-green-400 flex-shrink-0">[§1]</span>
                    <span className="text-slate-300">
                      You must own or have{" "}
                      <span className="text-sky-400">
                        explicit written authorization
                      </span>{" "}
                      to test the target asset.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-green-400 flex-shrink-0">[§2]</span>
                    <span className="text-slate-300">
                      All scan activity is logged with timestamps, IP addresses,
                      and target metadata for{" "}
                      <span className="text-sky-400">
                        full audit trail compliance
                      </span>
                      .
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-green-400 flex-shrink-0">[§3]</span>
                    <span className="text-slate-300">
                      SQLMAP and exploitation modules operate in{" "}
                      <span className="text-amber-400">
                        read-only detection mode only
                      </span>
                      . No destructive payloads are executed.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-green-400 flex-shrink-0">[§4]</span>
                    <span className="text-slate-300">
                      Attempting to scan IP ranges or targets outside your
                      verified domain will result in{" "}
                      <span className="text-red-400">
                        immediate account suspension
                      </span>
                      .
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-green-400 flex-shrink-0">[§5]</span>
                    <span className="text-slate-300">
                      Onyxspire is a{" "}
                      <span className="text-sky-400">white-hat platform</span>.
                      Misuse for unauthorized access constitutes a violation of
                      applicable cybercrime laws.
                    </span>
                  </div>
                  <div className="mt-2 pt-3 border-t border-slate-700/50 text-slate-500">
                    By using Onyxspire, you agree to the full Terms of Service
                    and Responsible Disclosure policy.
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
