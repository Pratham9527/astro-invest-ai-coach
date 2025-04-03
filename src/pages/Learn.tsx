
import React from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";

const Learn = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 md:p-6"
      >
        <h1 className="text-2xl font-bold mb-6">Learning Center</h1>
        <div className="bg-card/30 rounded-xl border border-border/40 p-6 shadow-lg">
          <p className="text-muted-foreground">
            Educational resources and investment guides will be available here. This feature is coming soon.
          </p>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Learn;
