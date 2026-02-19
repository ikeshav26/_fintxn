import React from 'react'
import { labelText, sectionTitle } from "../../assets/asstes";

const Vision = () => {

  return (
    <div>
        <section>
                  <div className="mb-12">
                    <span className={labelText}>The Philosophy</span>
                    <h2 className={sectionTitle}>Why FinTxn Exists</h2>
                  </div>
                  <div className="bg-white border-2 border-[#cccccc] shadow-[12px_12px_0px_rgba(0,0,0,0.06)] p-0 flex flex-col lg:flex-row">
                    <div className="bg-[#FFD700] lg:w-2 shrink-0" />
                    <div className="p-10 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                      {[
                        "To deeply understand how financial institutions process transactions, maintain ledger integrity, and ensure settlement accuracy through double-entry bookkeeping systems",
                        "To explore core fintech concepts — account lifecycle management, fund reconciliation, multi-party beneficiary networks, and secure credential verification (MPIN/OTP)",
                        "To architect a production-grade system that mirrors real payment infrastructure — covering account provisioning, KYC-adjacent flows, and transaction audit trails",
                        "To validate the scalability and security requirements of concurrent financial operations within a modern full-stack environment"
                      ].map((point, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-[#003366] font-black font-serif text-3xl">0{i+1}</span>
                          <p className="text-sm font-bold uppercase tracking-tight text-slate-600 leading-relaxed border-l-2 border-slate-100 pl-4">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
    </div>
  )
}

export default Vision