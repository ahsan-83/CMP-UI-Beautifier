import React, { useState, useMemo } from "react";
import { Search, UserCheck, Calendar, Building2, Layers } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";

/* ─── Mock data ──────────────────────────────────────────────── */
const ALL_CUSTOMERS = [
  {
    id: 1,
    projectName: "Ian Cruz",
    organization: "President's Office - Public Division",
    ministry: "President's Office - Public Division",
    date: "2025-02-10",
    status: "Pending",
  },
  {
    id: 2,
    projectName: "BLPA Cloud Service",
    organization: "Bangladesh Land Port Authority",
    ministry: "Ministry of Shipping",
    date: "2024-12-20",
    status: "Pending",
  },
  {
    id: 3,
    projectName: "ssdf",
    organization: "President's Office - Public Division",
    ministry: "President's Office - Public Division",
    date: "2024-12-20",
    status: "Pending",
  },
  {
    id: 4,
    projectName: "Jeremy Riley",
    organization: "Bangladesh Madrasah Education Board",
    ministry: "Technical And Madrasha Education Division",
    date: "2026-03-31",
    status: "Pending",
  },
  {
    id: 5,
    projectName: "National Data Centre Portal",
    organization: "Bangladesh Computer Council (BCC)",
    ministry: "ICT Division",
    date: "2025-06-15",
    status: "Pending",
  },
  {
    id: 6,
    projectName: "e-GP Integration",
    organization: "Central Procurement Technical Unit",
    ministry: "Implementation Monitoring & Evaluation Division",
    date: "2025-04-08",
    status: "Pending",
  },
  {
    id: 7,
    projectName: "Digital Taxation Platform",
    organization: "National Board of Revenue",
    ministry: "Finance Division",
    date: "2025-07-22",
    status: "Approved",
  },
  {
    id: 8,
    projectName: "Smart Agriculture Portal",
    organization: "Department of Agricultural Extension",
    ministry: "Ministry of Agriculture",
    date: "2025-03-19",
    status: "Rejected",
  },
  {
    id: 9,
    projectName: "Public Health Data System",
    organization: "Directorate General of Health Services",
    ministry: "Ministry of Health",
    date: "2025-05-01",
    status: "Approved",
  },
  {
    id: 10,
    projectName: "Land Record Digitization",
    organization: "Department of Land Records & Surveys",
    ministry: "Ministry of Land",
    date: "2025-08-14",
    status: "Pending",
  },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "Pending", label: "Pending for Approval" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

/* ─── Status badge ───────────────────────────────────────────── */
function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700 border-amber-300",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-300",
    Rejected: "bg-rose-50 text-rose-700 border-rose-300",
  };
  return (
    <Badge
      variant="outline"
      className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 ${styles[status] ?? "bg-slate-50 text-slate-600 border-slate-300"}`}
    >
      {status}
    </Badge>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function PendingCustomerPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");

  const filtered = useMemo(() => {
    return ALL_CUSTOMERS.filter((c) => {
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.projectName.toLowerCase().includes(q) ||
        c.organization.toLowerCase().includes(q) ||
        c.ministry.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [search, statusFilter]);

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
      {/* ── Page header ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl">
            <UserCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
              Pending Customer List
              <span className="ml-2 text-lg font-semibold text-primary/70">({filtered.length})</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Customers awaiting approval or review
            </p>
          </div>
        </div>
      </div>

      {/* ── Filters ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, organization, ministry…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Status dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 text-sm border border-input rounded-md px-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm min-w-[190px]"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Table card ───────────────────────────────────────── */}
      <div className="rounded-xl border shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-white">
                {[
                  { icon: Layers, label: "Project / Service Name" },
                  { icon: Building2, label: "Organization" },
                  { icon: Building2, label: "Ministry" },
                  { icon: Calendar, label: "Date" },
                  { icon: null, label: "Status" },
                ].map(({ icon: Icon, label }) => (
                  <th
                    key={label}
                    className="text-center px-5 py-3.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      {Icon && <Icon className="w-3.5 h-3.5 opacity-80" />}
                      {label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-14 text-muted-foreground text-sm">
                    No customers match your current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`hover:bg-primary/5 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                  >
                    <td className="px-5 py-3.5 text-center font-semibold text-foreground">
                      {c.projectName}
                    </td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{c.organization}</td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{c.ministry}</td>
                    <td className="px-5 py-3.5 text-center font-mono text-slate-600 whitespace-nowrap">
                      {c.date}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex justify-center">
                        <StatusBadge status={c.status} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t bg-slate-50 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
              <span className="font-semibold text-foreground">{ALL_CUSTOMERS.length}</span> customers
            </span>
            <span>
              {ALL_CUSTOMERS.filter((c) => c.status === "Pending").length} pending approval
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
