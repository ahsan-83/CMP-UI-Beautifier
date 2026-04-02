import React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { useToast } from "../hooks/use-toast";
import {
  Package,
  Plus,
  Hash,
  Monitor,
  BarChart2,
  Ruler,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  Server,
  HardDrive,
  Cpu,
  Mail,
  Database,
  SlidersHorizontal,
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  User,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

/*  ── Mock data ───────────────────────────────────────────── */
const INVENTORY_DATA = [
  {
    id: 1,
    resourceType: "vCPU",
    platformType: "NUTANIX",
    quantity: 6174,
    unit: "core",
  },
  {
    id: 2,
    resourceType: "Memory",
    platformType: "NUTANIX",
    quantity: 5372,
    unit: "GB",
  },
  {
    id: 3,
    resourceType: "HDD",
    platformType: "NUTANIX",
    quantity: 75,
    unit: "GB",
  },
  {
    id: 4,
    resourceType: "SSD",
    platformType: "NUTANIX",
    quantity: 6572,
    unit: "GB",
  },
  {
    id: 5,
    resourceType: "SSD",
    platformType: "HUAWEI",
    quantity: 420,
    unit: "GB",
  },
  {
    id: 6,
    resourceType: "Memory",
    platformType: "HUAWEI",
    quantity: 194,
    unit: "",
  },
  {
    id: 7,
    resourceType: "HDD",
    platformType: "HUAWEI",
    quantity: 1137,
    unit: "",
  },
  {
    id: 8,
    resourceType: "DOMAIN_QUOTA",
    platformType: "ZIMBRA",
    quantity: 4937,
    unit: "GB",
  },
  {
    id: 9,
    resourceType: "vCPU",
    platformType: "HUAWEI",
    quantity: 468,
    unit: "",
  },
  {
    id: 10,
    resourceType: "EMAIL",
    platformType: "ZIMBRA",
    quantity: 9424,
    unit: "",
  },
  {
    id: 11,
    resourceType: "vCPU",
    platformType: "HUAWEI",
    quantity: 312,
    unit: "core",
  },
  {
    id: 12,
    resourceType: "Memory",
    platformType: "HUAWEI",
    quantity: 2048,
    unit: "GB",
  },
  {
    id: 13,
    resourceType: "SSD",
    platformType: "NUTANIX",
    quantity: 800,
    unit: "GB",
  },
  {
    id: 14,
    resourceType: "HDD",
    platformType: "NUTANIX",
    quantity: 2000,
    unit: "GB",
  },
  {
    id: 15,
    resourceType: "DOMAIN_QUOTA",
    platformType: "ZIMBRA",
    quantity: 1024,
    unit: "GB",
  },
];
const RESOURCE_TYPES = ["vCPU", "Memory", "HDD", "SSD", "DOMAIN_QUOTA", "EMAIL"];
const PLATFORM_TYPES = ["NUTANIX", "HUAWEI", "ZIMBRA"];
const PAGE_SIZE = 10;

/*  ── Resource type icon/colour ───────────────────────────── */
function resourceMeta(type) {
  switch (type) {
    case "vCPU":
      return {
        icon: Cpu,
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100",
      };
    case "Memory":
      return {
        icon: Database,
        bg: "bg-violet-50",
        text: "text-violet-600",
        border: "border-violet-100",
      };
    case "HDD":
      return {
        icon: HardDrive,
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-100",
      };
    case "SSD":
      return {
        icon: HardDrive,
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-100",
      };
    case "DOMAIN_QUOTA":
      return {
        icon: Server,
        bg: "bg-orange-50",
        text: "text-orange-600",
        border: "border-orange-100",
      };
    case "EMAIL":
      return {
        icon: Mail,
        bg: "bg-rose-50",
        text: "text-rose-600",
        border: "border-rose-100",
      };
    default:
      return {
        icon: Package,
        bg: "bg-slate-50",
        text: "text-slate-600",
        border: "border-slate-100",
      };
  }
}
function platformBadge(p) {
  if (p === "NUTANIX") return "bg-blue-50 text-blue-700 border-blue-200";
  if (p === "HUAWEI") return "bg-red-50 text-red-700 border-red-200";
  if (p === "ZIMBRA") return "bg-purple-50 text-purple-700 border-purple-200";
  return "bg-slate-100 text-slate-600 border-slate-200";
}

/*  ── Mock history generator ──────────────────────────────── */
const ACTORS = [
  {
    email: "team1@bcc.gov.bd",
    id: 321,
  },
  {
    email: "customer_manager1@bcc.gov.bd",
    id: 323,
  },
  {
    email: "admin@bcc.gov.bd",
    id: 310,
  },
  {
    email: "ops_lead@bcc.gov.bd",
    id: 318,
  },
];
const TX_TYPES = [
  "Delivery",
  "Incoming",
  "Delivery",
  "Delivery",
  "Deactivation",
  "Delivery",
  "Activation",
  "Adjustment",
  "Delivery",
  "Incoming",
  "Delivery",
  "Deactivation",
  "Delivery",
  "Delivery",
  "Incoming",
  "Delivery",
];
function generateHistory(qty) {
  let balance = qty;
  const rows = [];
  const base = 913;
  const baseMs = new Date("2026-03-15T15:08:00").getTime();
  for (let i = 0; i < 16; i++) {
    const tx = TX_TYPES[i];
    const delta =
      tx === "Delivery"
        ? Math.floor(Math.random() * 30)
        : tx === "Incoming"
          ? Math.floor(Math.random() * 60) + 20
          : Math.floor(Math.random() * 5) + 1;
    const actor = ACTORS[i % ACTORS.length];
    const ms = baseMs - i * 1000 * 60 * (15 + Math.floor(Math.random() * 180));
    const d = new Date(ms);
    const time = d.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    rows.push({
      id: i,
      txId: `#${base - i * 2}`,
      transaction: tx,
      quantity: delta,
      balance,
      actionBy: actor.email,
      actionById: actor.id,
      time,
    });
    if (tx === "Incoming") balance += delta;
    else if (tx === "Delivery" || tx === "Deactivation") balance -= delta;
  }
  return rows;
}

/*  ── Inventory Details Dialog ────────────────────────────── */
function txStyle(tx) {
  switch (tx) {
    case "Delivery":
      return {
        cls: "bg-blue-50 text-blue-700 border-blue-200",
        icon: ArrowUpCircle,
        iconCls: "text-blue-500",
      };
    case "Incoming":
      return {
        cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: ArrowDownCircle,
        iconCls: "text-emerald-500",
      };
    case "Deactivation":
      return {
        cls: "bg-rose-50 text-rose-700 border-rose-200",
        icon: TrendingDown,
        iconCls: "text-rose-500",
      };
    case "Activation":
      return {
        cls: "bg-green-50 text-green-700 border-green-200",
        icon: TrendingUp,
        iconCls: "text-green-500",
      };
    case "Adjustment":
      return {
        cls: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Activity,
        iconCls: "text-amber-500",
      };
  }
}
function InventoryDetailsDialog({ item, open, onOpenChange }) {
  if (!item) return null;
  const history = generateHistory(item.quantity);
  const incomingTotal = history
    .filter((r) => r.transaction === "Incoming")
    .reduce((s, r) => s + r.quantity, 0);
  const deliveryTotal = history
    .filter((r) => r.transaction === "Delivery")
    .reduce((s, r) => s + r.quantity, 0);
  const meta = resourceMeta(item.resourceType);
  const Icon = meta.icon;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-8 pt-6 pb-5 border-b border-border/50 bg-white">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl border ${meta.bg} ${meta.border}`}>
              <Icon className={`w-5 h-5 ${meta.text}`} />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                Inventory Resource History
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Track all inventory transactions and movements for
                <span className="font-semibold text-foreground">{item.resourceType}</span> —
                <Badge
                  variant="outline"
                  className={`text-xs font-bold ${platformBadge(item.platformType)}`}
                >
                  {item.platformType}
                </Badge>
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="bg-slate-50/60 max-h-[75vh] overflow-y-auto">
          <div className="px-8 pt-6 pb-4 grid grid-cols-3 gap-4">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-indigo-500 mb-1.5">Total Transactions</p>
              <p className="text-3xl font-bold text-indigo-700">{history.length}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-emerald-500 mb-1.5">Incoming Total</p>
              <p className="text-3xl font-bold text-emerald-700">{incomingTotal}</p>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-orange-500 mb-1.5">Delivery Total</p>
              <p className="text-3xl font-bold text-orange-700">{deliveryTotal}</p>
            </div>
          </div>
          <div className="px-8 pb-8">
            <div className="bg-white rounded-xl border border-border/60 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 bg-slate-50/80">
                      {[
                        {
                          icon: Hash,
                          label: "ID",
                        },
                        {
                          icon: Activity,
                          label: "Transaction",
                        },
                        {
                          icon: BarChart2,
                          label: "Quantity",
                        },
                        {
                          icon: TrendingUp,
                          label: "Balance",
                        },
                        {
                          icon: User,
                          label: "Action By",
                        },
                        {
                          icon: Clock,
                          label: "Time",
                        },
                      ].map(({ icon: HIcon, label }) => (
                        <th
                          key={label}
                          className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          <span className="flex items-center gap-1.5">
                            <HIcon className="w-3.5 h-3.5" /> {label}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {history.map((row, i) => {
                      const ts = txStyle(row.transaction);
                      const TxIcon = ts.icon;
                      return (
                        <tr
                          key={row.id}
                          className={`hover:bg-slate-50/60 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/20"}`}
                        >
                          <td className="px-5 py-3.5">
                            <span className="font-mono font-bold text-slate-700 text-sm">
                              {row.txId}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <Badge
                              variant="outline"
                              className={`text-xs font-semibold flex items-center gap-1 w-fit border ${ts.cls}`}
                            >
                              <TxIcon className={`w-3 h-3 ${ts.iconCls}`} />
                              {row.transaction}
                            </Badge>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="font-mono font-semibold text-foreground">
                              {row.quantity}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="font-mono font-bold text-foreground">
                              {row.balance.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="font-medium text-foreground text-sm">{row.actionBy}</p>
                            <p className="text-xs text-muted-foreground">ID: {row.actionById}</p>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className="text-sm text-slate-600">{row.time}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/*  ── Add Inventory Dialog ────────────────────────────────── */
function AddInventoryDialog({ open, onOpenChange, onAdd }) {
  const { toast } = useToast();
  const empty = {
    resourceType: "",
    platformType: "",
    resourceCount: "0",
    ndcDate: "",
    endOfService: "",
    comment: "",
  };
  const [form, setForm] = useState(empty);
  const set = (key) => (val) =>
    setForm((p) => ({
      ...p,
      [key]: val,
    }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.resourceType || !form.platformType) return;
    onAdd({
      id: Date.now(),
      resourceType: form.resourceType,
      platformType: form.platformType,
      quantity: parseInt(form.resourceCount) || 0,
      unit: "",
    });
    toast({
      title: "Resource Added",
      description: `${form.resourceType} on ${form.platformType} has been added to inventory.`,
    });
    onOpenChange(false);
    setForm(empty);
  };
  const selectCls =
    "w-full h-10 rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer";
  const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-7 pt-6 pb-5 border-b border-border/50 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Add Inventory Resource
            </DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="bg-slate-50/60">
          <div className="px-7 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-foreground">
                Resource Type <span className="text-red-500">*</span>
              </Label>
              <select
                required
                value={form.resourceType}
                onChange={(e) => set("resourceType")(e.target.value)}
                className={selectCls}
                style={{
                  backgroundImage: chevronSvg,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                <option value="">Select Option</option>
                {RESOURCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-foreground">
                Platform Type <span className="text-red-500">*</span>
              </Label>
              <select
                required
                value={form.platformType}
                onChange={(e) => set("platformType")(e.target.value)}
                className={selectCls}
                style={{
                  backgroundImage: chevronSvg,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                <option value="">Select Option</option>
                {PLATFORM_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-foreground">Resource Count</Label>
              <Input
                type="number"
                min="0"
                value={form.resourceCount}
                onChange={(e) => set("resourceCount")(e.target.value)}
                className="h-10 border-slate-200 bg-white text-sm focus-visible:ring-primary/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-foreground">NDC Incoming Date</Label>
              <Input
                type="date"
                value={form.ndcDate}
                onChange={(e) => set("ndcDate")(e.target.value)}
                className="h-10 border-slate-200 bg-white text-sm focus-visible:ring-primary/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-foreground">End of Service</Label>
              <Input
                type="date"
                value={form.endOfService}
                onChange={(e) => set("endOfService")(e.target.value)}
                className="h-10 border-slate-200 bg-white text-sm focus-visible:ring-primary/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-slate-600">Comment</Label>
              <textarea
                value={form.comment}
                onChange={(e) => set("comment")(e.target.value)}
                placeholder="Enter any additional details or notes..."
                rows={3}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
              />
            </div>
          </div>
          <div className="px-7 py-4 flex justify-end gap-3 border-t border-border/50 bg-white">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-9 px-6 text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-7 h-9 rounded-lg shadow-sm"
            >
              Add Resource
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/*  ── Main page ───────────────────────────────────────────── */
export default function InventoryListPage() {
  const [data, setData] = useState(INVENTORY_DATA);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const filtered = data.filter((row) => {
    const matchSearch =
      row.resourceType.toLowerCase().includes(search.toLowerCase()) ||
      row.platformType.toLowerCase().includes(search.toLowerCase());
    const matchPlatform = platformFilter === "All" || row.platformType === platformFilter;
    return matchSearch && matchPlatform;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleAdd = (item) => {
    setData((prev) => [item, ...prev]);
    setPage(1);
  };

  /*  stat totals */
  const totalItems = data.length;
  const platforms = [...new Set(data.map((d) => d.platformType))].length;
  const types = [...new Set(data.map((d) => d.resourceType))].length;
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Inventory List</h1>
              <p className="text-sm text-muted-foreground">
                {totalItems} resources across {platforms} platforms
              </p>
            </div>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-10 px-5 rounded-xl shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Inventory Resource
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Total Resources",
              value: totalItems,
              icon: Package,
              color: "from-emerald-500 to-emerald-600",
            },
            {
              label: "Platforms",
              value: platforms,
              icon: Monitor,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Resource Types",
              value: types,
              icon: SlidersHorizontal,
              color: "from-violet-500 to-violet-600",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className={`bg-gradient-to-br ${color} rounded-2xl p-5 text-white shadow-sm`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold opacity-90">{label}</span>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold">{value}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by resource or platform…"
              className="pl-9 h-9 border-slate-200 bg-slate-50 text-sm focus-visible:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {["All", ...PLATFORM_TYPES].map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPlatformFilter(p);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${platformFilter === p ? "bg-primary text-white border-primary shadow-sm" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-primary/40 hover:text-primary"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-slate-50/80">
                  {[
                    {
                      icon: Hash,
                      label: "Resource Type",
                    },
                    {
                      icon: Monitor,
                      label: "Platform Type",
                    },
                    {
                      icon: BarChart2,
                      label: "Quantity",
                    },
                    {
                      icon: Ruler,
                      label: "Unit",
                    },
                    {
                      icon: Eye,
                      label: "View Details",
                    },
                  ].map(({ icon: Icon, label }) => (
                    <th
                      key={label}
                      className="text-center px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" /> {label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-muted-foreground">
                      <Package className="w-10 h-10 mx-auto mb-3 text-slate-200" />
                      <p className="font-medium">No inventory items found</p>
                    </td>
                  </tr>
                ) : (
                  paginated.map((row, i) => {
                    const meta = resourceMeta(row.resourceType);
                    const Icon = meta.icon;
                    return (
                      <tr
                        key={row.id}
                        className={`transition-colors hover:bg-slate-50/60 ${i % 2 === 0 ? "" : "bg-slate-50/20"}`}
                      >
                        <td className="px-6 py-3.5 text-center">
                          <div className="flex items-center justify-center gap-2.5">
                            <div className={`p-1.5 rounded-lg border ${meta.bg} ${meta.border}`}>
                              <Icon className={`w-3.5 h-3.5 ${meta.text}`} />
                            </div>
                            <span className="font-semibold text-foreground text-sm">
                              {row.resourceType}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          <div className="flex justify-center">
                            <Badge
                              variant="outline"
                              className={`text-xs font-bold px-2.5 ${platformBadge(row.platformType)}`}
                            >
                              {row.platformType}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          <span className="font-mono font-bold text-foreground text-sm">
                            {row.quantity.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          {row.unit ? (
                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {row.unit}
                            </span>
                          ) : (
                            <span className="text-slate-300 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          <Button
                            size="sm"
                            onClick={() => {
                              setDetailItem(row);
                              setDetailOpen(true);
                            }}
                            className="bg-primary hover:bg-primary/90 text-white h-7 px-4 text-xs font-semibold rounded-lg"
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3.5 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/40">
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} entries
            </p>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-7 w-7 p-0 rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1
              )
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && arr[idx - 1] !== p - 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <span key={`e${i}`} className="text-xs text-slate-400 px-1">
                      …
                    </span>
                  ) : (
                    <Button
                      key={p}
                      variant={page === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                      className={`h-7 w-7 p-0 rounded-lg text-xs ${page === p ? "bg-primary text-white" : ""}`}
                    >
                      {p}
                    </Button>
                  )
                )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="h-7 w-7 p-0 rounded-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AddInventoryDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAdd} />
      <InventoryDetailsDialog item={detailItem} open={detailOpen} onOpenChange={setDetailOpen} />
    </>
  );
}
