import { AppLayout } from "@/components/layout/AppLayout";
import { Link, useParams } from "wouter";
import { ChevronRight, FileText, Calendar, Building, ShoppingCart, Download, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const orderNum = orderId || "20260315-NDC-00075-515";

  return (
    <AppLayout withSidebar>
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm font-medium text-muted-foreground gap-2 mb-2">
          <Link href="/orders" className="hover:text-primary transition-colors">Order List</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Order Details</span>
        </div>

        {/* Top Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Contract and Order
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Order No:</span><span className="font-mono font-bold">{orderNum}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Contract:</span><span className="font-mono font-semibold">NDC-00075</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Order Status:</span><Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">PENDING</Badge></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Order Type:</span><Badge variant="secondary" className="bg-slate-100">New Request</Badge></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Order Dates
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Request Date:</span><span className="font-medium">Mar 15, 2026 01:21 PM</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Approve Date:</span><span className="font-medium text-slate-400">N/A</span></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" /> Customer Organization
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Name:</span><span className="font-bold">Lutfor Rahman</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-medium">programmer@rajukdhaka.gov.bd</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Phone:</span><span className="font-medium">+8801554001971</span></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Tracking */}
        <Card className="shadow-sm border-border overflow-hidden">
          <div className="p-5 border-b bg-slate-50/50 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-bold text-foreground text-lg">Order Tracking</h3>
          </div>
          <CardContent className="p-8 flex justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-[0_0_0_2px_theme(colors.primary.DEFAULT)] z-10 mb-4">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold text-foreground">Request Submitted</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">2026-03-15</p>
            </div>
            {/* The rest of the stepper would go here, simplified for this view */}
          </CardContent>
        </Card>

        {/* Requested Packages */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-1.5 rounded-xl font-bold">৳ 25000</Badge>
              <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 bg-white">
                <XCircle className="w-4 h-4 mr-2" /> Cancel Order
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50 bg-white">
                <Download className="w-4 h-4 mr-2" /> Download Order PDF
              </Button>
              <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50 bg-white">
                <Download className="w-4 h-4 mr-2" /> Download Order Approval Letter
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
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
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-700">
                        <Link href={`/resources/res-${item}`} className="hover:text-primary transition-colors flex items-center gap-2">
                          Virtual Private Server (VPS) Service
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </Link>
                      </td>
                      <td className="px-5 py-4"><Badge variant="outline" className="bg-slate-50">Basic</Badge></td>
                      <td className="px-5 py-4 text-xs font-medium text-slate-600">2 vCPU, 4 GB RAM, 100 GB Storage</td>
                      <td className="px-5 py-4 font-bold text-emerald-600 whitespace-nowrap">৳ 5000</td>
                      <td className="px-5 py-4 text-center font-bold text-lg">1</td>
                      <td className="px-5 py-4 text-center">
                        <Button variant="link" className="text-primary h-auto py-1 px-2 font-semibold">
                          <Eye className="w-4 h-4 mr-1.5" /> View Attributes
                        </Button>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200 whitespace-nowrap">PENDING</Badge>
                      </td>
                      <td className="px-5 py-4 text-center text-slate-300">-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
