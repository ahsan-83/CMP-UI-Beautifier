import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "wouter";
import { Search, ChevronLeft, ChevronRight, AlertCircle, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ORDERS = [
  { id: "20260315-NDC-00075-510", type: "Change Package", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 15, 2026 11:46 AM", approved: "", status: "PENDING" },
  { id: "20260311-NDC-00075-491", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 11, 2026 01:36 PM", approved: "", status: "PENDING" },
  { id: "20260310-NDC-00075-485", type: "Change Package", service: "Cloud (SID-00075)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "admin@rajuk.gov.bd", date: "Mar 10, 2026 09:15 AM", approved: "Mar 10, 2026 10:00 AM", status: "DELIVERED" },
  { id: "20260309-NDC-00075-480", type: "New Request", service: "VPS (SID-00075)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "saa@rajuk.gov.bd", date: "Mar 09, 2026 02:30 PM", approved: "Mar 09, 2026 03:45 PM", status: "DELIVERED" },
  { id: "20260308-NDC-00075-475", type: "Change Package", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 08, 2026 10:20 AM", approved: "", status: "WAITING" },
  { id: "20260305-NDC-00075-460", type: "New Request", service: "Cloud (SID-00075)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "ddflinance@rajuk.gov.bd", date: "Mar 05, 2026 12:05 PM", approved: "Mar 05, 2026 01:00 PM", status: "DELIVERED" },
  { id: "20260302-NDC-00075-454", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Mar 02, 2026 02:10 PM", approved: "Mar 02, 2026 03:00 PM", status: "DELIVERED" },
  { id: "20260301-NDC-00075-450", type: "Change Package", service: "VPS (SID-00075)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "saa@rajuk.gov.bd", date: "Mar 01, 2026 09:00 AM", approved: "Mar 01, 2026 09:30 AM", status: "DELIVERED" },
  { id: "20260228-NDC-00075-445", type: "New Request", service: "Cloud (SID-00075)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "admin@rajuk.gov.bd", date: "Feb 28, 2026 11:30 AM", approved: "", status: "WAITING" },
  { id: "20260225-NDC-00075-440", type: "New Request", service: "Mail (SID-00324)", org: "Rajdhani Unnayan Kartipakkha (RAJUK)", user: "programmer@rajuk.gov.bd", date: "Feb 25, 2026 03:15 PM", approved: "Feb 25, 2026 04:00 PM", status: "DELIVERED" },
];

export default function OrderListPage() {
  return (
    <AppLayout withSidebar>
      <div className="flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Order List</h1>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-sm font-bold px-3 py-1">Total: 134</Badge>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm flex flex-col overflow-hidden">
          
          {/* Header Controls */}
          <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              <Badge className="bg-primary hover:bg-primary text-white px-4 py-1.5 cursor-pointer whitespace-nowrap">Pending</Badge>
              <Badge variant="outline" className="bg-white text-slate-600 hover:bg-slate-50 px-4 py-1.5 cursor-pointer whitespace-nowrap">Waiting for Delivery</Badge>
              <Badge variant="outline" className="bg-white text-slate-600 hover:bg-slate-50 px-4 py-1.5 cursor-pointer whitespace-nowrap">Delivered</Badge>
              <Badge variant="outline" className="bg-white text-slate-600 hover:bg-slate-50 px-4 py-1.5 cursor-pointer whitespace-nowrap">All</Badge>
            </div>
            
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-9 bg-white w-full rounded-xl" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white bg-primary uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-4 py-4 whitespace-nowrap">Order No ▲</th>
                  <th className="px-4 py-4 whitespace-nowrap">Order Type ▲</th>
                  <th className="px-4 py-4 whitespace-nowrap">Service</th>
                  <th className="px-4 py-4 whitespace-nowrap max-w-[200px]">Organization ▲</th>
                  <th className="px-4 py-4 whitespace-nowrap">User</th>
                  <th className="px-4 py-4 whitespace-nowrap">Request Date ▲</th>
                  <th className="px-4 py-4 whitespace-nowrap">Approved Date</th>
                  <th className="px-4 py-4 whitespace-nowrap text-center">Status</th>
                  <th className="px-4 py-4 whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {ORDERS.map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-4 py-4">
                      <Link href={`/orders/${order.id}`} className="font-mono text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                        {order.id} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className="bg-slate-50 text-slate-700 whitespace-nowrap">{order.type}</Badge>
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-800 whitespace-nowrap">{order.service}</td>
                    <td className="px-4 py-4 text-xs max-w-[150px] truncate" title={order.org}>{order.org}</td>
                    <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap">{order.user}</td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap">{order.date}</td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap text-slate-500">{order.approved || "-"}</td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${
                        order.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {order.status === 'PENDING' ? (
                        <Button variant="ghost" size="sm" className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-semibold px-2">
                          <X className="w-3 h-3 mr-1" /> Cancel
                        </Button>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between bg-slate-50 text-sm gap-4">
            <p className="text-muted-foreground font-medium">Showing 1 to 10 of 134 results</p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-8 bg-white" disabled><ChevronLeft className="w-4 h-4 mr-1" /> Previous</Button>
              <div className="flex items-center gap-1 px-2 hidden sm:flex">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground font-bold">1</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white font-medium">2</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white font-medium">3</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white font-medium">4</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white font-medium">5</Button>
                <span className="px-1 text-muted-foreground">...</span>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white font-medium">14</Button>
              </div>
              <Button variant="outline" size="sm" className="h-8 bg-white font-medium">Next <ChevronRight className="w-4 h-4 ml-1" /></Button>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
