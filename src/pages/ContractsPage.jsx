import React from "react";
import { useState } from "react";
import { Link } from "wouter";
import {
  FileText,
  Cloud,
  Mail,
  AlertTriangle,
  Edit2,
  Plus,
  ExternalLink,
  ChevronRight,
  Server,
  FilePlus2,
  CalendarRange,
  Upload,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { useToast } from "../hooks/use-toast";

/*  ── Mock users for dropdowns ───────────────────────────── */
const USERS = [
  {
    value: "u1",
    label: "Lutfor Rahman",
  },
  {
    value: "u2",
    label: "Programmer Raj",
  },
  {
    value: "u3",
    label: "Sadia Islam",
  },
  {
    value: "u4",
    label: "Mahbub Alam",
  },
  {
    value: "u5",
    label: "Nusrat Jahan",
  },
];

/*  ── Select field ───────────────────────────────────────── */
function UserSelect({ id, value, onChange, required }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
      }}
    >
      <option value="">Select a user</option>
      {USERS.map((u) => (
        <option key={u.value} value={u.value}>
          {u.label}
        </option>
      ))}
    </select>
  );
}

/*  ── Add New Service Dialog ─────────────────────────────── */
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
    setForm((prev) => ({
      ...prev,
      [key]: val,
    }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.billingPrimary || !form.technicalPrimary) return;
    toast({
      title: "Service Requested",
      description: `"${form.name}" has been submitted for approval.`,
    });
    onOpenChange(false);
    setForm({
      name: "",
      billingPrimary: "",
      technicalPrimary: "",
      billingSecondary: "",
      technicalSecondary: "",
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-7 pt-6 pb-5 border-b border-border/50 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Server className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Add a New Service
            </DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="bg-slate-50/60">
          <div className="px-7 py-6 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="svc-name" className="text-sm font-semibold text-foreground">
                Service Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="svc-name"
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="e.g. (Mail Service)"
                required
                className="h-10 border-slate-200 focus-visible:ring-primary/30 bg-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="billing-primary" className="text-sm font-semibold text-foreground">
                Billing User (Primary) <span className="text-red-500">*</span>
              </Label>
              <UserSelect
                id="billing-primary"
                value={form.billingPrimary}
                onChange={set("billingPrimary")}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tech-primary" className="text-sm font-semibold text-foreground">
                Technical User (Primary) <span className="text-red-500">*</span>
              </Label>
              <UserSelect
                id="tech-primary"
                value={form.technicalPrimary}
                onChange={set("technicalPrimary")}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="billing-secondary" className="text-sm font-semibold text-slate-600">
                Billing User (Secondary)
              </Label>
              <UserSelect
                id="billing-secondary"
                value={form.billingSecondary}
                onChange={set("billingSecondary")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tech-secondary" className="text-sm font-semibold text-slate-600">
                Technical User (Secondary)
              </Label>
              <UserSelect
                id="tech-secondary"
                value={form.technicalSecondary}
                onChange={set("technicalSecondary")}
              />
            </div>
          </div>
          <div className="px-7 py-4 flex justify-end border-t border-border/50 bg-white">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-9 rounded-lg shadow-sm"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/*  ── Add New Contract Dialog ────────────────────────────── */
function NewContractDialog({ open, onOpenChange }) {
  const { toast } = useToast();
  const empty = {
    projectName: "",
    webUrl: "",
    owner: "",
    billingPrimary: "",
    billingSecondary: "",
    serviceName: "",
    tenureStart: "",
    tenureEnd: "",
    manager: "",
    techPrimary: "",
    techSecondary: "",
  };
  const [form, setForm] = useState(empty);
  const [tenureError, setTenureError] = useState(false);
  const [documents, setDocuments] = useState([]);
  const set = (key) => (val) => {
    setForm((prev) => ({
      ...prev,
      [key]: val,
    }));
    if (key === "tenureStart" || key === "tenureEnd") setTenureError(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.tenureStart || !form.tenureEnd) {
      setTenureError(true);
      return;
    }
    toast({
      title: "Contract Submitted",
      description: `"${form.projectName || "New Contract"}" has been submitted for review.`,
    });
    onOpenChange(false);
    setForm(empty);
    setDocuments([]);
    setTenureError(false);
  };
  const addDocument = () => setDocuments((d) => [...d, `Document_${d.length + 1}.pdf`]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-8 pt-6 pb-5 border-b border-border/50 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <FilePlus2 className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Add a New Contract
            </DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50 bg-slate-50/60 max-h-[70vh] overflow-y-auto">
            <div className="px-8 py-6 space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="c-project" className="text-sm font-semibold text-foreground">
                  Project Name
                </Label>
                <Input
                  id="c-project"
                  value={form.projectName}
                  onChange={(e) => set("projectName")(e.target.value)}
                  placeholder="Enter project name"
                  className="h-10 border-slate-200 bg-white text-sm focus-visible:ring-primary/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-url" className="text-sm font-semibold text-foreground">
                  Web URL
                </Label>
                <Input
                  id="c-url"
                  value={form.webUrl}
                  onChange={(e) => set("webUrl")(e.target.value)}
                  placeholder="https://example.gov.bd"
                  className="h-10 border-slate-200 bg-white text-sm focus-visible:ring-primary/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-owner" className="text-sm font-semibold text-foreground">
                  Owner <span className="text-red-500">*</span>
                </Label>
                <UserSelect id="c-owner" value={form.owner} onChange={set("owner")} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-bill-p" className="text-sm font-semibold text-foreground">
                  Billing User (Primary) <span className="text-red-500">*</span>
                </Label>
                <UserSelect
                  id="c-bill-p"
                  value={form.billingPrimary}
                  onChange={set("billingPrimary")}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-bill-s" className="text-sm font-semibold text-slate-600">
                  Billing User (Secondary)
                </Label>
                <UserSelect
                  id="c-bill-s"
                  value={form.billingSecondary}
                  onChange={set("billingSecondary")}
                />
              </div>
            </div>
            <div className="px-8 py-6 space-y-5 flex flex-col">
              <div className="space-y-1.5">
                <Label htmlFor="c-svc" className="text-sm font-semibold text-foreground">
                  Service Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="c-svc"
                  value={form.serviceName}
                  onChange={(e) => set("serviceName")(e.target.value)}
                  placeholder="e.g (Mail Service)"
                  required
                  className="h-10 border-slate-200 bg-white text-sm focus-visible:ring-primary/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-foreground">
                  Agreement Tenure <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <CalendarRange className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                      type="date"
                      value={form.tenureStart}
                      onChange={(e) => set("tenureStart")(e.target.value)}
                      className={`h-10 pl-9 border-slate-200 bg-white text-sm focus-visible:ring-primary/30 ${tenureError ? "border-red-400 focus-visible:ring-red-300" : ""}`}
                    />
                  </div>
                  <span className="text-slate-400 text-sm font-medium shrink-0">–</span>
                  <div className="relative flex-1">
                    <CalendarRange className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                      type="date"
                      value={form.tenureEnd}
                      onChange={(e) => set("tenureEnd")(e.target.value)}
                      className={`h-10 pl-9 border-slate-200 bg-white text-sm focus-visible:ring-primary/30 ${tenureError ? "border-red-400 focus-visible:ring-red-300" : ""}`}
                    />
                  </div>
                </div>
                {tenureError && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                    <AlertTriangle className="w-3 h-3" /> Please select a valid Agreement tenure.
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-mgr" className="text-sm font-semibold text-foreground">
                  Manager <span className="text-red-500">*</span>
                </Label>
                <UserSelect id="c-mgr" value={form.manager} onChange={set("manager")} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-tech-p" className="text-sm font-semibold text-foreground">
                  Technical User (Primary) <span className="text-red-500">*</span>
                </Label>
                <UserSelect
                  id="c-tech-p"
                  value={form.techPrimary}
                  onChange={set("techPrimary")}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-tech-s" className="text-sm font-semibold text-slate-600">
                  Technical User (Secondary)
                </Label>
                <UserSelect
                  id="c-tech-s"
                  value={form.techSecondary}
                  onChange={set("techSecondary")}
                />
              </div>
              {
                documents.length > 0 && (
                  <div className="space-y-1.5">
                    {documents.map((d) => (
                      <div
                        key={d}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700"
                      >
                        <FileText className="w-4 h-4 text-primary shrink-0" /> {d}
                      </div>
                    ))}
                  </div>
                )

                /*  Add Document */
              }
              <div className="pt-2">
                <Button
                  type="button"
                  onClick={addDocument}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 px-5 text-sm font-semibold rounded-lg shadow-sm"
                >
                  <Upload className="w-4 h-4 mr-2" /> Add Document
                </Button>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 flex justify-end border-t border-border/50 bg-white">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="mr-3 h-9 px-6 text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-9 rounded-lg shadow-sm"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
const CONTRACT_LIST = [
  {
    id: "NDC-00075",
    name: "EPLOT Service Management System",
    status: "ACTIVE",
    services: 2,
    start: "2023-05-18",
    end: "2040-12-31",
  },
  {
    id: "NDC-00082",
    name: "Urban Development Portal",
    status: "ACTIVE",
    services: 3,
    start: "2024-01-10",
    end: "2035-06-30",
  },
  {
    id: "NDC-00091",
    name: "Housing Registry System",
    status: "EXPIRED",
    services: 1,
    start: "2021-03-01",
    end: "2024-02-28",
  },
  {
    id: "NDC-00103",
    name: "Land Use Planning & Monitoring",
    status: "ACTIVE",
    services: 4,
    start: "2024-07-15",
    end: "2038-07-14",
  },
  {
    id: "NDC-00118",
    name: "Smart City Infrastructure Services",
    status: "PENDING",
    services: 0,
    start: "2026-02-01",
    end: "2031-01-31",
  },
];
export default function ContractsPage() {
  const [newServiceOpen, setNewServiceOpen] = useState(false);
  const [newContractOpen, setNewContractOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("NDC-00075");
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-slate-50 border flex items-center justify-center p-2">
            <img
              src={`${import.meta.env.BASE_URL}images/rajuk-logo.png`}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Rajdhani Unnayan Kartipakkha (RAJUK)
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Ministry of Housing and Public Works
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center px-4 py-2 bg-slate-50 rounded-lg border">
              <div className="text-lg font-bold text-primary">{CONTRACT_LIST.length}</div>
              <div className="text-[10px] uppercase font-semibold text-slate-500">Contracts</div>
            </div>
            <div className="text-center px-4 py-2 bg-slate-50 rounded-lg border">
              <div className="text-lg font-bold text-emerald-600">2</div>
              <div className="text-[10px] uppercase font-semibold text-slate-500">Services</div>
            </div>
            <Button
              onClick={() => setNewContractOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white font-semibold h-10 px-5 rounded-xl shadow-sm"
            >
              <FilePlus2 className="w-4 h-4 mr-2" /> Add New Contract
            </Button>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="xl:w-72 flex flex-col rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm shrink-0">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-100/80 flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Contract List</h2>
              <span className="text-xs font-semibold text-slate-400">
                {CONTRACT_LIST.length} items
              </span>
            </div>
            <div className="flex flex-col gap-2 p-3 overflow-y-auto max-h-[600px]">
              {CONTRACT_LIST.map((c) => {
                const isSelected = c.id === selectedId;
                const statusStyle =
                  c.status === "ACTIVE"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : c.status === "EXPIRED"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : "bg-amber-50 text-amber-700 border-amber-200";
                return (
                  <Card
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={`cursor-pointer transition-all duration-150 shadow-sm shrink-0 ${isSelected ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border bg-white hover:border-primary/40 hover:bg-slate-50/60"}`}
                  >
                    <CardContent className="p-3.5 flex flex-col gap-2">
                      <span
                        className={`font-bold text-sm line-clamp-2 leading-snug ${isSelected ? "text-primary" : "text-foreground"}`}
                      >
                        {c.name}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground">ID: {c.id}</span>
                        <Badge variant="outline" className={`text-xs font-semibold ${statusStyle}`}>
                          {c.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span>{c.start}</span>
                        <span>→</span>
                        <span>{c.end}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="flex-1 bg-white rounded-2xl border shadow-sm flex flex-col min-h-[600px]">
            <Tabs defaultValue="info" className="w-full h-full flex flex-col">
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b gap-4">
                <TabsList className="bg-slate-100">
                  <TabsTrigger value="info">Contract Info</TabsTrigger>
                  <TabsTrigger value="services">Service List</TabsTrigger>
                  <TabsTrigger value="agreements">Agreements</TabsTrigger>
                </TabsList>
                <Button
                  onClick={() => setNewServiceOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" /> Request New Service
                </Button>
              </div>
              <div className="p-4 md:p-6 flex-1 bg-slate-50/50">
                <TabsContent value="info" className="m-0 space-y-6 animate-in fade-in-50">
                  <div className="bg-white rounded-xl border p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                      ACTIVE
                    </div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" /> Contract Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Contract ID</p>
                        <p className="font-mono font-medium">NDC-00075</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Project Name</p>
                        <p className="font-medium">EPLOT Service Management System</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Web URL</p>
                        <a
                          href="https://rajuk.gov.bd"
                          target="_blank"
                          className="text-primary hover:underline flex items-center gap-1 font-medium"
                        >
                          https://rajuk.gov.bd <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Request Date</p>
                          <p className="text-sm font-medium">10/29/2024</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                          <p className="text-sm font-medium">5/18/2023</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">End Date</p>
                          <p className="text-sm font-medium">12/31/2040</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border p-5">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" /> Agreement Status
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Frame Agreement Agreed</p>
                        <p className="font-medium">Not specified</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Contract Type</p>
                        <p className="font-medium">Not specified</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Frame Agreement Updated
                        </p>
                        <p className="font-medium">No</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-5">
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/5"
                      >
                        View Agreement
                      </Button>
                      <Button variant="outline">Edit Agreement</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border p-5 relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 h-8 w-8 text-primary"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <h3 className="font-bold text-md mb-4">Manager Information</h3>
                      <div className="flex flex-col items-center justify-center py-6 text-center text-amber-600 bg-amber-50/50 rounded-lg border border-amber-100 border-dashed">
                        <AlertTriangle className="w-8 h-8 mb-2 opacity-80" />
                        <p className="font-semibold text-sm">No manager information available</p>
                        <p className="text-xs text-amber-700/70 mt-1 max-w-[200px]">
                          Please add manager details to complete the contract
                        </p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border p-5 relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 h-8 w-8 text-primary"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <h3 className="font-bold text-md mb-4">Owner Information</h3>
                      <div className="flex flex-col items-center justify-center py-6 text-center text-amber-600 bg-amber-50/50 rounded-lg border border-amber-100 border-dashed">
                        <AlertTriangle className="w-8 h-8 mb-2 opacity-80" />
                        <p className="font-semibold text-sm">No owner information available</p>
                        <p className="text-xs text-amber-700/70 mt-1 max-w-[200px]">
                          Please add owner details to complete the contract
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border p-5">
                    <h3 className="font-bold text-lg mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-sm">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Documents</p>
                          <p className="text-muted-foreground">No documents uploaded</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">SLA Document</p>
                          <p className="text-muted-foreground">No SLA document uploaded</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">SLA Information</p>
                          <p className="text-muted-foreground">No SLA information available</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Edit2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Signatory</p>
                          <p className="text-muted-foreground">
                            No signatory information available
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="services" className="m-0 space-y-4 animate-in fade-in-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">Services (2)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-5 flex flex-col h-full relative">
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold border border-emerald-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mb-4 border border-blue-100">
                          <Cloud className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Cloud</h4>
                        <div className="text-sm space-y-1 mb-6 text-muted-foreground">
                          <p>
                            Service Information:
                            <span className="font-mono text-foreground font-medium">SID-00075</span>
                          </p>
                          <p>
                            Internal ID:
                            <span className="font-mono text-foreground font-medium">2679</span>
                          </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border">
                          <Link
                            href="/services/SID-00075"
                            className="flex items-center justify-between text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                          >
                            Click to view details
                            <span className="flex items-center">
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-5 flex flex-col h-full relative">
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold border border-emerald-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 mb-4 border border-orange-100">
                          <Mail className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Mail</h4>
                        <div className="text-sm space-y-1 mb-6 text-muted-foreground">
                          <p>
                            Service Information:
                            <span className="font-mono text-foreground font-medium">SID-00324</span>
                          </p>
                          <p>
                            Internal ID:
                            <span className="font-mono text-foreground font-medium">1</span>
                          </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border">
                          <Link
                            href="/services/SID-00324"
                            className="flex items-center justify-between text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                          >
                            Click to view details
                            <span className="flex items-center">
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="agreements" className="m-0 space-y-6 animate-in fade-in-50">
                  <h3 className="font-bold text-lg">{"Agreements & Documents"}</h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                      <h4 className="font-bold text-sm text-amber-900 mb-1">
                        Signatory Information Not Available
                      </h4>
                      <p className="text-sm opacity-90">
                        Signatory information has not been provided yet. This information will be
                        available once the contract is processed.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white border rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-foreground">Frame Agreement</h4>
                      <p className="text-sm text-muted-foreground">
                        View and manage the frame agreement
                      </p>
                    </div>
                    <Button className="bg-primary">View Agreement</Button>
                  </div>
                  <div className="bg-white border border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <FileText className="w-10 h-10 text-slate-300 mb-3" />
                    <h4 className="font-bold text-slate-700">No Additional Documents</h4>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">
                      Any extra uploaded documents related to this contract will appear here.
                    </p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      <NewServiceDialog open={newServiceOpen} onOpenChange={setNewServiceOpen} />
      <NewContractDialog open={newContractOpen} onOpenChange={setNewContractOpen} />
    </>
  );
}
