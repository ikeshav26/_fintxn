import { useState } from "react";
import appContext from "./appContext.js";
import { useNavigate } from "react-router-dom";

const ContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  const logoutUser = () => {
    setuser(null);
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
