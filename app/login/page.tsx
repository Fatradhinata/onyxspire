"use client"; // Wajib pake ini buat interaksi state
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  // 1. Setup State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Handle Submit Form
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah reload page
    
    setIsLoading(true);

    // Simulasi loading 2 detik, abis itu balik normal
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="font-inter bg-[#fefaf6] text-slate-800 relative min-h-screen overflow-hidden selection:bg-sky-500 selection:text-white flex items-center justify-center">
      {/* ════ BACKGROUND DECOR ════ */}
      <div className="absolute inset-0 z-0 bg-cyber-grid opacity-80 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-sky-200/50 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="scan-line pointer-events-none" />
      
      {/* SVG Background Lines */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path d="M 100,200 L 300,150 L 500,400 L 800,200 L 1200,300" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
        <path d="M 200,600 L 400,500 L 600,700 L 900,450 L 1300,600" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
        <path d="M 300,150 L 400,500" fill="none" stroke="#0ea5e9" strokeWidth={1} strokeOpacity="0.3" />
        <path d="M 800,200 L 900,450" fill="none" stroke="#0ea5e9" strokeWidth={1} strokeOpacity="0.3" />
        <circle cx={100} cy={200} r={3} fill="#0ea5e9" />
        <circle cx={300} cy={150} r={4} fill="#0284c7" className="animate-pulse" />
        <circle cx={500} cy={400} r={3} fill="#0ea5e9" />
        <circle cx={800} cy={200} r={5} fill="#0284c7" className="animate-pulse" />
        <circle cx={400} cy={500} r={3} fill="#0ea5e9" />
        <circle cx={900} cy={450} r={4} fill="#4f46e5" className="animate-pulse" />
        <path d="M 100,200 L 300,150 L 500,400 L 800,200 L 1200,300" fill="none" stroke="#0ea5e9" strokeWidth={2} strokeDasharray="100 900" className="data-particle" />
        <path d="M 1300,600 L 900,450 L 600,700 L 400,500 L 200,600" fill="none" stroke="#6366f1" strokeWidth={2} strokeDasharray="80 920" className="data-particle-2" />
      </svg>

      {/* Terminal Text Kiri Atas */}
      <div className="absolute top-6 left-6 hidden md:block z-0 pointer-events-none opacity-60 font-mono-custom text-[10px] leading-relaxed text-slate-950">
        <div className="text-sky-600 mb-1 font-bold">&gt; INIT.SECURE_CONN...</div>
        <div>IP: 192.168.1.104</div>
        <div>PORT: 443 [HTTPS]</div>
        <div>ENC: AES-256-GCM</div>
        <div className="text-green-600 mt-2 font-bold">✓ CONNECTION SECURED</div>
      </div>

      {/* ════ MAIN LOGIN CARD ════ */}
      <main className="relative z-10 w-full max-w-md px-6">
        <div className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl shadow-sky-900/10">
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sky-500" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sky-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sky-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sky-500" />
          
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-white border border-slate-200 flex items-center justify-center shadow-lg shadow-sky-500/20 transform rotate-45">
                <svg className="w-6 h-6 text-sky-500 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <h1 className="font-amarillo text-3xl text-slate-900 tracking-widest mb-2">ONYXSPIRE</h1>
            <p className="font-mono-custom text-xs text-sky-600 tracking-widest uppercase flex items-center justify-center gap-2 font-bold">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-ping" />
              Initialize System Login
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block font-mono-custom text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Identifier <span className="text-sky-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400 group-focus-within:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input type="email" id="email" placeholder="admin@onyxspire.com" className="w-full bg-white border border-slate-200 text-slate-900 text-sm pl-10 pr-4 py-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder-slate-400 font-mono-custom shadow-sm" required />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label htmlFor="password" className="block font-mono-custom text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Access Key <span className="text-sky-500">*</span>
                </label>
                <Link href="#" className="font-mono-custom text-[10px] text-slate-500 hover:text-sky-600 transition-colors font-bold border-b border-transparent hover:border-sky-300">
                  Forgot key?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400 group-focus-within:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-slate-200 text-slate-900 text-sm pl-10 pr-10 py-3 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder-slate-400 font-mono-custom shadow-sm tracking-widest"
                  required
                />
                
                {/* Toggle Password Visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-sky-600 focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-mono-custom font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-white transition-all overflow-hidden rounded-xl ${
                  isLoading 
                    ? "bg-slate-200 cursor-not-allowed text-slate-400 shadow-none" 
                    : "text-white bg-slate-900 hover:bg-sky-600 shadow-lg shadow-slate-900/20"
                }`}
              >
                {!isLoading && (
                  <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                )}
                
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    AUTHENTICATING...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    &gt; AUTHENTICATE
                  </span>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center border-t border-slate-200 pt-6">
            <p className="font-mono-custom text-xs text-slate-500">
              Clearance missing?
              <Link href="/register" className="font-bold text-sky-600 hover:text-sky-500 transition-colors border-b border-sky-500/30 hover:border-sky-400 pb-0.5 ml-1">
                Request access here.
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}