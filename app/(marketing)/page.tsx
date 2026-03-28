import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Background Decor & Blobs */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-60"></div>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-[30%] w-[40rem] h-[40rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32 md:pt-40 pb-20 text-center">
        {/* Hero Section */}
        <div className="mb-8 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50/50 backdrop-blur-sm shadow-sm inline-flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-ping absolute"></span>
          <span className="relative flex h-2 w-2 rounded-full bg-sky-500"></span>
          <span className="text-xs font-mono-custom font-bold text-sky-700 tracking-wider">
            SYSTEM ONLINE & READY TO SCAN
          </span>
        </div>

        <h1 className="font-amarillo text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900 drop-shadow-sm mb-6 leading-tight">
          YOUR WEBSITE, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 filter drop-shadow-md">
            SECURED
          </span>
        </h1>

        <p className="font-mono-custom text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Our platform provides web-based penetration testing tools designed for
          authorized security assessments.
          <span className="block mt-2 font-bold text-slate-800">
            Identify vulnerabilities before attackers do.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full max-w-md mx-auto mb-16">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-bold font-mono-custom text-lg shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            RUN TEST
          </Link>

          <Link
            href="/pricing"
            className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-800 border-2 border-slate-200 rounded-xl font-bold font-mono-custom text-lg shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center justify-center gap-2"
          >
            VIEW PRICING
          </Link>
        </div>
        <div className="relative mt-4 group cursor-pointer">
          <div className="absolute inset-0 border-2 border-sky-400/30 rounded-full scale-[1.5] group-hover:scale-[1.8] transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 to-transparent blur-2xl rounded-full scale-110"></div>
        </div>
      </main>
      <section
        id="features"
        className="relative z-10 py-32 bg-slate-50/80 backdrop-blur-xl border-t border-slate-200/60 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-50"></div>
        <div className="absolute -left-40 top-40 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>
        <div className="absolute -right-40 bottom-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-4">
              <svg
                className="w-4 h-4 text-sky-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.506.326l-1.741-.348a2 2 0 11.774-3.924l1.74.348a6 6 0 003.759-.489l.672-.336a8 8 0 015.147-.689l2.387.477a2 2 0 011.022.547l2.121 2.121a2 2 0 010 2.828l-2.121 2.121z"
                ></path>
              </svg>
              <span className="text-xs font-mono-custom font-bold text-slate-600 tracking-widest uppercase">
                Core Features
              </span>
            </div>
            <h2 className="font-amarillo text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6 drop-shadow-sm">
              WHAT YOU GET
            </h2>
            <p className="font-mono-custom text-slate-500 text-lg leading-relaxed">
              Powerful tools engineered for deep security analysis. Everything
              you need to secure your infrastructure in one unified platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 transform hover:-translate-y-2 cursor-crosshair">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-400 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-50 rounded-2xl flex items-center justify-center mb-8 border border-sky-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <svg
                    className="w-8 h-8 text-sky-500 group-hover:text-sky-700 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
                <span className="inline-block text-[10px] font-mono-custom font-bold bg-sky-50 text-sky-600 px-2 py-1 rounded-md mb-3 border border-sky-100">
                  [ AUTO-SCAN ]
                </span>
                <h3 className="font-mono-custom font-bold text-xl text-slate-900 mb-4 leading-snug">
                  Automated
                  <br />
                  Scanning
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Detect common and possible web vulnerabilities automatically
                  with our high-performance engine. Runs silently in the
                  background.
                </p>
                <div className="w-full h-px bg-slate-100 overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-sky-400 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </div>
            <div className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2 cursor-crosshair">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-8 border border-blue-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <svg
                    className="w-8 h-8 text-blue-600 group-hover:text-blue-800 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <span className="inline-block text-[10px] font-mono-custom font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md mb-3 border border-blue-100">
                  [ OFFENSIVE ]
                </span>
                <h3 className="font-mono-custom font-bold text-xl text-slate-900 mb-4 leading-snug">
                  Pentest
                  <br />
                  Tools
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Simulate real-world attacks safely using specialized tools
                  like WPCheck, Port Scanner, and SQL Injection emulators.
                </p>
                <div className="w-full h-px bg-slate-100 overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </div>
            <div className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 transform hover:-translate-y-2 cursor-crosshair">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center mb-8 border border-indigo-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <svg
                    className="w-8 h-8 text-indigo-600 group-hover:text-indigo-800 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <span className="inline-block text-[10px] font-mono-custom font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md mb-3 border border-indigo-100">
                  [ ANALYTICS ]
                </span>
                <h3 className="font-mono-custom font-bold text-xl text-slate-900 mb-4 leading-snug">
                  Actionable
                  <br />
                  Reports
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Get clear findings mapped with severity levels. Includes
                  detailed remediation steps to help your IT team patch
                  vulnerabilities fast.
                </p>
                <div className="w-full h-px bg-slate-100 overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-indigo-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </div>
            <div className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-2 cursor-crosshair">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-2xl flex items-center justify-center mb-8 border border-cyan-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <svg
                    className="w-8 h-8 text-cyan-600 group-hover:text-cyan-800 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <span className="inline-block text-[10px] font-mono-custom font-bold bg-cyan-50 text-cyan-600 px-2 py-1 rounded-md mb-3 border border-cyan-100">
                  [ CLOUD-NATIVE ]
                </span>
                <h3 className="font-mono-custom font-bold text-xl text-slate-900 mb-4 leading-snug">
                  Web-Based
                  <br />
                  Platform
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  No installation required. Run your security tests anywhere,
                  anytime through our secure and encrypted cloud platform.
                </p>
                <div className="w-full h-px bg-slate-100 overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-cyan-400 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="relative z-10 py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-4">
              <svg
                className="w-4 h-4 text-sky-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span className="text-xs font-mono-custom font-bold text-slate-600 tracking-widest uppercase">
                Workflow
              </span>
            </div>
            <h2 className="font-amarillo text-4xl md:text-6xl text-slate-900 mb-6 leading-none">
              HOW IT <span className="text-sky-500">WORKS</span>
            </h2>
            <p className="font-mono-custom text-slate-500 text-lg tracking-tight">
              Simple process, professional results. Our 3-step automated
              workflow ensures your website is thoroughly tested and secured
              without complex setups.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-slate-100 -z-10">
              <div className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 w-full opacity-20" />
            </div>
            <div className="group relative">
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-amarillo text-2xl group-hover:bg-sky-500 transition-all duration-500 shadow-xl group-hover:shadow-sky-500/50 transform group-hover:rotate-12 border border-slate-700">
                  1
                </div>
              </div>
              <h3 className="font-mono-custom font-bold text-2xl text-slate-900 mb-4 tracking-tight text-center lg:text-left">
                Connect Your Website
              </h3>
              <p className="text-slate-500 leading-relaxed border-l-4 border-slate-100 pl-4 group-hover:border-sky-500 transition-all duration-500">
                Input the target URL you want to assess. Our system will perform
                a rapid authorization handshake to verify ownership before
                proceeding.
              </p>
            </div>
            <div className="group relative">
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-amarillo text-2xl group-hover:bg-blue-600 transition-all duration-500 shadow-xl group-hover:shadow-blue-500/50 transform group-hover:rotate-12 border border-slate-700">
                  2
                </div>
              </div>
              <h3 className="font-mono-custom font-bold text-2xl text-slate-900 mb-4 tracking-tight text-center lg:text-left">
                Run Security Test
              </h3>
              <p className="text-slate-500 leading-relaxed border-l-4 border-slate-100 pl-4 group-hover:border-blue-600 transition-all duration-500">
                Our engine executes automated and manual testing tools in the
                background, probing for vulnerabilities like WP
                misconfigurations, open ports, and SQL injections.
              </p>
            </div>
            <div className="group relative">
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-amarillo text-2xl group-hover:bg-indigo-600 transition-all duration-500 shadow-xl group-hover:shadow-indigo-500/50 transform group-hover:rotate-12 border border-slate-700">
                  3
                </div>
              </div>
              <h3 className="font-mono-custom font-bold text-2xl text-slate-900 mb-4 tracking-tight text-center lg:text-left">
                Review &amp; Fix
              </h3>
              <p className="text-slate-500 leading-relaxed border-l-4 border-slate-100 pl-4 group-hover:border-indigo-600 transition-all duration-500">
                Receive a comprehensive report detailing every vulnerability
                found. Follow our exact recommendations to patch your system and
                secure your digital assets.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="why-choose-us"
        className="relative z-10 py-32 bg-slate-50 overflow-hidden"
      >
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-indigo-100/40 rounded-full mix-blend-multiply filter blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 mb-4 shadow-sm">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
                <span className="text-xs font-mono-custom font-bold text-slate-600 tracking-widest uppercase">
                  The Onyxspire Advantage
                </span>
              </div>
              <h2 className="font-amarillo text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-8 leading-tight">
                WHY CHOOSE <span className="text-sky-500">US</span>
              </h2>
              <div className="space-y-4">
                <div className="group flex items-start gap-5 p-5 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 border border-transparent hover:border-slate-100">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-sky-600 group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-mono-custom font-bold text-lg text-slate-900 mb-1">
                      Ethical Hacking Focus
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Strict ownership verification protocols ensure all
                      security assessments are legal and fully authorized.
                    </p>
                  </div>
                </div>
                <div className="group flex items-start gap-5 p-5 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 border border-transparent hover:border-slate-100">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-blue-600 group-hover:text-white"
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
                  </div>
                  <div>
                    <h4 className="font-mono-custom font-bold text-lg text-slate-900 mb-1">
                      Built by Security Engineers
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Developed by professionals who understand the evolving
                      cybersecurity landscape and real-world threats.
                    </p>
                  </div>
                </div>
                <div className="group flex items-start gap-5 p-5 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 border border-transparent hover:border-slate-100">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-indigo-600 group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-mono-custom font-bold text-lg text-slate-900 mb-1">
                      Zero Data Retention
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      We respect your privacy. Scan results and sensitive
                      targets are wiped automatically based on your preferences.
                    </p>
                  </div>
                </div>
                <div className="group flex items-start gap-5 p-5 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 border border-transparent hover:border-slate-100">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-cyan-600 group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-mono-custom font-bold text-lg text-slate-900 mb-1">
                      Compliance &amp; Audit Ready
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Generate comprehensive technical reports that meet strict
                      industry standards for security audits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0 perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 to-indigo-500 blur-3xl opacity-20 rounded-full scale-105 transform -rotate-6"></div>
              <div className="relative bg-slate-900 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden transform transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1">
                <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/50 flex items-center justify-between backdrop-blur-sm">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="font-mono-custom text-[10px] text-slate-400">
                    root@onyxspire:~
                  </div>
                  <div className="w-12" />
                </div>
                <div className="p-6 font-mono-custom text-sm text-slate-300 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                    <div>
                      <div className="text-sky-400 font-bold text-xs mb-1">
                        TARGET: byrsmj.com
                      </div>
                      <div className="text-slate-500 text-[10px]">
                        SCAN IN PROGRESS...
                      </div>
                    </div>
                    <div className="relative w-8 h-8 rounded-full border border-sky-500/30 flex items-center justify-center">
                      <div className="absolute w-full h-full rounded-full border-t-2 border-sky-400 animate-spin" />
                      <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <span className="text-slate-400">
                        Initializing WP Check module...
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <span className="text-slate-400">
                        Port 80 (HTTP) -&gt;{" "}
                        <span className="text-sky-300">OPEN</span>
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <span className="text-slate-400">
                        Port 443 (HTTPS) -&gt;{" "}
                        <span className="text-sky-300">OPEN</span>
                      </span>
                    </div>
                    <div className="flex gap-3 opacity-70">
                      <span className="text-yellow-400 animate-pulse">⟳</span>
                      <span className="text-slate-400">
                        Testing SQL Injection payloads [45/120]
                      </span>
                    </div>
                  </div>
                  <div className="pt-6 grid grid-cols-3 gap-3">
                    <div className="h-16 rounded-lg bg-slate-800 border border-slate-700 flex flex-col justify-end p-2 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full bg-green-500/20 h-[80%]" />
                      <span className="text-[10px] text-slate-400 relative z-10"></span>
                    </div>
                    <div className="h-16 rounded-lg bg-slate-800 border border-slate-700 flex flex-col justify-end p-2 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full bg-yellow-500/20 h-[40%]" />
                      <span className="text-[10px] text-slate-400 relative z-10">
                        MED
                      </span>
                    </div>
                    <div className="h-16 rounded-lg bg-slate-800 border border-slate-700 flex flex-col justify-end p-2 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full bg-red-500/20 h-[10%] animate-pulse" />
                      <span className="text-[10px] text-slate-400 relative z-10">
                        HIGH
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-slate-200 hidden md:flex items-center gap-4 animate-bounce hover:animate-none transition-transform hover:scale-105">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                </div>
                <div>
                  <p className="font-mono-custom text-xs font-bold text-slate-500">
                    SYSTEM STATUS
                  </p>
                  <p className="font-bold text-slate-900">
                    Secure &amp; Hardened
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
