import React from 'react'
import { FolderTree } from "lucide-react";
import { sectionTitle, labelText, architectureDesign } from "../../assets/asstes";

const Architecture = () => {
     
  return (
    <div>
        <section>
          <div className="mb-12">
            <span className={labelText}>File System Map</span>
            <h2 className={sectionTitle}>System Architecture</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border-4 border-[#003366] bg-white">
            <div className="lg:col-span-2 bg-[#002244] p-10 text-white font-mono text-xs overflow-x-auto">
              <div className="flex items-center gap-2 mb-8 text-[#FFD700]">
                <FolderTree size={20} />
                <span className="uppercase tracking-widest font-black">Monorepo Structure</span>
              </div>
              <div className="space-y-3 opacity-90">
                <div className="flex gap-2">
                  <span className="text-slate-500">├──</span>
                  <span className="text-[#FFD700]">apps/</span>
                </div>
                <div className="flex gap-2 pl-6">
                  <span className="text-slate-500">├──</span>
                  <span className="text-white">client/</span>
                  <span className="text-slate-500 italic text-[10px]"># React SPA</span>
                </div>
                <div className="flex gap-2 pl-6">
                  <span className="text-slate-500">└──</span>
                  <span className="text-white">server/</span>
                  <span className="text-slate-500 italic text-[10px]"># Express API</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500">├──</span>
                  <span className="text-[#FFD700]">packages/</span>
                  <span className="text-slate-500 italic text-[10px]"># Shared Configs</span>
                </div>
                <div className="flex gap-2 pl-6">
                  <span className="text-slate-500">├──</span>
                  <span className="text-white">eslint-config/</span>
                </div>
                <div className="flex gap-2 pl-6">
                  <span className="text-slate-500">└──</span>
                  <span className="text-white">typescript-config/</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500">└──</span>
                  <span className="text-slate-400 italic">turbo.json</span>
                </div>
              </div>
              <div className="mt-12 pt-6 border-t border-white/10 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                Managed by Turborepo + pnpm
              </div>
            </div>

            <div className="lg:col-span-3 divide-y-2 divide-slate-100">
              {architectureDesign.map((item, i) => (
                <div key={i} className="p-10 flex flex-col sm:flex-row gap-6 hover:bg-slate-50 transition-colors">
                  <div className="bg-[#003366] text-[#FFD700] px-3 py-1 h-fit text-[10px] font-black uppercase whitespace-nowrap tracking-tighter">
                    {item.path}
                  </div>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed italic uppercase tracking-tight">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
    </div>
  )
}

export default Architecture