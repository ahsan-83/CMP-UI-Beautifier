 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Trash2, FileText, ChevronRight, Check, Upload, ShoppingCart, BarChart2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

/* ─── File drop zone ──────────────────────────────────── */

function ApprovalDropZone({ file, onFile }) {
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
      onClick: () => _optionalChain([inputRef, 'access', _ => _.current, 'optionalAccess', _2 => _2.click, 'call', _3 => _3()]),
      className: `border-2 border-dashed rounded-lg py-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
        dragging ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary/50 hover:bg-slate-50"
      }`}

      , React.createElement('input', { ref: inputRef, type: "file", className: "hidden",
        onChange: e => { if (_optionalChain([e, 'access', _4 => _4.target, 'access', _5 => _5.files, 'optionalAccess', _6 => _6[0]])) onFile(e.target.files[0]); }} )
      , React.createElement(Upload, { className: "w-4 h-4 text-slate-400"  } )
      , file
        ? React.createElement('p', { className: "text-sm font-medium text-primary"  }, file.name)
        : React.createElement('p', { className: "text-sm text-slate-500" }, "Drag & Drop file here or"
                 , " "
            , React.createElement('span', { className: "text-primary font-semibold underline"  }, "Browse")
          )
      
    )
  );
}

/* ─── Email Pricing Dialog ────────────────────────────── */

const EMAIL_PRICING_ROWS = [
  { attribute: "No of Email Accounts", qty: 10, unitFee: 100, total: 1000 },
];

function EmailPricingDialog({ open, onOpenChange }) {
  const grandTotal = EMAIL_PRICING_ROWS.reduce((sum, r) => sum + r.total, 0);
  return (
    React.createElement(Dialog, { open: open, onOpenChange: onOpenChange}
      , React.createElement(DialogContent, { className: "max-w-lg p-0 gap-0 overflow-hidden rounded-xl"    }
        , React.createElement(DialogHeader, { className: "bg-primary px-6 py-4"  }
          , React.createElement(DialogTitle, { className: "text-white text-lg font-bold"  }, "Email Service Pricing"  )
        )

        , React.createElement('div', { className: "p-5 bg-white" }
          , React.createElement('div', { className: "overflow-hidden rounded-lg border border-slate-200"   }
            , React.createElement('table', { className: "w-full text-sm text-left"  }
              , React.createElement('thead', { className: "bg-slate-50 text-xs text-slate-600 uppercase font-bold border-b border-slate-200"      }
                , React.createElement('tr', {}
                  , React.createElement('th', { className: "px-4 py-3" }, "Attribute")
                  , React.createElement('th', { className: "px-4 py-3 text-center"  }, "Quantity")
                  , React.createElement('th', { className: "px-4 py-3 text-center"  }, "Monthly Unit Fee"  )
                  , React.createElement('th', { className: "px-4 py-3 text-right"  }, "Total Fee" )
                )
              )
              , React.createElement('tbody', { className: "divide-y divide-slate-100" }
                , EMAIL_PRICING_ROWS.map((row, i) => (
                  React.createElement('tr', { key: i, className: "hover:bg-slate-50/50"}
                    , React.createElement('td', { className: "px-4 py-3.5 font-medium text-slate-700"   }, row.attribute)
                    , React.createElement('td', { className: "px-4 py-3.5 text-center"  }
                      , React.createElement('span', { className: "inline-block bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 rounded"       }
                        , row.qty
                      )
                    )
                    , React.createElement('td', { className: "px-4 py-3.5 text-center font-bold text-emerald-600"    }, "৳ " , row.unitFee)
                    , React.createElement('td', { className: "px-4 py-3.5 text-right font-bold text-primary"    }, "৳ " , row.total.toLocaleString())
                  )
                ))
                /* Total Price row */
                , React.createElement('tr', { className: "bg-slate-50/80"}
                  , React.createElement('td', { className: "px-4 py-3.5 font-bold text-slate-800"   }, "Total Price" )
                  , React.createElement('td', { className: "px-4 py-3.5 text-center text-slate-400 font-medium"    }, "-")
                  , React.createElement('td', { className: "px-4 py-3.5 text-center text-slate-400 font-medium"    }, "-")
                  , React.createElement('td', { className: "px-4 py-3.5 text-right font-bold text-primary text-base"     }, "৳ " , grandTotal.toLocaleString())
                )
              )
            )
          )
        )

        , React.createElement(DialogFooter, { className: "px-5 pb-5 bg-white flex justify-end"    }
          , React.createElement(Button, {
            onClick: () => onOpenChange(false),
            className: "bg-primary hover:bg-primary/90 text-white font-semibold px-6"    }
, "Close"

          )
        )
      )
    )
  );
}

/* ─── Remove Item Dialog ──────────────────────────────── */

function RemoveDialog({ open, onOpenChange, onConfirm }



) {
  return (
    React.createElement(Dialog, { open: open, onOpenChange: onOpenChange}
      , React.createElement(DialogContent, { className: "max-w-sm p-0 gap-0 overflow-hidden rounded-xl"    }
        , React.createElement(DialogHeader, { className: "bg-primary px-6 py-4"  }
          , React.createElement(DialogTitle, { className: "text-white text-base font-bold"  }, "Remove Item" )
        )
        , React.createElement('div', { className: "px-6 py-5 bg-white"  }
          , React.createElement('p', { className: "text-sm text-slate-600 leading-relaxed"  }, "Are you sure you want to remove this item from your wishlist?"
                       , React.createElement('br'), "This action cannot be undone."

          )
        )
        , React.createElement(DialogFooter, { className: "px-6 pb-5 bg-white flex justify-end gap-2"     }
          , React.createElement(Button, { variant: "outline", onClick: () => onOpenChange(false)}, "Cancel")
          , React.createElement(Button, {
            onClick: () => { onConfirm(); onOpenChange(false); },
            className: "bg-rose-600 hover:bg-rose-700 text-white font-semibold"   }
, "Confirm"

          )
        )
      )
    )
  );
}

/* ─── Checkout Dialog ─────────────────────────────────── */

function CheckoutDialog({ open, onOpenChange }) {
  const { toast } = useToast();
  const [approvalFile, setApprovalFile] = useState(null);

  const SELECTED = [
    { service: "Email Service", pkg: "Standard", total: 1050 },
    { service: "Email Service", pkg: "Standard", total: 1050 },
  ];
  const subtotal = 1000;
  const totalAmount = 1050;

  const handleConfirm = () => {
    onOpenChange(false);
    toast({ title: "Order Confirmed!", description: "Your order has been placed successfully." });
  };

  return (
    React.createElement(Dialog, { open: open, onOpenChange: onOpenChange}
      , React.createElement(DialogContent, { className: "max-w-2xl p-0 gap-0 overflow-hidden rounded-2xl"    }

        /* Gradient Header */
        , React.createElement('div', { className: "bg-gradient-to-r from-primary to-purple-600 px-6 py-5 text-white"     }
          , React.createElement('h2', { className: "text-xl font-bold" }, "Checkout Wishlist" )
          , React.createElement('p', { className: "text-sm text-white/80 mt-1"  }, "Assign contract and service for your selected resources"       )
        )

        /* Body: two columns */
        , React.createElement('div', { className: "flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 max-h-[70vh] overflow-hidden"        }

          /* Left column */
          , React.createElement('div', { className: "flex-1 overflow-y-auto p-6 space-y-5 bg-white"    }

            /* Select Contract 1 */
            , React.createElement('div', { className: "space-y-1.5"}
              , React.createElement(Label, { className: "text-sm font-bold flex items-center gap-2"    }
                , React.createElement(FileText, { className: "w-4 h-4 text-primary"  } ), " Select Contract"
              )
              , React.createElement(Select, {}
                , React.createElement(SelectTrigger, { className: "bg-white"}
                  , React.createElement(SelectValue, { placeholder: "Choose a contract..."  } )
                )
                , React.createElement(SelectContent, {}
                  , React.createElement(SelectItem, { value: "ndc-00075"}, "NDC-00075")
                  , React.createElement(SelectItem, { value: "ndc-00076"}, "NDC-00076")
                )
              )
            )

            /* Select Contract 2 */
            , React.createElement('div', { className: "space-y-1.5"}
              , React.createElement(Label, { className: "text-sm font-bold flex items-center gap-2"    }
                , React.createElement(FileText, { className: "w-4 h-4 text-primary"  } ), " Select Contract"
              )
              , React.createElement(Select, {}
                , React.createElement(SelectTrigger, { className: "bg-white"}
                  , React.createElement(SelectValue, { placeholder: "Choose a contract..."  } )
                )
                , React.createElement(SelectContent, {}
                  , React.createElement(SelectItem, { value: "ndc-00075"}, "NDC-00075")
                  , React.createElement(SelectItem, { value: "ndc-00076"}, "NDC-00076")
                )
              )
            )

            /* Select Service */
            , React.createElement('div', { className: "space-y-1.5"}
              , React.createElement(Label, { className: "text-sm font-bold flex items-center gap-2"    }
                , React.createElement(ShoppingCart, { className: "w-4 h-4 text-primary"  } ), " Select Service"
              )
              , React.createElement(Select, { disabled: true}
                , React.createElement(SelectTrigger, { className: "bg-slate-50 text-slate-400" }
                  , React.createElement(SelectValue, { placeholder: "Select contract first"  } )
                )
                , React.createElement(SelectContent, {}
                  , React.createElement(SelectItem, { value: "email"}, "Email Service" )
                )
              )
            )

            /* Order Summary box */
            , React.createElement('div', { className: "bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2"     }
              , React.createElement('h4', { className: "font-bold text-sm text-foreground flex items-center gap-2"     }
                , React.createElement('div', { className: "w-5 h-5 rounded bg-primary/10 flex items-center justify-center"      }
                  , React.createElement(ShoppingCart, { className: "w-3 h-3 text-primary"  } )
                ), "Order Summary"

              )
              , React.createElement('div', { className: "flex justify-between text-sm"  }
                , React.createElement('span', { className: "text-slate-500"}, "Items in cart:"  )
                , React.createElement('span', { className: "font-semibold"}, "1")
              )
              , React.createElement('div', { className: "flex justify-between text-sm"  }
                , React.createElement('span', { className: "text-slate-500"}, "Total amount:" )
                , React.createElement('span', { className: "font-bold text-primary" }, "৳ " , totalAmount.toLocaleString(), ".00")
              )
            )

            /* Approval file upload */
            , React.createElement('div', { className: "space-y-2"}
              , React.createElement('p', { className: "text-xs text-rose-500 font-medium"  }, "* Please submit official approval letter for this order"

              )
              , React.createElement(ApprovalDropZone, { file: approvalFile, onFile: setApprovalFile} )
            )
          )

          /* Right column */
          , React.createElement('div', { className: "w-full md:w-64 lg:w-72 shrink-0 overflow-y-auto p-5 bg-slate-50/50 space-y-4"       }
            , SELECTED.map((item, i) => (
              React.createElement('div', { key: i, className: "space-y-3"}
                /* Section header */
                , React.createElement('div', { className: "flex items-center gap-2"  }
                  , React.createElement('div', { className: "w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"      }
                    , React.createElement(ShoppingCart, { className: "w-3 h-3 text-primary"  } )
                  )
                  , React.createElement('span', { className: "text-xs font-bold text-slate-700"  }, "Selected Resources (1)"  )
                )

                /* Resource card */
                , React.createElement('div', { className: "bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-sm"      }
                  , React.createElement('div', { className: "flex items-center gap-2"  }
                    , React.createElement('div', { className: "w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0"       }
                      , React.createElement('span', { className: "text-white text-xs font-bold"  }, "1")
                    )
                    , React.createElement('div', {}
                      , React.createElement('p', { className: "font-bold text-sm text-foreground leading-tight"   }, item.service)
                      , React.createElement(Badge, { className: "bg-primary/10 text-primary hover:bg-primary/10 border-primary/20 text-[10px] mt-0.5"     }
                        , item.pkg
                      )
                    )
                  )

                  , i === SELECTED.length - 1 && (
                    React.createElement('div', { className: "pt-2 border-t border-dashed border-slate-200 flex justify-between items-center"      }
                      , React.createElement('span', { className: "text-xs text-slate-500 font-medium"  }, "Item Total:" )
                      , React.createElement('span', { className: "font-bold text-primary text-sm"  }, "৳ " , item.total)
                    )
                  )
                )
              )
            ))
          )
        )

        /* Footer */
        , React.createElement('div', { className: "px-6 py-4 bg-white border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3"         }
          , React.createElement('p', { className: "text-xs text-slate-500 flex items-center gap-1.5"    }
            , React.createElement('span', { className: "w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-400 shrink-0"           }, "i"), "Review your selections before confirming"

          )
          , React.createElement('div', { className: "flex gap-3 justify-end"  }
            , React.createElement(Button, { variant: "outline", onClick: () => onOpenChange(false)}, "Cancel")
            , React.createElement(Button, {
              onClick: handleConfirm,
              className: "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5"    }

              , React.createElement(Check, { className: "w-4 h-4" } ), " Confirm Order"
            )
          )
        )

      )
    )
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function WishlistPage() {
  const { toast } = useToast();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  const handleRemoveConfirm = () => {
    toast({ title: "Item removed", description: "The item has been removed from your wishlist." });
  };

  return (
    React.createElement(AppLayout, { withSidebar: true}
      , React.createElement('div', { className: "flex flex-col h-full gap-6"   }

        , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"       }
          , React.createElement('div', { className: "flex items-center gap-3"  }
            , React.createElement('div', { className: "p-2.5 bg-rose-50 rounded-xl border border-rose-100"    }
              , React.createElement(Heart, { className: "w-6 h-6 text-rose-500"  } )
            )
            , React.createElement('div', {}
              , React.createElement('h1', { className: "text-2xl font-bold text-foreground"  }, "Wish List Items"  )
              , React.createElement('p', { className: "text-sm text-muted-foreground" }, "Services saved for your next order"     )
            )
          )
          , React.createElement('div', { className: "flex items-center gap-3"  }
            , React.createElement(Button, { variant: "outline", className: "font-semibold bg-white" }
              , React.createElement(Check, { className: "w-4 h-4 mr-2"  } ), " Select All"
            )
            , React.createElement(Button, { variant: "outline", className: "border-primary text-primary hover:bg-primary/5 font-semibold bg-white"    }
              , React.createElement(FileText, { className: "w-4 h-4 mr-2"  } ), " Save as PDF"
            )
          )
        )

        , React.createElement('div', { className: "flex flex-col lg:flex-row gap-6"   }
          /* Left: Scrollable List */
          , React.createElement('div', { className: "flex-1 flex flex-col gap-4"   }

            /* ── Email Service Item ── */
            , React.createElement(Card, { className: "overflow-hidden border-border/80 shadow-sm hover:border-primary/30 transition-colors"    }
              , React.createElement('div', { className: "bg-slate-50/80 px-3 py-2.5 border-b flex flex-wrap items-center gap-2 justify-between"        }
                , React.createElement('div', { className: "flex items-center gap-2 flex-wrap"   }
                  , React.createElement(Checkbox, { id: "item-email"} )
                  , React.createElement('label', { htmlFor: "item-email", className: "font-bold text-sm text-foreground cursor-pointer"   }, "Item 1" )
                  , React.createElement('span', { className: "font-bold text-sm text-slate-700"  }, "Email Service" )
                  , React.createElement(Badge, { variant: "outline", className: "bg-white text-slate-600 border-slate-300 text-[10px] font-semibold"    }, "Standard")
                  , React.createElement(Badge, { className: "bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20 text-xs font-bold"      }, "৳ 1000" )
                  , React.createElement(Button, {
                    size: "sm",
                    variant: "outline",
                    onClick: () => setPricingOpen(true),
                    className: "h-7 px-3 text-xs font-semibold border-primary text-primary hover:bg-primary/5 bg-white gap-1.5"        }

                    , React.createElement(BarChart2, { className: "w-3.5 h-3.5" } ), " View Pricing"
                  )
                )
                , React.createElement('div', { className: "text-xs text-muted-foreground font-medium whitespace-nowrap"   }, "Mar 15, 2026 03:19 PM"

                )
              )
              , React.createElement(CardContent, { className: "p-0"}
                , React.createElement('div', { className: "overflow-x-auto"}
                  , React.createElement('table', { className: "w-full text-sm text-left"  }
                    , React.createElement('thead', { className: "text-xs text-muted-foreground bg-slate-50/50 uppercase"   }
                      , React.createElement('tr', {}
                        , React.createElement('th', { className: "px-4 py-3 font-semibold w-1/2"   }, "Feature")
                        , React.createElement('th', { className: "px-4 py-3 font-semibold text-center"   }, "Quantity")
                        , React.createElement('th', { className: "px-4 py-3 font-semibold text-right"   }, "Monthly Fee" )
                        , React.createElement('th', { className: "px-4 py-3 font-semibold text-right"   }, "Total Fee" )
                        , React.createElement('th', { className: "px-4 py-3 font-semibold text-center"   }, "Action")
                      )
                    )
                    , React.createElement('tbody', { className: "divide-y divide-border/40" }
                      , React.createElement('tr', { className: "hover:bg-slate-50/30"}
                        , React.createElement('td', { className: "px-4 py-4 align-top"  }
                          , React.createElement('p', { className: "font-medium text-slate-700 leading-relaxed text-xs"   }, "Domain Name: a.bd  No of Email Accounts: 10"
                                   , React.createElement('br'), "Delegated Admin Account Count: 0"
                                , React.createElement('br'), "Domain Quota Upgradation: Unlimited (per GB): 0"

                          )
                        )
                        , React.createElement('td', { className: "px-4 py-4 align-top text-center font-semibold"    }, "1")
                        , React.createElement('td', { className: "px-4 py-4 align-top text-right font-medium text-slate-500"     }, "N/A")
                        , React.createElement('td', { className: "px-4 py-4 align-top text-right font-bold text-primary"     }, "৳ 1000" )
                        , React.createElement('td', { className: "px-4 py-4 align-top text-center"   }
                          , React.createElement(Button, {
                            size: "sm",
                            onClick: () => setRemoveOpen(true),
                            className: "h-7 px-3 text-xs bg-rose-500 hover:bg-rose-600 text-white font-semibold"      }
, "Remove"

                          )
                        )
                      )
                    )
                  )
                )
              )
            )

            /* ── VPS Items ── */
            , [2, 3].map((item) => (
              React.createElement(Card, { key: item, className: "overflow-hidden border-border/80 shadow-sm hover:border-primary/30 transition-colors"    }
                , React.createElement('div', { className: "bg-slate-50/80 p-3 border-b flex items-center justify-between"     }
                  , React.createElement('div', { className: "flex items-center gap-3"  }
                    , React.createElement(Checkbox, { id: `item-${item}`} )
                    , React.createElement('label', { htmlFor: `item-${item}`, className: "font-bold text-sm text-foreground cursor-pointer"   }, "Item "
                       , item
                    )
                  )
                  , React.createElement('div', { className: "text-xs text-muted-foreground font-medium"  }, "Mar 15, 2026 01:19 PM"

                  )
                )
                , React.createElement(CardContent, { className: "p-0"}
                  , React.createElement('div', { className: "p-4 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-dashed border-border/60"        }
                    , React.createElement('h3', { className: "font-bold text-primary flex items-center gap-2 text-base"     }, "Virtual Private Server (VPS) Service"

                    )
                    , React.createElement('div', { className: "flex items-center gap-2"  }
                      , React.createElement(Badge, { variant: "outline", className: "bg-primary/5 text-primary border-primary/20 text-[10px] uppercase font-bold tracking-wider"      }, "Basic")
                      , React.createElement(Badge, { variant: "secondary", className: "bg-slate-100 text-slate-700" }, "৳ 5000" )
                    )
                  )

                  , React.createElement('div', { className: "overflow-x-auto"}
                    , React.createElement('table', { className: "w-full text-sm text-left"  }
                      , React.createElement('thead', { className: "text-xs text-muted-foreground bg-slate-50/50 uppercase"   }
                        , React.createElement('tr', {}
                          , React.createElement('th', { className: "px-4 py-3 font-semibold w-1/2"   }, "Feature")
                          , React.createElement('th', { className: "px-4 py-3 font-semibold text-center"   }, "Quantity")
                          , React.createElement('th', { className: "px-4 py-3 font-semibold text-right"   }, "Monthly Fee" )
                          , React.createElement('th', { className: "px-4 py-3 font-semibold text-right"   }, "Total Fee" )
                          , React.createElement('th', { className: "px-4 py-3 font-semibold text-center"   }, "Action")
                        )
                      )
                      , React.createElement('tbody', { className: "divide-y divide-border/40" }
                        , React.createElement('tr', { className: "hover:bg-slate-50/30"}
                          , React.createElement('td', { className: "px-4 py-4 align-top"  }
                            , React.createElement('p', { className: "font-medium text-slate-700 leading-relaxed text-xs"   }, "2 vCPU, 4 GB RAM, 100 GB Storage / OS: CentOS / Security Zone: Database / Port: 22, 80, 443 / Public IP Needed: No"

                            )
                          )
                          , React.createElement('td', { className: "px-4 py-4 align-top text-center font-semibold"    }, "1")
                          , React.createElement('td', { className: "px-4 py-4 align-top text-right font-medium"    }, "৳ 5,000" )
                          , React.createElement('td', { className: "px-4 py-4 align-top text-right font-bold text-emerald-600"     }, "৳ 5000" )
                          , React.createElement('td', { className: "px-4 py-4 align-top text-center"   }
                            , React.createElement(Button, {
                              variant: "ghost",
                              size: "icon",
                              onClick: () => setRemoveOpen(true),
                              className: "h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50"    }

                              , React.createElement(Trash2, { className: "w-4 h-4" } )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            ))
          )

          /* Right: Order Summary */
          , React.createElement('div', { className: "w-full lg:w-72 shrink-0"  }
            , React.createElement(Card, { className: "sticky top-24 border-primary/20 shadow-md"   }
              , React.createElement('div', { className: "bg-primary/5 p-4 border-b border-primary/10"   }
                , React.createElement('h2', { className: "font-bold text-lg text-foreground"  }, "Order Summary" )
              )
              , React.createElement(CardContent, { className: "p-5 space-y-4" }
                , React.createElement('div', { className: "flex justify-between items-center text-sm font-medium text-slate-600"     }
                  , React.createElement('span', null, "Subtotal:")
                  , React.createElement('span', null, "৳ 15,000.00" )
                )
                , React.createElement('div', { className: "flex justify-between items-center text-sm font-medium text-slate-600"     }
                  , React.createElement('span', null, "Tax & VAT:"  )
                  , React.createElement('span', null, "5%")
                )
                , React.createElement('div', { className: "h-px w-full bg-border my-2"   } )
                , React.createElement('div', { className: "flex justify-between items-center text-base font-bold text-foreground"     }
                  , React.createElement('span', null, "Total:")
                  , React.createElement('span', { className: "text-primary"}, "৳ 15,750.00" )
                )
                , React.createElement('p', { className: "text-[10px] text-muted-foreground text-right mt-1"   }, "(including VAT)" )

                , React.createElement(Button, {
                  onClick: () => setCheckoutOpen(true),
                  className: "w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-sm transition-all hover:shadow"          }
, "Proceed to Checkout "
                     , React.createElement(ChevronRight, { className: "w-4 h-4 ml-1"  } )
                )
              )
            )
          )
        )

      )

      , React.createElement(CheckoutDialog, { open: checkoutOpen, onOpenChange: setCheckoutOpen} )
      , React.createElement(EmailPricingDialog, { open: pricingOpen, onOpenChange: setPricingOpen} )
      , React.createElement(RemoveDialog, { open: removeOpen, onOpenChange: setRemoveOpen, onConfirm: handleRemoveConfirm} )
    )
  );
}
