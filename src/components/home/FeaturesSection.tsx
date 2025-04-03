
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Brain, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Market Predictions",
    description: "Leverages NLP and real-time news sentiment analysis to forecast market movements with remarkable accuracy.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary"
  },
  {
    icon: TrendingUp,
    title: "Automated Portfolio Optimization",
    description: "Combines Modern Portfolio Theory with deep learning for optimal asset allocation based on your risk profile.",
    color: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary"
  },
  {
    icon: AlertTriangle,
    title: "Real-Time Risk Assessment",
    description: "Continuously monitors your portfolio and simulates economic downturns to measure potential impacts.",
    color: "from-yellow-500/20 to-yellow-500/5",
    iconColor: "text-yellow-500"
  },
  {
    icon: DollarSign,
    title: "Smart Tax-Loss Harvesting",
    description: "Automatically identifies opportunities to minimize tax liability while maintaining your investment strategy.",
    color: "from-green-500/20 to-green-500/5",
    iconColor: "text-green-500"
  }
];

const FeatureCard = ({ feature, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <AnimatedCard 
        className="h-full p-6 flex flex-col"
        hoverEffect={true}
        glassEffect={true}
      >
        <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4 w-fit`}>
          <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
        </div>
        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
        <p className="text-muted-foreground text-sm">{feature.description}</p>
      </AnimatedCard>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-6 md:px-10 lg:px-20 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-astro-grid opacity-5 z-0"></div>
      <div className="absolute top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="container mx-auto z-10 relative">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligence at Your Fingertips</h2>
          <p className="text-muted-foreground">
            Our AI-powered platform delivers cutting-edge financial insights, making sophisticated 
            investment strategies accessible to everyone.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
