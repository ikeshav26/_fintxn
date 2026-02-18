import React from "react";
import Input from "./Input.jsx";
import {
  ChevronRight,
  Gift,
  Users,
  CreditCard,
  Lock,
  Fingerprint,
} from "lucide-react";
import Btn from "./Btn.jsx";
import { Link } from "react-router-dom";

const Step1 = ({
  handleStep1,
  formData,
  set,
  showPw,
  showCpw,
  setShowPw,
  setShowCpw,
  loading,
}) => {
  return (
    <div>
      <form onSubmit={handleStep1}>
        <h2 className="text-xl sm:text-2xl font-black font-serif text-[#003366] uppercase tracking-tight border-b-4 border-[#FFD700] inline-block mb-1">
          Enrollment Form
        </h2>
        <p className="text-[11px] text-slate-400 font-bold uppercase mb-7">
          Step 1 of 3 — Enter your details
        </p>

        <Input
          label="Full Name"
          name="username"
          placeholder="John Doe"
          value={formData.username}
          onChange={set}
          icon={Users}
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={set}
          icon={CreditCard}
        />
        <Input
          label="Password"
          name="password"
          type={showPw ? "text" : "password"}
          placeholder="Min. 6 characters"
          value={formData.password}
          onChange={set}
          toggle={showPw}
          onToggle={() => setShowPw(!showPw)}
          icon={Lock}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type={showCpw ? "text" : "password"}
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={set}
          toggle={showCpw}
          onToggle={() => setShowCpw(!showCpw)}
          icon={Fingerprint}
        />

        <Btn loading={loading}>
          Send Verification Code <ChevronRight size={18} />
        </Btn>

        <div className="mt-6 flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-3">
          <Gift size={14} className="text-amber-600 shrink-0" />
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tight">
            ₹10,000 free demo credits on signup
          </span>
        </div>

        <p className="mt-5 text-center text-[11px] text-slate-400">
          Already enrolled?{" "}
          <Link
            to="/login"
            className="text-[#003366] font-black underline decoration-[#FFD700] decoration-2"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Step1;
