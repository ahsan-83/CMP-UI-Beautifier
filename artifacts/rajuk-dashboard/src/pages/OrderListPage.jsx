import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useLocation } from "wouter";
import { Search, ChevronLeft, ChevronRight, X, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const ORDERS = [
  { id: "20260315-NDC-00075-510", type: "Change Package", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 15, 2026 11:46 AM", approved: "", status: "PENDING" },
  { id: "20260311-NDC-00075-491", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 11, 2026 01:36 PM", approved: "", status: "PENDING" },
  { id: "20260311-NDC-00075-490", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 11, 2026 01:03 PM", approved: "", status: "PENDING" },
  { id: "20260311-NDC-00075-489", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 11, 2026 12:52 PM", approved: "", status: "PENDING" },
  { id: "20260311-NDC-00075-488", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 11, 2026 12:43 PM", approved: "", status: "PENDING" },
  { id: "20260311-NDC-00075-487", type: "New Request", service: "Cloud (SID-00075)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 11, 2026 10:53 AM", approved: "", status: "PENDING" },
  { id: "20260311-NDC-00075-486", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 11, 2026 10:40 AM", approved: "", status: "PENDING" },
  { id: "20260311-NDC-00075-485", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 11, 2026 10:39 AM", approved: "", status: "PENDING" },
  { id: "20260311-NDC-00075-484", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 11, 2026 10:38 AM", approved: "", status: "PENDING" },
  { id: "20260311-NDC-00075-483", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 11, 2026 10:22 AM", approved: "", status: "PENDING" },
  { id: "20260315-NDC-00075-516", type: "New Request", service: "Cloud (SID-00075)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 15, 2026 03:07 PM", approved: "Mar 15, 2026 03:08 PM", status: "DELIVERED" },
];

const FILTERS = ["Pending", "Waiting for Delivery", "Delivered", "All"];

export default function OrderListPage() {
  const [, navigate] = useLocation();
  const [activeFilter, setActiveFilter] = useState("Pending");
  const [search, setSearch] = useState("");

  const filtered = ORDERS.filter(o => {
    const matchesSearch =
      search === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.service.toLowerCase().includes(search.toLowerCase()) ||
      o.type.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === "All") return true;
    if (activeFilter === "Pending") return o.status === "PENDING";
    if (activeFilter === "Waiting for Delivery") return o.status === "WAITING";
    if (activeFilter === "Delivered") return o.status === "DELIVERED";
    return true;
  });

  return (
    React.createElement(AppLayout, { withSidebar: true}
      , React.createElement('div', { className: "flex flex-col gap-6"  }

        , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     }
          , React.createElement('div', { className: "flex items-center gap-3"  }
            , React.createElement('div', { className: "p-2.5 bg-blue-50 rounded-xl border border-blue-100"    }
              , React.createElement(ClipboardList, { className: "w-6 h-6 text-blue-600"  } )
            )
            , React.createElement('div', {}
              , React.createElement('h1', { className: "text-2xl font-bold text-foreground"  }, "Order List" )
              , React.createElement('p', { className: "text-sm text-muted-foreground" }, "Track and manage your service orders"     )
            )
            , React.createElement(Badge, { className: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-sm font-bold px-3 py-1"       }, "Total: 134"

            )
          )
        )

        , React.createElement('div', { className: "bg-white rounded-2xl border shadow-sm flex flex-col overflow-hidden"      }

          /* Filter & Search Bar */
          , React.createElement('div', { className: "p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50"        }
            , React.createElement('div', { className: "flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar"        }
              , FILTERS.map(f => (
                React.createElement('button', {
                  key: f,
                  onClick: () => setActiveFilter(f),
                  className: `px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                    activeFilter === f
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}

                  , f
                )
              ))
            )

            , React.createElement('div', { className: "relative w-full md:w-64 shrink-0"   }
              , React.createElement(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"      } )
              , React.createElement(Input, {
                placeholder: "Search orders..." ,
                value: search,
                onChange: e => setSearch(e.target.value),
                className: "pl-9 bg-white w-full rounded-xl"   }
              )
            )
          )

          /* Table */
          , React.createElement('div', { className: "overflow-x-auto"}
            , React.createElement('table', { className: "w-full text-sm text-left"  }
              , React.createElement('thead', { className: "text-xs text-white bg-primary uppercase font-bold tracking-wider"     }
                , React.createElement('tr', {}
                  , React.createElement('th', { className: "px-4 py-4 whitespace-nowrap"  }, "Order No ▲"  )
                  , React.createElement('th', { className: "px-4 py-4 whitespace-nowrap"  }, "Order Type ▲"  )
                  , React.createElement('th', { className: "px-4 py-4 whitespace-nowrap"  }, "Service")
                  , React.createElement('th', { className: "px-4 py-4 whitespace-nowrap"  }, "Organization ▲" )
                  , React.createElement('th', { className: "px-4 py-4 whitespace-nowrap"  }, "User")
                  , React.createElement('th', { className: "px-4 py-4 whitespace-nowrap"  }, "Request Date ▲"  )
                  , React.createElement('th', { className: "px-4 py-4 whitespace-nowrap"  }, "Approved Date" )
                  , React.createElement('th', { className: "px-4 py-4 whitespace-nowrap text-center"   }, "Status")
                  , React.createElement('th', { className: "px-4 py-4 whitespace-nowrap text-center"   }, "Action")
                )
              )
              , React.createElement('tbody', { className: "divide-y divide-border/60" }
                , filtered.length === 0 ? (
                  React.createElement('tr', {}
                    , React.createElement('td', { colSpan: 9, className: "px-4 py-12 text-center text-muted-foreground"   }, "No orders found."

                    )
                  )
                ) : (
                  filtered.map((order) => (
                    React.createElement('tr', {
                      key: order.id,
                      onClick: () => navigate(`/orders/${order.id}`),
                      className: "hover:bg-blue-50/50 transition-colors cursor-pointer group"   }

                      , React.createElement('td', { className: "px-4 py-4" }
                        , React.createElement('span', { className: "font-mono text-xs font-semibold text-primary group-hover:underline"    }
                          , order.id
                        )
                      )
                      , React.createElement('td', { className: "px-4 py-4" }
                        , React.createElement(Badge, { variant: "outline", className: "bg-slate-50 text-slate-700 whitespace-nowrap"  }
                          , order.type
                        )
                      )
                      , React.createElement('td', { className: "px-4 py-4 font-medium text-slate-800 whitespace-nowrap"    }, order.service)
                      , React.createElement('td', { className: "px-4 py-4 text-xs max-w-[180px] truncate"    , title: order.org}
                        , order.org
                      )
                      , React.createElement('td', { className: "px-4 py-4 text-xs text-muted-foreground whitespace-nowrap"    }, order.user)
                      , React.createElement('td', { className: "px-4 py-4 text-xs whitespace-nowrap"   }, order.date)
                      , React.createElement('td', { className: "px-4 py-4 text-xs whitespace-nowrap text-slate-500"    }, order.approved || "-")
                      , React.createElement('td', { className: "px-4 py-4 text-center"  , onClick: e => e.stopPropagation()}
                        , React.createElement(Badge, {
                          variant: "outline",
                          className: `text-[10px] uppercase font-bold tracking-wider ${
                            order.status === "PENDING"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : order.status === "DELIVERED"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}

                          , order.status
                        )
                      )
                      , React.createElement('td', { className: "px-4 py-4 text-center"  , onClick: e => e.stopPropagation()}
                        , order.status === "PENDING" ? (
                          React.createElement(Button, {
                            variant: "ghost",
                            size: "sm",
                            className: "h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-semibold px-2"     }

                            , React.createElement(X, { className: "w-3 h-3 mr-1"  } ), " Cancel"
                          )
                        ) : (
                          React.createElement('span', { className: "text-slate-300"}, "-")
                        )
                      )
                    )
                  ))
                )
              )
            )
          )

          /* Pagination */
          , React.createElement('div', { className: "p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between bg-slate-50 text-sm gap-4"          }
            , React.createElement('p', { className: "text-muted-foreground font-medium" }, "Showing 1 to 10 of 134 results"      )
            , React.createElement('div', { className: "flex items-center gap-1"  }
              , React.createElement(Button, { variant: "outline", size: "sm", className: "h-8 bg-white" , disabled: true}
                , React.createElement(ChevronLeft, { className: "w-4 h-4 mr-1"  } ), " Previous"
              )
              , React.createElement('div', { className: "hidden sm:flex items-center gap-1 px-2"    }
                , [1, 2, 3, 4, 5].map(p => (
                  React.createElement(Button, {
                    key: p,
                    variant: "outline",
                    size: "sm",
                    className: `h-8 w-8 p-0 font-medium ${
                      p === 1 ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground font-bold" : "bg-white"
                    }`}

                    , p
                  )
                ))
                , React.createElement('span', { className: "px-1 text-muted-foreground" }, "...")
                , React.createElement(Button, { variant: "outline", size: "sm", className: "h-8 w-8 p-0 bg-white font-medium"    }, "14")
              )
              , React.createElement(Button, { variant: "outline", size: "sm", className: "h-8 bg-white font-medium"  }, "Next "
                 , React.createElement(ChevronRight, { className: "w-4 h-4 ml-1"  } )
              )
            )
          )
        )

      )
    )
  );
}
