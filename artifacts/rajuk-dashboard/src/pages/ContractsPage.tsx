import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "wouter";
import { FileText, Cloud, Mail, AlertTriangle, Edit2, Plus, ExternalLink, ChevronRight, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

/* ── Mock users for dropdowns ───────────────────────────── */
const USERS = [
  { value: "u1", label: "Lutfor Rahman" },
  { value: "u2", label: "Programmer Raj" },
  { value: "u3", label: "Sadia Islam" },
  { value: "u4", label: "Mahbub Alam" },
  { value: "u5", label: "Nusrat Jahan" },
];

/* ── Select field ───────────────────────────────────────── */
function UserSelect({
  id, value, onChange, required,
}: { id: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
    >
      <option value="">Select a user</option>
      {USERS.map((u) => (
        <option key={u.value} value={u.value}>{u.label}</option>
      ))}
    </select>
  );
}

/* ── Add New Service Dialog ─────────────────────────────── */
function NewServiceDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    billingPrimary: "",
    technicalPrimary: "",
    billingSecondary: "",
    technicalSecondary: "",
  });

  const set = (key: keyof typeof form) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.billingPrimary || !form.technicalPrimary) return;
    toast({ title: "Service Requested", description: `"${form.name}" has been submitted for approval.` });
    onOpenChange(false);
    setForm({ name: "", billingPrimary: "", technicalPrimary: "", billingSecondary: "", technicalSecondary: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-7 pt-6 pb-5 border-b border-border/50 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Server className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">Add a New Service</DialogTitle>
          </div>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-50/60">
          <div className="px-7 py-6 space-y-5">

            {/* Service Name */}
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

            {/* Billing User Primary */}
            <div className="space-y-1.5">
              <Label htmlFor="billing-primary" className="text-sm font-semibold text-foreground">
                Billing User (Primary) <span className="text-red-500">*</span>
              </Label>
              <UserSelect id="billing-primary" value={form.billingPrimary} onChange={set("billingPrimary")} required />
            </div>

            {/* Technical User Primary */}
            <div className="space-y-1.5">
              <Label htmlFor="tech-primary" className="text-sm font-semibold text-foreground">
                Technical User (Primary) <span className="text-red-500">*</span>
              </Label>
              <UserSelect id="tech-primary" value={form.technicalPrimary} onChange={set("technicalPrimary")} required />
            </div>

            {/* Billing User Secondary */}
            <div className="space-y-1.5">
              <Label htmlFor="billing-secondary" className="text-sm font-semibold text-slate-600">
                Billing User (Secondary)
              </Label>
              <UserSelect id="billing-secondary" value={form.billingSecondary} onChange={set("billingSecondary")} />
            </div>

            {/* Technical User Secondary */}
            <div className="space-y-1.5">
              <Label htmlFor="tech-secondary" className="text-sm font-semibold text-slate-600">
                Technical User (Secondary)
              </Label>
              <UserSelect id="tech-secondary" value={form.technicalSecondary} onChange={set("technicalSecondary")} />
            </div>
          </div>

          {/* Footer */}
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

export default function ContractsPage() {
  const [newServiceOpen, setNewServiceOpen] = useState(false);

  return (
    <AppLayout withSidebar>
      <div className="flex flex-col gap-6">
        
        {/* Top Info */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-slate-50 border flex items-center justify-center p-2">
            <img src={`${import.meta.env.BASE_URL}images/rajuk-logo.png`} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Rajdhani Unnayan Kartipakkha (RAJUK)</h1>
            <p className="text-muted-foreground text-sm font-medium">Ministry of Housing and Public Works</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center px-4 py-2 bg-slate-50 rounded-lg border">
              <div className="text-lg font-bold text-primary">1</div>
              <div className="text-[10px] uppercase font-semibold text-slate-500">Contracts</div>
            </div>
            <div className="text-center px-4 py-2 bg-slate-50 rounded-lg border">
              <div className="text-lg font-bold text-emerald-600">2</div>
              <div className="text-[10px] uppercase font-semibold text-slate-500">Services</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          
          {/* Left Panel: Contract List */}
          <div className="xl:w-72 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-foreground px-1">Contract List</h2>
            <Card className="border-primary shadow-sm bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <span className="font-bold text-sm text-foreground line-clamp-2">EPLOT Service Management System</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-mono text-muted-foreground">ID: NDC-00075</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">ACTIVE</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: Tabs */}
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
                
                {/* CONTRACT INFO TAB */}
                <TabsContent value="info" className="m-0 space-y-6 animate-in fade-in-50">
                  
                  <div className="bg-white rounded-xl border p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">ACTIVE</div>
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
                        <a href="https://rajuk.gov.bd" target="_blank" className="text-primary hover:underline flex items-center gap-1 font-medium">
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
                        <p className="text-xs text-muted-foreground mb-1">Frame Agreement Updated</p>
                        <p className="font-medium">No</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-5">
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">View Agreement</Button>
                      <Button variant="outline">Edit Agreement</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border p-5 relative">
                      <Button variant="ghost" size="icon" className="absolute top-3 right-3 h-8 w-8 text-primary">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <h3 className="font-bold text-md mb-4">Manager Information</h3>
                      <div className="flex flex-col items-center justify-center py-6 text-center text-amber-600 bg-amber-50/50 rounded-lg border border-amber-100 border-dashed">
                        <AlertTriangle className="w-8 h-8 mb-2 opacity-80" />
                        <p className="font-semibold text-sm">No manager information available</p>
                        <p className="text-xs text-amber-700/70 mt-1 max-w-[200px]">Please add manager details to complete the contract</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border p-5 relative">
                      <Button variant="ghost" size="icon" className="absolute top-3 right-3 h-8 w-8 text-primary">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <h3 className="font-bold text-md mb-4">Owner Information</h3>
                      <div className="flex flex-col items-center justify-center py-6 text-center text-amber-600 bg-amber-50/50 rounded-lg border border-amber-100 border-dashed">
                        <AlertTriangle className="w-8 h-8 mb-2 opacity-80" />
                        <p className="font-semibold text-sm">No owner information available</p>
                        <p className="text-xs text-amber-700/70 mt-1 max-w-[200px]">Please add owner details to complete the contract</p>
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
                          <p className="text-muted-foreground">No signatory information available</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </TabsContent>

                {/* SERVICE LIST TAB */}
                <TabsContent value="services" className="m-0 space-y-4 animate-in fade-in-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">Services (2)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cloud Service Card */}
                    <Card className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-5 flex flex-col h-full relative">
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold border border-emerald-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary mb-4 border border-blue-100">
                          <Cloud className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Cloud</h4>
                        <div className="text-sm space-y-1 mb-6 text-muted-foreground">
                          <p>Service Information: <span className="font-mono text-foreground font-medium">SID-00075</span></p>
                          <p>Internal ID: <span className="font-mono text-foreground font-medium">2679</span></p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border">
                          <Link href="/services/SID-00075" className="flex items-center justify-between text-sm font-medium text-primary hover:text-primary/80 transition-colors group">
                            Click to view details
                            <span className="flex items-center">View Details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></span>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Mail Service Card */}
                    <Card className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-5 flex flex-col h-full relative">
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold border border-emerald-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 mb-4 border border-orange-100">
                          <Mail className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Mail</h4>
                        <div className="text-sm space-y-1 mb-6 text-muted-foreground">
                          <p>Service Information: <span className="font-mono text-foreground font-medium">SID-00324</span></p>
                          <p>Internal ID: <span className="font-mono text-foreground font-medium">1</span></p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border">
                          <Link href="/services/SID-00324" className="flex items-center justify-between text-sm font-medium text-primary hover:text-primary/80 transition-colors group">
                            Click to view details
                            <span className="flex items-center">View Details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></span>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* AGREEMENTS TAB */}
                <TabsContent value="agreements" className="m-0 space-y-6 animate-in fade-in-50">
                  <h3 className="font-bold text-lg">Agreements & Documents</h3>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                      <h4 className="font-bold text-sm text-amber-900 mb-1">Signatory Information Not Available</h4>
                      <p className="text-sm opacity-90">Signatory information has not been provided yet. This information will be available once the contract is processed.</p>
                    </div>
                  </div>

                  <div className="bg-white border rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-foreground">Frame Agreement</h4>
                      <p className="text-sm text-muted-foreground">View and manage the frame agreement</p>
                    </div>
                    <Button className="bg-primary">View Agreement</Button>
                  </div>

                  <div className="bg-white border border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <FileText className="w-10 h-10 text-slate-300 mb-3" />
                    <h4 className="font-bold text-slate-700">No Additional Documents</h4>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">Any extra uploaded documents related to this contract will appear here.</p>
                  </div>
                </TabsContent>

              </div>
            </Tabs>
          </div>
        </div>
      </div>

      <NewServiceDialog open={newServiceOpen} onOpenChange={setNewServiceOpen} />
    </AppLayout>
  );
}
