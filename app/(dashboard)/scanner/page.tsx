"use client"
import React, { useState } from "react";

/* ─────────────────────────── Types ─────────────────────────── */

type ModuleVariant = "offensive" | "defensive";

interface Module {
  id: string;
  name: string;
  tag: string;
  description: string;
  variant: ModuleVariant;
  locked?: boolean;
  defaultChecked?: boolean;
}

/* ─────────────────────────── Icon Components ─────────────────────────── */

const IconMenu = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const IconLightning = () => (
  <svg
    className="w-4 h-4 text-sky-500"
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
);

const IconGlobe = () => (
  <svg
    className="w-4 h-4 mr-2 text-slate-400"
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

const IconRefresh = () => (
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
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const IconOffensive = () => (
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
      d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
    />
  </svg>
);

const IconDefensive = () => (
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
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const IconClock = () => (
  <svg
    className="w-5 h-5 text-sky-400"
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
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </>
);

const IconLock = () => (
  <svg
    className="w-4 h-4 text-amber-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={4}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/* ─────────────────────────── Header ─────────────────────────── */

const Header: React.FC = () => (
  <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm flex-shrink-0">
    <div className="flex items-center gap-4">
      <button className="md:hidden text-slate-600 hover:text-sky-500 focus:outline-none transition-colors">
        <IconMenu />
      </button>
      <div>
        <h2 className="font-mono font-bold text-lg sm:text-xl text-slate-800 tracking-tight">
          Scanner Hub
        </h2>
        <p className="text-[10px] sm:text-xs font-mono text-slate-500 mt-0.5 hidden sm:block">
          Automated Penetration Engine Room
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2 sm:px-3 py-1.5 rounded-lg shadow-sm">
        <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-green-500" />
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-600 uppercase tracking-widest hidden sm:inline-block">
          Engine Ready
        </span>
      </div>
    </div>
  </header>
);

/* ─────────────────────────── Target Vector ─────────────────────────── */

const TargetVector: React.FC = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-md relative overflow-hidden">
    <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-sky-100 to-transparent opacity-50 rounded-bl-full pointer-events-none" />

    <label className="block font-mono text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
      <IconLightning />
      Define Target Vector
    </label>

    <div className="flex flex-col md:flex-row gap-4 relative z-10">
      <div className="flex flex-col sm:flex-row flex-1 shadow-sm rounded-xl overflow-hidden border-2 border-slate-200 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all bg-white min-w-0">
        <span className="inline-flex items-center px-4 py-3 sm:py-0 bg-slate-50 text-slate-500 font-mono text-sm border-b sm:border-b-0 sm:border-r border-slate-200">
          <IconGlobe />
          https://
        </span>
        <input
          type="text"
          placeholder="target-domain.com or IP Address"
          defaultValue="beast.com"
          className="flex-1 px-4 py-3 sm:py-4 min-w-0 outline-none font-mono text-slate-800 text-sm font-bold placeholder-slate-400"
        />
      </div>
      <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-6 py-3 sm:py-4 rounded-xl font-mono font-bold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-sm w-full md:w-auto">
        <IconRefresh />
        Verify DNS
      </button>
    </div>

    <p className="text-[10px] font-mono text-slate-400 mt-3 leading-relaxed">
      * Ensure you have explicit authorization before scanning the target.
    </p>
  </div>
);

/* ─────────────────────────── Module Checkbox ─────────────────────────── */

interface ModuleCheckboxProps {
  module: Module;
  checked: boolean;
  onChange: (id: string) => void;
}

const ModuleCheckbox: React.FC<ModuleCheckboxProps> = ({
  module,
  checked,
  onChange,
}) => {
  const isDefensive = module.variant === "defensive";
  const checkedBorder = isDefensive
    ? "has-[:checked]:border-indigo-500"
    : "has-[:checked]:border-sky-500";
  const checkedBg = isDefensive
    ? "has-[:checked]:bg-indigo-50/30"
    : "has-[:checked]:bg-sky-50/30";
  const checkboxChecked = isDefensive
    ? "checked:bg-indigo-500 checked:border-indigo-500"
    : "checked:bg-sky-500 checked:border-sky-500";
  const tagStyle = isDefensive
    ? "bg-indigo-100 text-indigo-600"
    : "bg-slate-100 text-slate-500";

  return (
    <label
      className={`flex items-start p-3 sm:p-4 border-2 border-slate-100 rounded-xl cursor-pointer hover:border-slate-300 transition-colors group ${checkedBorder} ${checkedBg} relative overflow-hidden`}
    >
      {isDefensive && (
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl" />
      )}
      <div className="flex items-center h-5 mt-1 relative justify-center z-10">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(module.id)}
          className={`peer appearance-none w-5 h-5 bg-white border-2 border-slate-300 rounded cursor-pointer ${checkboxChecked} transition-all`}
        />
        <CheckIcon />
      </div>
      <div className="ml-3 sm:ml-4 flex-1 relative z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1 sm:gap-0">
          <span className="block font-mono font-bold text-slate-800 text-sm">
            {module.name}
          </span>
          <span
            className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase self-start sm:self-auto ${tagStyle}`}
          >
            {module.tag}
          </span>
        </div>
        <span className="block text-[11px] sm:text-xs text-slate-500 leading-relaxed">
          {module.description}
        </span>
      </div>
    </label>
  );
};

/* ─────────────────────────── Locked Module ─────────────────────────── */

const LockedModule: React.FC<{ module: Module }> = ({ module }) => (
  <div className="p-3 sm:p-4 border-2 border-slate-100 rounded-xl bg-slate-50/80 relative overflow-hidden">
    <div className="flex items-start opacity-60">
      <div className="flex items-center h-5 mt-1 relative justify-center">
        <input
          type="checkbox"
          disabled
          className="appearance-none w-5 h-5 bg-slate-200 border-2 border-slate-300 rounded cursor-not-allowed"
        />
      </div>
      <div className="ml-3 sm:ml-4 flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1 sm:gap-0">
          <span className="block font-mono font-bold text-slate-600 text-sm">
            {module.name}
          </span>
          <span className="text-[9px] font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded uppercase self-start sm:self-auto">
            {module.tag}
          </span>
        </div>
        <span className="block text-[11px] sm:text-xs text-slate-500 leading-relaxed">
          {module.description}
        </span>
      </div>
    </div>
    <div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[2px] flex items-center justify-center">
      <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-lg scale-90 sm:scale-100">
        <IconLock />
        <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-widest">
          Enterprise Feature
        </span>
      </div>
    </div>
  </div>
);

/* ─────────────────────────── Modules Panel ─────────────────────────── */

const offensiveModules: Module[] = [
  {
    id: "sqlmap",
    name: "SQLMAP Injector",
    tag: "Database",
    description:
      "Automated SQL injection and database takeover tool. Probes for blind, boolean, and error-based flaws.",
    variant: "offensive",
    defaultChecked: true,
  },
  {
    id: "wpscan",
    name: "WPSCAN Audit",
    tag: "CMS",
    description:
      "Black box WordPress vulnerability scanner. Checks for outdated plugins, themes, and core misconfigurations.",
    variant: "offensive",
    defaultChecked: true,
  },
  {
    id: "deepport",
    name: "Deep Port Scan",
    tag: "Network",
    description: "Scan all 65,535 TCP/UDP ports aggressively.",
    variant: "offensive",
    locked: true,
  },
  {
    id: "ffuf",
    name: "FFUF Fuzzer",
    tag: "Discovery",
    description:
      "Fast web fuzzer to discover hidden directories, files, and undocumented API endpoints.",
    variant: "offensive",
  },
];

const defensiveModules: Module[] = [
  {
    id: "obfuscator",
    name: "Source Obfuscator",
    tag: "Shielding",
    description:
      "Scramble code structure and logic to prevent reverse engineering and intellectual property theft.",
    variant: "defensive",
  },
];

interface ModulesPanelProps {
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}

const OffensivePanel: React.FC<ModulesPanelProps> = ({ checked, onToggle }) => (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col">
    <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shadow-sm flex-shrink-0">
          <IconOffensive />
        </div>
        <div>
          <h3 className="font-mono font-bold text-slate-800 text-base sm:text-lg">
            Offensive Modules
          </h3>
          <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest">
            Active Exploitation Arsenal
          </p>
        </div>
      </div>
    </div>

    <div className="p-5 sm:p-6 space-y-4 flex-1 bg-white">
      {offensiveModules.map((mod) =>
        mod.locked ? (
          <LockedModule key={mod.id} module={mod} />
        ) : (
          <ModuleCheckbox
            key={mod.id}
            module={mod}
            checked={!!checked[mod.id]}
            onChange={onToggle}
          />
        ),
      )}
    </div>
  </div>
);

const DefensivePanel: React.FC<ModulesPanelProps> = ({ checked, onToggle }) => (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
    <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm flex-shrink-0">
          <IconDefensive />
        </div>
        <div>
          <h3 className="font-mono font-bold text-slate-800 text-base sm:text-lg">
            Defensive Modules
          </h3>
          <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest">
            Code Protection Systems
          </p>
        </div>
      </div>
    </div>

    <div className="p-5 sm:p-6 bg-white">
      {defensiveModules.map((mod) => (
        <ModuleCheckbox
          key={mod.id}
          module={mod}
          checked={!!checked[mod.id]}
          onChange={onToggle}
        />
      ))}
    </div>
  </div>
);

/* ─────────────────────────── Execution Status ─────────────────────────── */

const ExecutionStatus: React.FC = () => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-center font-mono-custom">
    <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/20 to-transparent pointer-events-none" />

    <h4 className="font-mono font-bold text-white mb-5 sm:mb-6 flex items-center gap-2 relative z-10 text-sm sm:text-base">
      <IconClock />
      Execution Status
    </h4>

    <div className="space-y-4 sm:space-y-5 relative z-10">
      <div>
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest">
            Pro Quota Available
          </span>
          <span className="font-mono font-bold text-base sm:text-lg text-white">
            8<span className="text-xs sm:text-sm text-slate-500">/10</span>
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-sky-500 to-blue-500 h-2 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
            style={{ width: "80%" }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center bg-slate-950 border border-slate-800 p-3 rounded-xl">
        <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest">
          Engine Cooldown
        </span>
        <span className="font-mono font-bold text-green-400 flex items-center gap-2 text-xs sm:text-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          READY
        </span>
      </div>
    </div>
  </div>
);

/* ─────────────────────────── Terminal ─────────────────────────── */

const Terminal: React.FC = () => (
  <div className="bg-[#0f172a] rounded-2xl border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col">
    {/* Terminal bar */}
    <div className="bg-[#1e293b] border-b border-slate-800 px-4 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500 border border-red-600" />
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-500 border border-yellow-600" />
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500 border border-green-600" />
        </div>
        <span className="ml-1 sm:ml-2 font-mono text-[10px] sm:text-[11px] text-slate-400 tracking-widest uppercase">
          onyxspire_terminal_v3
        </span>
      </div>

      <button className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs sm:text-sm px-6 py-3 sm:py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center justify-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <IconPlay />
        </svg>
        LAUNCH SELECTED MODULES
      </button>
    </div>

    {/* Terminal body */}
    <div className="p-4 sm:p-6 overflow-y-auto font-mono-custom text-[11px] sm:text-sm text-slate-300 leading-relaxed bg-[#020617] h-64 sm:h-full">
      <div className="text-sky-400 font-bold mb-2">
        Welcome to Onyxspire CLI. Type &apos;help&apos; for available commands.
      </div>
      <div className="text-slate-500 mb-4">
        &gt; System awaiting instructions...
      </div>

      <div className="space-y-1.5 opacity-50 break-all">
        <div>
          <span className="text-green-400">[+]</span> Target parameter set:{" "}
          <span className="text-white">beast.com</span>
        </div>
        <div>
          <span className="text-green-400">[+]</span> Modules selected: SQLMAP,
          WPSCAN
        </div>
        <div className="text-slate-500">
          --- Execution Sequence Triggered ---
        </div>
        <div>
          <span className="text-sky-400">[*]</span> Checking connection to
          target... <span className="text-green-400">200 OK</span>
        </div>
        <div>
          <span className="text-sky-400">[*]</span> Enumerating common paths...
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-yellow-400">[*]</span> Loading payload databases
        <span className="flex gap-1">
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:0.1s]">.</span>
          <span className="animate-bounce [animation-delay:0.2s]">.</span>
        </span>
      </div>

      <div className="mt-1">
        <span className="text-sky-500 font-bold">root@engine:~#</span>{" "}
        {/* cursor-blink → define in global CSS via @utility */}
        <span className="cursor-blink w-2 sm:w-2.5 h-3 sm:h-4 inline-block bg-slate-300 align-middle ml-1" />
      </div>
    </div>
  </div>
);

/* ─────────────────────────── Main Page ─────────────────────────── */

const ScannerHub: React.FC = () => {
  // Build initial checked state from defaultChecked
  const initialChecked: Record<string, boolean> = {};
  [...offensiveModules, ...defensiveModules].forEach((m) => {
    if (!m.locked) initialChecked[m.id] = !!m.defaultChecked;
  });

  const [checked, setChecked] =
    useState<Record<string, boolean>>(initialChecked);

  const handleToggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="font-sans bg-[#f8fafc] text-slate-800 h-screen overflow-hidden flex selection:bg-sky-500 selection:text-white">
      <main className="flex-1 flex flex-col h-full relative bg-dashboard-grid z-10 overflow-y-auto overflow-x-hidden">
        <Header />

        <div className="p-4 sm:p-8 mx-auto w-full space-y-6 sm:space-y-8 pb-20 max-w-7xl">
          <TargetVector />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Offensive */}
            <OffensivePanel checked={checked} onToggle={handleToggle} />

            {/* Right: Defensive + Status */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <DefensivePanel checked={checked} onToggle={handleToggle} />
              <ExecutionStatus />
            </div>
          </div>

          <Terminal />
        </div>
      </main>
    </div>
  );
};

export default ScannerHub;
