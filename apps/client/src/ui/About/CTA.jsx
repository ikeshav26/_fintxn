import React from 'react'
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { primaryBtn } from "../../assets/asstes";

const CTA = () => {
  return (
    <div>
         <div className="text-center pb-20">
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-10">Simulation Environment Active</h3>
          <Link to="/register" 
                className={`${primaryBtn} inline-flex shadow-[8px_8px_0px_rgba(0,51,102,0.1)] active:translate-y-1 mx-auto px-12 py-6 text-sm`}>
            Initialize Platform Account <ChevronRight size={20} />
          </Link>
        </div>
    </div>
  )
}

export default CTA