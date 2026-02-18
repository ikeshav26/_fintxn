import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import appContext from '../../context/appContext';

const FeatureCard = ({ feat }) => {
  const { user } = useContext(appContext);

  return (
    <Link
      to={user ? feat.link : "/register"}
      className="bg-white border-2 border-[#cccccc] shadow-[4px_4px_0px_#cccccc] p-6 hover:border-[#003366] hover:shadow-[6px_6px_0px_#003366] transition-all duration-200 group flex flex-col"
    >
      <div className="bg-[#f4f4f4] w-12 h-12 flex items-center justify-center border-2 border-[#cccccc] text-[#003366] mb-6 group-hover:bg-[#003366] group-hover:border-[#003366] transition-colors duration-200">
        <feat.icon size={24} className="group-hover:text-[#FFD700] transition-colors duration-200" />
      </div>
      <h4 className="font-black font-serif text-[#003366] uppercase mb-3 tracking-tight">{feat.title}</h4>
      <p className="text-sm leading-relaxed text-slate-600">{feat.desc}</p>
      <div className="mt-auto pt-4 text-[10px] font-black uppercase tracking-widest text-[#003366] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
        Explore <ChevronRight size={12} />
      </div>
    </Link>
  );
};

export default FeatureCard