import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, Shield } from "lucide-react";
import Input from "../register/Input";
import Btn from "../register/Btn";

const Form = ({
  handleLogin,
  formData,
  handleChange,
  showPassword,
  setShowPassword,
  loading,
}) => {
  return (
    <div>
      <div className="w-full max-w-md bg-white border-2 border-[#cccccc] shadow-[8px_8px_0px_rgba(0,0,0,0.06)] p-7 sm:p-10 relative">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
          <Shield size={80} />
        </div>

        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-black font-serif text-[#003366] uppercase tracking-tight border-b-4 border-[#FFD700] inline-block mb-1">
            Secure Sign In
          </h2>
          <p className="text-[11px] text-slate-400 font-bold uppercase block">
            Access your account portal
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <Input
            label="Electronic Mail"
            name="email"
            type="email"
            placeholder="e.g. j.doe@nationaltrust.com"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            autoFocus
          />

          <div className="relative">
            <Input
              label="Security Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              icon={Lock}
              toggle={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
            <div className="flex justify-end -mt-2 mb-6">
              <Link
                to="/forgot-password"
                className="text-[10px] font-black uppercase tracking-widest text-[#003366] hover:underline decoration-[#FFD700] transition-all"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <Btn loading={loading}>
            Sign In <LogIn size={18} />
          </Btn>
        </form>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="w-full flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-slate-100" />
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-[1px] bg-slate-100" />
          </div>

          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
            New to FinTxn?
            <Link
              to="/register"
              className="ml-2 text-[#003366] font-black underline decoration-[#FFD700] decoration-2 underline-offset-4 hover:text-[#002244] transition-colors"
            >
              Enroll Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
