import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-[100] border-b border-white/20 bg-white/40 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/logo.png"
            alt="Onyxspire Logo"
            className="h-12 w-12 object-contain drop-shadow-md"
          />
          <span className="font-amarillo text-2xl text-slate-900 mt-1">
            ONYXSPIRE
          </span>
        </Link>

        <div className="hidden md:flex space-x-10 text-sm font-bold font-mono-custom text-slate-600">
          <Link
            href="/"
            className="hover:text-sky-600 hover:underline decoration-2 decoration-sky-500 underline-offset-8 transition-all"
          >
            HOME
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-sky-600 hover:underline decoration-2 decoration-sky-500 underline-offset-8 transition-all"
          >
            DASHBOARD
          </Link>
          <Link
            href="/documentation"
            className="hover:text-sky-600 hover:underline decoration-2 decoration-sky-500 underline-offset-8 transition-all"
          >
            DOCUMENTATION
          </Link>
          <Link
            href="/contact"
            className="hover:text-sky-600 hover:underline decoration-2 decoration-sky-500 underline-offset-8 transition-all"
          >
            CONTACT US
          </Link>
          <Link
            href="/login"
            className="hover:text-sky-600 hover:underline decoration-2 decoration-sky-500 underline-offset-8 transition-all"
          >
            LOGIN
          </Link>
        </div>

        <div className="hidden md:block">
          <Link
            href="/pricing"
            className="bg-slate-900 text-white font-mono-custom text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-sky-600 transition-colors shadow-lg hover:shadow-sky-500/50"
          >
            PRICING
          </Link>
        </div>
      </nav>
    </header>
  );
}
