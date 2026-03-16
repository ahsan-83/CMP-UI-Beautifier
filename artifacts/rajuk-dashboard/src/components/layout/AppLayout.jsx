import React from "react";
import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";






export function AppLayout({ children, withSidebar = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    React.createElement('div', { className: "h-screen flex overflow-hidden bg-slate-50"   }

      , withSidebar && (
        React.createElement(React.Fragment, null
          /* Mobile backdrop */
          , React.createElement('div', {
            className: cn(
              "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
              sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            ),
            onClick: () => setSidebarOpen(false)}
          )

          /* Desktop: width-collapse animation | Mobile: slide-in */
          , React.createElement('div', {
            className: cn(
              "shrink-0 overflow-hidden transition-all duration-300 ease-in-out",
              /* desktop */ "hidden lg:block",
              sidebarOpen ? "lg:w-64" : "lg:w-0"
            )}

            , React.createElement(Sidebar, { onToggle: () => setSidebarOpen(false)} )
          )

          /* Mobile: fixed slide-in */
          , React.createElement('div', {
            className: cn(
              "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:hidden",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}

            , React.createElement(Sidebar, { onToggle: () => setSidebarOpen(false)} )
          )
        )
      )

      /* Main area: TopNav + content */
      , React.createElement('div', { className: "flex flex-col flex-1 overflow-hidden min-w-0"    }
        , React.createElement(TopNav, {
          onMenuClick: () => setSidebarOpen(!sidebarOpen),
          showMenuButton: withSidebar,
          sidebarOpen: sidebarOpen}
        )
        , React.createElement('main', { className: "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"    }
          , children
        )
      )
    )
  );
}
