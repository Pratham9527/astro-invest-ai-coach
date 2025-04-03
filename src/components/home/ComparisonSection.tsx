
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";

const comparisonData = {
  traditional: {
    title: "Traditional Investing",
    icon: XCircle,
    iconColor: "text-red-500",
    points: [
      "Manual portfolio management requires constant attention",
      "Emotional decision-making leads to costly mistakes",
      "Limited data processing capabilities miss key insights",
      "Significant time investment for research and monitoring",
      "Slow response to market-moving events",
    ]
  },
  ai: {
    title: "AI-Powered Investing",
    icon: CheckCircle,
    iconColor: "text-green-500",
    points: [
      "Automated portfolio management works 24/7",
      "Data-driven decisions remove emotional bias",
      "Processes millions of data points in seconds",
      "Save hours with automated research and monitoring",
      "Real-time response to market-moving events",
    ]
  }
};

const ComparisonItem = ({ text, icon: Icon, color, delay, inView }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start mb-4"
    >
      <Icon className={`${color} h-5 w-5 mt-0.5 mr-3 flex-shrink-0`} />
      <p className="text-sm">{text}</p>
    </motion.div>
  );
};

const ComparisonSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-6 md:px-10 lg:px-20 relative bg-muted/30">
      <div className="absolute inset-0 bg-astro-grid opacity-5 z-0"></div>
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AI-Powered Investing?</h2>
          <p className="text-muted-foreground">
            See how InvestIQ's AI-driven approach transforms your investment experience compared to traditional methods.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          {/* Connection arrow for larger screens */}
          <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-primary rounded-full p-3 shadow-glow"
            >
              <ArrowRight className="h-6 w-6" />
            </motion.div>
          </div>
          
          {/* Traditional Investing */}
          <AnimatedCard className="bg-card-gradient p-6" glassEffect={true}>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 text-red-400">{comparisonData.traditional.title}</h3>
              <div className="w-16 h-1 bg-red-500/30 rounded-full"></div>
            </div>
            
            <div>
              {comparisonData.traditional.points.map((point, index) => (
                <ComparisonItem 
                  key={index}
                  text={point}
                  icon={comparisonData.traditional.icon}
                  color={comparisonData.traditional.iconColor}
                  delay={0.3 + (index * 0.1)}
                  inView={inView}
                />
              ))}
            </div>
          </AnimatedCard>
          
          {/* AI-Powered Investing */}
          <AnimatedCard className="bg-card-gradient p-6" glassEffect={true}>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 text-green-400">{comparisonData.ai.title}</h3>
              <div className="w-16 h-1 bg-green-500/30 rounded-full"></div>
            </div>
            
            <div>
              {comparisonData.ai.points.map((point, index) => (
                <ComparisonItem 
                  key={index}
                  text={point}
                  icon={comparisonData.ai.icon}
                  color={comparisonData.ai.iconColor}
                  delay={0.3 + (index * 0.1)}
                  inView={inView}
                />
              ))}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
