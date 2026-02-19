import { sectionTitle, labelText, cardBase, capabilities } from "../../assets/asstes";

const Capabilities = () => {
    
  return (
    <div>
        <section>
          <div className="mb-12">
            <span className={labelText}>System Functionality</span>
            <h2 className={sectionTitle}>Platform Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((f, i) => (
              <div key={i} className={cardBase}>
                <div className="bg-[#f4f4f4] w-14 h-14 flex items-center justify-center border-2 border-[#cccccc] mb-8 group-hover:bg-[#003366] group-hover:text-white transition-colors">
                  <f.icon size={24} />
                </div>
                <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#003366] mb-4 leading-tight">{f.title}</h4>
                <div className="h-1 bg-[#FFD700] w-8 mb-4" />
                <p className="text-[11px] leading-relaxed text-slate-500 italic uppercase tracking-tight">{f.description}</p>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}

export default Capabilities