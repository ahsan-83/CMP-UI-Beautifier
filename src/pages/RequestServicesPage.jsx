function _nullishCoalesce(lhs, rhsFn) {
  if (lhs != null) {
    return lhs;
  } else {
    return rhsFn();
  }
}
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
  Server,
  Database,
  Cloud,
  Shield,
  Network,
  Building,
  Laptop,
  HardDrive,
  Cpu,
  Plus,
  ChevronDown,
  Trash2,
  Upload,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

/*  ─── Category definitions ─────────────────────────────── */
const CATEGORIES = [
  {
    id: "compute",
    name: "Compute",
    icon: Server,
  },
  {
    id: "collab",
    name: "Collaboration Platform",
    icon: Cloud,
  },
  {
    id: "db",
    name: "Database",
    icon: Database,
  },
  {
    id: "storage",
    name: "Storage",
    icon: HardDrive,
  },
  {
    id: "backup",
    name: "Backup",
    icon: Shield,
  },
  {
    id: "network",
    name: "Network",
    icon: Network,
  },
  {
    id: "sec",
    name: "Network Security",
    icon: Shield,
  },
  {
    id: "colo",
    name: "Colocation",
    icon: Building,
  },
  {
    id: "hosting",
    name: "Hosting",
    icon: Laptop,
  },
  {
    id: "design",
    name: "Design, Deployment and Consultation",
    icon: Cpu,
  },
];

/*  Sub-services per category */
const SUB_SERVICES = {
  compute: [
    {
      id: "vps",
      label: "Virtual Private Server (VPS) Service",
    },
    {
      id: "physical",
      label: "Physical Server Service",
    },
  ],
  collab: [
    {
      id: "email",
      label: "Email Service",
    },
    {
      id: "clouddrive",
      label: "Cloud Drive Service",
    },
  ],
  db: [
    {
      id: "mysql",
      label: "MySQL Database",
    },
    {
      id: "postgres",
      label: "PostgreSQL",
    },
  ],
  storage: [
    {
      id: "s3",
      label: "Object Storage",
    },
    {
      id: "nfs",
      label: "NFS Storage",
    },
  ],
  backup: [
    {
      id: "vmbk",
      label: "VM Backup",
    },
  ],
  network: [
    {
      id: "fw",
      label: "Firewall Service",
    },
    {
      id: "lb",
      label: "Load Balancer",
    },
  ],
  sec: [
    {
      id: "waf",
      label: "WAF Service",
    },
  ],
  colo: [
    {
      id: "rack",
      label: "Rack Rental",
    },
  ],
  hosting: [
    {
      id: "web",
      label: "Web Hosting",
    },
  ],
  design: [
    {
      id: "cons",
      label: "Consultation",
    },
  ],
};

/*  ─── VPS Packages ─────────────────────────────────────── */
const VPS_PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    specs: "2 vCPU, 4 GB RAM, 100 GB Storage",
    price: 5000,
  },
  {
    id: "standard",
    name: "Standard",
    specs: "4 vCPU, 8 GB RAM, 200 GB Storage",
    price: 10000,
  },
  {
    id: "advanced",
    name: "Advanced",
    specs: "4 vCPU, 12 GB RAM, 300 GB Storage",
    price: 15000,
  },
  {
    id: "premium",
    name: "Premium",
    specs: "8 vCPU, 16 GB RAM, 500 GB Storage",
    price: 20000,
  },
];

/*  ─── Email Service Package ────────────────────────────── */
const EMAIL_FEATURES = [
  {
    label: "No of Email Accounts",
    price: "৳ 100 / per account",
  },
  {
    label: "Delegated Admin Account Count",
    price: "৳ 2000",
  },
  {
    label: "e-Government Cloud Drive Service: 10GB/Account",
    price: null,
  },
  {
    label: "Domain Quota Upgradation: Unlimited (per GB)",
    price: "৳ 20 / per GB",
  },
];

/*  ─── Drag & Drop file area ────────────────────────────── */
function FileDropZone({ file, onFile }) {
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
        const dropped = e.dataTransfer.files[0];
        if (dropped) onFile(dropped);
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
      className={`border-2 border-dashed rounded-lg px-4 py-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${dragging ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary/50 hover:bg-slate-50"}`}
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
      <Upload className="w-5 h-5 text-slate-400" />
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

/*  ─── Email Config Dialog ──────────────────────────────── */
function EmailDialog({ open, onOpenChange }) {
  const { toast } = useToast();
  const [emailFile, setEmailFile] = useState(null);
  const [noOfAccounts, setNoOfAccounts] = useState("0");
  const [adminCount, setAdminCount] = useState("3");
  const [adminEmails, setAdminEmails] = useState(["", "", ""]);
  const handleAdminCountChange = (val) => {
    setAdminCount(val);
    const n = parseInt(val);
    setAdminEmails((prev) => {
      const next = [...prev];
      while (next.length < n) next.push("");
      return next.slice(0, n);
    });
  };
  const totalCost = 2000;
  const handleAdd = () => {
    onOpenChange(false);
    toast({
      title: "Added to Wishlist",
      description: "Email Service (Standard) has been added to your wishlist.",
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] flex flex-col overflow-hidden p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b bg-white shrink-0">
          <DialogTitle className="text-xl font-bold">Add Email Service to Wish List</DialogTitle>
          <div className="mt-2">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Standard
            </Badge>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <h4 className="font-bold text-foreground text-sm">Configuration Options</h4> /* Domain +
          No of Accounts */
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Domain Name</Label>
              <Input placeholder="" className="bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">No of Email Accounts</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={noOfAccounts}
                  min={0}
                  onChange={(e) => setNoOfAccounts(e.target.value)}
                  className="bg-white"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-primary text-primary hover:bg-primary/5 text-xs font-semibold whitespace-nowrap h-10 px-3 gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Download Email List Template
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-rose-500 font-medium">
              * Please add Excel file of email list
            </p>
            <FileDropZone file={emailFile} onFile={setEmailFile} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">No of Admin Accounts</Label>
            <Select value={adminCount} onValueChange={handleAdminCountChange}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["1", "2", "3", "4", "5"].map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            {adminEmails.map((email, i) => (
              <div key={i} className="space-y-1.5">
                <Label className="text-sm font-semibold">Admin Email Account {i + 1}</Label>
                <Input
                  value={email}
                  onChange={(e) => {
                    const updated = [...adminEmails];
                    updated[i] = e.target.value;
                    setAdminEmails(updated);
                  }}
                  placeholder=""
                  className="bg-white"
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="p-5 bg-white border-t shrink-0 flex-row items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-0.5">Total Cost:</p>
            <p className="text-xl font-bold text-primary">৳ {totalCost.toLocaleString()}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              Add to Wish List
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/*  ─── Page ──────────────────────────────────────────────── */
export default function RequestServicesPage() {
  const { toast } = useToast();
  const [activeCat, setActiveCat] = useState("compute");
  const [activeService, setActiveService] = useState("vps");

  // VPS dialog
  const [vpsDialogOpen, setVpsDialogOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);

  // Email dialog
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const handleCatChange = (id) => {
    setActiveCat(id);
    setActiveService(
      _nullishCoalesce(
        _optionalChain([
          SUB_SERVICES,
          "access",
          (_7) => _7[id],
          "optionalAccess",
          (_8) => _8[0],
          "optionalAccess",
          (_9) => _9.id,
        ]),
        () => ""
      )
    );
  };
  const handleVpsAdd = (pkg) => {
    setSelectedPkg(pkg);
    setVpsDialogOpen(true);
  };
  const handleVpsAddToWishlist = () => {
    setVpsDialogOpen(false);
    toast({
      title: "Added to Wishlist",
      description: `${_optionalChain([selectedPkg, "optionalAccess", (_10) => _10.name])} VPS has been added to your wishlist.`,
    });
  };
  const subServices = _nullishCoalesce(SUB_SERVICES[activeCat], () => []);
  const sectionTitle = _nullishCoalesce(
    _optionalChain([
      subServices,
      "access",
      (_11) => _11.find,
      "call",
      (_12) => _12((s) => s.id === activeService),
      "optionalAccess",
      (_13) => _13.label,
    ]),
    () => ""
  );
  return (
    <>
      <div className="flex flex-col h-[calc(100vh-100px)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-violet-50 rounded-xl border border-violet-100">
            <Server className="w-6 h-6 text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Request Based Services</h1>
            <p className="text-sm text-muted-foreground">
              Browse and request cloud services for your organisation
            </p>
          </div>
        </div>
        <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-4 border-b">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCatChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${isActive ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:bg-slate-100 hover:text-foreground"}`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
          <div className="w-full lg:w-64 shrink-0 bg-white rounded-xl border shadow-sm p-3 flex flex-col gap-1 h-fit">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2 mt-2">
              {_optionalChain([
                CATEGORIES,
                "access",
                (_14) => _14.find,
                "call",
                (_15) => _15((c) => c.id === activeCat),
                "optionalAccess",
                (_16) => _16.name,
              ])}
            </h3>
            {subServices.map((svc) => (
              <button
                key={svc.id}
                onClick={() => setActiveService(svc.id)}
                className={`text-left px-4 py-3 rounded-lg font-medium text-sm transition-all ${activeService === svc.id ? "bg-primary text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
              >
                {svc.label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto pr-2 pb-8">
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-primary inline-block relative">
                {sectionTitle}
                <div className="absolute -bottom-4 left-0 w-1/3 h-1 bg-primary rounded-full" />
              </h2>
            </div>
            {
              activeService === "vps" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {VPS_PACKAGES.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className="relative overflow-hidden group border-border hover:border-primary/50 transition-all hover:shadow-md"
                    >
                      <div className="absolute top-0 right-0 p-4">
                        <Server className="w-16 h-16 text-slate-100 group-hover:text-primary/10 transition-colors -rotate-12 transform scale-150" />
                      </div>
                      <CardContent className="p-6 relative z-10 flex flex-col h-full">
                        <Badge
                          variant="outline"
                          className="w-fit mb-4 bg-white shadow-sm font-bold tracking-widest text-[10px] uppercase border-primary/20 text-primary"
                        >
                          {pkg.name}
                        </Badge>
                        <h3 className="text-xl font-bold text-foreground mb-4 pr-12 leading-tight">
                          {pkg.specs.split(", ").map((spec, i) => (
                            <span key={i} className="block">
                              {spec}
                            </span>
                          ))}
                        </h3>
                        <div className="mt-auto pt-6 flex items-end justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground font-medium mb-1">
                              Monthly Fee
                            </p>
                            <p className="text-2xl font-bold text-emerald-600">
                              ৳ {pkg.price.toLocaleString()}
                            </p>
                          </div>
                          <Button
                            onClick={() => handleVpsAdd(pkg)}
                            className="bg-primary hover:bg-primary/90 shadow-sm rounded-xl"
                          >
                            <Plus className="w-4 h-4 mr-2" /> Add to Wishlist
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )

              /*  ── Email Service ── */
            }
            {
              activeService === "email" && (
                <div className="max-w-sm">
                  <Card className="border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-bold text-center text-foreground">Standard</h3>
                      <div className="space-y-3 divide-y divide-slate-100">
                        {EMAIL_FEATURES.map((f, i) => (
                          <div
                            key={i}
                            className={`flex items-start justify-between gap-4 ${i > 0 ? "pt-3" : ""}`}
                          >
                            <span className="text-sm text-slate-700 leading-snug">{f.label}</span>
                            {f.price && (
                              <span className="text-sm font-bold text-primary whitespace-nowrap shrink-0">
                                {f.price}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={() => setEmailDialogOpen(true)}
                        className="w-full bg-primary hover:bg-primary/90 mt-2 font-semibold"
                      >
                        Add to Wishlist
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )

              /*  ── Placeholder for other services ── */
            }
            {activeService !== "vps" && activeService !== "email" && (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                <Cloud className="w-12 h-12 mb-3 text-slate-200" />
                <p className="font-medium">No packages configured yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog open={vpsDialogOpen} onOpenChange={setVpsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col overflow-hidden bg-slate-50/50 p-0">
          <DialogHeader className="p-6 pb-4 bg-white border-b shrink-0">
            <DialogTitle className="text-xl">
              Add Virtual Private Server (VPS) Service to Wish List
            </DialogTitle>
            {selectedPkg && (
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                  {selectedPkg.name}
                </Badge>
                <Badge variant="secondary" className="bg-slate-100">
                  {selectedPkg.specs}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-emerald-200 bg-emerald-50 text-emerald-700"
                >
                  ৳ {selectedPkg.price.toLocaleString()} per month
                </Badge>
              </div>
            )}
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-white p-5 rounded-xl border shadow-sm relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-8 w-8"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <h4 className="font-bold text-foreground mb-4">Configuration Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-1.5">
                  <Label>OS</Label>
                  <Select defaultValue="centos">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="centos">CentOS</SelectItem>
                      <SelectItem value="ubuntu">Ubuntu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>OS Version</Label>
                  <Select defaultValue="7">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7.x</SelectItem>
                      <SelectItem value="8">8.x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Security Zone</Label>
                  <Select defaultValue="db">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="db">Database</SelectItem>
                      <SelectItem value="app">Application</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <Label>Public IP Needed</Label>
                  <Select defaultValue="no">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Partition to Maximize</Label>
                  <Input placeholder="/var" />
                </div>
                <div className="space-y-1.5">
                  <Label>VPN Account Name</Label>
                  <Input placeholder="vpn_user" />
                </div>
                <div className="space-y-1.5">
                  <Label>Port</Label>
                  <Input defaultValue="22, 80, 443" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "IP Address Service",
                },
                {
                  title: "Block Storage Service",
                },
                {
                  title: "WAF Service",
                },
              ].map((service, idx) => (
                <Collapsible key={idx} className="bg-white rounded-xl border shadow-sm">
                  <CollapsibleTrigger className="w-full px-5 py-4 flex items-center justify-between font-medium text-slate-700 hover:bg-slate-50 transition-colors rounded-xl">
                    {service.title}
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-5 pb-5 pt-2 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>Package</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Count</Label>
                        <Input type="number" defaultValue="0" />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
              <Collapsible className="bg-white rounded-xl border shadow-sm">
                <CollapsibleTrigger className="w-full px-5 py-4 flex items-center justify-between font-medium text-slate-700 hover:bg-slate-50 transition-colors rounded-xl">
                  Backup Service
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-5 pb-5 pt-2 border-t">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label>VM/Hostname</Label>
                      <Input />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Host IP</Label>
                      <Input />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Backup Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Backup Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Backup Directory</Label>
                      <Input />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Database Option</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Retention Period</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </Select>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <Button
              variant="outline"
              className="w-full border-dashed border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary py-6 rounded-xl font-bold bg-white"
            >
              <Plus className="w-5 h-5 mr-2" /> Add More Configurations
            </Button>
          </div>
          <DialogFooter className="p-6 bg-white border-t shrink-0 flex-row items-center justify-between">
            <div className="text-xl font-bold text-primary">
              Total Cost: ৳
              {_nullishCoalesce(
                _optionalChain([
                  selectedPkg,
                  "optionalAccess",
                  (_17) => _17.price,
                  "access",
                  (_18) => _18.toLocaleString,
                  "call",
                  (_19) => _19(),
                ]),
                () => 0
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setVpsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleVpsAddToWishlist}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Add to Wish List
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <EmailDialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen} />
    </>
  );
}
