import React from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, FileText, Cloud, PlusCircle, Heart, History,
  Phone, Mail, Menu, Users, Package
} from "lucide-react";
import { cn } from "@/lib/utils";







const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard",             href: "/" },
  { icon: Users,           label: "Customers",             href: "/customers" },
  { icon: FileText,        label: "Contract & Services",   href: "/contracts" },
  { icon: Cloud,           label: "Cloud Service",         href: "/services/cloud" },
  { icon: PlusCircle,      label: "Request Based Service", href: "/request-services" },
  { icon: Heart,           label: "My WishList",           href: "/wishlist" },
  { icon: History,         label: "Order History",         href: "/orders" },
  { icon: Package,         label: "Inventory",             href: "/inventory" },
];

export function Sidebar({ className, isOpen = true, onToggle }) {
  const [location] = useLocation();

  return (
    React.createElement('div', {
      className: cn(
        "flex flex-col w-64 h-screen bg-[#1a2840] text-white shrink-0 overflow-hidden",
        className
      )}

      /* ── Sidebar header ── */
      , React.createElement('div', { className: "h-16 flex items-center justify-between px-4 bg-[#152035] border-b border-white/10 shrink-0"        }
        , React.createElement('span', { className: "text-sm font-bold text-white/90 leading-tight tracking-wide"    }, "Customer Management Portal"

        )
        , React.createElement('button', {
          onClick: onToggle,
          className: "p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all shrink-0"      ,
          title: "Collapse sidebar" }

          , React.createElement(Menu, { className: "w-5 h-5" } )
        )
      )

      /* ── Navigation items ── */
      , React.createElement('nav', { className: "flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto"    }
        , menuItems.map((item) => {
          const isActive =
            location === item.href ||
            (item.href !== "/" && location.startsWith(item.href));
          return (
            React.createElement(Link, { key: item.label, href: item.href}
              , React.createElement('div', {
                className: cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all text-xs font-medium group",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                )}

                , React.createElement(item.icon, {
                  className: cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                  )}
                )
                , React.createElement('span', { className: "truncate"}, item.label)
              )
            )
          );
        })
      )

      /* ── Footer ── */
      , React.createElement('div', { className: "px-4 py-4 bg-black/20 border-t border-white/5 space-y-2 text-[11px] text-slate-400/80 shrink-0"        }
        , React.createElement('p', { className: "font-medium"}, "@2020-2030 NDC, BCC. All rights reserved."     )
        , React.createElement('div', { className: "flex items-center gap-2"  }
          , React.createElement(Phone, { className: "w-3.5 h-3.5 shrink-0"  } )
          , React.createElement('span', null, "+88-02-55006840")
        )
        , React.createElement('div', { className: "flex items-center gap-2"  }
          , React.createElement(Mail, { className: "w-3.5 h-3.5 shrink-0"  } )
          , React.createElement('span', null, "datacenter@bcc.gov.bd")
        )
      )
    )
  );
}
