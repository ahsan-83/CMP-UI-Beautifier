import React from "react";
import { useLocation } from "wouter";
import { Search, ChevronLeft, ChevronRight, X, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
export const ORDERS = [
  {
    id: "20260315-NDC-00075-510",
    type: "Change Package",
    service: "Mail (SID-00324)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 15, 2026 11:46 AM",
    approved: "",
    status: "PENDING",
  },
  {
    id: "20260311-NDC-00075-491",
    type: "New Request",
    service: "Mail (SID-00324)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 11, 2026 01:36 PM",
    approved: "",
    status: "PENDING",
  },
  {
    id: "20260311-NDC-00075-490",
    type: "New Request",
    service: "Mail (SID-00324)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 11, 2026 01:03 PM",
    approved: "",
    status: "PENDING",
  },
  {
    id: "20260311-NDC-00075-489",
    type: "New Request",
    service: "Mail (SID-00324)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 11, 2026 12:52 PM",
    approved: "",
    status: "PENDING",
  },
  {
    id: "20260311-NDC-00075-488",
    type: "New Request",
    service: "Mail (SID-00324)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 11, 2026 12:43 PM",
    approved: "",
    status: "PENDING",
  },
  {
    id: "20260311-NDC-00075-487",
    type: "New Request",
    service: "Cloud (SID-00075)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 11, 2026 10:53 AM",
    approved: "",
    status: "PENDING",
  },
  {
    id: "20260311-NDC-00075-486",
    type: "New Request",
    service: "Mail (SID-00324)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 11, 2026 10:40 AM",
    approved: "",
    status: "PENDING",
  },
  {
    id: "20260311-NDC-00075-485",
    type: "New Request",
    service: "Mail (SID-00324)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 11, 2026 10:39 AM",
    approved: "",
    status: "PENDING",
  },
  {
    id: "20260311-NDC-00075-484",
    type: "New Request",
    service: "Mail (SID-00324)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 11, 2026 10:38 AM",
    approved: "",
    status: "PENDING",
  },
  {
    id: "20260311-NDC-00075-483",
    type: "New Request",
    service: "Mail (SID-00324)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 11, 2026 10:22 AM",
    approved: "",
    status: "PENDING",
  },
  {
    id: "20260315-NDC-00075-516",
    type: "New Request",
    service: "Cloud (SID-00075)",
    org: "Rajdhani Unnayan Kartipakkha (RAJUK)",
    user: "programmer@rajuk.gov.bd",
    date: "Mar 15, 2026 03:07 PM",
    approved: "Mar 15, 2026 03:08 PM",
    status: "DELIVERED",
  },
];
const FILTERS = ["Pending", "Waiting for Delivery", "Delivered", "All"];
export default function OrderListPage() {
  const [, navigate] = useLocation();
  const [activeFilter, setActiveFilter] = useState("Pending");
  const [search, setSearch] = useState("");
  const filtered = ORDERS.filter((o) => {
    const matchesSearch =
      search === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.service.toLowerCase().includes(search.toLowerCase()) ||
      o.type.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === "All") return true;
    if (activeFilter === "Pending") return o.status === "PENDING";
    if (activeFilter === "Waiting for Delivery") return o.status === "WAITING";
    if (activeFilter === "Delivered") return o.status === "DELIVERED";
    return true;
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
            <ClipboardList className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Order List</h1>
            <p className="text-sm text-muted-foreground">Track and manage your service orders</p>
          </div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-sm font-bold px-3 py-1">
            Total: 134
          </Badge>
        </div>
      </div>
      <div className="bg-white rounded-2xl border shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${activeFilter === f ? "bg-primary text-white border-primary shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white w-full rounded-xl"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-white bg-primary uppercase font-bold tracking-wider">
              <tr>
                <th className="px-4 py-4 whitespace-nowrap">Order No ▲</th>
                <th className="px-4 py-4 whitespace-nowrap">Order Type ▲</th>
                <th className="px-4 py-4 whitespace-nowrap">Service</th>
                <th className="px-4 py-4 whitespace-nowrap">Organization ▲</th>
                <th className="px-4 py-4 whitespace-nowrap">User</th>
                <th className="px-4 py-4 whitespace-nowrap">Request Date ▲</th>
                <th className="px-4 py-4 whitespace-nowrap">Approved Date</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-4">
                      <span className="font-mono text-xs font-semibold text-primary group-hover:underline">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        variant="outline"
                        className="bg-slate-50 text-slate-700 whitespace-nowrap"
                      >
                        {order.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-800 whitespace-nowrap">
                      {order.service}
                    </td>
                    <td className="px-4 py-4 text-xs max-w-[180px] truncate" title={order.org}>
                      {order.org}
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap">
                      {order.user}
                    </td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap">{order.date}</td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap text-slate-500">
                      {order.approved || "-"}
                    </td>
                    <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <Badge
                        variant="outline"
                        className={`text-[10px] uppercase font-bold tracking-wider ${order.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" : order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      {order.status === "PENDING" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-semibold px-2"
                        >
                          <X className="w-3 h-3 mr-1" /> Cancel
                        </Button>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between bg-slate-50 text-sm gap-4">
          <p className="text-muted-foreground font-medium">Showing 1 to 10 of 134 results</p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 bg-white" disabled>
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <div className="hidden sm:flex items-center gap-1 px-2">
              {[1, 2, 3, 4, 5].map((p) => (
                <Button
                  key={p}
                  variant="outline"
                  size="sm"
                  className={`h-8 w-8 p-0 font-medium ${p === 1 ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground font-bold" : "bg-white"}`}
                >
                  {p}
                </Button>
              ))}
              <span className="px-1 text-muted-foreground">...</span>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white font-medium">
                14
              </Button>
            </div>
            <Button variant="outline" size="sm" className="h-8 bg-white font-medium">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
