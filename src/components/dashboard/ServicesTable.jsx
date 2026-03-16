function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return undefined;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
import React from "react";
import { useState } from "react";
import { format } from "date-fns";
import {
  Search,
  Filter,
  MoreHorizontal,
  ArrowRight,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useServiceRequests, useUpdateServiceStatus } from "@/hooks/use-dashboard";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const StatusBadge = ({ status }) => {
  const configs = {
    Pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      icon: Clock,
    },
    Active: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: Activity,
    },
    Completed: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      icon: CheckCircle,
    },
    Rejected: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      icon: XCircle,
    },
  };
  const config = configs[status] || configs.Pending;
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm border border-black/5",
        config.bg,
        config.text
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};
export function ServicesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: services, isLoading } = useServiceRequests();
  const updateStatus = useUpdateServiceStatus();
  const { toast } = useToast();
  const handleStatusChange = (id, newStatus) => {
    updateStatus.mutate(
      {
        id,
        status: newStatus,
      },
      {
        onSuccess: () => {
          toast({
            title: "Status Updated",
            description: `Service request ${id} is now ${newStatus}.`,
          });
        },
      }
    );
  };
  const filteredServices = _optionalChain([
    services,
    "optionalAccess",
    (_2) => _2.filter,
    "call",
    (_3) =>
      _3(
        (s) =>
          s.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.applicant.toLowerCase().includes(searchTerm.toLowerCase())
      ),
  ]);
  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
        <div>
          <h3 className="text-lg font-bold text-foreground">Recent Service Requests</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track application statuses
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground bg-slate-50 border-b border-border uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Request ID</th>
              <th className="px-6 py-4">Service Details</th>
              <th className="px-6 py-4">Applicant</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {isLoading ? (
              // Loading State Skeleton
              Array.from({
                length: 5,
              }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-5">
                    <div className="h-4 bg-slate-200 rounded w-24" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="h-4 bg-slate-200 rounded w-48 mb-2" />
                    <div className="h-3 bg-slate-100 rounded w-32" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="h-4 bg-slate-200 rounded w-32" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="h-6 bg-slate-200 rounded-full w-20" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="h-4 bg-slate-200 rounded w-24" />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="h-8 bg-slate-200 rounded w-8 ml-auto" />
                  </td>
                </tr>
              ))
            ) : _optionalChain([filteredServices, "optionalAccess", (_4) => _4.length]) === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="w-10 h-10 text-slate-300 mb-3" />
                    <p className="text-base font-medium text-slate-600">No requests found</p>
                    <p className="text-sm mt-1">Try adjusting your search query.</p>
                  </div>
                </td>
              </tr>
            ) : (
              _optionalChain([
                filteredServices,
                "optionalAccess",
                (_5) => _5.map,
                "call",
                (_6) =>
                  _6((service) => (
                    <tr key={service.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-primary">
                        {service.id}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground">{service.serviceName}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{service.provider}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{service.applicant}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={service.status} />
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {format(new Date(service.createdAt), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors focus:outline-none">
                            <MoreHorizontal className="w-5 h-5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 p-2 rounded-xl shadow-xl border-border/50"
                          >
                            <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                              Change Status
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(service.id, "Active")}
                              className="cursor-pointer font-medium text-blue-600 focus:bg-blue-50 focus:text-blue-700"
                            >
                              <Activity className="w-4 h-4 mr-2" /> Mark Active
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(service.id, "Completed")}
                              className="cursor-pointer font-medium text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" /> Mark Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(service.id, "Rejected")}
                              className="cursor-pointer font-medium text-rose-600 focus:bg-rose-50 focus:text-rose-700"
                            >
                              <XCircle className="w-4 h-4 mr-2" /> Reject Request
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer font-medium text-slate-700">
                              View Details <ArrowRight className="w-4 h-4 ml-auto" />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )),
              ])
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-border/50 bg-slate-50 flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing
          <span className="font-medium text-foreground">
            {_optionalChain([filteredServices, "optionalAccess", (_7) => _7.length]) || 0}
          </span>
          results
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-border rounded-lg bg-white hover:bg-slate-50 hover:text-foreground transition-colors disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1.5 border border-border rounded-lg bg-white hover:bg-slate-50 hover:text-foreground transition-colors disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
