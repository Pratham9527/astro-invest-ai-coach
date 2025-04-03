
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Home,
  MessageSquare,
  TrendingUp,
  LineChart,
  Book,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/ModeToggle";

interface AppLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: MessageSquare, label: "AI Coach", path: "/coach" },
  { icon: TrendingUp, label: "Markets", path: "/markets" },
  { icon: LineChart, label: "Portfolio", path: "/portfolio" },
  { icon: Book, label: "Learn", path: "/learn" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full overflow-hidden">
        <Sidebar className="border-r border-border/40">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-button-gradient animate-pulse-slow"></div>
              <h1 className="text-xl font-bold text-gradient">Astro<span className="text-foreground">Invest</span></h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <a href={item.path} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-border/40">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
                <ModeToggle />
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium">JS</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Smith</span>
                  <span className="text-xs text-muted-foreground">Free Plan</span>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
