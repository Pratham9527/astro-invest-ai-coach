
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, LineChart, PieChart, Bell } from "lucide-react";
import { motion } from "framer-motion";

// Currency formatter for INR
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <header className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-2"
          >
            Welcome back, John
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground"
          >
            Here's an overview of your investment portfolio and AI-driven insights.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>Portfolio Value</span>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </CardTitle>
                <CardDescription>Current valuation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatCurrency(6468038)}</div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  +2.5% <span className="ml-1 text-muted-foreground">since last week</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>Risk Assessment</span>
                  <LineChart className="h-5 w-5 text-yellow-500" />
                </CardTitle>
                <CardDescription>AI-calculated risk level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Moderate</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Based on market volatility and your preferences
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>Asset Allocation</span>
                  <PieChart className="h-5 w-5 text-blue-500" />
                </CardTitle>
                <CardDescription>Current distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span>Stocks (45%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                    <span>Bonds (30%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Real Estate (15%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Cash (10%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                AI Investment Insights
              </CardTitle>
              <CardDescription>Personalized recommendations based on market analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <h3 className="font-medium mb-2">Rebalancing Opportunity</h3>
                <p className="text-sm text-muted-foreground">Our AI detected that your tech stock allocation is 5% higher than your target. Consider rebalancing to maintain your risk profile.</p>
              </div>
              <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/10">
                <h3 className="font-medium mb-2">Tax-Loss Harvesting</h3>
                <p className="text-sm text-muted-foreground">Sell your underperforming energy sector ETF to offset capital gains and reduce your tax liability by an estimated {formatCurrency(90000)}.</p>
              </div>
              <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
                <h3 className="font-medium mb-2">Market Opportunity Alert</h3>
                <p className="text-sm text-muted-foreground">Recent Fed policy announcements suggest potential growth in healthcare sector. Consider increasing allocation by 2-3%.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Insights
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest portfolio adjustments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <div className="font-medium">Purchased APPL</div>
                    <div className="text-sm text-muted-foreground">10 shares @ {formatCurrency(13673)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(136730)}</div>
                    <div className="text-xs text-muted-foreground">May 15, 2025</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <div className="font-medium">Sold MSFT</div>
                    <div className="text-sm text-muted-foreground">5 shares @ {formatCurrency(30806)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(154030)}</div>
                    <div className="text-xs text-muted-foreground">May 12, 2025</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <div className="font-medium">Purchased VTI</div>
                    <div className="text-sm text-muted-foreground">15 shares @ {formatCurrency(19064)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(285960)}</div>
                    <div className="text-xs text-muted-foreground">May 8, 2025</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Transaction History
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
