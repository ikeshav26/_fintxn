import HeroSection from "../ui/home/HeroSection.jsx";
import EnrollmentProcess from "../ui/home/EnrollmentProcess.jsx";
import Features from "../ui/home/Features.jsx";
import Bar from "../ui/home/Bar.jsx";
import CTA from "../ui/home/CTA.jsx";

const Home = () => {


  return (
    <div className="bg-[#f4f4f4] min-h-screen font-sans text-slate-700">
      <HeroSection />
      <Bar/>
      <Features/>
      <EnrollmentProcess />
      <CTA/>
    </div>
  );
};

export default Home;
