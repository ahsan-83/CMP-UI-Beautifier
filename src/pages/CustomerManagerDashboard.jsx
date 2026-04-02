import React, { useState } from "react";
import {
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Timer,
  UserCheck,
  FilePen,
  PenLine,
  PlayCircle,
  Hash,
  User,
  Calendar,
  Package,
  ShieldCheck,
  Info,
  Settings2,
  ChevronDown,
  Search,
  Filter,
  Eye,
  ThumbsDown,
  ThumbsUp,
  RefreshCcw,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";

/*  ─── Mock data ─────────────────────────────────────────── */
const ORDER_STATUS_STATS = [
  {
    label: "Pending",
    value: 78,
    icon: Clock,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    labelColor: "text-amber-700",
    valueColor: "text-amber-900",
  },
  {
    label: "Waiting for Delivery",
    value: 24,
    icon: Truck,
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    labelColor: "text-indigo-700",
    valueColor: "text-indigo-900",
  },
  {
    label: "Delivered",
    value: 156,
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    labelColor: "text-emerald-700",
    valueColor: "text-emerald-900",
  },
  {
    label: "Rejected by Manager",
    value: 12,
    icon: XCircle,
    bg: "bg-rose-50",
    border: "border-rose-200",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    labelColor: "text-rose-700",
    valueColor: "text-rose-900",
  },
];

const CUSTOMER_STATUS_STATS = [
  {
    label: "Initial Pending",
    value: 45,
    icon: Timer,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    labelColor: "text-amber-700",
    valueColor: "text-amber-900",
  },
  {
    label: "Customer eSign Pending",
    value: 28,
    icon: UserCheck,
    bg: "bg-violet-50",
    border: "border-violet-200",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    labelColor: "text-violet-700",
    valueColor: "text-violet-900",
  },
  {
    label: "ED Pending",
    value: 15,
    icon: FilePen,
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    labelColor: "text-blue-700",
    valueColor: "text-blue-900",
  },
  {
    label: "BCC eSign Pending",
    value: 32,
    icon: PenLine,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    labelColor: "text-emerald-700",
    valueColor: "text-emerald-900",
  },
  {
    label: "Active",
    value: 156,
    icon: PlayCircle,
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    labelColor: "text-cyan-700",
    valueColor: "text-cyan-900",
  },
];

const PENDING_ORDERS = [
  {
    id: "20260402-NDC-00075-201",
    shortId: "ID-001",
    customer: "RAJUK Division",
    customerEmail: "rajuk@gov.bd",
    date: "02-04-2026",
    items: "Email Service (Basic)",
    itemCode: "SVC-001",
    availability: 701,
    status: "Pending",
    statusType: "pending",
  },
  {
    id: "20260401-NDC-00075-198",
    shortId: "ID-002",
    customer: "BRTA Headquarters",
    customerEmail: "brta@gov.bd",
    date: "01-04-2026",
    items: "VPS Service (Advanced)",
    itemCode: "SVC-004",
    availability: 320,
    status: "Pending",
    statusType: "pending",
  },
  {
    id: "20260330-NDC-00075-185",
    shortId: "ID-003",
    customer: "Bangladesh Army HQ",
    customerEmail: "army@mil.bd",
    date: "30-03-2026",
    items: "Domain & Hosting (Standard)",
    itemCode: "SVC-002",
    availability: 145,
    status: "Waiting",
    statusType: "waiting",
  },
  {
    id: "20260328-NDC-00075-172",
    shortId: "ID-004",
    customer: "Ministry of Finance",
    customerEmail: "mof@gov.bd",
    date: "28-03-2026",
    items: "Managed Security (Enterprise)",
    itemCode: "SVC-007",
    availability: 88,
    status: "Pending",
    statusType: "pending",
  },
  {
    id: "20260325-NDC-00075-163",
    shortId: "ID-005",
    customer: "BGMEA Office",
    customerEmail: "bgmea@org.bd",
    date: "25-03-2026",
    items: "Cloud Storage (Basic)",
    itemCode: "SVC-003",
    availability: 210,
    status: "Waiting",
    statusType: "waiting",
  },
  {
    id: "20260320-NDC-00075-151",
    shortId: "ID-006",
    customer: "Dhaka WASA",
    customerEmail: "wasa@gov.bd",
    date: "20-03-2026",
    items: "VPS Service (Standard)",
    itemCode: "SVC-004",
    availability: 415,
    status: "Pending",
    statusType: "pending",
  },
];

/*  ─── Stat Card ─────────────────────────────────────────── */
function StatCard({ label, value, icon: Icon, bg, border, iconBg, iconColor, labelColor, valueColor }) {
  return (
    <div
      className={`${bg} ${border} border rounded-xl px-5 py-4 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div>
        <p className={`text-xs font-semibold ${labelColor} mb-1`}>{label}</p>
        <p className={`text-3xl font-extrabold ${valueColor} leading-none`}>{value}</p>
      </div>
      <div className={`${iconBg} p-3 rounded-xl shrink-0`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
    </div>
  );
}

/*  ─── Status Badge ──────────────────────────────────────── */
function StatusBadge({ type, label }) {
  const styles = {
    pending:
      "bg-amber-50 text-amber-700 border-amber-300",
    waiting:
      "bg-indigo-50 text-indigo-700 border-indigo-300",
    delivered:
      "bg-emerald-50 text-emerald-700 border-emerald-300",
    rejected:
      "bg-rose-50 text-rose-700 border-rose-300",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${styles[type] || styles.pending}`}
    >
      {label}
    </span>
  );
}

/*  ─── Page ──────────────────────────────────────────────── */
export default function CustomerManagerDashboard() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionDone, setActionDone] = useState({});

  const filtered = PENDING_ORDERS.filter((o) => {
    const matchSearch =
      !search ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.includes(search) ||
      o.shortId.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || o.statusType === statusFilter;
    return matchSearch && matchStatus;
  });

  function handleAction(orderId, action) {
    setActionDone((prev) => ({ ...prev, [orderId]: action }));
    const msgs = {
      approve: { title: "Order Approved", description: `Order ${orderId} has been approved.` },
      reject: { title: "Order Rejected", description: `Order ${orderId} has been rejected.` },
    };
    toast(msgs[action]);
  }

  return (
    <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Customer Manager Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time overview of orders and customer statuses
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 font-semibold text-primary border-primary/30 hover:bg-primary/5 bg-white self-start sm:self-auto"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw className="w-4 h-4" /> Refresh
        </Button>
      </div>

      {/* ── Order Status Overview ───────────────────────── */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-primary inline-block" />
          Order Status Overview
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ORDER_STATUS_STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* ── Customer Status Overview ────────────────────── */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-primary inline-block" />
          Customer Status Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CUSTOMER_STATUS_STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* ── Pending Orders Table ────────────────────────── */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-primary inline-block" />
            Pending Orders
            <span className="ml-1 text-sm font-semibold text-muted-foreground">
              ({filtered.length})
            </span>
          </h2>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <Input
                placeholder="Search orders…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs w-44 bg-white"
              />
            </div>
            {/* Status filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 text-xs w-36 bg-white gap-1">
                <Filter className="w-3 h-3 text-slate-400 shrink-0" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              {/* Table header — primary blue, matching other tables in the app */}
              <thead className="text-xs text-white bg-primary uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5" /> Order ID
                    </span>
                  </th>
                  <th className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Customer
                    </span>
                  </th>
                  <th className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Date
                    </span>
                  </th>
                  <th className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" /> Items
                    </span>
                  </th>
                  <th className="px-5 py-3.5 text-center">
                    <span className="flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Availability
                    </span>
                  </th>
                  <th className="px-5 py-3.5 text-center">
                    <span className="flex items-center justify-center gap-1.5">
                      <Info className="w-3.5 h-3.5" /> Status
                    </span>
                  </th>
                  <th className="px-5 py-3.5 text-center">
                    <span className="flex items-center justify-center gap-1.5">
                      <Settings2 className="w-3.5 h-3.5" /> Actions
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">
                      <Search className="w-8 h-8 mx-auto text-slate-200 mb-2" />
                      <p className="font-medium">No orders match your filters</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => {
                    const done = actionDone[order.id];
                    return (
                      <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Order ID */}
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-mono font-bold text-xs text-primary">
                              {order.shortId}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[160px]">
                              {order.id}
                            </p>
                          </div>
                        </td>
                        {/* Customer */}
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-800 text-sm">{order.customer}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{order.customerEmail}</p>
                        </td>
                        {/* Date */}
                        <td className="px-5 py-4 text-slate-600 text-sm font-medium whitespace-nowrap">
                          {order.date}
                        </td>
                        {/* Items */}
                        <td className="px-5 py-4">
                          <p className="text-sm text-slate-700 font-medium">{order.items}</p>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{order.itemCode}</p>
                        </td>
                        {/* Availability */}
                        <td className="px-5 py-4 text-center">
                          <span className="inline-block font-bold text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1">
                            {order.availability}
                          </span>
                        </td>
                        {/* Status */}
                        <td className="px-5 py-4 text-center">
                          {done ? (
                            <StatusBadge
                              type={done === "approve" ? "delivered" : "rejected"}
                              label={done === "approve" ? "Approved" : "Rejected"}
                            />
                          ) : (
                            <StatusBadge type={order.statusType} label={order.status} />
                          )}
                        </td>
                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {done ? (
                              <span className="text-xs text-slate-400 font-medium italic">
                                Action recorded
                              </span>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleAction(order.id, "approve")}
                                  className="h-7 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1"
                                >
                                  <ThumbsUp className="w-3 h-3" /> Approve
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleAction(order.id, "reject")}
                                  className="h-7 px-3 text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold gap-1"
                                >
                                  <ThumbsDown className="w-3 h-3" /> Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer summary */}
          <div className="px-5 py-3 border-t border-border/40 bg-slate-50/60 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
              <span className="font-semibold text-foreground">{PENDING_ORDERS.length}</span> orders
            </span>
            <span className="font-medium">
              Last updated: {new Date().toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" })}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
