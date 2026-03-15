import { AppLayout } from "@/components/layout/AppLayout";
import { Server, Database, Cloud, Shield, Network, Building, Laptop, HardDrive, Cpu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  { id: "compute", name: "Compute", icon: Server },
  { id: "collab", name: "Collaboration Platform", icon: Cloud },
  { id: "db", name: "Database", icon: Database },
  { id: "storage", name: "Storage", icon: HardDrive },
  { id: "backup", name: "Backup", icon: Shield },
  { id: "network", name: "Network", icon: Network },
  { id: "sec", name: "Network Security", icon: Shield },
  { id: "colo", name: "Colocation", icon: Building },
  { id: "hosting", name: "Hosting", icon: Laptop },
  { id: "design", name: "Design Deployment", icon: Cpu },
];

const VPS_PACKAGES = [
  { id: "basic", name: "Basic", specs: "2 vCPU, 4 GB RAM, 100 GB Storage", price: 5000 },
  { id: "standard", name: "Standard", specs: "4 vCPU, 8 GB RAM, 200 GB Storage", price: 10000 },
  { id: "advanced", name: "Advanced", specs: "4 vCPU, 12 GB RAM, 300 GB Storage", price: 15000 },
  { id: "premium", name: "Premium", specs: "8 vCPU, 16 GB RAM, 500 GB Storage", price: 20000 },
];

export default function RequestServicesPage() {
  const { toast } = useToast();
  const [activeCat, setActiveCat] = useState("compute");
  const [selectedPkg, setSelectedPkg] = useState<typeof VPS_PACKAGES[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddClick = (pkg: typeof VPS_PACKAGES[0]) => {
    setSelectedPkg(pkg);
    setDialogOpen(true);
  };

  const handleAddToWishlist = () => {
    setDialogOpen(false);
    toast({
      title: "Added to Wishlist",
      description: `${selectedPkg?.name} VPS has been added to your wishlist.`,
    });
  };

  return (
    <AppLayout withSidebar>
      <div className="flex flex-col h-[calc(100vh-100px)]">
        
        <h1 className="text-3xl font-bold text-foreground mb-6 font-display">Request Based Services</h1>

        {/* Horizontal Category Tabs */}
        <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-4 border-b">
          {CATEGORIES.map(cat => {
            const isActive = activeCat === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                  isActive 
                    ? 'border-primary text-primary bg-primary/5' 
                    : 'border-transparent text-muted-foreground hover:bg-slate-100 hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
          
          {/* Left Sidebar (Subcategories) */}
          <div className="w-full lg:w-64 shrink-0 bg-white rounded-xl border shadow-sm p-3 flex flex-col gap-1 h-fit">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2 mt-2">Compute Services</h3>
            <button className="text-left px-4 py-3 rounded-lg bg-primary text-white font-medium text-sm shadow-sm transition-transform hover:scale-[1.02]">
              Virtual Private Server (VPS) Service
            </button>
            <button className="text-left px-4 py-3 rounded-lg text-slate-600 font-medium text-sm hover:bg-slate-100 transition-colors">
              Physical Server Service
            </button>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 overflow-y-auto pr-2 pb-8">
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-primary inline-block relative">
                Virtual Private Server (VPS) Service
                <div className="absolute -bottom-4 left-0 w-1/3 h-1 bg-primary rounded-full" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VPS_PACKAGES.map(pkg => (
                <Card key={pkg.id} className="relative overflow-hidden group border-border hover:border-primary/50 transition-all hover:shadow-md">
                  <div className="absolute top-0 right-0 p-4">
                    <Server className="w-16 h-16 text-slate-100 group-hover:text-primary/10 transition-colors -rotate-12 transform scale-150" />
                  </div>
                  <CardContent className="p-6 relative z-10 flex flex-col h-full">
                    <Badge variant="outline" className="w-fit mb-4 bg-white shadow-sm font-bold tracking-widest text-[10px] uppercase border-primary/20 text-primary">{pkg.name}</Badge>
                    
                    <h3 className="text-xl font-bold text-foreground mb-4 pr-12 leading-tight">
                      {pkg.specs.split(', ').map((spec, i) => (
                        <span key={i} className="block">{spec}</span>
                      ))}
                    </h3>
                    
                    <div className="mt-auto pt-6 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium mb-1">Monthly Fee</p>
                        <p className="text-2xl font-bold text-emerald-600">৳ {pkg.price}</p>
                      </div>
                      <Button onClick={() => handleAddClick(pkg)} className="bg-primary hover:bg-primary/90 shadow-sm rounded-xl">
                        <Plus className="w-4 h-4 mr-2" /> Add to Wishlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VPS Configuration Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col overflow-hidden bg-slate-50/50 p-0">
          <DialogHeader className="p-6 pb-4 bg-white border-b shrink-0">
            <DialogTitle className="text-xl">Add Virtual Private Server (VPS) Service to Wish List</DialogTitle>
            {selectedPkg && (
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10"><div className="w-2 h-2 rounded-full bg-primary mr-2" />{selectedPkg.name}</Badge>
                <Badge variant="secondary" className="bg-slate-100">{selectedPkg.specs}</Badge>
                <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">৳ {selectedPkg.price} per month</Badge>
              </div>
            )}
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="bg-white p-5 rounded-xl border shadow-sm relative">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-8 w-8">
                <Trash2 className="w-4 h-4" />
              </Button>
              <h4 className="font-bold text-foreground mb-4">Configuration Options</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-1.5">
                  <Label>OS</Label>
                  <Select defaultValue="centos"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="centos">CentOS</SelectItem><SelectItem value="ubuntu">Ubuntu</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-1.5">
                  <Label>OS Version</Label>
                  <Select defaultValue="7"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7">7.x</SelectItem><SelectItem value="8">8.x</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Security Zone</Label>
                  <Select defaultValue="db"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="db">Database</SelectItem><SelectItem value="app">Application</SelectItem></SelectContent></Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <Label>Public IP Needed</Label>
                  <Select defaultValue="no"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Partition to Maximize</Label>
                  <Input placeholder="/var" />
                </div>
                <div className="space-y-1.5">
                  <Label>VPN Account Name</Label>
                  <Input placeholder="vpn_user" />
                </div>
                <div className="space-y-1.5">
                  <Label>Port</Label>
                  <Input defaultValue="22, 80, 443" />
                </div>
              </div>
            </div>

            {/* Extra Services Collapsibles */}
            <div className="space-y-3">
              {[
                { title: "IP Address Service", fields: ["Package", "Count"] },
                { title: "Block Storage Service", fields: ["Package", "Count"] },
                { title: "WAF Service", fields: ["Package", "Count"] },
              ].map((service, idx) => (
                <Collapsible key={idx} className="bg-white rounded-xl border shadow-sm">
                  <CollapsibleTrigger className="w-full px-5 py-4 flex items-center justify-between font-medium text-slate-700 hover:bg-slate-50 transition-colors rounded-xl">
                    {service.title}
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-5 pb-5 pt-2 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>Package</Label>
                        <Select><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="1">Standard</SelectItem></SelectContent></Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Count</Label>
                        <Input type="number" defaultValue="0" />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}

              <Collapsible className="bg-white rounded-xl border shadow-sm">
                <CollapsibleTrigger className="w-full px-5 py-4 flex items-center justify-between font-medium text-slate-700 hover:bg-slate-50 transition-colors rounded-xl">
                  Backup Service
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-5 pb-5 pt-2 border-t">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5"><Label>VM/Hostname</Label><Input /></div>
                    <div className="space-y-1.5"><Label>Host IP</Label><Input /></div>
                    <div className="space-y-1.5"><Label>Backup Type</Label><Select><SelectTrigger><SelectValue /></SelectTrigger></Select></div>
                    <div className="space-y-1.5"><Label>Backup Frequency</Label><Select><SelectTrigger><SelectValue /></SelectTrigger></Select></div>
                    <div className="space-y-1.5"><Label>Backup Directory</Label><Input /></div>
                    <div className="space-y-1.5"><Label>Database Option</Label><Select><SelectTrigger><SelectValue /></SelectTrigger></Select></div>
                    <div className="space-y-1.5"><Label>Retention Period</Label><Select><SelectTrigger><SelectValue /></SelectTrigger></Select></div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <Button variant="outline" className="w-full border-dashed border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary py-6 rounded-xl font-bold bg-white">
              <Plus className="w-5 h-5 mr-2" /> Add More Configurations
            </Button>
          </div>

          <DialogFooter className="p-6 bg-white border-t shrink-0 flex-row items-center justify-between">
            <div className="text-xl font-bold text-primary">
              Total Cost: ৳ {selectedPkg?.price || 0}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddToWishlist} className="bg-emerald-600 hover:bg-emerald-700">Add to Wish List</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
