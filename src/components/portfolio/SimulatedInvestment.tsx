
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Simulate investment growth with random fluctuations
const simulateInvestment = (initialAmount: number, years: number, annualReturn: number) => {
  const data = [];
  let currentAmount = initialAmount;
  
  for (let i = 0; i <= years * 12; i++) {
    // Monthly return with some random fluctuation
    const monthlyReturn = (annualReturn / 12) / 100;
    const randomFactor = 1 + (Math.random() * 0.02 - 0.01); // ±1% random fluctuation
    
    currentAmount = currentAmount * (1 + (monthlyReturn * randomFactor));
    
    if (i % 3 === 0 || i === years * 12) { // Quarterly data points
      data.push({
        month: i,
        value: parseFloat(currentAmount.toFixed(2)),
        label: `Month ${i}`
      });
    }
  }
  
  return data;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 border border-border/40 rounded-md shadow-sm">
        <p className="font-medium">Month {payload[0].payload.month}</p>
        <p className="text-primary">${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    );
  }
  return null;
};

const SimulatedInvestment: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [years, setYears] = useState<number>(5);
  const [annualReturn, setAnnualReturn] = useState<number>(8);
  const [simulationData, setSimulationData] = useState<any[]>([]);
  const [hasSimulated, setHasSimulated] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setInitialAmount(value);
    }
  };
  
  const runSimulation = () => {
    setIsSimulating(true);
    
    // Simulate a delay for calculation
    setTimeout(() => {
      const data = simulateInvestment(initialAmount, years, annualReturn);
      setSimulationData(data);
      setHasSimulated(true);
      setIsSimulating(false);
      
      toast({
        title: "Simulation Complete",
        description: "Your investment simulation has been generated based on the parameters provided.",
        duration: 3000,
      });
    }, 800);
  };
  
  // Calculate the final value and gain
  const finalValue = hasSimulated && simulationData.length > 0 
    ? simulationData[simulationData.length - 1].value 
    : initialAmount;
    
  const totalGain = finalValue - initialAmount;
  const percentGain = (totalGain / initialAmount) * 100;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          Investment Simulator
        </CardTitle>
        <CardDescription>
          Simulate potential growth of your investments over time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Initial Investment</label>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">$</span>
              <Input
                type="number"
                value={initialAmount}
                onChange={handleAmountChange}
                min={1}
                className="flex-grow"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Period (Years): {years}</label>
            <Slider
              min={1}
              max={30}
              step={1}
              value={[years]}
              onValueChange={(value) => setYears(value[0])}
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Annual Return (%): {annualReturn}%</label>
            <Slider
              min={1}
              max={20}
              step={0.5}
              value={[annualReturn]}
              onValueChange={(value) => setAnnualReturn(value[0])}
              className="py-4"
            />
          </div>
        </div>
        
        <Button 
          onClick={runSimulation} 
          disabled={isSimulating}
          className="w-full"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Simulating...
            </>
          ) : (
            <>
              {hasSimulated ? 'Recalculate' : 'Run Simulation'}
            </>
          )}
        </Button>
        
        {hasSimulated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-card rounded-lg border border-border/40">
                <div className="text-sm text-muted-foreground">Initial Investment</div>
                <div className="text-2xl font-bold">${initialAmount.toLocaleString()}</div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border border-border/40">
                <div className="text-sm text-muted-foreground">Final Value</div>
                <div className="text-2xl font-bold">${finalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border border-border/40">
                <div className="text-sm text-muted-foreground">Total Gain</div>
                <div className={`text-2xl font-bold flex items-center ${totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {totalGain >= 0 ? (
                    <TrendingUp className="mr-1 h-5 w-5" />
                  ) : (
                    <TrendingDown className="mr-1 h-5 w-5" />
                  )}
                  ${Math.abs(totalGain).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="ml-2 text-sm">
                    ({totalGain >= 0 ? '+' : ''}{percentGain.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={simulationData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month"
                    tickFormatter={(value) => {
                      if (years <= 5) return `M${value}`;
                      if (value % 12 === 0) return `Y${value/12}`;
                      return '';
                    }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#7E69AB"
                    strokeWidth={2}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Investment Notes</h4>
              <p className="text-sm text-muted-foreground">
                This simulation assumes a {annualReturn}% average annual return over {years} years with monthly compounding.
                Actual returns may vary due to market conditions, fees, and taxes.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline">Compounding Growth</Badge>
                <Badge variant="outline">Long-term Investment</Badge>
                <Badge variant="outline">Market Simulation</Badge>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimulatedInvestment;
