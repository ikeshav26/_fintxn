import React from "react";
import { ArrowLeft, ShieldCheck, Clock } from "lucide-react";
import Btn from "./Btn.jsx";

const Step2 = ({
  handleStep2,
  formData,
  set,
  setStep,
  setFormData,
  maskEmail,
  countdown,
  fmt,
  loading,
  handleResend,
}) => {
  return (
    <div>
      <form onSubmit={handleStep2}>
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setFormData((p) => ({ ...p, otp: "" }));
          }}
          className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase hover:text-[#003366] mb-5 cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <h2 className="text-xl sm:text-2xl font-black font-serif text-[#003366] uppercase tracking-tight border-b-4 border-[#FFD700] inline-block mb-1">
          Verify Email
        </h2>
        <p className="text-[11px] text-slate-400 font-bold uppercase mb-6">
          Step 2 of 3 — Enter verification code
        </p>

        <div className="bg-[#003366] text-white p-4 mb-6 flex items-center gap-3">
          <ShieldCheck size={18} className="text-[#FFD700] shrink-0" />
          <p className="text-sm font-bold">
            Code sent to{" "}
            <span className="text-[#FFD700]">{maskEmail(formData.email)}</span>
          </p>
        </div>

        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block text-center">
          6-Digit Code
        </label>
        <input
          name="otp"
          type="text"
          maxLength={6}
          inputMode="numeric"
          placeholder="● ● ● ● ● ●"
          value={formData.otp}
          onChange={set}
          className="w-full bg-[#f8f8f8] border-2 border-[#cccccc] focus:border-[#003366] focus:outline-none p-4 text-3xl sm:text-4xl text-center font-black tracking-[0.5em] text-[#003366] placeholder:text-slate-200 mb-6 transition-all focus:shadow-[0_0_0_3px_rgba(0,51,102,0.08)]"
        />

        <Btn loading={loading}>
          Verify & Continue <ShieldCheck size={18} />
        </Btn>

        <div className="mt-6 flex flex-col items-center gap-2 text-[11px]">
          <div className="flex items-center gap-2 text-slate-400 font-bold">
            <Clock size={14} />
            {countdown > 0 ? (
              <>
                Expires in:{" "}
                <span
                  className={`font-black ${countdown < 30 ? "text-red-500" : "text-[#003366]"}`}
                >
                  {fmt(countdown)}
                </span>
              </>
            ) : (
              <span className="text-red-500 font-black">Code expired</span>
            )}
          </div>
          <button
            type="button"
            onClick={handleResend}
            disabled={loading || countdown > 150}
            className={`text-[10px] font-black uppercase tracking-widest cursor-pointer ${loading || countdown > 150 ? "text-slate-300 cursor-not-allowed" : "text-[#003366] hover:underline"}`}
          >
            Resend Code
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;
