import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Link, useParams } from "wouter";
import { ChevronRight, Cloud, Eye, Pencil, Server, Mail, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const PACKAGES = [
  { id: "1", type: "VPS", name: "Basic", status: "ACTIVATED", feature: "2 vCPU, 4 GB RAM, 100 GB Storage", detail: "20260311-NDC-00075-493", extras: "VM Name: vm-01gps, Private IP: 172.168.3.9", fee: "5,000", requested: "Mar 11, 2026 01:38 PM", activated: "Mar 12, 2026 09:03 AM" },
  { id: "2", type: "Email", name: "Standard", status: "DEACTIVATED", feature: "N/A", detail: "20260305-NDC-00075-460", extras: "N/A", fee: "2,400", requested: "Mar 5, 2026 12:05 PM", activated: "Mar 5, 2026 12:07 PM" },
  { id: "3", type: "Email", name: "Standard", status: "ACTIVATED", feature: "N/A", detail: "20260305-NDC-00075-459", extras: "N/A", fee: "3,000", requested: "Mar 5, 2026 10:19 AM", activated: "Mar 5, 2026 10:20 AM" },
  { id: "4", type: "VPS", name: "Basic", status: "ACTIVATED", feature: "2 vCPU, 4 GB RAM", detail: "20260311-NDC-00075-492", extras: "VM Name: vm-05gs, 172.3.6.9", fee: "5,000", requested: "Mar 11, 2026 01:37 PM", activated: "Mar 15, 2026 11:53 AM" },
  { id: "5", type: "Email", name: "Standard", status: "ACTIVATED", feature: "N/A", detail: "20260302-NDC-00075-454", extras: "N/A", fee: "3,020", requested: "Mar 2, 2026 02:10 PM", activated: "Mar 2, 2026 02:11 PM" },
  { id: "6", type: "VPS", name: "Advanced", status: "ACTIVATED", feature: "4 vCPU, 12 GB RAM", detail: "20260301-NDC-00075-450", extras: "VM Name: vm-adv1", fee: "15,000", requested: "Mar 1, 2026 09:00 AM", activated: "Mar 1, 2026 10:00 AM" },
  { id: "7", type: "VPS", name: "Standard", status: "ACTIVATED", feature: "4 vCPU, 8 GB RAM", detail: "20260228-NDC-00075-445", extras: "VM Name: vm-std1", fee: "10,000", requested: "Feb 28, 2026 11:30 AM", activated: "Feb 28, 2026 12:45 PM" },
  { id: "8", type: "Email", name: "Basic", status: "ACTIVATED", feature: "N/A", detail: "20260225-NDC-00075-440", extras: "N/A", fee: "1,200", requested: "Feb 25, 2026 03:15 PM", activated: "Feb 25, 2026 03:30 PM" },
  { id: "9", type: "VPS", name: "Premium", status: "PENDING", feature: "8 vCPU, 16 GB RAM", detail: "20260315-NDC-00075-500", extras: "Pending Allocation", fee: "20,000", requested: "Mar 15, 2026 08:20 AM", activated: "-" },
  { id: "10", type: "Email", name: "Premium", status: "ACTIVATED", feature: "N/A", detail: "20260220-NDC-00075-430", extras: "N/A", fee: "5,000", requested: "Feb 20, 2026 10:00 AM", activated: "Feb 20, 2026 10:15 AM" },
];

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const [packagesOpen, setPackagesOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(true);

  return (
    React.createElement(AppLayout, { withSidebar: true}
      , React.createElement('div', { className: "flex flex-col gap-6 max-w-[1400px] mx-auto"    }

        /* Breadcrumb */
        , React.createElement('div', { className: "flex items-center text-sm font-medium text-muted-foreground gap-2"     }
          , React.createElement(Link, { href: "/contracts", className: "hover:text-primary transition-colors" }, "Contracts")
          , React.createElement(ChevronRight, { className: "w-4 h-4" } )
          , React.createElement('span', { className: "text-foreground"}, "Service Details" )
        )

        /* Header Card */
        , React.createElement('div', { className: "bg-white rounded-2xl border border-border shadow-sm p-6 relative overflow-hidden"       }
          , React.createElement('div', { className: "absolute top-0 left-0 w-2 h-full bg-primary"     } )
          , React.createElement('div', { className: "absolute top-6 right-6"  }
            , React.createElement(Badge, { variant: "outline", className: "font-mono text-xs border-primary/20 bg-primary/5 text-primary px-3 py-1"      }, "NDC-00075")
          )

          , React.createElement('div', { className: "flex flex-col gap-4"  }
            , React.createElement('h1', { className: "text-2xl font-bold text-primary flex items-center gap-3"     }
              , React.createElement(Cloud, { className: "w-7 h-7" } ), " " , serviceId || "SID-00075", " Cloud"
            )

            , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   }
              , React.createElement('div', {}
                , React.createElement('p', { className: "text-sm font-medium text-muted-foreground mb-1"   }, "Project Name" )
                , React.createElement('p', { className: "font-bold text-foreground" }, "EPLOT Service Management System"   )
                , React.createElement('p', { className: "text-sm text-slate-600 mt-1"  }, "Rajdhani Unnayan Kartipakkha (RAJUK), Ministry of Housing and Public Works"         )
              )
              , React.createElement('div', { className: "flex gap-8 md:justify-end md:text-right"   }
                , React.createElement('div', {}
                  , React.createElement('p', { className: "text-sm font-medium text-muted-foreground mb-1"   }, "Start Date" )
                  , React.createElement('p', { className: "font-bold text-foreground" }, "5/18/2023")
                )
                , React.createElement('div', {}
                  , React.createElement('p', { className: "text-sm font-medium text-muted-foreground mb-1"   }, "End Date" )
                  , React.createElement('p', { className: "font-bold text-foreground" }, "12/31/2040")
                )
              )
            )
          )
        )

        /* Resources / Packages Collapsible */
        , React.createElement(Collapsible, { open: packagesOpen, onOpenChange: setPackagesOpen, className: "bg-white rounded-2xl border border-border shadow-sm overflow-hidden"     }
          , React.createElement(CollapsibleTrigger, { className: "w-full p-5 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors border-b"        }
            , React.createElement('div', { className: "text-left"}
              , React.createElement('h2', { className: "text-lg font-bold text-foreground"  }, "Resource Packages" )
              , React.createElement('p', { className: "text-sm text-muted-foreground mt-0.5"  }, "Manage and view your assigned cloud resource packages"       )
            )
            , React.createElement('div', { className: "flex items-center gap-4"  }
              , React.createElement('span', { className: "text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full"      }, "Your Packages (189)"  )
              , React.createElement(ChevronRight, { className: `w-5 h-5 text-muted-foreground transition-transform duration-300 ${packagesOpen ? 'rotate-90' : ''}`} )
            )
          )

          , React.createElement(CollapsibleContent, { className: "p-0 animate-in slide-in-from-top-2 fade-in-20 duration-300"    }
            , React.createElement('div', { className: "overflow-x-auto"}
              , React.createElement('table', { className: "w-full text-sm text-left"  }
                , React.createElement('thead', { className: "text-xs text-white bg-primary uppercase font-bold tracking-wider"     }
                  , React.createElement('tr', {}
                    , React.createElement('th', { className: "px-5 py-4 w-[280px]"  }, "Package Info" )
                    , React.createElement('th', { className: "px-5 py-4" }, "Feature")
                    , React.createElement('th', { className: "px-5 py-4" }, "Package Details" )
                    , React.createElement('th', { className: "px-5 py-4" }, "Total Monthly Fee"  )
                    , React.createElement('th', { className: "px-5 py-4" }, "Requested")
                    , React.createElement('th', { className: "px-5 py-4" }, "Activated")
                    , React.createElement('th', { className: "px-5 py-4 text-center"  }, "Actions")
                  )
                )
                , React.createElement('tbody', { className: "divide-y divide-border/60" }
                  , PACKAGES.map((pkg) => (
                    React.createElement('tr', { key: pkg.id, className: "hover:bg-slate-50/50 transition-colors group"  }
                      , React.createElement('td', { className: "px-5 py-4" }
                        , React.createElement('div', { className: "flex items-start gap-3"  }
                          , React.createElement('div', { className: `p-2 rounded-lg mt-0.5 shrink-0 ${pkg.type === 'VPS' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}
                            , pkg.type === 'VPS' ? React.createElement(Server, { className: "w-4 h-4" } ) : React.createElement(Mail, { className: "w-4 h-4" } )
                          )
                          , React.createElement('div', {}
                            , React.createElement('p', { className: "font-semibold text-foreground" }, pkg.type === 'VPS' ? 'Virtual Private Server (VPS)' : 'Email Service')
                            , React.createElement('p', { className: "text-xs font-medium text-slate-500 mb-2"   }, pkg.name)
                            , React.createElement(Badge, { variant: "outline", className: `text-[10px] uppercase ${
                              pkg.status === 'ACTIVATED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                              pkg.status === 'DEACTIVATED' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                              'bg-amber-50 text-amber-700 border-amber-200'
                            }`}, pkg.status)
                          )
                        )
                      )
                      , React.createElement('td', { className: "px-5 py-4 align-top pt-5"   }
                        , pkg.feature !== "N/A" ? (
                          React.createElement(Badge, { variant: "secondary", className: "bg-primary/5 text-primary border-primary/20 font-medium whitespace-nowrap"    }
                            , pkg.feature
                          )
                        ) : (
                          React.createElement('span', { className: "text-xs text-muted-foreground bg-slate-100 px-2 py-1 rounded"     }, "N/A")
                        )
                      )
                      , React.createElement('td', { className: "px-5 py-4 align-top pt-5"   }
                        , React.createElement(Badge, { variant: "outline", className: "font-mono text-xs mb-2 bg-slate-50"   }, pkg.detail)
                        , pkg.extras !== "N/A" && (
                          React.createElement('p', { className: "text-xs text-muted-foreground mt-1 max-w-[180px] truncate"    , title: pkg.extras}, pkg.extras)
                        )
                      )
                      , React.createElement('td', { className: "px-5 py-4 align-top pt-5"   }
                        , React.createElement('span', { className: "font-bold text-emerald-600 whitespace-nowrap"  }, "BDT " , pkg.fee)
                      )
                      , React.createElement('td', { className: "px-5 py-4 align-top pt-5 text-xs text-slate-600"     }
                        , pkg.requested
                      )
                      , React.createElement('td', { className: "px-5 py-4 align-top pt-5 text-xs text-slate-600"     }
                        , pkg.activated
                      )
                      , React.createElement('td', { className: "px-5 py-4 align-top pt-5 text-center"    }
                        , React.createElement(Link, { href: `/resources/${pkg.id}`}
                          , React.createElement(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary"    }
                            , React.createElement(Eye, { className: "w-4 h-4" } )
                          )
                        )
                      )
                    )
                  ))
                )
              )
            )

            /* Pagination */
            , React.createElement('div', { className: "p-4 border-t border-border flex items-center justify-between bg-slate-50 text-sm"       }
              , React.createElement('p', { className: "text-muted-foreground"}, "Showing 1 to 10 of 189 results"      )
              , React.createElement('div', { className: "flex items-center gap-1"  }
                , React.createElement(Button, { variant: "outline", size: "sm", className: "h-8", disabled: true}, React.createElement(ChevronLeft, { className: "w-4 h-4 mr-1"  } ), " Previous" )
                , React.createElement('div', { className: "flex items-center gap-1 px-2 hidden md:flex"     }
                  , React.createElement(Button, { variant: "outline", size: "sm", className: "h-8 w-8 p-0 bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"       }, "1")
                  , React.createElement(Button, { variant: "outline", size: "sm", className: "h-8 w-8 p-0"  }, "2")
                  , React.createElement(Button, { variant: "outline", size: "sm", className: "h-8 w-8 p-0"  }, "3")
                  , React.createElement('span', { className: "px-2 text-muted-foreground" }, "...")
                  , React.createElement(Button, { variant: "outline", size: "sm", className: "h-8 w-8 p-0"  }, "19")
                )
                , React.createElement(Button, { variant: "outline", size: "sm", className: "h-8"}, "Next " , React.createElement(ChevronRight, { className: "w-4 h-4 ml-1"  } ))
              )
            )
          )
        )

        /* Service Users Collapsible */
        , React.createElement(Collapsible, { open: usersOpen, onOpenChange: setUsersOpen, className: "bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-8"      }
          , React.createElement(CollapsibleTrigger, { className: "w-full p-5 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors border-b"        }
            , React.createElement('div', { className: "text-left"}
              , React.createElement('h2', { className: "text-lg font-bold text-foreground"  }, "Service Users" )
              , React.createElement('p', { className: "text-sm text-muted-foreground mt-0.5"  }, "Manage billing and technical contacts for this service"       )
            )
            , React.createElement(ChevronRight, { className: `w-5 h-5 text-muted-foreground transition-transform duration-300 ${usersOpen ? 'rotate-90' : ''}`} )
          )

          , React.createElement(CollapsibleContent, { className: "p-6 animate-in slide-in-from-top-2 fade-in-20 duration-300"    }
            , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"    }

              , React.createElement(Card, { className: "relative group border-primary/20 bg-primary/5"   }
                , React.createElement(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2 h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity"        }
                  , React.createElement(Pencil, { className: "w-4 h-4" } )
                )
                , React.createElement(CardContent, { className: "p-5 pt-6" }
                  , React.createElement(Badge, { variant: "outline", className: "mb-3 bg-white" }, "Primary Billing" )
                  , React.createElement('p', { className: "font-bold text-foreground text-lg mb-1"   }, "Md. Jamal Uddin"  )
                  , React.createElement('p', { className: "text-xs text-muted-foreground mb-3 font-medium"   }, "Deputy Director Finance & Accounts"    )
                  , React.createElement('div', { className: "space-y-1.5 text-sm" }
                    , React.createElement('p', { className: "flex items-center gap-2 text-slate-600"   }, React.createElement(Mail, { className: "w-3.5 h-3.5" } ), " ddflinance@rajuk.gov.bd" )
                  )
                )
              )

              , React.createElement(Card, { className: "relative group" }
                , React.createElement(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2 h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity"        }
                  , React.createElement(Pencil, { className: "w-4 h-4" } )
                )
                , React.createElement(CardContent, { className: "p-5 pt-6" }
                  , React.createElement(Badge, { variant: "secondary", className: "mb-3"}, "Secondary Billing" )
                  , React.createElement('p', { className: "font-bold text-foreground text-lg mb-1"   }, "Md. Abu Kawser Mollik"   )
                  , React.createElement('p', { className: "text-xs text-muted-foreground mb-3 font-medium"   }, "Director Finance" )
                  , React.createElement('div', { className: "space-y-1.5 text-sm" }
                    , React.createElement('p', { className: "flex items-center gap-2 text-slate-600"   }, React.createElement(Mail, { className: "w-3.5 h-3.5" } ), " drfin@rajuk.gov.bd" )
                    , React.createElement('p', { className: "flex items-center gap-2 text-slate-600"   }, React.createElement('span', null, "📱"), " +8801777775514" )
                  )
                )
              )

              , React.createElement(Card, { className: "relative group border-primary/20 bg-primary/5"   }
                , React.createElement(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2 h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity"        }
                  , React.createElement(Pencil, { className: "w-4 h-4" } )
                )
                , React.createElement(CardContent, { className: "p-5 pt-6" }
                  , React.createElement(Badge, { variant: "outline", className: "mb-3 bg-white" }, "Primary Technical" )
                  , React.createElement('p', { className: "font-bold text-foreground text-lg mb-1"   }, "Kaji M. Mahabubul Hoque"   )
                  , React.createElement('p', { className: "text-xs text-muted-foreground mb-3 font-medium"   }, "Senior System analyst"  )
                  , React.createElement('div', { className: "space-y-1.5 text-sm" }
                    , React.createElement('p', { className: "flex items-center gap-2 text-slate-600"   }, React.createElement(Mail, { className: "w-3.5 h-3.5" } ), " saa@rajuk.gov.bd" )
                  )
                )
              )

              , React.createElement(Card, { className: "relative group" }
                , React.createElement(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2 h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity"        }
                  , React.createElement(Pencil, { className: "w-4 h-4" } )
                )
                , React.createElement(CardContent, { className: "p-5 pt-6" }
                  , React.createElement(Badge, { variant: "secondary", className: "mb-3"}, "Secondary Technical" )
                  , React.createElement('p', { className: "font-bold text-foreground text-lg mb-1"   }, "Lutfor Rahman" )
                  , React.createElement('p', { className: "text-xs text-muted-foreground mb-3 font-medium"   }, "Programmer")
                  , React.createElement('div', { className: "space-y-1.5 text-sm" }
                    , React.createElement('p', { className: "flex items-center gap-2 text-slate-600"   }, React.createElement(Mail, { className: "w-3.5 h-3.5" } ), " programmer@rajuk.gov.bd" )
                    , React.createElement('p', { className: "flex items-center gap-2 text-slate-600"   }, React.createElement('span', null, "📱"), " +8801554001971" )
                  )
                )
              )

            )
          )
        )

      )
    )
  );
}
