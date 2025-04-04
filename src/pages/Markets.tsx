
import React, { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import MarketChart from "@/components/markets/MarketChart";
import MarketInsights from "@/components/markets/MarketInsights";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Percent } from "lucide-react";

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

const Markets = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 md:p-6"
      >
        <h1 className="text-2xl font-bold mb-6">Markets</h1>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MarketChart title="S&P 500 Index" className="h-full" />
              </div>
              <div className="lg:col-span-1">
                <MarketInsights className="h-full" />
              </div>
            </div>
            
            <div className="bg-card/30 rounded-xl border border-border/40 p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Top Movers</h2>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topStocks.map((stock) => (
                      <TableRow key={stock.id} className="cursor-pointer hover:bg-muted/50">
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stocks" className="space-y-6">
            <div className="bg-card/30 rounded-xl border border-border/40 p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Stock Market Indices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { name: "S&P 500", value: "4,783.45", change: "+0.74%", trend: "up" },
                  { name: "Dow Jones", value: "38,677.36", change: "+0.40%", trend: "up" },
                  { name: "NASDAQ", value: "15,186.53", change: "+1.23%", trend: "up" },
                  { name: "Russell 2000", value: "2,052.11", change: "-0.22%", trend: "down" },
                ].map((index) => (
                  <div key={index.name} className="bg-card p-4 rounded-lg border border-border/40">
                    <div className="text-muted-foreground text-sm mb-1">{index.name}</div>
                    <div className="text-xl font-bold">{index.value}</div>
                    <div className={`flex items-center ${index.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {index.trend === 'up' ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                      {index.change}
                    </div>
                  </div>
                ))}
              </div>
              
              <h2 className="text-lg font-semibold mb-4">Stocks Watchlist</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topStocks.map((stock) => (
                    <TableRow key={stock.id} className="cursor-pointer hover:bg-muted/50">
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="crypto">
            <div className="bg-card/30 rounded-xl border border-border/40 p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Cryptocurrency Market</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">24h Change</TableHead>
                    <TableHead className="text-right">Market Cap</TableHead>
                    <TableHead className="text-right">Volume (24h)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, name: "Bitcoin (BTC)", price: 68421.52, change: 2.34, marketCap: "1.34T", volume: "32.1B" },
                    { id: 2, name: "Ethereum (ETH)", price: 3892.17, change: 3.15, marketCap: "467.8B", volume: "18.7B" },
                    { id: 3, name: "Solana (SOL)", price: 156.34, change: -1.23, marketCap: "67.3B", volume: "3.2B" },
                    { id: 4, name: "Cardano (ADA)", price: 0.46, change: 0.89, marketCap: "16.2B", volume: "412.5M" },
                    { id: 5, name: "Binance Coin (BNB)", price: 598.72, change: 1.45, marketCap: "92.8B", volume: "2.1B" },
                  ].map((crypto) => (
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="forex">
            <div className="bg-card/30 rounded-xl border border-border/40 p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Forex Market</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pair</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead className="text-right">Day Range</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, pair: "EUR/USD", rate: 1.0932, change: -0.12, dayLow: 1.0928, dayHigh: 1.0953 },
                    { id: 2, pair: "USD/JPY", rate: 149.37, change: 0.25, dayLow: 148.95, dayHigh: 149.42 },
                    { id: 3, pair: "GBP/USD", rate: 1.2753, change: -0.08, dayLow: 1.2749, dayHigh: 1.2789 },
                    { id: 4, pair: "USD/CAD", rate: 1.3542, change: 0.15, dayLow: 1.3522, dayHigh: 1.3551 },
                    { id: 5, pair: "AUD/USD", rate: 0.6573, change: -0.22, dayLow: 0.6568, dayHigh: 0.6598 },
                  ].map((forex) => (
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="commodities">
            <div className="bg-card/30 rounded-xl border border-border/40 p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Commodities Market</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Commodity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead className="text-right">Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, name: "Gold", price: 2341.20, change: 0.85, unit: "per oz" },
                    { id: 2, name: "Silver", price: 29.72, change: 1.23, unit: "per oz" },
                    { id: 3, name: "Crude Oil (WTI)", price: 77.85, change: -0.42, unit: "per barrel" },
                    { id: 4, name: "Natural Gas", price: 2.37, change: 1.72, unit: "per MMBtu" },
                    { id: 5, name: "Copper", price: 4.28, change: -0.32, unit: "per lb" },
                  ].map((commodity) => (
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default Markets;
