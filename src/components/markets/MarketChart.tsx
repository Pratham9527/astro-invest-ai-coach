
import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart 
} from "recharts";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data
const generateMockData = (volatility = 1, trend = 0) => {
  const data = [];
  let value = 100 + Math.random() * 10;
  
  for (let i = 0; i < 30; i++) {
    value = value + (Math.random() - 0.5) * volatility * 10 + trend;
    value = Math.max(value, 70); // Ensure value doesn't go too low
    
    data.push({
      date: new Date(2023, 0, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(value.toFixed(2)),
    });
  }
  
  return data;
};

const marketData = {
  tech: generateMockData(1.5, 0.3),
  finance: generateMockData(0.8, 0.1),
  energy: generateMockData(1.2, -0.15),
  healthcare: generateMockData(0.7, 0.2),
};

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'All';

interface MarketChartProps {
  title?: string;
  className?: string;
}

const MarketChart: React.FC<MarketChartProps> = ({ 
  title = "Market Performance", 
  className 
}) => {
  const [selectedSector, setSelectedSector] = useState<keyof typeof marketData>("tech");
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");
  
  const data = marketData[selectedSector];
  const startValue = data[0].value;
  const currentValue = data[data.length - 1].value;
  const percentChange = ((currentValue - startValue) / startValue) * 100;
  const isPositive = percentChange >= 0;
  
  return (
    <AnimatedCard className={cn("p-5", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="text-right">
          <div className="text-xl font-bold">${currentValue.toFixed(2)}</div>
          <div className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSelectedSector("tech")}
          className={selectedSector === "tech" ? "bg-primary/20 border-primary" : ""}
        >
          Tech
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSelectedSector("finance")}
          className={selectedSector === "finance" ? "bg-primary/20 border-primary" : ""}
        >
          Finance
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSelectedSector("energy")}
          className={selectedSector === "energy" ? "bg-primary/20 border-primary" : ""}
        >
          Energy
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSelectedSector("healthcare")}
          className={selectedSector === "healthcare" ? "bg-primary/20 border-primary" : ""}
        >
          Healthcare
        </Button>
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "#7E69AB" : "#f87171"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isPositive ? "#7E69AB" : "#f87171"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => value.split(' ')[0]}
            />
            <YAxis 
              domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(26, 31, 44, 0.9)', 
                borderColor: 'rgba(126, 105, 171, 0.5)',
                borderRadius: '8px',
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? "#7E69AB" : "#f87171"} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        {(['1D', '1W', '1M', '3M', '1Y', 'All'] as TimeRange[]).map((range) => (
          <Button 
            key={range}
            variant="ghost" 
            size="sm"
            onClick={() => setTimeRange(range)}
            className={cn(
              "px-2 py-1 h-auto min-w-[40px]",
              timeRange === range && "bg-primary/10 text-primary"
            )}
          >
            {range}
          </Button>
        ))}
      </div>
    </AnimatedCard>
  );
};

export default MarketChart;
