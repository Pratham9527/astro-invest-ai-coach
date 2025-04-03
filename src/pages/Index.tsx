
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AppLayout from "@/components/layout/AppLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import CtaSection from "@/components/home/CtaSection";
import FooterSection from "@/components/home/FooterSection";

const Index = () => {
  return (
    <AppLayout>
      <div className="w-full overflow-hidden">
        <HeroSection />
        <FeaturesSection />
        <ComparisonSection />
        <CtaSection />
        <FooterSection />
      </div>
    </AppLayout>
  );
};

export default Index;
