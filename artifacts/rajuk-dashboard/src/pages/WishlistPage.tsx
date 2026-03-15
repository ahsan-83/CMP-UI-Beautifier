import { AppLayout } from "@/components/layout/AppLayout";
import { Trash2, FileText, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function WishlistPage() {
  return (
    <AppLayout withSidebar>
      <div className="flex flex-col h-full gap-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Wish List Items</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-semibold bg-white">
              <Check className="w-4 h-4 mr-2" /> Select All
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold bg-white">
              <FileText className="w-4 h-4 mr-2" /> Save as PDF
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Scrollable List */}
          <div className="flex-1 flex flex-col gap-4">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden border-border/80 shadow-sm hover:border-primary/30 transition-colors">
                <div className="bg-slate-50/80 p-3 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox id={`item-${item}`} />
                    <label htmlFor={`item-${item}`} className="font-bold text-sm text-foreground cursor-pointer">
                      Item {item}
                    </label>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Mar 15, 2026 01:19 PM
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-dashed border-border/60">
                    <h3 className="font-bold text-primary flex items-center gap-2 text-base">
                      Virtual Private Server (VPS) Service
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] uppercase font-bold tracking-wider">Basic</Badge>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700">৳ 5000</Badge>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground bg-slate-50/50 uppercase">
                        <tr>
                          <th className="px-4 py-3 font-semibold w-1/2">Feature</th>
                          <th className="px-4 py-3 font-semibold text-center">Quantity</th>
                          <th className="px-4 py-3 font-semibold text-right">Monthly Fee</th>
                          <th className="px-4 py-3 font-semibold text-right">Total Fee</th>
                          <th className="px-4 py-3 font-semibold text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        <tr className="hover:bg-slate-50/30">
                          <td className="px-4 py-4 align-top">
                            <p className="font-medium text-slate-700 leading-relaxed text-xs">
                              2 vCPU, 4 GB RAM, 100 GB Storage / OS: CentOS / Security Zone: Database / Port: 22, 80, 443 / Public IP Needed: No
                            </p>
                          </td>
                          <td className="px-4 py-4 align-top text-center font-semibold">1</td>
                          <td className="px-4 py-4 align-top text-right font-medium">৳ 5,000</td>
                          <td className="px-4 py-4 align-top text-right font-bold text-emerald-600">৳ 5000</td>
                          <td className="px-4 py-4 align-top text-center">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-72 shrink-0">
            <Card className="sticky top-24 border-primary/20 shadow-md">
              <div className="bg-primary/5 p-4 border-b border-primary/10">
                <h2 className="font-bold text-lg text-foreground">Order Summary</h2>
              </div>
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                  <span>Subtotal:</span>
                  <span>৳ 15,000.00</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                  <span>Tax & VAT:</span>
                  <span>5%</span>
                </div>
                <div className="h-px w-full bg-border my-2" />
                <div className="flex justify-between items-center text-base font-bold text-foreground">
                  <span>Total:</span>
                  <span className="text-primary">৳ 15,750.00</span>
                </div>
                <p className="text-[10px] text-muted-foreground text-right mt-1">(including VAT)</p>
                
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-sm transition-all hover:shadow">
                  Proceed to Checkout <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
