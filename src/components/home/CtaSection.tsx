
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CtaSection = () => {
  const [investmentGoal, setInvestmentGoal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!investmentGoal.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "AI Analysis Initiated",
        description: `We're analyzing your goal: "${investmentGoal}"`,
        duration: 5000,
      });
      setIsSubmitting(false);
      setInvestmentGoal("");
      
      // Navigate to dashboard after a brief delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 1500);
  };
  
  return (
    <section className="py-20 px-6 md:px-10 lg:px-20 relative">
      <div className="absolute inset-0 bg-astro-grid opacity-5 z-0"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-3xl relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm mb-6"
          >
            <Sparkles className="h-4 w-4 text-astro-gold" />
            <span className="text-sm font-medium">Powered by Advanced AI</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Transform Your Investment Strategy?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-muted-foreground mb-8"
          >
            Tell us your investment goal, and our AI will generate personalized insights and strategies tailored to your needs.
          </motion.p>
        </div>
        
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          onSubmit={handleSubmit}
          className="relative"
        >
          <div className="relative glass-card p-1">
            <Input
              value={investmentGoal}
              onChange={(e) => setInvestmentGoal(e.target.value)}
              placeholder="What's your investment goal? (e.g., Retirement in 15 years, College fund...)"
              className="bg-transparent border-none h-14 pl-5 pr-36 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="absolute right-1 top-1 bottom-1">
              <Button 
                type="submit" 
                disabled={isSubmitting || !investmentGoal.trim()} 
                className="h-full bg-button-gradient group relative overflow-hidden shadow-glow"
              >
                <span className="relative z-10">{isSubmitting ? "Analyzing..." : "Get AI Insights"}</span>
                {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </Button>
            </div>
            
            {/* Reactive background */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-astro-gold/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${investmentGoal.length * 2}% 50%, rgba(126, 105, 171, 0.1) 0%, rgba(26, 31, 44, 0.05) 50%)`
              }}
            />
          </div>
          
          <div className="text-xs text-muted-foreground mt-3 text-center">
            Try: "Building wealth for retirement" or "Saving for a house down payment in 5 years"
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default CtaSection;
