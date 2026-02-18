import {
  ShieldCheck,
  Send,
  FileText,
  Users,
  Shield, 
  Clock,
  Zap
} from 'lucide-react';

export const features = [
    {
      icon: Send,
      title: "Secure Transfers",
      desc: "Transfer funds instantly between internal accounts using verified beneficiary IDs.",
      link: "/transfer"
    },
    {
      icon: FileText,
      title: "Detailed Statements",
      desc: "Generate and view immutable transaction history with precise ledger timestamps.",
      link: "/account-statement"
    },
    {
      icon: Users,
      title: "Payee Management",
      desc: "Maintain a verified list of beneficiaries for recurring and one-time payments.",
      link: "/benificiaries"
    },
    {
      icon: ShieldCheck,
      title: "Real-time Dashboard",
      desc: "Monitor balances, recent activity, and account health from a single secure portal.",
      link: "/dashboard"
    }
  ];

export const sectionHeading =
    "text-3xl sm:text-4xl font-black text-[#003366] font-serif uppercase tracking-tight border-b-4 border-[#FFD700] pb-2 mb-8 inline-block";


export const publicRoutes = [
    { label: "HOME", path: "/" },
    { label: "ABOUT US", path: "/about" },
    { label: "HELP DESK", path: "/help-desk" }
  ];

export  const loggedOutRoutes = [
    { label: "LOGIN", path: "/login" },
    { label: "ENROLL NOW", path: "/register" }
  ];

export  const accountDropdownRoutes = [
    { label: "ACCOUNT DETAILS", path: "/account-details" },
    { label: "ACCOUNT STATEMENT", path: "/account-statement" },
    { label: "BENEFICIARIES", path: "/benificiaries" },
  ];

 export const loggedInTopRoutes = [
    { label: "DASHBOARD", path: "/dashboard" },
    { label: "PAYMENTS & TRANSFERS", path: "/transfer" }
  ];

export  const steps = [
    { num: 1, label: 'Identity Details' },
    { num: 2, label: 'Email Verification' },
    { num: 3, label: 'Final Confirmation' },
  ];

export const securityFeatures = [
    { icon: Shield, title: "256-Bit SSL Encryption", desc: "Military-grade data transit protection." },
    { icon: ShieldCheck, title: "Two-Factor Authentication", desc: "Multi-layered verification for every login." },
    { icon: Zap, title: "Fraud Monitoring", desc: "Real-time activity analysis and threat detection." },
    { icon: Clock, title: "Session Auto-Timeout", desc: "Automatic logout after 15 minutes of inactivity." }
  ];
