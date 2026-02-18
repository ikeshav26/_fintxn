import React from "react";
import { CheckCircle2 } from "lucide-react";
import Btn from "./Btn.jsx";

const Step3 = ({ formData, handleStep3, loading, setStep }) => {
  return (
    <div>
      <div className="text-center">
        <div className="inline-flex bg-emerald-50 border-2 border-emerald-200 p-4 mb-6">
          <CheckCircle2 size={36} className="text-emerald-500" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black font-serif text-[#003366] uppercase tracking-tight border-b-4 border-[#FFD700] inline-block mb-1">
          Confirm & Create
        </h2>
        <p className="text-[11px] text-slate-400 font-bold uppercase mb-6">
          Step 3 of 3 — Review & finalize
        </p>

        <div className="bg-[#f8f8f8] border-2 border-[#cccccc] p-5 mb-6 text-left">
          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-200">
            Account Summary
          </h4>
          <div className="space-y-3">
            {[
              ["Name", formData.username],
              ["Email", formData.email],
              ["Demo Credits", "₹10,000.00"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-baseline">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {k}
                </span>
                <span
                  className={`text-sm font-black ${k === "Demo Credits" ? "text-emerald-600" : "text-[#003366]"}`}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Btn type="button" onClick={handleStep3} loading={loading}>
          Create My Account <CheckCircle2 size={18} />
        </Btn>

        <button
          type="button"
          onClick={() => setStep(1)}
          className="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#003366] cursor-pointer transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default Step3;
