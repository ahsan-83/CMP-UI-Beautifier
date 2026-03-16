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

      {withSidebar && (
        <>
          {/* Mobile backdrop */}
          <div
            className={cn(
              "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
              sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Desktop: width-collapse animation | Mobile: slide-in */}
          <div
            className={cn(
              "shrink-0 overflow-hidden transition-all duration-300 ease-in-out",
              /* desktop */ "hidden lg:block",
              sidebarOpen ? "lg:w-64" : "lg:w-0"
            )}
          >
            <Sidebar onToggle={() => setSidebarOpen(false)} />
          </div>

          {/* Mobile: fixed slide-in */}
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:hidden",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <Sidebar onToggle={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main area: TopNav + content */}
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
