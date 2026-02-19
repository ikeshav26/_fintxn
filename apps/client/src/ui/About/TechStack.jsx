import React from 'react'
import { techStack,labelText,sectionTitle,cardBase } from '../../assets/asstes';

const TechStack = () => {
   
  return (
    <div>
        <section>
                  <div className="mb-12">
                    <span className={labelText}>Architecture Stack</span>
                    <h2 className={sectionTitle}>Technology Stack</h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {techStack.map((cat) => (
                      <div key={cat.name} className={cardBase}>
                        <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-100 pb-4">
                          <div className={`${cat.color} opacity-80`}>
                            <cat.icon size={24} />
                          </div>
                          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#003366]">{cat.name}</h3>
                        </div>
                        <div className="space-y-5">
                          {cat.techs.map((t) => (
                            <div key={t.name} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                              <span className="text-[11px] font-black uppercase text-[#003366] whitespace-nowrap">{t.name}</span>
                              <div className="hidden sm:block flex-1 border-b border-dotted border-slate-200 mx-4" />
                              <span className="text-[10px] text-slate-400 italic font-medium">{t.role}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
    </div>
  )
}

export default TechStack