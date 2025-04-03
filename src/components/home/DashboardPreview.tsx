
import React from "react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/ui/animated-card";
import { TrendingUp, TrendingDown, DollarSign, PieChart, LineChart } from "lucide-react";

const DashboardPreview = () => {
  return (
    <AnimatedCard className="relative w-full max-w-xl aspect-[16/12] overflow-hidden">
      <div className="absolute inset-0 bg-card-gradient p-6">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">Portfolio Dashboard</div>
            <div className="text-sm text-muted-foreground">AI-Powered Insights</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="bg-white/5 p-4 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Portfolio Value</div>
                <DollarSign className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold mt-2">$124,567.89</div>
              <div className="flex items-center text-green-400 text-sm mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+5.6%</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="bg-white/5 p-4 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Risk Score</div>
                <PieChart className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold mt-2">Medium</div>
              <div className="flex items-center text-primary text-sm mt-1">
                <span>42/100</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className="flex-1 bg-white/5 p-4 rounded-lg backdrop-blur-sm relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">Market Performance</div>
              <LineChart className="h-4 w-4 text-secondary" />
            </div>
            
            <div className="relative h-32">
              {/* Simulated chart */}
              <div className="absolute inset-0">
                <motion.svg 
                  viewBox="0 0 100 40" 
                  className="w-full h-full stroke-secondary stroke-2 fill-none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 2 }}
                >
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,35 L10,30 L20,32 L30,20 L40,25 L50,15 L60,18 L70,10 L80,5 L90,12 L100,8" 
                    className="stroke-secondary"
                  />
                  <path 
                    d="M0,35 L10,30 L20,32 L30,20 L40,25 L50,15 L60,18 L70,10 L80,5 L90,12 L100,8 L100,40 L0,40 Z" 
                    fill="url(#gradient)" 
                    strokeWidth="0"
                  />
                </motion.svg>
              </div>
              
              {/* Chart labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
            
            <div className="mt-4 pt-2 border-t border-white/10 flex justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
                <span className="text-xs text-muted-foreground">Your Portfolio</span>
              </div>
              <div className="flex items-center text-green-400 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12.8% YTD</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="mt-4 p-3 rounded-md border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></div>
              <span className="text-sm">AI Recommendation:</span>
              <span className="ml-2 text-sm text-muted-foreground">Consider rebalancing your tech exposure by 5%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default DashboardPreview;
