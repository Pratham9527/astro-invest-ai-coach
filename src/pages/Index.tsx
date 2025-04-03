
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import AIChatInterface from "@/components/ai/AIChatInterface";
import MarketChart from "@/components/markets/MarketChart";
import MarketInsights from "@/components/markets/MarketInsights";
import PerformanceMetrics from "@/components/dashboard/PerformanceMetrics";
import { Sparkles, Wallet, Lightbulb } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient animate-pulse-slow">
            Welcome to AstroInvest
          </h1>
          <p className="text-muted-foreground">
            Your AI-powered investment coach and market analysis platform
          </p>
        </header>

        <PerformanceMetrics className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <AnimatedCard className="p-6 flex flex-col gap-4 bg-card-gradient">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">AI Investment Coach</h2>
            </div>
            <p className="text-muted-foreground">
              Get personalized investment advice, market analysis, and educational insights powered by advanced AI.
            </p>
            <div className="mt-auto">
              <Button className="bg-button-gradient">Ask Your Coach</Button>
            </div>
          </AnimatedCard>

          <AnimatedCard className="p-6 flex flex-col gap-4 bg-card-gradient">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Portfolio Analyzer</h2>
            </div>
            <p className="text-muted-foreground">
              Analyze your portfolio's performance, risk level, and get AI-powered suggestions for optimization.
            </p>
            <div className="mt-auto">
              <Button className="bg-button-gradient">Analyze Portfolio</Button>
            </div>
          </AnimatedCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <MarketChart className="lg:col-span-2" />
          <MarketInsights />
        </div>

        <AnimatedCard className="p-6 mb-8 bg-card-gradient">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-bold">Financial Insight of the Day</h2>
          </div>
          <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
            "The stock market is filled with individuals who know the price of everything, but the value of nothing."
            <footer className="mt-2 text-sm">— Philip Fisher</footer>
          </blockquote>
        </AnimatedCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AIChatInterface />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
