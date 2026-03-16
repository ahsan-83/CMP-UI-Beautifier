import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  withSidebar?: boolean;
}

export function AppLayout({ children, withSidebar = false }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      {/* Left: Full-height sidebar */}
      {withSidebar && (
        <>
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out",
              "lg:relative lg:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full lg:w-0 lg:overflow-hidden"
            )}
          >
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Right: TopNav + content */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopNav
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={withSidebar}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
