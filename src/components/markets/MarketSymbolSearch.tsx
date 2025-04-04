
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AnimatedCard } from "@/components/ui/animated-card";
import { motion } from "framer-motion";

// Mock stock data
const allStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 187.68, change: 1.23, changePercent: 0.66 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 419.72, change: 3.52, changePercent: 0.85 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 175.98, change: -0.87, changePercent: -0.49 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 182.30, change: 1.95, changePercent: 1.08 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 924.93, change: 15.23, changePercent: 1.68 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 177.31, change: -2.45, changePercent: -1.36 },
  { symbol: "META", name: "Meta Platforms", price: 507.73, change: 6.12, changePercent: 1.22 },
  { symbol: "BRK.B", name: "Berkshire Hathaway", price: 415.48, change: 1.03, changePercent: 0.25 },
  { symbol: "V", name: "Visa Inc.", price: 268.45, change: 2.15, changePercent: 0.81 },
  { symbol: "WMT", name: "Walmart Inc.", price: 68.92, change: 0.34, changePercent: 0.50 },
  { symbol: "BABA", name: "Alibaba Group", price: 78.45, change: -1.32, changePercent: -1.65 },
  { symbol: "TSM", name: "Taiwan Semiconductor", price: 155.87, change: 3.42, changePercent: 2.24 },
];

interface MarketSymbolSearchProps {
  onSelectSymbol: (symbol: string) => void;
  className?: string;
}

const MarketSymbolSearch: React.FC<MarketSymbolSearchProps> = ({ 
  onSelectSymbol,
  className 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof allStocks>([]);
  const [showResults, setShowResults] = useState(false);
  
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredResults = allStocks.filter(
        stock => 
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
          stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);
  
  const handleSelectStock = (symbol: string) => {
    onSelectSymbol(symbol);
    setSearchQuery("");
    setShowResults(false);
  };
  
  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for stocks..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowResults(true)}
        />
      </div>
      
      {showResults && (
        <AnimatedCard className="absolute z-50 mt-1 w-full max-h-[300px] overflow-auto p-2 shadow-lg">
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((stock) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                  onClick={() => handleSelectStock(stock.symbol)}
                >
                  <div>
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono">${stock.price.toFixed(2)}</div>
                    <div className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                      {stock.change >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-2 px-4 text-muted-foreground">No results found</div>
          )}
        </AnimatedCard>
      )}
    </div>
  );
};

export default MarketSymbolSearch;
