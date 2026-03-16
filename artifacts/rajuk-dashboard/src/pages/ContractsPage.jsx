import React from "react";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "wouter";
import { FileText, Cloud, Mail, AlertTriangle, Edit2, Plus, ExternalLink, ChevronRight, Server, FilePlus2, CalendarRange, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

/* ── Mock users for dropdowns ───────────────────────────── */
const USERS = [
  { value: "u1", label: "Lutfor Rahman" },
  { value: "u2", label: "Programmer Raj" },
  { value: "u3", label: "Sadia Islam" },
  { value: "u4", label: "Mahbub Alam" },
  { value: "u5", label: "Nusrat Jahan" },
];

/* ── Select field ───────────────────────────────────────── */
function UserSelect({
  id, value, onChange, required,
}) {
  return (
    React.createElement('select', {
      id: id,
      value: value,
      onChange: (e) => onChange(e.target.value),
      required: required,
      className: "w-full h-10 rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"                ,
      style: { backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}

      , React.createElement('option', { value: ""}, "Select a user"  )
      , USERS.map((u) => (
        React.createElement('option', { key: u.value, value: u.value}, u.label)
      ))
    )
  );
}

/* ── Add New Service Dialog ─────────────────────────────── */
function NewServiceDialog({ open, onOpenChange }) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    billingPrimary: "",
    technicalPrimary: "",
    billingSecondary: "",
    technicalSecondary: "",
  });

  const set = (key) => (val) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.billingPrimary || !form.technicalPrimary) return;
    toast({ title: "Service Requested", description: `"${form.name}" has been submitted for approval.` });
    onOpenChange(false);
    setForm({ name: "", billingPrimary: "", technicalPrimary: "", billingSecondary: "", technicalSecondary: "" });
  };

  return (
    React.createElement(Dialog, { open: open, onOpenChange: onOpenChange}
      , React.createElement(DialogContent, { className: "max-w-lg p-0 gap-0 overflow-hidden rounded-2xl"    }
        /* Header */
        , React.createElement(DialogHeader, { className: "px-7 pt-6 pb-5 border-b border-border/50 bg-white"     }
          , React.createElement('div', { className: "flex items-center gap-3"  }
            , React.createElement('div', { className: "p-2.5 bg-primary/10 rounded-xl"  }
              , React.createElement(Server, { className: "w-5 h-5 text-primary"  } )
            )
            , React.createElement(DialogTitle, { className: "text-lg font-bold text-foreground"  }, "Add a New Service"   )
          )
        )

        /* Form */
        , React.createElement('form', { onSubmit: handleSubmit, className: "bg-slate-50/60"}
          , React.createElement('div', { className: "px-7 py-6 space-y-5"  }

            /* Service Name */
            , React.createElement('div', { className: "space-y-1.5"}
              , React.createElement(Label, { htmlFor: "svc-name", className: "text-sm font-semibold text-foreground"  }, "Service Name "
                  , React.createElement('span', { className: "text-red-500"}, "*")
              )
              , React.createElement(Input, {
                id: "svc-name",
                value: form.name,
                onChange: (e) => set("name")(e.target.value),
                placeholder: "e.g. (Mail Service)"  ,
                required: true,
                className: "h-10 border-slate-200 focus-visible:ring-primary/30 bg-white text-sm"    }
              )
            )

            /* Billing User Primary */
            , React.createElement('div', { className: "space-y-1.5"}
              , React.createElement(Label, { htmlFor: "billing-primary", className: "text-sm font-semibold text-foreground"  }, "Billing User (Primary) "
                   , React.createElement('span', { className: "text-red-500"}, "*")
              )
              , React.createElement(UserSelect, { id: "billing-primary", value: form.billingPrimary, onChange: set("billingPrimary"), required: true} )
            )

            /* Technical User Primary */
            , React.createElement('div', { className: "space-y-1.5"}
              , React.createElement(Label, { htmlFor: "tech-primary", className: "text-sm font-semibold text-foreground"  }, "Technical User (Primary) "
                   , React.createElement('span', { className: "text-red-500"}, "*")
              )
              , React.createElement(UserSelect, { id: "tech-primary", value: form.technicalPrimary, onChange: set("technicalPrimary"), required: true} )
            )

            /* Billing User Secondary */
            , React.createElement('div', { className: "space-y-1.5"}
              , React.createElement(Label, { htmlFor: "billing-secondary", className: "text-sm font-semibold text-slate-600"  }, "Billing User (Secondary)"

              )
              , React.createElement(UserSelect, { id: "billing-secondary", value: form.billingSecondary, onChange: set("billingSecondary")} )
            )

            /* Technical User Secondary */
            , React.createElement('div', { className: "space-y-1.5"}
              , React.createElement(Label, { htmlFor: "tech-secondary", className: "text-sm font-semibold text-slate-600"  }, "Technical User (Secondary)"

              )
              , React.createElement(UserSelect, { id: "tech-secondary", value: form.technicalSecondary, onChange: set("technicalSecondary")} )
            )
          )

          /* Footer */
          , React.createElement('div', { className: "px-7 py-4 flex justify-end border-t border-border/50 bg-white"      }
            , React.createElement(Button, {
              type: "submit",
              className: "bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-9 rounded-lg shadow-sm"       }
, "Submit"

            )
          )
        )
      )
    )
  );
}

/* ── Add New Contract Dialog ────────────────────────────── */
function NewContractDialog({ open, onOpenChange }) {
  const { toast } = useToast();
  const empty = {
    projectName: "", webUrl: "", owner: "", billingPrimary: "", billingSecondary: "",
    serviceName: "", tenureStart: "", tenureEnd: "", manager: "", techPrimary: "", techSecondary: "",
  };
  const [form, setForm] = useState(empty);
  const [tenureError, setTenureError] = useState(false);
  const [documents, setDocuments] = useState([]);

  const set = (key) => (val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (key === "tenureStart" || key === "tenureEnd") setTenureError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.tenureStart || !form.tenureEnd) { setTenureError(true); return; }
    toast({ title: "Contract Submitted", description: `"${form.projectName || "New Contract"}" has been submitted for review.` });
    onOpenChange(false);
    setForm(empty);
    setDocuments([]);
    setTenureError(false);
  };

  const addDocument = () => setDocuments((d) => [...d, `Document_${d.length + 1}.pdf`]);

  return (
    React.createElement(Dialog, { open: open, onOpenChange: onOpenChange}
      , React.createElement(DialogContent, { className: "max-w-4xl p-0 gap-0 overflow-hidden rounded-2xl"    }
        /* Header */
        , React.createElement(DialogHeader, { className: "px-8 pt-6 pb-5 border-b border-border/50 bg-white"     }
          , React.createElement('div', { className: "flex items-center gap-3"  }
            , React.createElement('div', { className: "p-2.5 bg-primary/10 rounded-xl"  }
              , React.createElement(FilePlus2, { className: "w-5 h-5 text-primary"  } )
            )
            , React.createElement(DialogTitle, { className: "text-lg font-bold text-foreground"  }, "Add a New Contract"   )
          )
        )

        /* Two-column form */
        , React.createElement('form', { onSubmit: handleSubmit}
          , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50 bg-slate-50/60 max-h-[70vh] overflow-y-auto"         }

            /* ── LEFT COLUMN ── */
            , React.createElement('div', { className: "px-8 py-6 space-y-5"  }
              , React.createElement('div', { className: "space-y-1.5"}
                , React.createElement(Label, { htmlFor: "c-project", className: "text-sm font-semibold text-foreground"  }, "Project Name" )
                , React.createElement(Input, { id: "c-project", value: form.projectName, onChange: (e) => set("projectName")(e.target.value),
                  placeholder: "Enter project name"  , className: "h-10 border-slate-200 bg-white text-sm focus-visible:ring-primary/30"    } )
              )

              , React.createElement('div', { className: "space-y-1.5"}
                , React.createElement(Label, { htmlFor: "c-url", className: "text-sm font-semibold text-foreground"  }, "Web URL" )
                , React.createElement(Input, { id: "c-url", value: form.webUrl, onChange: (e) => set("webUrl")(e.target.value),
                  placeholder: "https://example.gov.bd", className: "h-10 border-slate-200 bg-white text-sm focus-visible:ring-primary/30"    } )
              )

              , React.createElement('div', { className: "space-y-1.5"}
                , React.createElement(Label, { htmlFor: "c-owner", className: "text-sm font-semibold text-foreground"  }, "Owner "
                   , React.createElement('span', { className: "text-red-500"}, "*")
                )
                , React.createElement(UserSelect, { id: "c-owner", value: form.owner, onChange: set("owner"), required: true} )
              )

              , React.createElement('div', { className: "space-y-1.5"}
                , React.createElement(Label, { htmlFor: "c-bill-p", className: "text-sm font-semibold text-foreground"  }, "Billing User (Primary) "
                     , React.createElement('span', { className: "text-red-500"}, "*")
                )
                , React.createElement(UserSelect, { id: "c-bill-p", value: form.billingPrimary, onChange: set("billingPrimary"), required: true} )
              )

              , React.createElement('div', { className: "space-y-1.5"}
                , React.createElement(Label, { htmlFor: "c-bill-s", className: "text-sm font-semibold text-slate-600"  }, "Billing User (Secondary)"  )
                , React.createElement(UserSelect, { id: "c-bill-s", value: form.billingSecondary, onChange: set("billingSecondary")} )
              )
            )

            /* ── RIGHT COLUMN ── */
            , React.createElement('div', { className: "px-8 py-6 space-y-5 flex flex-col"    }
              , React.createElement('div', { className: "space-y-1.5"}
                , React.createElement(Label, { htmlFor: "c-svc", className: "text-sm font-semibold text-foreground"  }, "Service Name "
                    , React.createElement('span', { className: "text-red-500"}, "*")
                )
                , React.createElement(Input, { id: "c-svc", value: form.serviceName, onChange: (e) => set("serviceName")(e.target.value),
                  placeholder: "e.g (Mail Service)"  , required: true,
                  className: "h-10 border-slate-200 bg-white text-sm focus-visible:ring-primary/30"    } )
              )

              , React.createElement('div', { className: "space-y-1.5"}
                , React.createElement(Label, { className: "text-sm font-semibold text-foreground"  }, "Agreement Tenure "
                    , React.createElement('span', { className: "text-red-500"}, "*")
                )
                , React.createElement('div', { className: "flex items-center gap-2"  }
                  , React.createElement('div', { className: "relative flex-1" }
                    , React.createElement(CalendarRange, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"       } )
                    , React.createElement(Input, { type: "date", value: form.tenureStart, onChange: (e) => set("tenureStart")(e.target.value),
                      className: `h-10 pl-9 border-slate-200 bg-white text-sm focus-visible:ring-primary/30 ${tenureError ? "border-red-400 focus-visible:ring-red-300" : ""}`} )
                  )
                  , React.createElement('span', { className: "text-slate-400 text-sm font-medium shrink-0"   }, "–")
                  , React.createElement('div', { className: "relative flex-1" }
                    , React.createElement(CalendarRange, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"       } )
                    , React.createElement(Input, { type: "date", value: form.tenureEnd, onChange: (e) => set("tenureEnd")(e.target.value),
                      className: `h-10 pl-9 border-slate-200 bg-white text-sm focus-visible:ring-primary/30 ${tenureError ? "border-red-400 focus-visible:ring-red-300" : ""}`} )
                  )
                )
                , tenureError && (
                  React.createElement('p', { className: "text-xs text-red-500 flex items-center gap-1 mt-0.5"     }
                    , React.createElement(AlertTriangle, { className: "w-3 h-3" } ), " Please select a valid Agreement tenure."
                  )
                )
              )

              , React.createElement('div', { className: "space-y-1.5"}
                , React.createElement(Label, { htmlFor: "c-mgr", className: "text-sm font-semibold text-foreground"  }, "Manager "
                   , React.createElement('span', { className: "text-red-500"}, "*")
                )
                , React.createElement(UserSelect, { id: "c-mgr", value: form.manager, onChange: set("manager"), required: true} )
              )

              , React.createElement('div', { className: "space-y-1.5"}
                , React.createElement(Label, { htmlFor: "c-tech-p", className: "text-sm font-semibold text-foreground"  }, "Technical User (Primary) "
                     , React.createElement('span', { className: "text-red-500"}, "*")
                )
                , React.createElement(UserSelect, { id: "c-tech-p", value: form.techPrimary, onChange: set("techPrimary"), required: true} )
              )

              , React.createElement('div', { className: "space-y-1.5"}
                , React.createElement(Label, { htmlFor: "c-tech-s", className: "text-sm font-semibold text-slate-600"  }, "Technical User (Secondary)"  )
                , React.createElement(UserSelect, { id: "c-tech-s", value: form.techSecondary, onChange: set("techSecondary")} )
              )

              /* Document list */
              , documents.length > 0 && (
                React.createElement('div', { className: "space-y-1.5"}
                  , documents.map((d) => (
                    React.createElement('div', { key: d, className: "flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700"          }
                      , React.createElement(FileText, { className: "w-4 h-4 text-primary shrink-0"   } ), " " , d
                    )
                  ))
                )
              )

              /* Add Document */
              , React.createElement('div', { className: "pt-2"}
                , React.createElement(Button, { type: "button", onClick: addDocument,
                  className: "bg-emerald-600 hover:bg-emerald-700 text-white h-9 px-5 text-sm font-semibold rounded-lg shadow-sm"        }
                  , React.createElement(Upload, { className: "w-4 h-4 mr-2"  } ), " Add Document"
                )
              )
            )
          )

          /* Footer */
          , React.createElement('div', { className: "px-8 py-4 flex justify-end border-t border-border/50 bg-white"      }
            , React.createElement(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), className: "mr-3 h-9 px-6 text-sm"   }, "Cancel"

            )
            , React.createElement(Button, { type: "submit", className: "bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-9 rounded-lg shadow-sm"       }, "Submit"

            )
          )
        )
      )
    )
  );
}

const CONTRACT_LIST = [
  { id: "NDC-00075", name: "EPLOT Service Management System",    status: "ACTIVE",   services: 2, start: "2023-05-18", end: "2040-12-31" },
  { id: "NDC-00082", name: "Urban Development Portal",           status: "ACTIVE",   services: 3, start: "2024-01-10", end: "2035-06-30" },
  { id: "NDC-00091", name: "Housing Registry System",            status: "EXPIRED",  services: 1, start: "2021-03-01", end: "2024-02-28" },
  { id: "NDC-00103", name: "Land Use Planning & Monitoring",     status: "ACTIVE",   services: 4, start: "2024-07-15", end: "2038-07-14" },
  { id: "NDC-00118", name: "Smart City Infrastructure Services", status: "PENDING",  services: 0, start: "2026-02-01", end: "2031-01-31" },
];

export default function ContractsPage() {
  const [newServiceOpen, setNewServiceOpen] = useState(false);
  const [newContractOpen, setNewContractOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("NDC-00075");

  return (
    React.createElement(AppLayout, { withSidebar: true}
      , React.createElement('div', { className: "flex flex-col gap-6"  }

        /* Top Info */
        , React.createElement('div', { className: "bg-white rounded-2xl border border-border/60 shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center gap-6"           }
          , React.createElement('div', { className: "w-16 h-16 rounded-xl bg-slate-50 border flex items-center justify-center p-2"        }
            , React.createElement('img', { src: `${import.meta.env.BASE_URL}images/rajuk-logo.png`, alt: "Logo", className: "w-full h-full object-contain"  } )
          )
          , React.createElement('div', { className: "flex-1 text-center md:text-left"  }
            , React.createElement('h1', { className: "text-xl md:text-2xl font-bold text-foreground"   }, "Rajdhani Unnayan Kartipakkha (RAJUK)"   )
            , React.createElement('p', { className: "text-muted-foreground text-sm font-medium"  }, "Ministry of Housing and Public Works"     )
          )
          , React.createElement('div', { className: "flex items-center gap-4"  }
            , React.createElement('div', { className: "text-center px-4 py-2 bg-slate-50 rounded-lg border"     }
              , React.createElement('div', { className: "text-lg font-bold text-primary"  }, CONTRACT_LIST.length)
              , React.createElement('div', { className: "text-[10px] uppercase font-semibold text-slate-500"   }, "Contracts")
            )
            , React.createElement('div', { className: "text-center px-4 py-2 bg-slate-50 rounded-lg border"     }
              , React.createElement('div', { className: "text-lg font-bold text-emerald-600"  }, "2")
              , React.createElement('div', { className: "text-[10px] uppercase font-semibold text-slate-500"   }, "Services")
            )
            , React.createElement(Button, {
              onClick: () => setNewContractOpen(true),
              className: "bg-primary hover:bg-primary/90 text-white font-semibold h-10 px-5 rounded-xl shadow-sm"       }

              , React.createElement(FilePlus2, { className: "w-4 h-4 mr-2"  } ), " Add New Contract"
            )
          )
        )

        , React.createElement('div', { className: "flex flex-col xl:flex-row gap-6"   }

          /* Left Panel: Contract List */
          , React.createElement('div', { className: "xl:w-72 flex flex-col rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm shrink-0"         }
            /* Panel header */
            , React.createElement('div', { className: "px-4 py-3 border-b border-slate-200 bg-slate-100/80 flex items-center justify-between"       }
              , React.createElement('h2', { className: "text-sm font-bold text-foreground"  }, "Contract List" )
              , React.createElement('span', { className: "text-xs font-semibold text-slate-400"  }, CONTRACT_LIST.length, " items" )
            )

            /* Scrollable list */
            , React.createElement('div', { className: "flex flex-col gap-2 p-3 overflow-y-auto max-h-[600px]"     }
              , CONTRACT_LIST.map(c => {
                const isSelected = c.id === selectedId;
                const statusStyle =
                  c.status === "ACTIVE"   ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  c.status === "EXPIRED"  ? "bg-rose-50 text-rose-700 border-rose-200" :
                                            "bg-amber-50 text-amber-700 border-amber-200";
                return (
                  React.createElement(Card, {
                    key: c.id,
                    onClick: () => setSelectedId(c.id),
                    className: `cursor-pointer transition-all duration-150 shadow-sm shrink-0 ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border bg-white hover:border-primary/40 hover:bg-slate-50/60"
                    }`}

                    , React.createElement(CardContent, { className: "p-3.5 flex flex-col gap-2"   }
                      , React.createElement('span', { className: `font-bold text-sm line-clamp-2 leading-snug ${isSelected ? "text-primary" : "text-foreground"}`}
                        , c.name
                      )
                      , React.createElement('div', { className: "flex items-center justify-between"  }
                        , React.createElement('span', { className: "text-xs font-mono text-muted-foreground"  }, "ID: " , c.id)
                        , React.createElement(Badge, { variant: "outline", className: `text-xs font-semibold ${statusStyle}`}
                          , c.status
                        )
                      )
                      , React.createElement('div', { className: "flex items-center gap-1.5 text-xs text-slate-400"    }
                        , React.createElement('span', c.start)
                        , React.createElement('span', null, "→")
                        , React.createElement('span', c.end)
                      )
                    )
                  )
                );
              })
            )
          )

          /* Right Panel: Tabs */
          , React.createElement('div', { className: "flex-1 bg-white rounded-2xl border shadow-sm flex flex-col min-h-[600px]"       }
            , React.createElement(Tabs, { defaultValue: "info", className: "w-full h-full flex flex-col"   }

              , React.createElement('div', { className: "flex flex-col sm:flex-row items-center justify-between p-4 border-b gap-4"       }
                , React.createElement(TabsList, { className: "bg-slate-100"}
                  , React.createElement(TabsTrigger, { value: "info"}, "Contract Info" )
                  , React.createElement(TabsTrigger, { value: "services"}, "Service List" )
                  , React.createElement(TabsTrigger, { value: "agreements"}, "Agreements")
                )
                , React.createElement(Button, {
                  onClick: () => setNewServiceOpen(true),
                  className: "bg-emerald-600 hover:bg-emerald-700 text-white"  }

                  , React.createElement(Plus, { className: "w-4 h-4 mr-2"  } ), " Request New Service"
                )
              )

              , React.createElement('div', { className: "p-4 md:p-6 flex-1 bg-slate-50/50"   }

                /* CONTRACT INFO TAB */
                , React.createElement(TabsContent, { value: "info", className: "m-0 space-y-6 animate-in fade-in-50"   }

                  , React.createElement('div', { className: "bg-white rounded-xl border p-5 relative overflow-hidden"     }
                    , React.createElement('div', { className: "absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg"         }, "ACTIVE")
                    , React.createElement('h3', { className: "font-bold text-lg mb-4 flex items-center gap-2"     }
                      , React.createElement(FileText, { className: "w-5 h-5 text-primary"  } ), " Contract Overview"
                    )
                    , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"    }
                      , React.createElement('div', {}
                        , React.createElement('p', { className: "text-xs text-muted-foreground mb-1"  }, "Contract ID" )
                        , React.createElement('p', { className: "font-mono font-medium" }, "NDC-00075")
                      )
                      , React.createElement('div', {}
                        , React.createElement('p', { className: "text-xs text-muted-foreground mb-1"  }, "Project Name" )
                        , React.createElement('p', { className: "font-medium"}, "EPLOT Service Management System"   )
                      )
                      , React.createElement('div', {}
                        , React.createElement('p', { className: "text-xs text-muted-foreground mb-1"  }, "Web URL" )
                        , React.createElement('a', { href: "https://rajuk.gov.bd", target: "_blank", className: "text-primary hover:underline flex items-center gap-1 font-medium"     }, "https://rajuk.gov.bd "
                           , React.createElement(ExternalLink, { className: "w-3 h-3" } )
                        )
                      )
                      , React.createElement('div', { className: "grid grid-cols-3 gap-2"  }
                        , React.createElement('div', {}
                          , React.createElement('p', { className: "text-xs text-muted-foreground mb-1"  }, "Request Date" )
                          , React.createElement('p', { className: "text-sm font-medium" }, "10/29/2024")
                        )
                        , React.createElement('div', {}
                          , React.createElement('p', { className: "text-xs text-muted-foreground mb-1"  }, "Start Date" )
                          , React.createElement('p', { className: "text-sm font-medium" }, "5/18/2023")
                        )
                        , React.createElement('div', {}
                          , React.createElement('p', { className: "text-xs text-muted-foreground mb-1"  }, "End Date" )
                          , React.createElement('p', { className: "text-sm font-medium" }, "12/31/2040")
                        )
                      )
                    )
                  )

                  , React.createElement('div', { className: "bg-white rounded-xl border p-5"   }
                    , React.createElement('h3', { className: "font-bold text-lg mb-4 flex items-center gap-2"     }
                      , React.createElement(FileText, { className: "w-5 h-5 text-primary"  } ), " Agreement Status"
                    )
                    , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-center"    }
                      , React.createElement('div', {}
                        , React.createElement('p', { className: "text-xs text-muted-foreground mb-1"  }, "Frame Agreement Agreed"  )
                        , React.createElement('p', { className: "font-medium"}, "Not specified" )
                      )
                      , React.createElement('div', {}
                        , React.createElement('p', { className: "text-xs text-muted-foreground mb-1"  }, "Contract Type" )
                        , React.createElement('p', { className: "font-medium"}, "Not specified" )
                      )
                      , React.createElement('div', {}
                        , React.createElement('p', { className: "text-xs text-muted-foreground mb-1"  }, "Frame Agreement Updated"  )
                        , React.createElement('p', { className: "font-medium"}, "No")
                      )
                    )
                    , React.createElement('div', { className: "flex gap-3 mt-5"  }
                      , React.createElement(Button, { variant: "outline", className: "border-primary text-primary hover:bg-primary/5"  }, "View Agreement" )
                      , React.createElement(Button, { variant: "outline"}, "Edit Agreement" )
                    )
                  )

                  , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   }
                    , React.createElement('div', { className: "bg-white rounded-xl border p-5 relative"    }
                      , React.createElement(Button, { variant: "ghost", size: "icon", className: "absolute top-3 right-3 h-8 w-8 text-primary"     }
                        , React.createElement(Edit2, { className: "w-4 h-4" } )
                      )
                      , React.createElement('h3', { className: "font-bold text-md mb-4"  }, "Manager Information" )
                      , React.createElement('div', { className: "flex flex-col items-center justify-center py-6 text-center text-amber-600 bg-amber-50/50 rounded-lg border border-amber-100 border-dashed"           }
                        , React.createElement(AlertTriangle, { className: "w-8 h-8 mb-2 opacity-80"   } )
                        , React.createElement('p', { className: "font-semibold text-sm" }, "No manager information available"   )
                        , React.createElement('p', { className: "text-xs text-amber-700/70 mt-1 max-w-[200px]"   }, "Please add manager details to complete the contract"       )
                      )
                    )
                    , React.createElement('div', { className: "bg-white rounded-xl border p-5 relative"    }
                      , React.createElement(Button, { variant: "ghost", size: "icon", className: "absolute top-3 right-3 h-8 w-8 text-primary"     }
                        , React.createElement(Edit2, { className: "w-4 h-4" } )
                      )
                      , React.createElement('h3', { className: "font-bold text-md mb-4"  }, "Owner Information" )
                      , React.createElement('div', { className: "flex flex-col items-center justify-center py-6 text-center text-amber-600 bg-amber-50/50 rounded-lg border border-amber-100 border-dashed"           }
                        , React.createElement(AlertTriangle, { className: "w-8 h-8 mb-2 opacity-80"   } )
                        , React.createElement('p', { className: "font-semibold text-sm" }, "No owner information available"   )
                        , React.createElement('p', { className: "text-xs text-amber-700/70 mt-1 max-w-[200px]"   }, "Please add owner details to complete the contract"       )
                      )
                    )
                  )

                  , React.createElement('div', { className: "bg-white rounded-xl border p-5"   }
                    , React.createElement('h3', { className: "font-bold text-lg mb-4"  }, "Additional Information" )
                    , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-y-4 text-sm"    }
                      , React.createElement('div', { className: "flex items-start gap-2"  }
                        , React.createElement(FileText, { className: "w-4 h-4 text-muted-foreground mt-0.5"   } )
                        , React.createElement('div', {}
                          , React.createElement('p', { className: "font-medium"}, "Documents")
                          , React.createElement('p', { className: "text-muted-foreground"}, "No documents uploaded"  )
                        )
                      )
                      , React.createElement('div', { className: "flex items-start gap-2"  }
                        , React.createElement(FileText, { className: "w-4 h-4 text-muted-foreground mt-0.5"   } )
                        , React.createElement('div', {}
                          , React.createElement('p', { className: "font-medium"}, "SLA Document" )
                          , React.createElement('p', { className: "text-muted-foreground"}, "No SLA document uploaded"   )
                        )
                      )
                      , React.createElement('div', { className: "flex items-start gap-2"  }
                        , React.createElement(AlertTriangle, { className: "w-4 h-4 text-muted-foreground mt-0.5"   } )
                        , React.createElement('div', {}
                          , React.createElement('p', { className: "font-medium"}, "SLA Information" )
                          , React.createElement('p', { className: "text-muted-foreground"}, "No SLA information available"   )
                        )
                      )
                      , React.createElement('div', { className: "flex items-start gap-2"  }
                        , React.createElement(Edit2, { className: "w-4 h-4 text-muted-foreground mt-0.5"   } )
                        , React.createElement('div', {}
                          , React.createElement('p', { className: "font-medium"}, "Signatory")
                          , React.createElement('p', { className: "text-muted-foreground"}, "No signatory information available"   )
                        )
                      )
                    )
                  )

                )

                /* SERVICE LIST TAB */
                , React.createElement(TabsContent, { value: "services", className: "m-0 space-y-4 animate-in fade-in-50"   }
                  , React.createElement('div', { className: "flex items-center justify-between mb-2"   }
                    , React.createElement('h3', { className: "font-bold text-lg" }, "Services (2)" )
                  )
                  , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   }
                    /* Cloud Service Card */
                    , React.createElement(Card, { className: "hover:border-primary/50 transition-colors" }
                      , React.createElement(CardContent, { className: "p-5 flex flex-col h-full relative"    }
                        , React.createElement('div', { className: "absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold border border-emerald-200"              }
                          , React.createElement('div', { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"    } ), " Active"
                        )
                        , React.createElement('div', { className: "w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mb-4 border border-blue-100"          }
                          , React.createElement(Cloud, { className: "w-6 h-6" } )
                        )
                        , React.createElement('h4', { className: "text-xl font-bold mb-2"  }, "Cloud")
                        , React.createElement('div', { className: "text-sm space-y-1 mb-6 text-muted-foreground"   }
                          , React.createElement('p', null, "Service Information: "  , React.createElement('span', { className: "font-mono text-foreground font-medium"  }, "SID-00075"))
                          , React.createElement('p', null, "Internal ID: "  , React.createElement('span', { className: "font-mono text-foreground font-medium"  }, "2679"))
                        )
                        , React.createElement('div', { className: "mt-auto pt-4 border-t border-border"   }
                          , React.createElement(Link, { href: "/services/SID-00075", className: "flex items-center justify-between text-sm font-medium text-primary hover:text-primary/80 transition-colors group"        }, "Click to view details"

                            , React.createElement('span', { className: "flex items-center" }, "View Details "  , React.createElement(ChevronRight, { className: "w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"    } ))
                          )
                        )
                      )
                    )

                    /* Mail Service Card */
                    , React.createElement(Card, { className: "hover:border-primary/50 transition-colors" }
                      , React.createElement(CardContent, { className: "p-5 flex flex-col h-full relative"    }
                        , React.createElement('div', { className: "absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold border border-emerald-200"              }
                          , React.createElement('div', { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"    } ), " Active"
                        )
                        , React.createElement('div', { className: "w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 mb-4 border border-orange-100"          }
                          , React.createElement(Mail, { className: "w-6 h-6" } )
                        )
                        , React.createElement('h4', { className: "text-xl font-bold mb-2"  }, "Mail")
                        , React.createElement('div', { className: "text-sm space-y-1 mb-6 text-muted-foreground"   }
                          , React.createElement('p', null, "Service Information: "  , React.createElement('span', { className: "font-mono text-foreground font-medium"  }, "SID-00324"))
                          , React.createElement('p', null, "Internal ID: "  , React.createElement('span', { className: "font-mono text-foreground font-medium"  }, "1"))
                        )
                        , React.createElement('div', { className: "mt-auto pt-4 border-t border-border"   }
                          , React.createElement(Link, { href: "/services/SID-00324", className: "flex items-center justify-between text-sm font-medium text-primary hover:text-primary/80 transition-colors group"        }, "Click to view details"

                            , React.createElement('span', { className: "flex items-center" }, "View Details "  , React.createElement(ChevronRight, { className: "w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"    } ))
                          )
                        )
                      )
                    )
                  )
                )

                /* AGREEMENTS TAB */
                , React.createElement(TabsContent, { value: "agreements", className: "m-0 space-y-6 animate-in fade-in-50"   }
                  , React.createElement('h3', { className: "font-bold text-lg" }, "Agreements & Documents"  )

                  , React.createElement('div', { className: "bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800"       }
                    , React.createElement(AlertTriangle, { className: "w-5 h-5 shrink-0 mt-0.5 text-amber-600"    } )
                    , React.createElement('div', {}
                      , React.createElement('h4', { className: "font-bold text-sm text-amber-900 mb-1"   }, "Signatory Information Not Available"   )
                      , React.createElement('p', { className: "text-sm opacity-90" }, "Signatory information has not been provided yet. This information will be available once the contract is processed."                )
                    )
                  )

                  , React.createElement('div', { className: "bg-white border rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"         }
                    , React.createElement('div', {}
                      , React.createElement('h4', { className: "font-bold text-foreground" }, "Frame Agreement" )
                      , React.createElement('p', { className: "text-sm text-muted-foreground" }, "View and manage the frame agreement"     )
                    )
                    , React.createElement(Button, { className: "bg-primary"}, "View Agreement" )
                  )

                  , React.createElement('div', { className: "bg-white border border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center"         }
                    , React.createElement(FileText, { className: "w-10 h-10 text-slate-300 mb-3"   } )
                    , React.createElement('h4', { className: "font-bold text-slate-700" }, "No Additional Documents"  )
                    , React.createElement('p', { className: "text-sm text-slate-500 mt-1 max-w-sm"   }, "Any extra uploaded documents related to this contract will appear here."          )
                  )
                )

              )
            )
          )
        )
      )

      , React.createElement(NewServiceDialog, { open: newServiceOpen, onOpenChange: setNewServiceOpen} )
      , React.createElement(NewContractDialog, { open: newContractOpen, onOpenChange: setNewContractOpen} )
    )
  );
}
