import { Bell, Search, ShoppingCart, LogOut, Settings, User, Menu } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import bccLogo from "@assets/bcc1_1773630819853.png";
import ictLogo from "@assets/ictd_1773630825193.png";
import ndcLogo from "@assets/ndc-logo-colored_1773630831365.jpg";

export function TopNav({
  onMenuClick,
  showMenuButton = false,
  sidebarOpen = true,
}: {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  sidebarOpen?: boolean;
}) {
  const { toast } = useToast();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white shadow-sm shrink-0">
      <div className="px-4 h-16 flex items-center justify-between gap-4">

        {/* Left: Hamburger + Logos */}
        <div className="flex items-center gap-3">
          {/* Hamburger — always on mobile; on desktop only when sidebar is closed */}
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className={cn(
                "p-2 -ml-1 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all",
                sidebarOpen ? "lg:hidden" : "flex"
              )}
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Three brand logos */}
          <Link href="/" className="flex items-center gap-3">
            <img src={ictLogo}  alt="ICT Division" className="h-9 w-auto object-contain" />
            <div className="w-px h-6 bg-slate-200" />
            <img src={bccLogo}  alt="BCC"          className="h-8 w-auto object-contain" />
            <div className="w-px h-6 bg-slate-200" />
            <img src={ndcLogo}  alt="NDC"          className="h-8 w-auto object-contain" />
          </Link>
        </div>

        {/* Center: User email pill */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-primary" />
            programmer_raj@dhaka.gov.bd
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => toast({ title: "Search", description: "Search feature coming soon." })}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            className="relative p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all group"
          >
            <Link href="/wishlist">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                2
              </span>
            </Link>
          </button>

          <button
            onClick={() => toast({ title: "No new notifications", description: "You're all caught up!" })}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all group"
          >
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <div className="w-px h-6 bg-border mx-1" />

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none rounded-full ring-2 ring-transparent focus-visible:ring-primary/20 transition-all hover:ring-primary/30">
              <img
                src={`${import.meta.env.BASE_URL}images/user-avatar.png`}
                alt="User Avatar"
                className="w-9 h-9 rounded-full object-cover shadow-sm border border-border"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=Programmer+Raj&background=1e4db7&color=fff`;
                }}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 p-2 rounded-xl border-border/50 shadow-xl shadow-black/5">
              <DropdownMenuLabel className="font-normal flex flex-col gap-1 px-2 py-1.5">
                <span className="text-sm font-semibold text-foreground">Programmer Raj</span>
                <span className="text-xs text-muted-foreground">Admin Access</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground/80 focus:bg-primary/5 focus:text-primary transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 text-sm text-destructive focus:bg-destructive/10 focus:text-destructive transition-colors">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
