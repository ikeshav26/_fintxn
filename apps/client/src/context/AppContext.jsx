import { useState } from "react";
import appContext from "./appContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ContextProvider = ({ children }) => {
  const [user, setuser] = useState(localStorage.getItem("fintxn_demo_user") ? JSON.parse(localStorage.getItem("fintxn_demo_user")) : null);

  const logoutUser = async () => {
    try{
      const res=await axios.get('/api/auth/logout',{withCredentials:true});
      localStorage.removeItem("fintxn_demo_user");
      setuser(null);
      toast.success(res.data.message || "Logged out successfully");
    }catch(err){
      console.error("Error during logout:", err);
    }
  };

  const navigate=useNavigate()

  const value = {
    user,
    setuser,
    logoutUser,
    navigate
  };
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default ContextProvider;
