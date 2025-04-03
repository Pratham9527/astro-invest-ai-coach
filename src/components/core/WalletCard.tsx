
import React from "react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WalletCardProps {
  className?: string;
}

const WalletCard = ({ className }: WalletCardProps) => {
  return (
    <AnimatedCard 
      className={cn("bg-secondary/70 p-5", className)}
      glassEffect={true}
      hoverEffect={true}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-full"></div>
          <h3 className="font-bold">BTC Yield Router</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-secondary px-2 py-1 rounded-full">ACTIVE</span>
          <span className="text-xs bg-secondary/50 px-2 py-1 rounded-full">AI Protection</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm text-muted-foreground mb-1">Total Balance</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">1.248</span>
            <span className="text-sm">BTC</span>
          </div>
          <div className="flex items-center gap-1 text-green-500 text-xs mt-1">
            <ArrowUp className="w-3 h-3" />
            <span>8.74%</span>
            <span className="text-muted-foreground">(24h)</span>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="bg-secondary p-1 rounded text-center">
              <div className="text-xs text-muted-foreground">1h</div>
              <div className="text-xs text-green-500">+0.3%</div>
            </div>
            <div className="bg-secondary p-1 rounded text-center">
              <div className="text-xs text-muted-foreground">24h</div>
              <div className="text-xs text-green-500">+8.7%</div>
            </div>
            <div className="bg-secondary p-1 rounded text-center">
              <div className="text-xs text-muted-foreground">7d</div>
              <div className="text-xs text-red-500">-2.1%</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Last updated: Just now</span>
            <Button variant="outline" size="sm" className="h-7 text-xs">Refresh</Button>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30 pt-4 mb-4">
        <h4 className="text-sm font-medium mb-3">Your BTC Account</h4>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <span className="text-3xl font-bold">1.0</span>
            <span className="text-lg ml-2">BTC</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="crypto-card">
          <h5 className="text-xs text-muted-foreground mb-1">Previous Cycle</h5>
          <div className="flex items-baseline">
            <span className="text-lg font-bold">0.0874</span>
            <span className="text-xs ml-1">BTC</span>
          </div>
        </div>
        <div className="crypto-card">
          <h5 className="text-xs text-muted-foreground mb-1">Next Cycle (Est.)</h5>
          <div className="flex items-baseline">
            <span className="text-lg font-bold">1.0874</span>
            <span className="text-xs ml-1">BTC</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Select Strategy</h4>
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="bg-secondary/50 justify-start">
            <div className="w-4 h-4 bg-primary rounded-full mr-2"></div>
            Conservative
          </Button>
          <Button variant="outline" className="bg-primary/10 border-primary justify-start">
            <div className="w-4 h-4 bg-primary rounded-full mr-2"></div>
            Balanced
          </Button>
          <Button variant="outline" className="bg-secondary/50 justify-start">
            <div className="w-4 h-4 bg-primary rounded-full mr-2"></div>
            Aggressive
          </Button>
        </div>
      </div>

      <Button className="w-full crypto-button">
        <Plus className="w-4 h-4 mr-2" /> Deposit Additional Funds
      </Button>
    </AnimatedCard>
  );
};

export default WalletCard;
