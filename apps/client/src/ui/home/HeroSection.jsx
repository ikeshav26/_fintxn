import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LayoutDashboard, Landmark } from "lucide-react";
import { useContext } from "react";
import appContext from "../../context/appContext";

const HeroSection = () => {
  const { user } = useContext(appContext);
  return (
    <div>
      <section className="relative bg-[#002244] text-white overflow-hidden border-b-8 border-[#FFD700]">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FFD700] text-[#003366] px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-6">
              <Landmark size={14} />
              Est. 2024 • Full-Stack Demo
            </div>
            <h1 className="text-5xl lg:text-7xl font-black font-serif leading-none uppercase mb-6 tracking-tighter">
              Banking Made <span className="text-[#FFD700]">Reliable.</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 font-serif mb-10 leading-relaxed italic border-l-4 border-[#FFD700] pl-6">
              FinTxn National Trust & Savings provides a robust environment for
              learning the intricacies of ledger maintenance, transaction
              idempotency, and secure fund transfers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="bg-[#FFD700] text-[#003366] px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
                  >
                    Open an Account <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-[#002244] transition-all flex items-center justify-center gap-2"
                  >
                    Sign In to Portal
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="bg-[#FFD700] text-[#003366] px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
                >
                  Access Dashboard <LayoutDashboard size={18} />
                </Link>
              )}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
            {[
              { value: "256-bit", label: "Encryption" },
              { value: "₹10K", label: "Free Credits" },
              { value: "24/7", label: "Access" },
              { value: "REST", label: "API Powered" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-[#FFD700] text-2xl font-black font-serif tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
