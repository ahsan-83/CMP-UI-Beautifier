import React, { useState } from "react";
import { Link, useParams } from "wouter";
import {
  ChevronRight,
  Cloud,
  Eye,
  Pencil,
  Server,
  Mail,
  ChevronLeft,
  Search,
  Check,
  Phone,
  UserCircle2,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { cn } from "../lib/utils";

const PACKAGES = [
  {
    id: "1",
    type: "VPS",
    name: "Basic",
    status: "ACTIVATED",
    feature: "2 vCPU, 4 GB RAM, 100 GB Storage",
    detail: "20260311-NDC-00075-493",
    extras: "VM Name: vm-01gps, Private IP: 172.168.3.9",
    fee: "5,000",
    requested: "Mar 11, 2026 01:38 PM",
    activated: "Mar 12, 2026 09:03 AM",
  },
  {
    id: "2",
    type: "Email",
    name: "Standard",
    status: "DEACTIVATED",
    feature: "N/A",
    detail: "20260305-NDC-00075-460",
    extras: "N/A",
    fee: "2,400",
    requested: "Mar 5, 2026 12:05 PM",
    activated: "Mar 5, 2026 12:07 PM",
  },
  {
    id: "3",
    type: "Email",
    name: "Standard",
    status: "ACTIVATED",
    feature: "N/A",
    detail: "20260305-NDC-00075-459",
    extras: "N/A",
    fee: "3,000",
    requested: "Mar 5, 2026 10:19 AM",
    activated: "Mar 5, 2026 10:20 AM",
  },
  {
    id: "4",
    type: "VPS",
    name: "Basic",
    status: "ACTIVATED",
    feature: "2 vCPU, 4 GB RAM",
    detail: "20260311-NDC-00075-492",
    extras: "VM Name: vm-05gs, 172.3.6.9",
    fee: "5,000",
    requested: "Mar 11, 2026 01:37 PM",
    activated: "Mar 15, 2026 11:53 AM",
  },
  {
    id: "5",
    type: "Email",
    name: "Standard",
    status: "ACTIVATED",
    feature: "N/A",
    detail: "20260302-NDC-00075-454",
    extras: "N/A",
    fee: "3,020",
    requested: "Mar 2, 2026 02:10 PM",
    activated: "Mar 2, 2026 02:11 PM",
  },
  {
    id: "6",
    type: "VPS",
    name: "Advanced",
    status: "ACTIVATED",
    feature: "4 vCPU, 12 GB RAM",
    detail: "20260301-NDC-00075-450",
    extras: "VM Name: vm-adv1",
    fee: "15,000",
    requested: "Mar 1, 2026 09:00 AM",
    activated: "Mar 1, 2026 10:00 AM",
  },
  {
    id: "7",
    type: "VPS",
    name: "Standard",
    status: "ACTIVATED",
    feature: "4 vCPU, 8 GB RAM",
    detail: "20260228-NDC-00075-445",
    extras: "VM Name: vm-std1",
    fee: "10,000",
    requested: "Feb 28, 2026 11:30 AM",
    activated: "Feb 28, 2026 12:45 PM",
  },
  {
    id: "8",
    type: "Email",
    name: "Basic",
    status: "ACTIVATED",
    feature: "N/A",
    detail: "20260225-NDC-00075-440",
    extras: "N/A",
    fee: "1,200",
    requested: "Feb 25, 2026 03:15 PM",
    activated: "Feb 25, 2026 03:30 PM",
  },
  {
    id: "9",
    type: "VPS",
    name: "Premium",
    status: "PENDING",
    feature: "8 vCPU, 16 GB RAM",
    detail: "20260315-NDC-00075-500",
    extras: "Pending Allocation",
    fee: "20,000",
    requested: "Mar 15, 2026 08:20 AM",
    activated: "-",
  },
  {
    id: "10",
    type: "Email",
    name: "Premium",
    status: "ACTIVATED",
    feature: "N/A",
    detail: "20260220-NDC-00075-430",
    extras: "N/A",
    fee: "5,000",
    requested: "Feb 20, 2026 10:00 AM",
    activated: "Feb 20, 2026 10:15 AM",
  },
];

const ALL_USERS = [
  {
    id: "u1",
    name: "Md. Jamal Uddin",
    designation: "Deputy Director Finance & Accounts",
    email: "ddflinance@rajuk.gov.bd",
    phone: "+8801711223344",
  },
  {
    id: "u2",
    name: "Md. Abu Kawser Mollik",
    designation: "Director Finance",
    email: "drfin@rajuk.gov.bd",
    phone: "+8801777775514",
  },
  {
    id: "u3",
    name: "Kaji M. Mahabubul Hoque",
    designation: "Senior System Analyst",
    email: "saa@rajuk.gov.bd",
    phone: "+8801900112233",
  },
  {
    id: "u4",
    name: "Lutfor Rahman",
    designation: "Programmer",
    email: "programmer@rajuk.gov.bd",
    phone: "+8801554001971",
  },
  {
    id: "u5",
    name: "Nasrin Akter",
    designation: "Accounts Officer",
    email: "accounts@rajuk.gov.bd",
    phone: "+8801612345678",
  },
  {
    id: "u6",
    name: "Mohammad Rafiqul Islam",
    designation: "Senior Accounts Officer",
    email: "saccounts@rajuk.gov.bd",
    phone: "+8801823456789",
  },
  {
    id: "u7",
    name: "Farida Begum",
    designation: "Assistant Director Finance",
    email: "adfinance@rajuk.gov.bd",
    phone: "+8801934567890",
  },
  {
    id: "u8",
    name: "Kamal Hossain",
    designation: "Network Engineer",
    email: "network@rajuk.gov.bd",
    phone: "+8801745678901",
  },
  {
    id: "u9",
    name: "Sumaiya Khanam",
    designation: "System Engineer",
    email: "syseng@rajuk.gov.bd",
    phone: "+8801856789012",
  },
  {
    id: "u10",
    name: "Md. Habibur Rahman",
    designation: "Deputy Director IT",
    email: "ddit@rajuk.gov.bd",
    phone: "+8801967890123",
  },
  {
    id: "u11",
    name: "Shirin Akter",
    designation: "Finance Manager",
    email: "fmanager@rajuk.gov.bd",
    phone: "+8801578901234",
  },
  {
    id: "u12",
    name: "Md. Aminul Islam",
    designation: "IT Officer",
    email: "itofficer@rajuk.gov.bd",
    phone: "+8801689012345",
  },
];

const ROLE_LABELS = {
  primaryBilling: "Primary Billing",
  secondaryBilling: "Secondary Billing",
  primaryTechnical: "Primary Technical",
  secondaryTechnical: "Secondary Technical",
};

const ROLE_STYLE = {
  primaryBilling: {
    cardClass: "border-primary/20 bg-primary/5",
    badgeClass: "bg-white border-primary/30 text-primary",
    badgeVariant: "outline",
  },
  secondaryBilling: {
    cardClass: "",
    badgeClass: "",
    badgeVariant: "secondary",
  },
  primaryTechnical: {
    cardClass: "border-primary/20 bg-primary/5",
    badgeClass: "bg-white border-primary/30 text-primary",
    badgeVariant: "outline",
  },
  secondaryTechnical: {
    cardClass: "",
    badgeClass: "",
    badgeVariant: "secondary",
  },
};

function UserCard({ role, user, onEdit }) {
  const style = ROLE_STYLE[role];
  return (
    <Card className={cn("relative group", style.cardClass)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(role)}
        className="absolute top-2 right-2 h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
        title={`Edit ${ROLE_LABELS[role]}`}
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <CardContent className="p-5 pt-6">
        <Badge
          variant={style.badgeVariant}
          className={cn("mb-3 text-xs font-semibold", style.badgeClass)}
        >
          {ROLE_LABELS[role]}
        </Badge>
        <p className="font-bold text-foreground text-base mb-0.5">{user.name}</p>
        <p className="text-xs text-muted-foreground mb-3 font-medium">{user.designation}</p>
        <div className="space-y-1.5 text-sm">
          <p className="flex items-center gap-2 text-slate-600">
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{user.email}</span>
          </p>
          {user.phone && (
            <p className="flex items-center gap-2 text-slate-600">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>{user.phone}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AssignUserDialog({ open, onOpenChange, role, currentUserId, onSave }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(currentUserId);

  const filtered = ALL_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.designation.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleSave() {
    const user = ALL_USERS.find((u) => u.id === selected);
    if (user) onSave(role, user);
    onOpenChange(false);
  }

  function handleOpenChange(val) {
    if (!val) {
      setSearch("");
      setSelected(currentUserId);
    }
    onOpenChange(val);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/60 bg-slate-50/60">
          <DialogTitle className="text-base font-bold text-foreground flex items-center gap-2">
            <UserCircle2 className="w-5 h-5 text-primary" />
            Assign {role ? ROLE_LABELS[role] : ""} User
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select a staff member to assign as the {role ? ROLE_LABELS[role].toLowerCase() : ""}{" "}
            contact for this service.
          </p>
        </DialogHeader>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border/40 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, designation or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* User list */}
        <div className="overflow-y-auto max-h-[340px] divide-y divide-border/40">
          {filtered.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-muted-foreground">
              No users found matching "{search}"
            </div>
          ) : (
            filtered.map((user) => {
              const isSelected = user.id === selected;
              return (
                <button
                  key={user.id}
                  onClick={() => setSelected(user.id)}
                  className={cn(
                    "w-full text-left flex items-center gap-4 px-5 py-3.5 transition-colors",
                    isSelected
                      ? "bg-primary/5 border-l-2 border-primary"
                      : "hover:bg-slate-50 border-l-2 border-transparent"
                  )}
                >
                  {/* Avatar placeholder */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {user.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-semibold truncate",
                        isSelected ? "text-primary" : "text-foreground"
                      )}
                    >
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{user.designation}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="shrink-0">
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-border" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 py-4 border-t border-border/60 bg-slate-50/60 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {selected
              ? `Selected: ${ALL_USERS.find((u) => u.id === selected)?.name}`
              : "No user selected"}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="h-8"
              disabled={!selected}
              onClick={handleSave}
            >
              Save Assignment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const [packagesOpen, setPackagesOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(true);

  const [assignedUsers, setAssignedUsers] = useState({
    primaryBilling: ALL_USERS[0],
    secondaryBilling: ALL_USERS[1],
    primaryTechnical: ALL_USERS[2],
    secondaryTechnical: ALL_USERS[3],
  });

  const [editDialog, setEditDialog] = useState({ open: false, role: null });

  function openEdit(role) {
    setEditDialog({ open: true, role });
  }

  function handleSaveUser(role, user) {
    setAssignedUsers((prev) => ({ ...prev, [role]: user }));
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm font-medium text-muted-foreground gap-2">
        <Link href="/contracts" className="hover:text-primary transition-colors">
          Contracts
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Service Details</span>
      </div>

      {/* Service header card */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
        <div className="absolute top-6 right-6">
          <Badge
            variant="outline"
            className="font-mono text-xs border-primary/20 bg-primary/5 text-primary px-3 py-1"
          >
            NDC-00075
          </Badge>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
            <Cloud className="w-7 h-7" /> {serviceId || "SID-00075"} Cloud
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Project Name</p>
              <p className="font-bold text-foreground">EPLOT Service Management System</p>
              <p className="text-sm text-slate-600 mt-1">
                Rajdhani Unnayan Kartipakkha (RAJUK), Ministry of Housing and Public Works
              </p>
            </div>
            <div className="flex gap-8 md:justify-end md:text-right">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Start Date</p>
                <p className="font-bold text-foreground">5/18/2023</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">End Date</p>
                <p className="font-bold text-foreground">12/31/2040</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Packages */}
      <Collapsible
        open={packagesOpen}
        onOpenChange={setPackagesOpen}
        className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <CollapsibleTrigger className="w-full p-5 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors border-b">
          <div className="text-left">
            <h2 className="text-lg font-bold text-foreground">Resource Packages</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage and view your assigned cloud resource packages
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Your Packages (189)
            </span>
            <ChevronRight
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${packagesOpen ? "rotate-90" : ""}`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-0 animate-in slide-in-from-top-2 fade-in-20 duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white bg-primary uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-5 py-4 w-[280px]">Package Info</th>
                  <th className="px-5 py-4">Feature</th>
                  <th className="px-5 py-4">Package Details</th>
                  <th className="px-5 py-4">Total Monthly Fee</th>
                  <th className="px-5 py-4">Requested</th>
                  <th className="px-5 py-4">Activated</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {PACKAGES.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg mt-0.5 shrink-0 ${pkg.type === "VPS" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"}`}
                        >
                          {pkg.type === "VPS" ? (
                            <Server className="w-4 h-4" />
                          ) : (
                            <Mail className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {pkg.type === "VPS" ? "Virtual Private Server (VPS)" : "Email Service"}
                          </p>
                          <p className="text-xs font-medium text-slate-500 mb-2">{pkg.name}</p>
                          <Badge
                            variant="outline"
                            className={`text-[10px] uppercase ${
                              pkg.status === "ACTIVATED"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : pkg.status === "DEACTIVATED"
                                  ? "bg-rose-50 text-rose-700 border-rose-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {pkg.status}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top pt-5">
                      {pkg.feature !== "N/A" ? (
                        <Badge
                          variant="secondary"
                          className="bg-primary/5 text-primary border-primary/20 font-medium whitespace-nowrap"
                        >
                          {pkg.feature}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground bg-slate-100 px-2 py-1 rounded">
                          N/A
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 align-top pt-5">
                      <Badge variant="outline" className="font-mono text-xs mb-2 bg-slate-50">
                        {pkg.detail}
                      </Badge>
                      {pkg.extras !== "N/A" && (
                        <p
                          className="text-xs text-muted-foreground mt-1 max-w-[180px] truncate"
                          title={pkg.extras}
                        >
                          {pkg.extras}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 align-top pt-5">
                      <span className="font-bold text-emerald-600 whitespace-nowrap">
                        BDT {pkg.fee}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top pt-5 text-xs text-slate-600">
                      {pkg.requested}
                    </td>
                    <td className="px-5 py-4 align-top pt-5 text-xs text-slate-600">
                      {pkg.activated}
                    </td>
                    <td className="px-5 py-4 align-top pt-5 text-center">
                      <Link href={`/resources/${pkg.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border flex items-center justify-between bg-slate-50 text-sm">
            <p className="text-muted-foreground">Showing 1 to 10 of 189 results</p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-8" disabled>
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <div className="hidden md:flex items-center gap-1 px-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                >
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <span className="px-2 text-muted-foreground">...</span>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  19
                </Button>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Service Users */}
      <Collapsible
        open={usersOpen}
        onOpenChange={setUsersOpen}
        className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-8"
      >
        <CollapsibleTrigger className="w-full p-5 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors border-b">
          <div className="text-left">
            <h2 className="text-lg font-bold text-foreground">Service Users</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage billing and technical contacts for this service — hover a card to reassign
            </p>
          </div>
          <ChevronRight
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${usersOpen ? "rotate-90" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-6 animate-in slide-in-from-top-2 fade-in-20 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.keys(assignedUsers).map((role) => (
              <UserCard
                key={role}
                role={role}
                user={assignedUsers[role]}
                onEdit={openEdit}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Assign User Dialog */}
      <AssignUserDialog
        open={editDialog.open}
        onOpenChange={(val) => setEditDialog((prev) => ({ ...prev, open: val }))}
        role={editDialog.role}
        currentUserId={editDialog.role ? assignedUsers[editDialog.role]?.id : null}
        onSave={handleSaveUser}
      />
    </div>
  );
}
