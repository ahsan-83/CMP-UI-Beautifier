import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "wouter";
import {
  ChevronRight, Package, FileText, Settings, History,
  Activity, AlertTriangle, Plus, Upload, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

/* ─── File Drop Zone ──────────────────────────────────── */

function EmailListDropZone({ file, onFile }: { file: File | null; onFile: (f: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => {
        e.preventDefault(); setDragging(false);
        const f = e.dataTransfer.files[0]; if (f) onFile(f);
      }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-lg py-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${
        dragging ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary/50 hover:bg-slate-50"
      }`}
    >
      <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden"
        onChange={e => { if (e.target.files?.[0]) onFile(e.target.files[0]); }} />
      <Upload className="w-4 h-4 text-slate-400" />
      {file
        ? <p className="text-sm font-medium text-primary">{file.name}</p>
        : <p className="text-sm text-slate-500">
            Drag & Drop file for Email list here or{" "}
            <span className="text-primary font-semibold underline">Browse</span>
          </p>
      }
    </div>
  );
}

/* ─── Change Package Dialog ────────────────────────────── */

function ChangePackageDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { toast } = useToast();
  const [emailAccounts, setEmailAccounts] = useState("0");
  const [emailAction, setEmailAction] = useState<"add" | "remove">("add");
  const [domainQuota, setDomainQuota] = useState("25");
  const [emailFile, setEmailFile] = useState<File | null>(null);
  const [adminEmails, setAdminEmails] = useState(["admin@a.gov.bd", "support@a.gov.bd"]);

  const quotaNum = parseInt(domainQuota) || 0;
  const quotaValid = quotaNum >= 20 && quotaNum <= 500 && quotaNum % 5 === 0;

  const handleAddAdmin = () => setAdminEmails(prev => [...prev, ""]);
  const handleDeleteAdmin = (i: number) =>
    setAdminEmails(prev => prev.filter((_, idx) => idx !== i));
  const handleAdminChange = (i: number, val: string) =>
    setAdminEmails(prev => { const n = [...prev]; n[i] = val; return n; });

  const handleConfirm = () => {
    onOpenChange(false);
    toast({ title: "Package change requested", description: "Your change package request has been submitted." });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden rounded-xl">

        {/* Header */}
        <DialogHeader className="bg-primary px-6 py-4 shrink-0">
          <DialogTitle className="text-white text-lg font-bold">Change Package</DialogTitle>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-white">

          {/* No of Email Accounts */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">No of Email Accounts</Label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min={0}
                value={emailAccounts}
                onChange={e => setEmailAccounts(e.target.value)}
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

          {/* Domain Quota */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Domain Quota (GB)</Label>
            <Input
              type="number"
              min={20}
              max={500}
              step={5}
              value={domainQuota}
              onChange={e => setDomainQuota(e.target.value)}
              className={`w-40 bg-white ${!quotaValid && domainQuota !== "" ? "border-amber-400 focus-visible:ring-amber-300" : ""}`}
            />
            <div className="space-y-0.5">
              <p className="text-xs text-amber-600 font-medium">** Domain Quota in range from 20GB to 500GB</p>
              <p className="text-xs text-amber-600 font-medium">** Domain Quota amount should be multiple of 5.</p>
            </div>
          </div>

          {/* Email list file upload */}
          <div className="space-y-2">
            <p className="text-xs text-rose-500 font-medium">
              * Please submit Excel email list to add or remove emails
            </p>
            <EmailListDropZone file={emailFile} onFile={setEmailFile} />
          </div>

          {/* Admin Email Accounts */}
          <div className="space-y-3">
            {adminEmails.map((email, i) => (
              <div key={i} className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">
                  Admin Email Account {i + 1}
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={email}
                    onChange={e => handleAdminChange(i, e.target.value)}
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

        {/* Footer */}
        <DialogFooter className="px-6 py-4 bg-white border-t shrink-0 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
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

/* ─── Page ──────────────────────────────────────────────── */

export default function ResourceDetailPage() {
  const [changePackageOpen, setChangePackageOpen] = useState(false);

  return (
    <AppLayout withSidebar>
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center text-sm font-medium text-muted-foreground gap-2">
          <Link href="/orders" className="hover:text-primary transition-colors">Order List</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/orders/20260312-NDC-00075-506" className="hover:text-primary transition-colors">Order Details</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Resource Details</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Email Service (Standard)</h1>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="bg-white border shadow-sm p-1 rounded-xl mb-6">
            <TabsTrigger value="info" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-white font-medium">Resource Information</TabsTrigger>
            <TabsTrigger value="attached" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-white font-medium">Attached Additional Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6 m-0 animate-in fade-in-50">
            {/* Info Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              <Card className="bg-[#f0f7ff] border-blue-100 shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Package className="w-4 h-4" /> Package Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-blue-700">Package:</span><span className="font-bold text-blue-950">Standard</span></div>
                    <div className="flex justify-between"><span className="text-blue-700">Category:</span><span className="font-medium">Email Service</span></div>
                    <div className="flex justify-between"><span className="text-blue-700">Feature:</span><span className="font-medium text-slate-500">N/A</span></div>
                    <div className="flex justify-between"><span className="text-blue-700">Platform Type:</span><span className="font-bold text-blue-950">ZIMBRA</span></div>
                    <div className="flex justify-between"><span className="text-blue-700">Monthly Fee:</span><span className="font-medium text-slate-500">N/A</span></div>
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-blue-200/50">
                      <span className="text-blue-700 font-medium">Status:</span>
                      <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm border-none">ACTIVATED</Badge>
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
                      <span className="font-mono font-bold text-emerald-950">20260312-NDC-00075-506</span>
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
                    <div className="flex justify-between"><span className="text-cyan-700">Name:</span><span className="font-bold text-cyan-950">Mail</span></div>
                    <div className="flex justify-between"><span className="text-cyan-700">Service ID:</span><span className="font-mono font-medium">SID-00324</span></div>
                    <div className="flex justify-between"><span className="text-cyan-700">URL:</span><a href="https://rajuk.gov.bd" className="text-primary hover:underline">https://rajuk.gov.bd</a></div>
                    <div className="flex justify-between"><span className="text-cyan-700">Start Date:</span><span className="font-medium">2023-05-18</span></div>
                    <div className="flex justify-between"><span className="text-cyan-700">End Date:</span><span className="font-medium">2040-12-31</span></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#fffbeb] border-amber-100 shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-sm font-bold text-amber-900 mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Service Status
                  </h3>
                  <div className="space-y-4">
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 w-full justify-center py-1.5 text-sm">ACTIVATED</Badge>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-amber-700 block mb-0.5 text-xs">Request Date:</span>
                        <span className="font-medium text-amber-950">Mar 12, 2026 12:22 PM</span>
                      </div>
                      <div>
                        <span className="text-amber-700 block mb-0.5 text-xs">Activation Date:</span>
                        <span className="font-medium text-amber-950">Mar 12, 2026 12:43 PM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Attributes Section */}
            <Card className="border-border shadow-sm">
              <div className="p-5 border-b bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-foreground">Attributes</h3>
                <Button variant="outline" size="sm" className="text-primary border-primary/30 hover:bg-primary/5 bg-white">
                  <History className="w-4 h-4 mr-2" /> History
                </Button>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="space-y-1 border-b pb-4 md:border-b-0 md:pb-0">
                    <p className="text-sm font-medium text-muted-foreground">Domain Name</p>
                    <p className="font-bold text-foreground text-lg">a.gov.bd</p>
                  </div>
                  <div className="space-y-1 border-b pb-4 md:border-b-0 md:pb-0">
                    <p className="text-sm font-medium text-muted-foreground">No of Email Accounts</p>
                    <p className="font-bold text-foreground text-lg">15</p>
                  </div>
                  <div className="space-y-1 border-b pb-4 md:border-b-0 md:pb-0">
                    <p className="text-sm font-medium text-muted-foreground">Delegated Admin Account Count</p>
                    <p className="font-bold text-foreground text-lg">2</p>
                  </div>
                  <div className="space-y-1 border-b pb-4 md:border-b-0 md:pb-0">
                    <p className="text-sm font-medium text-muted-foreground">Admin Privileged Emails</p>
                    <a href="mailto:admin@a.gov.bd,support@a.gov.bd" className="font-bold text-primary hover:underline text-lg block truncate">
                      admin@a.gov.bd, support@a.gov.bd
                    </a>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Domain Quota Upgradation</p>
                    <p className="font-bold text-foreground text-lg">Unlimited (per GB): <span className="text-primary">25</span></p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-end gap-4">
                  <Button
                    onClick={() => setChangePackageOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-8 rounded-xl"
                  >
                    Change Package
                  </Button>
                  <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-bold h-11 px-8 rounded-xl bg-white">
                    Deactivate Package
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                        { name: "IP Address Service", count: true },
                        { name: "Block Storage Service", count: true },
                        { name: "Web Application Firewall (WAF) Service", count: false },
                        { name: "Enterprise Backup Service", count: false },
                      ].map((service, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/30">
                          <td className="px-5 py-4 font-bold text-slate-700">{service.name}</td>
                          <td className="px-5 py-4">
                            <Select>
                              <SelectTrigger className="w-full bg-white"><SelectValue placeholder="Select Package" /></SelectTrigger>
                              <SelectContent><SelectItem value="std">Standard</SelectItem><SelectItem value="adv">Advanced</SelectItem></SelectContent>
                            </Select>
                          </td>
                          <td className="px-5 py-4 text-center">
                            {service.count ? <Input type="number" defaultValue="0" className="w-20 mx-auto text-center bg-white" /> : <span className="text-slate-300">-</span>}
                          </td>
                          <td className="px-5 py-4 text-right font-bold text-emerald-600 text-lg">৳ 0</td>
                          <td className="px-5 py-4 text-center">
                            <Button size="sm" className="bg-primary hover:bg-primary/90 w-full sm:w-auto shadow-sm">
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
    </AppLayout>
  );
}
