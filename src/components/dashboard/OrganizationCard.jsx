import React from "react";
import { motion } from "framer-motion";
import { Building2, Briefcase, FileText, CheckCircle2 } from "lucide-react";
export function OrganizationCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="bg-white rounded-2xl border border-border/60 shadow-md overflow-hidden"
    >
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400" />
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
        <div className="shrink-0 w-24 h-24 rounded-2xl bg-white border border-border/50 shadow-sm flex items-center justify-center p-4">
          <img
            src={`${import.meta.env.BASE_URL}images/rajuk-logo.png`}
            alt="RAJUK Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=RAJUK&background=0D8ABC&color=fff&font-size=0.3`;
            }}
          />
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            Authority Profile
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Rajdhani Unnayan Kartipakkha (RAJUK)
          </h2>
          <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground font-medium">
            <Briefcase className="w-4 h-4" />
            <p>Ministry of Housing and Public Works</p>
          </div>
        </div>
        <div className="flex gap-4 self-stretch md:self-auto items-center mt-4 md:mt-0">
          <div className="flex-1 md:flex-none flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-100">
            <FileText className="w-5 h-5 text-primary mb-2" />
            <span className="text-xl font-bold text-slate-800">1</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
              Contracts
            </span>
          </div>
          <div className="flex-1 md:flex-none flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
            <span className="text-xl font-bold text-slate-800">2</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
              Services
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
