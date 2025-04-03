
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardPreview from "./DashboardPreview";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate("/dashboard");
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 px-6 md:px-10 lg:px-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-astro-grid opacity-5 z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-2 inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary"
          >
            AI-POWERED INVESTMENT COACH
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient"
          >
            Invest Smarter, <br className="hidden md:block" />
            Not Harder
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Harness the power of artificial intelligence to make data-driven investment decisions, 
            minimize risk, and maximize returns – all without the guesswork.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="bg-button-gradient group relative overflow-hidden shadow-glow"
              onClick={handleStartJourney}
            >
              <span className="relative z-10">Start Your AI-Driven Journey</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
          className="flex justify-center"
        >
          <DashboardPreview />
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-muted-foreground text-sm mb-2">Scroll to discover</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-10 bg-gradient-to-b from-primary/30 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
