"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Global CSS – keyframes, font-face, utility classes that Tailwind can't cover
// ---------------------------------------------------------------------------
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Inter:wght@400;500;600;700&display=swap');

@font-face {
  font-family: 'AmarilloUSAF';
  src: url('/AmarilloUSAF.ttf') format('truetype');
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0);    }
}
@keyframes cursorPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes blinkDot {
  0%, 100% { opacity: 1;  }
  50%       { opacity: .3; }
}
@keyframes licencePulse {
  0%, 100% { opacity: 1;  }
  50%       { opacity: .6; }
}
@keyframes pendingPulse {
  0%, 100% { opacity: 1;  }
  50%       { opacity: .5; }
}

.onyx-fadeup-1 { opacity: 0; animation: fadeUp .5s ease .1s  forwards; }
.onyx-fadeup-2 { opacity: 0; animation: fadeUp .5s ease .25s forwards; }
.onyx-fadeup-3 { opacity: 0; animation: fadeUp .5s ease .4s  forwards; }

.onyx-cursor       { display:inline-block; width:8px; height:13px; background:#38bdf8; margin-left:2px; vertical-align:text-bottom; animation: cursorPulse .8s step-end infinite; }
.onyx-blink        { animation: blinkDot     1.5s ease-in-out infinite; }
.onyx-lic-pulse    { animation: licencePulse 2s   ease           infinite; }
.onyx-pending      { animation: pendingPulse 2s   ease-in-out    infinite; }

/* grid / scanline backgrounds */
.onyx-bg-grid {
  background-image:
    linear-gradient(rgba(56,189,248,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56,189,248,.04) 1px, transparent 1px);
  background-size: 44px 44px;
}
.onyx-bg-grid-light {
  background-image:
    linear-gradient(rgba(14,165,233,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14,165,233,.045) 1px, transparent 1px);
  background-size: 36px 36px;
}
.onyx-scanline {
  background: repeating-linear-gradient(
    0deg,
    transparent, transparent 3px,
    rgba(0,0,0,.2) 3px, rgba(0,0,0,.2) 4px
  );
}
`;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const LOG_DATA = [
  {
    delay: 300,
    cls: "dim",
    text: "> sudo onyxspire-provision --tenant=01 --user=finesneedhug --tier=pro",
  },
  {
    delay: 900,
    cls: "info",
    text: "[INIT] Bootstrapping secure container environment...",
  },
  {
    delay: 1500,
    cls: "ok",
    text: "[OK]  Allocating Tenant_01 on isolated cluster...",
  },
  {
    delay: 2000,
    cls: "ok",
    text: "[OK]  Namespace onyxspire/tenant-01 created.",
  },
  {
    delay: 2500,
    cls: "info",
    text: "[INFO] Injecting environment variables...",
  },
  {
    delay: 3000,
    cls: "ok",
    text: "[OK]  Hardening database schema (PostgreSQL 16.1)...",
  },
  {
    delay: 3500,
    cls: "ok",
    text: "[OK]  AES-256 key generated for private vault.",
  },
  {
    delay: 4000,
    cls: "ok",
    text: "[OK]  Encrypting Private Vault — sector isolation complete.",
  },
  {
    delay: 4400,
    cls: "info",
    text: "[INFO] Configuring scan engine workers (x4 threads)...",
  },
  {
    delay: 4800,
    cls: "ok",
    text: "[OK]  ScanWorker_01 online · ScanWorker_02 online.",
  },
  {
    delay: 5200,
    cls: "ok",
    text: "[OK]  ScanWorker_03 online · ScanWorker_04 online.",
  },
  { delay: 5600, cls: "info", text: "[INFO] Loading module registry..." },
  {
    delay: 5900,
    cls: "ok",
    text: "[OK]  Modules loaded: SQLMAP · WPSCAN · PORTSCAN · HYDRA · FFUF.",
  },
  {
    delay: 6300,
    cls: "ok",
    text: "[OK]  OBFUSCATOR engine compiled (DEF mode).",
  },
  { delay: 6700, cls: "info", text: "[INFO] Validating PRO_LICENSE token..." },
  {
    delay: 7100,
    cls: "ok",
    text: "[OK]  License verified — 10 scans/2 days quota active.",
  },
  {
    delay: 7500,
    cls: "ok",
    text: "[OK]  Multi-tenant firewall rules applied.",
  },
  {
    delay: 7900,
    cls: "ok",
    text: "[OK]  SSL/TLS certificate bound to tenant domain.",
  },
  {
    delay: 8200,
    cls: "info",
    text: "[INFO] Finalizing tenant provisioning sequence...",
  },
  {
    delay: 8700,
    cls: "ok",
    text: "[OK]  System READY. Redirecting to onboarding wizard...",
  },
] as const;

const PROGRESS_STEPS = [
  5, 10, 18, 25, 35, 42, 50, 57, 63, 70, 75, 80, 85, 88, 92, 94, 97, 98, 99,
  100,
];

const UNLOCK_FEATURES = [
  { label: "Scan Runs", val: "10x / 2 Days", color: "#38bdf8" },
  { label: "Port Range", val: "Full 1-65535", color: "#38bdf8" },
  { label: "Cooldown", val: "3 Minutes", color: "#4ade80" },
  { label: "Result View", val: "Full Visibility", color: "#4ade80" },
  { label: "Remediation", val: "Actionable Fixes", color: "#818cf8" },
  { label: "Obfuscator", val: "DEF Module Unlocked", color: "#818cf8" },
  { label: "API Access", val: "Full API Keys", color: "#fbbf24" },
  { label: "Webhooks", val: "Endpoint Integration", color: "#fbbf24" },
];

const SIDEBAR_NAV = [
  { icon: BoltIcon, label: "Command Center", active: true },
  { icon: ScanIcon, label: "Scan Engine", active: false },
  { icon: ShieldIcon, label: "Vulnerability DB", active: false },
  { icon: LockIcon, label: "Private Vault", active: false },
  { icon: KeyIcon, label: "API Keys", active: false },
  { icon: WebhookIcon, label: "Webhooks", active: false },
  { icon: SettingsIcon, label: "Settings", active: false },
];

const DB_TOOLS = [
  "SQLMAP",
  "WPSCAN",
  "PORTSCAN",
  "HYDRA",
  "FFUF",
  "OBFUSCATOR",
];

// ---------------------------------------------------------------------------
// Inline SVG icon helpers (avoids dependency on an icon library)
// ---------------------------------------------------------------------------
function BoltIcon({ className = "w-4 h-4" }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
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
  );
}
function ScanIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  );
}
function ShieldIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      />
    </svg>
  );
}
function LockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 11V7a5 5 0 0110 0v4"
      />
    </svg>
  );
}
function KeyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
      />
    </svg>
  );
}
function WebhookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
      />
    </svg>
  );
}
function SettingsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="3" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
      />
    </svg>
  );
}
function BadgeCheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}
function CheckCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function ClockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Type
// ---------------------------------------------------------------------------
type Stage = "provision" | "wizard" | "license" | "dashboard" | "finalizing";

// ---------------------------------------------------------------------------
// Stage 1 – Provisioning / terminal boot
// ---------------------------------------------------------------------------
interface ProvisioningStageProps {
  onComplete: () => void;
}

function ProvisioningStage({ onComplete }: ProvisioningStageProps) {
  const [lines, setLines] = useState<{ cls: string; html: string }[]>([]);
  const [progress, setProgress] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LOG_DATA.forEach((item, i) => {
      timers.push(
        setTimeout(() => {
          // Colorise tokens
          const html = item.text
            .replace(/\[OK\]/g, '<span style="color:#4ade80">[OK]</span>')
            .replace(/\[INFO\]/g, '<span style="color:#38bdf8">[INFO]</span>')
            .replace(/\[INIT\]/g, '<span style="color:#38bdf8">[INIT]</span>');

          setLines((prev) => [...prev, { cls: item.cls, html }]);
          setProgress(PROGRESS_STEPS[i]);

          if (i === LOG_DATA.length - 1) {
            setTimeout(onComplete, 1200);
          }
        }, item.delay),
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Auto-scroll terminal body
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  const lineColor = (cls: string) => {
    if (cls === "ok") return "#4ade80";
    if (cls === "info") return "#38bdf8";
    if (cls === "warn") return "#fbbf24";
    return "#475569";
  };

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-start justify-center px-[6vw] py-16 pointer-events-none">
      {/* Logo */}
      <div className="flex items-center gap-3.5 mb-10 onyx-fadeup-1">
        <div
          className="flex items-center justify-center flex-shrink-0 rotate-45"
          style={{
            width: 36,
            height: 36,
            background: "rgba(56,189,248,.10)",
            border: "1px solid rgba(56,189,248,.30)",
          }}
        >
          <BoltIcon
            className="w-4 h-4 -rotate-45"
            style={{ color: "#38bdf8" } as React.CSSProperties}
          />
        </div>
        <span
          className="text-xl text-white tracking-widest"
          style={{ fontFamily: "'AmarilloUSAF','Inter',sans-serif" }}
        >
          ONYXSPIRE
        </span>
      </div>

      {/* Heading */}
      <div className="mb-8 onyx-fadeup-2">
        <h1
          className="font-bold text-white mb-1.5"
          style={{
            fontFamily: "JetBrains Mono,monospace",
            fontSize: "clamp(.9rem,2vw,1.1rem)",
            letterSpacing: ".04em",
          }}
        >
          SYSTEM INITIALIZATION IN PROGRESS
        </h1>
        <p
          className="text-[#475569] uppercase"
          style={{
            fontFamily: "JetBrains Mono,monospace",
            fontSize: ".7rem",
            letterSpacing: ".08em",
          }}
        >
          Deploying isolated tenant environment — please stand by
        </p>
      </div>

      {/* Terminal window */}
      <div
        className="onyx-fadeup-3 rounded-[.875rem] overflow-hidden"
        style={{
          width: "min(680px,90vw)",
          background: "#080c14",
          border: "1px solid rgba(255,255,255,.07)",
          boxShadow: "0 0 60px rgba(56,189,248,.06),0 20px 40px rgba(0,0,0,.5)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{
            background: "#0d1117",
            borderBottom: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          <span
            className="ml-2 text-[#475569]"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 10,
              letterSpacing: ".08em",
            }}
          >
            onyxspire@provision — bash
          </span>
        </div>

        {/* Log body */}
        <div className="relative overflow-hidden" style={{ height: 280 }}>
          <div
            ref={logRef}
            className="absolute bottom-5 left-6 right-6 flex flex-col gap-1.5 overflow-hidden"
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className="leading-[1.5] whitespace-nowrap overflow-hidden"
                style={{
                  fontFamily: "JetBrains Mono,monospace",
                  fontSize: 11,
                  color: lineColor(line.cls),
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    i === lines.length - 1
                      ? line.html + '<span class="onyx-cursor"></span>'
                      : line.html,
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress footer */}
        <div
          className="flex items-center gap-4 px-6 py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}
        >
          <span
            className="flex-shrink-0 text-[#475569]"
            style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10 }}
          >
            PROVISIONING
          </span>
          <div
            className="flex-1 h-[3px] rounded-full overflow-hidden"
            style={{ background: "#1e293b" }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,#38bdf8,#818cf8)",
              }}
            />
          </div>
          <span
            className="flex-shrink-0 font-bold text-right text-[#38bdf8]"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 10,
              minWidth: 32,
            }}
          >
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stage 2 – Onboarding wizard
// ---------------------------------------------------------------------------
interface WizardStageProps {
  visible: boolean;
  onNext: (target: string, choice: "yes" | "no") => void;
  onSkip: () => void;
}

function WizardStage({ visible, onNext, onSkip }: WizardStageProps) {
  const [scanChoice, setScanChoice] = useState<"yes" | "no">("yes");
  const [targetValue, setTargetValue] = useState("");

  const handleNext = () => {
    onNext(targetValue.trim() || "beast.com", scanChoice);
  };
  const handleSkip = () => {
    onNext("beast.com", scanChoice);
    onSkip();
  };

  const opts = [
    {
      id: "yes" as const,
      title: "Yes — Run Port Scan Now",
      desc: "Immediately scan ports 1-65535 after onboarding completes.",
      badge: "~4 MIN",
      badgeCls: "text-[#38bdf8]",
      badgeBg: "rgba(56,189,248,.10)",
      badgeBorder: "rgba(56,189,248,.20)",
    },
    {
      id: "no" as const,
      title: "Later — Configure Manually",
      desc: "Skip for now and set up scans from the Command Center.",
      badge: "SKIP",
      badgeCls: "text-[#475569]",
      badgeBg: "#1e293b",
      badgeBorder: "rgba(255,255,255,.06)",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center p-4 transition-opacity duration-300"
      style={{
        background: "rgba(6,9,18,.7)",
        backdropFilter: "blur(8px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
      }}
    >
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          width: "min(520px,94vw)",
          background: "#0d1117",
          border: "1px solid rgba(56,189,248,.2)",
          borderRadius: "1.75rem",
          boxShadow: "0 0 80px rgba(56,189,248,.08),0 30px 60px rgba(0,0,0,.6)",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(.94) translateY(12px)",
        }}
      >
        {/* Accent stripe */}
        <div
          style={{
            height: 2,
            background:
              "linear-gradient(90deg,transparent,#38bdf8,#818cf8,transparent)",
          }}
        />

        {/* Header */}
        <div className="px-8 pt-7">
          <div
            className="flex items-center gap-2 mb-3.5 font-bold uppercase text-[#38bdf8]"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 9,
              letterSpacing: ".14em",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] onyx-blink" />
            Step 1 of 2 &nbsp;·&nbsp; Perimeter Configuration
          </div>
          <div
            className="mb-1.5 font-bold text-white"
            style={{ fontSize: "1.3rem" }}
          >
            What is your first perimeter?
          </div>
          <div
            className="text-[#475569]"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: ".7rem",
              letterSpacing: ".04em",
            }}
          >
            Register your first asset to initialize the scan engine.
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {/* Target input */}
          <div
            className="flex items-center mb-5 overflow-hidden transition-all"
            style={{
              background: "#060912",
              border: "1px solid rgba(56,189,248,.2)",
              borderRadius: ".75rem",
            }}
          >
            <span
              className="px-3.5 py-3 text-[#475569] border-r flex-shrink-0"
              style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: ".75rem",
                background: "#1e293b",
                borderColor: "rgba(255,255,255,.06)",
              }}
            >
              https://
            </span>
            <input
              className="flex-1 bg-transparent border-none outline-none px-3.5 py-3 text-[#38bdf8]"
              style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: ".8rem",
                letterSpacing: ".04em",
              }}
              type="text"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder="beast.com"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {/* Scan options label */}
          <div
            className="text-[#475569] uppercase mb-2.5"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 9,
              letterSpacing: ".1em",
            }}
          >
            Run initial scan?
          </div>

          {/* Options */}
          {opts.map((opt) => {
            const selected = scanChoice === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setScanChoice(opt.id)}
                className="flex items-center gap-3.5 cursor-pointer mb-2.5 last:mb-0 transition-all"
                style={{
                  background: selected ? "rgba(56,189,248,.06)" : "#111823",
                  border: `1px solid ${selected ? "rgba(56,189,248,.35)" : "rgba(255,255,255,.07)"}`,
                  borderRadius: ".875rem",
                  padding: ".875rem 1.1rem",
                }}
              >
                {/* Radio */}
                <div
                  className="flex items-center justify-center flex-shrink-0 rounded-full transition-colors"
                  style={{
                    width: 18,
                    height: 18,
                    border: `2px solid ${selected ? "#38bdf8" : "#1e293b"}`,
                  }}
                >
                  <div
                    className="rounded-full transition-all"
                    style={{
                      width: 8,
                      height: 8,
                      background: "#38bdf8",
                      opacity: selected ? 1 : 0,
                      transform: selected ? "scale(1)" : "scale(0)",
                    }}
                  />
                </div>
                {/* Text */}
                <div className="flex-1">
                  <div
                    className="font-bold text-white"
                    style={{
                      fontFamily: "JetBrains Mono,monospace",
                      fontSize: ".8rem",
                    }}
                  >
                    {opt.title}
                  </div>
                  <div
                    className="mt-0.5 text-[#475569]"
                    style={{
                      fontFamily: "JetBrains Mono,monospace",
                      fontSize: 9,
                    }}
                  >
                    {opt.desc}
                  </div>
                </div>
                {/* Badge */}
                <span
                  className={`font-bold flex-shrink-0 ${opt.badgeCls}`}
                  style={{
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 9,
                    padding: "2px 7px",
                    borderRadius: 4,
                    background: opt.badgeBg,
                    border: `1px solid ${opt.badgeBorder}`,
                  }}
                >
                  {opt.badge}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-3 px-8 pb-7 pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}
        >
          {/* Step dots */}
          <div className="flex gap-1.5 mr-auto">
            <div
              className="h-1.5 rounded-full bg-[#38bdf8]"
              style={{ width: 18 }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
          </div>
          <button
            onClick={handleSkip}
            className="font-bold uppercase text-[#475569] transition-all hover:text-white cursor-pointer"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 11,
              letterSpacing: ".06em",
              border: "1px solid #1e293b",
              borderRadius: ".625rem",
              padding: ".65rem 1.25rem",
              background: "transparent",
            }}
          >
            Skip Setup
          </button>
          <button
            onClick={handleNext}
            className="font-bold uppercase cursor-pointer transition-all hover:bg-[#38bdf8]"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 11,
              letterSpacing: ".06em",
              borderRadius: ".625rem",
              padding: ".65rem 1.25rem",
              background: "#fff",
              color: "#060912",
              border: "none",
            }}
          >
            Confirm &amp; Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stage 3 – License activation
// ---------------------------------------------------------------------------
interface LicenseStageProps {
  visible: boolean;
  onEnter: () => void;
}

function LicenseStage({ visible, onEnter }: LicenseStageProps) {
  const [appearedItems, setAppearedItems] = useState<number[]>([]);
  const [countdown, setCountdown] = useState(4);
  const enteredRef = useRef(false);

  const doEnter = useCallback(() => {
    if (!enteredRef.current) {
      enteredRef.current = true;
      onEnter();
    }
  }, [onEnter]);

  useEffect(() => {
    if (!visible) return;

    // Reset state each time stage becomes visible
    enteredRef.current = false;
    setAppearedItems([]);
    setCountdown(4);

    const itemTimers = UNLOCK_FEATURES.map((_, i) =>
      setTimeout(() => setAppearedItems((prev) => [...prev, i]), 120 + i * 90),
    );

    let t = 4;
    const interval = setInterval(() => {
      t--;
      setCountdown(t);
      if (t <= 0) {
        clearInterval(interval);
        doEnter();
      }
    }, 1000);

    return () => {
      itemTimers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [visible, doEnter]);

  return (
    <div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center p-4 transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
      }}
    >
      {/* Info banner */}
      <div
        className="flex items-center gap-3.5 mb-6 transition-all duration-[350ms]"
        style={{
          width: "min(640px,94vw)",
          background: "rgba(99,102,241,.08)",
          border: "1px solid rgba(129,140,248,.25)",
          borderRadius: ".875rem",
          padding: ".875rem 1.25rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0 text-[#818cf8]"
          style={{
            width: 32,
            height: 32,
            background: "rgba(129,140,248,.12)",
            border: "1px solid rgba(129,140,248,.2)",
            borderRadius: ".5rem",
          }}
        >
          <BadgeCheckIcon className="w-4 h-4" />
        </div>
        <div>
          <div
            className="font-bold text-[#818cf8] onyx-lic-pulse"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 11,
              letterSpacing: ".06em",
            }}
          >
            [PRO_LICENSE_ACTIVATED] — Full access to 10 scans/2 days granted.
          </div>
          <div
            className="mt-0.5 text-[#475569]"
            style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 9 }}
          >
            Transaction confirmed · Tier upgraded · All modules unlocked
          </div>
        </div>
      </div>

      {/* Feature card */}
      <div
        className="overflow-hidden transition-all duration-[400ms] delay-100"
        style={{
          width: "min(640px,94vw)",
          background: "#0d1117",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: "1.25rem",
          boxShadow: "0 20px 40px rgba(0,0,0,.4)",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(.96)",
        }}
      >
        {/* Card header */}
        <div
          className="flex items-center gap-3.5 px-6 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}
        >
          <div
            className="flex items-center justify-center font-bold text-white flex-shrink-0"
            style={{
              width: 40,
              height: 40,
              borderRadius: ".75rem",
              background: "linear-gradient(135deg,#38bdf8,#818cf8)",
              fontFamily: "JetBrains Mono,monospace",
              fontSize: ".85rem",
            }}
          >
            FN
          </div>
          <div>
            <div
              className="font-bold text-white"
              style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: ".9rem",
              }}
            >
              Fines Need Hug
            </div>
            <div
              className="mt-0.5 text-[#475569]"
              style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10 }}
            >
              admin@tenant.com
            </div>
          </div>
          <div
            className="ml-auto flex items-center gap-1.5 font-bold text-[#38bdf8]"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 10,
              background: "rgba(56,189,248,.10)",
              border: "1px solid rgba(56,189,248,.25)",
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] onyx-blink" />
            PRO TIER
          </div>
        </div>

        {/* Unlock grid */}
        <div className="p-6 grid grid-cols-2 gap-2.5">
          {UNLOCK_FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 transition-all duration-300"
              style={{
                background: "#111823",
                border: "1px solid rgba(255,255,255,.07)",
                borderRadius: ".75rem",
                padding: ".75rem .875rem",
                opacity: appearedItems.includes(i) ? 1 : 0,
                transform: appearedItems.includes(i)
                  ? "translateX(0)"
                  : "translateX(-8px)",
              }}
            >
              <div
                className="flex-shrink-0 rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: f.color,
                  boxShadow: `0 0 6px ${f.color}55`,
                }}
              />
              <div>
                <div
                  className="font-bold text-white"
                  style={{
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 10,
                  }}
                >
                  {f.label}
                </div>
                <div
                  className="mt-0.5 text-[#475569]"
                  style={{
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 9,
                  }}
                >
                  {f.val}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 pb-6">
          <div
            className="flex-1 text-[#475569]"
            style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10 }}
          >
            Entering Command Center in{" "}
            <span className="font-bold text-[#38bdf8]">{countdown}</span>s...
          </div>
          <button
            onClick={doEnter}
            className="font-bold uppercase cursor-pointer transition-all hover:bg-[#38bdf8]"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 11,
              letterSpacing: ".06em",
              borderRadius: ".625rem",
              padding: ".65rem 1.25rem",
              background: "#fff",
              color: "#060912",
              border: "none",
            }}
          >
            Enter Command Center →
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export default function OnyxspireOnboarding() {
  const [stage, setStage] = useState<Stage>("provision");
  const [target, setTarget] = useState("beast.com");
  const [scanChoice, setScanChoice] = useState<"yes" | "no">("yes");
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();

  const handleFinalize = () => {
    setStage("finalizing");
    setTimeout(() => {
      router.replace("/dashboard");
    }, 2000);
  };

  // Inject global CSS once
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const goTo = (s: Stage) => {
    setStage(s);
  };

  const handleWizardNext = (t: string, c: "yes" | "no") => {
    setTarget(t);
    setScanChoice(c);
    goTo("license");
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden text-[#e2e8f0]"
      style={{ background: "#060912", fontFamily: "'Inter',sans-serif" }}
    >
      {/* Dark background layers (hidden on dashboard) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-[600ms]"
        style={{ opacity: isDark ? 1 : 0 }}
      >
        <div className="absolute inset-0 onyx-bg-grid" />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: "-20%",
            left: "-10%",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle,rgba(56,189,248,.07) 0%,transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: "-20%",
            right: "-10%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle,rgba(129,140,248,.07) 0%,transparent 65%)",
          }}
        />
        <div className="absolute inset-0 onyx-scanline" />
      </div>

      {/* Stage 1 */}
      {stage === "provision" && (
        <ProvisioningStage onComplete={() => goTo("wizard")} />
      )}

      {/* Stage 2 */}
      <WizardStage
        visible={stage === "wizard"}
        onNext={handleWizardNext}
        onSkip={() => goTo("license")}
      />

      {/* Stage 3 */}
      <LicenseStage
        visible={stage === "license"}
        // Ganti onEnter yang asalnya langsung router.replace jadi manggil handleFinalize
        onEnter={handleFinalize}
      />

      {/* Stage 4 - Hacker Loading Transition */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500"
        style={{
          background: "#080c14",
          opacity: stage === "finalizing" ? 1 : 0,
          pointerEvents: stage === "finalizing" ? "all" : "none",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Spinner ala Radar/Hacker */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-sky-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-transparent border-t-sky-500 rounded-full animate-spin"></div>
            <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping"></div>
          </div>

          {/* Teks glitching */}
          <div className="font-mono-custom text-sky-400 text-sm tracking-widest text-center mt-2">
            <div className="animate-pulse">DECRYPTING PAYLOADS...</div>
            <div className="text-[10px] text-slate-500 mt-1">
              Establishing secure connection to Command Center
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
