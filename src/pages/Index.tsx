
import React, { useRef } from "react";
import AppLayout from "@/components/layout/AppLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import CtaSection from "@/components/home/CtaSection";
import FooterSection from "@/components/home/FooterSection";

const Index = () => {
  const featuresSectionRef = useRef<HTMLDivElement>(null);
  const comparisonSectionRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AppLayout>
      <div className="w-full overflow-hidden">
        <HeroSection />
        <div ref={featuresSectionRef}>
          <FeaturesSection />
        </div>
        <div ref={comparisonSectionRef}>
          <ComparisonSection />
        </div>
        <div ref={ctaSectionRef}>
          <CtaSection />
        </div>
        <FooterSection />
      </div>
    </AppLayout>
  );
};

export default Index;
