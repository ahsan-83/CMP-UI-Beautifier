import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export function StatCard({ title, value, icon, colorClass, iconBgClass, delay = 0, trend }) {
  return (
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
        duration: 0.4,
        delay,
        ease: "easeOut",
      }}
      whileHover={{
        y: -4,
        transition: {
          duration: 0.2,
        },
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 border border-border/50",
        "bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
      )}
    >
      <div
        className={cn(
          "absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40",
          colorClass.replace("text-", "bg-")
        )}
      />
      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-black text-foreground tracking-tight">{value}</h3>
            {trend && (
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-full",
                  trend.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
            )}
          </div>
        </div>
        <div
          className={cn(
            "p-4 rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110",
            iconBgClass,
            colorClass
          )}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
