import React from 'react'
import { useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import appContext from '../../context/appContext.js';

const CTA = () => {
    const {user,navigate}=useContext(appContext);
  return (
    <div>
        <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-[#003366] p-8 sm:p-12 shadow-[12px_12px_0px_#FFD700]">
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white uppercase mb-4 tracking-tighter">
            Ready to Explore the System?
          </h2>
          <p className="text-slate-300 font-serif italic mb-10 text-sm sm:text-base">
            No sign-up fees. No real money. Just a fully functional banking
            simulation at your fingertips.
          </p>
          <button
            onClick={() => navigate(user ? "/dashboard" : "/register")}
            className="inline-flex items-center gap-3 bg-[#FFD700] text-[#003366] px-8 sm:px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-colors cursor-pointer"
          >
            {user ? "Return to Dashboard" : "Create Free Demo Account"}
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  )
}

export default CTA