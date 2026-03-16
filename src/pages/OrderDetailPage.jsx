import React from "react";
import { Link, useParams } from "wouter";
import {
  ChevronRight,
  FileText,
  Calendar,
  Building,
  ShoppingCart,
  Download,
  XCircle,
  Eye,
  ChevronDown,
  Truck,
  CheckCircle2,
  Zap,
  Clock,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { ORDERS } from "./OrderListPage";

/*  ─── View Attributes Dialog ─────────────────────────────── */
const VPS_ATTRS = [
  {
    key: "OS",
    value: "CentOS",
    children: [
      {
        key: "OS Version",
        value: "8",
      },
    ],
  },
  {
    key: "Security Zone",
    value: "Database",
  },
  {
    key: "Port",
    value: "22, 80, 443",
  },
  {
    key: "Public IP Needed?",
    value: "No",
  },
];
function ViewAttributesDialog({ open, onOpenChange, pkg }) {
  const [expanded, setExpanded] = useState(new Set(["OS"]));
  const toggle = (key) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-xl">
        <DialogHeader className="px-6 pt-5 pb-3 border-b bg-white">
          <DialogTitle className="text-xl font-bold text-foreground">Attributes</DialogTitle>
          <Badge
            variant="outline"
            className="w-fit mt-1 bg-slate-50 text-slate-600 border-slate-200 font-medium"
          >
            {pkg}
          </Badge>
        </DialogHeader>
        <div className="px-6 py-5 bg-white space-y-1">
          {VPS_ATTRS.map((attr) => (
            <div key={attr.key}>
              <div
                className={`flex items-center gap-2 py-2.5 rounded-lg px-2 transition-colors ${attr.children ? "cursor-pointer hover:bg-slate-50" : ""}`}
                onClick={() => attr.children && toggle(attr.key)}
              >
                {attr.children ? (
                  <ChevronDown
                    className={`w-4 h-4 text-primary shrink-0 transition-transform ${expanded.has(attr.key) ? "" : "-rotate-90"}`}
                  />
                ) : (
                  <div className="w-4 shrink-0" />
                )}
                <span className="font-semibold text-slate-700 text-sm w-36 shrink-0">
                  {attr.key}
                </span>
                <span className="text-slate-600 text-sm">{attr.value}</span>
              </div>
              {attr.children &&
                expanded.has(attr.key) &&
                attr.children.map((child) => (
                  <div
                    key={child.key}
                    className="flex items-center gap-2 py-2 px-2 pl-8 rounded-lg hover:bg-slate-50/50"
                  >
                    <div className="w-4 shrink-0" />
                    <span className="font-medium text-slate-600 text-sm w-36 shrink-0">
                      {child.key}
                    </span>
                    <span className="text-slate-600 text-sm">{child.value}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="px-6 pb-5 flex justify-end bg-white">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/*  ─── Mock data ─────────────────────────────────────────── */
const CHANGE_PACKAGE_ROWS = [
  {
    service: "Email Service",
    pkg: "Standard",
    attribute: "No of Email Accounts",
    prevQty: "15",
    reqQty: "35",
    fee: "BDT 3500",
    hasAttachment: true,
  },
  {
    service: "Email Service",
    pkg: "Standard",
    attribute: "Domain Quota Upgradation: Unlimited (per GB)",
    prevQty: "25",
    reqQty: "25",
    fee: "BDT 500",
    hasAttachment: false,
  },
  {
    service: "Email Service",
    pkg: "Standard",
    attribute: "Delegated Admin Account Count",
    prevQty: "2",
    reqQty: "2",
    fee: "BDT 2000",
    hasAttachment: false,
  },
  {
    service: "Email Service",
    pkg: "Standard",
    attribute: "Admin Privileged Emails",
    prevQty: "admin@a.gov.bd,support@a.gov.bd",
    reqQty: "admin@a.gov.bd,support@a.gov.bd",
    fee: "-",
    hasAttachment: false,
  },
];
const PENDING_REQUEST_ROWS = [
  {
    service: "Virtual Private Server (VPS) Service",
    pkg: "Basic",
    feature: "2 vCPU, 4 GB RAM, 100 GB Storage",
    fee: "৳ 5000",
    qty: 1,
    status: "PENDING",
  },
  {
    service: "Virtual Private Server (VPS) Service",
    pkg: "Basic",
    feature: "2 vCPU, 4 GB RAM, 100 GB Storage",
    fee: "৳ 5000",
    qty: 1,
    status: "PENDING",
  },
  {
    service: "Virtual Private Server (VPS) Service",
    pkg: "Basic",
    feature: "2 vCPU, 4 GB RAM, 100 GB Storage",
    fee: "৳ 5000",
    qty: 1,
    status: "PENDING",
  },
  {
    service: "Virtual Private Server (VPS) Service",
    pkg: "Basic",
    feature: "2 vCPU, 4 GB RAM, 100 GB Storage",
    fee: "৳ 5000",
    qty: 1,
    status: "PENDING",
  },
  {
    service: "Virtual Private Server (VPS) Service",
    pkg: "Basic",
    feature: "2 vCPU, 4 GB RAM, 100 GB Storage",
    fee: "৳ 5000",
    qty: 1,
    status: "PENDING",
  },
];
const COMPLETED_REQUEST_ROWS = [
  {
    type: "main",
    service: "Email Service",
    pkg: "Standard",
    feature: "-",
    fee: "৳ 1500",
    qty: 1,
    platform: "ZIMBRA",
    status: "ACTIVATED",
    hasAttachment: true,
  },
  {
    type: "main",
    service: "Virtual Private Server (VPS) Service",
    pkg: "Basic",
    feature: "2 vCPU, 4 GB RAM, 100 GB Storage",
    fee: "৳ 5000",
    qty: 1,
    platform: "HUAWEI",
    status: "ACTIVATED",
    children: [
      {
        type: "child",
        service: "IP Address Service",
        pkg: "Standard",
        feature: "1 public ip, unlimited bw",
        fee: "৳ 5000",
        qty: 10,
        platform: "-",
      },
      {
        type: "child",
        service: "Block Storage Service",
        pkg: "Premium",
        feature: "Per GB",
        fee: "৳ 600",
        qty: 30,
        platform: "-",
      },
    ],
  },
  {
    type: "main",
    service: "Virtual Private Server (VPS) Service",
    pkg: "Basic",
    feature: "2 vCPU, 4 GB RAM, 100 GB Storage",
    fee: "৳ 5000",
    qty: 1,
    platform: "HUAWEI",
    status: "ACTIVATED",
  },
];

/*  ─── Tracking step helper ──────────────────────────────── */
const TRACKING_STEPS = [
  {
    label: "Request Submitted",
    date: "2026-03-15",
    icon: ShoppingCart,
  },
  {
    label: "Waiting for Delivery",
    date: "2026-03-15",
    icon: Truck,
  },
  {
    label: "Delivered",
    date: "2026-03-15",
    icon: CheckCircle2,
  },
];
function OrderTracker({ steps }) {
  return (
    <div className="flex items-start justify-center gap-0 py-2">
      {TRACKING_STEPS.map((step, i) => {
        const active = i < steps;
        const Icon = step.icon;
        return (
          <div key={i} className="flex items-start">
            <div className="flex flex-col items-center w-36">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-all ${active ? "bg-primary text-white shadow-primary/30" : "bg-slate-100 text-slate-400"}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <p
                className={`mt-2 text-xs font-bold text-center leading-snug ${active ? "text-foreground" : "text-slate-400"}`}
              >
                {step.label}
              </p>
              <p
                className={`text-[11px] mt-0.5 ${active ? "text-muted-foreground" : "text-slate-300"}`}
              >
                {step.date}
              </p>
            </div>
            {i < TRACKING_STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mt-7 w-16 mx-1 rounded-full transition-colors ${active ? "bg-primary" : "bg-slate-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/*  ─── Expandable VPS row ────────────────────────────────── */
function CompletedMainRow({ row, onViewAttributes }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = row.children && row.children.length > 0;
  return (
    <>
      <tr className="hover:bg-slate-50/50 transition-colors">
        <td className="px-4 py-3.5 font-semibold text-slate-800 text-sm">
          <div className="flex items-center gap-1.5">
            {hasChildren && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-slate-500 hover:text-primary transition-colors"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expanded ? "" : "-rotate-90"}`}
                />
              </button>
            )}
            {row.service}
          </div>
        </td>
        <td className="px-4 py-3.5">
          <Badge variant="outline" className="bg-slate-50 font-medium text-xs">
            {row.pkg}
          </Badge>
        </td>
        <td className="px-4 py-3.5 text-xs text-slate-600">{row.feature}</td>
        <td className="px-4 py-3.5 font-bold text-emerald-600 whitespace-nowrap text-sm">
          {row.fee}
        </td>
        <td className="px-4 py-3.5 text-center font-bold text-base">{row.qty}</td>
        <td className="px-4 py-3.5 text-center">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
            {row.platform}
          </span>
        </td>
        <td className="px-4 py-3.5 text-center">
          <Button
            size="sm"
            onClick={() => onViewAttributes(row.pkg)}
            className="bg-primary hover:bg-primary/90 text-white text-xs h-7 px-2.5 font-semibold gap-1"
          >
            <Eye className="w-3.5 h-3.5" /> View Attributes
          </Button>
        </td>
        <td className="px-4 py-3.5 text-center">
          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-300 font-bold text-xs whitespace-nowrap">
            ACTIVATED
          </Badge>
        </td>
        <td className="px-4 py-3.5 text-center">
          <div className="flex items-center justify-center gap-1.5">
            {row.hasAttachment && (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white text-xs h-7 px-2.5 font-semibold whitespace-nowrap"
              >
                Download Attachment
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 text-xs h-7 px-3 font-semibold"
            >
              View
            </Button>
          </div>
        </td>
      </tr>
      {hasChildren &&
        expanded &&
        row.children.map((child, ci) => (
          <tr key={ci} className="bg-slate-50/60 hover:bg-slate-100/50 transition-colors">
            <td className="px-4 py-3 pl-12 text-xs text-slate-600 font-medium">
              <span className="text-slate-400 mr-1.5">–</span>
              {child.service}
            </td>
            <td className="px-4 py-3">
              <Badge variant="outline" className="bg-white font-medium text-xs">
                {child.pkg}
              </Badge>
            </td>
            <td className="px-4 py-3 text-xs text-slate-500">{child.feature}</td>
            <td className="px-4 py-3 font-semibold text-emerald-600 whitespace-nowrap text-xs">
              {child.fee}
            </td>
            <td className="px-4 py-3 text-center font-bold text-sm">{child.qty}</td>
            <td className="px-4 py-3 text-center text-xs text-slate-400">{child.platform}</td>
            <td className="px-4 py-3 text-center">
              <Button
                size="sm"
                onClick={() => onViewAttributes(child.pkg)}
                className="bg-primary hover:bg-primary/90 text-white text-xs h-7 px-2.5 font-semibold gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> View Attributes
              </Button>
            </td>
            <td className="px-4 py-3 text-center text-slate-300 text-xs">-</td>
            <td className="px-4 py-3 text-center text-slate-300 text-xs">-</td>
          </tr>
        ))}
    </>
  );
}

/*  ─── Page ──────────────────────────────────────────────── */
export default function OrderDetailPage() {
  const { orderId } = useParams();
  const order = ORDERS.find((o) => o.id === orderId) || ORDERS[0];
  const isChangePackage = order.type === "Change Package";
  const isCompleted = order.status === "DELIVERED";
  const [attrOpen, setAttrOpen] = useState(false);
  const [attrPkg, setAttrPkg] = useState("Basic");
  const [activationDate, setActivationDate] = useState(new Date().toISOString().split("T")[0]);
  const [activationTime, setActivationTime] = useState("00:00");
  const [activated, setActivated] = useState(false);
  const { toast } = useToast();
  const openAttr = (pkg) => {
    setAttrPkg(pkg);
    setAttrOpen(true);
  };
  const handleActivate = () => {
    if (!activationDate) return;
    setActivated(true);
    toast({
      title: "Order Activated",
      description: `Activation scheduled for ${activationDate} at ${activationTime || "--:--"}.`,
    });
  };
  const totalCost = isCompleted ? "৳ 17100" : isChangePackage ? "৳ 0" : "৳ 25000";
  const trackingSteps = isCompleted ? 3 : 1;
  const statusBadge = isCompleted ? (
    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-300 font-bold text-xs">
      COMPLETED
    </Badge>
  ) : (
    <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-300 font-bold text-xs">
      PENDING
    </Badge>
  );
  return (
    <>
      <div className="flex flex-col gap-5 max-w-[1400px] mx-auto">
        <div className="flex items-center text-sm font-medium text-muted-foreground gap-1.5">
          <Link href="/orders" className="hover:text-primary transition-colors">
            Order List
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-semibold">Order Details</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Contract and Order
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-28">Order No:</span>
                  <span className="font-mono font-bold text-xs break-all">{order.id}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-28">Contract:</span>
                  <span className="font-mono font-semibold">NDC-00075</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-slate-500 shrink-0 w-28">Order Status:</span>
                  {statusBadge}
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-slate-500 shrink-0 w-28">Order Type:</span>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 font-semibold text-xs"
                  >
                    {order.type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Order Dates
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-32">Request Date:</span>
                  <span className="font-medium">{order.date}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-32">Approve Date:</span>
                  {order.approved ? (
                    <span className="font-medium">{order.approved}</span>
                  ) : (
                    <span className="text-slate-400 font-medium">N/A</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" /> Customer Organization
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-16">Name:</span>
                  <span className="font-bold">Lutfor Rahman</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-16">Email:</span>
                  <span className="font-medium text-xs break-all">
                    programmer@rajukdhaka.gov.bd
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-16">Phone:</span>
                  <span className="font-medium">+8801554001971</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-sm border-border overflow-hidden">
          <div className="px-5 py-4 border-b bg-slate-50/50 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-bold text-foreground">Order Tracking</h3>
          </div>
          <CardContent className="py-8">
            <OrderTracker steps={trackingSteps} />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-slate-600">Requested Packages</span>
              <Badge className="bg-primary/10 text-primary border border-primary/20 text-sm px-3 py-1 font-bold rounded-lg">
                {totalCost}
              </Badge>
              {!isCompleted && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-rose-600 border-rose-300 hover:bg-rose-50 hover:text-rose-700 bg-white font-semibold"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1.5" /> Cancel Order
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-amber-400 text-amber-700 hover:bg-amber-50 bg-white font-semibold gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Order PDF
              </Button>
              {!isChangePackage && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-400 text-amber-700 hover:bg-amber-50 bg-white font-semibold gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download Order Approval Letter
                </Button>
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {
                isChangePackage && (
                  <>
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-white bg-primary uppercase font-bold tracking-wider">
                        <tr>
                          <th className="px-5 py-4">Service Name</th>
                          <th className="px-5 py-4">Package Name</th>
                          <th className="px-5 py-4">Attribute</th>
                          <th className="px-5 py-4 text-center">Previous Quantity</th>
                          <th className="px-5 py-4 text-center">Requested Quantity</th>
                          <th className="px-5 py-4 text-center">Monthly Fee</th>
                          <th className="px-5 py-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {CHANGE_PACKAGE_ROWS.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-5 py-4 font-semibold text-slate-800">
                              {row.service}
                            </td>
                            <td className="px-5 py-4">
                              <Badge variant="outline" className="bg-slate-50 font-medium">
                                {row.pkg}
                              </Badge>
                            </td>
                            <td className="px-5 py-4 text-slate-600 text-xs">{row.attribute}</td>
                            <td className="px-5 py-4 text-center font-semibold text-slate-700">
                              {row.prevQty}
                            </td>
                            <td className="px-5 py-4 text-center font-bold text-primary">
                              {row.reqQty}
                            </td>
                            <td className="px-5 py-4 text-center font-semibold text-slate-700">
                              {row.fee}
                            </td>
                            <td className="px-5 py-4 text-center">
                              {row.hasAttachment ? (
                                <Button
                                  size="sm"
                                  className="bg-primary hover:bg-primary/90 text-white text-xs h-8 px-3 font-semibold"
                                >
                                  Download Attachment
                                </Button>
                              ) : (
                                <span className="text-slate-300">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="border-t border-border/60 bg-slate-50/60 px-5 py-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="p-1.5 bg-primary/10 rounded-lg">
                            <Calendar className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-bold text-slate-700">Activation Date</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <div className="relative">
                            <Input
                              type="date"
                              value={activationDate}
                              onChange={(e) => setActivationDate(e.target.value)}
                              disabled={activated}
                              className="h-9 w-44 border-slate-200 bg-white text-sm focus-visible:ring-primary/30 disabled:opacity-60 disabled:cursor-not-allowed pr-8"
                            />
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="relative">
                              <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                              <Input
                                type="time"
                                value={activationTime}
                                onChange={(e) => setActivationTime(e.target.value)}
                                disabled={activated}
                                className="h-9 w-36 pl-8 border-slate-200 bg-white text-sm focus-visible:ring-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
                              />
                            </div>
                          </div>
                        </div>
                        {activated ? (
                          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-bold text-emerald-700">Activated</span>
                          </div>
                        ) : (
                          <Button
                            onClick={handleActivate}
                            disabled={!activationDate}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-9 px-6 rounded-lg shadow-sm shrink-0 gap-1.5"
                          >
                            <Zap className="w-4 h-4" /> Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )

                /*  ── Pending New Request layout ── */
              }
              {
                !isChangePackage && !isCompleted && (
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-white bg-primary uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-5 py-4">Service Name</th>
                        <th className="px-5 py-4">Package Name</th>
                        <th className="px-5 py-4">Feature</th>
                        <th className="px-5 py-4">Monthly Fee</th>
                        <th className="px-5 py-4 text-center">Requested Quantity</th>
                        <th className="px-5 py-4 text-center">Attributes</th>
                        <th className="px-5 py-4 text-center">Status</th>
                        <th className="px-5 py-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {PENDING_REQUEST_ROWS.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                            {row.service}
                          </td>
                          <td className="px-5 py-4">
                            <Badge variant="outline" className="bg-slate-50 font-medium">
                              {row.pkg}
                            </Badge>
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-xs whitespace-nowrap">
                            {row.feature}
                          </td>
                          <td className="px-5 py-4 font-bold text-emerald-600 whitespace-nowrap">
                            {row.fee}
                          </td>
                          <td className="px-5 py-4 text-center font-bold text-lg">{row.qty}</td>
                          <td className="px-5 py-4 text-center">
                            <Button
                              size="sm"
                              onClick={() => openAttr(row.pkg)}
                              className="bg-primary hover:bg-primary/90 text-white text-xs h-8 px-3 font-semibold gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" /> View Attributes
                            </Button>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-300 whitespace-nowrap font-bold text-xs">
                              PENDING
                            </Badge>
                          </td>
                          <td className="px-5 py-4 text-center text-slate-300">-</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )

                /*  ── Completed New Request layout ── */
              }
              {isCompleted && (
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-white bg-primary uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-4 py-4">Service Name</th>
                      <th className="px-4 py-4">Package Name</th>
                      <th className="px-4 py-4">Feature</th>
                      <th className="px-4 py-4">Monthly Fee</th>
                      <th className="px-4 py-4 text-center">Requested Quantity</th>
                      <th className="px-4 py-4 text-center">Platform Type</th>
                      <th className="px-4 py-4 text-center">Attributes</th>
                      <th className="px-4 py-4 text-center">Status</th>
                      <th className="px-4 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {COMPLETED_REQUEST_ROWS.map((row, i) =>
                      row.type === "main" ? (
                        <CompletedMainRow key={i} row={row} onViewAttributes={openAttr} />
                      ) : null
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <ViewAttributesDialog open={attrOpen} onOpenChange={setAttrOpen} pkg={attrPkg} />
    </>
  );
}
