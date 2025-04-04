
import React, { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, ArrowUpRight, ArrowDownRight, DollarSign, Percent, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock portfolio data
const portfolioData = {
  totalValue: 85750.42,
  percentChange: 6.23,
  valueChange: 5025.78,
  lastUpdated: "Apr 4, 2025, 2:30 PM",
  
  assets: [
    { name: "Stocks", value: 42500.25, allocation: 49.56, change: 3.8 },
    { name: "Bonds", value: 15725.63, allocation: 18.34, change: 1.2 },
    { name: "Cash", value: 10320.18, allocation: 12.03, change: 0 },
    { name: "ETFs", value: 8462.75, allocation: 9.87, change: 2.5 },
    { name: "Crypto", value: 5825.42, allocation: 6.79, change: -2.1 },
    { name: "Real Estate", value: 2916.19, allocation: 3.41, change: 0.7 },
  ],
  
  holdings: [
    { id: 1, symbol: "AAPL", name: "Apple Inc.", shares: 25, price: 187.68, value: 4692.00, change: 1.23, allocation: 5.47 },
    { id: 2, symbol: "MSFT", name: "Microsoft Corp.", shares: 12, price: 419.72, value: 5036.64, change: 0.85, allocation: 5.87 },
    { id: 3, symbol: "VTI", name: "Vanguard Total Stock Market ETF", shares: 35, price: 258.34, value: 9041.90, change: 0.72, allocation: 10.54 },
    { id: 4, symbol: "BND", name: "Vanguard Total Bond Market ETF", shares: 95, price: 73.16, value: 6950.20, change: 0.25, allocation: 8.1 },
    { id: 5, symbol: "GOOGL", name: "Alphabet Inc.", shares: 18, price: 175.98, value: 3167.64, change: -0.49, allocation: 3.69 },
    { id: 6, symbol: "AMZN", name: "Amazon.com Inc.", shares: 15, price: 182.30, value: 2734.50, change: 1.08, allocation: 3.19 },
    { id: 7, symbol: "BTC", name: "Bitcoin", shares: 0.12, price: 68421.52, value: 8210.58, change: 2.34, allocation: 9.57 },
  ],
  
  performanceHistory: [
    { date: "Apr 2024", value: 75350.21 },
    { date: "May 2024", value: 77825.45 },
    { date: "Jun 2024", value: 79210.87 },
    { date: "Jul 2024", value: 78450.32 },
    { date: "Aug 2024", value: 80125.75 },
    { date: "Sep 2024", value: 79875.41 },
    { date: "Oct 2024", value: 81250.36 },
    { date: "Nov 2024", value: 82785.93 },
    { date: "Dec 2024", value: 83420.82 },
    { date: "Jan 2025", value: 82125.45 },
    { date: "Feb 2025", value: 83975.12 },
    { date: "Mar 2025", value: 84890.56 },
    { date: "Apr 2025", value: 85750.42 },
  ],
};

// Colors for charts
const COLORS = ["#7E69AB", "#6E59A5", "#9b87f5", "#D6BCFA", "#E5DEFF", "#F2FCE2"];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  const handleAddAsset = () => {
    toast({
      title: "Add New Asset",
      description: "Asset addition functionality will be available soon.",
      duration: 3000,
    });
  };
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border/40 rounded-md shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-primary">${Number(payload[0].value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      );
    }
    return null;
  };

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
          <Button onClick={handleAddAsset} className="mt-2 md:mt-0">
            <Plus className="mr-2 h-4 w-4" /> Add Asset
          </Button>
        </div>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-muted-foreground">Total Value</div>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold">${portfolioData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div className={`flex items-center mt-2 ${portfolioData.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {portfolioData.percentChange >= 0 ? (
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                  )}
                  <span>${portfolioData.valueChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="ml-1">({portfolioData.percentChange >= 0 ? '+' : ''}{portfolioData.percentChange}%)</span>
                </div>
                <div className="text-xs text-muted-foreground mt-4">Last updated: {portfolioData.lastUpdated}</div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-muted-foreground">Asset Allocation</div>
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData.assets}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {portfolioData.assets.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-muted-foreground">Performance</div>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioData.performanceHistory.slice(-6)}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#7E69AB" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} />
                      <YAxis domain={['dataMin', 'dataMax']} axisLine={false} tickLine={false} width={40} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="value" stroke="#7E69AB" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Top Holdings</h2>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Holdings</TableHead>
                      <TableHead className="text-right">Allocation</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioData.holdings.slice(0, 5).map((holding) => (
                      <TableRow key={holding.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{holding.symbol}</TableCell>
                        <TableCell>{holding.name}</TableCell>
                        <TableCell className="text-right">${holding.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">${holding.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">{holding.allocation.toFixed(2)}%</TableCell>
                        <TableCell className="text-right">
                          <div className={`flex items-center justify-end ${holding.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {holding.change >= 0 ? (
                              <TrendingUp className="mr-1 h-4 w-4" />
                            ) : (
                              <TrendingDown className="mr-1 h-4 w-4" />
                            )}
                            {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="holdings" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">All Holdings</h2>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Shares</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="text-right">Allocation</TableHead>
                      <TableHead className="text-right">24h Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioData.holdings.map((holding) => (
                      <TableRow key={holding.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{holding.symbol}</TableCell>
                        <TableCell>{holding.name}</TableCell>
                        <TableCell className="text-right">{holding.shares}</TableCell>
                        <TableCell className="text-right">${holding.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">${holding.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">{holding.allocation.toFixed(2)}%</TableCell>
                        <TableCell className="text-right">
                          <div className={`flex items-center justify-end ${holding.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {holding.change >= 0 ? (
                              <TrendingUp className="mr-1 h-4 w-4" />
                            ) : (
                              <TrendingDown className="mr-1 h-4 w-4" />
                            )}
                            {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Historical Performance</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={portfolioData.performanceHistory}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#7E69AB"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Total Return</span>
                      <span className="text-sm font-medium text-green-500">+14.25%</span>
                    </div>
                    <Progress value={14.25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">YTD Return</span>
                      <span className="text-sm font-medium text-green-500">+8.32%</span>
                    </div>
                    <Progress value={8.32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">1-Month Return</span>
                      <span className="text-sm font-medium text-green-500">+1.02%</span>
                    </div>
                    <Progress value={1.02} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Annualized Return</span>
                      <span className="text-sm font-medium text-green-500">+11.78%</span>
                    </div>
                    <Progress value={11.78} className="h-2" />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Risk Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Volatility</span>
                    <span className="text-yellow-500">Medium</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sharpe Ratio</span>
                    <span>1.23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Beta</span>
                    <span>0.85</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Maximum Drawdown</span>
                    <span className="text-red-500">-8.47%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Alpha</span>
                    <span className="text-green-500">2.15%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="allocation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Asset Type Allocation</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData.assets}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                        labelLine={false}
                      >
                        {portfolioData.assets.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Asset Type Breakdown</h2>
                <div className="space-y-4">
                  {portfolioData.assets.map((asset, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{asset.name}</span>
                        <span className="text-sm font-medium">${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({asset.allocation.toFixed(2)}%)</span>
                      </div>
                      <div className="flex items-center">
                        <div 
                          className="h-2 rounded-l-full" 
                          style={{ 
                            width: `${asset.allocation}%`, 
                            backgroundColor: COLORS[index % COLORS.length]
                          }} 
                        />
                        <div className="h-2 bg-muted rounded-r-full" style={{ width: `${100 - asset.allocation}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Target vs. Current Allocation</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Type</TableHead>
                    <TableHead className="text-right">Current</TableHead>
                    <TableHead className="text-right">Target</TableHead>
                    <TableHead className="text-right">Difference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Stocks</TableCell>
                    <TableCell className="text-right">49.56%</TableCell>
                    <TableCell className="text-right">50.00%</TableCell>
                    <TableCell className="text-right text-red-500">-0.44%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bonds</TableCell>
                    <TableCell className="text-right">18.34%</TableCell>
                    <TableCell className="text-right">20.00%</TableCell>
                    <TableCell className="text-right text-red-500">-1.66%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cash</TableCell>
                    <TableCell className="text-right">12.03%</TableCell>
                    <TableCell className="text-right">10.00%</TableCell>
                    <TableCell className="text-right text-green-500">+2.03%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ETFs</TableCell>
                    <TableCell className="text-right">9.87%</TableCell>
                    <TableCell className="text-right">10.00%</TableCell>
                    <TableCell className="text-right text-red-500">-0.13%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Crypto</TableCell>
                    <TableCell className="text-right">6.79%</TableCell>
                    <TableCell className="text-right">5.00%</TableCell>
                    <TableCell className="text-right text-green-500">+1.79%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Real Estate</TableCell>
                    <TableCell className="text-right">3.41%</TableCell>
                    <TableCell className="text-right">5.00%</TableCell>
                    <TableCell className="text-right text-red-500">-1.59%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default Portfolio;
