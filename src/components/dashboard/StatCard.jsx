import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";














export function StatCard({ title, value, icon, colorClass, iconBgClass, delay = 0, trend }) {
  return (
    React.createElement(motion.div, {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay, ease: "easeOut" },
      whileHover: { y: -4, transition: { duration: 0.2 } },
      className: cn(
        "relative overflow-hidden rounded-2xl p-6 border border-border/50",
        "bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
      )}

      /* Decorative gradient blur in background */
      , React.createElement('div', { className: cn("absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40", colorClass.replace('text-', 'bg-'))} )

      , React.createElement('div', { className: "relative z-10 flex items-start justify-between"    }
        , React.createElement('div', { className: "space-y-4"}
          , React.createElement('p', { className: "text-sm font-medium text-muted-foreground"  }, title)
          , React.createElement('div', { className: "flex items-baseline gap-3"  }
            , React.createElement('h3', { className: "text-3xl font-black text-foreground tracking-tight"   }, value)
            , trend && (
              React.createElement('span', { className: cn(
                "text-xs font-semibold px-2 py-1 rounded-full",
                trend.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}
                , trend.isPositive ? "↑" : "↓", " " , trend.value
              )
            )
          )
        )

        , React.createElement('div', { className: cn("p-4 rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110", iconBgClass, colorClass)}
          , icon
        )
      )
    )
  );
}
