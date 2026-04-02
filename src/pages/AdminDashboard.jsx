import React, { useState } from "react";
import {
  Users,
  Building2,
  FileText,
  Package,
  CheckCircle2,
  XCircle,
  Clock,
  PauseCircle,
  ThumbsDown,
  CheckCheck,
  RefreshCcw,
  PowerOff,
  ShieldCheck,
  TrendingUp,
  X,
  Building,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

/* ─── Ministry / Division mock data ─────────────────────────── */
const MINISTRY_DATA = [
  {
    division: "ICT Division",
    totalContracts: 24,
    customers: [
      { name: "Access to Information (a2i) Project", contractCount: 1 },
      { name: "Bangladesh Computer Council (BCC)", contractCount: 5 },
      { name: "Bangladesh Hi-Tech Park Authority", contractCount: 1 },
      { name: "Department of Information & Communication Technology", contractCount: 9 },
      { name: "Digital Security Agency", contractCount: 2 },
      { name: "ICT Division", contractCount: 5 },
      { name: "Office of the Controller of Certifying Authorities (CCA)", contractCount: 1 },
    ],
  },
  {
    division: "Ministry of Agriculture",
    totalContracts: 13,
    customers: [
      { name: "Bangladesh Rice Research Institute", contractCount: 1 },
      { name: "Barind Multipurpose Development Authority (BMDA)", contractCount: 1 },
      { name: "Department of Agricultural Extension", contractCount: 3 },
      { name: "Department of Agricultural Marketing (DAM)", contractCount: 1 },
      { name: "Krishi Gobeshona Foundation", contractCount: 1 },
      { name: "Ministry of Agriculture", contractCount: 1 },
      { name: "National Agriculture Training Academy (NATA)", contractCount: 1 },
    ],
  },
  {
    division: "Armed Forces Division",
    totalContracts: 1,
    customers: [{ name: "Bangladesh Air Force", contractCount: 1 }],
  },
  {
    division: "Public Security Division",
    totalContracts: 5,
    customers: [
      { name: "Bangladesh Ansar and VDP", contractCount: 2 },
      { name: "Public Security Division", contractCount: 3 },
    ],
  },
  {
    division: "Bridges Division",
    totalContracts: 5,
    customers: [
      { name: "Bangladesh Bridge Authority", contractCount: 3 },
      { name: "Bangladesh Bureau of Statistics", contractCount: 2 },
    ],
  },
  {
    division: "Finance Division",
    totalContracts: 11,
    customers: [
      { name: "Bangladesh Bank", contractCount: 4 },
      { name: "National Board of Revenue (NBR)", contractCount: 3 },
      { name: "Insurance Development & Regulatory Authority", contractCount: 2 },
      { name: "Bangladesh Financial Intelligence Unit", contractCount: 2 },
    ],
  },
  {
    division: "Ministry of Education",
    totalContracts: 9,
    customers: [
      { name: "University Grants Commission (UGC)", contractCount: 3 },
      { name: "Bangladesh National University", contractCount: 2 },
      { name: "Secondary & Higher Education Division", contractCount: 2 },
      { name: "Technical Education Board", contractCount: 2 },
    ],
  },
  {
    division: "Ministry of Health",
    totalContracts: 8,
    customers: [
      { name: "Directorate General of Health Services", contractCount: 3 },
      { name: "Bangladesh Medical Research Council", contractCount: 2 },
      { name: "National Institute of Preventive & Social Medicine", contractCount: 2 },
      { name: "Drugs Administration", contractCount: 1 },
    ],
  },
  {
    division: "Energy & Mineral Resources Division",
    totalContracts: 7,
    customers: [
      { name: "Petrobangla", contractCount: 3 },
      { name: "Bangladesh Oil, Gas & Mineral Corporation", contractCount: 2 },
      { name: "Bangladesh Power Development Board", contractCount: 2 },
    ],
  },
  {
    division: "Ministry of Commerce",
    totalContracts: 6,
    customers: [
      { name: "Bangladesh Trade & Tariff Commission", contractCount: 2 },
      { name: "Export Promotion Bureau", contractCount: 2 },
      { name: "Bangladesh Standards & Testing Institution", contractCount: 2 },
    ],
  },
];

/* ─── Ministry Dialog ────────────────────────────────────────── */
function MinistryDialog({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <DialogTitle className="text-lg font-bold text-foreground">
                Division / Ministry Information
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded-lg p-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </DialogHeader>

        {/* Scrollable table */}
        <div className="overflow-y-auto max-h-[60vh]">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-primary text-white">
                <th className="text-left px-5 py-3 font-bold w-48 min-w-[160px]">Division</th>
                <th className="text-center px-4 py-3 font-bold w-32 whitespace-nowrap">
                  Total Contracts
                </th>
                <th className="text-left px-5 py-3 font-bold">Customer Name</th>
                <th className="text-center px-4 py-3 font-bold w-32 whitespace-nowrap">
                  Contract Count
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              {MINISTRY_DATA.map((ministry, mIdx) => {
                const isEven = mIdx % 2 === 0;
                const rowBg = isEven ? "bg-white" : "bg-slate-50/70";
                const divisionBg = isEven ? "bg-blue-50/60" : "bg-blue-50/40";

                return ministry.customers.map((customer, cIdx) => (
                  <tr
                    key={`${ministry.division}-${cIdx}`}
                    className={`${rowBg} border-b border-border/40 hover:bg-primary/5 transition-colors`}
                  >
                    {/* Division cell — only rendered on the first customer row */}
                    {cIdx === 0 && (
                      <>
                        <td
                          rowSpan={ministry.customers.length}
                          className={`px-5 py-3 align-middle border-r border-border/40 ${divisionBg}`}
                          style={{ verticalAlign: "middle" }}
                        >
                          <span className="font-bold text-foreground text-sm leading-tight">
                            {ministry.division}
                          </span>
                        </td>
                        <td
                          rowSpan={ministry.customers.length}
                          className={`px-4 py-3 text-center align-middle border-r border-border/40 ${divisionBg}`}
                          style={{ verticalAlign: "middle" }}
                        >
                          <span className="font-extrabold text-primary text-base">
                            {ministry.totalContracts}
                          </span>
                        </td>
                      </>
                    )}
                    {/* Customer row */}
                    <td className="px-5 py-2.5 text-slate-700">{customer.name}</td>
                    <td className="px-4 py-2.5 text-center font-semibold text-slate-700">
                      {customer.contractCount}
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {MINISTRY_DATA.length} divisions ·{" "}
            {MINISTRY_DATA.reduce((s, m) => s + m.customers.length, 0)} customers
          </p>
          <span className="text-xs font-semibold text-primary">
            {MINISTRY_DATA.reduce((s, m) => s + m.totalContracts, 0)} total contracts
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Stat Card ──────────────────────────────────────────────── */
function StatCard({
  label,
  value,
  icon: Icon,
  bg,
  border,
  iconBg,
  iconColor,
  labelColor,
  valueColor,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`${bg} ${border} border rounded-xl px-5 py-4 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow ${onClick ? "cursor-pointer hover:ring-2 hover:ring-primary/30 hover:ring-offset-1" : ""}`}
    >
      <div>
        <p className={`text-3xl font-extrabold ${valueColor} leading-none mb-1.5`}>{value}</p>
        <p className={`text-xs font-semibold uppercase tracking-wide ${labelColor}`}>{label}</p>
      </div>
      <div className={`${iconBg} p-3 rounded-xl shrink-0`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────────── */
function SectionHeader({ title }) {
  return (
    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
      <span className="w-1 h-5 rounded-full bg-primary inline-block" />
      {title}
    </h2>
  );
}

/* ─── Static data ────────────────────────────────────────────── */
const ORDER_STATS = [
  {
    label: "Accepted",
    value: 147,
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    labelColor: "text-emerald-700",
    valueColor: "text-emerald-900",
  },
  {
    label: "Cancelled",
    value: 43,
    icon: XCircle,
    bg: "bg-slate-50",
    border: "border-slate-200",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    labelColor: "text-slate-600",
    valueColor: "text-slate-800",
  },
  {
    label: "Pending",
    value: 151,
    icon: Clock,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    labelColor: "text-amber-700",
    valueColor: "text-amber-900",
  },
  {
    label: "Hold",
    value: 4,
    icon: PauseCircle,
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    labelColor: "text-indigo-700",
    valueColor: "text-indigo-900",
  },
  {
    label: "Reject",
    value: 13,
    icon: ThumbsDown,
    bg: "bg-rose-50",
    border: "border-rose-200",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    labelColor: "text-rose-700",
    valueColor: "text-rose-900",
  },
  {
    label: "Completed",
    value: 232,
    icon: CheckCheck,
    bg: "bg-teal-50",
    border: "border-teal-200",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    labelColor: "text-teal-700",
    valueColor: "text-teal-900",
  },
  {
    label: "Resubmit",
    value: 1,
    icon: RefreshCcw,
    bg: "bg-violet-50",
    border: "border-violet-200",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    labelColor: "text-violet-700",
    valueColor: "text-violet-900",
  },
  {
    label: "Deactivated",
    value: 4,
    icon: PowerOff,
    bg: "bg-red-50",
    border: "border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    labelColor: "text-red-700",
    valueColor: "text-red-900",
  },
];

const totalOrders = ORDER_STATS.reduce((s, c) => s + c.value, 0);
const completionRate = Math.round(
  ((ORDER_STATS.find((s) => s.label === "Completed")?.value || 0) / totalOrders) * 100
);

/* ─── Page ───────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [ministryOpen, setMinistryOpen] = useState(false);

  const CUSTOMER_STATS = [
    {
      label: "Total Customers",
      value: 192,
      icon: Users,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      labelColor: "text-emerald-700",
      valueColor: "text-emerald-900",
    },
    {
      label: "Total Ministrys",
      value: 54,
      icon: Building2,
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      labelColor: "text-blue-700",
      valueColor: "text-blue-900",
      onClick: () => setMinistryOpen(true),
    },
    {
      label: "Total Contracts",
      value: 297,
      icon: FileText,
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      labelColor: "text-cyan-700",
      valueColor: "text-cyan-900",
    },
    {
      label: "Total Services",
      value: 307,
      icon: Package,
      bg: "bg-orange-50",
      border: "border-orange-200",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      labelColor: "text-orange-700",
      valueColor: "text-orange-900",
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Platform-wide overview of customers, contracts, and order activity
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-xl px-4 py-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary">{completionRate}% Completion Rate</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">{totalOrders} Total Orders</span>
          </div>
        </div>
      </div>

      {/* ── Customers ──────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeader title="Customers" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CUSTOMER_STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* ── Orders ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeader title="Orders" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ORDER_STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* ── Ministry Dialog ─────────────────────────────────── */}
      <MinistryDialog open={ministryOpen} onClose={() => setMinistryOpen(false)} />
    </div>
  );
}
