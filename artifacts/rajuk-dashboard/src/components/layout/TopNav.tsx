import { Bell, Search, ShoppingCart, LogOut, Settings, User, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
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
  const [location] = useLocation();

  const handleNotifications = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up!",
    });
  };

  const handleCart = () => {
    toast({
      title: "Cart Opened",
      description: "You have 2 items awaiting action.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Logos & Branding */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Hamburger: always on mobile, only when sidebar closed on desktop */}
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

          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95">
            <img 
              src={`${import.meta.env.BASE_URL}images/gov-logo.png`} 
              alt="Gov Logo" 
              className="w-10 h-10 object-contain drop-shadow-sm"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Government of</span>
              <span className="text-sm font-black text-foreground uppercase tracking-wider">Bangladesh</span>
            </div>
          </Link>

          <div className="h-6 w-px bg-border hidden lg:block" />
          
          <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-muted-foreground">
            <Link href="/contracts" className={`hover:text-primary transition-colors cursor-pointer ${location.startsWith('/contracts') ? 'text-primary' : ''}`}>CONTRACTS</Link>
            <Link href="/orders" className={`hover:text-primary transition-colors cursor-pointer ${location.startsWith('/orders') ? 'text-primary' : ''}`}>ORDERS</Link>
            <Link href="/wishlist" className={`hover:text-primary transition-colors cursor-pointer ${location.startsWith('/wishlist') ? 'text-primary' : ''}`}>WISHLIST</Link>
          </div>
        </div>

        {/* Center: Email / Identity */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="px-4 py-1.5 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-medium text-slate-600 shadow-inner flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-primary" />
            programmer_raj@dhaka.gov.bd
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          <button 
            onClick={() => toast({ title: "Search", description: "Search feature coming soon." })}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all"
          >
            <Search className="w-5 h-5" />
          </button>

          <button 
            onClick={handleCart}
            className="relative p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all group"
          >
            <Link href="/wishlist">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                2
              </span>
            </Link>
          </button>

          <button 
            onClick={handleNotifications}
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
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=Programmer+Raj&background=0D8ABC&color=fff`;
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
