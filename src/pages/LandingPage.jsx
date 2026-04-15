import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  FileSignature,
  Stamp,
  Zap,
  Server,
  CheckSquare,
  Monitor,
  Settings,
  Twitter,
  Facebook,
  Linkedin,
  Globe,
  ChevronRight,
  Menu,
  X,
  Cpu,
  Network,
  HardDrive,
  Wifi,
  Database,
  ShieldCheck,
  ChevronDown,
  BookOpen,
  Cloud,
  Layers,
} from "lucide-react";
import { Link } from "wouter";

const BASE = import.meta.env.BASE_URL;

const NAV_LINKS = [
  {
    label: "Services",
    dropdown: true,
    items: [
      { label: "Request Based Service", icon: Layers, href: "#request-service" },
      { label: "Cloud Service", icon: Cloud, href: "#cloud-service" },
    ],
  },
  { label: "Cost Estimator", href: "#cost-estimator" },
  { label: "Forms & Agreements", href: "#forms" },
  {
    label: "User Manuals",
    dropdown: true,
    items: [
      { label: "User Registration Manual", icon: BookOpen, href: "#user-reg-manual" },
      { label: "Frame Agreement E-Sign Manual", icon: FileSignature, href: "#esign-manual" },
    ],
  },
  { label: "Support", href: "#support" },
];

const SERVICE_CARDS = [
  {
    icon: UserPlus,
    title: "Registration",
    description: "Registration Request for Data Center",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: FileSignature,
    title: "Customer e-Sign",
    description: "Electronic signature for customers",
    color: "bg-teal-50 text-teal-600",
    border: "border-teal-100",
  },
  {
    icon: Stamp,
    title: "BCC e-Sign",
    description: "Electronic signature for BCC",
    color: "bg-indigo-50 text-indigo-600",
    border: "border-indigo-100",
  },
  {
    icon: Zap,
    title: "Activation",
    description: "Activate the customer account",
    color: "bg-amber-50 text-amber-600",
    border: "border-amber-100",
  },
  {
    icon: Server,
    title: "Resource Request",
    description: "Request service resources and packages",
    color: "bg-purple-50 text-purple-600",
    border: "border-purple-100",
  },
  {
    icon: CheckSquare,
    title: "Resource Approve",
    description: "Approve the requested resources",
    color: "bg-green-50 text-green-600",
    border: "border-green-100",
  },
];

const FEATURES = [
  "99.98% uptime",
  "Power Outage Cover: 72 Hours",
  "N+1 fault tolerance",
  "1.6 hours of downtime/ annum",
  "Disaster Recovery Capacity",
  "10/40G Capacity",
  "Object Storage",
  "Security: 2 Level of Firewall, 2 Level of NSP",
  "Web Security, WAF, DDoS Protection",
  "Security: Malware Sandboxing, Netflow, Syslog, Anti DDoS",
  "ISO 27001/20000 Certification, TULI Compliance",
];

const RESOURCES = [
  "Computing: General, Memory Intensive, Accelerated",
  "Storage: Mixed, SSD, OBS",
  "Network security",
  "Backup",
  "Distributed Resources",
];

const SERVICES = [
  "Cloud Service",
  "VPS Service",
  "Email Service",
  "Managed Services",
  "Web Hosting Service",
  "Application Hosting Service",
];

const CUSTOMERS = [
  "Prime Minister's office",
  "NID Wing, EC",
  "NBR",
  "Bangladesh Planning Commission",
  "Bangladesh Air Force",
  "LGED",
  "Supreme Court of Bangladesh",
  "CPTU",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <img
              src={`${BASE}images/ndc-logo.jpg`}
              alt="NDC"
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" ref={navRef}>
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.label ? null : link.label)
                    }
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                      openDropdown === link.label
                        ? "text-blue-700 bg-blue-50"
                        : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-50">
                      <p className="px-4 pt-1 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {link.label}
                      </p>
                      {link.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-blue-500 shrink-0" />
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/register">
              <button className="px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all">
                Register
              </button>
            </Link>
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all shadow-sm">
                Sign In
              </button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {link.label}
                  </p>
                  {link.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                    >
                      <item.icon className="w-4 h-4 text-blue-500 shrink-0" />
                      {item.label}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}
            <div className="flex gap-2 pt-2">
              <Link href="/register" className="flex-1">
                <button className="w-full py-2 text-sm font-semibold text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50">
                  Register
                </button>
              </Link>
              <Link href="/login" className="flex-1">
                <button className="w-full py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-slate-50 to-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 leading-tight">
            Our Approach to Serving Customers
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto">
            Our vision is to become the leading data center in Asia, setting global IT service and
            security standards and enabling digital communities.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          id="services"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.2}
          className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {SERVICE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
              className={`flex flex-col items-center gap-3 p-5 rounded-xl border ${card.border} bg-white shadow-sm hover:shadow-md cursor-pointer transition-all group`}
            >
              <div className={`p-3 rounded-xl ${card.color} group-hover:scale-110 transition-transform`}>
                <card.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{card.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── About NDC ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex flex-col lg:flex-row gap-10 items-start"
          >
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-900">National Data Center</h2>
              <p className="mt-2 text-base font-medium text-slate-700">
                Proud to serve the country Toward Realization of Digital Bangladesh.
              </p>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                The National Data Center (NDC) is the certified Tier-3 standard data center
                established in 2009. NDC provides GOVERNMENT CLOUD SERVICES (Infrastructure as a
                Service (IaaS), Platform as a Service (PaaS) and Software as a Service (SaaS)).
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
                    Our History
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    In 1983, the National Computer Council was formed by the government of
                    Bangladesh. The name was changed to the Bangladesh Computer Council in 1990 by
                    the Bangladesh Computer Council Ordinance.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
                    Mission
                  </p>
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "As the National Data Center, we provide state-of-the-art IT services and
                    infrastructure to create better opportunities for Bangladesh through
                    digitalization."
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
                    Vision
                  </p>
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "Our vision is to become the leading data center in Asia, setting global IT
                    service and security standards and enabling digital communities."
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-72 flex flex-col gap-4 items-center">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md p-6 bg-gradient-to-br from-blue-50 to-indigo-50 w-full flex flex-col items-center gap-4">
                <img
                  src={`${BASE}images/ndc-logo.jpg`}
                  alt="NDC Logo"
                  className="h-20 w-auto object-contain"
                />
                <img
                  src={`${BASE}images/bcc-logo.png`}
                  alt="BCC Logo"
                  className="h-12 w-auto object-contain"
                />
                <img
                  src={`${BASE}images/gov-logo.png`}
                  alt="Government Logo"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="text-center mt-2">
                <p className="text-xs text-slate-500">
                  Tier-3 Certified Data Center — ISO 27001/20000 Compliant
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why NDC ── */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold text-blue-900">Why should you use NDC services</h2>
            <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
              Unlock unparalleled data security, reliability, and efficiency with National Data
              Center services — where your information is safeguarded and your operations
              streamlined for optimal performance.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex justify-center"
            >
              <div className="w-64 bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl border border-blue-200 shadow-inner p-5 flex flex-col gap-3">
                {/* Row 1 — Servers */}
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-blue-100 shadow-sm">
                  <Server className="w-6 h-6 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-700 leading-none">Rack Server</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">TIER-3 Certified</p>
                  </div>
                  <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                </div>
                {/* Row 2 — Network */}
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-teal-100 shadow-sm">
                  <Network className="w-6 h-6 text-teal-600 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-700 leading-none">Core Network</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Redundant Links</p>
                  </div>
                  <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                </div>
                {/* Row 3 — Storage */}
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-indigo-100 shadow-sm">
                  <HardDrive className="w-6 h-6 text-indigo-500 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-700 leading-none">Storage Array</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Petabyte Scale</p>
                  </div>
                  <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                </div>
                {/* Bottom mini-icons */}
                <div className="flex justify-around pt-1">
                  {[
                    { icon: Cpu, color: "text-blue-500", bg: "bg-blue-50" },
                    { icon: Database, color: "text-teal-500", bg: "bg-teal-50" },
                    { icon: Wifi, color: "text-indigo-500", bg: "bg-indigo-50" },
                    { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
                  ].map(({ icon: Icon, color, bg }, i) => (
                    <div key={i} className={`${bg} p-2 rounded-lg border border-white shadow-sm`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1 space-y-4"
            >
              {[
                {
                  icon: Server,
                  title: "Super Computer Facility",
                  desc: "Bangladesh's First TIER-3 Certified Data Center",
                  color: "text-blue-600 bg-blue-100",
                },
                {
                  icon: Network,
                  title: "High-Speed Network",
                  desc: "Redundant fiber links with enterprise-grade routing",
                  color: "text-teal-600 bg-teal-100",
                },
                {
                  icon: Cpu,
                  title: "24/7 Monitoring",
                  desc: "Round-the-clock oversight by BGD e-GOV CIRT Team",
                  color: "text-purple-600 bg-purple-100",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 * i + 0.2 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className={`p-2.5 rounded-lg ${item.color} shrink-0`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features / Resources / Services ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Our Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="rounded-2xl border border-blue-100 overflow-hidden shadow-sm"
            >
              <div className="bg-blue-700 px-5 py-4">
                <h3 className="text-base font-bold text-white">Our Features</h3>
              </div>
              <ul className="p-5 space-y-2">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-700">
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Resources */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.15}
              className="rounded-2xl border border-teal-100 overflow-hidden shadow-sm"
            >
              <div className="bg-teal-600 px-5 py-4">
                <h3 className="text-base font-bold text-white">Our Resources</h3>
              </div>
              <ul className="p-5 space-y-2">
                {RESOURCES.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-xs text-slate-700">
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Services */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.3}
              className="rounded-2xl border border-amber-100 overflow-hidden shadow-sm"
            >
              <div className="bg-amber-500 px-5 py-4">
                <h3 className="text-base font-bold text-white">Our Services</h3>
              </div>
              <ul className="p-5 space-y-2">
                {SERVICES.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-xs text-slate-700">
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Satisfied Customers ── */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-8"
          >
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              938+ Satisfied Customers
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.1}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {CUSTOMERS.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className="flex items-center justify-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center text-xs font-semibold text-slate-700 hover:border-blue-300 hover:shadow-md transition-all"
              >
                {name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-300 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <img
              src={`${BASE}images/ndc-logo.jpg`}
              alt="NDC"
              className="h-10 w-auto object-contain brightness-200 invert mb-3"
            />
            <p className="text-xs leading-relaxed text-slate-400">
              National Data Center, we provide state-of-the-art IT services and infrastructure to
              create better opportunities for Bangladesh through digitalization.
            </p>
            <p className="text-xs text-slate-500 mt-4">
              @2020-2030 NDC, BCC. All rights reserved.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-3">Follow us</p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Globe, label: "Website" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all text-slate-300 hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
