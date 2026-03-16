 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "wouter";
import {
  ChevronRight, Package, FileText, Settings, History,
  Activity, AlertTriangle, Plus, Upload, ArrowRightLeft, Hash,
  ChevronDown, Zap, Calendar, Clock, CheckCircle2, Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

/* ─── File Drop Zone ──────────────────────────────────── */

function EmailListDropZone({ file, onFile }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  return (
    React.createElement('div', {
      onDragOver: e => { e.preventDefault(); setDragging(true); },
      onDragLeave: () => setDragging(false),
      onDrop: e => {
        e.preventDefault(); setDragging(false);
        const f = e.dataTransfer.files[0]; if (f) onFile(f);
      },
      onClick: () => _optionalChain([inputRef, 'access', _2 => _2.current, 'optionalAccess', _3 => _3.click, 'call', _4 => _4()]),
      className: `border-2 border-dashed rounded-lg py-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${
        dragging ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary/50 hover:bg-slate-50"
      }`}

      , React.createElement('input', { ref: inputRef, type: "file", accept: ".xlsx,.xls,.csv", className: "hidden",
        onChange: e => { if (_optionalChain([e, 'access', _5 => _5.target, 'access', _6 => _6.files, 'optionalAccess', _7 => _7[0]])) onFile(e.target.files[0]); }} )
      , React.createElement(Upload, { className: "w-4 h-4 text-slate-400"  } )
      , file
        ? React.createElement('p', { className: "text-sm font-medium text-primary"  }, file.name)
        : React.createElement('p', { className: "text-sm text-slate-500" }, "Drag & Drop file for Email list here or"
                    , " "
            , React.createElement('span', { className: "text-primary font-semibold underline"  }, "Browse")
          )
      
    )
  );
}

/* ─── Attribute History Dialog ─────────────────────────── */

const ATTR_HISTORY = [
  {
    orderNo: "20260302-NDC-00075-455",
    attributes: [
      { name: "Domain Quota Upgradation: Unlimited (per GB)", oldValue: 0,  newValue: 25 },
      { name: "No of Email Accounts",                         oldValue: 20, newValue: 30 },
      { name: "Domain Quota Upgradation: Unlimited (per GB)", oldValue: 25, newValue: 1  },
      { name: "Delegated Admin Account Count",                oldValue: 0,  newValue: 0  },
    ],
  },
  {
    orderNo: "20260110-NDC-00075-312",
    attributes: [
      { name: "No of Email Accounts",          oldValue: 10, newValue: 20 },
      { name: "Delegated Admin Account Count", oldValue: 0,  newValue: 2  },
    ],
  },
];

function AttributeHistoryDialog({ open, onOpenChange }) {
  return (
    React.createElement(Dialog, { open: open, onOpenChange: onOpenChange}
      , React.createElement(DialogContent, { className: "max-w-3xl p-0 gap-0 overflow-hidden rounded-2xl"    }
        /* Header */
        , React.createElement(DialogHeader, { className: "px-8 pt-6 pb-5 border-b border-border/50 bg-white"     }
          , React.createElement('div', { className: "flex items-center gap-3"  }
            , React.createElement('div', { className: "p-2.5 bg-primary/10 rounded-xl border border-primary/10"    }
              , React.createElement(ArrowRightLeft, { className: "w-5 h-5 text-primary"  } )
            )
            , React.createElement('div', {}
              , React.createElement(DialogTitle, { className: "text-lg font-bold text-foreground"  }, "Attribute Change History"  )
              , React.createElement('p', { className: "text-sm text-muted-foreground mt-0.5"  }, "Track all attribute modifications across orders"     )
            )
          )
        )

        /* Table */
        , React.createElement('div', { className: "bg-slate-50/60 max-h-[65vh] overflow-y-auto px-8 py-6"    }
          , React.createElement('div', { className: "bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden"     }
            , React.createElement('div', { className: "overflow-x-auto"}
              , React.createElement('table', { className: "w-full text-sm border-collapse"  }
                , React.createElement('thead', {}
                  , React.createElement('tr', { className: "bg-slate-50/80 border-b border-border/60"  }
                    , React.createElement('th', { className: "text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-52"        }
                      , React.createElement('span', { className: "flex items-center gap-1.5"  }
                        , React.createElement(Hash, { className: "w-3.5 h-3.5" } ), " Order No"
                      )
                    )
                    , React.createElement('th', { className: "text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider"       }
                      , React.createElement('span', { className: "flex items-center gap-1.5"  }
                        , React.createElement(Settings, { className: "w-3.5 h-3.5" } ), " Attribute Name"
                      )
                    )
                    , React.createElement('th', { className: "text-center px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-28"        }, "Old Value" )
                    , React.createElement('th', { className: "text-center px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-28"        }, "New Value" )
                  )
                )
                , React.createElement('tbody', { className: "divide-y divide-border/40" }
                  , ATTR_HISTORY.map((group) =>
                    group.attributes.map((attr, attrIdx) => (
                      React.createElement('tr', {
                        key: `${group.orderNo}-${attrIdx}`,
                        className: `transition-colors hover:bg-slate-50/60 ${attrIdx % 2 === 0 ? "" : "bg-slate-50/20"}`}

                        /* Order No — only shown on first row of group */
                        , attrIdx === 0 ? (
                          React.createElement('td', {
                            rowSpan: group.attributes.length,
                            className: "px-5 py-4 align-middle border-r border-border/40"    }

                            , React.createElement('span', { className: "inline-flex items-center px-2.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-bold leading-snug break-all"             }
                              , group.orderNo
                            )
                          )
                        ) : null

                        /* Attribute Name */
                        , React.createElement('td', { className: "px-5 py-4 font-semibold text-foreground"   }, attr.name)

                        /* Old Value */
                        , React.createElement('td', { className: "px-5 py-4 text-center"  }
                          , React.createElement('span', { className: "inline-block min-w-[2rem] px-2.5 py-1 rounded-md bg-rose-50 border border-rose-100 text-rose-700 font-mono font-bold text-sm"           }
                            , attr.oldValue
                          )
                        )

                        /* New Value */
                        , React.createElement('td', { className: "px-5 py-4 text-center"  }
                          , React.createElement('span', { className: "inline-block min-w-[2rem] px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono font-bold text-sm"           }
                            , attr.newValue
                          )
                        )
                      )
                    ))
                  )
                )
              )
            )
          )
        )

        /* Footer */
        , React.createElement('div', { className: "px-8 py-4 border-t border-border/50 bg-white flex justify-end"      }
          , React.createElement(Button, {
            onClick: () => onOpenChange(false),
            className: "bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-9 rounded-lg"      }
, "Close"

          )
        )
      )
    )
  );
}

/* ─── Change Package Dialog ────────────────────────────── */

function ChangePackageDialog({ open, onOpenChange }) {
  const { toast } = useToast();
  const [emailAccounts, setEmailAccounts] = useState("0");
  const [emailAction, setEmailAction] = useState("add");
  const [domainQuota, setDomainQuota] = useState("25");
  const [emailFile, setEmailFile] = useState(null);
  const [adminEmails, setAdminEmails] = useState(["admin@a.gov.bd", "support@a.gov.bd"]);

  const quotaNum = parseInt(domainQuota) || 0;
  const quotaValid = quotaNum >= 20 && quotaNum <= 500 && quotaNum % 5 === 0;

  const handleAddAdmin = () => setAdminEmails(prev => [...prev, ""]);
  const handleDeleteAdmin = (i) =>
    setAdminEmails(prev => prev.filter((_, idx) => idx !== i));
  const handleAdminChange = (i, val) =>
    setAdminEmails(prev => { const n = [...prev]; n[i] = val; return n; });

  const handleConfirm = () => {
    onOpenChange(false);
    toast({ title: "Package change requested", description: "Your change package request has been submitted." });
  };

  return (
    React.createElement(Dialog, { open: open, onOpenChange: onOpenChange}
      , React.createElement(DialogContent, { className: "max-w-lg max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden rounded-xl"       }

        /* Header */
        , React.createElement(DialogHeader, { className: "bg-primary px-6 py-4 shrink-0"   }
          , React.createElement(DialogTitle, { className: "text-white text-lg font-bold"  }, "Change Package" )
        )

        /* Scrollable body */
        , React.createElement('div', { className: "flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-white"     }

          /* No of Email Accounts */
          , React.createElement('div', { className: "space-y-2"}
            , React.createElement(Label, { className: "text-sm font-semibold text-slate-700"  }, "No of Email Accounts"   )
            , React.createElement('div', { className: "flex items-center gap-3"  }
              , React.createElement(Input, {
                type: "number",
                min: 0,
                value: emailAccounts,
                onChange: e => setEmailAccounts(e.target.value),
                className: "w-40 bg-white" }
              )
              , React.createElement('div', { className: "flex items-center gap-4 text-sm font-medium"    }
                , React.createElement('label', { className: "flex items-center gap-1.5 cursor-pointer"   }
                  , React.createElement('input', {
                    type: "radio",
                    name: "emailAction",
                    value: "add",
                    checked: emailAction === "add",
                    onChange: () => setEmailAction("add"),
                    className: "accent-primary"}
                  ), "Add"

                )
                , React.createElement('label', { className: "flex items-center gap-1.5 cursor-pointer"   }
                  , React.createElement('input', {
                    type: "radio",
                    name: "emailAction",
                    value: "remove",
                    checked: emailAction === "remove",
                    onChange: () => setEmailAction("remove"),
                    className: "accent-primary"}
                  ), "Remove"

                )
              )
            )
          )

          /* Domain Quota */
          , React.createElement('div', { className: "space-y-2"}
            , React.createElement(Label, { className: "text-sm font-semibold text-slate-700"  }, "Domain Quota (GB)"  )
            , React.createElement(Input, {
              type: "number",
              min: 20,
              max: 500,
              step: 5,
              value: domainQuota,
              onChange: e => setDomainQuota(e.target.value),
              className: `w-40 bg-white ${!quotaValid && domainQuota !== "" ? "border-amber-400 focus-visible:ring-amber-300" : ""}`}
            )
            , React.createElement('div', { className: "space-y-0.5"}
              , React.createElement('p', { className: "text-xs text-amber-600 font-medium"  }, "** Domain Quota in range from 20GB to 500GB"        )
              , React.createElement('p', { className: "text-xs text-amber-600 font-medium"  }, "** Domain Quota amount should be multiple of 5."        )
            )
          )

          /* Email list file upload */
          , React.createElement('div', { className: "space-y-2"}
            , React.createElement('p', { className: "text-xs text-rose-500 font-medium"  }, "* Please submit Excel email list to add or remove emails"

            )
            , React.createElement(EmailListDropZone, { file: emailFile, onFile: setEmailFile} )
          )

          /* Admin Email Accounts */
          , React.createElement('div', { className: "space-y-3"}
            , adminEmails.map((email, i) => (
              React.createElement('div', { key: i, className: "space-y-1.5"}
                , React.createElement(Label, { className: "text-sm font-semibold text-slate-700"  }, "Admin Email Account "
                     , i + 1
                )
                , React.createElement('div', { className: "flex gap-2" }
                  , React.createElement(Input, {
                    value: email,
                    onChange: e => handleAdminChange(i, e.target.value),
                    placeholder: "admin@example.gov.bd",
                    className: "bg-white flex-1" }
                  )
                  , React.createElement(Button, {
                    size: "sm",
                    onClick: () => handleDeleteAdmin(i),
                    className: "bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 shrink-0"     }
, "Delete"

                  )
                )
              )
            ))

            , React.createElement(Button, {
              variant: "outline",
              size: "sm",
              onClick: handleAddAdmin,
              className: "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 font-semibold gap-1.5"     }

              , React.createElement(Plus, { className: "w-3.5 h-3.5" } ), " Add Admin Email"
            )
          )
        )

        /* Footer */
        , React.createElement(DialogFooter, { className: "px-6 py-4 bg-white border-t shrink-0 flex justify-end gap-3"       }
          , React.createElement(Button, { variant: "outline", onClick: () => onOpenChange(false)}, "Cancel")
          , React.createElement(Button, {
            onClick: handleConfirm,
            className: "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5"    }
, "Confirm Change"

          )
        )
      )
    )
  );
}

/* ─── VPS Attributes Tree ───────────────────────────────── */

const VPS_ATTR_TREE = [
  { key: "OS", value: "Ubuntu", children: [{ key: "OS Version", value: "22.04" }] },
  { key: "Security Zone", value: "NMS" },
  { key: "Port", value: "22, 80, 443" },
  { key: "Public IP Needed?", value: "Yes" },
  { key: "Partition to maximize", value: "" },
  { key: "VPN Account Name", value: "" },
];

function VpsAttributeTree() {
  const [expanded, setExpanded] = useState(new Set(["OS"]));
  const toggle = (key) =>
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    React.createElement('div', { className: "space-y-0.5"}
      , VPS_ATTR_TREE.map((attr) => (
        React.createElement('div', { key: attr.key}
          , React.createElement('div', {
            className: `flex items-center gap-2 py-2.5 px-2 rounded-lg transition-colors ${attr.children ? "cursor-pointer hover:bg-slate-50" : ""}`,
            onClick: () => attr.children && toggle(attr.key)}

            , attr.children ? (
              React.createElement(ChevronDown, { className: `w-4 h-4 text-primary shrink-0 transition-transform ${expanded.has(attr.key) ? "" : "-rotate-90"}`} )
            ) : (
              React.createElement('div', { className: "w-4 shrink-0" } )
            )
            , React.createElement('span', { className: "font-semibold text-slate-700 text-sm w-44 shrink-0"    }, attr.key)
            , attr.value && React.createElement('span', { className: "text-slate-600 text-sm" }, attr.value)
          )
          , attr.children && expanded.has(attr.key) && attr.children.map((child) => (
            React.createElement('div', { key: child.key, className: "flex items-center gap-2 py-2 px-2 pl-9 rounded-lg hover:bg-slate-50/50"       }
              , React.createElement('div', { className: "w-4 shrink-0" } )
              , React.createElement('span', { className: "font-medium text-slate-600 text-sm w-44 shrink-0"    }, child.key)
              , React.createElement('span', { className: "text-slate-600 text-sm" }, child.value)
            )
          ))
        )
      ))
    )
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function ResourceDetailPage() {
  const [changePackageOpen, setChangePackageOpen] = useState(false);
  const [attrHistoryOpen, setAttrHistoryOpen] = useState(false);

  // VPS Action section state
  const [privateIP, setPrivateIP] = useState("");
  const [vmName, setVmName] = useState("");
  const [publicIP, setPublicIP] = useState("");
  const [actDate, setActDate] = useState(new Date().toISOString().split("T")[0]);
  const [actTime, setActTime] = useState("00:00");
  const [vpsActivated, setVpsActivated] = useState(false);
  const { toast } = useToast();

  const handleVpsActivate = () => {
    setVpsActivated(true);
    toast({ title: "VPS Activated", description: `Resource activated on ${actDate} at ${actTime}.` });
  };

  return (
    React.createElement(AppLayout, { withSidebar: true}
      , React.createElement('div', { className: "flex flex-col gap-6 max-w-[1400px] mx-auto"    }

        /* Breadcrumb */
        , React.createElement('div', { className: "flex items-center text-sm font-medium text-muted-foreground gap-2"     }
          , React.createElement(Link, { href: "/orders", className: "hover:text-primary transition-colors" }, "Order List" )
          , React.createElement(ChevronRight, { className: "w-4 h-4" } )
          , React.createElement(Link, { href: "/orders/20260225-NDC-00075-438", className: "hover:text-primary transition-colors" }, "Order Details" )
          , React.createElement(ChevronRight, { className: "w-4 h-4" } )
          , React.createElement('span', { className: "text-foreground"}, "Resource Details" )
        )

        , React.createElement('h1', { className: "text-2xl md:text-3xl font-bold text-primary mb-2"    }, "Virtual Private Server (VPS) Service (Advanced)"     )

        , React.createElement(Tabs, { defaultValue: "info", className: "w-full"}
          , React.createElement(TabsList, { className: "bg-white border shadow-sm p-1 rounded-xl mb-6"     }
            , React.createElement(TabsTrigger, { value: "info", className: "rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-white font-medium"    }, "Resource Information" )
            , React.createElement(TabsTrigger, { value: "attached", className: "rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-white font-medium"    }, "Attached Additional Resources"  )
          )

          , React.createElement(TabsContent, { value: "info", className: "space-y-6 m-0 animate-in fade-in-50"   }
            /* Info Cards Row */
            , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"    }

              , React.createElement(Card, { className: "bg-[#f0f7ff] border-blue-100 shadow-sm"  }
                , React.createElement(CardContent, { className: "p-5"}
                  , React.createElement('h3', { className: "text-sm font-bold text-blue-900 mb-4 flex items-center gap-2"      }
                    , React.createElement(Package, { className: "w-4 h-4" } ), " Package Details"
                  )
                  , React.createElement('div', { className: "space-y-2 text-sm" }
                    , React.createElement('div', { className: "flex justify-between" }, React.createElement('span', { className: "text-blue-700"}, "Package:"), React.createElement('span', { className: "font-bold text-blue-950" }, "Advanced"))
                    , React.createElement('div', { className: "flex justify-between" }, React.createElement('span', { className: "text-blue-700"}, "Category:"), React.createElement('span', { className: "font-medium"}, "Virtual Private Server (VPS) Service"    ))
                    , React.createElement('div', { className: "flex justify-between" }, React.createElement('span', { className: "text-blue-700"}, "Feature:"), React.createElement('span', { className: "font-medium text-xs" }, "4 vCPU, 12 GB RAM, 300 GB Storage"       ))
                    , React.createElement('div', { className: "flex justify-between" }, React.createElement('span', { className: "text-blue-700"}, "Platform Type:" ), React.createElement('span', { className: "font-bold text-blue-950" }, "NUTANIX"))
                    , React.createElement('div', { className: "flex justify-between" }, React.createElement('span', { className: "text-blue-700"}, "Monthly Fee:" ), React.createElement('span', { className: "font-bold text-blue-950" }, "15000"))
                    , React.createElement('div', { className: "flex justify-between items-center pt-2 mt-2 border-t border-blue-200/50"      }
                      , React.createElement('span', { className: "text-blue-700 font-medium" }, "Status:")
                      , React.createElement(Badge, { className: "bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-50 shadow-sm text-xs font-bold"       }, "ACCEPTED")
                    )
                  )
                )
              )

              , React.createElement(Card, { className: "bg-[#f0fdf4] border-emerald-100 shadow-sm"  }
                , React.createElement(CardContent, { className: "p-5"}
                  , React.createElement('h3', { className: "text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2"      }
                    , React.createElement(FileText, { className: "w-4 h-4" } ), " Contract Details"
                  )
                  , React.createElement('div', { className: "space-y-3 text-sm" }
                    , React.createElement('div', {}
                      , React.createElement('span', { className: "text-emerald-700 block mb-1"  }, "Order No:" )
                      , React.createElement('span', { className: "font-mono font-bold text-emerald-950 text-xs"   }, "20260225-NDC-00075-438")
                    )
                    , React.createElement('div', {}
                      , React.createElement('span', { className: "text-emerald-700 block mb-1"  }, "Contract:")
                      , React.createElement('span', { className: "font-mono font-bold text-emerald-950"  }, "NDC-00075")
                    )
                  )
                )
              )

              , React.createElement(Card, { className: "bg-[#ecfeff] border-cyan-100 shadow-sm"  }
                , React.createElement(CardContent, { className: "p-5"}
                  , React.createElement('h3', { className: "text-sm font-bold text-cyan-900 mb-4 flex items-center gap-2"      }
                    , React.createElement(Settings, { className: "w-4 h-4" } ), " Service Details"
                  )
                  , React.createElement('div', { className: "space-y-2 text-sm" }
                    , React.createElement('div', { className: "flex justify-between" }, React.createElement('span', { className: "text-cyan-700"}, "Name:"), React.createElement('span', { className: "font-bold text-cyan-950" }, "Cloud"))
                    , React.createElement('div', { className: "flex justify-between" }, React.createElement('span', { className: "text-cyan-700"}, "Service ID:" ), React.createElement('span', { className: "font-mono font-medium" }, "SID-00075"))
                    , React.createElement('div', { className: "flex justify-between" }, React.createElement('span', { className: "text-cyan-700"}, "URL:"), React.createElement('a', { href: "https://rajuk.gov.bd", className: "text-primary hover:underline text-xs"  }, "https://rajuk.gov.bd"))
                    , React.createElement('div', { className: "flex justify-between" }, React.createElement('span', { className: "text-cyan-700"}, "Start Date:" ), React.createElement('span', { className: "font-medium"}, "2023-05-18"))
                    , React.createElement('div', { className: "flex justify-between" }, React.createElement('span', { className: "text-cyan-700"}, "End Date:" ), React.createElement('span', { className: "font-medium"}, "2040-12-31"))
                  )
                )
              )

              , React.createElement(Card, { className: "bg-[#fffbeb] border-amber-100 shadow-sm"  }
                , React.createElement(CardContent, { className: "p-5"}
                  , React.createElement('h3', { className: "text-sm font-bold text-amber-900 mb-4 flex items-center gap-2"      }
                    , React.createElement(Activity, { className: "w-4 h-4" } ), " Service Status"
                  )
                  , React.createElement('div', { className: "space-y-4"}
                    , React.createElement(Badge, { className: "bg-amber-50 text-amber-700 border border-amber-300 w-full justify-center py-1.5 text-sm font-bold"        }, "ACCEPTED")
                    , React.createElement('div', { className: "space-y-2 text-sm" }
                      , React.createElement('div', {}
                        , React.createElement('span', { className: "text-amber-700 block mb-0.5 text-xs"   }, "Request Date:" )
                        , React.createElement('span', { className: "font-medium text-amber-950" }, "Feb 25, 2026 03:28 PM"    )
                      )
                      , React.createElement('div', {}
                        , React.createElement('span', { className: "text-amber-700 block mb-0.5 text-xs"   }, "Activation Date:" )
                        , React.createElement('span', { className: "font-medium text-slate-400" }, "N/A")
                      )
                    )
                  )
                )
              )

            )

            /* Attributes + Action side-by-side */
            , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-5 gap-4 items-start"    }

              /* ── Attributes (left, 2/5) ── */
              , React.createElement(Card, { className: "border-border shadow-sm lg:col-span-2"  }
                , React.createElement('div', { className: "p-5 border-b bg-slate-50/50 flex justify-between items-center"     }
                  , React.createElement('h3', { className: "font-bold text-lg text-foreground"  }, "Attributes")
                  , React.createElement(Button, {
                    onClick: () => setAttrHistoryOpen(true),
                    variant: "outline", size: "sm",
                    className: "text-primary border-primary/30 hover:bg-primary/5 bg-white"   }

                    , React.createElement(History, { className: "w-4 h-4 mr-2"  } ), " History"
                  )
                )
                , React.createElement(CardContent, { className: "p-5"}
                  , React.createElement(VpsAttributeTree)
                )
              )

              /* ── Action (right, 3/5) ── */
              , React.createElement(Card, { className: "border-border shadow-sm lg:col-span-3 overflow-hidden"   }
                /* Header */
                , React.createElement('div', { className: "px-5 py-4 bg-primary flex items-center gap-2.5"     }
                  , React.createElement('div', { className: "p-1.5 bg-white/20 rounded-lg"  }
                    , React.createElement(Server, { className: "w-4 h-4 text-white"  } )
                  )
                  , React.createElement('h3', { className: "font-bold text-white text-base"  }, "Action")
                )

                , React.createElement(CardContent, { className: "p-6 space-y-4" }
                  /* Private IP */
                  , React.createElement('div', { className: "space-y-1.5"}
                    , React.createElement(Label, { className: "text-sm font-semibold text-slate-700"  }, "Private IP" )
                    , React.createElement(Input, {
                      placeholder: "e.g. 192.168.10.5" ,
                      value: privateIP,
                      onChange: e => setPrivateIP(e.target.value),
                      disabled: vpsActivated,
                      className: "bg-white border-slate-200 focus-visible:ring-primary/30 disabled:opacity-60"   }
                    )
                  )

                  /* VM Name */
                  , React.createElement('div', { className: "space-y-1.5"}
                    , React.createElement(Label, { className: "text-sm font-semibold text-slate-700"  }, "VM Name" )
                    , React.createElement(Input, {
                      placeholder: "e.g. vm-rajuk-prod-01" ,
                      value: vmName,
                      onChange: e => setVmName(e.target.value),
                      disabled: vpsActivated,
                      className: "bg-white border-slate-200 focus-visible:ring-primary/30 disabled:opacity-60"   }
                    )
                  )

                  /* Public IP */
                  , React.createElement('div', { className: "space-y-1.5"}
                    , React.createElement(Label, { className: "text-sm font-semibold text-slate-700"  }, "Public IP" )
                    , React.createElement(Input, {
                      placeholder: "e.g. 103.28.121.44" ,
                      value: publicIP,
                      onChange: e => setPublicIP(e.target.value),
                      disabled: vpsActivated,
                      className: "bg-white border-slate-200 focus-visible:ring-primary/30 disabled:opacity-60"   }
                    )
                  )

                  /* Activation Date */
                  , React.createElement('div', { className: "space-y-2 pt-1" }
                    , React.createElement(Label, { className: "text-sm font-semibold text-slate-700 flex items-center gap-2"     }
                      , React.createElement(Calendar, { className: "w-4 h-4 text-primary"  } ), " Activation Date"
                    )
                    , React.createElement('div', { className: "flex items-center gap-2"  }
                      , React.createElement(Input, {
                        type: "date",
                        value: actDate,
                        onChange: e => setActDate(e.target.value),
                        disabled: vpsActivated,
                        className: "bg-white border-slate-200 focus-visible:ring-primary/30 disabled:opacity-60 w-44"    }
                      )
                      , React.createElement('div', { className: "relative"}
                        , React.createElement(Clock, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"       } )
                        , React.createElement(Input, {
                          type: "time",
                          value: actTime,
                          onChange: e => setActTime(e.target.value),
                          disabled: vpsActivated,
                          className: "bg-white border-slate-200 focus-visible:ring-primary/30 pl-8 disabled:opacity-60 w-36"     }
                        )
                      )
                    )
                  )

                  /* Activate / Activated button */
                  , React.createElement('div', { className: "pt-2"}
                    , vpsActivated ? (
                      React.createElement('div', { className: "flex items-center justify-center gap-2.5 w-full py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg"         }
                        , React.createElement(CheckCircle2, { className: "w-5 h-5 text-emerald-600"  } )
                        , React.createElement('span', { className: "font-bold text-emerald-700 text-sm"  }, "Resource Activated Successfully"  )
                      )
                    ) : (
                      React.createElement(Button, {
                        onClick: handleVpsActivate,
                        disabled: !actDate,
                        className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 rounded-lg shadow-sm gap-2"        }

                        , React.createElement(Zap, { className: "w-4 h-4" } ), " Activate"
                      )
                    )
                  )
                )
              )

            )
          )

          , React.createElement(TabsContent, { value: "attached", className: "space-y-8 m-0 animate-in fade-in-50"   }
            , React.createElement('div', {}
              , React.createElement('h2', { className: "text-xl font-bold text-foreground mb-4"   }, "Additional Resources" )

              , React.createElement(Card, { className: "mb-8 border-border shadow-sm overflow-hidden"   }
                , React.createElement('div', { className: "p-4 border-b bg-slate-50/50"  }
                  , React.createElement('h3', { className: "font-bold text-foreground" }, "Orphan Resource Packages"  )
                )
                , React.createElement(CardContent, { className: "p-0"}
                  , React.createElement('div', { className: "overflow-x-auto"}
                    , React.createElement('table', { className: "w-full text-sm text-left"  }
                      , React.createElement('thead', { className: "text-xs text-muted-foreground bg-slate-50 uppercase border-b"    }
                        , React.createElement('tr', {}
                          , React.createElement('th', { className: "px-4 py-3" }, "ID")
                          , React.createElement('th', { className: "px-4 py-3" }, "Category")
                          , React.createElement('th', { className: "px-4 py-3" }, "Name")
                          , React.createElement('th', { className: "px-4 py-3" }, "Feature")
                          , React.createElement('th', { className: "px-4 py-3" }, "Status")
                          , React.createElement('th', { className: "px-4 py-3" }, "Requested")
                          , React.createElement('th', { className: "px-4 py-3" }, "Accepted")
                          , React.createElement('th', { className: "px-4 py-3" }, "Activation Date" )
                          , React.createElement('th', { className: "px-4 py-3" }, "Deactivation Date" )
                        )
                      )
                      , React.createElement('tbody', {}
                        , React.createElement('tr', {}
                          , React.createElement('td', { colSpan: 9, className: "px-4 py-12 text-center text-muted-foreground"   }
                            , React.createElement('div', { className: "flex flex-col items-center justify-center"   }
                              , React.createElement(AlertTriangle, { className: "w-8 h-8 text-slate-300 mb-2"   } )
                              , React.createElement('p', null, "No orphan resource packages found"    )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )

              , React.createElement('div', { className: "flex items-center justify-between mb-4"   }
                , React.createElement('h3', { className: "font-bold text-lg text-foreground"  }, "Request Additional Resources"  )
                , React.createElement(Button, { variant: "link", className: "text-primary"}, "— Hide Extra Resources"

                )
              )

              , React.createElement(Card, { className: "border-border shadow-sm overflow-hidden"  }
                , React.createElement('div', { className: "overflow-x-auto"}
                  , React.createElement('table', { className: "w-full text-sm text-left align-middle"   }
                    , React.createElement('thead', { className: "text-xs text-white bg-primary uppercase tracking-wider"    }
                      , React.createElement('tr', {}
                        , React.createElement('th', { className: "px-5 py-4 w-1/4"  }, "Service Name" )
                        , React.createElement('th', { className: "px-5 py-4 w-1/4"  }, "Package")
                        , React.createElement('th', { className: "px-5 py-4 w-1/6 text-center"   }, "Count")
                        , React.createElement('th', { className: "px-5 py-4 w-1/6 text-right"   }, "Cost (৳)" )
                        , React.createElement('th', { className: "px-5 py-4 text-center"  }, "Action")
                      )
                    )
                    , React.createElement('tbody', { className: "divide-y divide-border/60" }
                      , [
                        { name: "IP Address Service", count: true },
                        { name: "Block Storage Service", count: true },
                        { name: "Web Application Firewall (WAF) Service", count: false },
                        { name: "Enterprise Backup Service", count: false },
                      ].map((service, idx) => (
                        React.createElement('tr', { key: idx, className: "hover:bg-slate-50/30"}
                          , React.createElement('td', { className: "px-5 py-4 font-bold text-slate-700"   }, service.name)
                          , React.createElement('td', { className: "px-5 py-4" }
                            , React.createElement(Select, {}
                              , React.createElement(SelectTrigger, { className: "w-full bg-white" }, React.createElement(SelectValue, { placeholder: "Select Package" } ))
                              , React.createElement(SelectContent, null, React.createElement(SelectItem, { value: "std"}, "Standard"), React.createElement(SelectItem, { value: "adv"}, "Advanced"))
                            )
                          )
                          , React.createElement('td', { className: "px-5 py-4 text-center"  }
                            , service.count ? React.createElement(Input, { type: "number", defaultValue: "0", className: "w-20 mx-auto text-center bg-white"   } ) : React.createElement('span', { className: "text-slate-300"}, "-")
                          )
                          , React.createElement('td', { className: "px-5 py-4 text-right font-bold text-emerald-600 text-lg"     }, "৳ 0" )
                          , React.createElement('td', { className: "px-5 py-4 text-center"  }
                            , React.createElement(Button, { size: "sm", className: "bg-primary hover:bg-primary/90 w-full sm:w-auto shadow-sm"    }
                              , React.createElement(Plus, { className: "w-4 h-4 mr-1.5"  } ), " Add to Wishlist"
                            )
                          )
                        )
                      ))
                    )
                  )
                )
              )

            )
          )
        )

      )

      , React.createElement(ChangePackageDialog, { open: changePackageOpen, onOpenChange: setChangePackageOpen} )
      , React.createElement(AttributeHistoryDialog, { open: attrHistoryOpen, onOpenChange: setAttrHistoryOpen} )
    )
  );
}
