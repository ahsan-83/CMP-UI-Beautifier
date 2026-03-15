import { useLocation } from "wouter";
import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  withSidebar?: boolean;
}

export function AppLayout({ children, withSidebar = false }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <TopNav onMenuClick={withSidebar ? () => setSidebarOpen(!sidebarOpen) : undefined} />
      
      <div className="flex flex-1 overflow-hidden">
        {withSidebar && (
          <>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <div className={cn(
              "fixed inset-y-0 left-0 pt-16 z-40 transform transition-transform duration-300 lg:relative lg:pt-0 lg:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
              <Sidebar isOpen={true} />
            </div>
          </>
        )}
        
        <main className={cn(
          "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8",
          !withSidebar && "container mx-auto max-w-7xl"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
