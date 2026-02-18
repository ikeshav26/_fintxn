import React from 'react'
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ label, name, type = 'text', placeholder, value, onChange, toggle, onToggle, icon: Icon, ...rest }) => (
  <div className="mb-5">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block">{label}</label>
    <div className="relative">
      {Icon && <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />}
      <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange}
        className={`w-full py-3 border-2 border-[#cccccc] focus:border-[#003366] focus:outline-none text-sm font-bold text-[#003366] bg-white placeholder:text-slate-300 placeholder:font-normal transition-all focus:shadow-[0_0_0_3px_rgba(0,51,102,0.08)] ${Icon ? 'pl-10 pr-4' : 'px-4'} ${toggle !== undefined ? 'pr-11' : ''}`} {...rest} />
      {toggle !== undefined && (
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#003366] transition-colors cursor-pointer">
          {toggle ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

export default Input