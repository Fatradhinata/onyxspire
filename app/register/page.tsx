"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// ─── Tailwind v4: custom CSS injected via style tag ───────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500;600&display=swap');

  @keyframes gridScroll {
    0%   { background-position: 0 0; }
    100% { background-position: 48px 48px; }
  }
  @keyframes radarExpand {
    0%   { width: 0; height: 0; opacity: 0.8; }
    100% { width: 180vmax; height: 180vmax; opacity: 0; }
  }
  @keyframes sweep {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes shimmerPass {
    from { transform: translateX(-100%); }
    to   { transform: translateX(100%); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .bg-grid {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(14,165,233,.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(14,165,233,.15) 1px, transparent 1px);
    background-size: 48px 48px;
    animation: gridScroll 25s linear infinite;
  }

  .radar-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(14,165,233,.3);
    width: 0;
    height: 0;
    opacity: 0;
    animation: radarExpand 5s cubic-bezier(.2,0,.8,1) infinite;
  }
  .radar-ring:nth-child(2) { animation-delay: 0s;    }
  .radar-ring:nth-child(3) { animation-delay: 1.25s; }
  .radar-ring:nth-child(4) { animation-delay: 2.5s;  }
  .radar-ring:nth-child(5) { animation-delay: 3.75s; }

  .radar-sweep {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90vmax;
    height: 1.5px;
    transform-origin: 0% 50%;
    background: linear-gradient(to right, rgba(14,165,233,.8) 0%, transparent 70%);
    animation: sweep 6s linear infinite;
  }

  .blink  { animation: blink 1s step-end infinite; }
  .blink2 { animation: blink 1.4s ease-in-out infinite; }

  .form-input:-webkit-autofill,
  .form-input:-webkit-autofill:hover,
  .form-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 30px #020617 inset !important;
    -webkit-text-fill-color: #f8fafc !important;
  }

  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.3) 50%, transparent 60%);
    transform: translateX(-100%);
    transition: transform 0s;
  }
  .submit-btn:hover::after {
    animation: shimmerPass 1.2s ease forwards;
  }

  .role-radio:checked ~ .role-box-dev {
    border-color: #0ea5e9;
    background: rgba(14,165,233,.1);
  }
  .role-radio:checked ~ .role-box-secops {
    border-color: #6366f1;
    background: rgba(99,102,241,.1);
  }
  .role-radio:checked ~ .role-box-business {
    border-color: #3b82f6;
    background: rgba(59,130,246,.1);
  }
  .role-radio:checked ~ .role-box-dev svg     { color: #0ea5e9; }
  .role-radio:checked ~ .role-box-secops svg  { color: #6366f1; }
  .role-radio:checked ~ .role-box-business svg{ color: #3b82f6; }
`;

// ─── Icons ────────────────────────────────────────────────────────────────────
const UserIcon = () => (
  <svg
    className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none transition-colors group-focus-within:text-sky-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none transition-colors group-focus-within:text-sky-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none transition-colors group-focus-within:text-sky-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const EyeOpenIcon = () => (
  <svg
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeClosedIcon = () => (
  <svg
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

// ─── Password strength ─────────────────────────────────────────────────────────
type Strength = "idle" | "weak" | "medium" | "strong";

function calcStrength(v: string): Strength {
  if (!v.length) return "idle";
  let score = 0;
  if (v.length > 5) score++;
  if (v.length > 8 && /[0-9]/.test(v)) score++;
  if (v.length > 10 && /[^a-zA-Z0-9]/.test(v)) score++;
  if (score >= 3) return "strong";
  if (score === 2) return "medium";
  return "weak";
}

const STRENGTH_LABELS: Record<Strength, string> = {
  idle: "Awaiting Input",
  weak: "VULNERABLE (Weak)",
  medium: "ACCEPTABLE (Medium)",
  strong: "HARDENED (Strong)",
};

const STRENGTH_COLORS: Record<Strength, string> = {
  idle: "#94a3b8",
  weak: "#ef4444",
  medium: "#f59e0b",
  strong: "#22c55e",
};

function StrengthBar({ active, color }: { active: boolean; color: string }) {
  return (
    <div
      className="flex-1 h-[5px] rounded-full transition-colors duration-300"
      style={{ background: active ? color : "#334155" }}
    />
  );
}

// ─── Role card ────────────────────────────────────────────────────────────────
type Role = "dev" | "secops" | "business";

interface RoleCardProps {
  value: Role;
  selected: Role | null;
  onSelect: (r: Role) => void;
  icon: React.ReactNode;
  label: string;
  accentClass: string; // tailwind border color when selected
  boxClass: string; // CSS class that the radio targets
}

function RoleCard({
  value,
  selected,
  onSelect,
  icon,
  label,
  accentClass,
  boxClass,
}: RoleCardProps) {
  const isSelected = selected === value;
  return (
    <label className="cursor-pointer block">
      <input
        type="radio"
        name="role"
        value={value}
        className={`role-radio sr-only`}
        checked={isSelected}
        onChange={() => onSelect(value)}
        required
      />
      <div
        className={`${boxClass} px-2 py-3.5 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer select-none
          ${isSelected ? accentClass : "border-slate-700 bg-[#0f172a] hover:border-slate-600 hover:bg-slate-800"}`}
        onClick={() => onSelect(value)}
      >
        <div
          className={`w-[22px] h-[22px] mx-auto mb-2 transition-colors ${isSelected ? "" : "text-slate-500"}`}
        >
          {icon}
        </div>
        <div className="font-mono text-[11px] font-bold text-slate-300">
          {label}
        </div>
      </div>
    </label>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const strength = calcStrength(password);
  const strColor = STRENGTH_COLORS[strength];

  const router = useRouter();

  // Inject global CSS once
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Redirect ke halaman onboarding
      router.push("/onboarding");
    }, 2500);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 overflow-x-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#020617",
        color: "#e2e8f0",
      }}
    >
      {/* ── Animated grid background ── */}
      <div className="bg-grid" />

      {/* ── Radar overlay ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* glow blob */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,.15) 0%, transparent 70%)",
          }}
        />
        <div className="radar-ring" />
        <div className="radar-ring" />
        <div className="radar-ring" />
        <div className="radar-ring" />
        <div className="radar-sweep" />
      </div>

      {/* ── HUD corner label ── */}
      <div
        className="fixed top-6 right-6 z-[5] pointer-events-none hidden lg:block text-right"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          lineHeight: 1.7,
          color: "#64748b",
        }}
      >
        <div style={{ color: "#6366f1", fontWeight: 700, marginBottom: 4 }}>
          SYS.REGISTRATION_PROTOCOL &lt;&lt;
        </div>
        <div>NODE: JKT-01</div>
        <div>LATENCY: 12ms</div>
        <div>STATUS: ACCEPTING_DATA</div>
        <div style={{ color: "#0ea5e9", fontWeight: 700, marginTop: 8 }}>
          VERIFICATION: PENDING <span className="blink inline-block">_</span>
        </div>
      </div>

      {/* ── Card ── */}
      <main className="relative z-10 w-full max-w-[640px] px-4">
        <div
          className="relative w-full rounded-[2rem] p-12 max-sm:p-6 max-sm:rounded-3xl"
          style={{
            background: "rgba(15,23,42,.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(51,65,85,.8)",
            boxShadow:
              "0 25px 60px -15px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.05) inset",
          }}
        >
          {/* Corner brackets */}
          {(["tl", "tr", "bl", "br"] as const).map((pos) => (
            <div
              key={pos}
              className="absolute w-[18px] h-[18px]"
              style={{
                top: pos.startsWith("t") ? -1 : undefined,
                bottom: pos.startsWith("b") ? -1 : undefined,
                left: pos.endsWith("l") ? -1 : undefined,
                right: pos.endsWith("r") ? -1 : undefined,
                borderTop: pos.startsWith("t")
                  ? "2.5px solid #0ea5e9"
                  : undefined,
                borderBottom: pos.startsWith("b")
                  ? "2.5px solid #0ea5e9"
                  : undefined,
                borderLeft: pos.endsWith("l")
                  ? "2.5px solid #0ea5e9"
                  : undefined,
                borderRight: pos.endsWith("r")
                  ? "2.5px solid #0ea5e9"
                  : undefined,
                borderRadius: {
                  tl: "2rem 0 0 0",
                  tr: "0 2rem 0 0",
                  bl: "0 0 0 2rem",
                  br: "0 0 2rem 0",
                }[pos],
              }}
            />
          ))}

          {/* ── Header ── */}
          <div className="text-center mb-8">
            <h1
              className="text-[2.25rem] text-slate-50 m-0 mb-2.5 tracking-widest"
              style={{
                fontFamily: "'AmarilloUSAF','Inter',sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              NEW ENTITY
            </h1>
            <p
              className="text-[10px] text-slate-400 uppercase tracking-[0.12em] flex items-center justify-center gap-2 m-0 font-bold"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span
                className="w-2 h-2 rounded-sm inline-block blink2"
                style={{ background: "#6366f1" }}
              />
              Establish User Clearance
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Row: Name + Email */}
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <Field label="Legal Designation" required>
                <div className="relative group">
                  <UserIcon />
                  <input
                    className="form-input w-full bg-[#020617] border border-slate-700 rounded-[0.625rem] py-3 pl-10 pr-3.5 text-[0.8125rem] text-slate-50 outline-none transition-all focus:border-sky-400 focus:ring-[3px] focus:ring-sky-400/20"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    type="text"
                    id="fullname"
                    required
                    placeholder="John Doe"
                  />
                </div>
              </Field>

              <Field label="Comms Channel" required>
                <div className="relative group">
                  <MailIcon />
                  <input
                    className="form-input w-full bg-[#020617] border border-slate-700 rounded-[0.625rem] py-3 pl-10 pr-3.5 text-[0.8125rem] text-slate-50 outline-none transition-all focus:border-sky-400 focus:ring-[3px] focus:ring-sky-400/20"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    type="email"
                    id="email"
                    required
                    placeholder="admin@domain.com"
                  />
                </div>
              </Field>
            </div>

            {/* Role selection */}
            <div>
              <FieldLabel required>Primary Objective</FieldLabel>
              <div className="grid grid-cols-3 gap-3 max-[480px]:grid-cols-1">
                <RoleCard
                  value="dev"
                  selected={role}
                  onSelect={setRole}
                  boxClass="role-box-dev"
                  accentClass="border-sky-400 bg-sky-400/10"
                  label="Developer"
                  icon={
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  }
                />
                <RoleCard
                  value="secops"
                  selected={role}
                  onSelect={setRole}
                  boxClass="role-box-secops"
                  accentClass="border-indigo-500 bg-indigo-500/10"
                  label="SecOps"
                  icon={
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  }
                />
                <RoleCard
                  value="business"
                  selected={role}
                  onSelect={setRole}
                  boxClass="role-box-business"
                  accentClass="border-blue-500 bg-blue-500/10"
                  label="Business"
                  icon={
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Password */}
            <Field label="Access Key Setup" required>
              <div className="relative group">
                <LockIcon />
                <input
                  id="password"
                  className="form-input w-full bg-[#020617] border border-slate-700 rounded-[0.625rem] py-3 pl-10 pr-10 text-[0.8125rem] text-slate-50 outline-none transition-all focus:border-sky-400 focus:ring-[3px] focus:ring-sky-400/20"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.12em",
                  }}
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Generate secure key..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0 text-slate-500 hover:text-sky-400 transition-colors flex items-center"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>

              {/* Strength meter */}
              <div className="mt-2.5">
                <div className="flex justify-between items-center mb-1.5">
                  <span
                    className="text-[10px] text-slate-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Security Level:
                  </span>
                  <span
                    className="text-[10px] font-bold transition-colors"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: strColor,
                    }}
                  >
                    {STRENGTH_LABELS[strength]}
                  </span>
                </div>
                <div className="flex gap-1 h-[5px]">
                  <StrengthBar active={strength !== "idle"} color={strColor} />
                  <StrengthBar
                    active={strength === "medium" || strength === "strong"}
                    color={strColor}
                  />
                  <StrengthBar
                    active={strength === "strong"}
                    color={strColor}
                  />
                </div>
              </div>
            </Field>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-[15px] h-[15px] mt-[1px] shrink-0 cursor-pointer accent-sky-400 rounded"
              />
              <label
                htmlFor="terms"
                className="text-[11px] text-slate-500 cursor-pointer leading-[1.5]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-sky-400 no-underline border-b border-sky-400/30 hover:border-sky-400 transition-colors"
                >
                  Rules of Engagement
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-sky-400 no-underline border-b border-sky-400/30 hover:border-sky-400 transition-colors"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="submit-btn relative overflow-hidden w-full py-[0.9rem] rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 text-[0.8125rem] font-bold tracking-[0.04em] transition-all duration-200 active:translate-y-px disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: loading ? "#334155" : "#0ea5e9",
                  color: loading ? "#94a3b8" : "#020617",
                  boxShadow: loading
                    ? "none"
                    : "0 4px 16px rgba(14,165,233,.2)",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="w-4 h-4 rounded-full inline-block"
                      style={{
                        border: "2px solid rgba(148,163,184,.4)",
                        borderTopColor: "#94a3b8",
                        animation: "spin .7s linear infinite",
                      }}
                    />
                    ALLOCATING RESOURCES...
                  </>
                ) : (
                  <>&gt; DEPLOY INSTANCE</>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <hr className="border-none border-t border-slate-700 my-6 mb-4" />

          <p
            className="text-center text-[11px] text-slate-500 m-0"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Clearance already established?{" "}
            <a
              href="/login"
              className="text-sky-400 font-bold no-underline border-b border-sky-400/40 ml-1 hover:border-sky-400 transition-colors"
            >
              Authenticate here.
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

// ─── Helper sub-components ─────────────────────────────────────────────────────
function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span
      className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.08em] mb-2"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {children}
      {required && <span className="text-sky-400 ml-1">*</span>}
    </span>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block">
        <FieldLabel required={required}>{label}</FieldLabel>
        {children}
      </label>
    </div>
  );
}
