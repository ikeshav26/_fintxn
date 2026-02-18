import React from 'react'
import { Loader2 } from 'lucide-react';

const Btn = ({ onClick, type = 'submit', loading, children }) => (
  <button type={type} onClick={onClick} disabled={loading}
    className={`w-full bg-[#003366] text-white py-4 mt-2 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#002244] hover:shadow-[0_4px_16px_rgba(0,34,68,0.3)] cursor-pointer active:scale-[0.99]'}`}>
    {loading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : children}
  </button>
);

export default Btn