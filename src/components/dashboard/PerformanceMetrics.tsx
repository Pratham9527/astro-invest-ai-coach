
import React from "react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Percent, DollarSign, BarChart3, PieChart } from "lucide-react";

interface MetricProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  className?: string;
}

const Metric: React.FC<MetricProps> = ({ title, value, change, isPositive, icon, className }) => {
  return (
    <AnimatedCard className={cn("p-4", className)} floatAnimation>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <div className="text-2xl font-bold mt-1">{value}</div>
          <div className={cn(
            "flex items-center gap-1 text-xs mt-1",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{change}</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </AnimatedCard>
  );
};

interface PerformanceMetricsProps {
  className?: string;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      <Metric
        title="Portfolio Value"
        value="$24,685.75"
        change="+5.23% (1m)"
        isPositive={true}
        icon={<DollarSign className="h-5 w-5 text-primary" />}
      />
      <Metric
        title="Annual Return"
        value="12.8%"
        change="+2.4% (YTD)"
        isPositive={true}
        icon={<Percent className="h-5 w-5 text-primary" />}
      />
      <Metric
        title="Risk Score"
        value="Moderate"
        change="-0.5 points"
        isPositive={false}
        icon={<BarChart3 className="h-5 w-5 text-primary" />}
      />
      <Metric
        title="Diversification"
        value="72%"
        change="+4% (1m)"
        isPositive={true}
        icon={<PieChart className="h-5 w-5 text-primary" />}
      />
    </div>
  );
};

export default PerformanceMetrics;
