import React from "react";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Users, FileText, Layers, Search, RefreshCw, Download, Plus, Filter, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

/* ── Mock data ────────────────────────────────────────── */









const ALL_CUSTOMERS = [
  { id: 435, name: "Bangladesh Computer Council (BCC)",                                                          division: "ICT Division",                         contracts: 5, services: 5 },
  { id: 322, name: "Bangladesh Bridge Authority",                                                                division: "Bridges Division",                     contracts: 3, services: 3 },
  { id:  56, name: "Bangladesh Karmachari Kallyan Board (BKKB)",                                                 division: "Ministry of Public Administration",     contracts: 2, services: 2 },
  { id: 391, name: "Bangladesh Ansar and VDP",                                                                   division: "Public Security Division",             contracts: 2, services: 2 },
  { id: 278, name: "Bangladesh Bureau of Statistics",                                                            division: "Statistics and Informatics Division",  contracts: 2, services: 3 },
  { id: 931, name: "Bangladesh Energy Regulatory Commission",                                                    division: "Energy and Mineral Resources Division", contracts: 2, services: 2 },
  { id: 109, name: "Bangladesh Infrastructure Finance Fund Limited (BIFFL)",                                     division: "Finance Division",                     contracts: 2, services: 2 },
  { id: 442, name: "Bangladesh Islamic Foundation",                                                              division: "Ministry of Religious Affairs",         contracts: 2, services: 2 },
  { id: 438, name: "Access to Information (a2i) Project",                                                        division: "ICT Division",                         contracts: 1, services: 1 },
  { id: 519, name: "Agrani Bank Limited",                                                                        division: "Financial Institutions Division",       contracts: 1, services: 1 },
  { id: 614, name: "Audit, Intelligence & Investigation Directorate, Value Added Tax, Dhaka",                   division: "Internal Resources Division",           contracts: 1, services: 1 },
  { id:  89, name: "Bangladesh Agricultural Development Corporation (BADC)",                                     division: "Ministry of Agriculture",              contracts: 1, services: 1 },
  { id:  88, name: "Bangladesh Agricultural Research Council (BARC)",                                            division: "Ministry of Agriculture",              contracts: 1, services: 1 },
  { id:  12, name: "Bangladesh Air Force",                                                                       division: "Armed Forces Division",                contracts: 1, services: 1 },
  { id:  54, name: "Bangladesh Civil Service Administration Academy",                                            division: "Ministry of Public Administration",     contracts: 1, services: 1 },
  { id: 513, name: "Bangladesh Commerce Bank Ltd",                                                               division: "Financial Institutions Division",       contracts: 1, services: 1 },
  { id: 319, name: "Bangladesh Export Promotion Bureau",                                                         division: "Ministry of Commerce",                 contracts: 1, services: 1 },
  { id: 497, name: "Bangladesh Film Archive",                                                                    division: "Ministry of Information and Broadcasting", contracts: 1, services: 1 },
  { id: 384, name: "Bangladesh Food Safety Authority",                                                           division: "Ministry of Food",                     contracts: 1, services: 1 },
  { id: 437, name: "Bangladesh Hi-Tech Park Authority",                                                          division: "ICT Division",                         contracts: 1, services: 1 },
  { id: 255, name: "Bangladesh Hydrocarbon Unit",                                                                division: "Energy and Mineral Resources Division", contracts: 1, services: 1 },
  { id: 511, name: "Bangladesh Institute of International and Strategic Studies",                                division: "Ministry of Foreign Affairs",           contracts: 1, services: 1 },
  { id:  94, name: "Bangladesh Institute of Nuclear Agriculture (BINA)",                                         division: "Ministry of Agriculture",              contracts: 1, services: 1 },
  { id: 613, name: "Bangladesh Journalist Welfare Trust",                                                        division: "Ministry of Information and Broadcasting", contracts: 1, services: 1 },
  { id: 484, name: "Bangladesh Krira Shikkha Protishan (BKSP)",                                                  division: "Ministry of Youth and Sports",          contracts: 1, services: 1 },
  { id: 230, name: "Bangladesh Land Port Authority",                                                             division: "Ministry of Shipping",                 contracts: 1, services: 1 },
  { id: 177, name: "Bangladesh Meteorological Department",                                                       division: "Ministry of Defense",                  contracts: 1, services: 1 },
  { id: 340, name: "Bangladesh National Museum",                                                                 division: "Ministry of Cultural Affairs",          contracts: 1, services: 1 },
  { id: 421, name: "Bangladesh Oil, Gas and Mineral Corporation (Petrobangla)",                                  division: "Energy and Mineral Resources Division", contracts: 1, services: 1 },
  { id: 350, name: "Bangladesh Parjatan Corporation",                                                            division: "Ministry of Civil Aviation and Tourism", contracts: 1, services: 1 },
];

const TOTAL_CUSTOMERS = 191;
const ACTIVE_CONTRACTS = 38;
const TOTAL_SERVICES   = 40;
const PAGE_SIZE        = 25;

/* ── Avatar initial ───────────────────────────────────── */
function CustomerAvatar({ name }) {
  const letter = name.trim()[0].toUpperCase();
  return (
    React.createElement('div', { className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0"          }
      , letter
    )
  );
}

/* ── Count badge ──────────────────────────────────────── */
function CountBadge({ count, color }) {
  return (
    React.createElement('span', {
      className: cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border",
        color === "blue"
          ? "bg-blue-50 text-blue-700 border-blue-200"
          : "bg-emerald-50 text-emerald-700 border-emerald-200"
      )}

      , color === "blue" ? React.createElement(FileText, { className: "w-3 h-3" } ) : React.createElement(Layers, { className: "w-3 h-3" } )
      , count
    )
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function CustomerListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);

  const filtered = ALL_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.division.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(TOTAL_CUSTOMERS / PAGE_SIZE);
  const visibleItems = page === 1 ? filtered.slice(0, PAGE_SIZE) : filtered;

  /* page numbers with ellipsis */
  const pageNums = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, 3, 4, 5, "...", totalPages];
  };

  return (
    React.createElement(AppLayout, { withSidebar: true}
      , React.createElement('div', { className: "space-y-5"}

        /* ── Page header ── */
        , React.createElement('div', { className: "flex items-center justify-between"  }
          , React.createElement('div', { className: "flex items-center gap-3"  }
            , React.createElement('div', { className: "p-2.5 bg-primary/10 rounded-xl"  }
              , React.createElement(Users, { className: "w-5 h-5 text-primary"  } )
            )
            , React.createElement('div', {}
              , React.createElement('h1', { className: "text-xl font-bold text-foreground"  }, "Customer List" )
              , React.createElement('p', { className: "text-xs text-muted-foreground" }, "Manage and view all customers"    )
            )
          )
          , React.createElement(Button, { className: "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm gap-2 px-4 py-2 h-9 rounded-lg shadow-sm"          }
            , React.createElement(Plus, { className: "w-4 h-4" } ), " Add New Customer"
          )
        )

        /* ── Quick actions bar ── */
        , React.createElement('div', {}
          , React.createElement(Button, { variant: "outline", size: "sm", className: "text-xs font-semibold gap-1.5 h-8"   }
            , React.createElement(Filter, { className: "w-3.5 h-3.5" } ), " Quick Actions"
          )
        )

        /* ── Stats + Search row ── */
        , React.createElement('div', { className: "grid grid-cols-2 lg:grid-cols-4 gap-4"   }
          /* Total Customers */
          , React.createElement('div', { className: "bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white shadow-md shadow-blue-500/20"       }
            , React.createElement('div', { className: "flex items-start justify-between"  }
              , React.createElement('div', {}
                , React.createElement('p', { className: "text-xs font-medium text-blue-100 mb-1"   }, "Total Customers" )
                , React.createElement('p', { className: "text-3xl font-black" }, TOTAL_CUSTOMERS)
              )
              , React.createElement('div', { className: "p-2 bg-white/20 rounded-xl"  }
                , React.createElement(Users, { className: "w-5 h-5" } )
              )
            )
          )

          /* Active Contracts */
          , React.createElement('div', { className: "bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-md shadow-emerald-500/20"       }
            , React.createElement('div', { className: "flex items-start justify-between"  }
              , React.createElement('div', {}
                , React.createElement('p', { className: "text-xs font-medium text-emerald-100 mb-1"   }, "Active Contracts" )
                , React.createElement('p', { className: "text-3xl font-black" }, ACTIVE_CONTRACTS)
              )
              , React.createElement('div', { className: "p-2 bg-white/20 rounded-xl"  }
                , React.createElement(FileText, { className: "w-5 h-5" } )
              )
            )
          )

          /* Total Services */
          , React.createElement('div', { className: "bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white shadow-md shadow-violet-500/20"       }
            , React.createElement('div', { className: "flex items-start justify-between"  }
              , React.createElement('div', {}
                , React.createElement('p', { className: "text-xs font-medium text-violet-100 mb-1"   }, "Total Services" )
                , React.createElement('p', { className: "text-3xl font-black" }, TOTAL_SERVICES)
              )
              , React.createElement('div', { className: "p-2 bg-white/20 rounded-xl"  }
                , React.createElement(Filter, { className: "w-5 h-5" } )
              )
            )
          )

          /* Search */
          , React.createElement('div', { className: "bg-white rounded-2xl p-4 border border-border/60 shadow-sm flex flex-col justify-between"        }
            , React.createElement('p', { className: "text-xs font-semibold text-slate-500 mb-2"   }, "Search Customers" )
            , React.createElement('div', { className: "relative"}
              , React.createElement(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"      } )
              , React.createElement(Input, {
                value: search,
                onChange: (e) => { setSearch(e.target.value); setPage(1); },
                placeholder: "Search by name, division…"   ,
                className: "pl-8 h-8 text-xs border-slate-200 focus-visible:ring-primary/30"    }
              )
            )
          )
        )

        /* ── Table card ── */
        , React.createElement('div', { className: "bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"     }

          /* Table toolbar */
          , React.createElement('div', { className: "flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-slate-50/60"       }
            , React.createElement(Button, { variant: "outline", size: "sm", className: "text-xs font-semibold gap-1.5 h-8"   }
              , React.createElement(Filter, { className: "w-3.5 h-3.5" } ), " Actions"
            )
            , React.createElement('div', { className: "flex items-center gap-2"  }
              , React.createElement(Button, { variant: "outline", size: "sm", className: "text-xs font-semibold gap-1.5 h-8"   }
                , React.createElement(RefreshCw, { className: "w-3.5 h-3.5" } ), " Refresh"
              )
              , React.createElement(Button, { size: "sm", className: "bg-primary hover:bg-primary/90 text-white text-xs font-semibold gap-1.5 h-8 px-3"       }
                , React.createElement(Download, { className: "w-3.5 h-3.5" } ), " Export ("  , PAGE_SIZE, ")"
              )
            )
          )

          /* Table */
          , React.createElement('div', { className: "overflow-x-auto"}
            , React.createElement('table', { className: "w-full text-sm" }
              , React.createElement('thead', {}
                , React.createElement('tr', { className: "bg-primary text-white text-xs"  }
                  , React.createElement('th', { className: "px-5 py-3.5 text-left font-semibold"   }
                    , React.createElement('div', { className: "flex items-center gap-1.5"  }
                      , React.createElement(FileText, { className: "w-3.5 h-3.5 opacity-70"  } ), " Customer"
                      , React.createElement(ArrowUpDown, { className: "w-3 h-3 opacity-50 cursor-pointer hover:opacity-100"    } )
                    )
                  )
                  , React.createElement('th', { className: "px-5 py-3.5 text-left font-semibold"   }
                    , React.createElement('div', { className: "flex items-center gap-1.5"  }
                      , React.createElement(Layers, { className: "w-3.5 h-3.5 opacity-70"  } ), " Division"
                      , React.createElement(ArrowUpDown, { className: "w-3 h-3 opacity-50 cursor-pointer hover:opacity-100"    } )
                    )
                  )
                  , React.createElement('th', { className: "px-5 py-3.5 text-center font-semibold"   }
                    , React.createElement('div', { className: "flex items-center justify-center gap-1.5"   }
                      , React.createElement(FileText, { className: "w-3.5 h-3.5 opacity-70"  } ), " Contracts"
                      , React.createElement(ArrowUpDown, { className: "w-3 h-3 opacity-50 cursor-pointer hover:opacity-100"    } )
                    )
                  )
                  , React.createElement('th', { className: "px-5 py-3.5 text-center font-semibold"   }
                    , React.createElement('div', { className: "flex items-center justify-center gap-1.5"   }
                      , React.createElement(Layers, { className: "w-3.5 h-3.5 opacity-70"  } ), " Services"
                      , React.createElement(ArrowUpDown, { className: "w-3 h-3 opacity-50 cursor-pointer hover:opacity-100"    } )
                    )
                  )
                )
              )
              , React.createElement('tbody', { className: "divide-y divide-border/40" }
                , visibleItems.length === 0 ? (
                  React.createElement('tr', {}
                    , React.createElement('td', { colSpan: 4, className: "px-5 py-10 text-center text-sm text-slate-400"    }, "No customers match your search."

                    )
                  )
                ) : (
                  visibleItems.map((customer) => (
                    React.createElement('tr', {
                      key: customer.id,
                      className: "hover:bg-slate-50/60 transition-colors cursor-pointer group"   }

                      , React.createElement('td', { className: "px-5 py-3" }
                        , React.createElement('div', { className: "flex items-center gap-3"  }
                          , React.createElement(CustomerAvatar, { name: customer.name} )
                          , React.createElement('div', {}
                            , React.createElement('p', { className: "text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight"     }
                              , customer.name
                            )
                            , React.createElement('p', { className: "text-[11px] text-slate-400 mt-0.5"  }, "ID: " , customer.id)
                          )
                        )
                      )
                      , React.createElement('td', { className: "px-5 py-3 text-sm text-slate-600"   }
                        , customer.division
                      )
                      , React.createElement('td', { className: "px-5 py-3 text-center"  }
                        , React.createElement(CountBadge, { count: customer.contracts, color: "blue"} )
                      )
                      , React.createElement('td', { className: "px-5 py-3 text-center"  }
                        , React.createElement(CountBadge, { count: customer.services, color: "green"} )
                      )
                    )
                  ))
                )
              )
            )
          )

          /* Pagination footer */
          , React.createElement('div', { className: "flex items-center justify-between px-5 py-3.5 border-t border-border/50 bg-slate-50/60"       }
            , React.createElement('p', { className: "text-xs text-slate-500" }, "Showing "
               , (page - 1) * PAGE_SIZE + 1, " to" , " "
              , Math.min(page * PAGE_SIZE, TOTAL_CUSTOMERS), " of "  , TOTAL_CUSTOMERS, " results"
            )
            , React.createElement('div', { className: "flex items-center gap-1"  }
              , React.createElement('button', {
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                disabled: page === 1,
                className: "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-border/50"              }

                , React.createElement(ChevronLeft, { className: "w-3.5 h-3.5" } ), " Previous"
              )

              , pageNums().map((p, i) =>
                p === "..." ? (
                  React.createElement('span', { key: `el-${i}`, className: "px-2 py-1.5 text-xs text-slate-400"   }, "…")
                ) : (
                  React.createElement('button', {
                    key: p,
                    onClick: () => setPage(p ),
                    className: cn(
                      "w-7 h-7 rounded-lg text-xs font-semibold transition-colors",
                      page === p
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    )}

                    , p
                  )
                )
              )

              , React.createElement('button', {
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                disabled: page === totalPages,
                className: "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-border/50"              }
, "Next "
                 , React.createElement(ChevronRight, { className: "w-3.5 h-3.5" } )
              )
            )
          )
        )
      )
    )
  );
}
