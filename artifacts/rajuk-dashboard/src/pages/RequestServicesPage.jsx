 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Server, Database, Cloud, Shield, Network, Building, Laptop,
  HardDrive, Cpu, Plus, ChevronDown, Trash2, Upload, FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

/* ─── Category definitions ─────────────────────────────── */

const CATEGORIES = [
  { id: "compute",  name: "Compute",                  icon: Server   },
  { id: "collab",   name: "Collaboration Platform",   icon: Cloud    },
  { id: "db",       name: "Database",                 icon: Database },
  { id: "storage",  name: "Storage",                  icon: HardDrive},
  { id: "backup",   name: "Backup",                   icon: Shield   },
  { id: "network",  name: "Network",                  icon: Network  },
  { id: "sec",      name: "Network Security",         icon: Shield   },
  { id: "colo",     name: "Colocation",               icon: Building },
  { id: "hosting",  name: "Hosting",                  icon: Laptop   },
  { id: "design",   name: "Design, Deployment and Consultation", icon: Cpu },
];

/* Sub-services per category */
const SUB_SERVICES = {
  compute: [
    { id: "vps",      label: "Virtual Private Server (VPS) Service" },
    { id: "physical", label: "Physical Server Service" },
  ],
  collab: [
    { id: "email",      label: "Email Service" },
    { id: "clouddrive", label: "Cloud Drive Service" },
  ],
  db:      [{ id: "mysql", label: "MySQL Database" }, { id: "postgres", label: "PostgreSQL" }],
  storage: [{ id: "s3",    label: "Object Storage"  }, { id: "nfs",     label: "NFS Storage" }],
  backup:  [{ id: "vmbk",  label: "VM Backup"       }],
  network: [{ id: "fw",    label: "Firewall Service" }, { id: "lb", label: "Load Balancer" }],
  sec:     [{ id: "waf",   label: "WAF Service"      }],
  colo:    [{ id: "rack",  label: "Rack Rental"      }],
  hosting: [{ id: "web",   label: "Web Hosting"      }],
  design:  [{ id: "cons",  label: "Consultation"     }],
};

/* ─── VPS Packages ─────────────────────────────────────── */

const VPS_PACKAGES = [
  { id: "basic",    name: "Basic",    specs: "2 vCPU, 4 GB RAM, 100 GB Storage",  price: 5000  },
  { id: "standard", name: "Standard", specs: "4 vCPU, 8 GB RAM, 200 GB Storage",  price: 10000 },
  { id: "advanced", name: "Advanced", specs: "4 vCPU, 12 GB RAM, 300 GB Storage", price: 15000 },
  { id: "premium",  name: "Premium",  specs: "8 vCPU, 16 GB RAM, 500 GB Storage", price: 20000 },
];

/* ─── Email Service Package ────────────────────────────── */

const EMAIL_FEATURES = [
  { label: "No of Email Accounts",                            price: "৳ 100 / per account" },
  { label: "Delegated Admin Account Count",                   price: "৳ 2000"              },
  { label: "e-Government Cloud Drive Service: 10GB/Account",  price: null                  },
  { label: "Domain Quota Upgradation: Unlimited (per GB)",    price: "৳ 20 / per GB"       },
];

/* ─── Drag & Drop file area ────────────────────────────── */

function FileDropZone({ file, onFile }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  return (
    React.createElement('div', {
      onDragOver: e => { e.preventDefault(); setDragging(true); },
      onDragLeave: () => setDragging(false),
      onDrop: e => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) onFile(dropped);
      },
      onClick: () => _optionalChain([inputRef, 'access', _ => _.current, 'optionalAccess', _2 => _2.click, 'call', _3 => _3()]),
      className: `border-2 border-dashed rounded-lg px-4 py-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
        dragging ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary/50 hover:bg-slate-50"
      }`}

      , React.createElement('input', {
        ref: inputRef,
        type: "file",
        accept: ".xlsx,.xls,.csv",
        className: "hidden",
        onChange: e => { if (_optionalChain([e, 'access', _4 => _4.target, 'access', _5 => _5.files, 'optionalAccess', _6 => _6[0]])) onFile(e.target.files[0]); }}
      )
      , React.createElement(Upload, { className: "w-5 h-5 text-slate-400"  } )
      , file ? (
        React.createElement('p', { className: "text-sm font-medium text-primary"  }, file.name)
      ) : (
        React.createElement('p', { className: "text-sm text-slate-500" }, "Drag & Drop file for Email list here or"
                  , " "
          , React.createElement('span', { className: "text-primary font-semibold underline"  }, "Browse")
        )
      )
    )
  );
}

/* ─── Email Config Dialog ──────────────────────────────── */

function EmailDialog({ open, onOpenChange }) {
  const { toast } = useToast();
  const [emailFile, setEmailFile] = useState(null);
  const [noOfAccounts, setNoOfAccounts] = useState("0");
  const [adminCount, setAdminCount] = useState("3");
  const [adminEmails, setAdminEmails] = useState(["", "", ""]);

  const handleAdminCountChange = (val) => {
    setAdminCount(val);
    const n = parseInt(val);
    setAdminEmails(prev => {
      const next = [...prev];
      while (next.length < n) next.push("");
      return next.slice(0, n);
    });
  };

  const totalCost = 2000;

  const handleAdd = () => {
    onOpenChange(false);
    toast({ title: "Added to Wishlist", description: "Email Service (Standard) has been added to your wishlist." });
  };

  return (
    React.createElement(Dialog, { open: open, onOpenChange: onOpenChange}
      , React.createElement(DialogContent, { className: "max-w-xl max-h-[90vh] flex flex-col overflow-hidden p-0 gap-0"      }
        , React.createElement(DialogHeader, { className: "p-6 pb-4 border-b bg-white shrink-0"    }
          , React.createElement(DialogTitle, { className: "text-xl font-bold" }, "Add Email Service to Wish List"     )
          , React.createElement('div', { className: "mt-2"}
            , React.createElement(Badge, { className: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 gap-1.5"    }
              , React.createElement('div', { className: "w-2 h-2 rounded-full bg-primary"   } ), "Standard"

            )
          )
        )

        , React.createElement('div', { className: "flex-1 overflow-y-auto p-6 space-y-5"   }
          , React.createElement('h4', { className: "font-bold text-foreground text-sm"  }, "Configuration Options" )

          /* Domain + No of Accounts */
          , React.createElement('div', { className: "grid grid-cols-2 gap-4"  }
            , React.createElement('div', { className: "space-y-1.5"}
              , React.createElement(Label, { className: "text-sm font-semibold" }, "Domain Name" )
              , React.createElement(Input, { placeholder: "", className: "bg-white"} )
            )
            , React.createElement('div', { className: "space-y-1.5"}
              , React.createElement(Label, { className: "text-sm font-semibold" }, "No of Email Accounts"   )
              , React.createElement('div', { className: "flex gap-2" }
                , React.createElement(Input, {
                  type: "number",
                  value: noOfAccounts,
                  min: 0,
                  onChange: e => setNoOfAccounts(e.target.value),
                  className: "bg-white"}
                )
                , React.createElement(Button, {
                  variant: "outline",
                  size: "sm",
                  className: "shrink-0 border-primary text-primary hover:bg-primary/5 text-xs font-semibold whitespace-nowrap h-10 px-3 gap-1.5"         }

                  , React.createElement(FileSpreadsheet, { className: "w-3.5 h-3.5" } ), "Download Email List Template"

                )
              )
            )
          )

          /* File upload */
          , React.createElement('div', { className: "space-y-1.5"}
            , React.createElement('p', { className: "text-xs text-rose-500 font-medium"  }, "* Please add Excel file of email list"       )
            , React.createElement(FileDropZone, { file: emailFile, onFile: setEmailFile} )
          )

          /* Admin Accounts selector */
          , React.createElement('div', { className: "space-y-1.5"}
            , React.createElement(Label, { className: "text-sm font-semibold" }, "No of Admin Accounts"   )
            , React.createElement(Select, { value: adminCount, onValueChange: handleAdminCountChange}
              , React.createElement(SelectTrigger, { className: "bg-white"}
                , React.createElement(SelectValue)
              )
              , React.createElement(SelectContent, {}
                , ["1","2","3","4","5"].map(n => (
                  React.createElement(SelectItem, { key: n, value: n}, n)
                ))
              )
            )
          )

          /* Dynamic admin email inputs */
          , React.createElement('div', { className: "space-y-3"}
            , adminEmails.map((email, i) => (
              React.createElement('div', { key: i, className: "space-y-1.5"}
                , React.createElement(Label, { className: "text-sm font-semibold" }, "Admin Email Account "   , i + 1)
                , React.createElement(Input, {
                  value: email,
                  onChange: e => {
                    const updated = [...adminEmails];
                    updated[i] = e.target.value;
                    setAdminEmails(updated);
                  },
                  placeholder: "",
                  className: "bg-white"}
                )
              )
            ))
          )
        )

        , React.createElement(DialogFooter, { className: "p-5 bg-white border-t shrink-0 flex-row items-center justify-between"      }
          , React.createElement('div', {}
            , React.createElement('p', { className: "text-xs text-muted-foreground font-medium mb-0.5"   }, "Total Cost:" )
            , React.createElement('p', { className: "text-xl font-bold text-primary"  }, "৳ " , totalCost.toLocaleString())
          )
          , React.createElement('div', { className: "flex gap-3" }
            , React.createElement(Button, { variant: "outline", onClick: () => onOpenChange(false)}, "Cancel")
            , React.createElement(Button, { onClick: handleAdd, className: "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"   }, "Add to Wish List"

            )
          )
        )
      )
    )
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function RequestServicesPage() {
  const { toast } = useToast();

  const [activeCat, setActiveCat] = useState("compute");
  const [activeService, setActiveService] = useState("vps");

  // VPS dialog
  const [vpsDialogOpen, setVpsDialogOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);

  // Email dialog
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const handleCatChange = (id) => {
    setActiveCat(id);
    setActiveService(_nullishCoalesce(_optionalChain([SUB_SERVICES, 'access', _7 => _7[id], 'optionalAccess', _8 => _8[0], 'optionalAccess', _9 => _9.id]), () => ( "")));
  };

  const handleVpsAdd = (pkg) => {
    setSelectedPkg(pkg);
    setVpsDialogOpen(true);
  };

  const handleVpsAddToWishlist = () => {
    setVpsDialogOpen(false);
    toast({ title: "Added to Wishlist", description: `${_optionalChain([selectedPkg, 'optionalAccess', _10 => _10.name])} VPS has been added to your wishlist.` });
  };

  const subServices = _nullishCoalesce(SUB_SERVICES[activeCat], () => ( []));
  const sectionTitle = _nullishCoalesce(_optionalChain([subServices, 'access', _11 => _11.find, 'call', _12 => _12(s => s.id === activeService), 'optionalAccess', _13 => _13.label]), () => ( ""));

  return (
    React.createElement(AppLayout, { withSidebar: true}
      , React.createElement('div', { className: "flex flex-col h-[calc(100vh-100px)]"  }

        , React.createElement('div', { className: "flex items-center gap-3 mb-6"   }
          , React.createElement('div', { className: "p-2.5 bg-violet-50 rounded-xl border border-violet-100"    }
            , React.createElement(Server, { className: "w-6 h-6 text-violet-600"  } )
          )
          , React.createElement('div', {}
            , React.createElement('h1', { className: "text-2xl font-bold text-foreground"  }, "Request Based Services"  )
            , React.createElement('p', { className: "text-sm text-muted-foreground" }, "Browse and request cloud services for your organisation"       )
          )
        )

        /* Category Tab Bar */
        , React.createElement('div', { className: "flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-4 border-b"      }
          , CATEGORIES.map(cat => {
            const isActive = activeCat === cat.id;
            const Icon = cat.icon;
            return (
              React.createElement('button', {
                key: cat.id,
                onClick: () => handleCatChange(cat.id),
                className: `flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                  isActive
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                }`}

                , React.createElement(Icon, { className: "w-4 h-4" } )
                , cat.name
              )
            );
          })
        )

        , React.createElement('div', { className: "flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden"     }

          /* Left Sidebar */
          , React.createElement('div', { className: "w-full lg:w-64 shrink-0 bg-white rounded-xl border shadow-sm p-3 flex flex-col gap-1 h-fit"           }
            , React.createElement('h3', { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2 mt-2"       }
              , _optionalChain([CATEGORIES, 'access', _14 => _14.find, 'call', _15 => _15(c => c.id === activeCat), 'optionalAccess', _16 => _16.name])
            )
            , subServices.map(svc => (
              React.createElement('button', {
                key: svc.id,
                onClick: () => setActiveService(svc.id),
                className: `text-left px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                  activeService === svc.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}

                , svc.label
              )
            ))
          )

          /* Right Content Area */
          , React.createElement('div', { className: "flex-1 overflow-y-auto pr-2 pb-8"   }
            , React.createElement('div', { className: "mb-6 border-b pb-4"  }
              , React.createElement('h2', { className: "text-2xl font-bold text-primary inline-block relative"    }
                , sectionTitle
                , React.createElement('div', { className: "absolute -bottom-4 left-0 w-1/3 h-1 bg-primary rounded-full"      } )
              )
            )

            /* ── VPS grid ── */
            , activeService === "vps" && (
              React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   }
                , VPS_PACKAGES.map(pkg => (
                  React.createElement(Card, { key: pkg.id, className: "relative overflow-hidden group border-border hover:border-primary/50 transition-all hover:shadow-md"      }
                    , React.createElement('div', { className: "absolute top-0 right-0 p-4"   }
                      , React.createElement(Server, { className: "w-16 h-16 text-slate-100 group-hover:text-primary/10 transition-colors -rotate-12 transform scale-150"       } )
                    )
                    , React.createElement(CardContent, { className: "p-6 relative z-10 flex flex-col h-full"     }
                      , React.createElement(Badge, { variant: "outline", className: "w-fit mb-4 bg-white shadow-sm font-bold tracking-widest text-[10px] uppercase border-primary/20 text-primary"         }
                        , pkg.name
                      )
                      , React.createElement('h3', { className: "text-xl font-bold text-foreground mb-4 pr-12 leading-tight"     }
                        , pkg.specs.split(", ").map((spec, i) => React.createElement('span', { key: i, className: "block"}, spec))
                      )
                      , React.createElement('div', { className: "mt-auto pt-6 flex items-end justify-between"    }
                        , React.createElement('div', {}
                          , React.createElement('p', { className: "text-xs text-muted-foreground font-medium mb-1"   }, "Monthly Fee" )
                          , React.createElement('p', { className: "text-2xl font-bold text-emerald-600"  }, "৳ " , pkg.price.toLocaleString())
                        )
                        , React.createElement(Button, { onClick: () => handleVpsAdd(pkg), className: "bg-primary hover:bg-primary/90 shadow-sm rounded-xl"   }
                          , React.createElement(Plus, { className: "w-4 h-4 mr-2"  } ), " Add to Wishlist"
                        )
                      )
                    )
                  )
                ))
              )
            )

            /* ── Email Service ── */
            , activeService === "email" && (
              React.createElement('div', { className: "max-w-sm"}
                , React.createElement(Card, { className: "border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all"    }
                  , React.createElement(CardContent, { className: "p-6 space-y-4" }
                    , React.createElement('h3', { className: "text-lg font-bold text-center text-foreground"   }, "Standard")
                    , React.createElement('div', { className: "space-y-3 divide-y divide-slate-100"  }
                      , EMAIL_FEATURES.map((f, i) => (
                        React.createElement('div', { key: i, className: `flex items-start justify-between gap-4 ${i > 0 ? "pt-3" : ""}`}
                          , React.createElement('span', { className: "text-sm text-slate-700 leading-snug"  }, f.label)
                          , f.price && (
                            React.createElement('span', { className: "text-sm font-bold text-primary whitespace-nowrap shrink-0"    }, f.price)
                          )
                        )
                      ))
                    )
                    , React.createElement(Button, {
                      onClick: () => setEmailDialogOpen(true),
                      className: "w-full bg-primary hover:bg-primary/90 mt-2 font-semibold"    }
, "Add to Wishlist"

                    )
                  )
                )
              )
            )

            /* ── Placeholder for other services ── */
            , activeService !== "vps" && activeService !== "email" && (
              React.createElement('div', { className: "flex flex-col items-center justify-center h-48 text-muted-foreground"     }
                , React.createElement(Cloud, { className: "w-12 h-12 mb-3 text-slate-200"   } )
                , React.createElement('p', { className: "font-medium"}, "No packages configured yet."   )
              )
            )
          )
        )
      )

      /* ── VPS Configuration Dialog ── */
      , React.createElement(Dialog, { open: vpsDialogOpen, onOpenChange: setVpsDialogOpen}
        , React.createElement(DialogContent, { className: "max-w-3xl max-h-[90vh] flex flex-col overflow-hidden bg-slate-50/50 p-0"      }
          , React.createElement(DialogHeader, { className: "p-6 pb-4 bg-white border-b shrink-0"    }
            , React.createElement(DialogTitle, { className: "text-xl"}, "Add Virtual Private Server (VPS) Service to Wish List"        )
            , selectedPkg && (
              React.createElement('div', { className: "flex flex-wrap items-center gap-3 mt-4"    }
                , React.createElement(Badge, { className: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10"   }
                  , React.createElement('div', { className: "w-2 h-2 rounded-full bg-primary mr-2"    } ), selectedPkg.name
                )
                , React.createElement(Badge, { variant: "secondary", className: "bg-slate-100"}, selectedPkg.specs)
                , React.createElement(Badge, { variant: "outline", className: "border-emerald-200 bg-emerald-50 text-emerald-700"  }, "৳ "
                   , selectedPkg.price.toLocaleString(), " per month"
                )
              )
            )
          )

          , React.createElement('div', { className: "flex-1 overflow-y-auto p-6 space-y-6"   }
            , React.createElement('div', { className: "bg-white p-5 rounded-xl border shadow-sm relative"     }
              , React.createElement(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-8 w-8"       }
                , React.createElement(Trash2, { className: "w-4 h-4" } )
              )
              , React.createElement('h4', { className: "font-bold text-foreground mb-4"  }, "Configuration Options" )
              , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"    }
                , React.createElement('div', { className: "space-y-1.5"}
                  , React.createElement(Label, null, "OS")
                  , React.createElement(Select, { defaultValue: "centos"}, React.createElement(SelectTrigger, null, React.createElement(SelectValue)), React.createElement(SelectContent, null, React.createElement(SelectItem, { value: "centos"}, "CentOS"), React.createElement(SelectItem, { value: "ubuntu"}, "Ubuntu")))
                )
                , React.createElement('div', { className: "space-y-1.5"}
                  , React.createElement(Label, null, "OS Version" )
                  , React.createElement(Select, { defaultValue: "7"}, React.createElement(SelectTrigger, null, React.createElement(SelectValue)), React.createElement(SelectContent, null, React.createElement(SelectItem, { value: "7"}, "7.x"), React.createElement(SelectItem, { value: "8"}, "8.x")))
                )
                , React.createElement('div', { className: "space-y-1.5"}
                  , React.createElement(Label, null, "Security Zone" )
                  , React.createElement(Select, { defaultValue: "db"}, React.createElement(SelectTrigger, null, React.createElement(SelectValue)), React.createElement(SelectContent, null, React.createElement(SelectItem, { value: "db"}, "Database"), React.createElement(SelectItem, { value: "app"}, "Application")))
                )
              )
              , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-4 gap-4"   }
                , React.createElement('div', { className: "space-y-1.5"}
                  , React.createElement(Label, null, "Public IP Needed"  )
                  , React.createElement(Select, { defaultValue: "no"}, React.createElement(SelectTrigger, null, React.createElement(SelectValue)), React.createElement(SelectContent, null, React.createElement(SelectItem, { value: "yes"}, "Yes"), React.createElement(SelectItem, { value: "no"}, "No")))
                )
                , React.createElement('div', { className: "space-y-1.5"}
                  , React.createElement(Label, null, "Partition to Maximize"  )
                  , React.createElement(Input, { placeholder: "/var"} )
                )
                , React.createElement('div', { className: "space-y-1.5"}
                  , React.createElement(Label, null, "VPN Account Name"  )
                  , React.createElement(Input, { placeholder: "vpn_user"} )
                )
                , React.createElement('div', { className: "space-y-1.5"}
                  , React.createElement(Label, null, "Port")
                  , React.createElement(Input, { defaultValue: "22, 80, 443"  } )
                )
              )
            )

            , React.createElement('div', { className: "space-y-3"}
              , [
                { title: "IP Address Service" },
                { title: "Block Storage Service" },
                { title: "WAF Service" },
              ].map((service, idx) => (
                React.createElement(Collapsible, { key: idx, className: "bg-white rounded-xl border shadow-sm"   }
                  , React.createElement(CollapsibleTrigger, { className: "w-full px-5 py-4 flex items-center justify-between font-medium text-slate-700 hover:bg-slate-50 transition-colors rounded-xl"          }
                    , service.title
                    , React.createElement(ChevronDown, { className: "w-4 h-4 text-muted-foreground"  } )
                  )
                  , React.createElement(CollapsibleContent, { className: "px-5 pb-5 pt-2 border-t"   }
                    , React.createElement('div', { className: "grid grid-cols-2 gap-4"  }
                      , React.createElement('div', { className: "space-y-1.5"}
                        , React.createElement(Label, null, "Package")
                        , React.createElement(Select, null, React.createElement(SelectTrigger, null, React.createElement(SelectValue, { placeholder: "Select..."} )), React.createElement(SelectContent, null, React.createElement(SelectItem, { value: "1"}, "Standard")))
                      )
                      , React.createElement('div', { className: "space-y-1.5"}
                        , React.createElement(Label, null, "Count")
                        , React.createElement(Input, { type: "number", defaultValue: "0"} )
                      )
                    )
                  )
                )
              ))

              , React.createElement(Collapsible, { className: "bg-white rounded-xl border shadow-sm"   }
                , React.createElement(CollapsibleTrigger, { className: "w-full px-5 py-4 flex items-center justify-between font-medium text-slate-700 hover:bg-slate-50 transition-colors rounded-xl"          }, "Backup Service"

                  , React.createElement(ChevronDown, { className: "w-4 h-4 text-muted-foreground"  } )
                )
                , React.createElement(CollapsibleContent, { className: "px-5 pb-5 pt-2 border-t"   }
                  , React.createElement('div', { className: "grid grid-cols-2 md:grid-cols-3 gap-4"   }
                    , React.createElement('div', { className: "space-y-1.5"}, React.createElement(Label, null, "VM/Hostname"), React.createElement(Input))
                    , React.createElement('div', { className: "space-y-1.5"}, React.createElement(Label, null, "Host IP" ), React.createElement(Input))
                    , React.createElement('div', { className: "space-y-1.5"}, React.createElement(Label, null, "Backup Type" ), React.createElement(Select, null, React.createElement(SelectTrigger, null, React.createElement(SelectValue))))
                    , React.createElement('div', { className: "space-y-1.5"}, React.createElement(Label, null, "Backup Frequency" ), React.createElement(Select, null, React.createElement(SelectTrigger, null, React.createElement(SelectValue))))
                    , React.createElement('div', { className: "space-y-1.5"}, React.createElement(Label, null, "Backup Directory" ), React.createElement(Input))
                    , React.createElement('div', { className: "space-y-1.5"}, React.createElement(Label, null, "Database Option" ), React.createElement(Select, null, React.createElement(SelectTrigger, null, React.createElement(SelectValue))))
                    , React.createElement('div', { className: "space-y-1.5"}, React.createElement(Label, null, "Retention Period" ), React.createElement(Select, null, React.createElement(SelectTrigger, null, React.createElement(SelectValue))))
                  )
                )
              )
            )

            , React.createElement(Button, { variant: "outline", className: "w-full border-dashed border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary py-6 rounded-xl font-bold bg-white"          }
              , React.createElement(Plus, { className: "w-5 h-5 mr-2"  } ), " Add More Configurations"
            )
          )

          , React.createElement(DialogFooter, { className: "p-6 bg-white border-t shrink-0 flex-row items-center justify-between"      }
            , React.createElement('div', { className: "text-xl font-bold text-primary"  }, "Total Cost: ৳ "
                 , _nullishCoalesce(_optionalChain([selectedPkg, 'optionalAccess', _17 => _17.price, 'access', _18 => _18.toLocaleString, 'call', _19 => _19()]), () => ( 0))
            )
            , React.createElement('div', { className: "flex gap-3" }
              , React.createElement(Button, { variant: "outline", onClick: () => setVpsDialogOpen(false)}, "Cancel")
              , React.createElement(Button, { onClick: handleVpsAddToWishlist, className: "bg-emerald-600 hover:bg-emerald-700" }, "Add to Wish List"   )
            )
          )
        )
      )

      /* ── Email Configuration Dialog ── */
      , React.createElement(EmailDialog, { open: emailDialogOpen, onOpenChange: setEmailDialogOpen} )
    )
  );
}
