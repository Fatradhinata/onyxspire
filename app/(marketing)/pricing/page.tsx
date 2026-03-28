"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  // Helper fungsi buat ngitung harga diskon 20%
  const getPrice = (monthlyPrice: number) => {
    if (isAnnual) {
      // Diskon 20% dikali 12 bulan (tapi kita tampilin per bulan aja biar keren)
      return Math.floor(monthlyPrice * 0.8);
    }
    return monthlyPrice;
  };

  return (
    <>
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-cyan-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob"></div>
        <div className="absolute top-[30%] right-[-5%] w-[35rem] h-[35rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-[20%] w-[40rem] h-[40rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[130px] opacity-50 animate-blob animation-delay-4000"></div>
      </div>
      <div className="absolute right-10 top-60 z-0 opacity-10 hidden lg:block pointer-events-none">
        <svg
          width={300}
          height={300}
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
      <header className="fixed top-0 w-full z-50 border-b border-white/20 bg-white/40 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="logo.png"
              alt="Onyxspire Logo"
              className="h-12 w-12 object-contain drop-shadow-md"
            />
            <span className="font-amarillo text-2xl text-slate-900 mt-1">
              ONYXSPIRE
            </span>
          </div>
          <div className="hidden md:flex space-x-10 text-sm font-bold font-mono-custom text-slate-600">
            <a
              href="index.html"
              className="hover:text-sky-600 hover:underline decoration-2 decoration-sky-500 underline-offset-8 transition-all"
            >
              HOME
            </a>
            <a
              href="#"
              className="hover:text-sky-600 hover:underline decoration-2 decoration-sky-500 underline-offset-8 transition-all"
            >
              DASHBOARD
            </a>
            <a
              href="#"
              className="hover:text-sky-600 hover:underline decoration-2 decoration-sky-500 underline-offset-8 transition-all"
            >
              CONTACT US
            </a>
            <a
              href="#"
              className="hover:text-sky-600 hover:underline decoration-2 decoration-sky-500 underline-offset-8 transition-all"
            >
              LOGIN
            </a>
          </div>
          <div className="hidden md:block">
            <a
              href="#"
              className="bg-slate-900 text-white font-mono-custom text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-sky-600 transition-colors shadow-lg hover:shadow-sky-500/50"
            >
              PRICING
            </a>
          </div>
        </nav>
      </header>
      <main className="relative z-10 pt-40 pb-32 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Heading */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-xs font-mono-custom font-bold text-slate-600 tracking-widest uppercase">
                Pricing Plans
              </span>
            </div>
            <h1 className="font-amarillo text-5xl md:text-6xl lg:text-7xl text-slate-900 mb-6 drop-shadow-sm leading-tight">
              SCALE YOUR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
                TESTING
              </span>
            </h1>
            <p className="font-mono-custom text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              From solo developers to enterprise infrastructures, our pricing
              scales with your growth. Offering transparent features, priority
              support, and flexible billing worldwide.
            </p>
          </div>
          {/* Billing Toggle */}
          <div className="flex justify-center mb-16 relative z-10">
            <div className="relative flex items-center p-1.5 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-full shadow-sm">
              <motion.div
                layout
                className="absolute inset-y-1.5 bg-slate-900 rounded-full shadow-md"
                initial={false}
                animate={{
                  left: isAnnual ? "calc(50% + 3px)" : "6px",
                  width: "calc(50% - 9px)",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative z-10 w-32 py-2.5 text-sm font-mono-custom font-bold transition-colors cursor-pointer text-center ${
                  !isAnnual
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative z-10 w-32 py-2.5 text-sm font-mono-custom font-bold transition-colors cursor-pointer text-center ${
                  isAnnual
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Annually
              </button>
              <div className="absolute -top-3 -right-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono-custom tracking-wider shadow-lg transform rotate-12 border border-sky-300/30">
                SAVE 20%
              </div>
            </div>
          </div>

          {/* ── PRICING CARDS: 4 columns ── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center lg:px-4 relative">
            {/* ── FREE TRIAL ── */}
            <div className="group relative bg-white/70 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
              {/* Free badge */}
              <div className="absolute top-5 right-6">
                <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono-custom tracking-wider uppercase">
                  FREE
                </span>
              </div>
              <div className="mb-8 border-b border-slate-100 pb-8">
                <h3 className="font-mono-custom font-bold text-2xl text-slate-900 mb-2">
                  Free Trial
                </h3>
                <p className="text-slate-500 text-sm h-10 leading-relaxed">
                  Explore our core security features with zero commitment.
                </p>
              </div>
              <div className="mb-8 flex items-end gap-1">
                <span className="font-amarillo text-5xl text-slate-900">
                  $0
                </span>
                <span className="font-mono-custom text-slate-400 font-bold text-sm mb-1">
                  /month
                </span>
              </div>
              <button className="w-full py-4 bg-white border-2 border-slate-200 text-slate-800 rounded-xl font-mono-custom font-bold hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm mb-8 flex justify-center items-center gap-2 group-hover:bg-slate-50">
                Try For Free
              </button>
              <ul class="space-y-4 text-sm text-slate-600 font-medium">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>Run limit: 1 time in 2 days</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>Range Port Scan: 1-1000 ports</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>Cooldown: 30 minutes</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <div class="text-slate-400">Limited Result Visibility</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <div class="text-slate-400">Solution & Remediation</div>
            </li>
          </ul>
            </div>

            {/* ── STARTER ── */}
            <div className="group relative bg-white/70 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 hover:border-sky-200 transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
              <div className="mb-8 border-b border-slate-100 pb-8">
                <h3 className="font-mono-custom font-bold text-2xl text-slate-900 mb-2">
                  Starter
                </h3>
                <p className="text-slate-500 text-sm h-10 leading-relaxed">
                  Perfect for hobbyists and students securing personal projects.
                </p>
              </div>
              <div className="mb-8 flex items-end gap-1 relative">
                <span className="font-amarillo text-5xl text-slate-900 relative">
                  <span className="text-3xl absolute -left-4 top-2">$</span>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={isAnnual ? "starter-annual" : "starter-monthly"}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="inline-block ml-3"
                    >
                      {getPrice(29)}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="font-mono-custom text-slate-400 font-bold text-sm mb-1">
                  /month
                </span>
              </div>
              <button className="w-full py-4 bg-white border-2 border-slate-200 text-slate-800 rounded-xl font-mono-custom font-bold hover:border-sky-500 hover:text-sky-600 transition-all shadow-sm mb-8 flex justify-center items-center gap-2 group-hover:bg-slate-50">
                Get Started
              </button>
              <ul class="space-y-4 text-sm text-slate-600 font-medium">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>Run limit: 2 times in 2 days</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>Range Port Scan: 1-4000 ports</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>Cooldown: 10 minutes</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <div class="text-slate-400">Limited Result Visibility</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <div class="text-slate-400">Solution & Remediation</div>
            </li>
          </ul>
            </div>

            {/* ── PRO (featured) ── */}
            <div className="relative bg-slate-900 border border-sky-500 rounded-[2.5rem] p-1 shadow-2xl h-full flex flex-col shadow-sky-500/30 transform md:-translate-y-6 md:scale-105 z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-indigo-600 rounded-[2.5rem] opacity-20 blur-md pointer-events-none"></div>
              <div className="relative bg-slate-900 rounded-[2.3rem] p-8 h-full flex flex-col">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-sky-400 to-blue-600 text-white px-4 py-1.5 rounded-full font-mono-custom font-bold text-xs tracking-wider shadow-lg shadow-sky-500/40 border border-sky-300/30 flex items-center gap-1.5">
                  POPULAR
                </div>
                <div className="mb-8 border-b border-slate-700 pb-8">
                  <h3 className="font-mono-custom font-bold text-2xl text-white mb-2">
                    Pro
                  </h3>
                  <p className="text-slate-400 text-sm h-10 leading-relaxed">
                    Designed for startups requiring frequent security validation
                    &amp; defense.
                  </p>
                </div>
                <div className="mb-8 flex items-end gap-1">
                  <span className="font-amarillo text-6xl text-white drop-shadow-[0_0_15px_rgba(14,165,233,0.4)] relative">
                    <span className="text-4xl absolute -left-5 top-2">$</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={isAnnual ? "pro-annual" : "pro-monthly"}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block ml-3"
                      >
                        {getPrice(69)}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="font-mono-custom text-slate-500 font-bold text-sm mb-2">
                    /month
                  </span>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-mono-custom font-bold hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-sky-500/40 mb-8 transform hover:-translate-y-1">
                  Get Started Now
                </button>
                <ul class="space-y-4 text-sm text-slate-300 font-medium">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0 drop-shadow-[0_0_5px_rgba(56,189,248,0.6)]"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>Run limit: 10 times in 2 days</div>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0 drop-shadow-[0_0_5px_rgba(56,189,248,0.6)]"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>Full Range Port Scan</div>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0 drop-shadow-[0_0_5px_rgba(56,189,248,0.6)]"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>Cooldown: 3 minutes</div>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0 drop-shadow-[0_0_5px_rgba(56,189,248,0.6)]"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                </svg>
                <div class="text-white">Full Result Visibility</div>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0 drop-shadow-[0_0_5px_rgba(56,189,248,0.6)]"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                </svg>
                <div class="text-white">Solution & Remediation Given</div>
              </li>
            </ul>
              </div>
            </div>

            {/* ── ENTERPRISE ── */}
            <div className="group relative bg-white/70 h-full flex flex-col backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all duration-500 transform hover:-translate-y-2">
              <div className="mb-8 border-b border-slate-100 pb-8">
                <h3 className="font-mono-custom font-bold text-2xl text-slate-900 mb-2">
                  Enterprise
                </h3>
                <p className="text-slate-500 text-sm h-10 leading-relaxed">
                  Full-scale security infrastructure for large organizations.
                </p>
              </div>
              <div className="mb-8 flex items-end gap-1">
                <span className="font-amarillo text-4xl text-slate-900 pb-2">
                  Custom
                </span>
              </div>
              <button className="w-full py-4 bg-slate-800 text-white rounded-xl font-mono-custom font-bold hover:bg-slate-900 transition-all shadow-md mb-8 group-hover:shadow-indigo-500/20">
                Contact Sales
              </button>
              <ul class="space-y-4 text-sm text-slate-600 font-medium">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>No Run Limit</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>Cooldown: 20 seconds</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>Granted Everything</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>Dedicated Account Manager</div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>24/7 Priority Support & SLA</div>
            </li>
          </ul>
            </div>
          </div>
          {/* end pricing grid */}
          {/* Compliance Section */}
          <div className="mt-24 pt-12 border-t border-slate-200/60 relative z-10">
            <p className="text-center font-mono-custom text-sm font-bold text-slate-400 tracking-widest uppercase mb-10">
              ENTERPRISE-GRADE COMPLIANCE &amp; STANDARDS
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
              <div className="flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
                <span className="font-amarillo text-xl text-slate-800 mt-1">
                  ISO 27001 SECURED
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="font-mono-custom font-bold text-lg text-slate-800">
                  OWASP TOP 10
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span className="font-mono-custom font-bold text-lg text-slate-800">
                  AES-256 ENCRYPTED
                </span>
              </div>
            </div>
          </div>
          {/* Compare Features Table */}
          <div className="mt-32 max-w-6xl mx-auto relative z-10 pb-20">
            <div className="text-center mb-12">
              <h2 className="font-amarillo text-4xl text-slate-900 mb-4 drop-shadow-sm">
                COMPARE <span className="text-sky-500">FEATURES</span>
              </h2>
              <p className="font-mono-custom text-slate-500">
                A detailed technical breakdown of what's included in each plan.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200 shadow-xl overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono-custom text-xs md:text-sm border-b border-slate-700">
                    <th className="py-5 px-6 font-bold">SECURITY MODULES</th>
                    {/* FREE col header */}
                    <th className="py-5 px-6 font-bold text-center border-l border-slate-700 text-emerald-400">
                      FREE
                    </th>
                    <th className="py-5 px-6 font-bold text-center border-l border-slate-700">
                      STARTER
                    </th>
                    <th className="py-5 px-6 font-bold text-center border-l border-slate-700 bg-sky-900/40 text-sky-400">
                      PRO
                    </th>
                    <th className="py-5 px-6 font-bold text-center border-l border-slate-700">
                      ENTERPRISE
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono-custom text-sm text-slate-700 divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold">
                      Engine: WPScan &amp; SQLMap
                    </td>
                    {/* FREE */}
                    <td className="py-4 px-6 text-center text-slate-400">
                      Basic
                    </td>
                    <td className="py-4 px-6 text-center text-slate-400">
                      Basic
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-sky-600 bg-sky-50/30">
                      Advanced
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-indigo-600">
                      Enterprise Grade
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold">
                      Engine: Hydra &amp; FFUF
                    </td>
                    {/* FREE */}
                    <td className="py-4 px-6 text-center">
                      <svg
                        className="w-5 h-5 mx-auto text-slate-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <svg
                        className="w-5 h-5 mx-auto text-slate-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </td>
                    <td className="py-4 px-6 text-center bg-sky-50/30">
                      <svg
                        className="w-5 h-5 mx-auto text-sky-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <svg
                        className="w-5 h-5 mx-auto text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold">Port Scan Range</td>
                    {/* FREE */}
                    <td className="py-4 px-6 text-center text-slate-500">
                      1 - 1000 Ports
                    </td>
                    <td className="py-4 px-6 text-center text-slate-500">
                      1 - 4000 Ports
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-sky-600 bg-sky-50/30">
                      Full Range
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-indigo-600">
                      Full Range + Distributed
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold">Tool Run Limit</td>
                    {/* FREE */}
                    <td className="py-4 px-6 text-center text-slate-500">
                      1x / 2 Days
                    </td>
                    <td className="py-4 px-6 text-center text-slate-500">
                      2x / 2 Days
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-sky-600 bg-sky-50/30">
                      10x / 2 Days
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-indigo-600">
                      Unlimited
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold">Cooldown Period</td>
                    {/* FREE */}
                    <td className="py-4 px-6 text-center text-slate-500">
                      30 Minutes
                    </td>
                    <td className="py-4 px-6 text-center text-slate-500">
                      10 Minutes
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-sky-600 bg-sky-50/30">
                      3 Minutes
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-indigo-600">
                      20 Seconds
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors border-b-0">
                    <td className="py-4 px-6 font-semibold">
                      Actionable Solutions Given
                    </td>
                    {/* FREE */}
                    <td className="py-4 px-6 text-center">
                      <svg
                        className="w-5 h-5 mx-auto text-slate-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <svg
                        className="w-5 h-5 mx-auto text-slate-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </td>
                    <td className="py-4 px-6 text-center bg-sky-50/30">
                      <svg
                        className="w-5 h-5 mx-auto text-sky-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <svg
                        className="w-5 h-5 mx-auto text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-32 max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-amarillo text-4xl text-slate-900 mb-4 drop-shadow-sm">
              COMMON <span className="text-sky-500">QUERIES</span>
            </h2>
            <p className="font-mono-custom text-slate-500">
              Everything you need to know about the platform and billing.
            </p>
          </div>
          <div className="space-y-4 font-mono-custom">
            <details className="group bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-800 text-sm">
                What does "cooldown period" mean?
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height={24}
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width={24}
                    className="text-sky-500"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                To prevent server abuse and ensure high performance for all
                users, we implement a cooldown timer after each scan execution.
                For Free Trial users, it's 30 minutes, while Enterprise users
                enjoy a near-instant 20-second cooldown.
              </div>
            </details>
            <details className="group bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-800 text-sm">
                Can I upgrade or downgrade my plan at any time?
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height={24}
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width={24}
                    className="text-sky-500"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                Absolutely. Onyxspire is highly flexible. You can upgrade to Pro
                or Enterprise mid-month, and the pricing will be prorated
                automatically. Downgrades will take effect at the start of your
                next billing cycle.
              </div>
            </details>
            <details className="group bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-800 text-sm">
                Why are solutions hidden in the Free and Starter plans?
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height={24}
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width={24}
                    className="text-sky-500"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                Our Free and Starter tiers are designed to provide visibility
                into your security posture by identifying vulnerabilities.
                However, providing detailed, step-by-step code remediation
                requires significant processing and database resources, which is
                reserved for our premium (Pro/Enterprise) users.
              </div>
            </details>
            <details className="group bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-800 text-sm">
                Is my data and scan history safe?
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height={24}
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width={24}
                    className="text-sky-500"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                Yes. We align with ISO 27001 standards and use AES-256
                encryption to store your scan results. All data is isolated
                within your specific tenant ID, ensuring complete privacy from
                other users.
              </div>
            </details>
          </div>
        </div>
        <div className="mt-32 mb-10 relative z-10">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-600 to-sky-500 opacity-20 blur-xl pointer-events-none"></div>
            <h2 className="font-amarillo text-4xl md:text-5xl text-white mb-6 relative z-10">
              SECURE YOUR PERIMETER <span className="text-sky-400">TODAY</span>
            </h2>
            <p className="font-mono-custom text-slate-400 max-w-2xl mx-auto mb-10 relative z-10">
              Join thousands of developers and UMKM owners who trust Onyxspire
              to find vulnerabilities before the bad actors do.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono-custom font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                Start Free Trial
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white border border-slate-700 font-mono-custom font-bold text-sm px-8 py-4 rounded-xl transition-all">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
        <section className="w-full max-w-6xl mx-auto px-4 py-4">
          {/* ── Section Header ── */}
          <div className="text-center mb-16 fade-up delay-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6 shadow-sm">
              <svg
                className="w-3.5 h-3.5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-[10px] font-mono-custom font-bold text-indigo-700 tracking-widest uppercase">
                The ROI Breakdown
              </span>
            </div>
            <h2 className="font-amarillo text-5xl md:text-6xl text-slate-900 mb-5 leading-tight">
              WHY <span className="text-indigo-600">AUTOMATION</span> WINS
            </h2>
            <p className="font-mono-custom text-slate-500 max-w-xl mx-auto leading-relaxed text-sm">
              Stop waiting months and paying thousands for a static PDF. See how
              Onyxspire's automated suite crushes traditional pentesting in cost
              and speed.
            </p>
          </div>
          {/* ── VS Grid ── */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch mb-6 fade-up delay-2">
            {/* ── VS Divider badge ── */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white border-2 border-slate-100 rounded-full items-center justify-center shadow-2xl">
              <span className="font-amarillo text-slate-400 text-base mt-0.5 tracking-widest">
                VS
              </span>
            </div>
            {/* ════ LEFT: Traditional ════ */}
            <div className="relative bg-white border border-slate-200 rounded-[2rem] lg:rounded-r-none lg:border-r-0 p-8 md:p-10 overflow-hidden shadow-sm">
              {/* Faint texture blob */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-slate-100 rounded-full opacity-60 pointer-events-none"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-slate-50 rounded-full opacity-80 pointer-events-none"></div>
              {/* Plan label */}
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="font-mono-custom text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Manual Process
                </span>
              </div>
              <h3 className="font-mono-custom font-bold text-2xl text-slate-700 mb-1">
                Traditional Pentest
              </h3>
              <p className="text-slate-400 font-mono-custom text-xs mb-8">
                Human consultants, static reports, long cycles.
              </p>
              {/* Metrics */}
              <div className="space-y-0 relative z-10">
                <div className="metric-row py-4 px-3 border-b border-slate-100 rounded-lg">
                  <p className="font-mono-custom text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Average Cost
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-amarillo text-3xl text-slate-500 opacity-80">
                      $5,000+
                    </span>
                    <span className="font-mono-custom text-slate-400 text-xs">
                      / single audit
                    </span>
                  </div>
                </div>
                <div className="metric-row py-4 px-3 border-b border-slate-100 rounded-lg">
                  <p className="font-mono-custom text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Time to Execute
                  </p>
                  <p className="font-inter font-bold text-slate-600 text-lg">
                    2 – 4 Weeks
                  </p>
                  <p className="font-mono-custom text-xs text-slate-400 mt-0.5">
                    Slow manual scoping and reporting.
                  </p>
                </div>
                <div className="metric-row py-4 px-3 border-b border-slate-100 rounded-lg">
                  <p className="font-mono-custom text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Coverage Frequency
                  </p>
                  <p className="font-inter font-bold text-slate-600 text-lg">
                    Point-in-Time
                  </p>
                  <p className="font-mono-custom text-xs text-slate-400 mt-0.5">
                    Your site is exposed the other 364 days.
                  </p>
                </div>
                <div className="metric-row py-4 px-3 rounded-lg">
                  <p className="font-mono-custom text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Deliverables
                  </p>
                  <div className="flex items-center gap-2.5 opacity-60">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="font-inter font-bold text-slate-600 text-sm">
                      Static PDF Report
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* ════ RIGHT: Onyxspire ════ */}
            <div className="relative bg-slate-900 border border-sky-500/40 rounded-[2rem] lg:rounded-l-none p-8 md:p-10 overflow-hidden shadow-2xl shadow-sky-900/30 lg:scale-y-[1.03] lg:origin-center z-10">
              {/* Grid texture */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
              {/* Glow blobs */}
              <div className="absolute -top-20 -right-10 w-72 h-72 bg-sky-500/15 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-600/15 rounded-full blur-[60px] pointer-events-none"></div>
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent"></div>
              <div className="relative z-10">
                {/* Plan label */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="dot-pulse w-2 h-2 rounded-full bg-sky-400 flex-shrink-0" />
                  <span className="font-mono-custom text-[9px] font-bold text-sky-400 uppercase tracking-[0.2em]">
                    The Onyxspire Way
                  </span>
                </div>
                <h3 className="font-mono-custom font-bold text-3xl text-white mb-1">
                  Automated Suite
                </h3>
                <p className="font-mono-custom text-slate-400 text-xs mb-8">
                  AI-driven, scalable, and instant deployment.
                </p>
                {/* Metrics */}
                <div className="space-y-0">
                  <div className="metric-row py-4 px-3 border-b border-slate-700/40 rounded-lg">
                    <p className="font-mono-custom text-[9px] font-bold text-sky-500 uppercase tracking-widest mb-1.5">
                      Average Cost
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-amarillo text-5xl text-white stat-glow">
                        $69
                      </span>
                      <span className="font-mono-custom text-slate-400 text-xs">
                        / month
                      </span>
                    </div>
                  </div>
                  <div className="metric-row py-4 px-3 border-b border-slate-700/40 rounded-lg">
                    <p className="font-mono-custom text-[9px] font-bold text-sky-500 uppercase tracking-widest mb-1.5">
                      Time to Execute
                    </p>
                    <p className="font-inter font-bold text-white text-xl flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-400 flex-shrink-0"
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
                      Under 5 Minutes
                    </p>
                    <p className="font-mono-custom text-xs text-slate-400 mt-0.5">
                      Instant deployment via cloud engines.
                    </p>
                  </div>
                  <div className="metric-row py-4 px-3 border-b border-slate-700/40 rounded-lg">
                    <p className="font-mono-custom text-[9px] font-bold text-sky-500 uppercase tracking-widest mb-1.5">
                      Coverage Frequency
                    </p>
                    <p className="font-inter font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
                      24/7 Continuous
                    </p>
                    <p className="font-mono-custom text-xs text-slate-400 mt-0.5">
                      Catch zero-day vulnerabilities in real-time.
                    </p>
                  </div>
                  <div className="metric-row py-4 px-3 rounded-lg">
                    <p className="font-mono-custom text-[9px] font-bold text-sky-500 uppercase tracking-widest mb-2">
                      Deliverables
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center flex-shrink-0">
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
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="font-inter font-bold text-white text-sm">
                        Live Dashboard + Actionable Code Fixes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end VS grid */}
          {/* ── Scrolling ticker ── */}
          <div className="ticker-wrap py-2.5 mb-6 opacity-40 fade-up delay-3">
            <div className="ticker-track">
              <span className="font-mono-custom text-[10px] font-bold text-slate-500 tracking-widest uppercase px-8">
                Cost Efficient
              </span>
              <span className="font-mono-custom text-[10px] text-sky-500 px-4">
                ◆
              </span>
              <span className="font-mono-custom text-[10px] font-bold text-slate-500 tracking-widest uppercase px-8">
                Instant Scanning
              </span>
              <span className="font-mono-custom text-[10px] text-indigo-400 px-4">
                ◆
              </span>
              <span className="font-mono-custom text-[10px] font-bold text-slate-500 tracking-widest uppercase px-8">
                Zero Commitment
              </span>
              <span className="font-mono-custom text-[10px] text-sky-500 px-4">
                ◆
              </span>
              <span className="font-mono-custom text-[10px] font-bold text-slate-500 tracking-widest uppercase px-8">
                99.9% Uptime SLA
              </span>
              <span className="font-mono-custom text-[10px] text-indigo-400 px-4">
                ◆
              </span>
              <span className="font-mono-custom text-[10px] font-bold text-slate-500 tracking-widest uppercase px-8">
                OWASP Compliant
              </span>
              <span className="font-mono-custom text-[10px] text-sky-500 px-4">
                ◆
              </span>
              {/* duplicate for seamless loop */}
              <span className="font-mono-custom text-[10px] font-bold text-slate-500 tracking-widest uppercase px-8">
                Cost Efficient
              </span>
              <span className="font-mono-custom text-[10px] text-sky-500 px-4">
                ◆
              </span>
              <span className="font-mono-custom text-[10px] font-bold text-slate-500 tracking-widest uppercase px-8">
                Instant Scanning
              </span>
              <span className="font-mono-custom text-[10px] text-indigo-400 px-4">
                ◆
              </span>
              <span className="font-mono-custom text-[10px] font-bold text-slate-500 tracking-widest uppercase px-8">
                Zero Commitment
              </span>
              <span className="font-mono-custom text-[10px] text-sky-500 px-4">
                ◆
              </span>
              <span className="font-mono-custom text-[10px] font-bold text-slate-500 tracking-widest uppercase px-8">
                99.9% Uptime SLA
              </span>
              <span className="font-mono-custom text-[10px] text-indigo-400 px-4">
                ◆
              </span>
              <span className="font-mono-custom text-[10px] font-bold text-slate-500 tracking-widest uppercase px-8">
                OWASP Compliant
              </span>
              <span className="font-mono-custom text-[10px] text-sky-500 px-4">
                ◆
              </span>
            </div>
          </div>
          {/* ── ROI Savings Banner ── */}
          <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg fade-up delay-4">
            {/* Top accent strip */}
            <div className="h-0.5 w-full bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-400" />
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Left side */}
                <div className="flex items-start gap-5 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-sm">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                      <p className="font-inter font-bold text-slate-800 text-lg">
                        Save up to 98% annually
                      </p>
                      <span className="font-mono-custom text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                        vs. traditional pentest
                      </span>
                    </div>
                    {/* Savings bar */}
                    <div className="max-w-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-mono-custom text-[9px] text-slate-400 uppercase tracking-wider">
                          Savings meter
                        </span>
                        <span className="font-mono-custom text-[9px] font-bold text-emerald-600">
                          98%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="savings-fill h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full" />
                      </div>
                    </div>
                    <p className="font-mono-custom text-xs text-slate-500 mt-3">
                      Reallocate your budget to actual product development, not
                      expensive audits.
                    </p>
                  </div>
                </div>
                {/* CTA */}
                <div className="w-full md:w-auto flex-shrink-0">
                  <Link
                    href="/roi-calculator"
                    className="w-full md:w-auto group relative inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-sky-600 text-white font-mono-custom font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-slate-900/20 hover:shadow-sky-500/30 overflow-hidden"
                  >
                    <span className="relative z-10">Calculate My ROI</span>
                    <svg
                      className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1"
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
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
