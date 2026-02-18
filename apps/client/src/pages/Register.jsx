import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Landmark, Gift, CheckCircle2, Home, Lock } from "lucide-react";
import { useContext } from "react";
import appContext from "../context/appContext";
import Step1 from "../ui/register/Step1.jsx";
import Step2 from "../ui/register/Step2.jsx";
import Step3 from "../ui/register/Step3.jsx";
import { steps } from "../assets/asstes.js";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(180);
  const { setuser } = useContext(appContext);

  useEffect(() => {
    if (step !== 2 || countdown <= 0) return;
    const t = setInterval(() => setCountdown((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [step, countdown]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const maskEmail = (e) => {
    if (!e) return "";
    const [n, d] = e.split("@");
    return `${n[0]}${"*".repeat(Math.min(n.length - 1, 4))}@${d}`;
  };

  const set = (e) => {
    const { name, value } = e.target;
    if (name === "otp" && !/^\d*$/.test(value)) return;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const api = async (fn) => {
    setLoading(true);
    try {
      await fn();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleStep1 = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password || !confirmPassword)
      return toast.error("All fields are required");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    api(async () => {
      await axios.post("/api/otp/register/send-otp", { email });
      toast.success("Verification code sent!");
      setCountdown(180);
      setStep(2);
    });
  };

  const handleStep2 = (e) => {
    e.preventDefault();
    if (formData.otp.length !== 6) return toast.error("Enter the 6-digit code");
    api(async () => {
      await axios.post("/api/otp/register/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      toast.success("Email verified!");
      setStep(3);
    });
  };

  const handleResend = () =>
    api(async () => {
      await axios.post("/api/otp/register/send-otp", { email: formData.email });
      toast.success("New code sent");
      setCountdown(180);
      setFormData((p) => ({ ...p, otp: "" }));
    });

  const handleStep3 = () =>
    api(async () => {
      await axios.post("/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Account created!");
      localStorage.setItem(
        "fintxn_demo_user",
        JSON.stringify({ username: formData.username, email: formData.email }),
      );
      setuser({ username: formData.username, email: formData.email });
      navigate("/");
    });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f4f4f4]">
      <div className="hidden lg:flex lg:w-[42%] bg-[#002244] text-white flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-14">
          <div>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-[#003366] p-2.5 border-2 border-[#FFD700] group-hover:shadow-[0_0_16px_rgba(255,215,0,0.2)] transition-shadow">
                <Landmark size={24} className="text-[#FFD700]" />
              </div>
              <div>
                <span className="text-2xl font-black italic uppercase tracking-tighter block leading-none">
                  FinTxn
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-slate-500">
                  National Trust & Savings
                </span>
              </div>
            </Link>
            <Link
              to="/"
              className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#FFD700] transition-colors"
            >
              <Home size={12} /> Back to Home
            </Link>
          </div>

          <div className="my-10">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FFD700] mb-5 block">
              What You'll Get
            </span>
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white/[0.04] border border-white/[0.08] p-4 hover:bg-white/[0.07] transition-colors group"
                >
                  <Icon
                    size={20}
                    className="text-[#FFD700] mb-2.5 group-hover:scale-110 transition-transform"
                  />
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-white mb-1">
                    {title}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-r from-[#003366] to-[#003366]/60 p-5 border-l-4 border-[#FFD700] mb-8">
              <div className="flex items-center gap-2 text-[#FFD700] mb-1.5">
                <Gift size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  New Account Bonus
                </span>
              </div>
              <p className="text-sm text-slate-300">
                Start with{" "}
                <span className="text-white font-black text-base">
                  ₹10,000.00
                </span>{" "}
                in free demo credits.
              </p>
            </div>

            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 mb-4 block">
              Registration Progress
            </span>
            <div className="flex items-center gap-0">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex items-center gap-2.5 flex-1">
                    <div
                      className={`w-9 h-9 flex items-center justify-center font-black text-sm border-2 shrink-0 transition-all ${
                        step > s.num
                          ? "bg-[#FFD700] text-[#003366] border-[#FFD700]"
                          : step === s.num
                            ? "bg-[#FFD700] text-[#003366] border-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.3)]"
                            : "text-slate-600 border-slate-600"
                      }`}
                    >
                      {step > s.num ? <CheckCircle2 size={16} /> : s.num}
                    </div>
                    <span
                      className={`text-[9px] font-black tracking-widest hidden xl:block ${step === s.num ? "text-white" : step > s.num ? "text-[#FFD700]" : "text-slate-500"}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      className={`h-0.5 w-6 mx-1 shrink-0 ${step > s.num ? "bg-[#FFD700]" : "bg-slate-700"}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/[0.06]">
              <Lock size={11} className="text-slate-600" />
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600">
                256-Bit Encryption • Secure Registration
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-5 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-[#003366] p-1.5 border-2 border-[#FFD700]">
                <Landmark size={16} className="text-[#FFD700]" />
              </div>
              <span className="text-lg font-black italic uppercase text-[#003366] tracking-tighter">
                FinTxn
              </span>
            </Link>
            <Link
              to="/"
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#003366] flex items-center gap-1"
            >
              <Home size={12} /> Home
            </Link>
          </div>

          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center text-xs font-black border-2 ${step > s.num ? "bg-[#FFD700] text-[#003366] border-[#FFD700]" : step === s.num ? "bg-[#003366] text-white border-[#003366]" : "text-slate-400 border-slate-300"}`}
                >
                  {step > s.num ? <CheckCircle2 size={14} /> : s.num}
                </div>
                {i < 2 && (
                  <div
                    className={`w-8 h-0.5 ${step > s.num ? "bg-[#FFD700]" : "bg-slate-300"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white border-2 border-[#cccccc] shadow-[8px_8px_0px_rgba(0,0,0,0.06)] p-7 sm:p-10">
            {step === 1 && (
              <Step1
                formData={formData}
                set={set}
                showPw={showPw}
                setShowPw={setShowPw}
                showCpw={showCpw}
                setShowCpw={setShowCpw}
                handleStep1={handleStep1}
                loading={loading}
              />
            )}
            {step === 2 && (
              <Step2
                handleStep2={handleStep2}
                formData={formData}
                set={set}
                setStep={setStep}
                setFormData={setFormData}
                maskEmail={maskEmail}
                countdown={countdown}
                fmt={fmt}
                loading={loading}
                handleResend={handleResend}
              />
            )}
            {step === 3 && (
              <Step3
                formData={formData}
                handleStep3={handleStep3}
                loading={loading}
                setStep={setStep}
              />
            )}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-slate-300 lg:hidden">
            <Lock size={10} />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em]">
              256-Bit Encryption • Secure Registration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
