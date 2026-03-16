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
import { motion } from "framer-motion";
import { FileText, HeadphonesIcon, PlayCircle, Mailbox } from "lucide-react";
import { useDashboardStats } from "../hooks/use-dashboard";
import { OrganizationCard } from "../components/dashboard/OrganizationCard";
import { StatCard } from "../components/dashboard/StatCard";
import { ServicesTable } from "../components/dashboard/ServicesTable";
import { Skeleton } from "../components/ui/skeleton";
export default function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats();
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <h1 className="text-3xl font-bold text-foreground font-display">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back. Here is the latest from your organization.
          </p>
        </motion.div>
      </div>
      <OrganizationCard /> {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({
            length: 4,
          }).map((_, i) => <Skeleton key={i} className="h-[140px] rounded-2xl" />)
        ) : (
          <>
            <StatCard
              title="Total Contracts"
              value={_optionalChain([stats, "optionalAccess", (_2) => _2.contracts]) || 0}
              icon={<FileText className="w-8 h-8" />}
              colorClass="text-sky-600"
              iconBgClass="bg-sky-100"
              delay={0.1}
            />
            <StatCard
              title="Active Services"
              value={_optionalChain([stats, "optionalAccess", (_3) => _3.services]) || 0}
              icon={<HeadphonesIcon className="w-8 h-8" />}
              colorClass="text-emerald-600"
              iconBgClass="bg-emerald-100"
              delay={0.2}
            />
            <StatCard
              title="Active Resources"
              value={_optionalChain([stats, "optionalAccess", (_4) => _4.activeResources]) || 0}
              icon={<PlayCircle className="w-8 h-8" />}
              colorClass="text-purple-600"
              iconBgClass="bg-purple-100"
              delay={0.3}
              trend={{
                value: "12%",
                isPositive: true,
              }}
            />
            <StatCard
              title="New Requests"
              value={_optionalChain([stats, "optionalAccess", (_5) => _5.newRequests]) || 0}
              icon={<Mailbox className="w-8 h-8" />}
              colorClass="text-rose-600"
              iconBgClass="bg-rose-100"
              delay={0.4}
              trend={{
                value: "4%",
                isPositive: false,
              }}
            />
          </>
        )}
      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.5,
        }}
      >
        <ServicesTable />
      </motion.div>
    </div>
  );
}
