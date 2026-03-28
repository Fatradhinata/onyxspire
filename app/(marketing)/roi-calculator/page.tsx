"use client";
import { useState, useMemo } from "react";

export default function RoiCalculator() {
  // ── 1. State untuk Input Sliders ───────────────────────
  const [assets, setAssets] = useState(50);
  const [freq, setFreq] = useState(4);
  const [cost, setCost] = useState(500);
  const [breach, setBreach] = useState(250000);

  // ── 2. Konstanta ───────────────────────────────────────
  const ONYX_MONTHLY = 69;
  const ONYX_YEARLY = ONYX_MONTHLY * 12;
  const CIRCUMFERENCE = 427; // 2π × 68

  // ── 3. Helper: Format Currency ────────────────────────
  const fmt = (n: number) => {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return "$" + n.toLocaleString("en-US");
    return "$" + n;
  };

  // ── 4. Calculation Logic (Reactive) ────────────────────
  // Kita pake useMemo biar kalkulasi cuma jalan pas data input berubah
  const { manualYear, savings, totalValue, savingsPct, ringOffset } =
    useMemo(() => {
      const manualYear = freq * cost * assets;
      const savings = Math.max(0, manualYear - ONYX_YEARLY);
      const totalValue = savings + breach;
      const savingsPct = manualYear > 0 ? (savings / manualYear) * 100 : 0;
      const ringOffset = CIRCUMFERENCE - (savingsPct / 100) * CIRCUMFERENCE;

      return { manualYear, savings, totalValue, savingsPct, ringOffset };
    }, [assets, freq, cost, breach]);

  // Helper buat ngitung background gradient slider (mirip updateTrack di JS lu)
  const getTrackStyle = (val: number, min: number, max: number) => {
    const pct = ((val - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #0f172a 0%, #0f172a ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
    };
  };

  return (
    <>
      {/* ════ BACKGROUND LAYERS ════════════════════════════ */}
      {/* Grid */}
      <div className="fixed inset-0 z-0 bg-grid-pattern opacity-50 pointer-events-none" />
      {/* Blobs (different positioning from other pages) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top-right warm blob (unique to this page) */}
        <div className="absolute top-[-8%] right-[-6%] w-[420px] h-[420px] bg-sky-200 rounded-full mix-blend-multiply filter blur-[110px] opacity-60 animate-blob"></div>
        {/* Center-left cool blob */}
        <div className="absolute top-[35%] left-[-8%] w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-55 animate-blob delay-2"></div>
        {/* Bottom-center */}
        <div className="absolute bottom-[-5%] left-[40%] w-[500px] h-[500px] bg-cyan-100 rounded-full mix-blend-multiply filter blur-[130px] opacity-50 animate-blob delay-4"></div>
        {/* Extra accent */}
        <div className="absolute top-[60%] right-[10%] w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-[90px] opacity-40 animate-blob delay-6"></div>
      </div>
      {/* ══ UNIQUE DECORATIVE SHAPES (different from other pages) ══ */}
      {/* Spinning ring — top-left */}
      <div className="fixed top-28 left-8 z-0 pointer-events-none opacity-[0.07] hidden xl:block">
        <div className="spin-slow w-48 h-48">
          <svg
            viewBox="0 0 192 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx={96}
              cy={96}
              r={88}
              stroke="#0ea5e9"
              strokeWidth={2}
              strokeDasharray="8 6"
            />
            <circle
              cx={96}
              cy={96}
              r={64}
              stroke="#6366f1"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            <circle
              cx={96}
              cy={96}
              r={40}
              stroke="#0ea5e9"
              strokeWidth={1}
              strokeDasharray="3 10"
            />
          </svg>
        </div>
      </div>
      {/* Floating diamond — right side */}
      <div className="fixed top-[38%] right-12 z-0 pointer-events-none opacity-[0.08] hidden xl:block">
        <div
          className="float-anim w-20 h-20 bg-gradient-to-br from-sky-400 to-indigo-500"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
      </div>
      {/* Morphing blob shape — bottom left */}
      <div className="fixed bottom-[12%] left-[6%] z-0 pointer-events-none opacity-[0.07] hidden xl:block">
        <div className="morph-anim w-36 h-36 bg-sky-400" />
      </div>
      {/* Corner bracket — top right */}
      <div className="fixed top-36 right-[18%] z-0 pointer-events-none opacity-[0.06] hidden lg:block">
        <svg width={80} height={80} viewBox="0 0 80 80" fill="none">
          <path
            d="M0 20 L0 0 L20 0"
            stroke="#0ea5e9"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path
            d="M80 60 L80 80 L60 80"
            stroke="#6366f1"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path
            d="M40 0 L40 80"
            stroke="#0ea5e9"
            strokeWidth={1}
            strokeDasharray="3 5"
            opacity="0.5"
          />
        </svg>
      </div>
      {/* ════ HERO ══════════════════════════════════════════ */}
      <section className="relative z-10 pt-36 pb-16 px-6 text-center overflow-hidden">
        {/* Horizontal rule accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-40"></div>
        {/* Hero badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50/60 backdrop-blur-sm shadow-sm mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
          </span>
          <span className="text-xs font-mono-c font-bold text-sky-700 tracking-wider">
            ROI CALCULATOR — LIVE COMPUTATION
          </span>
        </div>
        <h1 className="font-amarillo text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-slate-900 leading-tight mb-5">
          CALCULATE YOUR
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
            SAVINGS
          </span>
        </h1>
        <p className="font-mono-c text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-4 leading-relaxed">
          See exactly how much you're overspending on manual security audits —
          and what automation saves you in real numbers.
        </p>
        <p className="font-inter text-sm text-slate-400 max-w-xl mx-auto">
          Adjust the parameters below. Results update instantly.
        </p>
      </section>
      {/* ════ TICKER ═══════════════════════════════════════ */}
      <div className="relative z-10 bg-slate-900 border-y border-slate-800 py-2.5 overflow-hidden">
        <div className="ticker-track items-center">
          <span className="font-mono-c text-[10px] font-bold text-sky-400 tracking-[0.18em] uppercase px-8">
            Cost Efficient
          </span>
          <span className="text-slate-600 px-4">◆</span>
          <span className="font-mono-c text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase px-8">
            Instant Scanning
          </span>
          <span className="text-slate-600 px-4">◆</span>
          <span className="font-mono-c text-[10px] font-bold text-sky-400 tracking-[0.18em] uppercase px-8">
            Zero Commitment
          </span>
          <span className="text-slate-600 px-4">◆</span>
          <span className="font-mono-c text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase px-8">
            99.9% Uptime SLA
          </span>
          <span className="text-slate-600 px-4">◆</span>
          <span className="font-mono-c text-[10px] font-bold text-sky-400 tracking-[0.18em] uppercase px-8">
            OWASP Compliant
          </span>
          <span className="text-slate-600 px-4">◆</span>
          <span className="font-mono-c text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase px-8">
            AES-256 Encrypted
          </span>
          <span className="text-slate-600 px-4">◆</span>
          {/* Duplicate for seamless loop */}
          <span className="font-mono-c text-[10px] font-bold text-sky-400 tracking-[0.18em] uppercase px-8">
            Cost Efficient
          </span>
          <span className="text-slate-600 px-4">◆</span>
          <span className="font-mono-c text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase px-8">
            Instant Scanning
          </span>
          <span className="text-slate-600 px-4">◆</span>
          <span className="font-mono-c text-[10px] font-bold text-sky-400 tracking-[0.18em] uppercase px-8">
            Zero Commitment
          </span>
          <span className="text-slate-600 px-4">◆</span>
          <span className="font-mono-c text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase px-8">
            99.9% Uptime SLA
          </span>
          <span className="text-slate-600 px-4">◆</span>
          <span className="font-mono-c text-[10px] font-bold text-sky-400 tracking-[0.18em] uppercase px-8">
            OWASP Compliant
          </span>
          <span className="text-slate-600 px-4">◆</span>
          <span className="font-mono-c text-[10px] font-bold text-slate-400 tracking-[0.18em] uppercase px-8">
            AES-256 Encrypted
          </span>
          <span className="text-slate-600 px-4">◆</span>
        </div>
      </div>
      {/* ════ CALCULATOR SECTION ═══════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* ── LEFT: INPUT PANEL ──────────────────────── */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              {/* Panel header */}
              <div className="px-7 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-mono-c text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    [ INPUT PARAMETERS ]
                  </div>
                  <div className="font-mono-c text-sm font-bold text-slate-800">
                    Security Audit Variables
                  </div>
                </div>
                <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-sky-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-7 space-y-8">
                {/* Slider 1: Asset Count */}
                <div className="slider-group">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-mono-c text-xs font-bold text-slate-700">
                        Asset Count
                      </div>
                      <div className="font-inter text-xs text-slate-400 mt-0.5">
                        Number of domains / web apps you manage
                      </div>
                    </div>
                    <div
                      className="bg-slate-900 text-sky-400 font-mono-c text-sm font-bold px-3 py-1 rounded-lg min-w-[48px] text-center"
                      id="val-assets"
                    >
                      {assets}
                    </div>
                  </div>
                  <input
                    type="range"
                    id="slider-assets"
                    min={1}
                    max={50}
                    value={assets} // GANTI: biar slidernya gerak sesuai state
                    onChange={(e) => setAssets(Number(e.target.value))} // TAMBAH: biar state berubah pas digeser
                    className="w-full"
                    style={getTrackStyle(assets, 1, 50)}
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="font-mono-c text-[9px] text-slate-400">
                      1
                    </span>
                    <span className="font-mono-c text-[9px] text-slate-400">
                      50 assets
                    </span>
                  </div>
                </div>
                {/* Slider 2: Audit Frequency */}
                <div className="slider-group">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-mono-c text-xs font-bold text-slate-700">
                        Manual Audit Frequency
                      </div>
                      <div className="font-inter text-xs text-slate-400 mt-0.5">
                        Times per year you hire a manual pentester
                      </div>
                    </div>
                    <div
                      className="bg-slate-900 text-sky-400 font-mono-c text-sm font-bold px-3 py-1 rounded-lg min-w-[48px] text-center"
                      id="val-freq"
                    >
                      3
                      <span className="text-slate-500 text-xs font-normal">
                        /yr
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    id="slider-freq"
                    min={1}
                    max={24}
                    value={freq} // GANTI: biar slidernya gerak sesuai state
                    onChange={(e) => setFreq(Number(e.target.value))} // TAMBAH: biar state berubah pas digeser
                    className="w-full"
                    style={getTrackStyle(freq, 1, 24)}
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="font-mono-c text-[9px] text-slate-400">
                      1x / yr
                    </span>
                    <span className="font-mono-c text-[9px] text-slate-400">
                      24x / yr
                    </span>
                  </div>
                </div>
                {/* Slider 3: Manual Audit Cost */}
                <div className="slider-group">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-mono-c text-xs font-bold text-slate-700">
                        Cost per Manual Audit
                      </div>
                      <div className="font-inter text-xs text-slate-400 mt-0.5">
                        Average fee charged per audit session
                      </div>
                    </div>
                    <div
                      className="bg-slate-900 text-sky-400 font-mono-c text-sm font-bold px-3 py-1 rounded-lg min-w-[72px] text-center"
                      id="val-cost"
                    >
                      $1,500
                    </div>
                  </div>
                  <input
                    type="range"
                    id="slider-cost"
                    min={500}
                    max={10000}
                    step={100}
                    value={cost} // GANTI: biar slidernya gerak sesuai state
                    onChange={(e) => setCost(Number(e.target.value))} // TAMBAH: biar state berubah pas digeser
                    className="w-full"
                    style={getTrackStyle(cost, 500, 10000)}
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="font-mono-c text-[9px] text-slate-400">
                      $500
                    </span>
                    <span className="font-mono-c text-[9px] text-slate-400">
                      $10,000
                    </span>
                  </div>
                </div>
                {/* Slider 4: Breach Impact */}
                <div className="slider-group">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-mono-c text-xs font-bold text-slate-700">
                        Potential Breach Impact
                      </div>
                      <div className="font-inter text-xs text-slate-400 mt-0.5">
                        Estimated financial loss if a breach occurs
                      </div>
                    </div>
                    <div
                      className="bg-slate-900 text-rose-400 font-mono-c text-sm font-bold px-3 py-1 rounded-lg min-w-[72px] text-center"
                      id="val-breach"
                    >
                      $50,000
                    </div>
                  </div>
                  <input
                    type="range"
                    id="slider-breach"
                    min={5000}
                    max={500000}
                    step={5000}
                    value={breach} // GANTI: biar slidernya gerak sesuai state
                    onChange={(e) => setBreach(Number(e.target.value))} // TAMBAH: biar state berubah pas digeser
                    className="w-full"
                    style={getTrackStyle(breach, 5000, 500000)}
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="font-mono-c text-[9px] text-slate-400">
                      $5K
                    </span>
                    <span className="font-mono-c text-[9px] text-slate-400">
                      $500K
                    </span>
                  </div>
                </div>
                {/* Onyxspire cost (static display) */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono-c text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Onyxspire Pro
                    </div>
                    <div className="font-inter text-xs text-slate-500">
                      Your alternative — fully automated
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-amarillo text-2xl text-sky-500">
                      $69
                    </div>
                    <div className="font-mono-c text-[9px] text-slate-400">
                      / month
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ── RIGHT: OUTPUT PANEL ────────────────────── */}
            <div className="space-y-5">
              {/* Gauge card */}
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="px-7 py-5 border-b border-slate-100">
                  <div className="font-mono-c text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    [ SAVINGS GAUGE ]
                  </div>
                  <div className="font-mono-c text-sm font-bold text-slate-800">
                    Annual Cost Comparison
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-8">
                    {/* SVG Gauge Ring */}
                    <div className="relative flex-shrink-0 w-36 h-36">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 160 160"
                      >
                        {/* Track */}
                        <circle
                          cx={80}
                          cy={80}
                          r={68}
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth={12}
                        />
                        {/* Fill ring */}
                        <circle
                          id="gauge-ring"
                          cx={80}
                          cy={80}
                          r={68}
                          fill="none"
                          stroke="url(#gaugeGrad)"
                          strokeWidth={12}
                          strokeLinecap="round"
                          strokeDasharray={427}
                          strokeDashoffset={ringOffset}
                          className="transition-all duration-500 ease-out"
                        />
                        <defs>
                          <linearGradient
                            id="gaugeGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#6366f1" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* Center text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div
                          className="font-amarillo text-2xl text-slate-900 leading-none"
                          id="gauge-pct"
                        >
                          {Math.round(savingsPct)}%
                        </div>
                        <div className="font-mono-c text-[9px] text-slate-400 mt-0.5">
                          SAVED
                        </div>
                      </div>
                    </div>
                    {/* Breakdown numbers */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-400 flex-shrink-0" />
                          <span className="font-mono-c text-xs text-slate-500">
                            Manual Cost / yr
                          </span>
                        </div>
                        <span
                          className="font-mono-c text-xs font-bold text-slate-700"
                          id="out-manual"
                        >
                          $22,500
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 flex-shrink-0" />
                          <span className="font-mono-c text-xs text-slate-500">
                            {fmt(manualYear)}
                          </span>
                        </div>
                        <span
                          className="font-mono-c text-xs font-bold text-sky-600"
                          id="out-onyx"
                        >
                          {fmt(ONYX_YEARLY)}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-mono-c text-xs font-bold text-slate-700">
                          You Save
                        </span>
                        <span
                          className="font-mono-c text-sm font-bold text-emerald-600"
                          id="out-save"
                        >
                          {fmt(savings)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Savings bar */}
                  <div className="mt-5">
                    <div className="flex justify-between mb-1.5">
                      <span className="font-mono-c text-[9px] text-slate-400 uppercase tracking-wider">
                        Savings Rate
                      </span>
                      <span
                        className="font-mono-c text-[9px] font-bold text-emerald-600"
                        id="bar-pct-label"
                      >
                        76.3%
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        id="savings-bar"
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-700 ease-out"
                        style={{ width: `${Math.min(Math.max(savingsPct, 4), 98)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Metric cards row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Breach Mitigation */}
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="font-mono-c text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Breach Mitigation
                  </div>
                  <div
                    className="font-amarillo text-2xl text-indigo-500 leading-none mb-1"
                    id="out-breach-val"
                  >
                    $50,000
                  </div>
                  <div className="font-inter text-xs text-slate-400">
                    assets protected per year
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="font-mono-c text-[9px] text-indigo-400 font-bold">
                      Risk hedged
                    </span>
                  </div>
                </div>
                {/* Time Efficiency */}
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="font-mono-c text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Time Efficiency
                  </div>
                  <div className="flex items-end gap-2 mb-1">
                    <div className="font-amarillo text-2xl text-slate-900 leading-none">
                      Weeks
                    </div>
                    <div className="font-mono-c text-xs text-slate-400 mb-0.5">
                      →
                    </div>
                    <div className="font-amarillo text-2xl text-sky-500 leading-none">
                      Mins
                    </div>
                  </div>
                  <div className="font-inter text-xs text-slate-400">
                    execution time comparison
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="font-mono-c text-[9px] text-sky-500 font-bold">
                      Instant automation
                    </span>
                  </div>
                </div>
              </div>
              {/* Total value card */}
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="font-mono-c text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Total Annual Value Protected
                </div>
                <div className="flex items-end gap-3">
                  <div
                    className="font-amarillo text-4xl text-slate-900 leading-none"
                    id="out-total-val"
                  >
                    {fmt(totalValue)}
                  </div>
                  <div className="font-mono-c text-xs text-emerald-500 font-bold mb-1">
                    ↑ vs. manual
                  </div>
                </div>
                <div className="font-inter text-xs text-slate-400 mt-1.5">
                  Combined savings + breach risk mitigation across{" "}
                  <span
                    className="font-bold text-slate-600"
                    id="out-assets-label"
                  >
                    {assets} asset{assets > 1 ? 's' : ''}
                  </span>
                </div>
                {/* Value bar fill */}
                <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    id="value-bar"
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-sky-400 transition-all duration-700"
                    style={{ width: "80%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ── OVERSPEND ALERT + CTA ──────────────────────── */}
          <div
            id="cta-block"
            className="mt-10 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative"
          >
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
            {/* BG decoration inside card */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e908_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e908_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full filter blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full filter blur-[70px] pointer-events-none"></div>
            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Icon */}
              <div className="w-16 h-16 flex-shrink-0 bg-rose-500/10 border border-rose-500/25 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-rose-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              {/* Text */}
              <div className="flex-1">
                <div className="font-mono-c text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2">
                  [ COST ALERT ]
                </div>
                <p className="font-mono-c text-white text-base font-bold leading-snug mb-1.5">
                  You are currently overspending by{" "}
                  <span className="text-rose-400" id="cta-overspend">
                    {fmt(savings)}
                  </span>{" "}
                  per year.
                </p>
                <p className="font-inter text-slate-400 text-sm">
                  Deploy Onyxspire Pro to save{" "}
                  <span className="text-sky-400 font-bold" id="cta-save">
                    {fmt(savings)}
                  </span>{" "}
                  annually — starting at just $69/month with zero infrastructure
                  overhead.
                </p>
              </div>
              {/* CTA Button */}
              <div className="flex-shrink-0">
                <a
                  href="#"
                  className="cta-pulse group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-mono-c font-bold text-sm px-7 py-4 rounded-2xl hover:from-indigo-500 hover:to-sky-500 transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  DEPLOY PRO INSTANCE
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <div className="font-mono-c text-[9px] text-slate-500 text-center mt-2 tracking-wider">
                  NO CREDIT CARD REQUIRED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ════ COMPARISON TABLE ══════════════════════════════ */}
      <section className="relative z-10 py-20 px-6 bg-white border-t border-slate-200/60 overflow-hidden">
        {/* Decorative: cross-hatch top-right */}
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-[0.04]">
          <svg width={256} height={256} viewBox="0 0 256 256">
            <defs>
              <pattern
                id="cross"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 10 L20 10 M10 0 L10 20"
                  stroke="#0ea5e9"
                  strokeWidth={1}
                />
              </pattern>
            </defs>
            <rect width={256} height={256} fill="url(#cross)" />
          </svg>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-4">
              <svg
                className="w-3.5 h-3.5 text-sky-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="text-[10px] font-mono-c font-bold text-slate-600 tracking-widest uppercase">
                Side by Side
              </span>
            </div>
            <h2 className="font-amarillo text-4xl md:text-5xl text-slate-900 mb-3">
              MANUAL <span className="text-rose-500">VS</span>
              AUTOMATED
            </h2>
            <p className="font-mono-c text-slate-500 text-sm">
              The hidden costs of staying manual — and what you gain by
              switching.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Manual column */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden">
              <div className="px-6 py-4 bg-rose-50/60 border-b border-rose-200/60 flex items-center gap-3">
                <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-mono-c text-xs font-bold text-rose-700">
                    Manual Process
                  </div>
                  <div className="font-mono-c text-[9px] text-rose-400 uppercase tracking-wider">
                    Traditional Pentesting
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-rose-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-2.5 h-2.5 text-rose-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-c text-xs font-bold text-slate-700">
                      $1,500–$5,000 per session
                    </div>
                    <div className="font-inter text-xs text-slate-400 mt-0.5">
                      Billed per engagement, not per result
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-rose-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-2.5 h-2.5 text-rose-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-c text-xs font-bold text-slate-700">
                      2–4 weeks turnaround
                    </div>
                    <div className="font-inter text-xs text-slate-400 mt-0.5">
                      Vulnerabilities stay open while you wait
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-rose-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-2.5 h-2.5 text-rose-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-c text-xs font-bold text-slate-700">
                      Infrequent, snapshot-only
                    </div>
                    <div className="font-inter text-xs text-slate-400 mt-0.5">
                      No coverage between audit cycles
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-rose-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-2.5 h-2.5 text-rose-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-c text-xs font-bold text-slate-700">
                      No real-time monitoring
                    </div>
                    <div className="font-inter text-xs text-slate-400 mt-0.5">
                      New exploits undetected between audits
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Onyxspire column */}
            <div className="bg-slate-900 border border-sky-500/20 rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="px-6 py-4 border-b border-sky-500/15 flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 bg-sky-500/15 rounded-lg flex items-center justify-center border border-sky-500/20">
                  <svg
                    className="w-4 h-4 text-sky-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-mono-c text-xs font-bold text-sky-400">
                    The Onyxspire Way
                  </div>
                  <div className="font-mono-c text-[9px] text-sky-600 uppercase tracking-wider">
                    Automated CSaaS
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-3.5 relative z-10">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-sky-500/15 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border border-sky-500/20">
                    <svg
                      className="w-2.5 h-2.5 text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-c text-xs font-bold text-slate-200">
                      $69 / month, flat rate
                    </div>
                    <div className="font-inter text-xs text-slate-500 mt-0.5">
                      Unlimited scans across all your assets
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-sky-500/15 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border border-sky-500/20">
                    <svg
                      className="w-2.5 h-2.5 text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-c text-xs font-bold text-slate-200">
                      Results in minutes
                    </div>
                    <div className="font-inter text-xs text-slate-500 mt-0.5">
                      Full port scan + CVE detection, instantly
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-sky-500/15 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border border-sky-500/20">
                    <svg
                      className="w-2.5 h-2.5 text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-c text-xs font-bold text-slate-200">
                      On-demand, any time
                    </div>
                    <div className="font-inter text-xs text-slate-500 mt-0.5">
                      Re-scan after every deployment or change
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-sky-500/15 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border border-sky-500/20">
                    <svg
                      className="w-2.5 h-2.5 text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono-c text-xs font-bold text-slate-200">
                      Actionable remediation steps
                    </div>
                    <div className="font-inter text-xs text-slate-500 mt-0.5">
                      Fix instructions bundled with every finding
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
