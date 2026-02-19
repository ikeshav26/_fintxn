import Hero from '../ui/About/Hero';
import Disclaimer from '../ui/About/Disclaimer';
import Me from '../ui/About/Me';
import Vision from '../ui/About/Vision';
import Capabilities from '../ui/About/Capabilities';
import TechStack from '../ui/About/TechStack';
import Architecture from '../ui/About/Architecture';
import CTA from '../ui/About/CTA';

const About = () => {
 
  return (
    <div className="bg-[#f4f4f4] min-h-screen font-sans text-slate-700 selection:bg-[#FFD700] selection:text-[#003366]">
      <Hero/>
     <Disclaimer/>
      <main className="max-w-7xl mx-auto p-8 sm:p-20 space-y-32">
       <Me/>
        <Vision/>
        <Capabilities/>
        <TechStack/>
        <Architecture/>
       <CTA/>
      </main>
    </div>
  );
};

export default About;