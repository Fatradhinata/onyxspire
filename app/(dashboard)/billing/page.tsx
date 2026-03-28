// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────
type InvoiceStatus = "Paid" | "Pending" | "Failed";

interface Invoice {
  id: string;
  date: string;
  invoiceId: string;
  description: string;
  amount: string;
  status: InvoiceStatus;
}

// ────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────
const INVOICES: Invoice[] = [
  {
    id: "1",
    date: "Mar 10, 2026",
    invoiceId: "INV-2026-8901",
    description: "Pro Tier (Monthly Subscription)",
    amount: "$69.00",
    status: "Paid",
  },
  {
    id: "2",
    date: "Feb 10, 2026",
    invoiceId: "INV-2026-7842",
    description: "Pro Tier (Monthly Subscription)",
    amount: "$69.00",
    status: "Paid",
  },
  {
    id: "3",
    date: "Jan 10, 2026",
    invoiceId: "INV-2026-6120",
    description: "Starter Tier (Upgrade Prorated)",
    amount: "$29.00",
    status: "Paid",
  },
];

// ────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const styles: Record<InvoiceStatus, string> = {
    Paid: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Failed: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-block border px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {status}
    </span>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

// ────────────────────────────────────────────────────────────
// Main Page
// ────────────────────────────────────────────────────────────
export default function SubscriptionBilling() {
  const mono = { fontFamily: "'JetBrains Mono', monospace" };

  return (
    <>
      <main
        className="flex-1 flex flex-col h-screen overflow-y-auto relative bg-dashboard-grid z-10"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* ── Header ── */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm flex-shrink-0">
          <div>
            <h2
              className="font-bold text-xl text-slate-800 tracking-tight"
              style={mono}
            >
              Access Control &amp; Billing
            </h2>
            <p className="text-xs text-slate-500 mt-0.5" style={mono}>
              Manage operational quotas and financial configurations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg flex items-center gap-2"
              style={mono}
            >
              <LockIcon className="w-3 h-3 text-sky-500" />
              Encrypted Session
            </span>
          </div>
        </header>

        <div className="p-8 max-w-[90rem] mx-auto w-full space-y-6 pb-20">
          {/* ── Directive Banner ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md relative overflow-hidden mb-6">
            <div className="absolute left-0 top-0 w-1.5 h-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.6)]" />
            <div className="absolute right-0 top-0 w-64 h-64 bg-sky-500/10 rounded-full filter blur-[60px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-700 text-sky-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h3
                  className="font-bold text-white text-sm uppercase tracking-widest mb-2 flex items-center gap-3"
                  style={mono}
                >
                  Financial &amp; Access Control Directive
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-4xl">
                  This module governs your authorization levels across the
                  Onyxspire ecosystem. As a{" "}
                  <span className="text-sky-400 font-bold">PRO TIER</span>{" "}
                  entity, you have access to advanced execution limits and
                  detailed mitigation reports. Monitor your operational quotas
                  closely to prevent workflow interruptions.
                </p>

                <div className="flex gap-4 text-xs" style={mono}>
                  <span className="flex items-center gap-2 text-slate-500 bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
                    <svg
                      className="w-3.5 h-3.5 text-green-400"
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
                    Secure Payment Gateway
                  </span>
                  <span className="flex items-center gap-2 text-slate-500 bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
                    <svg
                      className="w-3.5 h-3.5 text-sky-400"
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
                    Real-time Quota Sync
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Three Cards ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1 — Active License */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-sky-50 rounded-bl-[100px] -z-0" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <p
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                    style={mono}
                  >
                    Active License
                  </p>
                  <h3
                    className="font-bold text-2xl text-slate-800 mt-1"
                    style={mono}
                  >
                    PRO TIER
                  </h3>
                </div>
                <span
                  className="bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                  style={mono}
                >
                  Active
                </span>
              </div>

              <div className="mb-8 relative z-10">
                <div className="flex items-end gap-1">
                  <span
                    className="text-5xl font-bold text-slate-900"
                    style={mono}
                  >
                    $69
                  </span>
                  <span
                    className="text-slate-500 font-bold text-sm mb-1.5"
                    style={mono}
                  >
                    / USD
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2" style={mono}>
                  Next billing cycle:{" "}
                  <span className="font-bold text-slate-700">
                    April 10, 2026
                  </span>
                </p>
              </div>

              <div className="mt-auto flex gap-3 relative z-10">
                <button
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs py-3 rounded transition-colors shadow-sm text-center"
                  style={mono}
                >
                  Manage Plan
                </button>
                <button
                  className="flex-1 bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs py-3 rounded transition-colors shadow-md text-center flex items-center justify-center gap-2"
                  style={mono}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Upgrade
                </button>
              </div>
            </div>

            {/* Card 2 — Execution Quota */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                    style={mono}
                  >
                    Operational Limits
                  </p>
                  <h3
                    className="font-bold text-lg text-slate-800 mt-0.5"
                    style={mono}
                  >
                    Execution Quota
                  </h3>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-600">
                    Scan Allocations (2 Days)
                  </span>
                  <span className="font-bold text-sm text-sky-600" style={mono}>
                    8<span className="text-slate-400 text-xs">/10</span>
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 border border-slate-200">
                  <div
                    className="bg-sky-500 h-full shadow-[0_0_5px_rgba(14,165,233,0.5)]"
                    style={{ width: "80%" }}
                  />
                </div>
                <p
                  className="text-[10px] text-slate-400 mt-2 text-right"
                  style={mono}
                >
                  Resets in 14h 22m
                </p>
              </div>

              <div className="mt-auto border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center bg-slate-50 border border-slate-200 p-3">
                  <span
                    className="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                    style={mono}
                  >
                    Engine Cooldown
                  </span>
                  <span
                    className="font-bold text-green-600 flex items-center gap-2 text-xs"
                    style={mono}
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-none shadow-[0_0_5px_#22c55e]" />
                    3 MINS (READY)
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 — Payment Method */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                    style={mono}
                  >
                    Financial Routing
                  </p>
                  <h3
                    className="font-bold text-lg text-slate-800 mt-0.5"
                    style={mono}
                  >
                    Payment Method
                  </h3>
                </div>
                <button className="text-slate-400 hover:text-sky-600 transition-colors">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>

              {/* Credit Card Visual */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden shadow-md">
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="w-8 h-6 bg-yellow-600/80 rounded flex items-center justify-center border border-yellow-500/50">
                    <div className="w-5 h-3 border border-yellow-800/50 rounded-sm" />
                  </div>
                  <span
                    className="text-white/50 text-xl italic font-bold"
                    style={mono}
                  >
                    VISA
                  </span>
                </div>
                <div
                  className="text-white text-lg tracking-[0.2em] mb-4 relative z-10 drop-shadow-md"
                  style={mono}
                >
                  **** **** **** 4242
                </div>
                <div className="flex justify-between items-end relative z-10">
                  <p
                    className="text-[10px] text-slate-400 uppercase tracking-widest"
                    style={mono}
                  >
                    Fines Need Hug
                  </p>
                  <p className="text-[10px] text-slate-400" style={mono}>
                    12/28
                  </p>
                </div>
                <div className="absolute right-[-20%] bottom-[-20%] w-32 h-32 border-[20px] border-white/5 rounded-full pointer-events-none" />
              </div>

              <p
                className="text-[10px] text-slate-400 mt-4 flex items-center gap-1.5"
                style={mono}
              >
                <LockIcon className="w-3 h-3 text-sky-500" />
                Secured via Stripe AES-256
              </p>
            </div>
          </div>

          {/* ── Transaction Ledger ── */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-8">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-slate-800" style={mono}>
                  Transaction Ledger
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Downloadable compliance invoices for your financial audits.
                </p>
              </div>
              <button
                className="bg-white border border-slate-300 text-slate-600 hover:text-sky-600 hover:border-sky-300 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded transition-all shadow-sm flex items-center gap-2"
                style={mono}
              >
                <svg
                  className="w-3.5 h-3.5"
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
                Export All CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" style={mono}>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <th className="py-4 px-6 font-normal border-r border-slate-200 w-32">
                      Date
                    </th>
                    <th className="py-4 px-6 font-normal border-r border-slate-200">
                      Invoice ID
                    </th>
                    <th className="py-4 px-6 font-normal border-r border-slate-200">
                      Plan Description
                    </th>
                    <th className="py-4 px-6 font-normal border-r border-slate-200 text-right">
                      Amount
                    </th>
                    <th className="py-4 px-6 font-normal border-r border-slate-200 text-center">
                      Status
                    </th>
                    <th className="py-4 px-6 font-normal text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                  {INVOICES.map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="py-4 px-6 text-slate-500 text-xs">
                        {inv.date}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-800">
                        {inv.invoiceId}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {inv.description}
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-slate-900">
                        {inv.amount}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <StatusBadge status={inv.status} />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a
                          href="#"
                          className="text-sky-600 hover:text-sky-700 font-bold text-xs underline decoration-sky-300 underline-offset-4 group-hover:decoration-sky-500 transition-all flex items-center justify-end gap-1"
                        >
                          <DownloadIcon className="w-3.5 h-3.5" />
                          PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
