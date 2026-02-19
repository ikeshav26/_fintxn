import {
  ShieldCheck,
  Send,
  FileText,
  Users,
  Shield,
  Clock,
  Zap,
  CreditCard,
  ArrowRightLeft,
  TrendingUp, KeyRound, Snowflake,
  Monitor, Server, Wrench, Mail
} from "lucide-react";


export const features = [
  {
    icon: Send,
    title: "Secure Transfers",
    desc: "Transfer funds instantly between internal accounts using verified beneficiary IDs.",
    link: "/transfer",
  },
  {
    icon: FileText,
    title: "Detailed Statements",
    desc: "Generate and view immutable transaction history with precise ledger timestamps.",
    link: "/account-statement",
  },
  {
    icon: Users,
    title: "Payee Management",
    desc: "Maintain a verified list of beneficiaries for recurring and one-time payments.",
    link: "/benificiaries",
  },
  {
    icon: ShieldCheck,
    title: "Real-time Dashboard",
    desc: "Monitor balances, recent activity, and account health from a single secure portal.",
    link: "/dashboard",
  },
];

export const sectionHeading =
  "text-3xl sm:text-4xl font-black text-[#003366] font-serif uppercase tracking-tight border-b-4 border-[#FFD700] pb-2 mb-8 inline-block";

export const publicRoutes = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "/about" },
  { label: "HELP DESK", path: "/help-desk" },
];

export const loggedOutRoutes = [
  { label: "LOGIN", path: "/login" },
  { label: "ENROLL NOW", path: "/register" },
];

export const accountDropdownRoutes = [
  { label: "ACCOUNT DETAILS", path: "/account-details" },
  { label: "ACCOUNT STATEMENT", path: "/account-statement" },
  { label: "BENEFICIARIES", path: "/benificiaries" },
];

export const loggedInTopRoutes = [
  { label: "DASHBOARD", path: "/dashboard" },
  { label: "PAYMENTS & TRANSFERS", path: "/transfer" },
];

export const steps = [
  { num: 1, label: "Identity Details" },
  { num: 2, label: "Email Verification" },
  { num: 3, label: "Final Confirmation" },
];

export const securityFeatures = [
  {
    icon: Shield,
    title: "256-Bit SSL Encryption",
    desc: "Military-grade data transit protection.",
  },
  {
    icon: ShieldCheck,
    title: "Two-Factor Authentication",
    desc: "Multi-layered verification for every login.",
  },
  {
    icon: Zap,
    title: "Fraud Monitoring",
    desc: "Real-time activity analysis and threat detection.",
  },
  {
    icon: Clock,
    title: "Session Auto-Timeout",
    desc: "Automatic logout after 15 minutes of inactivity.",
  },
];

export const FEATURES = [
  {
    icon: CreditCard,
    title: "Instant Account",
    desc: "Get your demo account ready in under a minute",
  },
  {
    icon: ArrowRightLeft,
    title: "Fund Transfers",
    desc: "Send money between accounts seamlessly",
  },
  {
    icon: Users,
    title: "Beneficiaries",
    desc: "Manage and track your saved payees",
  },
  {
    icon: TrendingUp,
    title: "Live Ledger",
    desc: "Real-time transaction history & statements",
  },
];

export const sectionTitle = "font-serif font-black uppercase tracking-tight text-[#003366] text-3xl sm:text-4xl border-b-4 border-[#FFD700] pb-2 inline-block mb-10";
export const labelText = "text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 block";
export const cardBase = "bg-white border-2 border-[#cccccc] shadow-[8px_8px_0px_rgba(0,0,0,0.06)] p-8 transition-all hover:border-[#003366] group";
export const primaryBtn = "bg-[#003366] text-white px-6 py-4 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#002244] transition-colors";
export const accentTag = "bg-[#FFD700] text-[#003366] px-3 py-1 text-[10px] font-black uppercase tracking-widest";

export const architectureDesign=[
                { path: "apps/client", desc: "React SPA — Vite-powered presentation layer handling all user interactions and financial dashboards." },
                { path: "apps/server", desc: "Express REST API — core service layer handling authentication, account operations, transaction processing, and ledger management." },
                { path: "packages/", desc: "Shared infrastructure — ESLint configurations, TypeScript configs, and reusable UI utility libraries across the workspace." }
              ]

export const capabilities=[
              { title: "Multi-Account Provisioning", description: "Open and manage multiple financial accounts with isolated MPIN credentials per account", icon: CreditCard },
              { title: "Authenticated Balance Inquiry", description: "MPIN-gated balance disclosure with secure verification modal to prevent unauthorized exposure", icon: ShieldCheck },
              { title: "Fund Settlement & Transfers", description: "Process inter-account fund transfers with real-time ledger reconciliation and balance validation", icon: ArrowRightLeft },
              { title: "Beneficiary Orchestration", description: "Register, validate, and manage trusted counter-party beneficiaries for recurring transactions", icon: Users },
              { title: "Double-Entry Ledger System", description: "Immutable transaction audit trail with debit-credit journaling and account statement generation", icon: FileText },
              { title: "OTP-Based Identity Recovery", description: "Time-bound one-time password verification via email for secure credential recovery workflows", icon: KeyRound },
              { title: "Account Lifecycle Management", description: "Full account state management — active operations, regulatory freeze, and account closure flows", icon: Snowflake }
            ]              

export const techStack=[
                      {
                        name: "Client Layer",
                        icon: Monitor,
                        color: "text-blue-600",
                        techs: [
                          { name: "React 19", role: "Component-driven UI with concurrent rendering" },
                          { name: "Vite 7", role: "Next-gen build toolchain & HMR dev server" },
                          { name: "Tailwind CSS 4", role: "Utility-first design system" },
                          { name: "React Router 7", role: "Declarative client-side routing" },
                          { name: "Axios", role: "HTTP client for API layer communication" },
                          { name: "Lucide React", role: "Consistent iconography system" },
                          { name: "React Hot Toast", role: "Real-time notification layer" }
                        ]
                      },
                      {
                        name: "API & Services Layer",
                        icon: Server,
                        color: "text-emerald-600",
                        techs: [
                          { name: "Node.js", role: "Event-driven JavaScript runtime environment" },
                          { name: "Express 5", role: "RESTful API framework for service endpoints" },
                          { name: "Mongoose 9", role: "MongoDB ODM for financial data modeling" },
                          { name: "JWT", role: "Stateless token-based authentication security" },
                          { name: "Bcrypt", role: "Cryptographic hashing for credential security" },
                          { name: "Cookie Parser", role: "Secure HTTP-only session management" }
                        ]
                      },
                      {
                        name: "DevOps & Tooling",
                        icon: Wrench,
                        color: "text-amber-600",
                        techs: [
                          { name: "Turborepo", role: "High-performance monorepo orchestration" },
                          { name: "pnpm", role: "Deterministic, disk-efficient package management" },
                          { name: "ESLint", role: "Static analysis & code quality enforcement" },
                          { name: "Prettier", role: "Consistent code formatting standards" },
                          { name: "Nodemon", role: "Live-reload development server" }
                        ]
                      },
                      {
                        name: "External Infrastructure",
                        icon: Mail,
                        color: "text-purple-600",
                        techs: [
                          { name: "Resend", role: "Transactional email delivery for OTP workflows" },
                          { name: "MongoDB Atlas", role: "Cloud-native NoSQL data persistence" }
                        ]
                      }
                    ]            