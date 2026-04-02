function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return undefined;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
import React from "react";
import {
  Trash2,
  FileText,
  ChevronRight,
  Check,
  Upload,
  ShoppingCart,
  BarChart2,
  Heart,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useState, useRef } from "react";
import { useToast } from "../hooks/use-toast";

/*  ─── File drop zone ──────────────────────────────────── */
function ApprovalDropZone({ file, onFile }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) onFile(f);
      }}
      onClick={() =>
        _optionalChain([
          inputRef,
          "access",
          (_) => _.current,
          "optionalAccess",
          (_2) => _2.click,
          "call",
          (_3) => _3(),
        ])
      }
      className={`border-2 border-dashed rounded-lg py-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${dragging ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary/50 hover:bg-slate-50"}`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          if (
            _optionalChain([
              e,
              "access",
              (_4) => _4.target,
              "access",
              (_5) => _5.files,
              "optionalAccess",
              (_6) => _6[0],
            ])
          )
            onFile(e.target.files[0]);
        }}
      />
      <Upload className="w-4 h-4 text-slate-400" />
      {file ? (
        <p className="text-sm font-medium text-primary">{file.name}</p>
      ) : (
        <p className="text-sm text-slate-500">
          {"Drag & Drop file here or"}
          <span className="text-primary font-semibold underline">Browse</span>
        </p>
      )}
    </div>
  );
}

/*  ─── Email Pricing Dialog ────────────────────────────── */
const EMAIL_PRICING_ROWS = [
  {
    attribute: "No of Email Accounts",
    qty: 10,
    unitFee: 100,
    total: 1000,
  },
];
function EmailPricingDialog({ open, onOpenChange }) {
  const grandTotal = EMAIL_PRICING_ROWS.reduce((sum, r) => sum + r.total, 0);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden rounded-xl">
        <DialogHeader className="bg-primary px-6 py-4">
          <DialogTitle className="text-white text-lg font-bold">Email Service Pricing</DialogTitle>
        </DialogHeader>
        <div className="p-5 bg-white">
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-xs text-slate-600 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Attribute</th>
                  <th className="px-4 py-3 text-center">Quantity</th>
                  <th className="px-4 py-3 text-center">Monthly Unit Fee</th>
                  <th className="px-4 py-3 text-right">Total Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {
                  EMAIL_PRICING_ROWS.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3.5 font-medium text-slate-700">{row.attribute}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-block bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 rounded">
                          {row.qty}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center font-bold text-emerald-600">
                        ৳ {row.unitFee}
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold text-primary">
                        ৳ {row.total.toLocaleString()}
                      </td>
                    </tr>
                  ))
                  /*  Total Price row */
                }
                <tr className="bg-slate-50/80">
                  <td className="px-4 py-3.5 font-bold text-slate-800">Total Price</td>
                  <td className="px-4 py-3.5 text-center text-slate-400 font-medium">-</td>
                  <td className="px-4 py-3.5 text-center text-slate-400 font-medium">-</td>
                  <td className="px-4 py-3.5 text-right font-bold text-primary text-base">
                    ৳ {grandTotal.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <DialogFooter className="px-5 pb-5 bg-white flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-6"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/*  ─── Remove Item Dialog ──────────────────────────────── */
function RemoveDialog({ open, onOpenChange, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-0 gap-0 overflow-hidden rounded-xl">
        <DialogHeader className="bg-primary px-6 py-4">
          <DialogTitle className="text-white text-base font-bold">Remove Item</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-5 bg-white">
          <p className="text-sm text-slate-600 leading-relaxed">
            Are you sure you want to remove this item from your wishlist?
            <br />
            This action cannot be undone.
          </p>
        </div>
        <DialogFooter className="px-6 pb-5 bg-white flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/*  ─── Order Confirmation Dialog ───────────────────────── */
function OrderConfirmationDialog({ open, onOpenChange, orderNo }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-xl">
        {/* Header */}
        <DialogHeader className="bg-primary px-6 py-4">
          <DialogTitle className="text-white text-lg font-bold">Order Confirmation</DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="px-8 py-10 bg-white flex flex-col items-center text-center gap-5">
          {/* Success icon */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-200">
              <Check className="w-10 h-10 text-white stroke-[3]" />
            </div>
            <div className="absolute -inset-1.5 rounded-full border-4 border-emerald-100 opacity-60 animate-ping" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-primary">Order Submitted Successfully</h2>
            <p className="text-sm text-muted-foreground">
              Your order has been received and is now being processed.
            </p>
          </div>

          {/* Order number */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Order Reference
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 font-medium">Order No:</span>
              <a
                href={`/orders/${orderNo}`}
                className="text-sm font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-2 flex items-center gap-1 transition-colors"
              >
                {orderNo}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Info note */}
          <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
            You will receive a confirmation notification once the order is reviewed and approved by
            the RAJUK team.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border/60 bg-slate-50/60 flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-9"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/*  ─── Checkout Dialog ─────────────────────────────────── */
function CheckoutDialog({ open, onOpenChange, onOrderConfirmed }) {
  const { toast } = useToast();
  const [approvalFile, setApprovalFile] = useState(null);
  const SELECTED = [
    {
      service: "Email Service",
      pkg: "Standard",
      total: 1050,
    },
    {
      service: "Email Service",
      pkg: "Standard",
      total: 1050,
    },
  ];
  const subtotal = 1000;
  const totalAmount = 1050;
  function generateOrderNo() {
    const today = new Date();
    const ymd = today.toISOString().slice(0, 10).replace(/-/g, "");
    const seq = String(Math.floor(200 + Math.random() * 300)).padStart(3, "0");
    return `${ymd}-NDC-00075-${seq}`;
  }

  const handleConfirm = () => {
    const orderNo = generateOrderNo();
    onOpenChange(false);
    onOrderConfirmed(orderNo);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden rounded-2xl">
        <div className="bg-gradient-to-r from-primary to-purple-600 px-6 py-5 text-white">
          <h2 className="text-xl font-bold">Checkout Wishlist</h2>
          <p className="text-sm text-white/80 mt-1">
            Assign contract and service for your selected resources
          </p>
        </div>
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 max-h-[70vh] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-white">
            <div className="space-y-1.5">
              <Label className="text-sm font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Select Contract
              </Label>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Choose a contract..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ndc-00075">NDC-00075</SelectItem>
                  <SelectItem value="ndc-00076">NDC-00076</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Select Contract
              </Label>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Choose a contract..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ndc-00075">NDC-00075</SelectItem>
                  <SelectItem value="ndc-00076">NDC-00076</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-bold flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" /> Select Service
              </Label>
              <Select disabled>
                <SelectTrigger className="bg-slate-50 text-slate-400">
                  <SelectValue placeholder="Select contract first" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="w-3 h-3 text-primary" />
                </div>
                Order Summary
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Items in cart:</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total amount:</span>
                <span className="font-bold text-primary">৳ {totalAmount.toLocaleString()}.00</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-rose-500 font-medium">
                * Please submit official approval letter for this order
              </p>
              <ApprovalDropZone file={approvalFile} onFile={setApprovalFile} />
            </div>
          </div>
          <div className="w-full md:w-64 lg:w-72 shrink-0 overflow-y-auto p-5 bg-slate-50/50 space-y-4">
            {SELECTED.map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Selected Resources (1)</span>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground leading-tight">
                        {item.service}
                      </p>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-primary/20 text-[10px] mt-0.5">
                        {item.pkg}
                      </Badge>
                    </div>
                  </div>
                  {i === SELECTED.length - 1 && (
                    <div className="pt-2 border-t border-dashed border-slate-200 flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-medium">Item Total:</span>
                      <span className="font-bold text-primary text-sm">৳ {item.total}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 bg-white border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-400 shrink-0">
              i
            </span>
            Review your selections before confirming
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5"
            >
              <Check className="w-4 h-4" /> Confirm Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/*  ─── Page ──────────────────────────────────────────────── */
export default function WishlistPage() {
  const { toast } = useToast();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [orderConfirmOpen, setOrderConfirmOpen] = useState(false);
  const [confirmedOrderNo, setConfirmedOrderNo] = useState("");

  const handleOrderConfirmed = (orderNo) => {
    setConfirmedOrderNo(orderNo);
    setOrderConfirmOpen(true);
  };

  const handleRemoveConfirm = () => {
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    });
  };
  return (
    <>
      <div className="flex flex-col h-full gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-100">
              <Heart className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Wish List Items</h1>
              <p className="text-sm text-muted-foreground">Services saved for your next order</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-semibold bg-white text-xs px-2.5 py-1 h-7">
              <Check className="w-3 h-3 mr-1.5" /> Select All
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 font-semibold bg-white text-xs px-2.5 py-1 h-7"
            >
              <FileText className="w-3 h-3 mr-1.5" /> Save as PDF
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <Card className="overflow-hidden border-border/80 shadow-sm hover:border-primary/30 transition-colors">
              <div className="bg-slate-50/80 px-3 py-2.5 border-b flex flex-wrap items-center gap-2 justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <Checkbox id="item-email" />
                  <label
                    htmlFor="item-email"
                    className="font-bold text-sm text-foreground cursor-pointer"
                  >
                    Item 1
                  </label>
                  <span className="font-bold text-sm text-slate-700">Email Service</span>
                  <Badge
                    variant="outline"
                    className="bg-white text-slate-600 border-slate-300 text-[10px] font-semibold"
                  >
                    Standard
                  </Badge>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20 text-xs font-bold">
                    ৳ 1000
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                    Mar 15, 2026 03:19 PM
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPricingOpen(true)}
                    className="h-7 px-3 text-xs font-semibold border-primary text-primary hover:bg-primary/5 bg-white gap-1.5"
                  >
                    <BarChart2 className="w-3.5 h-3.5" /> View Pricing
                  </Button>
                </div>
              </div>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-slate-200">
                    <thead className="text-xs text-muted-foreground bg-blue-50 uppercase">
                      <tr>
                        <th className="px-4 py-3 font-semibold w-1/2 border border-slate-200">Feature</th>
                        <th className="px-4 py-3 font-semibold text-center border border-slate-200">Quantity</th>
                        <th className="px-4 py-3 font-semibold text-right border border-slate-200">Monthly Fee</th>
                        <th className="px-4 py-3 font-semibold text-right border border-slate-200">Total Fee</th>
                        <th className="px-4 py-3 font-semibold text-center border border-slate-200">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      <tr className="hover:bg-slate-50/50 bg-slate-50/30">
                        <td className="px-4 py-4 align-top border border-slate-200">
                          <p className="font-medium text-slate-700 leading-relaxed text-xs">
                            Domain Name: a.bd  No of Email Accounts: 10
                            <br />
                            Delegated Admin Account Count: 0<br />
                            Domain Quota Upgradation: Unlimited (per GB): 0
                          </p>
                        </td>
                        <td className="px-4 py-4 align-top text-center font-semibold border border-slate-200">1</td>
                        <td className="px-4 py-4 align-top text-right font-medium text-slate-500 border border-slate-200">
                          N/A
                        </td>
                        <td className="px-4 py-4 align-top text-right font-bold text-primary border border-slate-200">
                          ৳ 1000
                        </td>
                        <td className="px-4 py-4 align-top text-center border border-slate-200">
                          <Button
                            size="sm"
                            onClick={() => setRemoveOpen(true)}
                            className="h-7 px-3 text-xs bg-rose-500 hover:bg-rose-600 text-white font-semibold"
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            {[2, 3].map((item) => (
              <Card
                key={item}
                className="overflow-hidden border-border/80 shadow-sm hover:border-primary/30 transition-colors"
              >
                <div className="bg-slate-50/80 px-3 py-2.5 border-b flex flex-wrap items-center gap-2 justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Checkbox id={`item-${item}`} />
                    <label
                      htmlFor={`item-${item}`}
                      className="font-bold text-sm text-foreground cursor-pointer"
                    >
                      Item {item}
                    </label>
                    <span className="font-bold text-sm text-slate-700">Virtual Private Server (VPS) Service</span>
                    <Badge
                      variant="outline"
                      className="bg-white text-slate-600 border-slate-300 text-[10px] font-semibold"
                    >
                      Basic
                    </Badge>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20 text-xs font-bold">
                      ৳ 5000
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                      Mar 15, 2026 01:19 PM
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPricingOpen(true)}
                      className="h-7 px-3 text-xs font-semibold border-primary text-primary hover:bg-primary/5 bg-white gap-1.5"
                    >
                      <BarChart2 className="w-3.5 h-3.5" /> View Pricing
                    </Button>
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border border-slate-200">
                      <thead className="text-xs text-muted-foreground bg-blue-50 uppercase">
                        <tr>
                          <th className="px-4 py-3 font-semibold w-1/2 border border-slate-200">Feature</th>
                          <th className="px-4 py-3 font-semibold text-center border border-slate-200">Quantity</th>
                          <th className="px-4 py-3 font-semibold text-right border border-slate-200">Monthly Fee</th>
                          <th className="px-4 py-3 font-semibold text-right border border-slate-200">Total Fee</th>
                          <th className="px-4 py-3 font-semibold text-center border border-slate-200">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        <tr className="hover:bg-slate-50/50 bg-slate-50/30">
                          <td className="px-4 py-4 align-top border border-slate-200">
                            <p className="font-medium text-slate-700 leading-relaxed text-xs">
                              2 vCPU, 4 GB RAM, 100 GB Storage / OS: CentOS / Security Zone:
                              Database / Port: 22, 80, 443 / Public IP Needed: No
                            </p>
                          </td>
                          <td className="px-4 py-4 align-top text-center font-semibold border border-slate-200">1</td>
                          <td className="px-4 py-4 align-top text-right font-medium border border-slate-200">৳ 5,000</td>
                          <td className="px-4 py-4 align-top text-right font-bold text-emerald-600 border border-slate-200">
                            ৳ 5000
                          </td>
                          <td className="px-4 py-4 align-top text-center border border-slate-200">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setRemoveOpen(true)}
                              className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="w-full lg:w-72 shrink-0">
            <Card className="sticky top-24 border-primary/20 shadow-md">
              <div className="bg-primary/5 p-4 border-b border-primary/10">
                <h2 className="font-bold text-lg text-foreground">Order Summary</h2>
              </div>
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                  <span>Subtotal:</span>
                  <span>৳ 15,000.00</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                  <span>{"Tax & VAT:"}</span>
                  <span>5%</span>
                </div>
                <div className="h-px w-full bg-border my-2" />
                <div className="flex justify-between items-center text-base font-bold text-foreground">
                  <span>Total:</span>
                  <span className="text-primary">৳ 15,750.00</span>
                </div>
                <p className="text-[10px] text-muted-foreground text-right mt-1">(including VAT)</p>
                <Button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-sm transition-all hover:shadow"
                >
                  Proceed to Checkout <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        onOrderConfirmed={handleOrderConfirmed}
      />
      <EmailPricingDialog open={pricingOpen} onOpenChange={setPricingOpen} />
      <RemoveDialog
        open={removeOpen}
        onOpenChange={setRemoveOpen}
        onConfirm={handleRemoveConfirm}
      />
      <OrderConfirmationDialog
        open={orderConfirmOpen}
        onOpenChange={setOrderConfirmOpen}
        orderNo={confirmedOrderNo}
      />
    </>
  );
}
