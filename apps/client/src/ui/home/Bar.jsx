import React from 'react'
import { Gift, Info } from "lucide-react";

const Bar = () => {
  return (
    <div>
        <section className="bg-[#FFD700] border-b-4 border-[#003366] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="bg-[#003366] p-3 text-white shrink-0 animate-pulse">
              <Gift size={28} />
            </div>
            <div>
              <h3 className="font-black font-serif text-[#003366] uppercase leading-none text-lg sm:text-xl">
                Educational Project — Not a Real Bank
              </h3>
              <p className="text-sm font-bold text-[#002244] mt-1.5 tracking-tight">
                Every new account is automatically credited with{" "}
                <span className="underline decoration-2 decoration-[#003366]">
                  ₹10,000.00
                </span>{" "}
                in free demo funds to test all features.
              </p>
            </div>
          </div>
          <div className="bg-[#003366] text-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 whitespace-nowrap shrink-0">
            <Info size={14} className="text-[#FFD700]" />
            No Real Currency
          </div>
        </div>
      </section>
    </div>
  )
}

export default Bar