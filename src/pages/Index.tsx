
import React from "react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Cpu, RotateCcw, UserCog, ArrowDown } from "lucide-react";
import WalletCard from "@/components/core/WalletCard";
import FeatureCard from "@/components/core/FeatureCard";
import ChatInput from "@/components/core/ChatInput";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border/20 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto py-3 px-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-primary rounded-sm"></div>
              <span className="font-bold text-lg">CORE <span className="text-primary">DAO</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-primary border-b-2 border-primary px-1">Features</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Docs</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contribute</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Stats</a>
            </div>
          </div>
          <Button className="bg-button-gradient hover:opacity-90 transition-opacity">
            Connect Wallet
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-hero-pattern bg-cover bg-center relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Unleash the power of
              <div className="text-5xl md:text-7xl mt-2">
                CORE <span className="text-primary">DAO</span>
              </div>
            </h1>
            <p className="text-muted-foreground mb-8">
              The first Bitcoin-aligned EVM-compatible Layer-1 blockchain with consensus, combining proofs and secure technology
            </p>
            <Button className="crypto-button animate-pulse-slow">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <div className="mt-12 md:mt-20 flex justify-center">
              <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <WalletCard className="shadow-xl shadow-primary/5 animate-float" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-2">
                CORE CHAIN'S <span className="text-primary">STRENGTHS!</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                CORE TASHI leverages Core Chain, the first Bitcoin-aligned EVM-compatible Layer-1 blockchain with a unique setup. Plus consensus, combining DPoS, PoGA, and Non-Custodial Bitcoin Staking. Core offers unparalleled security, scalability, and decentralization. This ensures high-performance and reliable transactions using CORE, coreBTC, and altCORE tokens, making it a versatile platform for DeFi applications.
              </p>
              <Button className="w-fit group flex items-center gap-2 crypto-button">
                EXPLORE CORE DAO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-crypto-grid">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              WHY CHOOSE <span className="text-primary">CORO TASHI?</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Store your assets, multiply your income, and ensure your DeFi choices are the future-proof ones and restore should you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<BrainCircuit className="w-5 h-5" />}
              title="AI-Powered Yield Optimization"
              description="Machine learning models analyze historical staking trends to ensure the best APY and preserve the best profit."
            />
            <FeatureCard 
              icon={<Cpu className="w-5 h-5" />}
              title="Multi-Pool Staking System"
              description="Support for multiple staking pools with different tokens and pool specifications that cover high-risk assets and reward tiers per pool."
            />
            <FeatureCard 
              icon={<RotateCcw className="w-5 h-5" />}
              title="Auto-Rebalancing"
              description="Automatically rotate liquidity and APY drops, using real-time market data from Chainlink and The Graph."
            />
            <FeatureCard 
              icon={<UserCog className="w-5 h-5" />}
              title="User Customization"
              description="Dynamic sliders, configurable thresholds, and custom modes to match your investment strategy."
            />
          </div>
        </div>
      </section>

      {/* Chat Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedCard className="max-w-2xl mx-auto border border-border/40 p-8">
            <ChatInput />
          </AnimatedCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-primary rounded-sm"></div>
                <span className="font-bold text-lg">CORE <span className="text-primary">DAO</span></span>
              </div>
              <p className="text-sm text-muted-foreground">
                Maximizing yields and optimizing investments in the decentralized finance ecosystem.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-8 h-8 bg-secondary/50 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-secondary/50 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Liquidity Pools</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Staking Dashboard</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Mining Dashboard</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Github</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/20 mt-8 pt-8 text-xs text-muted-foreground flex flex-col md:flex-row justify-between items-center">
            <div>© 2025 CoreDAO. All rights reserved.</div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
