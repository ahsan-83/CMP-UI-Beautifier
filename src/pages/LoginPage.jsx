import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Menu, X, CheckSquare, RefreshCw } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Cost Estimator", href: "#cost-estimator" },
  { label: "Forms & Agreements", href: "#forms" },
  { label: "User Manuals", href: "#manuals" },
  { label: "Support", href: "#support" },
];

export default function LoginPage() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      {/* ── Sticky Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <img
              src={`${BASE}images/ndc-logo.jpg`}
              alt="NDC"
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all">
              Register
            </button>
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

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button className="w-full px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all">
                Register
              </button>
              <Link href="/login">
                <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main
        className="flex-1 flex flex-col items-center justify-center px-4 py-12"
        style={{
          background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 40%, #f0f9ff 70%, #e0f2fe 100%)",
        }}
      >
        {/* NDC Logo */}
        <div className="mb-6 flex flex-col items-center gap-1">
          <img
            src={`${BASE}images/ndc-logo.jpg`}
            alt="National Data Center Bangladesh"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6 tracking-tight">
          Log in to your account
        </h1>

        {/* Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="px-8 pt-8 pb-6 space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email/UserName
              </label>
              <input
                id="email"
                type="text"
                placeholder="Email/UserName"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder:text-slate-400"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full px-3 py-2.5 pr-10 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition"
              >
                Forgot your password?
              </a>
            </div>

            {/* reCAPTCHA simulation */}
            <div className="border border-slate-300 rounded-lg px-4 py-3 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCaptchaChecked((v) => !v)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    captchaChecked
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-slate-400 hover:border-blue-400"
                  }`}
                >
                  {captchaChecked && (
                    <svg viewBox="0 0 12 10" className="w-3 h-3 fill-white">
                      <polyline points="1,5 4.5,8.5 11,1" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="text-sm font-medium text-slate-700">I'm not a robot</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-10 h-10 relative">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <circle cx="32" cy="32" r="30" fill="#4285F4" />
                    <circle cx="32" cy="32" r="22" fill="white" />
                    <path d="M20 32 A12 12 0 0 1 44 32" fill="none" stroke="#34A853" strokeWidth="4" strokeLinecap="round" />
                    <path d="M44 32 A12 12 0 0 1 20 32" fill="none" stroke="#EA4335" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="32" cy="20" r="3" fill="#FBBC05" />
                    <circle cx="32" cy="44" r="3" fill="#4285F4" />
                  </svg>
                </div>
                <span className="text-[8px] font-bold text-slate-500 tracking-wide leading-tight text-center">
                  reCAPTCHA
                </span>
                <span className="text-[7px] text-slate-400 leading-tight">Privacy · Terms</span>
              </div>
            </div>

            {/* Log In button */}
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-8 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Log In
              </button>
            </div>
          </form>

          {/* Card footer */}
          <div className="bg-slate-800 px-8 py-3.5 text-center">
            <p className="text-sm text-slate-300">
              Don&apos;t have an account?{" "}
              <a href="#" className="font-bold text-white hover:underline transition">
                Create one now
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
