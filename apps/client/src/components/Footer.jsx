import React from 'react';
import { 
  Landmark, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Lock,
  Home
} from 'lucide-react';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f4f4f4] border-t-4 border-[#003366] font-serif text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#003366] p-1.5 border-2 border-[#FFD700]">
                <Landmark size={20} className="text-[#FFD700]" />
              </div>
              <span className="text-xl font-black text-[#003366] italic uppercase tracking-tighter">
                FinTxn
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              FinTxn National Trust & Savings Association is a member of the Federal Reserve System and a wholly owned subsidiary of FinTxn Financial Corp. 
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="border border-slate-400 px-2 py-1 text-[10px] font-bold text-slate-500 uppercase">
                Member FDIC
              </div>
              <div className="flex items-center gap-1 border border-slate-400 px-2 py-1 text-[10px] font-bold text-slate-500 uppercase">
                <Home size={10} />
                Equal Housing Lender
              </div>
            </div>
          </div>


          <div>
            <h3 className="text-[#003366] text-xs font-black tracking-widest uppercase border-b border-[#cccccc] pb-2 mb-4">
              Banking Services
            </h3>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-tight">
              <li><a href="#" className="hover:text-blue-800 hover:underline">Checking Accounts</a></li>
              <li><a href="#" className="hover:text-blue-800 hover:underline">Savings & CDs</a></li>
              <li><a href="#" className="hover:text-blue-800 hover:underline">Mortgage Center</a></li>
              <li><a href="#" className="hover:text-blue-800 hover:underline">Credit Cards</a></li>
              <li><a href="#" className="hover:text-blue-800 hover:underline">Wealth Management</a></li>
            </ul>
          </div>


          <div>
            <h3 className="text-[#003366] text-xs font-black tracking-widest uppercase border-b border-[#cccccc] pb-2 mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-tight">
              <li><a href="#" className="hover:text-blue-800 hover:underline">About FinTxn</a></li>
              <li><a href="#" className="hover:text-blue-800 hover:underline">Security Center</a></li>
              <li><a href="#" className="hover:text-blue-800 hover:underline">Privacy & Cookies</a></li>
              <li><a href="#" className="hover:text-blue-800 hover:underline">Terms of Use</a></li>
              <li><a href="#" className="hover:text-blue-800 hover:underline">Sitemap</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#003366] text-xs font-black tracking-widest uppercase border-b border-[#cccccc] pb-2 mb-4">
              Headquarters
            </h3>
            <div className="space-y-4 text-xs italic text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#003366] shrink-0" />
                <span>One FinTxn Plaza<br />Financial District, NY 10004</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#003366] shrink-0" />
                <span>1-800-FINTXN-00</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#003366] shrink-0" />
                <span>support@fintxn-national.com</span>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="bg-[#002244] text-slate-300 py-4 sm:py-6 px-4 sm:px-8 border-t border-[#001122]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#FFD700]" />
              <span>Verisign Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={14} className="text-[#FFD700]" />
              <span>SSL Encryption</span>
            </div>
          </div>
          
          <div className="text-[10px] text-center lg:text-right leading-relaxed opacity-70">
            Investment and insurance products are not FDIC insured, are not a bank deposit, are not guaranteed by the bank or any federal government agency, and may lose value.
            <br />
            © {currentYear} FinTxn National Trust & Savings Association. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;