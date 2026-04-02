import React from "react";
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
} from "lucide-react";

/*  ─── Stat Card ─────────────────────────────────────────── */
function StatCard({ label, value, icon: Icon, bg, border, iconBg, iconColor, labelColor, valueColor }) {
  return (
    <div
      className={`${bg} ${border} border rounded-xl px-5 py-4 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow`}
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

/*  ─── Section Header ────────────────────────────────────── */
function SectionHeader({ title }) {
  return (
    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
      <span className="w-1 h-5 rounded-full bg-primary inline-block" />
      {title}
    </h2>
  );
}

/*  ─── Data ──────────────────────────────────────────────── */
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

/*  ─── Summary totals ────────────────────────────────────── */
const totalOrders = ORDER_STATS.reduce((s, c) => s + c.value, 0);
const completionRate = Math.round(
  ((ORDER_STATS.find((s) => s.label === "Completed")?.value || 0) / totalOrders) * 100
);

/*  ─── Page ──────────────────────────────────────────────── */
export default function AdminDashboard() {
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
        {/* Quick summary pills */}
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
    </div>
  );
}
