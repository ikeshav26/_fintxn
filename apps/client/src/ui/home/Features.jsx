import React from "react";
import { features } from "../../assets/asstes";
import FeatureCard from "./FeatureCard.jsx";
import { sectionHeading } from "../../assets/asstes.js";

const Features = () => {
  return (
    <div>
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={sectionHeading}>Banking Capabilities</h2>
          <p className="max-w-2xl mx-auto font-serif italic text-slate-500 mt-4">
            A comprehensive suite of tools designed to demonstrate
            high-integrity financial systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feat, i) => (
            <FeatureCard key={i} feat={feat} i={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
