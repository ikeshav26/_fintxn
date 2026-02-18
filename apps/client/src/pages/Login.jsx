import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Landmark, Lock, Home } from "lucide-react";
import appContext from "../context/appContext";
import Form from "../ui/login/Form";
import Feature from "../ui/login/Feature";
import { securityFeatures } from "../assets/asstes.js";

const Login = () => {
  const navigate = useNavigate();
  const { setuser } = useContext(appContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("Please enter your credentials");
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      toast.success("Welcome back to FinTxn");
      localStorage.setItem("fintxn_demo_user", JSON.stringify(res.data.user));
      setuser(res.data.user);
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Authentication failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f4f4f4] font-sans selection:bg-[#FFD700] selection:text-[#003366]">
      <div className="hidden lg:flex lg:w-[42%] bg-[#002244] text-white p-16 flex-col justify-between relative overflow-hidden border-r-8 border-[#FFD700]">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1.5px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div>
          <div className="flex items-center gap-4 group">
            <div className="bg-[#003366] p-2.5 border-2 border-[#FFD700] transition-transform duration-500">
              <Landmark size={32} className="text-[#FFD700]" />
            </div>
            <div>
              <span className="text-3xl font-black italic uppercase tracking-tighter block leading-none">
                FinTxn
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
                National Trust & Savings
              </span>
            </div>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#FFD700] transition-colors"
          >
            <Home size={12} /> Return to Public Portal
          </Link>

          <div className="mt-20">
            <h1 className="text-5xl font-black font-serif uppercase tracking-tight leading-none mb-2">
              Welcome <br /> Back<span className="text-[#FFD700]">.</span>
            </h1>
            <div className="h-1.5 w-24 bg-[#FFD700] mb-6" />
            <p className="text-slate-400 font-serif italic max-w-sm text-lg">
              Authorized personnel only. Accessing your secure financial records
              requires multi-factor authentication.
            </p>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-4 mb-10">
            {securityFeatures.map((feat, i) => (
              <Feature feat={feat} i={i} key={i} />
            ))}
          </div>

          <div className="flex items-center gap-3 pt-8 border-t border-white/[0.06] opacity-40">
            <Lock size={14} className="text-[#FFD700]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em]">
              256-Bit Encryption • Secure Login Access
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-5 sm:p-8 lg:p-12">
        <div className="lg:hidden w-full max-w-md flex items-center justify-between mb-10 border-b-2 border-slate-200 pb-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[#003366] p-1.5 border-2 border-[#FFD700]">
              <Landmark size={18} className="text-[#FFD700]" />
            </div>
            <span className="text-xl font-black italic uppercase text-[#003366] tracking-tighter">
              FinTxn
            </span>
          </Link>
          <Link
            to="/"
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#003366]"
          >
            <Home size={16} />
          </Link>
        </div>

        <Form
          handleLogin={handleLogin}
          formData={formData}
          handleChange={handleChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loading={loading}
        />
        <div className="mt-8 text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-60">
          Member FDIC • Equal Housing Lender • Protected by FinTxn Secure™
        </div>
      </div>
    </div>
  );
};

export default Login;
