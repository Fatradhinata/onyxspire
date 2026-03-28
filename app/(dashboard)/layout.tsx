import {Sidebar} from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* 1. Sidebar (Fixed di kiri) */}
      <Sidebar />

      {/* 2. Main Content Area (Scrollable di kanan) */}
      {/* flex-1 biar dia ngambil sisa space yang nggak dipake sidebar */}
      <main className="flex-1 relative overflow-y-auto focus:outline-none bg-dashboard-grid">
        {/* Children ini adalah isi dari page.tsx masing-masing halaman */}
        {children}
      </main>
      
    </div>
  );
}