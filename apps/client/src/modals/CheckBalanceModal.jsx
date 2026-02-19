import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, X, ShieldCheck, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(n);

const CheckBalanceModal = ({
  isOpen,
  onClose,
  accountId,
  mode = "account",
  accounts = [],
}) => {
  const [mpin, setMpin] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(
    accountId || ""
  );
  const [showMpin, setShowMpin] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMpin("");
      setBalance(null);
      setLoading(false);
      setError("");
      setVerified(false);
      setShowMpin(false);
      setSelectedAccountId(
        accountId || (accounts.length > 0 ? accounts[0]._id : "")
      );
    }
  }, [isOpen, accountId]);

  if (!isOpen) return null;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!mpin || mpin.length < 4) {
      setError("MPIN must be at least 4 digits");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (mode === "account") {
        const res = await axios.post(
          `/api/account/secure-balance/${accountId}`,
          { mpin },
          { withCredentials: true }
        );
        setBalance(res.data.balance);
      } else {
        const res = await axios.post(
          "/api/account/secure-net-balance",
          { accountId: selectedAccountId, mpin },
          { withCredentials: true }
        );
        setBalance(res.data.netBalance);
      }
      setVerified(true);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
      toast.error(err.response?.data?.message || "Invalid MPIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white border-2 border-[#cccccc] shadow-[8px_8px_0px_rgba(0,0,0,0.1)] w-full max-w-md mx-4">
        <div className="bg-[#003366] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFD700] text-[#003366]">
              <Lock size={16} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">
                {mode === "account" ? "Check Balance" : "Check Net Balance"}
              </h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                Enter MPIN to verify
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {!verified ? (
            <form onSubmit={handleVerify}>
              {mode === "net" && accounts.length > 1 && (
                <div className="mb-4">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                    Verify with Account
                  </label>
                  <select
                    value={selectedAccountId}
                    onChange={(e) => setSelectedAccountId(e.target.value)}
                    className="w-full border-2 border-[#cccccc] p-3 text-sm font-mono text-[#003366] font-bold focus:border-[#003366] outline-none"
                  >
                    {accounts.map((acc) => (
                      <option key={acc._id} value={acc._id}>
                        •••• {acc._id.slice(-8).toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Enter MPIN
                </label>
                <div className="relative">
                  <input
                    type={showMpin ? "text" : "password"}
                    value={mpin}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setMpin(val);
                      setError("");
                    }}
                    placeholder="Enter 4-6 digit MPIN"
                    className="w-full border-2 border-[#cccccc] p-3 text-center text-lg font-mono font-black tracking-[0.5em] focus:border-[#003366] outline-none"
                    maxLength={6}
                    inputMode="numeric"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowMpin(!showMpin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#003366] cursor-pointer"
                  >
                    {showMpin ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border-2 border-red-200 p-3">
                  <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || mpin.length < 4}
                className="w-full bg-[#003366] text-white py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#002244] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} />
                    Verify & Show Balance
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 border-2 border-emerald-200 mb-4">
                <ShieldCheck size={24} />
              </div>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3">
                MPIN Verified Successfully
              </p>
              <div className="bg-[#f8f8f8] border-2 border-[#cccccc] p-5">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {mode === "account" ? "Account Balance" : "Total Net Balance"}
                </p>
                <p className="text-3xl font-black font-serif text-[#003366]">
                  {fmt(balance)}
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-4 w-full border-2 border-[#cccccc] py-3 text-[10px] font-black uppercase tracking-widest text-[#003366] hover:border-[#003366] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckBalanceModal;
