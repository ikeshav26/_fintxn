import React from 'react'
import { sectionHeading } from '../../assets/asstes.js';

const EnrollmentProcess = () => {
  return (
    <div>
        <section className="bg-white border-y-2 border-[#cccccc] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={sectionHeading}>The Enrollment Process</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-2 border-[#003366]">
            {[
              { step: "01", title: "Registration", desc: "Create your secure credentials and get instant access to the National Trust portal." },
              { step: "02", title: "Auto-Provisioning", desc: "Your demo wallet is automatically credited with $10,000 in free funds — no cards needed." },
              { step: "03", title: "Start Transacting", desc: "Add beneficiaries, execute transfers, and view real-time ledger-validated statements." }
            ].map((item, i) => (
              <div key={i} className={`p-8 lg:p-10 ${i !== 2 ? 'border-b-2 lg:border-b-0 lg:border-r-2 border-[#003366]' : ''}`}>
                <span className="text-5xl font-black font-serif text-[#FFD700] block mb-4">{item.step}</span>
                <h4 className="font-black text-[#003366] uppercase tracking-widest mb-4 text-sm">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600 italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default EnrollmentProcess