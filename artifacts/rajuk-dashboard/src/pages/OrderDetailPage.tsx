import { AppLayout } from "@/components/layout/AppLayout";
import { Link, useParams } from "wouter";
import { ChevronRight, FileText, Calendar, Building, ShoppingCart, Download, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ORDERS } from "./OrderListPage";

const CHANGE_PACKAGE_ROWS = [
  { service: "Email Service", pkg: "Standard", attribute: "No of Email Accounts", prevQty: "15", reqQty: "35", fee: "BDT 3500", hasAttachment: true },
  { service: "Email Service", pkg: "Standard", attribute: "Domain Quota Upgradation: Unlimited (per GB)", prevQty: "25", reqQty: "25", fee: "BDT 500", hasAttachment: false },
  { service: "Email Service", pkg: "Standard", attribute: "Delegated Admin Account Count", prevQty: "2", reqQty: "2", fee: "BDT 2000", hasAttachment: false },
  { service: "Email Service", pkg: "Standard", attribute: "Admin Privileged Emails", prevQty: "admin@a.gov.bd,support@a.gov.bd", reqQty: "admin@a.gov.bd,support@a.gov.bd", fee: "-", hasAttachment: false },
];

const NEW_REQUEST_ROWS = [
  { service: "Virtual Private Server (VPS) Service", pkg: "Basic", feature: "2 vCPU, 4 GB RAM, 100 GB Storage", fee: "৳ 5000", qty: 1, status: "PENDING" },
  { service: "Virtual Private Server (VPS) Service", pkg: "Basic", feature: "2 vCPU, 4 GB RAM, 100 GB Storage", fee: "৳ 5000", qty: 1, status: "PENDING" },
  { service: "Virtual Private Server (VPS) Service", pkg: "Basic", feature: "2 vCPU, 4 GB RAM, 100 GB Storage", fee: "৳ 5000", qty: 1, status: "PENDING" },
  { service: "Virtual Private Server (VPS) Service", pkg: "Basic", feature: "2 vCPU, 4 GB RAM, 100 GB Storage", fee: "৳ 5000", qty: 1, status: "PENDING" },
  { service: "Virtual Private Server (VPS) Service", pkg: "Basic", feature: "2 vCPU, 4 GB RAM, 100 GB Storage", fee: "৳ 5000", qty: 1, status: "PENDING" },
];

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const order = ORDERS.find(o => o.id === orderId) || ORDERS[0];
  const isChangePackage = order.type === "Change Package";

  const orderNo = order.id;
  const requestDate = order.date;
  const totalCost = isChangePackage ? "৳ 0" : "৳ 25000";

  return (
    <AppLayout withSidebar>
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center text-sm font-medium text-muted-foreground gap-1.5">
          <Link href="/orders" className="hover:text-primary transition-colors">Order List</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-semibold">Order Details</span>
        </div>

        {/* Top Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Contract & Order */}
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Contract and Order
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-28">Order No:</span>
                  <span className="font-mono font-bold text-xs break-all">{orderNo}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-28">Contract:</span>
                  <span className="font-mono font-semibold">NDC-00075</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-slate-500 shrink-0 w-28">Order Status:</span>
                  <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-300 font-bold text-xs">
                    PENDING
                  </Badge>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-slate-500 shrink-0 w-28">Order Type:</span>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-semibold text-xs">
                    {order.type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Dates */}
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Order Dates
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-32">Request Date:</span>
                  <span className="font-medium">{requestDate}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-32">Approve Date:</span>
                  <span className="font-medium text-slate-400">N/A</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Organization */}
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" /> Customer Organization
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-16">Name:</span>
                  <span className="font-bold">Lutfor Rahman</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-16">Email:</span>
                  <span className="font-medium text-xs break-all">programmer@rajukdhaka.gov.bd</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 shrink-0 w-16">Phone:</span>
                  <span className="font-medium">+8801554001971</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Tracking */}
        <Card className="shadow-sm border-border overflow-hidden">
          <div className="px-5 py-4 border-b bg-slate-50/50 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-bold text-foreground">Order Tracking</h3>
          </div>
          <CardContent className="py-8 flex justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-[0_0_0_2px_hsl(221,83%,53%)] mb-4">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold text-foreground">Request Submitted</p>
              <p className="text-sm text-muted-foreground mt-1">2026-03-15</p>
            </div>
          </CardContent>
        </Card>

        {/* Requested Packages Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-600">Requested Packages</span>
              <Badge className="bg-primary/10 text-primary border border-primary/20 text-sm px-3 py-1 font-bold rounded-lg">
                {totalCost}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="text-rose-600 border-rose-300 hover:bg-rose-50 hover:text-rose-700 bg-white font-semibold"
              >
                <XCircle className="w-3.5 h-3.5 mr-1.5" /> Cancel Order
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="border-amber-400 text-amber-700 hover:bg-amber-50 bg-white font-semibold gap-1.5">
                <Download className="w-3.5 h-3.5" /> Download Order PDF
              </Button>
              {!isChangePackage && (
                <Button variant="outline" size="sm" className="border-amber-400 text-amber-700 hover:bg-amber-50 bg-white font-semibold gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Download Order Approval Letter
                </Button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {isChangePackage ? (
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-white bg-primary uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-5 py-4">Service Name</th>
                      <th className="px-5 py-4">Package Name</th>
                      <th className="px-5 py-4">Attribute</th>
                      <th className="px-5 py-4 text-center">Previous Quantity</th>
                      <th className="px-5 py-4 text-center">Requested Quantity</th>
                      <th className="px-5 py-4 text-center">Monthly Fee</th>
                      <th className="px-5 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {CHANGE_PACKAGE_ROWS.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-slate-800">{row.service}</td>
                        <td className="px-5 py-4">
                          <Badge variant="outline" className="bg-slate-50 font-medium">{row.pkg}</Badge>
                        </td>
                        <td className="px-5 py-4 text-slate-600 text-xs">{row.attribute}</td>
                        <td className="px-5 py-4 text-center font-semibold text-slate-700">{row.prevQty}</td>
                        <td className="px-5 py-4 text-center font-bold text-primary">{row.reqQty}</td>
                        <td className="px-5 py-4 text-center font-semibold text-slate-700">{row.fee}</td>
                        <td className="px-5 py-4 text-center">
                          {row.hasAttachment ? (
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs h-8 px-3 font-semibold">
                              Download Attachment
                            </Button>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-white bg-primary uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-5 py-4">Service Name</th>
                      <th className="px-5 py-4">Package Name</th>
                      <th className="px-5 py-4">Feature</th>
                      <th className="px-5 py-4">Monthly Fee</th>
                      <th className="px-5 py-4 text-center">Requested Quantity</th>
                      <th className="px-5 py-4 text-center">Attributes</th>
                      <th className="px-5 py-4 text-center">Status</th>
                      <th className="px-5 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {NEW_REQUEST_ROWS.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">{row.service}</td>
                        <td className="px-5 py-4">
                          <Badge variant="outline" className="bg-slate-50 font-medium">{row.pkg}</Badge>
                        </td>
                        <td className="px-5 py-4 text-slate-600 text-xs whitespace-nowrap">{row.feature}</td>
                        <td className="px-5 py-4 font-bold text-emerald-600 whitespace-nowrap">{row.fee}</td>
                        <td className="px-5 py-4 text-center font-bold text-lg">{row.qty}</td>
                        <td className="px-5 py-4 text-center">
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-white text-xs h-8 px-3 font-semibold gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" /> View Attributes
                          </Button>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-300 whitespace-nowrap font-bold text-xs">
                            PENDING
                          </Badge>
                        </td>
                        <td className="px-5 py-4 text-center text-slate-300">-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
