import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Landmark,
  ArrowRight,
  ShieldCheck,
  Gift,
  Send,
  FileText,
  Users,
  LayoutDashboard,
  Info,
  ChevronRight,
} from 'lucide-react';
import appContext from '../context/appContext.js';


const Home = () => {
  const { user } = useContext(appContext);
  const navigate = useNavigate();

  const sectionHeading = "text-3xl sm:text-4xl font-black text-[#003366] font-serif uppercase tracking-tight border-b-4 border-[#FFD700] pb-2 mb-8 inline-block";
  const cardStyle = "bg-white border-2 border-[#cccccc] shadow-[4px_4px_0px_#cccccc] p-6 hover:border-[#003366] hover:shadow-[6px_6px_0px_#003366] transition-all duration-200 group";

  const features = [
    {
      icon: Send,
      title: "Secure Transfers",
      desc: "Transfer funds instantly between internal accounts using verified beneficiary IDs.",
      link: "/transfer"
    },
    {
      icon: FileText,
      title: "Detailed Statements",
      desc: "Generate and view immutable transaction history with precise ledger timestamps.",
      link: "/account-statement"
    },
    {
      icon: Users,
      title: "Payee Management",
      desc: "Maintain a verified list of beneficiaries for recurring and one-time payments.",
      link: "/benificiaries"
    },
    {
      icon: ShieldCheck,
      title: "Real-time Dashboard",
      desc: "Monitor balances, recent activity, and account health from a single secure portal.",
      link: "/dashboard"
    }
  ];



  return (
    <div className="bg-[#f4f4f4] min-h-screen font-sans text-slate-700">


      <section className="relative bg-[#002244] text-white overflow-hidden border-b-8 border-[#FFD700]">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FFD700] text-[#003366] px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-6">
              <Landmark size={14} />
              Est. 2024 • Full-Stack Demo
            </div>
            <h1 className="text-5xl lg:text-7xl font-black font-serif leading-none uppercase mb-6 tracking-tighter">
              Banking Made <span className="text-[#FFD700]">Reliable.</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 font-serif mb-10 leading-relaxed italic border-l-4 border-[#FFD700] pl-6">
              FinTxn National Trust & Savings provides a robust environment for learning the intricacies of ledger maintenance, transaction idempotency, and secure fund transfers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {!user ? (
                <>
                  <Link to="/register" className="bg-[#FFD700] text-[#003366] px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                    Open an Account <ArrowRight size={18} />
                  </Link>
                  <Link to="/login" className="border-2 border-white text-white px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-[#002244] transition-all flex items-center justify-center gap-2">
                    Sign In to Portal
                  </Link>
                </>
              ) : (
                <Link to="/dashboard" className="bg-[#FFD700] text-[#003366] px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                  Access Dashboard <LayoutDashboard size={18} />
                </Link>
              )}
            </div>
          </div>


          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
            {[
              { value: "256-bit", label: "Encryption" },
              { value: "₹10K", label: "Free Credits" },
              { value: "24/7", label: "Access" },
              { value: "REST", label: "API Powered" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-[#FFD700] text-2xl font-black font-serif tracking-tighter">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-[#FFD700] border-b-4 border-[#003366] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="bg-[#003366] p-3 text-white shrink-0 animate-pulse">
              <Gift size={28} />
            </div>
            <div>
              <h3 className="font-black font-serif text-[#003366] uppercase leading-none text-lg sm:text-xl">Educational Project — Not a Real Bank</h3>
              <p className="text-sm font-bold text-[#002244] mt-1.5 tracking-tight">
                Every new account is automatically credited with <span className="underline decoration-2 decoration-[#003366]">₹10,000.00</span> in free demo funds to test all features.
              </p>
            </div>
          </div>
          <div className="bg-[#003366] text-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 whitespace-nowrap shrink-0">
            <Info size={14} className="text-[#FFD700]" />
            No Real Currency
          </div>
        </div>
      </section>



      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={sectionHeading}>Banking Capabilities</h2>
          <p className="max-w-2xl mx-auto font-serif italic text-slate-500 mt-4">
            A comprehensive suite of tools designed to demonstrate high-integrity financial systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feat, i) => (
            <Link key={i} to={user ? feat.link : "/register"} className={cardStyle}>
              <div className="bg-[#f4f4f4] w-12 h-12 flex items-center justify-center border-2 border-[#cccccc] text-[#003366] mb-6 group-hover:bg-[#003366] group-hover:border-[#003366] transition-colors duration-200">
                <feat.icon size={24} className="group-hover:text-[#FFD700] transition-colors duration-200" />
              </div>
              <h4 className="font-black font-serif text-[#003366] uppercase mb-3 tracking-tight">{feat.title}</h4>
              <p className="text-sm leading-relaxed text-slate-600">{feat.desc}</p>
              <div className="mt-4 text-[10px] font-black uppercase tracking-widest text-[#003366] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                Explore <ChevronRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>



      <section className="bg-white border-y-2 border-[#cccccc] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={sectionHeading}>The Enrollment Process</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-2 border-[#003366]">
            {[
              { step: "01", title: "Registration", desc: "Create your secure credentials and get instant access to the National Trust portal." },
              { step: "02", title: "Auto-Provisioning", desc: "Your demo wallet is automatically credited with $10,000 in free funds — no cards needed." },
              { step: "03", title: "Start Transacting", desc: "Add beneficiaries, execute transfers, and view real-time ledger-validated statements." }
            ].map((item, i) => (
              <div key={i} className={`p-8 lg:p-10 ${i !== 2 ? 'border-b-2 lg:border-b-0 lg:border-r-2 border-[#003366]' : ''}`}>
                <span className="text-5xl font-black font-serif text-[#FFD700] block mb-4">{item.step}</span>
                <h4 className="font-black text-[#003366] uppercase tracking-widest mb-4 text-sm">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600 italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-[#003366] p-8 sm:p-12 shadow-[12px_12px_0px_#FFD700]">
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white uppercase mb-4 tracking-tighter">
            Ready to Explore the System?
          </h2>
          <p className="text-slate-300 font-serif italic mb-10 text-sm sm:text-base">
            No sign-up fees. No real money. Just a fully functional banking simulation at your fingertips.
          </p>
          <button
            onClick={() => navigate(user ? '/dashboard' : '/register')}
            className="inline-flex items-center gap-3 bg-[#FFD700] text-[#003366] px-8 sm:px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-colors cursor-pointer"
          >
            {user ? 'Return to Dashboard' : 'Create Free Demo Account'}
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;