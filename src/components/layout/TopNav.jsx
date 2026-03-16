import React from "react";
import { useState } from "react";
import { Bell, Search, ShoppingCart, LogOut, Settings, User, Menu, ChevronRight, KeyRound, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import bccLogo from "@assets/bcc1_1773630819853.png";
import ictLogo from "@assets/ictd_1773630825193.png";
import ndcLogo from "@assets/ndc-logo-colored_1773630831365.jpg";

import { NOTIFICATIONS, UNREAD_COUNT } from "@/data/notifications";

/* ── Change Password Dialog ────────────────────────────── */

function PasswordField({
  id, label, value, onChange, show, onToggle, placeholder = "Password",
}


) {
  return (
    React.createElement('div', { className: "space-y-1.5"}
      , React.createElement(Label, { htmlFor: id, className: "text-sm font-semibold text-slate-700"  }, label)
      , React.createElement('div', { className: "relative"}
        , React.createElement(Input, {
          id: id,
          type: show ? "text" : "password",
          value: value,
          onChange: (e) => onChange(e.target.value),
          placeholder: placeholder,
          required: true,
          className: "h-11 pr-11 border-slate-200 bg-white text-sm focus-visible:ring-indigo-400/30 focus-visible:border-indigo-400"      }
        )
        , React.createElement('button', {
          type: "button",
          onClick: onToggle,
          className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-indigo-500 hover:text-indigo-700 rounded transition-colors focus:outline-none"         }

          , show ? React.createElement(EyeOff, { className: "w-4 h-4" } ) : React.createElement(Eye, { className: "w-4 h-4" } )
        )
      )
    )
  );
}

function ChangePasswordDialog({ open, onOpenChange }) {
  const { toast } = useToast();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mismatch, setMismatch] = useState(false);

  const reset = () => {
    setCurrent(""); setNext(""); setConfirm("");
    setShowCurrent(false); setShowNext(false); setShowConfirm(false);
    setMismatch(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (next !== confirm) { setMismatch(true); return; }
    toast({ title: "Password Changed", description: "Your password has been updated successfully." });
    onOpenChange(false);
    reset();
  };

  return (
    React.createElement(Dialog, { open: open, onOpenChange: (v) => { onOpenChange(v); if (!v) reset(); }}
      , React.createElement(DialogContent, { className: "max-w-md p-0 gap-0 overflow-hidden rounded-2xl"    }
        /* Top accent bar */
        , React.createElement('div', { className: "h-1.5 w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600"     } )

        , React.createElement(DialogHeader, { className: "px-8 pt-7 pb-2 text-center"   }
          , React.createElement('div', { className: "flex justify-center mb-4"  }
            , React.createElement('div', { className: "p-3.5 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm"     }
              , React.createElement(Lock, { className: "w-6 h-6 text-indigo-600"  } )
            )
          )
          , React.createElement(DialogTitle, { className: "text-xl font-bold text-foreground tracking-tight"   }, "Change Password" )
          , React.createElement('p', { className: "text-sm text-muted-foreground mt-1"  }, "Update your account password below"    )
        )

        , React.createElement('form', { onSubmit: handleSubmit, className: "px-8 pb-8 pt-5 space-y-4"   }
          , React.createElement(PasswordField, {
            id: "cp-current", label: "Current Password" ,
            value: current, onChange: setCurrent,
            show: showCurrent, onToggle: () => setShowCurrent((v) => !v)}
          )
          , React.createElement(PasswordField, {
            id: "cp-new", label: "New Password" ,
            value: next, onChange: (v) => { setNext(v); setMismatch(false); },
            show: showNext, onToggle: () => setShowNext((v) => !v)}
          )
          , React.createElement(PasswordField, {
            id: "cp-confirm", label: "Confirm Password" ,
            value: confirm, onChange: (v) => { setConfirm(v); setMismatch(false); },
            show: showConfirm, onToggle: () => setShowConfirm((v) => !v)}
          )

          , mismatch && (
            React.createElement('p', { className: "text-xs text-red-500 flex items-center gap-1.5 bg-red-50 px-3 py-2 rounded-lg border border-red-100"          }
              , React.createElement(ShieldCheck, { className: "w-3.5 h-3.5 shrink-0"  } ), "New Password and Confirm Password do not match."

            )
          )

          , React.createElement('div', { className: "pt-2 flex gap-3"  }
            , React.createElement(Button, { type: "button", variant: "outline", onClick: () => { onOpenChange(false); reset(); },
              className: "flex-1 h-11 rounded-xl text-sm font-semibold border-slate-200"     }, "Cancel"

            )
            , React.createElement(Button, { type: "submit",
              className: "flex-1 h-11 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200"         }, "Submit"

            )
          )
        )
      )
    )
  );
}

/* ── Notification dropdown ─────────────────────────────── */

function NotificationDropdown() {
  const [, navigate] = useLocation();
  const preview = NOTIFICATIONS.filter((n) => !n.read).slice(0, 3);

  return (
    React.createElement(DropdownMenu, {}
      , React.createElement(DropdownMenuTrigger, { asChild: true}
        , React.createElement('button', { className: "relative p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all group focus:outline-none"        }
          , React.createElement(Bell, { className: "w-5 h-5 group-hover:scale-110 transition-transform"   } )
          , UNREAD_COUNT > 0 && (
            React.createElement('span', { className: "absolute top-0 right-0 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm px-0.5"                }
              , UNREAD_COUNT > 99 ? "99+" : UNREAD_COUNT
            )
          )
        )
      )

      , React.createElement(DropdownMenuContent, {
        align: "end",
        sideOffset: 8,
        className: "w-80 p-0 rounded-xl border-border/50 shadow-2xl shadow-black/10 overflow-hidden"      }

        /* Header */
        , React.createElement('div', { className: "px-4 py-3 bg-slate-50 border-b border-border/50"    }
          , React.createElement('h3', { className: "text-sm font-bold text-foreground"  }, "Unread Notifications" )
        )

        /* Preview items */
        , React.createElement('div', { className: "divide-y divide-border/40 max-h-72 overflow-y-auto"   }
          , preview.length === 0 ? (
            React.createElement('div', { className: "px-4 py-6 text-center text-sm text-slate-400"    }, "No unread notifications"

            )
          ) : (
            preview.map((notif) => (
              React.createElement('button', {
                key: notif.id,
                onClick: () => navigate("/notifications"),
                className: "w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"        }

                , React.createElement('div', { className: "mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary/30"       } )
                , React.createElement('div', { className: "min-w-0"}
                  , React.createElement('p', { className: "text-xs font-semibold text-foreground leading-snug line-clamp-2"    }
                    , notif.title
                  )
                  , React.createElement('p', { className: "text-[11px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2"    }
                    , notif.description
                  )
                )
              )
            ))
          )
        )

        /* View all button */
        , React.createElement('div', { className: "border-t border-border/50" }
          , React.createElement('button', {
            onClick: () => navigate("/notifications"),
            className: "w-full flex items-center justify-center gap-1.5 px-4 py-3 bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors"            }
, "View All "
              , React.createElement(ChevronRight, { className: "w-3.5 h-3.5" } )
          )
        )
      )
    )
  );
}

/* ── TopNav ────────────────────────────────────────────── */

export function TopNav({
  onMenuClick,
  showMenuButton = false,
  sidebarOpen = true,
}



) {
  const { toast } = useToast();
  const [changePassOpen, setChangePassOpen] = useState(false);

  return (
    React.createElement(React.Fragment, null
    , React.createElement('header', { className: "sticky top-0 z-50 w-full border-b border-border/50 bg-white shadow-sm shrink-0"        }
      , React.createElement('div', { className: "px-4 h-16 flex items-center justify-between gap-4"     }

        /* Left: Hamburger + Logos */
        , React.createElement('div', { className: "flex items-center gap-3"  }
          , showMenuButton && (
            React.createElement('button', {
              onClick: onMenuClick,
              className: cn(
                "p-2 -ml-1 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all",
                sidebarOpen ? "lg:hidden" : "flex"
              )}

              , React.createElement(Menu, { className: "w-5 h-5" } )
            )
          )

          , React.createElement(Link, { href: "/", className: "flex items-center gap-3"  }
            , React.createElement('img', { src: ictLogo, alt: "ICT Division" , className: "h-9 w-auto object-contain"  } )
            , React.createElement('div', { className: "w-px h-6 bg-slate-200"  } )
            , React.createElement('img', { src: bccLogo, alt: "BCC",          className: "h-8 w-auto object-contain"  } )
            , React.createElement('div', { className: "w-px h-6 bg-slate-200"  } )
            , React.createElement('img', { src: ndcLogo, alt: "NDC",          className: "h-8 w-auto object-contain"  } )
          )
        )

        /* Center: User email pill */
        , React.createElement('div', { className: "hidden md:flex flex-1 justify-center"   }
          , React.createElement('div', { className: "px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 flex items-center gap-2"           }
            , React.createElement(User, { className: "w-3.5 h-3.5 text-primary"  } ), "programmer_raj@dhaka.gov.bd"

          )
        )

        /* Right: Actions */
        , React.createElement('div', { className: "flex items-center gap-1 sm:gap-2"   }
          , React.createElement('button', {
            onClick: () => toast({ title: "Search", description: "Search feature coming soon." }),
            className: "p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all"     }

            , React.createElement(Search, { className: "w-5 h-5" } )
          )

          , React.createElement('button', { className: "relative p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all group"       }
            , React.createElement(Link, { href: "/wishlist"}
              , React.createElement(ShoppingCart, { className: "w-5 h-5 group-hover:scale-110 transition-transform"   } )
              , React.createElement('span', { className: "absolute top-0.5 right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"               }, "2"

              )
            )
          )

          /* Notification dropdown */
          , React.createElement(NotificationDropdown)

          , React.createElement('div', { className: "w-px h-6 bg-border mx-1"   } )

          , React.createElement(DropdownMenu, {}
            , React.createElement(DropdownMenuTrigger, { className: "focus:outline-none rounded-full ring-2 ring-transparent focus-visible:ring-primary/20 transition-all hover:ring-primary/30"      }
              , React.createElement('img', {
                src: `${import.meta.env.BASE_URL}images/user-avatar.png`,
                alt: "User Avatar" ,
                className: "w-9 h-9 rounded-full object-cover shadow-sm border border-border"      ,
                onError: (e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=Programmer+Raj&background=1e4db7&color=fff`;
                }}
              )
            )
            , React.createElement(DropdownMenuContent, { align: "end", className: "w-56 mt-2 p-2 rounded-xl border-border/50 shadow-xl shadow-black/5"      }
              , React.createElement(DropdownMenuLabel, { className: "font-normal flex flex-col gap-1 px-2 py-1.5"     }
                , React.createElement('span', { className: "text-sm font-semibold text-foreground"  }, "Programmer Raj" )
                , React.createElement('span', { className: "text-xs text-muted-foreground" }, "Admin Access" )
              )
              , React.createElement(DropdownMenuSeparator)
              , React.createElement(DropdownMenuItem, { className: "cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground/80 focus:bg-primary/5 focus:text-primary transition-colors"        }
                , React.createElement(Settings, { className: "w-4 h-4 mr-2"  } ), "Account Settings"

              )
              , React.createElement(DropdownMenuItem, {
                onSelect: () => setChangePassOpen(true),
                className: "cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground/80 focus:bg-indigo-50 focus:text-indigo-700 transition-colors"        }

                , React.createElement(KeyRound, { className: "w-4 h-4 mr-2"  } ), "Change Password"

              )
              , React.createElement(DropdownMenuSeparator)
              , React.createElement(DropdownMenuItem, { className: "cursor-pointer rounded-lg px-3 py-2 text-sm text-destructive focus:bg-destructive/10 focus:text-destructive transition-colors"        }
                , React.createElement(LogOut, { className: "w-4 h-4 mr-2"  } ), "Sign Out"

              )
            )
          )
        )
      )
    )

    , React.createElement(ChangePasswordDialog, { open: changePassOpen, onOpenChange: setChangePassOpen} )
    )
  );
}
