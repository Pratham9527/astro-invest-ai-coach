import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import MarketChart from "@/components/markets/MarketChart";
import MarketInsights from "@/components/markets/MarketInsights";
import MarketSymbolSearch from "@/components/markets/MarketSymbolSearch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Percent, ChevronDown, ChevronUp, Info } from "lucide-react";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// Top stocks mock data
const topStocks = [
  { id: 1, symbol: "AAPL", name: "Apple Inc.", price: 187.68, change: 1.23, changePercent: 0.66, volume: "32.4M" },
  { id: 2, symbol: "MSFT", name: "Microsoft Corp.", price: 419.72, change: 3.52, changePercent: 0.85, volume: "28.7M" },
  { id: 3, symbol: "GOOGL", name: "Alphabet Inc.", price: 175.98, change: -0.87, changePercent: -0.49, volume: "19.2M" },
  { id: 4, symbol: "AMZN", name: "Amazon.com Inc.", price: 182.30, change: 1.95, changePercent: 1.08, volume: "22.1M" },
  { id: 5, symbol: "NVDA", name: "NVIDIA Corp.", price: 924.93, change: 15.23, changePercent: 1.68, volume: "40.3M" },
  { id: 6, symbol: "TSLA", name: "Tesla Inc.", price: 177.31, change: -2.45, changePercent: -1.36, volume: "35.8M" },
  { id: 7, symbol: "META", name: "Meta Platforms", price: 507.73, change: 6.12, changePercent: 1.22, volume: "18.9M" },
  { id: 8, symbol: "BRK.B", name: "Berkshire Hathaway", price: 415.48, change: 1.03, changePercent: 0.25, volume: "4.2M" },
];

// Mock market indices
const marketIndices = [
  { name: "S&P 500", value: "4,783.45", change: "+0.74%", trend: "up" },
  { name: "Dow Jones", value: "38,677.36", change: "+0.40%", trend: "up" },
  { name: "NASDAQ", value: "15,186.53", change: "+1.23%", trend: "up" },
  { name: "Russell 2000", value: "2,052.11", change: "-0.22%", trend: "down" },
];

// Mock crypto data
const cryptoData = [
  { id: 1, name: "Bitcoin (BTC)", price: 68421.52, change: 2.34, marketCap: "1.34T", volume: "32.1B" },
  { id: 2, name: "Ethereum (ETH)", price: 3892.17, change: 3.15, marketCap: "467.8B", volume: "18.7B" },
  { id: 3, name: "Solana (SOL)", price: 156.34, change: -1.23, marketCap: "67.3B", volume: "3.2B" },
  { id: 4, name: "Cardano (ADA)", price: 0.46, change: 0.89, marketCap: "16.2B", volume: "412.5M" },
  { id: 5, name: "Binance Coin (BNB)", price: 598.72, change: 1.45, marketCap: "92.8B", volume: "2.1B" },
];

// Mock forex data
const forexData = [
  { id: 1, pair: "EUR/USD", rate: 1.0932, change: -0.12, dayLow: 1.0928, dayHigh: 1.0953 },
  { id: 2, pair: "USD/JPY", rate: 149.37, change: 0.25, dayLow: 148.95, dayHigh: 149.42 },
  { id: 3, pair: "GBP/USD", rate: 1.2753, change: -0.08, dayLow: 1.2749, dayHigh: 1.2789 },
  { id: 4, pair: "USD/CAD", rate: 1.3542, change: 0.15, dayLow: 1.3522, dayHigh: 1.3551 },
  { id: 5, pair: "AUD/USD", rate: 0.6573, change: -0.22, dayLow: 0.6568, dayHigh: 0.6598 },
];

// Mock commodities data
const commoditiesData = [
  { id: 1, name: "Gold", price: 2341.20, change: 0.85, unit: "per oz" },
  { id: 2, name: "Silver", price: 29.72, change: 1.23, unit: "per oz" },
  { id: 3, name: "Crude Oil (WTI)", price: 77.85, change: -0.42, unit: "per barrel" },
  { id: 4, name: "Natural Gas", price: 2.37, change: 1.72, unit: "per MMBtu" },
  { id: 5, name: "Copper", price: 4.28, change: -0.32, unit: "per lb" },
];

const Markets = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL"); 
  const [stockDetails, setStockDetails] = useState<{ open: boolean, id: number | null }>({ open: false, id: null });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  
  // Interactive features
  const handleSelectSymbol = (symbol: string) => {
    setSelectedSymbol(symbol);
    toast({
      title: "Symbol Selected",
      description: `You've selected ${symbol}. Chart data has been updated.`,
      duration: 3000,
    });
  };
  
  const toggleStockDetails = (id: number) => {
    if (stockDetails.id === id) {
      setStockDetails({ open: !stockDetails.open, id });
    } else {
      setStockDetails({ open: true, id });
    }
  };
  
  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Market data has been updated with the latest information.",
        duration: 3000,
      });
    }, 1000);
  };
  
  // Filter stocks by selected symbol for the chart
  const selectedStock = topStocks.find(stock => stock.symbol === selectedSymbol) || topStocks[0];
  
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 md:p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">Markets</h1>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <MarketSymbolSearch onSelectSymbol={handleSelectSymbol} className="w-full md:w-64" />
            <Badge 
              variant={isRefreshing ? "active" : "interactive"} 
              onClick={handleRefreshData}
              className="ml-2"
            >
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </Badge>
          </div>
        </div>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <MarketChart 
                      title={`${selectedStock.name} (${selectedStock.symbol})`} 
                      className="h-full" 
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <MarketInsights className="h-full" />
                  </div>
                </div>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-card/30">
                    <CardTitle>Market Movers</CardTitle>
                    <CardDescription>Top performing stocks in the market today</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Change</TableHead>
                            <TableHead className="text-right">Volume</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topStocks.map((stock) => (
                            <React.Fragment key={stock.id}>
                              <TableRow 
                                className="cursor-pointer hover:bg-muted/50"
                                onClick={() => toggleStockDetails(stock.id)}
                              >
                                <TableCell className="font-medium">
                                  {stock.symbol}
                                  {selectedSymbol === stock.symbol && (
                                    <Badge variant="interactive" className="ml-2 bg-primary/20">Selected</Badge>
                                  )}
                                </TableCell>
                                <TableCell>{stock.name}</TableCell>
                                <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                  <div className={`flex items-center justify-end ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {stock.change >= 0 ? (
                                      <TrendingUp className="mr-1 h-4 w-4" />
                                    ) : (
                                      <TrendingDown className="mr-1 h-4 w-4" />
                                    )}
                                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                                    <span className="ml-1 text-xs">({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">{stock.volume}</TableCell>
                                <TableCell className="text-right">
                                  <Badge 
                                    variant="interactive" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectSymbol(stock.symbol);
                                    }}
                                  >
                                    View Chart
                                  </Badge>
                                  {stockDetails.open && stockDetails.id === stock.id ? (
                                    <ChevronUp className="ml-2 h-4 w-4 inline" />
                                  ) : (
                                    <ChevronDown className="ml-2 h-4 w-4 inline" />
                                  )}
                                </TableCell>
                              </TableRow>
                              
                              {stockDetails.open && stockDetails.id === stock.id && (
                                <TableRow>
                                  <TableCell colSpan={6} className="p-0">
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="bg-muted/30 p-4"
                                    >
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                          <h4 className="font-semibold mb-2">Company Overview</h4>
                                          <p className="text-sm text-muted-foreground">
                                            {stock.name} ({stock.symbol}) is a leading company in its industry. 
                                            View detailed financial information and performance metrics.
                                          </p>
                                        </div>
                                        <div>
                                          <h4 className="font-semibold mb-2">Key Statistics</h4>
                                          <div className="grid grid-cols-2 gap-2">
                                            <div className="text-sm">Market Cap:</div>
                                            <div className="text-sm font-medium text-right">$1.25T</div>
                                            <div className="text-sm">P/E Ratio:</div>
                                            <div className="text-sm font-medium text-right">32.5</div>
                                            <div className="text-sm">52-Week High:</div>
                                            <div className="text-sm font-medium text-right">${(stock.price * 1.2).toFixed(2)}</div>
                                            <div className="text-sm">52-Week Low:</div>
                                            <div className="text-sm font-medium text-right">${(stock.price * 0.8).toFixed(2)}</div>
                                          </div>
                                        </div>
                                        <div className="flex flex-col">
                                          <h4 className="font-semibold mb-2">Quick Actions</h4>
                                          <div className="space-y-2">
                                            <Badge 
                              variant="interactive" 
                              onClick={() => {
                                toast({
                                  title: "Analysis Downloaded",
                                  description: `${stock.symbol} analysis report has been downloaded.`,
                                });
                              }}
                            >
                              Download Analysis
                            </Badge>
                                            <Badge variant="interactive" className="w-full justify-center" onClick={() => {
                                              toast({
                                                title: "Added to Watchlist",
                                                description: `${stock.symbol} has been added to your watchlist.`,
                                              });
                                            }}>
                                              Add to Watchlist
                                            </Badge>
                                            <Badge variant="interactive" className="w-full justify-center" onClick={() => {
                                              handleSelectSymbol(stock.symbol);
                                            }}>
                                              View Full Chart
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
          
              <TabsContent value="stocks" className="space-y-6">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Stock Market Indices</CardTitle>
                    <CardDescription>Major global market indices performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {marketIndices.map((index) => (
                        <TooltipProvider key={index.name}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Card className="bg-card p-4 rounded-lg border border-border/40 cursor-pointer hover:bg-muted/20 transition-colors">
                                <div className="text-muted-foreground text-sm mb-1">{index.name}</div>
                                <div className="text-xl font-bold">{index.value}</div>
                                <div className={`flex items-center ${index.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                  {index.trend === 'up' ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                                  {index.change}
                                </div>
                              </Card>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click to view detailed {index.name} chart</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Stocks Watchlist</h3>
                      <MarketSymbolSearch onSelectSymbol={handleSelectSymbol} className="w-64" />
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Change</TableHead>
                          <TableHead className="text-right">Volume</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topStocks.map((stock) => (
                          <TableRow key={stock.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleSelectSymbol(stock.symbol)}>
                            <TableCell className="font-medium">{stock.symbol}</TableCell>
                            <TableCell>{stock.name}</TableCell>
                            <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <div className={`flex items-center justify-end ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {stock.change >= 0 ? (
                                  <TrendingUp className="mr-1 h-4 w-4" />
                                ) : (
                                  <TrendingDown className="mr-1 h-4 w-4" />
                                )}
                                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                                <span className="ml-1 text-xs">({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{stock.volume}</TableCell>
                            <TableCell className="text-right">
                              <Badge 
                                variant="interactive" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast({
                                    title: "Added to Watchlist",
                                    description: `${stock.symbol} has been added to your watchlist.`,
                                  });
                                }}
                              >
                                Add to Watchlist
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
          
              <TabsContent value="crypto">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Cryptocurrency Market</CardTitle>
                    <CardDescription>Real-time cryptocurrency prices and performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">24h Change</TableHead>
                          <TableHead className="text-right">Market Cap</TableHead>
                          <TableHead className="text-right">Volume (24h)</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cryptoData.map((crypto) => (
                          <TableRow key={crypto.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-medium">{crypto.name}</TableCell>
                            <TableCell className="text-right">${crypto.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <div className={`flex items-center justify-end ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {crypto.change >= 0 ? (
                                  <TrendingUp className="mr-1 h-4 w-4" />
                                ) : (
                                  <TrendingDown className="mr-1 h-4 w-4" />
                                )}
                                {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${crypto.marketCap}</TableCell>
                            <TableCell className="text-right">${crypto.volume}</TableCell>
                            <TableCell className="text-right">
                              <Badge 
                                variant="interactive" 
                                onClick={() => {
                                  toast({
                                    title: "Crypto Details",
                                    description: `Viewing detailed information for ${crypto.name}.`,
                                  });
                                }}
                              >
                                View Details
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
          
              <TabsContent value="forex">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Forex Market</CardTitle>
                    <CardDescription>Foreign exchange rates and currency pairs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pair</TableHead>
                          <TableHead className="text-right">Rate</TableHead>
                          <TableHead className="text-right">Change</TableHead>
                          <TableHead className="text-right">Day Range</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {forexData.map((forex) => (
                          <TableRow key={forex.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-medium">{forex.pair}</TableCell>
                            <TableCell className="text-right">{forex.rate.toFixed(4)}</TableCell>
                            <TableCell className="text-right">
                              <div className={`flex items-center justify-end ${forex.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {forex.change >= 0 ? (
                                  <TrendingUp className="mr-1 h-4 w-4" />
                                ) : (
                                  <TrendingDown className="mr-1 h-4 w-4" />
                                )}
                                {forex.change >= 0 ? '+' : ''}{forex.change.toFixed(2)}%
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{forex.dayLow.toFixed(4)} - {forex.dayHigh.toFixed(4)}</TableCell>
                            <TableCell className="text-right">
                              <Badge 
                                variant="interactive" 
                                onClick={() => {
                                  toast({
                                    title: "Forex Alert Set",
                                    description: `Alert set for ${forex.pair} at ${forex.rate.toFixed(4)}.`,
                                  });
                                }}
                              >
                                Set Alert
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
          
              <TabsContent value="commodities">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Commodities Market</CardTitle>
                    <CardDescription>Global commodities prices and performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commodity</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Change</TableHead>
                          <TableHead className="text-right">Unit</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {commoditiesData.map((commodity) => (
                          <TableRow key={commodity.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-medium">{commodity.name}</TableCell>
                            <TableCell className="text-right">${commodity.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <div className={`flex items-center justify-end ${commodity.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {commodity.change >= 0 ? (
                                  <TrendingUp className="mr-1 h-4 w-4" />
                                ) : (
                                  <TrendingDown className="mr-1 h-4 w-4" />
                                )}
                                {commodity.change >= 0 ? '+' : ''}{commodity.change.toFixed(2)}%
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{commodity.unit}</TableCell>
                            <TableCell className="text-right">
                              <Badge 
                                variant="interactive" 
                                onClick={() => {
                                  toast({
                                    title: "Commodity History",
                                    description: `Viewing historical data for ${commodity.name}.`,
                                  });
                                }}
                              >
                                View History
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default Markets;
