"use client"; // Wajib karena ada interaksi form dan state
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  // 1. Bikin state buat nyimpen status tombol
  const [btnStatus, setBtnStatus] = useState("idle");

  // 2. Fungsi buat nanganin urutan animasi pas form di-submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Biar gak reload page

    if (btnStatus !== "idle") return; // Cegah double-click

    // Urutan Micro-interaction pake setTimeout
    setBtnStatus("encrypting");

    setTimeout(() => {
      setBtnStatus("handshake");
    }, 1200);

    setTimeout(() => {
      setBtnStatus("transmitting");
    }, 2400);

    setTimeout(() => {
      setBtnStatus("success");

      // Reset form dan tombol setelah 3 detik sukses
      setTimeout(() => {
        (e.target as HTMLFormElement).reset();
        setBtnStatus("idle");
      }, 3000);
    }, 3600);
  };

  // 3. Kamus Status (Biar kodingan tombol di bawah tetep bersih)
  const btnConfig = {
    idle: {
      text: "TRANSMIT DATA",
      bgClass: "bg-slate-900 hover:bg-sky-600",
      showSpinner: false,
      showIcon: true,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      ),
    },
    encrypting: {
      text: "ENCRYPTING PAYLOAD...",
      bgClass: "bg-slate-700 cursor-not-allowed",
      showSpinner: true,
      showIcon: false,
      icon: null,
    },
    handshake: {
      text: "ESTABLISHING HANDSHAKE...",
      bgClass: "bg-slate-700 cursor-not-allowed",
      showSpinner: true,
      showIcon: true,
      icon: null,
    },
    transmitting: {
      text: "TRANSMITTING...",
      bgClass: "bg-slate-700 cursor-not-allowed",
      showSpinner: true,
      showIcon: true,
      icon: null,
    },
    success: {
      text: "PACKET DELIVERED",
      bgClass: "bg-green-500",
      showSpinner: false,
      showIcon: false,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      ),
    },
  };

  // Ambil config yang sesuai sama status sekarang
  const currentConfig = btnConfig[btnStatus as keyof typeof btnConfig];

  return (
    <>
      {/* Background & SVG Decor */}
      <div className="fixed inset-0 z-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-cyan-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-5%] w-[35rem] h-[35rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-[20%] w-[40rem] h-[40rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[130px] opacity-50 animate-blob animation-delay-4000"></div>
      </div>
      <svg
        className="fixed inset-0 w-full h-full z-0 opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,150 L 300,150 L 400,400 L 1000,400"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth={1}
        />
        <path
          d="M 0,150 L 300,150 L 400,400 L 1000,400"
          fill="none"
          stroke="#0284c7"
          strokeWidth={2}
          className="data-flow"
        />
        <circle
          cx={300}
          cy={150}
          r={3}
          fill="#0ea5e9"
          className="animate-pulse"
        />
        <circle
          cx={400}
          cy={400}
          r={4}
          fill="#0ea5e9"
          className="animate-ping"
        />
      </svg>

      {/* NOTE: Gue hapus tag <header> yang isinya Navbar ya bro!
        Karena lu udah pake MarketingLayout di file terpisah, 
        kalau dibiarin nanti Navbarnya jadi double.
      */}

      <main className="relative z-10 flex-1 container mx-auto px-4 pt-40 pb-20 max-w-7xl">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono-custom font-bold text-slate-600 tracking-widest uppercase">
              Channel Active
            </span>
          </div>
          <h1 className="font-amarillo text-5xl md:text-6xl text-slate-900 drop-shadow-sm leading-tight">
            ESTABLISH SECURE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
              LINK
            </span>
          </h1>
          <p className="font-mono-custom text-slate-600 mt-4 max-w-2xl text-sm leading-relaxed">
            This transmission is strictly governed by AES-256 encryption
            protocols and aligned with Global Cybersecurity Standards.
            Operational data is subject to volatile memory processing and will
            be purged upon session termination.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            {/* Box Tunnel Specs */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/20 rounded-bl-full filter blur-xl" />
              <h3 className="font-mono-custom font-bold text-sky-400 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
                Tunnel Specifications
              </h3>
              <ul className="space-y-3 font-mono-custom text-[11px] text-slate-300">
                <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-500">PROTOCOL:</span>
                  <span className="font-bold text-green-400">TLS 1.3</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-500">ENCRYPTION:</span>
                  <span className="font-bold text-white">AES-256-GCM</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-500">KEY_EXCHANGE:</span>
                  <span className="font-bold text-white">ECDHE-RSA</span>
                </li>
                <li className="flex justify-between items-center pt-1">
                  <span className="text-slate-500">PEER_VERIFICATION:</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">
                    SUCCESS
                  </span>
                </li>
              </ul>
            </div>

            {/* Box Contact Info */}
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="space-y-6">
                <div>
                  <p className="font-mono-custom text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Direct Address
                  </p>
                  <a
                    href="mailto:secure@onyxspire.com"
                    className="font-mono-custom font-bold text-slate-800 text-sm hover:text-sky-600 transition-colors flex items-center gap-2"
                  >
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    secure@onyxspire.com
                  </a>
                </div>
                <div>
                  <p className="font-mono-custom text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Command Node (HQ)
                  </p>
                  <p className="font-mono-custom text-slate-700 text-xs leading-relaxed">
                    Cybersecurity Hub, Malang
                    <br />
                    East Java, Indonesia 65115
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="font-mono-custom text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      ></path>
                    </svg>
                    PGP Public Key
                  </p>
                  <code className="block text-[10px] font-mono-custom text-slate-600 break-all leading-relaxed">
                    4A8B 9C21 D3F4 E576 8A9B
                    <br />
                    C0D1 E2F3 4A5B 6C7D 8E9F
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-lg shadow-sky-100 relative">
              <h2 className="font-mono-custom font-bold text-lg text-slate-800 mb-6 border-b border-slate-200 pb-4">
                &gt; Compose Transmission
              </h2>

              {/* Tambahin onSubmit di form ini */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="identifier"
                      className="block font-mono-custom text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                    >
                      [ IDENTIFIER ] <span className="text-sky-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-slate-400 font-mono-custom text-xs">
                          &gt;
                        </span>
                      </div>
                      <input
                        type="text"
                        id="identifier"
                        required
                        placeholder="Designation / Name"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm pl-8 pr-4 py-3.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono-custom rounded-xl placeholder-slate-400 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="return_path"
                      className="block font-mono-custom text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                    >
                      [ RETURN_PATH ] <span className="text-sky-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-slate-400 font-mono-custom text-xs">
                          @
                        </span>
                      </div>
                      <input
                        type="email"
                        id="return_path"
                        required
                        placeholder="host@domain.com"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm pl-8 pr-4 py-3.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono-custom rounded-xl placeholder-slate-400 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="query_type"
                    className="block font-mono-custom text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                  >
                    [ QUERY_TYPE ] <span className="text-sky-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="query_type"
                      required
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono-custom rounded-xl shadow-sm cursor-pointer"
                    >
                      <option value="">Select routing parameter...</option>
                      <option value="sales">
                        0x01: Enterprise Sales / Licensing
                      </option>
                      <option value="support">
                        0x02: Technical Support & Integrations
                      </option>
                      <option value="vuln">
                        0x03: Vulnerability Disclosure
                      </option>
                      <option value="other">0x04: General Inquiry</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="payload"
                    className="block font-mono-custom text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-between"
                  >
                    <span>
                      [ ENCRYPTED_PAYLOAD ]{" "}
                      <span className="text-sky-500">*</span>
                    </span>
                    <span className="text-slate-400 lowercase italic">
                      Markdown supported
                    </span>
                  </label>
                  <textarea
                    id="payload"
                    required
                    rows={5}
                    placeholder="Inject your message parameters here..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono-custom rounded-xl placeholder-slate-400 shadow-sm resize-y"
                  />
                </div>

                <div className="flex items-start pt-2">
                  <div className="flex items-center h-5">
                    <input
                      id="sdg_agreement"
                      required
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <div className="w-4 h-4 bg-white border border-slate-300 rounded flex items-center justify-center peer-checked:bg-sky-500 peer-checked:border-sky-500 transition-colors shadow-sm cursor-pointer">
                      <svg
                        className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
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
                  </div>
                  <label
                    htmlFor="sdg_agreement"
                    className="ml-3 text-[11px] font-mono-custom text-slate-500 cursor-pointer leading-tight"
                  >
                    This transmission is strictly governed by{" "}
                    <span className="font-bold text-slate-700">AES-256</span>{" "}
                    encryption protocols and aligned with Global Cybersecurity
                    Standards. Operational data is subject to volatile memory
                    processing and will be purged upon session termination
                  </label>
                </div>

                <div className="pt-4">
                  {/* Tombol yang reaktif sesuai State btnStatus */}
                  <button
                    type="submit"
                    disabled={btnStatus !== "idle"}
                    className={`w-full text-white font-mono-custom font-bold text-sm py-4 px-6 rounded-xl transition-all shadow-lg flex justify-center items-center gap-3 overflow-hidden relative group ${currentConfig.bgClass}`}
                  >
                    <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"></div>

                    {/* Render Icon Normal / Success kalau ada */}
                    {currentConfig.showIcon && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {currentConfig.icon}
                      </svg>
                    )}

                    {/* Render Spinner kalau lagi loading */}
                    {currentConfig.showSpinner && (
                      <svg
                        className="animate-spin w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx={12}
                          cy={12}
                          r={10}
                          stroke="currentColor"
                          strokeWidth={4}
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    )}

                    <span>{currentConfig.text}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
