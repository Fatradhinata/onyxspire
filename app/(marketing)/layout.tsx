import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-inter bg-slate-50 text-slate-800 relative overflow-x-hidden min-h-screen selection:bg-sky-500 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        {children} 
      </main>
      <Footer />
    </div>
  );
}
