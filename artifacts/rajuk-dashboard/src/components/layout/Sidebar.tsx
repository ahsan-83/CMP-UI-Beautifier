import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, Cloud, PlusCircle, Heart, History, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
}

export function Sidebar({ className, isOpen = true }: SidebarProps) {
  const [location] = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: FileText, label: "Contract & Services", href: "/contracts" },
    { icon: Cloud, label: "Cloud Service", href: "/services/cloud" },
    { icon: PlusCircle, label: "Request Based Service", href: "/request-services" },
    { icon: Heart, label: "My WishList", href: "/wishlist" },
    { icon: History, label: "Order History", href: "/orders" },
  ];

  return (
    <div 
      className={cn(
        "flex flex-col w-64 h-[calc(100vh-64px)] bg-[#1e2d4d] text-white transition-all duration-300 shrink-0 sticky top-16 z-40 overflow-y-auto",
        !isOpen && "hidden lg:flex",
        className
      )}
    >
      <div className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.label} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400")} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 bg-black/20 mt-auto text-xs text-slate-400 space-y-2 border-t border-white/5">
        <p>© 2020-2030 NDC, BCC. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5" />
          <span>+880 1234-567890</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5" />
          <span>support@ndc.gov.bd</span>
        </div>
      </div>
    </div>
  );
}
