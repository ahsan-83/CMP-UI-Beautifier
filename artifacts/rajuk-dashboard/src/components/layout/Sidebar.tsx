import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, FileText, Cloud, PlusCircle, Heart, History,
  Phone, Mail, Menu, Users, Package
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

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

export function Sidebar({ className, isOpen = true, onToggle }: SidebarProps) {
  const [location] = useLocation();

  return (
    <div
      className={cn(
        "flex flex-col w-64 h-screen bg-[#1a2840] text-white shrink-0 overflow-hidden",
        className
      )}
    >
      {/* ── Sidebar header ── */}
      <div className="h-16 flex items-center justify-between px-4 bg-[#152035] border-b border-white/10 shrink-0">
        <span className="text-sm font-bold text-white/90 leading-tight tracking-wide">
          Customer Management Portal
        </span>
        <button
          onClick={onToggle}
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all shrink-0"
          title="Collapse sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ── Navigation items ── */}
      <nav className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            location === item.href ||
            (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.label} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all text-xs font-medium group",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                  )}
                />
                <span className="truncate">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="px-4 py-4 bg-black/20 border-t border-white/5 space-y-2 text-[11px] text-slate-400/80 shrink-0">
        <p className="font-medium">@2020-2030 NDC, BCC. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span>+88-02-55006840</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span>datacenter@bcc.gov.bd</span>
        </div>
      </div>
    </div>
  );
}
