import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import appContext from "../context/appContext.js";
import {
  Wallet,
  CreditCard,
  Users,
  ArrowRightLeft,
  FileText,
  Plus,
  Gift,
  RefreshCw,
  ExternalLink,
  Landmark,
  Eye,
} from "lucide-react";
import CheckBalanceModal from "../modals/CheckBalanceModal.jsx";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(n);

const STATUS = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  FROZEN: "bg-blue-50 text-blue-700 border-blue-200",
  CLOSED: "bg-red-50 text-red-700 border-red-200",
};

const Skeleton = ({ className = "" }) => (
  <div className={`bg-slate-200 animate-pulse ${className}`} />
);

const Dashboard = () => {
  const { user } = useContext(appContext);
  const [accounts, setAccounts] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balanceModal, setBalanceModal] = useState({
    open: false,
    accountId: null,
    mode: "account",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [accRes, benRes] = await Promise.all([
        axios.get("/api/account/my-accounts", { withCredentials: true }),
        axios.get("/api/benificary/get", { withCredentials: true }),
      ]);

      const accs = accRes.data.accounts || [];
      setAccounts(accs);
      setBeneficiaries(benRes.data.benificaries || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ACTIONS = [
    { icon: Plus, label: "New Account", to: "/account-details", desc: "Open account" },
    { icon: ArrowRightLeft, label: "Transfer", to: "/transfer", desc: "Send money" },
    { icon: Users, label: "Beneficiaries", to: "/benificiaries", desc: "Manage payees" },
    { icon: FileText, label: "Statements", to: "/account-statement", desc: "View history" },
  ];

  return (
    <div className="bg-[#f4f4f4] min-h-screen">
      <div className="max-w-7xl mx-auto p-5 sm:p-8">

        <div className="bg-white border-2 border-[#cccccc] shadow-[8px_8px_0px_rgba(0,0,0,0.06)] p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black font-serif text-[#003366] uppercase tracking-tight">
                Welcome back, {user?.username || "User"}
              </h1>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={fetchData}
                disabled={loading}
                className="p-2.5 border-2 border-[#cccccc] hover:border-[#003366] text-slate-400 hover:text-[#003366] transition-colors cursor-pointer"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
          <div className="h-1 bg-[#FFD700] w-16 mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {ACTIONS.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="bg-white border-2 border-[#cccccc] p-5 hover:border-[#003366] transition-all group flex flex-col items-center text-center"
            >
              <div className="p-3 bg-[#003366] text-[#FFD700] mb-3 group-hover:scale-110 transition-transform">
                <a.icon size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#003366]">
                {a.label}
              </span>
              <span className="text-[9px] text-slate-400 font-bold mt-0.5">
                {a.desc}
              </span>
            </Link>
          ))}
        </div>

        <div className="bg-[#003366] border-2 border-[#002244] shadow-[8px_8px_0px_rgba(255,215,0,0.15)] p-6 sm:p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-[#FFD700]/[0.06]">
            <Landmark size={100} />
          </div>
          <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFD700] mb-2">
              Total Net Balance
            </h3>
            <p className="text-3xl sm:text-4xl font-black font-serif text-white/20 tracking-tight">
              ₹ ••••••
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="px-2 py-0.5 bg-[#FFD700] text-[#003366] text-[8px] font-black uppercase tracking-widest">
                {accounts.length} Account{accounts.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={() =>
                  setBalanceModal({ open: true, accountId: null, mode: "net" })
                }
                disabled={accounts.length === 0}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#FFD700] text-[#003366] text-[8px] font-black uppercase tracking-widest hover:bg-yellow-300 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Eye size={12} />
                Check Balance
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#cccccc] shadow-[8px_8px_0px_rgba(0,0,0,0.06)] p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm sm:text-base font-black font-serif text-[#003366] uppercase tracking-tight border-b-4 border-[#FFD700] inline-block pb-1">
                Your Accounts
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
                All linked accounts & balances
              </p>
            </div>
            <Link
              to="/account-details"
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#003366] hover:underline decoration-[#FFD700] decoration-2"
            >
              <Plus size={14} /> New Account
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-[#f8f8f8] border-2 border-[#cccccc] p-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                    <div className="ml-auto">
                      <Skeleton className="h-6 w-28" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-[#cccccc]">
              <Wallet size={36} className="text-slate-300 mx-auto mb-3" />
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">
                No accounts yet
              </p>
              <Link
                to="/account-details"
                className="inline-flex items-center gap-2 bg-[#003366] text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#002244] transition-colors"
              >
                <Plus size={14} /> Create Your First Account
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {accounts.map((acc) => (
                <div
                  key={acc._id}
                  className="bg-[#f8f8f8] border-2 border-[#cccccc] p-5 hover:border-[#003366] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#003366] text-[#FFD700]">
                          <CreditCard size={16} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            Account No.
                          </p>
                          <p className="text-sm font-black text-[#003366] font-mono tracking-wider">
                            •••• {acc._id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 border ${STATUS[acc.status] || STATUS.ACTIVE}`}
                      >
                        {acc.status}
                      </span>

                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        {acc.currency}
                      </span>

                      <span className="text-[9px] text-slate-400 font-bold hidden md:block">
                        Opened{" "}
                        {new Date(acc.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setBalanceModal({
                            open: true,
                            accountId: acc._id,
                            mode: "account",
                          })
                        }
                        className="flex items-center gap-2 bg-[#003366] text-white px-4 py-2.5 text-[9px] font-black uppercase tracking-widest hover:bg-[#002244] transition-colors cursor-pointer"
                      >
                        <Eye size={14} />
                        Check Balance
                      </button>
                      <Link
                        to={`/account-statement`}
                        className="p-2 border-2 border-[#cccccc] hover:border-[#003366] text-slate-400 hover:text-[#003366] transition-colors"
                      >
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-[#cccccc] shadow-[8px_8px_0px_rgba(0,0,0,0.06)] p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm sm:text-base font-black font-serif text-[#003366] uppercase tracking-tight border-b-4 border-[#FFD700] inline-block pb-1">
                Saved Beneficiaries
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
                Connected payees across your profile
              </p>
            </div>
            <Link
              to="/benificiaries"
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#003366] hover:underline decoration-[#FFD700] decoration-2"
            >
              <Plus size={14} /> Add New
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#f8f8f8] border-2 border-[#cccccc] p-5">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-3 w-36 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ))}
            </div>
          ) : beneficiaries.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-[#cccccc]">
              <Users size={36} className="text-slate-300 mx-auto mb-3" />
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">
                No beneficiaries added yet
              </p>
              <Link
                to="/benificiaries"
                className="inline-flex items-center gap-2 bg-[#003366] text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#002244] transition-colors"
              >
                <Plus size={14} /> Add Your First Beneficiary
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {beneficiaries.map((ben) => (
                <div
                  key={ben._id}
                  className="bg-[#f8f8f8] border-2 border-[#cccccc] p-5 hover:border-[#003366] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#003366] text-[#FFD700] shrink-0">
                      <Users size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-[#003366] uppercase tracking-wider truncate">
                        {ben.connectedAccount?.user?.name ||
                          ben.connectedAccount?.user?.email ||
                          "Unknown User"}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold truncate mt-0.5">
                        {ben.connectedAccount?.user?.email || "—"}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[8px] font-black text-slate-400 font-mono tracking-wider">
                          •••• {ben.connectedAccount?._id?.slice(-8)?.toUpperCase() || "—"}
                        </span>
                        <span
                          className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 border ${STATUS[ben.connectedAccount?.status] || STATUS.ACTIVE}`}
                        >
                          {ben.connectedAccount?.status || "—"}
                        </span>
                      </div>
                      <p className="text-[8px] text-slate-300 font-bold mt-2">
                        Added{" "}
                        {new Date(ben.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 p-4 flex items-center gap-3 mb-6">
          <Gift size={16} className="text-amber-600 shrink-0" />
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tight">
            This is a demo banking application. All accounts and transactions
            use simulated credits for learning purposes only.
          </span>
        </div>
      </div>

      <CheckBalanceModal
        isOpen={balanceModal.open}
        onClose={() =>
          setBalanceModal({ open: false, accountId: null, mode: "account" })
        }
        accountId={balanceModal.accountId}
        mode={balanceModal.mode}
        accounts={accounts}
      />
    </div>
  );
};

export default Dashboard;