import React from 'react'
import { Landmark } from "lucide-react";
import { accentTag } from "../../assets/asstes";


const Hero = () => {
  return (
    <div>
      <section className="bg-[#003366] border-b-8 border-[#002244] text-white p-8 sm:p-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Landmark size={600} strokeWidth={1} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`${accentTag} inline-block mb-6`}>
            Financial Infrastructure Simulation
          </div>
          <h1 className="font-serif font-black uppercase tracking-tight text-5xl sm:text-8xl mb-6 leading-none">
            About FinTxn<span className="text-[#FFD700]">.</span>
          </h1>
          <div className="h-2 bg-[#FFD700] w-24 mb-10" />
          <p className="text-xl sm:text-3xl font-serif italic text-slate-300 max-w-4xl leading-snug">
            Exploring the Core of Financial Technology — One Transaction at a Time.
          </p>
          <p className="mt-8 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            FinTxn is a full-stack fintech simulation platform engineered to replicate real-world financial infrastructure — from multi-account lifecycle management and double-entry ledger systems to secure fund settlement workflows.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Hero