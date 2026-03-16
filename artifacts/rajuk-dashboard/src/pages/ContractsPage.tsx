import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "wouter";
import {
  FileText, Cloud, Mail, AlertTriangle, Edit2, Plus, ExternalLink,
  ChevronRight, Building2, CheckCircle2, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ── Mock data ──────────────────────────────────────────── */

const CONTRACTS = [
  {
    id: "NDC-00075",
    name: "EPLOT Service Management System",
    project: "EPLOT Service Management System",
    webUrl: "https://rajuk.gov.bd",
    startDate: "5/18/2023",
    endDate: "12/31/2040",
    requestDate: "10/29/2024",
    status: "ACTIVE",
    documents: 4,
  },
  {
    id: "NDC-00136",
    name: "IDEA Project",
    project: "IDEA Project",
    webUrl: "https://idea.gov.bd",
    startDate: "3/14/2021",
    endDate: "12/31/2040",
    requestDate: "9/01/2022",
    status: "ACTIVE",
    documents: 2,
  },
  {
    id: "NDC-00102",
    name: "Enhancing Digital Government Services",
    project: "Enhancing Digital Government Services",
    webUrl: "https://edgs.gov.bd",
    startDate: "6/01/2022",
    endDate: "12/31/2035",
    requestDate: "5/12/2022",
    status: "ACTIVE",
    documents: 1,
  },
  {
    id: "NDC-00101",
    name: "Digital Sylhet City Project",
    project: "Digital Sylhet City Project",
    webUrl: "https://sylhet.gov.bd",
    startDate: "9/29/2022",
    endDate: "12/31/2040",
    requestDate: "11/10/2024",
    status: "ACTIVE",
    documents: 3,
  },
  {
    id: "NDC-00011",
    name: "Enhancement of Bangla Language Processing",
    project: "Enhancement of Bangla Language Processing",
    webUrl: "https://bangla.gov.bd",
    startDate: "1/15/2020",
    endDate: "12/31/2030",
    requestDate: "12/10/2019",
    status: "ACTIVE",
    documents: 1,
  },
];

/* ── Sub-components ─────────────────────────────────────── */

function InfoField({
  label,
  value,
  isLink,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">{label}</p>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
        >
          {value} <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <p className="text-sm font-semibold text-foreground">{value}</p>
      )}
    </div>
  );
}

function EmptyInfo({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <AlertTriangle className="w-10 h-10 text-slate-300 mb-3" strokeWidth={1.5} />
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <p className="text-xs text-slate-400 mt-1 max-w-[200px]">{subtitle}</p>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */

export default function ContractsPage() {
  const [activeId, setActiveId] = useState(CONTRACTS[0].id);
  const contract = CONTRACTS.find((c) => c.id === activeId) || CONTRACTS[0];

  return (
    <AppLayout withSidebar>
      <div className="flex flex-col gap-5">

        {/* ── Page header ── */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl shrink-0">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground">Rajdhani Unnayan Kartipakkha (RAJUK)</h1>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">Ministry of Housing and Public Works</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <FileText className="w-3.5 h-3.5 text-primary" />
                {CONTRACTS.length} Contracts
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                6 Services
              </span>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm gap-1.5 px-4 h-9 shrink-0 rounded-lg shadow-sm">
            <Plus className="w-4 h-4" /> Add New Contract
          </Button>
        </div>

        {/* ── Two-column body ── */}
        <div className="flex gap-5 items-start">

          {/* ── Left: Contract List sidebar ── */}
          <div className="w-64 shrink-0 bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-slate-50/60">
              <h2 className="text-sm font-bold text-foreground">Contract List</h2>
              <button className="w-6 h-6 rounded-md bg-slate-100 hover:bg-primary hover:text-white text-slate-600 flex items-center justify-center transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-border/40 max-h-[calc(100vh-220px)] overflow-y-auto">
              {CONTRACTS.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className={cn(
                      "w-full text-left px-4 py-3.5 transition-all group",
                      isActive
                        ? "bg-primary/8 border-l-[3px] border-primary"
                        : "hover:bg-slate-50 border-l-[3px] border-transparent"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p
                          className={cn(
                            "text-xs font-semibold leading-snug line-clamp-2 transition-colors",
                            isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                          )}
                        >
                          {c.name}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                          Contract ID: {c.id}
                        </p>
                      </div>
                      {isActive && (
                        <div className="shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 text-[10px] font-bold px-2 py-0.5 h-auto">
                        ACTIVE
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: Tabs panel ── */}
          <div className="flex-1 min-w-0 bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
            <Tabs defaultValue="info" className="w-full flex flex-col">

              {/* Tab bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-slate-50/60 gap-4">
                <TabsList className="bg-slate-100/80 h-9 p-1 gap-0.5">
                  <TabsTrigger value="info" className="text-xs font-semibold gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm h-7 px-3">
                    <FileText className="w-3.5 h-3.5" /> Contract Info
                  </TabsTrigger>
                  <TabsTrigger value="services" className="text-xs font-semibold gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm h-7 px-3">
                    <Cloud className="w-3.5 h-3.5" /> Service List
                  </TabsTrigger>
                  <TabsTrigger value="agreements" className="text-xs font-semibold gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm h-7 px-3">
                    <FileText className="w-3.5 h-3.5" /> Agreements
                  </TabsTrigger>
                </TabsList>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs gap-1.5 h-8 px-3 rounded-lg">
                  <Plus className="w-3.5 h-3.5" /> Add New Service
                </Button>
              </div>

              <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">

                {/* ── CONTRACT INFO TAB ── */}
                <TabsContent value="info" className="m-0 space-y-4 animate-in fade-in-50">

                  {/* Contract Overview */}
                  <div className="rounded-xl border border-border/60 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/60 border-b border-border/50">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">Contract Overview</h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">Basic contract information and status</p>
                      </div>
                      <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 font-bold text-xs px-3">
                        ACTIVE
                      </Badge>
                    </div>
                    <div className="p-5 grid grid-cols-3 gap-x-6 gap-y-5">
                      <InfoField label="Contract ID"   value={contract.id} />
                      <InfoField label="Project Name"  value={contract.project} />
                      <InfoField label="Web URL"       value={contract.webUrl} isLink />
                      <InfoField label="Start Date"    value={contract.startDate} />
                      <InfoField label="End Date"      value={contract.endDate} />
                      <InfoField label="Request Date"  value={contract.requestDate} />
                    </div>
                  </div>

                  {/* Agreement Status */}
                  <div className="rounded-xl border border-border/60 overflow-hidden">
                    <div className="px-5 py-3.5 bg-slate-50/60 border-b border-border/50">
                      <h3 className="text-sm font-bold text-foreground">Agreement Status</h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500">Frame Agreement Agreed:</p>
                          <p className="text-sm text-slate-400 italic">Not specified</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500">Contract Type:</p>
                          <p className="text-sm text-slate-400 italic">Not specified</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500">Frame Agreement Updated:</p>
                          <p className="text-sm font-medium text-foreground">No</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5 pt-1">
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5 font-semibold text-xs gap-1.5 h-8">
                          <Eye className="w-3.5 h-3.5" /> View Agreement
                        </Button>
                        <Button variant="outline" size="sm" className="font-semibold text-xs gap-1.5 h-8">
                          <Edit2 className="w-3.5 h-3.5" /> Edit Agreement
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Manager + Owner Info */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Manager Information", subtitle: "No manager information available", hint: "Please add manager details to complete the contract" },
                      { title: "Owner Information",   subtitle: "No owner information available",   hint: "Please add owner details to complete the contract" },
                    ].map((panel) => (
                      <div key={panel.title} className="rounded-xl border border-border/60 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/60 border-b border-border/50">
                          <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-primary" /> {panel.title}
                          </h3>
                          <button className="p-1 text-slate-400 hover:text-primary rounded transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="px-4">
                          <EmptyInfo title={panel.subtitle} subtitle={panel.hint} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Information */}
                  <div className="rounded-xl border border-border/60 overflow-hidden">
                    <div className="px-5 py-3.5 bg-slate-50/60 border-b border-border/50">
                      <h3 className="text-sm font-bold text-foreground">Additional Information</h3>
                    </div>
                    <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Documents:</p>
                        <p className="text-sm font-bold text-foreground">{contract.documents} document(s)</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">SLA Document:</p>
                        <p className="text-sm text-slate-400 italic">No SLA document uploaded</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">SLA Information:</p>
                        <p className="text-sm text-slate-400 italic">No SLA information available</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Signatory:</p>
                        <p className="text-sm text-slate-400 italic">No signatory information available</p>
                      </div>
                    </div>
                  </div>

                </TabsContent>

                {/* ── SERVICE LIST TAB ── */}
                <TabsContent value="services" className="m-0 space-y-4 animate-in fade-in-50">
                  <h3 className="text-sm font-bold text-foreground">Services (2)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="hover:border-primary/50 transition-colors shadow-sm">
                      <CardContent className="p-5 flex flex-col h-full relative">
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-[11px] font-bold border border-emerald-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-primary mb-4 border border-blue-100">
                          <Cloud className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold mb-2">Cloud</h4>
                        <div className="text-xs space-y-1 mb-6 text-muted-foreground">
                          <p>Service Information: <span className="font-mono text-foreground font-semibold">SID-00075</span></p>
                          <p>Internal ID: <span className="font-mono text-foreground font-semibold">2679</span></p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border">
                          <Link href="/services/SID-00075" className="flex items-center justify-between text-xs font-semibold text-primary hover:text-primary/80 transition-colors group">
                            Click to view details
                            <span className="flex items-center gap-0.5">View Details <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:border-primary/50 transition-colors shadow-sm">
                      <CardContent className="p-5 flex flex-col h-full relative">
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-[11px] font-bold border border-emerald-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4 border border-orange-100">
                          <Mail className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold mb-2">Mail</h4>
                        <div className="text-xs space-y-1 mb-6 text-muted-foreground">
                          <p>Service Information: <span className="font-mono text-foreground font-semibold">SID-00324</span></p>
                          <p>Internal ID: <span className="font-mono text-foreground font-semibold">1</span></p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border">
                          <Link href="/services/SID-00324" className="flex items-center justify-between text-xs font-semibold text-primary hover:text-primary/80 transition-colors group">
                            Click to view details
                            <span className="flex items-center gap-0.5">View Details <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* ── AGREEMENTS TAB ── */}
                <TabsContent value="agreements" className="m-0 space-y-4 animate-in fade-in-50">
                  <h3 className="text-sm font-bold text-foreground">Agreements &amp; Documents</h3>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-900 mb-0.5">Signatory Information Not Available</h4>
                      <p className="text-xs opacity-80">Signatory information has not been provided yet. It will be available once the contract is processed.</p>
                    </div>
                  </div>

                  <div className="bg-white border border-border/60 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Frame Agreement</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">View and manage the frame agreement</p>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs font-semibold gap-1.5 h-8 px-3">
                      <Eye className="w-3.5 h-3.5" /> View Agreement
                    </Button>
                  </div>

                  <div className="bg-white border border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center">
                    <FileText className="w-10 h-10 text-slate-200 mb-3" strokeWidth={1.5} />
                    <h4 className="text-sm font-bold text-slate-600">No Additional Documents</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">Extra uploaded documents related to this contract will appear here.</p>
                  </div>
                </TabsContent>

              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
