"use client";
import React from "react";

export default function AuditReportPage() {
  return (
    <>
      <div className="font-[var(--font-inter)] bg-[#f8fafc] text-slate-800 h-screen overflow-hidden flex selection:bg-sky-500 selection:text-white">
        <main className="flex-1 flex flex-col h-full relative bg-dashboard-grid z-10 overflow-y-auto pb-20">
          <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm flex-shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <a
                  href="#"
                  className="text-xs font-[var(--font-mono-custom)] text-sky-600 hover:underline"
                >
                  Reports
                </a>
                <span className="text-xs text-slate-400">/</span>
                <span className="text-xs font-[var(--font-mono-custom)] text-slate-500">
                  AUDIT-BEAST-0903
                </span>
              </div>
              <h2 className="font-[var(--font-mono-custom)] font-bold text-xl text-slate-800 tracking-tight flex items-center gap-3">
                Target: beast.com
                <span className="bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">
                  Verified Owner
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-300 font-[var(--font-mono-custom)] font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                <svg
                  className="w-4 h-4 text-slate-400"
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
                Export CSV
              </button>
              <button className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 font-[var(--font-mono-custom)] font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md">
                <svg
                  className="w-4 h-4 text-sky-400"
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
                Download PDF Report
              </button>
            </div>
          </header>

          <div className="p-8 max-w-[90rem] mx-auto w-full space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="col-span-1 lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-amber-500" />
                <h3 className="font-mono-custom font-bold text-sm text-slate-500 uppercase tracking-widest w-full text-center mb-6">
                  Global Security Index
                </h3>

                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Track */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      className="text-slate-100"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    {/* Progress Circle (Skor 42) */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      className="text-red-500"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="42, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
                    <span className="font-mono-custom font-extrabold text-5xl text-slate-900">
                      42
                    </span>
                    <span className="font-mono-custom text-xs text-slate-400 uppercase tracking-widest mt-1">
                      / 100
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-center text-sm font-bold text-red-600 bg-red-50 px-4 py-1.5 rounded-full border border-red-100">
                  Critical Status - Action Required
                </p>
              </div>

              <div className="col-span-1 lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="font-[var(--font-mono-custom)] font-bold text-sm text-slate-800 uppercase tracking-widest mb-6">
                  Industry Compliance
                </h3>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50/50 rounded-xl">
                    <span className="text-xs font-bold text-slate-700">
                      OWASP Top 10
                    </span>
                    <span className="text-[10px] font-[var(--font-mono-custom)] font-bold bg-red-100 text-red-600 px-2 py-1 rounded border border-red-200">
                      FAILED
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50/50 rounded-xl">
                    <span className="text-xs font-bold text-slate-700">
                      ISO 27001 (Web)
                    </span>
                    <span className="text-[10px] font-[var(--font-mono-custom)] font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded border border-yellow-200">
                      PARTIAL
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50/50 rounded-xl">
                    <span className="text-xs font-bold text-slate-700">
                      SSL/TLS Security
                    </span>
                    <span className="text-[10px] font-[var(--font-mono-custom)] font-bold bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200">
                      PASSED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border-l-4 border-red-600 border-y border-r border-slate-200 rounded-r-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block bg-red-50 text-red-600 text-[10px] font-[var(--font-mono-custom)] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded">
                    Critical
                  </span>
                  <p className="text-4xl font-[var(--font-mono-custom)] font-bold text-red-600">
                    1
                  </p>
                </div>
                <div className="bg-white border-l-4 border-orange-500 border-y border-r border-slate-200 rounded-r-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block bg-orange-50 text-orange-600 text-[10px] font-[var(--font-mono-custom)] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded">
                    High
                  </span>
                  <p className="text-4xl font-[var(--font-mono-custom)] font-bold text-orange-500">
                    2
                  </p>
                </div>
                <div className="bg-white border-l-4 border-amber-400 border-y border-r border-slate-200 rounded-r-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block bg-amber-50 text-amber-600 text-[10px] font-[var(--font-mono-custom)] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded">
                    Medium
                  </span>
                  <p className="text-4xl font-[var(--font-mono-custom)] font-bold text-amber-500">
                    4
                  </p>
                </div>
                <div className="bg-white border-l-4 border-sky-400 border-y border-r border-slate-200 rounded-r-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block bg-sky-50 text-sky-600 text-[10px] font-[var(--font-mono-custom)] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded">
                    Low / Info
                  </span>
                  <p className="text-4xl font-[var(--font-mono-custom)] font-bold text-sky-500">
                    12
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1 bg-sky-50 border border-sky-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10">
                  <svg
                    className="w-24 h-24 text-sky-600 transform translate-x-4 -translate-y-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="text-xs font-bold text-sky-800 uppercase tracking-widest mb-2 font-[var(--font-mono-custom)]">
                  Business Impact
                </h4>
                <p className="text-xs text-sky-700 leading-relaxed relative z-10">
                  "Your website has open doors that hackers can easily walk
                  through. They can steal customer data or deface your site.
                  Please forward the mitigations below to your IT developer
                  immediately."
                </p>
              </div>
            </div>

            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-[var(--font-amarillo)] text-3xl text-slate-900 drop-shadow-sm">
                  TECHNICAL <span className="text-sky-500">FINDINGS</span>
                </h3>
                <span className="bg-slate-900 text-white text-[10px] font-[var(--font-mono-custom)] px-3 py-1 rounded-full uppercase tracking-widest">
                  Unfiltered Log
                </span>
              </div>

              <div className="space-y-8">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col lg:flex-row">
                  <div className="w-full lg:w-1/2 border-r border-slate-100 flex flex-col">
                    <div className="bg-red-50/80 border-b border-red-100 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-red-600 text-white font-[var(--font-mono-custom)] font-bold text-[10px] px-2.5 py-1 rounded shadow-sm">
                          CRITICAL
                        </span>
                        <span className="font-[var(--font-mono-custom)] text-xs text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          CWE-89
                        </span>
                      </div>
                      <span className="font-[var(--font-mono-custom)] text-xs text-slate-400">
                        SQLMAP
                      </span>
                    </div>
                    <div className="p-6 flex-1">
                      <h4 className="font-bold text-slate-900 text-xl mb-2">
                        Blind SQL Injection
                      </h4>
                      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                        The{" "}
                        <code className="bg-slate-100 px-1 rounded">id</code>{" "}
                        parameter in the{" "}
                        <code className="bg-slate-100 px-1 rounded">
                          /api/v1/checkout
                        </code>{" "}
                        endpoint is directly concatenated into a SQL query. This
                        allows an attacker to manipulate the database.
                      </p>

                      <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden shadow-inner">
                        <div className="bg-[#1e293b] px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                          <svg
                            className="w-3 h-3 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-[var(--font-mono-custom)] text-[10px] text-slate-400 uppercase">
                            Evidence Log
                          </span>
                        </div>
                        <div className="p-4 font-[var(--font-mono-custom)] text-xs overflow-x-auto code-scroll">
                          <pre className="text-slate-300">
                            <span className="text-sky-400">GET</span>{" "}
                            /api/v1/checkout?id=1%20AND%20
                            <span className="text-red-400">
                              (SELECT%206898%20FROM%20(SELECT(SLEEP(5)))xyz)
                            </span>{" "}
                            HTTP/1.1{"\n"}
                            Host: beast.com{"\n"}
                            User-Agent: sqlmap/1.7.2#dev (https://sqlmap.org)
                            {"\n\n"}
                            <span className="text-yellow-400">
                              HTTP/1.1 200 OK
                            </span>
                            {"\n"}
                            Date: Mon, 09 Mar 2026 22:26:53 GMT{"\n"}
                            Server: Apache/2.4.41{"\n"}
                            <span className="text-green-400">
                              # Server response delayed by exactly 5.021
                              seconds.
                            </span>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 p-6 bg-slate-50 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 text-green-800 px-3 py-1.5 rounded-lg mb-4 w-fit shadow-sm">
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-[var(--font-mono-custom)] text-[10px] font-bold uppercase tracking-widest">
                        Pro Mitigation Unlocked
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-base mb-2">
                      Remediation Steps
                    </h5>
                    <p className="text-sm text-slate-600 mb-4">
                      Never trust user input. Enforce the use of Parameterized
                      Queries (Prepared Statements) using PDO or an ORM like
                      Eloquent (Laravel) to separate data from the SQL logic.
                    </p>

                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md">
                      <div className="flex justify-between items-center px-4 py-2 border-b border-slate-700 bg-slate-800/80">
                        <span className="font-[var(--font-mono-custom)] text-[10px] text-slate-400">
                          app/Controllers/Checkout.php
                        </span>
                        <button className="text-slate-400 hover:text-white transition-colors">
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
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 font-[var(--font-mono-custom)] text-xs overflow-x-auto code-scroll">
                        <pre className="text-sky-300">
                          <span className="text-slate-500 italic">
                            // VULNERABLE (Current)
                          </span>
                          {"\n"}
                          <span className="text-red-400">
                            $sql = "SELECT * FROM orders WHERE id = " .
                            $_GET['id'];
                          </span>
                          {"\n"}
                          <span className="text-slate-300">
                            $db-&gt;query($sql);
                          </span>
                          {"\n\n"}
                          <span className="text-slate-500 italic">
                            // SECURED MITIGATION (Patch)
                          </span>
                          {"\n"}
                          <span className="text-green-400">
                            $stmt = $pdo-&gt;prepare('SELECT * FROM orders WHERE
                            id = :id');
                          </span>
                          {"\n"}
                          <span className="text-green-400">
                            $stmt-&gt;execute(['id' =&gt; $_GET['id']]);
                          </span>
                          {"\n"}
                          <span className="text-slate-300">
                            $order = $stmt-&gt;fetch();
                          </span>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col lg:flex-row">
                  <div className="w-full lg:w-1/2 border-r border-slate-100 flex flex-col">
                    <div className="bg-orange-50/80 border-b border-orange-100 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-orange-500 text-white font-[var(--font-mono-custom)] font-bold text-[10px] px-2.5 py-1 rounded shadow-sm">
                          HIGH
                        </span>
                        <span className="font-[var(--font-mono-custom)] text-xs text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          CWE-79
                        </span>
                      </div>
                      <span className="font-[var(--font-mono-custom)] text-xs text-slate-400">
                        WPSCAN
                      </span>
                    </div>
                    <div className="p-6 flex-1">
                      <h4 className="font-bold text-slate-900 text-xl mb-2">
                        Cross-Site Scripting (XSS)
                      </h4>
                      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                        Reflected XSS found in the search search parameter{" "}
                        <code className="bg-slate-100 px-1 rounded">?q=</code>.
                        Attackers can inject malicious JavaScript to steal admin
                        session cookies.
                      </p>

                      <div className="bg-[#0f172a] rounded-xl border border-slate-800 overflow-hidden shadow-inner">
                        <div className="bg-[#1e293b] px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                          <svg
                            className="w-3 h-3 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                          </svg>
                          <span className="font-[var(--font-mono-custom)] text-[10px] text-slate-400 uppercase">
                            Response Snippet
                          </span>
                        </div>
                        <div className="p-4 font-[var(--font-mono-custom)] text-xs overflow-x-auto code-scroll">
                          <pre className="text-slate-300">
                            {`<div class="search-results">`}
                            {"\n"}
                            {`  <h2>Results for: `}
                            <span className="text-red-400 bg-red-900/30">
                              &lt;script&gt;alert(document.cookie)&lt;/script&gt;
                            </span>
                            {`</h2>`}
                            {"\n"}
                            {`  <p>No items found.</p>`}
                            {"\n"}
                            {`</div>`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 p-6 bg-slate-50 flex flex-col justify-center">
                    <h5 className="font-bold text-slate-800 text-base mb-2">
                      Remediation Steps
                    </h5>
                    <p className="text-sm text-slate-600 mb-4">
                      HTML encode all user-supplied data before rendering it in
                      the browser. Utilize built-in templating engine escaping
                      mechanisms.
                    </p>

                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md">
                      <div className="px-4 py-2 border-b border-slate-700 bg-slate-800/80">
                        <span className="font-[var(--font-mono-custom)] text-[10px] text-slate-400">
                          View Template (Blade/Twig)
                        </span>
                      </div>
                      <div className="p-4 font-[var(--font-mono-custom)] text-xs overflow-x-auto code-scroll">
                        <pre className="text-sky-300">
                          <span className="text-slate-500 italic">
                            &lt;!-- VULNERABLE (Raw Echo) --&gt;
                          </span>
                          {"\n"}
                          <span className="text-red-400">
                            &lt;h2&gt;Results for: {"{{"}{" "}
                            htmlspecialchars($_GET['q'], ENT_QUOTES) {"}}"}
                            &lt;/h2&gt;
                          </span>
                          {"\n\n"}
                          <span className="text-slate-500 italic">
                            &lt;!-- SECURED MITIGATION (Auto Escape) --&gt;
                          </span>
                          {"\n"}
                          <span className="text-green-400">
                            &lt;h2&gt;Results for: {"{{"}{" "}
                            htmlspecialchars($_GET['q'], ENT_QUOTES) {"}}"}
                            &lt;/h2&gt;
                          </span>
                          {"\n"}
                          <span className="text-slate-500 italic">
                            # Or simply use {"{{"} $query {"}}"} in modern
                            frameworks.
                          </span>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 bg-slate-900 rounded-2xl p-1 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 opacity-20 animate-pulse pointer-events-none" />

              <div className="bg-slate-950 rounded-[1.4rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex-1">
                  <h3 className="font-[var(--font-amarillo)] text-3xl text-white tracking-widest mb-2">
                    AUTOMATE YOUR <span className="text-sky-500">DEFENSES</span>
                  </h3>
                  <p className="text-slate-400 font-[var(--font-mono-custom)] text-sm max-w-xl leading-relaxed mb-4">
                    Stop scanning manually. Integrate Onyxspire directly into
                    your CI/CD pipeline (GitHub Actions, GitLab) and catch
                    vulnerabilities before they reach your production server.
                  </p>
                  <div className="flex gap-3">
                    <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold">
                      API Access
                    </span>
                    <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold">
                      Webhooks
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-[var(--font-mono-custom)] font-bold text-sm px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-transform transform hover:-translate-y-1 flex items-center gap-3">
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
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    Generate API Keys
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
