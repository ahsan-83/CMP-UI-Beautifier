 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { Search, Filter, MoreHorizontal, ArrowRight, Activity, Clock, CheckCircle, XCircle } from "lucide-react";
import { useServiceRequests, useUpdateServiceStatus } from "@/hooks/use-dashboard";
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

const StatusBadge = ({ status }) => {
  const configs = {
    Pending: { bg: "bg-amber-50", text: "text-amber-700", icon: Clock },
    Active: { bg: "bg-blue-50", text: "text-blue-700", icon: Activity },
    Completed: { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle },
    Rejected: { bg: "bg-rose-50", text: "text-rose-700", icon: XCircle },
  };

  const config = configs[status] || configs.Pending;
  const Icon = config.icon;

  return (
    React.createElement('span', { className: cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm border border-black/5", config.bg, config.text)}
      , React.createElement(Icon, { className: "w-3.5 h-3.5" } )
      , status
    )
  );
};

export function ServicesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: services, isLoading } = useServiceRequests();
  const updateStatus = useUpdateServiceStatus();
  const { toast } = useToast();

  const handleStatusChange = (id, newStatus) => {
    updateStatus.mutate({ id, status: newStatus }, {
      onSuccess: () => {
        toast({
          title: "Status Updated",
          description: `Service request ${id} is now ${newStatus}.`,
        });
      }
    });
  };

  const filteredServices = _optionalChain([services, 'optionalAccess', _2 => _2.filter, 'call', _3 => _3(s => 
    s.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.applicant.toLowerCase().includes(searchTerm.toLowerCase())
  )]);

  return (
    React.createElement('div', { className: "bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden flex flex-col"       }
      /* Table Header Controls */
      , React.createElement('div', { className: "p-6 border-b border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50"          }
        , React.createElement('div', {}
          , React.createElement('h3', { className: "text-lg font-bold text-foreground"  }, "Recent Service Requests"  )
          , React.createElement('p', { className: "text-sm text-muted-foreground mt-1"  }, "Manage and track application statuses"    )
        )

        , React.createElement('div', { className: "flex items-center gap-3 w-full sm:w-auto"    }
          , React.createElement('div', { className: "relative flex-1 sm:w-64"  }
            , React.createElement(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"      } )
            , React.createElement('input', { 
              type: "text", 
              placeholder: "Search services..." , 
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "w-full pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"             }
            )
          )
          , React.createElement('button', { className: "p-2 bg-white border border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-sm"         }
            , React.createElement(Filter, { className: "w-4 h-4" } )
          )
        )
      )

      /* Table Content */
      , React.createElement('div', { className: "overflow-x-auto"}
        , React.createElement('table', { className: "w-full text-sm text-left"  }
          , React.createElement('thead', { className: "text-xs text-muted-foreground bg-slate-50 border-b border-border uppercase font-semibold"      }
            , React.createElement('tr', {}
              , React.createElement('th', { className: "px-6 py-4" }, "Request ID" )
              , React.createElement('th', { className: "px-6 py-4" }, "Service Details" )
              , React.createElement('th', { className: "px-6 py-4" }, "Applicant")
              , React.createElement('th', { className: "px-6 py-4" }, "Status")
              , React.createElement('th', { className: "px-6 py-4" }, "Date")
              , React.createElement('th', { className: "px-6 py-4 text-right"  }, "Actions")
            )
          )
          , React.createElement('tbody', { className: "divide-y divide-border/50" }
            , isLoading ? (
              // Loading State Skeleton
              Array.from({ length: 5 }).map((_, i) => (
                React.createElement('tr', { key: i, className: "animate-pulse"}
                  , React.createElement('td', { className: "px-6 py-5" }, React.createElement('div', { className: "h-4 bg-slate-200 rounded w-24"   }))
                  , React.createElement('td', { className: "px-6 py-5" }
                    , React.createElement('div', { className: "h-4 bg-slate-200 rounded w-48 mb-2"    })
                    , React.createElement('div', { className: "h-3 bg-slate-100 rounded w-32"   })
                  )
                  , React.createElement('td', { className: "px-6 py-5" }, React.createElement('div', { className: "h-4 bg-slate-200 rounded w-32"   }))
                  , React.createElement('td', { className: "px-6 py-5" }, React.createElement('div', { className: "h-6 bg-slate-200 rounded-full w-20"   }))
                  , React.createElement('td', { className: "px-6 py-5" }, React.createElement('div', { className: "h-4 bg-slate-200 rounded w-24"   }))
                  , React.createElement('td', { className: "px-6 py-5 text-right"  }, React.createElement('div', { className: "h-8 bg-slate-200 rounded w-8 ml-auto"    }))
                )
              ))
            ) : _optionalChain([filteredServices, 'optionalAccess', _4 => _4.length]) === 0 ? (
              React.createElement('tr', {}
                , React.createElement('td', { colSpan: 6, className: "px-6 py-12 text-center text-muted-foreground"   }
                  , React.createElement('div', { className: "flex flex-col items-center justify-center"   }
                    , React.createElement(Search, { className: "w-10 h-10 text-slate-300 mb-3"   } )
                    , React.createElement('p', { className: "text-base font-medium text-slate-600"  }, "No requests found"  )
                    , React.createElement('p', { className: "text-sm mt-1" }, "Try adjusting your search query."    )
                  )
                )
              )
            ) : (
              _optionalChain([filteredServices, 'optionalAccess', _5 => _5.map, 'call', _6 => _6((service) => (
                React.createElement('tr', { 
                  key: service.id, 
                  className: "hover:bg-slate-50/80 transition-colors group"  }

                  , React.createElement('td', { className: "px-6 py-4 font-mono text-xs font-semibold text-primary"     }, service.id)
                  , React.createElement('td', { className: "px-6 py-4" }
                    , React.createElement('p', { className: "font-semibold text-foreground" }, service.serviceName)
                    , React.createElement('p', { className: "text-xs text-muted-foreground mt-0.5"  }, service.provider)
                  )
                  , React.createElement('td', { className: "px-6 py-4 font-medium text-slate-700"   }, service.applicant)
                  , React.createElement('td', { className: "px-6 py-4" }
                    , React.createElement(StatusBadge, { status: service.status} )
                  )
                  , React.createElement('td', { className: "px-6 py-4 text-muted-foreground"  }
                    , format(new Date(service.createdAt), "MMM d, yyyy")
                  )
                  , React.createElement('td', { className: "px-6 py-4 text-right"  }
                    , React.createElement(DropdownMenu, {}
                      , React.createElement(DropdownMenuTrigger, { className: "p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors focus:outline-none"      }
                        , React.createElement(MoreHorizontal, { className: "w-5 h-5" } )
                      )
                      , React.createElement(DropdownMenuContent, { align: "end", className: "w-48 p-2 rounded-xl shadow-xl border-border/50"    }
                        , React.createElement(DropdownMenuLabel, { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider"    }, "Change Status" )
                        , React.createElement(DropdownMenuSeparator)
                        , React.createElement(DropdownMenuItem, { onClick: () => handleStatusChange(service.id, "Active"), className: "cursor-pointer font-medium text-blue-600 focus:bg-blue-50 focus:text-blue-700"    }
                          , React.createElement(Activity, { className: "w-4 h-4 mr-2"  } ), " Mark Active"
                        )
                        , React.createElement(DropdownMenuItem, { onClick: () => handleStatusChange(service.id, "Completed"), className: "cursor-pointer font-medium text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700"    }
                          , React.createElement(CheckCircle, { className: "w-4 h-4 mr-2"  } ), " Mark Completed"
                        )
                        , React.createElement(DropdownMenuItem, { onClick: () => handleStatusChange(service.id, "Rejected"), className: "cursor-pointer font-medium text-rose-600 focus:bg-rose-50 focus:text-rose-700"    }
                          , React.createElement(XCircle, { className: "w-4 h-4 mr-2"  } ), " Reject Request"
                        )
                        , React.createElement(DropdownMenuSeparator)
                        , React.createElement(DropdownMenuItem, { className: "cursor-pointer font-medium text-slate-700"  }, "View Details "
                            , React.createElement(ArrowRight, { className: "w-4 h-4 ml-auto"  } )
                        )
                      )
                    )
                  )
                )
              ))])
            )
          )
        )
      )

      /* Table Footer / Pagination mock */
      , React.createElement('div', { className: "p-4 border-t border-border/50 bg-slate-50 flex items-center justify-between text-sm text-muted-foreground"        }
        , React.createElement('p', null, "Showing " , React.createElement('span', { className: "font-medium text-foreground" }, _optionalChain([filteredServices, 'optionalAccess', _7 => _7.length]) || 0), " results" )
        , React.createElement('div', { className: "flex gap-2" }
          , React.createElement('button', { className: "px-3 py-1.5 border border-border rounded-lg bg-white hover:bg-slate-50 hover:text-foreground transition-colors disabled:opacity-50"         }, "Previous")
          , React.createElement('button', { className: "px-3 py-1.5 border border-border rounded-lg bg-white hover:bg-slate-50 hover:text-foreground transition-colors disabled:opacity-50"         }, "Next")
        )
      )
    )
  );
}
