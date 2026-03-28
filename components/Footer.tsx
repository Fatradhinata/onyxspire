import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t-2 border-sky-500/30 overflow-hidden z-10 pt-24">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0ea5e915_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e915_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[40rem] h-[40rem] bg-sky-600/10 rounded-full filter blur-[120px] pointer-events-none z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-24 border-b border-slate-800/80 pb-20">
          <div className="inline-block px-4 py-2 rounded-sm bg-red-500/10 border border-red-500/30 mb-8 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <span className="font-mono-custom text-red-500 text-xs font-bold tracking-[0.2em] uppercase animate-pulse">
              &gt; WARNING: Unsecured assets detected in the wild _
            </span>
          </div>
          <h2 className="font-amarillo text-5xl md:text-6xl text-white mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(14,165,233,0.2)]">
            READY TO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
              SECURE{" "}
            </span>
             YOUR PERIMETER?
          </h2>
          <p className="font-mono-custom text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            Don't wait for a data breach to act. Deploy Onyxspire's automated
            pentesting engine and fortify your defenses today.
          </p>
          <button className="group relative px-8 py-4 bg-slate-900 border border-sky-500/50 text-sky-400 font-mono-custom font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-sky-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-50 group-hover:animate-ping z-10" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              INITIALIZE SCAN ENGINE
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="logo.png"
                alt="Onyxspire Logo"
                className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              />
              <span className="font-amarillo text-2xl text-white tracking-widest mt-1">
                ONYXSPIRE
              </span>
            </div>
            <p className="font-mono-custom text-xs text-slate-500 leading-relaxed mb-6">
              Advanced web-based penetration testing platform designed for
              authorized security assessments and proactive digital defense.
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded p-3 font-mono-custom text-[10px] tracking-wider shadow-inner">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" />
                <span className="text-slate-300">CORE SERVER : ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_5px_#0ea5e9]" />
                <span className="text-slate-500">ENCRYPTION : AES-256-GCM</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-mono-custom font-bold text-white mb-6 uppercase tracking-widest text-sm border-l-2 border-sky-500 pl-3">
              Platform
            </h4>
            <ul className="space-y-4 font-mono-custom text-sm text-slate-400">
              <li>
                <a
                  href="#"
                  className="hover:text-sky-400 hover:translate-x-2 transition-all duration-300 inline-block group"
                >
                  <span className="text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                    &gt;
                  </span>{" "}
                  Automated Scan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-sky-400 hover:translate-x-2 transition-all duration-300 inline-block group"
                >
                  <span className="text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                    &gt;
                  </span>{" "}
                  Pentest Tools
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-sky-400 hover:translate-x-2 transition-all duration-300 inline-block group"
                >
                  <span className="text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                    &gt;
                  </span>{" "}
                  Analytics &amp; Reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-sky-400 hover:translate-x-2 transition-all duration-300 inline-block group"
                >
                  <span className="text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                    &gt;
                  </span>{" "}
                  Pricing Tiers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono-custom font-bold text-white mb-6 uppercase tracking-widest text-sm border-l-2 border-indigo-500 pl-3">
              Resources
            </h4>
            <ul className="space-y-4 font-mono-custom text-sm text-slate-400">
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 hover:translate-x-2 transition-all duration-300 inline-block group"
                >
                  <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                    &gt;
                  </span>
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 hover:translate-x-2 transition-all duration-300 inline-block group"
                >
                  <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                    &gt;
                  </span>{" "}
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 hover:translate-x-2 transition-all duration-300 inline-block group"
                >
                  <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                    &gt;
                  </span>{" "}
                  Threat Advisories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 hover:translate-x-2 transition-all duration-300 inline-block group"
                >
                  <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                    &gt;
                  </span>{" "}
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono-custom font-bold text-white mb-6 uppercase tracking-widest text-sm border-l-2 border-slate-700 pl-3">
              Legal
            </h4>
            <ul className="space-y-4 font-mono-custom text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Responsible Disclosure
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800/80 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono-custom text-xs text-slate-500">
            © 2026 Onyxspire. ALL RIGHTS RESERVED.
          </p>
          <div className="font-mono-custom text-xs text-slate-700 flex items-center gap-2 select-none">
            <span className="text-sky-700">root@onyxspire:</span>
            <span>~/system/standby</span>
            <span className="w-1.5 h-3 bg-slate-500 animate-pulse inline-block align-middle ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
