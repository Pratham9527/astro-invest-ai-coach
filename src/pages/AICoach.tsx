
import React from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import AIChatInterface from "@/components/ai/AIChatInterface";

const AICoach = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 md:p-6 flex flex-col"
      >
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">AI Investment Coach</h1>
          <div className="ml-3 px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
            Powered by AI
          </div>
        </div>
        
        <div className="flex-1 bg-card/30 rounded-xl border border-border/40 shadow-lg overflow-hidden">
          <AIChatInterface />
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default AICoach;
