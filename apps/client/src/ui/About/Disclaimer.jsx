import React from 'react'
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div>
      <div className="bg-amber-50 border-y-2 border-amber-200 p-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="bg-amber-100 p-3 border border-amber-300">
            <AlertTriangle className="text-amber-600" size={32} />
          </div>
          <p className="text-[11px] font-bold text-amber-900 uppercase tracking-tight leading-relaxed text-center sm:text-left">
            <span className="font-black underline block sm:inline mr-2">REGULATORY DISCLAIMER:</span>
            FinTxn is a simulation platform built strictly for educational and demonstration purposes. It is not a licensed financial institution. All accounts, transactions, balances, and fund movements are entirely simulated. No real currency, personal financial data, or regulated financial services are involved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer