
import React from "react";
import { Newspaper, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InsightItem {
  id: string;
  title: string;
  description: string;
  impact: "positive" | "negative" | "neutral";
  source: string;
  time: string;
}

const mockInsights: InsightItem[] = [
  {
    id: "1",
    title: "Fed Signals Rate Cuts",
    description: "Federal Reserve hints at potential interest rate cuts in the coming months as inflation eases.",
    impact: "positive",
    source: "Financial Times",
    time: "2h ago",
  },
  {
    id: "2",
    title: "Tech Earnings Beat Expectations",
    description: "Major tech companies report quarterly earnings above analyst expectations, driving sector-wide rally.",
    impact: "positive",
    source: "CNBC",
    time: "4h ago",
  },
  {
    id: "3",
    title: "Oil Prices Surge on Supply Concerns",
    description: "Crude oil prices jump 5% amid geopolitical tensions affecting major supply routes.",
    impact: "negative",
    source: "Bloomberg",
    time: "6h ago",
  },
  {
    id: "4",
    title: "Retail Sales Data Mixed",
    description: "Latest retail sales data shows uneven consumer spending patterns across different sectors.",
    impact: "neutral",
    source: "Reuters",
    time: "8h ago",
  },
  {
    id: "5",
    title: "New AI Regulations Proposed",
    description: "Lawmakers introduce new regulatory framework for AI applications in financial services.",
    impact: "neutral",
    source: "Wall Street Journal",
    time: "12h ago",
  },
];

interface MarketInsightsProps {
  className?: string;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ className }) => {
  return (
    <AnimatedCard className={cn("p-5", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Market Insights</h3>
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="flex flex-col gap-4">
          {mockInsights.map((insight) => (
            <div key={insight.id} className="flex gap-3">
              <div className="mt-1">
                {insight.impact === "positive" ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : insight.impact === "negative" ? (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-medium">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-muted/50 px-2 py-0.5 rounded-full">{insight.source}</span>
                  <span className="text-xs text-muted-foreground">{insight.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </AnimatedCard>
  );
};

export default MarketInsights;
