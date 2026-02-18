import React, { useState, useContext, useEffect, useRef } from 'react';
import { 
  NavLink, 
  useNavigate,
  useLocation 
} from 'react-router-dom';
import { 
  Landmark, 
  LogOut, 
  Menu, 
  X,
  Lock,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import appContext from '../context/appContext.js';

const Navbar = () => {
  const { user, logoutUser } = useContext(appContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAccountDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const publicRoutes = [
    { label: "HOME", path: "/" },
    { label: "ABOUT US", path: "/about" },
    { label: "HELP DESK", path: "/help-desk" }
  ];

  const loggedOutRoutes = [
    { label: "LOGIN", path: "/login" },
    { label: "ENROLL NOW", path: "/register" }
  ];

  const accountDropdownRoutes = [
    { label: "ACCOUNT DETAILS", path: "/account-details" },
    { label: "ACCOUNT STATEMENT", path: "/account-statement" },
    { label: "BENEFICIARIES", path: "/benificiaries" },
  ];

  const loggedInTopRoutes = [
    { label: "DASHBOARD", path: "/dashboard" },
    { label: "PAYMENTS & TRANSFERS", path: "/transfer" }
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const isAccountRouteActive = accountDropdownRoutes.some(r => location.pathname === r.path);

  return (
    <nav className="w-full bg-[#f4f4f4] border-b-2 border-[#cccccc] font-serif sticky top-0 z-50">
      <div className="bg-[#002244] text-white text-[10px] py-1 px-4 sm:px-8 flex justify-between items-center tracking-widest">
        <div className="flex items-center gap-4">
          <span className="hidden xs:inline">OFFICIAL SECURE BANKING PORTAL</span>
          <span className="hidden sm:inline">|</span>
          <span className="font-bold">FDIC INSURED</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock size={10} className="text-[#FFD700]" />
          <span className="hidden sm:inline">128-BIT ENCRYPTION ACTIVE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-stretch h-16 lg:h-20">
          
          <div className="flex items-center border-r border-[#cccccc] pr-4 sm:pr-8 my-2 shrink-0">
            <NavLink to="/" className="flex items-center gap-2 sm:gap-3">
              <div className="bg-[#003366] p-1.5 sm:p-2 border-2 border-[#FFD700]">
                <Landmark size={22} className="text-[#FFD700]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-[#003366] leading-none uppercase italic tracking-tighter">
                  FinTxn
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 tracking-[0.2em] uppercase">
                  National Trust
                </span>
              </div>
            </NavLink>
          </div>


          <div className="hidden lg:flex items-stretch">
            {publicRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) => `
                  px-4 py-3 text-xs font-bold tracking-wider inline-flex items-center transition-none border-b-4
                  ${isActive ? 'bg-[#003366] text-white border-[#FFD700]' : 'text-[#003366] hover:bg-slate-200 border-transparent'}
                `}
              >
                {route.label}
              </NavLink>
            ))}

            {!user ? (
              <div className="flex items-stretch ml-2">
                {loggedOutRoutes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={({ isActive }) => `
                      px-4 py-3 text-xs font-bold tracking-wider inline-flex items-center transition-none border-b-4
                      ${isActive ? 'bg-[#003366] text-white border-[#FFD700]' : 'text-[#003366] hover:bg-slate-200 border-transparent'}
                    `}
                  >
                    {route.label}
                  </NavLink>
                ))}
              </div>
            ) : (
              <>
                <div className="w-[1px] bg-[#cccccc] mx-1 my-4" />
                {loggedInTopRoutes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={({ isActive }) => `
                      px-4 py-3 text-xs font-bold tracking-wider inline-flex items-center transition-none border-b-4
                      ${isActive ? 'bg-[#003366] text-white border-[#FFD700]' : 'text-[#003366] hover:bg-slate-200 border-transparent'}
                    `}
                  >
                    {route.label}
                  </NavLink>
                ))}


                <div className="relative flex items-stretch" ref={dropdownRef}>
                  <button
                    onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                    className={`
                      px-5 py-3 text-xs font-bold tracking-wider inline-flex items-center gap-2 transition-none border-b-4
                      ${isAccountRouteActive || isAccountDropdownOpen
                        ? 'bg-[#003366] text-white border-[#FFD700]' 
                        : 'text-[#003366] hover:bg-slate-200 border-transparent'
                      }
                    `}
                  >
                    ACCOUNTS
                    <ChevronDown size={14} className={`transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>


                  {isAccountDropdownOpen && (
                    <div className="absolute top-full right-0 w-64 bg-white border-2 border-[#003366] shadow-[8px_8px_0px_rgba(0,51,102,0.1)] z-[60]">
                      <div className="bg-[#003366] text-[#FFD700] px-4 py-2 text-[10px] font-black uppercase tracking-widest border-b border-[#002244]">
                        Secure Services
                      </div>
                      <div className="flex flex-col py-1">
                        {accountDropdownRoutes.map((route) => (
                          <NavLink
                            key={route.path}
                            to={route.path}
                            className={({ isActive }) => `
                              flex items-center justify-between px-4 py-3 text-xs font-bold tracking-wide transition-none
                              ${isActive 
                                ? 'bg-slate-100 text-[#003366] border-l-4 border-l-[#FFD700]' 
                                : 'text-[#003366] hover:bg-slate-50 border-l-4 border-l-transparent'
                              }
                            `}
                          >
                            {route.label}
                            <ChevronRight size={12} className="opacity-30" />
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-50 flex items-center gap-1.5 border-b-4 border-transparent"
                >
                  <LogOut size={14} />
                  SIGN OUT
                </button>
              </>
            )}
          </div>


          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 border border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>


      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#cccccc] shadow-2xl overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="flex flex-col">
            {publicRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className="px-6 py-4 text-xs font-bold text-[#003366] border-b border-slate-200"
              >
                {route.label}
              </NavLink>
            ))}
            {user && (
              <>
                <div className="bg-slate-100 px-6 py-2 text-[10px] font-bold text-slate-500 uppercase">Banking</div>
                {loggedInTopRoutes.map((route) => (
                   <NavLink key={route.path} to={route.path} className="px-6 py-4 text-xs font-bold text-[#003366] border-b border-slate-200">{route.label}</NavLink>
                ))}
                <div className="bg-slate-100 px-6 py-2 text-[10px] font-bold text-slate-500 uppercase">Account Access</div>
                {accountDropdownRoutes.map((route) => (
                   <NavLink key={route.path} to={route.path} className="px-6 py-4 text-xs font-bold text-[#003366] border-b border-slate-200 pl-10">{route.label}</NavLink>
                ))}
                <button onClick={handleLogout} className="px-6 py-5 text-xs font-bold text-red-700 text-left">SIGN OUT</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;