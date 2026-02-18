import React from 'react'

const Feature = ({ feat, i}) => {
  return (
    <div>
        <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.04] border border-white/[0.06] group hover:bg-white/[0.08] transition-colors">
                <div className="bg-[#003366] p-2 text-[#FFD700]">
                  <feat.icon size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white">{feat.title}</h4>
                  <p className="text-[11px] text-slate-500">{feat.desc}</p>
                </div>
              </div>
    </div>
  )
}

export default Feature