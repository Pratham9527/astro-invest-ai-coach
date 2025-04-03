
import React, { useState } from "react";
import { SendHorizonal, Bot, User, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { AnimatedCard } from "@/components/ui/animated-card";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  confidenceScore?: number;
  time: string;
}

const initMessages: Message[] = [
  {
    id: "1",
    sender: "ai",
    text: "Hello! I'm your AI investment coach. How can I help you today? You can ask me about investment strategies, market trends, or risk management.",
    time: new Date().toLocaleTimeString(),
  },
];

const AIChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const formatTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const mockResponses = [
        {
          text: "Based on your risk profile and market conditions, I recommend considering a diversified ETF that tracks the S&P 500. This provides broad market exposure with lower fees than actively managed funds.",
          confidenceScore: 92,
        },
        {
          text: "For your retirement goals, a mix of index funds and bonds could provide the right balance of growth and stability. Consider allocating 70% to equity index funds and 30% to bond funds based on your time horizon.",
          confidenceScore: 87,
        },
        {
          text: "The current market volatility suggests maintaining liquidity. Consider dollar-cost averaging into the market rather than investing a lump sum all at once.",
          confidenceScore: 78,
        },
      ];

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

      const aiMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: randomResponse.text,
        confidenceScore: randomResponse.confidenceScore,
        time: formatTime(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border/40">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Investment Coach
        </h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <AnimatedCard
              key={message.id}
              className={cn(
                "max-w-[80%] p-4",
                message.sender === "user" 
                  ? "ml-auto bg-primary/10" 
                  : "mr-auto bg-card-gradient"
              )}
              glassEffect={message.sender === "ai"}
              hoverEffect={false}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  message.sender === "user" 
                    ? "bg-background" 
                    : "bg-primary/20"
                )}>
                  {message.sender === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm">{message.text}</div>
                  {message.confidenceScore && (
                    <div className="flex items-center mt-2">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        {message.confidenceScore >= 85 ? (
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                        ) : message.confidenceScore >= 70 ? (
                          <CheckCircle2 className="h-3 w-3 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-orange-500" />
                        )}
                        <span>Confidence: {message.confidenceScore}%</span>
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">{message.time}</div>
                </div>
              </div>
            </AnimatedCard>
          ))}
          
          {isThinking && (
            <AnimatedCard className="max-w-[80%] p-4 mr-auto bg-card-gradient">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </AnimatedCard>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-border/40 mt-auto">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about investments, markets, or financial strategies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="bg-card"
          />
          <Button onClick={handleSendMessage} disabled={isThinking || !input.trim()}>
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
