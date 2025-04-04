
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  DollarSign, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Calendar,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import SimulatedInvestment from "@/components/portfolio/SimulatedInvestment";
import { useToast } from "@/hooks/use-toast";

// Mock portfolio data
const portfolioSummary = {
  totalValue: 125782.45,
  todayChange: 1834.21,
  todayChangePercent: 1.48,
  totalGain: 25782.45,
  totalGainPercent: 25.81,
  allocations: [
    { name: "Stocks", value: 65, color: "#7E69AB" },
    { name: "Bonds", value: 15, color: "#10B981" },
    { name: "Cash", value: 10, color: "#6B7280" },
    { name: "Crypto", value: 8, color: "#F97316" },
    { name: "Other", value: 2, color: "#8B5CF6" }
  ],
  historicalData: [
    { date: "Jan", value: 100000 },
    { date: "Feb", value: 105000 },
    { date: "Mar", value: 103000 },
    { date: "Apr", value: 107500 },
    { date: "May", value: 111000 },
    { date: "Jun", value: 115000 },
    { date: "Jul", value: 118000 },
    { date: "Aug", value: 119500 },
    { date: "Sep", value: 122000 },
    { date: "Oct", value: 123800 },
    { date: "Nov", value: 121500 },
    { date: "Dec", value: 125782 }
  ]
};

// Mock portfolio holdings
const portfolioHoldings = [
  { 
    id: 1, 
    symbol: "AAPL", 
    name: "Apple Inc.", 
    shares: 25, 
    avgPrice: 142.32, 
    currentPrice: 187.68, 
    value: 4692.00, 
    change: 1134.00, 
    changePercent: 31.87,
    allocation: 3.73,
    transactions: [
      { date: "2023-08-15", type: "Buy", shares: 15, price: 145.40, total: 2181.00 },
      { date: "2023-10-22", type: "Buy", shares: 10, price: 137.70, total: 1377.00 }
    ]
  },
  { 
    id: 2, 
    symbol: "MSFT", 
    name: "Microsoft Corp.", 
    shares: 18, 
    avgPrice: 305.78, 
    currentPrice: 419.72, 
    value: 7555.00, 
    change: 2050.92, 
    changePercent: 37.26,
    allocation: 6.01,
    transactions: [
      { date: "2023-07-11", type: "Buy", shares: 10, price: 322.80, total: 3228.00 },
      { date: "2023-09-05", type: "Buy", shares: 8, price: 284.75, total: 2278.00 }
    ]
  },
  { 
    id: 3, 
    symbol: "GOOGL", 
    name: "Alphabet Inc.", 
    shares: 32, 
    avgPrice: 132.15, 
    currentPrice: 175.98, 
    value: 5631.36, 
    change: 1402.56, 
    changePercent: 33.17,
    allocation: 4.48,
    transactions: [
      { date: "2023-06-22", type: "Buy", shares: 20, price: 120.50, total: 2410.00 },
      { date: "2023-11-14", type: "Buy", shares: 12, price: 151.35, total: 1816.20 }
    ]
  },
  { 
    id: 4, 
    symbol: "AMZN", 
    name: "Amazon.com Inc.", 
    shares: 40, 
    avgPrice: 143.80, 
    currentPrice: 182.30, 
    value: 7292.00, 
    change: 1540.00, 
    changePercent: 26.77,
    allocation: 5.80,
    transactions: [
      { date: "2023-05-18", type: "Buy", shares: 25, price: 132.40, total: 3310.00 },
      { date: "2023-10-30", type: "Buy", shares: 15, price: 162.90, total: 2443.50 }
    ]
  },
];

// Interface for the tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

// Custom tooltip component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-2 border shadow-sm bg-background">
        <p className="font-medium">{label}</p>
        <p className="text-primary">${payload[0].value.toLocaleString()}</p>
      </Card>
    );
  }
  return null;
};

const Portfolio: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  
  const toggleExpanded = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };
  
  const refreshPortfolio = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Portfolio Updated",
        description: "Your portfolio data has been refreshed with the latest market values.",
      });
    }, 1200);
  };
  
  // Calculate today's gain/loss color
  const todayChangeColor = portfolioSummary.todayChange >= 0 ? "text-green-500" : "text-red-500";
  const totalGainColor = portfolioSummary.totalGain >= 0 ? "text-green-500" : "text-red-500";
  
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 md:p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Badge 
              variant={isRefreshing ? "active" : "interactive"} 
              onClick={refreshPortfolio}
              className="gap-1"
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3" />
                  Refresh Portfolio
                </>
              )}
            </Badge>
            <Badge variant="interactive" onClick={() => {
              toast({
                title: "Portfolio Settings",
                description: "Portfolio settings page opened.",
              });
            }}>
              Settings
            </Badge>
          </div>
        </div>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="simulator">Simulator</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio Summary</CardTitle>
                      <CardDescription>Current portfolio value and performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Total Value</div>
                          <div className="text-3xl font-bold">${portfolioSummary.totalValue.toLocaleString()}</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Today's Change</div>
                            <div className={`text-xl font-semibold flex items-center ${todayChangeColor}`}>
                              {portfolioSummary.todayChange >= 0 ? (
                                <TrendingUp className="mr-1 h-4 w-4" />
                              ) : (
                                <TrendingDown className="mr-1 h-4 w-4" />
                              )}
                              ${Math.abs(portfolioSummary.todayChange).toLocaleString()}
                              <span className="ml-1 text-xs">
                                ({portfolioSummary.todayChange >= 0 ? '+' : ''}{portfolioSummary.todayChangePercent}%)
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Total Gain/Loss</div>
                            <div className={`text-xl font-semibold flex items-center ${totalGainColor}`}>
                              {portfolioSummary.totalGain >= 0 ? (
                                <TrendingUp className="mr-1 h-4 w-4" />
                              ) : (
                                <TrendingDown className="mr-1 h-4 w-4" />
                              )}
                              ${Math.abs(portfolioSummary.totalGain).toLocaleString()}
                              <span className="ml-1 text-xs">
                                ({portfolioSummary.totalGain >= 0 ? '+' : ''}{portfolioSummary.totalGainPercent}%)
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={portfolioSummary.historicalData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                              <XAxis dataKey="date" />
                              <YAxis domain={['dataMin - 5000', 'dataMax + 5000']} />
                              <Tooltip content={<CustomTooltip />} />
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#7E69AB"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 6 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Asset Allocation</CardTitle>
                      <CardDescription>Distribution of your investments</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="h-[200px] w-[200px] mx-auto mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={portfolioSummary.allocations}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {portfolioSummary.allocations.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {portfolioSummary.allocations.map((allocation) => (
                          <div key={allocation.name} className="flex items-center">
                            <div
                              className="w-3 h-3 mr-2 rounded-full"
                              style={{ backgroundColor: allocation.color }}
                            ></div>
                            <span className="text-sm">{allocation.name}: {allocation.value}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Holdings</CardTitle>
                    <CardDescription>Your best performing assets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {portfolioHoldings.map((holding) => (
                        <div key={holding.id} className="rounded-lg border p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-bold">{holding.symbol}</h3>
                                <Badge variant="outline" className="ml-2">{holding.shares} shares</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{holding.name}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">${holding.value.toLocaleString()}</div>
                              <div className={holding.change >= 0 ? "text-green-500" : "text-red-500"}>
                                {holding.change >= 0 ? "+" : ""}{holding.changePercent.toFixed(2)}%
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Allocation</span>
                              <span>{holding.allocation.toFixed(2)}%</span>
                            </div>
                            <Progress value={holding.allocation} className="h-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            
              <TabsContent value="holdings" className="space-y-4">
                {portfolioHoldings.map((holding) => (
                  <Card key={holding.id} className="overflow-hidden">
                    <div
                      className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleExpanded(holding.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div>
                            <h3 className="font-bold text-lg">{holding.symbol}</h3>
                            <p className="text-sm text-muted-foreground">{holding.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-bold">${holding.value.toLocaleString()}</div>
                            <div className={`flex items-center justify-end ${holding.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {holding.change >= 0 ? (
                                <TrendingUp className="mr-1 h-4 w-4" />
                              ) : (
                                <TrendingDown className="mr-1 h-4 w-4" />
                              )}
                              {holding.change >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                            </div>
                          </div>
                          {expanded === holding.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expanded === holding.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Separator />
                          <div className="p-4 bg-muted/20">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <div className="text-sm text-muted-foreground">Shares Owned</div>
                                <div className="text-lg font-medium">{holding.shares}</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Average Cost</div>
                                <div className="text-lg font-medium">${holding.avgPrice.toFixed(2)}</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Current Price</div>
                                <div className="text-lg font-medium">${holding.currentPrice.toFixed(2)}</div>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="text-sm font-medium mb-2">Transaction History</div>
                              <div className="bg-card rounded-md p-3">
                                <div className="space-y-2">
                                  {holding.transactions.map((transaction, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                      <div className="flex items-center">
                                        <Badge variant={transaction.type === "Buy" ? "default" : "destructive"} className="mr-2">
                                          {transaction.type}
                                        </Badge>
                                        <span>{transaction.date}</span>
                                      </div>
                                      <div className="flex items-center space-x-4">
                                        <div>{transaction.shares} shares</div>
                                        <div>@ ${transaction.price.toFixed(2)}</div>
                                        <div className="font-medium">${transaction.total.toFixed(2)}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              <Button 
                                size="sm" 
                                className="flex items-center gap-1"
                                onClick={() => {
                                  toast({
                                    title: "Trade Initiated",
                                    description: `Opening trade panel for ${holding.symbol}.`,
                                  });
                                }}
                              >
                                <DollarSign className="h-4 w-4" />
                                Trade
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex items-center gap-1"
                                onClick={() => {
                                  toast({
                                    title: "Research Opened",
                                    description: `Viewing research for ${holding.symbol}.`,
                                  });
                                }}
                              >
                                <BarChart3 className="h-4 w-4" />
                                Research
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex items-center gap-1"
                                onClick={() => {
                                  toast({
                                    title: "Alert Set",
                                    description: `Price alert set for ${holding.symbol}.`,
                                  });
                                }}
                              >
                                <AlertCircle className="h-4 w-4" />
                                Set Alert
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="flex items-center gap-1"
                                onClick={() => {
                                  toast({
                                    title: "External Link",
                                    description: `Opening detailed information for ${holding.symbol} in a new tab.`,
                                  });
                                }}
                              >
                                <ExternalLink className="h-4 w-4" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))}
              </TabsContent>
            
              <TabsContent value="analysis">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Portfolio Analysis</CardTitle>
                    <CardDescription>
                      Performance metrics and risk assessment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="p-4 bg-card rounded-lg border">
                        <div className="flex items-center mb-2">
                          <Wallet className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="font-medium">Risk Level</h3>
                        </div>
                        <div className="text-2xl font-bold mb-2">Moderate</div>
                        <Progress value={65} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Your portfolio has a balanced risk profile with moderate volatility.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-card rounded-lg border">
                        <div className="flex items-center mb-2">
                          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="font-medium">Diversification</h3>
                        </div>
                        <div className="text-2xl font-bold mb-2">Good</div>
                        <Progress value={75} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Your investments are spread across multiple sectors and asset classes.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-card rounded-lg border">
                        <div className="flex items-center mb-2">
                          <PieChartIcon className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="font-medium">Expected Return</h3>
                        </div>
                        <div className="text-2xl font-bold mb-2">8.5% / year</div>
                        <Progress value={70} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Based on historical performance and current allocations.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Sector Allocation</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Technology</span>
                            <span>42%</span>
                          </div>
                          <Progress value={42} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Financial Services</span>
                            <span>18%</span>
                          </div>
                          <Progress value={18} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Healthcare</span>
                            <span>12%</span>
                          </div>
                          <Progress value={12} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Consumer Cyclical</span>
                            <span>10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Others</span>
                            <span>18%</span>
                          </div>
                          <Progress value={18} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Portfolio Recommendation</h4>
                          <p className="text-sm text-muted-foreground my-1">
                            Your portfolio is slightly overweight in technology stocks. Consider diversifying into other sectors to reduce concentration risk.
                          </p>
                          <Button size="sm" variant="outline" className="mt-2" onClick={() => {
                            toast({
                              title: "Rebalance Suggestions",
                              description: "Opening portfolio rebalancing tool with personalized recommendations.",
                            });
                          }}>
                            View Rebalance Suggestions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            
              <TabsContent value="simulator">
                <SimulatedInvestment />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default Portfolio;
