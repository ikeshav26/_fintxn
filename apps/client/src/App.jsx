import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import AccountDetails from "./pages/AccountDetails";
import AccountStatement from "./pages/AccountStatement";
import Benificiaries from "./pages/Benificiaries";
import Transfer from "./pages/Transfer";
import HelpDesk from "./pages/HelpDesk";
import About from "./pages/About";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/account-details" element={<AccountDetails />} />
        <Route path="/account-statement" element={<AccountStatement />} />
        <Route path="/benificiaries" element={<Benificiaries />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help-desk" element={<HelpDesk />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
