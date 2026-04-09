import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Check, Menu, X, Info, ChevronDown, BadgeCheck, Home, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "../components/ui/dialog";

const BASE = import.meta.env.BASE_URL;

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Cost Estimator", href: "#cost-estimator" },
  { label: "Forms & Agreements", href: "#forms" },
  { label: "User Manuals", href: "#manuals" },
  { label: "Support", href: "#support" },
];

const STEPS = [
  { id: 1, label: "Project &\nOwner Info" },
  { id: 2, label: "Technical\nInfo" },
  { id: 3, label: "Billing\nInfo" },
  { id: 4, label: "Agreement &\nTimeline" },
];

const MINISTRIES = [
  "Ministry of Housing and Public Works",
  "Ministry of Finance",
  "Ministry of Information & Communication Technology",
  "Ministry of Education",
  "Ministry of Health and Family Welfare",
  "Ministry of Agriculture",
  "Ministry of Commerce",
  "Ministry of Public Administration",
  "Ministry of Defence",
  "Office of the Prime Minister",
  "Ministry of Local Government",
  "Ministry of Law, Justice and Parliamentary Affairs",
];

const ORGANIZATIONS = [
  "RAJUK – Rajdhani Unnayan Kartipakkha",
  "BCC – Bangladesh Computer Council",
  "BTRC – Bangladesh Telecommunication Regulatory Commission",
  "NBR – National Board of Revenue",
  "Bangladesh Bank",
  "Sonali Bank Ltd.",
  "Bangladesh Railway",
  "LGED – Local Government Engineering Department",
  "WASA – Water and Sewerage Authority",
  "DESCO – Dhaka Electric Supply Company",
  "DPDC – Dhaka Power Distribution Company",
  "NID Wing, Election Commission",
];

/* ── Shared UI helpers ── */

function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder:text-slate-400"
    />
  );
}

function SelectInput({ placeholder, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2.5 pr-9 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition appearance-none text-slate-700"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}

function PhoneInput({ value, onChange, placeholder = "Phone number" }) {
  return (
    <div className="flex">
      <span className="flex items-center px-3 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg select-none">
        +880
      </span>
      <input
        type="tel"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 px-3 py-2.5 text-sm border border-slate-300 rounded-r-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder:text-slate-400"
      />
    </div>
  );
}

function InfoBanner({ children }) {
  return (
    <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-5">
      <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
      <p className="text-sm text-blue-700 leading-relaxed">{children}</p>
    </div>
  );
}

function ContactFormGroup({ prefix, data, onChange, title, showUseExisting = false }) {
  function field(name) {
    return {
      value: data[prefix + name] || "",
      onChange: (e) => onChange(prefix + name, e.target.value),
    };
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        {showUseExisting && (
          <button type="button" className="text-sm font-semibold text-blue-600 hover:underline">
            Use Existing User
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <Label required>First Name</Label>
          <Input placeholder="First name" {...field("FirstName")} />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input placeholder="Last name" {...field("LastName")} />
        </div>
        <div>
          <Label required>Designation</Label>
          <Input placeholder="Designation" {...field("Designation")} />
        </div>
        <div>
          <Label required>Email</Label>
          <Input type="email" placeholder="Email" {...field("Email")} />
        </div>
        <div>
          <Label>Phone (Official)</Label>
          <PhoneInput placeholder="Phone" {...field("Phone")} />
        </div>
        <div>
          <Label required>Mobile</Label>
          <PhoneInput placeholder="Mobile" {...field("Mobile")} />
        </div>
      </div>
    </div>
  );
}

/* ── Stepper ── */

function StepBar({ current }) {
  return (
    <div className="flex items-center w-full mb-0">
      {STEPS.map((step, idx) => {
        const done = step.id <= current;
        const isLast = idx === STEPS.length - 1;
        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  done ? "bg-emerald-500" : "bg-slate-200"
                }`}
              >
                {done ? (
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                ) : (
                  <span className="text-xs font-bold text-slate-400">{step.id}</span>
                )}
              </div>
              <span
                className={`text-sm font-semibold leading-snug whitespace-pre-line ${
                  done ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`flex-1 h-px mx-4 ${done && current > step.id ? "bg-emerald-400" : "bg-slate-200"}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Step 1: Project & Owner Info ── */

function Step1({ data, onChange }) {
  function f(name) {
    return { value: data[name] || "", onChange: (e) => onChange(name, e.target.value) };
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ── Left column: Project Info + Organization Manager ── */}
      <div className="flex flex-col gap-6">

        {/* Project Info */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-bold text-slate-800 mb-3">Project Info</h3>
          <InfoBanner>
            Provide Project Info with Ministry, Organization, Service Name and Web URL.
          </InfoBanner>
          <div className="space-y-4">
            <div>
              <Label required>Ministry / Division name</Label>
              <SelectInput
                placeholder="Select Ministry / Division"
                options={MINISTRIES}
                value={data.ministryDivision || ""}
                onChange={(e) => onChange("ministryDivision", e.target.value)}
              />
            </div>
            <div>
              <Label required>Organization Name</Label>
              <SelectInput
                placeholder="Select Organization"
                options={ORGANIZATIONS}
                value={data.organizationName || ""}
                onChange={(e) => onChange("organizationName", e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Label>Project Name</Label>
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-blue-400 cursor-help mb-1" />
                  <div className="absolute bottom-5 left-0 w-48 bg-slate-800 text-white text-xs rounded-lg px-2 py-1.5 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                    The name of your project within the organization
                  </div>
                </div>
              </div>
              <Input placeholder="Project Name" {...f("projectName")} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Label required>Service Name</Label>
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-blue-400 cursor-help mb-1" />
                  <div className="absolute bottom-5 left-0 w-48 bg-slate-800 text-white text-xs rounded-lg px-2 py-1.5 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                    The name of the cloud service you are registering for
                  </div>
                </div>
              </div>
              <Input placeholder="Service Name" {...f("serviceName")} />
            </div>
            <div>
              <Label required>Organization Website</Label>
              <Input placeholder="Organization web URL" type="url" {...f("orgWebsite")} />
            </div>
          </div>
        </div>

        {/* Organization Manager */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-800">Organization Manager</h3>
            <button
              type="button"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors whitespace-nowrap"
            >
              Use Existing Manager
            </button>
          </div>

          <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-5">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-700 leading-relaxed">
              The Organization Manager is entrusted with the responsibility of monitoring, managing,
              and allocating system users across various services within the same organization. You
              have the option to select from the existing managers within your organization or create
              a new manager account. Please note that in the event of unavailability of any manager
              account, you may provide relevant technical user information for completion of this
              section.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label required>First Name</Label>
              <Input placeholder="First name" {...f("mgrFirstName")} />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input placeholder="Last name" {...f("mgrLastName")} />
            </div>
            <div>
              <Label required>Designation</Label>
              <Input placeholder="Designation" {...f("mgrDesignation")} />
            </div>
            <div>
              <Label required>Email</Label>
              <Input type="email" placeholder="Email" {...f("mgrEmail")} />
            </div>
            <div>
              <Label>Phone (Official)</Label>
              <PhoneInput
                placeholder="(at least phone/mobile is required)"
                value={data.mgrPhone || ""}
                onChange={(e) => onChange("mgrPhone", e.target.value)}
              />
            </div>
            <div>
              <Label>Mobile number</Label>
              <PhoneInput
                placeholder="(at least phone/mobile is required)"
                value={data.mgrMobile || ""}
                onChange={(e) => onChange("mgrMobile", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right column: Project/Service Owner ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 self-start">
        <h3 className="text-base font-bold text-slate-800 mb-3">Project / Service Owner</h3>
        <InfoBanner>
          Provide Project / Service Owner Information with Name, Designation, Email and Phone Number.
        </InfoBanner>
        <div className="space-y-4">
          <div>
            <Label required>First Name</Label>
            <Input placeholder="Service owner first name" {...f("ownerFirstName")} />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input placeholder="Service owner last name" {...f("ownerLastName")} />
          </div>
          <div>
            <Label required>Designation</Label>
            <Input placeholder="Owner designation" {...f("ownerDesignation")} />
          </div>
          <div>
            <Label required>Email address</Label>
            <Input placeholder="Email address" type="email" {...f("ownerEmail")} />
          </div>
          <div>
            <Label required>Phone (Official)</Label>
            <PhoneInput
              placeholder="Phone number"
              value={data.ownerPhone || ""}
              onChange={(e) => onChange("ownerPhone", e.target.value)}
            />
          </div>
          <div>
            <Label>Mobile number</Label>
            <PhoneInput
              placeholder="Phone number"
              value={data.ownerMobile || ""}
              onChange={(e) => onChange("ownerMobile", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Technical Contact Info ── */

function Step2({ data, onChange }) {
  const [showSecondary, setShowSecondary] = useState(true);

  function handleChange(key, val) {
    onChange(key, val);
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContactFormGroup
          prefix="tech1"
          data={data}
          onChange={handleChange}
          title="Primary Technical Contact Information"
          showUseExisting
        />
        {showSecondary ? (
          <ContactFormGroup
            prefix="tech2"
            data={data}
            onChange={handleChange}
            title="Secondary Technical Contact Information"
            showUseExisting
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-8 gap-3">
            <p className="text-sm text-center">Secondary contact removed</p>
            <button
              type="button"
              onClick={() => setShowSecondary(true)}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              + Add Secondary Contact
            </button>
          </div>
        )}
      </div>
      {showSecondary && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowSecondary(false)}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition"
          >
            Remove Secondary Contact Information
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Step 3: Billing Contact Info ── */

function Step3({ data, onChange }) {
  const [showSecondary, setShowSecondary] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContactFormGroup
          prefix="bill1"
          data={data}
          onChange={onChange}
          title="Primary Billing Contact Information"
        />
        {showSecondary ? (
          <ContactFormGroup
            prefix="bill2"
            data={data}
            onChange={onChange}
            title="Secondary Billing Contact Information"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-8 gap-3">
            <p className="text-sm text-center">Secondary billing contact removed</p>
            <button
              type="button"
              onClick={() => setShowSecondary(true)}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              + Add Secondary Contact
            </button>
          </div>
        )}
      </div>
      {showSecondary && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowSecondary(false)}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition"
          >
            Remove Secondary Contact Information
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Step 4: Agreement & Timeline ── */

function Step4({ data, onChange }) {
  const [generated, setGenerated] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-blue-700 mb-1">Almost Done!</h2>
        <p className="text-sm text-slate-500">Review your contract duration and generate the agreement document.</p>
      </div>

      {/* Contract Duration */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
        <h3 className="text-base font-bold text-slate-800 mb-4">Choose Contract Duration</h3>
        <div className="flex items-center gap-6">
          {["unlimited", "limited"].map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => onChange("contractDuration", opt)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  data.contractDuration === opt
                    ? "border-blue-600 bg-blue-600"
                    : "border-slate-300 group-hover:border-blue-400"
                }`}
              >
                {data.contractDuration === opt && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-sm font-medium text-slate-700 capitalize">{opt}</span>
            </label>
          ))}
        </div>

        {data.contractDuration === "limited" && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <Label required>Start Date</Label>
              <Input type="date" value={data.startDate || ""} onChange={(e) => onChange("startDate", e.target.value)} />
            </div>
            <div>
              <Label required>End Date</Label>
              <Input type="date" value={data.endDate || ""} onChange={(e) => onChange("endDate", e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Generate Agreement */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-blue-800 leading-relaxed">
          We will generate your Contract Agreement Document with provided information.{" "}
          <br className="hidden sm:block" />
          Please Click{" "}
          <span className="font-bold text-blue-700">Generate Agreement</span> before proceeding.
        </p>
        <button
          type="button"
          onClick={() => setGenerated(true)}
          className={`shrink-0 px-5 py-2.5 text-sm font-semibold rounded-lg transition shadow-sm ${
            generated
              ? "bg-emerald-600 text-white cursor-default"
              : "bg-blue-700 hover:bg-blue-800 text-white"
          }`}
        >
          {generated ? (
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Generated
            </span>
          ) : (
            "Generate Agreement"
          )}
        </button>
      </div>

      {generated && (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-700 flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          Agreement document generated successfully. You may now submit your registration.
        </div>
      )}
    </div>
  );
}

/* ── Registration Success Dialog ── */

function RegistrationSuccessDialog({ open, onGoHome }) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Gradient header strip */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500" />

        <div className="px-8 py-10 flex flex-col items-center text-center gap-5">
          {/* Animated icon */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
              <BadgeCheck className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />
            </div>
            {/* Sparkle dots */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white" />
            <span className="absolute bottom-0 -left-1 w-3 h-3 rounded-full bg-teal-400 border-2 border-white" />
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-extrabold text-emerald-600 tracking-tight">
              Successfully Requested !!!
            </h2>
          </div>

          {/* Body text */}
          <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
            Your registration request is successful. Your status is now{" "}
            <span className="font-bold text-amber-600 inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> PENDING
            </span>{" "}
            for Primary Approval from administrator.
          </p>

          {/* Info box */}
          <div className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-xs text-blue-700 text-left flex items-start gap-2">
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />
            <span>
              You will receive an email notification once your account has been reviewed and
              approved by the administrator.
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={onGoHome}
            className="mt-1 flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-all"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Main Registration Page ── */

export default function RegistrationPage() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState({});
  const [step4Data, setStep4Data] = useState({ contractDuration: "unlimited" });

  function updateStep1(key, val) { setStep1Data((p) => ({ ...p, [key]: val })); }
  function updateStep2(key, val) { setStep2Data((p) => ({ ...p, [key]: val })); }
  function updateStep3(key, val) { setStep3Data((p) => ({ ...p, [key]: val })); }
  function updateStep4(key, val) { setStep4Data((p) => ({ ...p, [key]: val })); }

  function handleNext() { setCurrentStep((s) => Math.min(s + 1, 4)); }
  function handleBack() { setCurrentStep((s) => Math.max(s - 1, 1)); }
  function handleSubmit() {
    const allFormData = {
      step1_ProjectAndOwnerInfo: step1Data,
      step2_TechnicalInfo: step2Data,
      step3_BillingInfo: step3Data,
      step4_AgreementAndTimeline: step4Data,
    };
    console.log("=== Registration Form Submission ===");
    console.log(JSON.stringify(allFormData, null, 2));
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowSuccess(true);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      {/* ── Navbar ── */}
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
            <Link href="/register">
              <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all shadow-sm">
                Register
              </button>
            </Link>
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all">
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
              <Link href="/register">
                <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all">
                  Register
                </button>
              </Link>
              <Link href="/login">
                <button className="w-full px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main
        className="flex-1 px-4 py-10"
        style={{
          background:
            "linear-gradient(135deg, #dbeafe 0%, #eff6ff 40%, #f0f9ff 70%, #e0f2fe 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Top heading — only on step 1 */}
          {currentStep === 1 && (
            <div className="text-center mb-6">
              <h1 className="text-2xl font-extrabold text-slate-800 mb-1">Sign up for an account</h1>
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                  Log in now
                </Link>
              </p>
            </div>
          )}

          {/* Stepper container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
              <StepBar current={currentStep} />
            </div>

            {/* Step content */}
            <div className="p-6">
              {currentStep === 1 && <Step1 data={step1Data} onChange={updateStep1} />}
              {currentStep === 2 && <Step2 data={step2Data} onChange={updateStep2} />}
              {currentStep === 3 && <Step3 data={step3Data} onChange={updateStep3} />}
              {currentStep === 4 && <Step4 data={step4Data} onChange={updateStep4} />}
            </div>

            {/* Navigation footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Back
              </button>
              <div className="flex items-center gap-2">
                {/* Step indicator dots */}
                {STEPS.map((s) => (
                  <div
                    key={s.id}
                    className={`w-2 h-2 rounded-full transition-all ${
                      s.id === currentStep ? "bg-blue-600 w-4" : s.id < currentStep ? "bg-emerald-400" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition shadow-sm"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition shadow-sm disabled:opacity-80 disabled:cursor-not-allowed flex items-center gap-2.5 min-w-[110px] justify-center"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <RegistrationSuccessDialog
        open={showSuccess}
        onGoHome={() => {
          setShowSuccess(false);
          navigate("/");
        }}
      />
    </div>
  );
}
