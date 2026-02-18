import { useState } from "react";
import appContext from "./appContext.js";

const ContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  const logoutUser = () => {
    setuser(null);
  };

  const value = {
    user,
    setuser,
    logoutUser,
  };
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default ContextProvider;
