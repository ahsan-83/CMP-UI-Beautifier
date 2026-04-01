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
import { Link } from "wouter";
import {
  ChevronRight,
  Package,
  FileText,
  Settings,
  History,
  Activity,
  AlertTriangle,
  Plus,
  Upload,
  ArrowRightLeft,
  Hash,
  ChevronDown,
  Zap,
  Calendar,
  Clock,
  CheckCircle2,
  Server,
  TrendingUp,
  PowerOff,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { useState, useRef } from "react";
import { useToast } from "../hooks/use-toast";

/*  ─── File Drop Zone ──────────────────────────────────── */
function EmailListDropZone({ file, onFile }) {
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
          (_2) => _2.current,
          "optionalAccess",
          (_3) => _3.click,
          "call",
          (_4) => _4(),
        ])
      }
      className={`border-2 border-dashed rounded-lg py-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${dragging ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary/50 hover:bg-slate-50"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={(e) => {
          if (
            _optionalChain([
              e,
              "access",
              (_5) => _5.target,
              "access",
              (_6) => _6.files,
              "optionalAccess",
              (_7) => _7[0],
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
          {"Drag & Drop file for Email list here or"}
          <span className="text-primary font-semibold underline">Browse</span>
        </p>
      )}
    </div>
  );
}

/*  ─── Attribute History Dialog ─────────────────────────── */
const ATTR_HISTORY = [
  {
    orderNo: "20260302-NDC-00075-455",
    attributes: [
      {
        name: "Domain Quota Upgradation: Unlimited (per GB)",
        oldValue: 0,
        newValue: 25,
      },
      {
        name: "No of Email Accounts",
        oldValue: 20,
        newValue: 30,
      },
      {
        name: "Domain Quota Upgradation: Unlimited (per GB)",
        oldValue: 25,
        newValue: 1,
      },
      {
        name: "Delegated Admin Account Count",
        oldValue: 0,
        newValue: 0,
      },
    ],
  },
  {
    orderNo: "20260110-NDC-00075-312",
    attributes: [
      {
        name: "No of Email Accounts",
        oldValue: 10,
        newValue: 20,
      },
      {
        name: "Delegated Admin Account Count",
        oldValue: 0,
        newValue: 2,
      },
    ],
  },
];
function AttributeHistoryDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-8 pt-6 pb-5 border-b border-border/50 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/10">
              <ArrowRightLeft className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                Attribute Change History
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Track all attribute modifications across orders
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="bg-slate-50/60 max-h-[65vh] overflow-y-auto px-8 py-6">
          <div className="bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-border/60">
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-52">
                      <span className="flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5" /> Order No
                      </span>
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Settings className="w-3.5 h-3.5" /> Attribute Name
                      </span>
                    </th>
                    <th className="text-center px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-28">
                      Old Value
                    </th>
                    <th className="text-center px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider w-28">
                      New Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {ATTR_HISTORY.map((group) =>
                    group.attributes.map((attr, attrIdx) => (
                      <tr
                        key={`${group.orderNo}-${attrIdx}`}
                        className={`transition-colors hover:bg-slate-50/60 ${attrIdx % 2 === 0 ? "" : "bg-slate-50/20"}`}
                      >
                        {
                          attrIdx === 0 ? (
                            <td
                              rowSpan={group.attributes.length}
                              className="px-5 py-4 align-middle border-r border-border/40"
                            >
                              <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-bold leading-snug break-all">
                                {group.orderNo}
                              </span>
                            </td>
                          ) : null

                          /*  Attribute Name */
                        }
                        <td className="px-5 py-4 font-semibold text-foreground">{attr.name}</td> /*
                        Old Value */
                        <td className="px-5 py-4 text-center">
                          <span className="inline-block min-w-[2rem] px-2.5 py-1 rounded-md bg-rose-50 border border-rose-100 text-rose-700 font-mono font-bold text-sm">
                            {attr.oldValue}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="inline-block min-w-[2rem] px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono font-bold text-sm">
                            {attr.newValue}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="px-8 py-4 border-t border-border/50 bg-white flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-9 rounded-lg"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/*  ─── Change Package Dialog ────────────────────────────── */
function ChangePackageDialog({ open, onOpenChange }) {
  const { toast } = useToast();
  const [emailAccounts, setEmailAccounts] = useState("0");
  const [emailAction, setEmailAction] = useState("add");
  const [domainQuota, setDomainQuota] = useState("25");
  const [emailFile, setEmailFile] = useState(null);
  const [adminEmails, setAdminEmails] = useState(["admin@a.gov.bd", "support@a.gov.bd"]);
  const quotaNum = parseInt(domainQuota) || 0;
  const quotaValid = quotaNum >= 20 && quotaNum <= 500 && quotaNum % 5 === 0;
  const handleAddAdmin = () => setAdminEmails((prev) => [...prev, ""]);
  const handleDeleteAdmin = (i) => setAdminEmails((prev) => prev.filter((_, idx) => idx !== i));
  const handleAdminChange = (i, val) =>
    setAdminEmails((prev) => {
      const n = [...prev];
      n[i] = val;
      return n;
    });
  const handleConfirm = () => {
    onOpenChange(false);
    toast({
      title: "Package change requested",
      description: "Your change package request has been submitted.",
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden rounded-xl">
        <DialogHeader className="bg-primary px-6 py-4 shrink-0">
          <DialogTitle className="text-white text-lg font-bold">Change Package</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-white">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">No of Email Accounts</Label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min={0}
                value={emailAccounts}
                onChange={(e) => setEmailAccounts(e.target.value)}
                className="w-40 bg-white"
              />
              <div className="flex items-center gap-4 text-sm font-medium">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="emailAction"
                    value="add"
                    checked={emailAction === "add"}
                    onChange={() => setEmailAction("add")}
                    className="accent-primary"
                  />
                  Add
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="emailAction"
                    value="remove"
                    checked={emailAction === "remove"}
                    onChange={() => setEmailAction("remove")}
                    className="accent-primary"
                  />
                  Remove
                </label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Domain Quota (GB)</Label>
            <Input
              type="number"
              min={20}
              max={500}
              step={5}
              value={domainQuota}
              onChange={(e) => setDomainQuota(e.target.value)}
              className={`w-40 bg-white ${!quotaValid && domainQuota !== "" ? "border-amber-400 focus-visible:ring-amber-300" : ""}`}
            />
            <div className="space-y-0.5">
              <p className="text-xs text-amber-600 font-medium">
                ** Domain Quota in range from 20GB to 500GB
              </p>
              <p className="text-xs text-amber-600 font-medium">
                ** Domain Quota amount should be multiple of 5.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-rose-500 font-medium">
              * Please submit Excel email list to add or remove emails
            </p>
            <EmailListDropZone file={emailFile} onFile={setEmailFile} />
          </div>
          <div className="space-y-3">
            {adminEmails.map((email, i) => (
              <div key={i} className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">
                  Admin Email Account {i + 1}
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={email}
                    onChange={(e) => handleAdminChange(i, e.target.value)}
                    placeholder="admin@example.gov.bd"
                    className="bg-white flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleDeleteAdmin(i)}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 shrink-0"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddAdmin}
              className="bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 font-semibold gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Admin Email
            </Button>
          </div>
        </div>
        <DialogFooter className="px-6 py-4 bg-white border-t shrink-0 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5"
          >
            Confirm Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/*  ─── Upgrade Package Dialog ──────────────────────────────── */
const UPGRADE_PACKAGES = [
  { value: "basic", label: "Basic — 2 vCPU, 4 GB RAM, 100 GB Storage" },
  { value: "standard", label: "Standard — 4 vCPU, 8 GB RAM, 200 GB Storage" },
  { value: "advanced", label: "Advanced — 4 vCPU, 12 GB RAM, 300 GB Storage" },
  { value: "enterprise", label: "Enterprise — 8 vCPU, 32 GB RAM, 1 TB Storage" },
];

function UpgradePackageDialog({ open, onOpenChange }) {
  const { toast } = useToast();
  const [packageType, setPackageType] = useState("");

  const handleConfirm = () => {
    if (!packageType) return;
    const label = UPGRADE_PACKAGES.find((p) => p.value === packageType)?.label || packageType;
    onOpenChange(false);
    setPackageType("");
    toast({
      title: "Upgrade Request Submitted",
      description: `Package upgrade request to "${label.split(" — ")[0]}" has been submitted successfully.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-xl">
        {/* Header */}
        <DialogHeader className="bg-primary px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-white text-lg font-bold leading-tight">
                Select New Package
              </DialogTitle>
              <p className="text-blue-100 text-xs mt-0.5">
                Choose a package to upgrade this resource
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="px-6 py-6 bg-white space-y-5">
          {/* Current package info strip */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200">
            <Package className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Current Package</p>
              <p className="text-sm font-bold text-slate-800">
                Advanced — 4 vCPU, 12 GB RAM, 300 GB Storage
              </p>
            </div>
          </div>

          {/* Package selector */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">
              Select Package Type <span className="text-rose-500">*</span>
            </Label>
            <Select value={packageType} onValueChange={setPackageType}>
              <SelectTrigger className="w-full bg-white border-slate-300 focus:ring-primary/30 h-11">
                <SelectValue placeholder="Select Package Type" />
              </SelectTrigger>
              <SelectContent>
                {UPGRADE_PACKAGES.map((pkg) => (
                  <SelectItem
                    key={pkg.value}
                    value={pkg.value}
                    disabled={pkg.value === "advanced"}
                  >
                    <span className="flex items-center gap-2">
                      {pkg.value === "advanced" && (
                        <span className="text-xs text-muted-foreground">(Current)</span>
                      )}
                      {pkg.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!packageType && (
              <p className="text-xs text-amber-600 font-medium">
                * Please select a package type to continue
              </p>
            )}
          </div>

          {/* Upgrade preview */}
          {packageType && packageType !== "advanced" && (
            <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-800">
                <p className="font-bold mb-0.5">Upgrade Preview</p>
                <p>{UPGRADE_PACKAGES.find((p) => p.value === packageType)?.label}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t border-border/60 bg-slate-50/60 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setPackageType("");
              onOpenChange(false);
            }}
            className="font-semibold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!packageType || packageType === "advanced"}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <TrendingUp className="w-4 h-4" />
            Confirm Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/*  ─── VPS Attributes Tree ───────────────────────────────── */
const VPS_ATTR_TREE = [
  {
    key: "OS",
    value: "Ubuntu",
    children: [
      {
        key: "OS Version",
        value: "22.04",
      },
    ],
  },
  {
    key: "Security Zone",
    value: "NMS",
  },
  {
    key: "Port",
    value: "22, 80, 443",
  },
  {
    key: "Public IP Needed?",
    value: "Yes",
  },
  {
    key: "Partition to maximize",
    value: "",
  },
  {
    key: "VPN Account Name",
    value: "",
  },
];
function VpsAttributeTree() {
  const [expanded, setExpanded] = useState(new Set(["OS"]));
  const toggle = (key) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  return (
    <div className="space-y-0.5">
      {VPS_ATTR_TREE.map((attr) => (
        <div key={attr.key}>
          <div
            className={`flex items-center gap-2 py-2.5 px-2 rounded-lg transition-colors ${attr.children ? "cursor-pointer hover:bg-slate-50" : ""}`}
            onClick={() => attr.children && toggle(attr.key)}
          >
            {attr.children ? (
              <ChevronDown
                className={`w-4 h-4 text-primary shrink-0 transition-transform ${expanded.has(attr.key) ? "" : "-rotate-90"}`}
              />
            ) : (
              <div className="w-4 shrink-0" />
            )}
            <span className="font-semibold text-slate-700 text-sm w-44 shrink-0">{attr.key}</span>
            {attr.value && <span className="text-slate-600 text-sm">{attr.value}</span>}
          </div>
          {attr.children &&
            expanded.has(attr.key) &&
            attr.children.map((child) => (
              <div
                key={child.key}
                className="flex items-center gap-2 py-2 px-2 pl-9 rounded-lg hover:bg-slate-50/50"
              >
                <div className="w-4 shrink-0" />
                <span className="font-medium text-slate-600 text-sm w-44 shrink-0">
                  {child.key}
                </span>
                <span className="text-slate-600 text-sm">{child.value}</span>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

/*  ─── Page ──────────────────────────────────────────────── */
export default function ResourceDetailPage() {
  const [changePackageOpen, setChangePackageOpen] = useState(false);
  const [attrHistoryOpen, setAttrHistoryOpen] = useState(false);
  const [upgradePackageOpen, setUpgradePackageOpen] = useState(false);

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
    toast({
      title: "VPS Activated",
      description: `Resource activated on ${actDate} at ${actTime}.`,
    });
  };
  return (
    <>
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
        <div className="flex items-center text-sm font-medium text-muted-foreground gap-2">
          <Link href="/orders" className="hover:text-primary transition-colors">
            Order List
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href="/orders/20260225-NDC-00075-438"
            className="hover:text-primary transition-colors"
          >
            Order Details
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Resource Details</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Virtual Private Server (VPS) Service (Advanced)
        </h1>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="bg-white border shadow-sm p-1 rounded-xl mb-6">
            <TabsTrigger
              value="info"
              className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
            >
              Resource Information
            </TabsTrigger>
            <TabsTrigger
              value="attached"
              className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
            >
              Attached Additional Resources
            </TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="space-y-6 m-0 animate-in fade-in-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-[#f0f7ff] border-blue-100 shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Package className="w-4 h-4" /> Package Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Package:</span>
                      <span className="font-bold text-blue-950">Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Category:</span>
                      <span className="font-medium">Virtual Private Server (VPS) Service</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Feature:</span>
                      <span className="font-medium text-xs">4 vCPU, 12 GB RAM, 300 GB Storage</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Platform Type:</span>
                      <span className="font-bold text-blue-950">NUTANIX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Monthly Fee:</span>
                      <span className="font-bold text-blue-950">15000</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-blue-200/50">
                      <span className="text-blue-700 font-medium">Status:</span>
                      <Badge className="bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-50 shadow-sm text-xs font-bold">
                        ACCEPTED
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#f0fdf4] border-emerald-100 shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Contract Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-emerald-700 block mb-1">Order No:</span>
                      <span className="font-mono font-bold text-emerald-950 text-xs">
                        20260225-NDC-00075-438
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-700 block mb-1">Contract:</span>
                      <span className="font-mono font-bold text-emerald-950">NDC-00075</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#ecfeff] border-cyan-100 shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-sm font-bold text-cyan-900 mb-4 flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Service Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cyan-700">Name:</span>
                      <span className="font-bold text-cyan-950">Cloud</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-700">Service ID:</span>
                      <span className="font-mono font-medium">SID-00075</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-700">URL:</span>
                      <a
                        href="https://rajuk.gov.bd"
                        className="text-primary hover:underline text-xs"
                      >
                        https://rajuk.gov.bd
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-700">Start Date:</span>
                      <span className="font-medium">2023-05-18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-700">End Date:</span>
                      <span className="font-medium">2040-12-31</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#fffbeb] border-amber-100 shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-sm font-bold text-amber-900 mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Service Status
                  </h3>
                  <div className="space-y-4">
                    <Badge className="bg-amber-50 text-amber-700 border border-amber-300 w-full justify-center py-1.5 text-sm font-bold">
                      ACCEPTED
                    </Badge>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-amber-700 block mb-0.5 text-xs">Request Date:</span>
                        <span className="font-medium text-amber-950">Feb 25, 2026 03:28 PM</span>
                      </div>
                      <div>
                        <span className="text-amber-700 block mb-0.5 text-xs">
                          Activation Date:
                        </span>
                        <span className="font-medium text-slate-400">N/A</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
              <Card className="border-border shadow-sm lg:col-span-2">
                <div className="p-5 border-b bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-foreground">Attributes</h3>
                  <Button
                    onClick={() => setAttrHistoryOpen(true)}
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary/30 hover:bg-primary/5 bg-white"
                  >
                    <History className="w-4 h-4 mr-2" /> History
                  </Button>
                </div>
                <CardContent className="p-5">
                  <VpsAttributeTree />
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm lg:col-span-3 overflow-hidden">
                <div className="px-5 py-4 bg-primary flex items-center gap-2.5">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Server className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-base">Action</h3>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-slate-700">Private IP</Label>
                    <Input
                      placeholder="e.g. 192.168.10.5"
                      value={privateIP}
                      onChange={(e) => setPrivateIP(e.target.value)}
                      disabled={vpsActivated}
                      className="bg-white border-slate-200 focus-visible:ring-primary/30 disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-slate-700">VM Name</Label>
                    <Input
                      placeholder="e.g. vm-rajuk-prod-01"
                      value={vmName}
                      onChange={(e) => setVmName(e.target.value)}
                      disabled={vpsActivated}
                      className="bg-white border-slate-200 focus-visible:ring-primary/30 disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold text-slate-700">Public IP</Label>
                    <Input
                      placeholder="e.g. 103.28.121.44"
                      value={publicIP}
                      onChange={(e) => setPublicIP(e.target.value)}
                      disabled={vpsActivated}
                      className="bg-white border-slate-200 focus-visible:ring-primary/30 disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-2 pt-1">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Activation Date
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="date"
                        value={actDate}
                        onChange={(e) => setActDate(e.target.value)}
                        disabled={vpsActivated}
                        className="bg-white border-slate-200 focus-visible:ring-primary/30 disabled:opacity-60 w-44"
                      />
                      <div className="relative">
                        <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        <Input
                          type="time"
                          value={actTime}
                          onChange={(e) => setActTime(e.target.value)}
                          disabled={vpsActivated}
                          className="bg-white border-slate-200 focus-visible:ring-primary/30 pl-8 disabled:opacity-60 w-36"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    {vpsActivated ? (
                      <div className="flex items-center justify-center gap-2.5 w-full py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="font-bold text-emerald-700 text-sm">
                          Resource Activated Successfully
                        </span>
                      </div>
                    ) : (
                      <Button
                        onClick={handleVpsActivate}
                        disabled={!actDate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 rounded-lg shadow-sm gap-2"
                      >
                        <Zap className="w-4 h-4" /> Activate
                      </Button>
                    )}
                  </div>

                  {/* Package action buttons */}
                  <div className="border-t border-border/50 pt-4 flex flex-col gap-2.5">
                    <Button
                      onClick={() => setUpgradePackageOpen(true)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-10 rounded-lg shadow-sm gap-2"
                    >
                      <TrendingUp className="w-4 h-4" /> Upgrade Package
                    </Button>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Deactivation Requested",
                          description: "Package deactivation request has been submitted.",
                        });
                      }}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold h-10 rounded-lg shadow-sm gap-2"
                    >
                      <PowerOff className="w-4 h-4" /> Deactivate Package
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="attached" className="space-y-8 m-0 animate-in fade-in-50">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Additional Resources</h2>
              <Card className="mb-8 border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-slate-50/50">
                  <h3 className="font-bold text-foreground">Orphan Resource Packages</h3>
                </div>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground bg-slate-50 uppercase border-b">
                        <tr>
                          <th className="px-4 py-3">ID</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Feature</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Requested</th>
                          <th className="px-4 py-3">Accepted</th>
                          <th className="px-4 py-3">Activation Date</th>
                          <th className="px-4 py-3">Deactivation Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">
                            <div className="flex flex-col items-center justify-center">
                              <AlertTriangle className="w-8 h-8 text-slate-300 mb-2" />
                              <p>No orphan resource packages found</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-foreground">Request Additional Resources</h3>
                <Button variant="link" className="text-primary">
                  — Hide Extra Resources
                </Button>
              </div>
              <Card className="border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left align-middle">
                    <thead className="text-xs text-white bg-primary uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-4 w-1/4">Service Name</th>
                        <th className="px-5 py-4 w-1/4">Package</th>
                        <th className="px-5 py-4 w-1/6 text-center">Count</th>
                        <th className="px-5 py-4 w-1/6 text-right">Cost (৳)</th>
                        <th className="px-5 py-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        {
                          name: "IP Address Service",
                          count: true,
                        },
                        {
                          name: "Block Storage Service",
                          count: true,
                        },
                        {
                          name: "Web Application Firewall (WAF) Service",
                          count: false,
                        },
                        {
                          name: "Enterprise Backup Service",
                          count: false,
                        },
                      ].map((service, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/30">
                          <td className="px-5 py-4 font-bold text-slate-700">{service.name}</td>
                          <td className="px-5 py-4">
                            <Select>
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Select Package" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="std">Standard</SelectItem>
                                <SelectItem value="adv">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-5 py-4 text-center">
                            {service.count ? (
                              <Input
                                type="number"
                                defaultValue="0"
                                className="w-20 mx-auto text-center bg-white"
                              />
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-right font-bold text-emerald-600 text-lg">
                            ৳ 0
                          </td>
                          <td className="px-5 py-4 text-center">
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90 w-full sm:w-auto shadow-sm"
                            >
                              <Plus className="w-4 h-4 mr-1.5" /> Add to Wishlist
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <ChangePackageDialog open={changePackageOpen} onOpenChange={setChangePackageOpen} />
      <AttributeHistoryDialog open={attrHistoryOpen} onOpenChange={setAttrHistoryOpen} />
      <UpgradePackageDialog open={upgradePackageOpen} onOpenChange={setUpgradePackageOpen} />
    </>
  );
}
