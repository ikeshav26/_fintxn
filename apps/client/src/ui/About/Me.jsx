import React from 'react'
import { Code, Globe, Github, Linkedin } from "lucide-react";
import { labelText } from "../../assets/asstes";

const Me = () => {
      return (
    <div>
         <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <span className={labelText}>Lead Engineer</span>
            <h2 className="font-serif font-black uppercase tracking-tight text-[#003366] text-5xl mb-8">Keshav</h2>
            <p className="text-lg leading-relaxed text-slate-600 mb-10 font-medium">
              A passionate software engineer exploring the intersection of technology and finance. Driven by curiosity around how digital payment systems, core banking infrastructure, transaction settlement pipelines, and financial compliance workflows are architected at scale. Currently deep-diving into fintech engineering by building production-grade systems from the ground up.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'GitHub', icon: Github, url: 'https://github.com/ikeshav26' },
                { label: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/keshavgilhotra' },
                { label: 'Portfolio', icon: Globe, url: 'https://ikeshav.in' }
              ].map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" 
                   className="bg-white border-2 border-[#003366] text-[#003366] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-[#003366] hover:text-white transition-all">
                  <link.icon size={14} /> {link.label}
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="bg-[#003366] p-10 border-l-[16px] border-[#FFD700] shadow-[12px_12px_0px_#cccccc]">
              <div className="text-[#FFD700] mb-4">
                <Code size={40} />
              </div>
              <h3 className="text-white font-serif italic text-2xl leading-snug">
                "FinTxn serves as a bridge between theoretical knowledge and the high-stakes implementation of financial software engineering."
              </h3>
            </div>
          </div>
        </div>s
    </div>
  )
}

export default Me