
import React, { useState, useRef, useEffect } from "react";
import { SendHorizonal, Bot, User, Sparkles, AlertCircle, CheckCircle2, BarChart2, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { AnimatedCard } from "@/components/ui/animated-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  confidenceScore?: number;
  time: string;
  isTyping?: boolean;
}

interface QuickAction {
  icon: React.ElementType;
  label: string;
  prompt: string;
}

const quickActions: QuickAction[] = [
  { 
    icon: BarChart2, 
    label: "Market Overview", 
    prompt: "Give me a quick overview of the current market conditions and trends." 
  },
  { 
    icon: TrendingUp, 
    label: "Investment Strategy", 
    prompt: "What investment strategy would you recommend for a moderate risk tolerance?" 
  },
  { 
    icon: AlertTriangle, 
    label: "Risk Analysis", 
    prompt: "Can you analyze the risks in my current portfolio and suggest improvements?" 
  },
  { 
    icon: Lightbulb, 
    label: "Investment Tips", 
    prompt: "What are some investment tips for a beginner?" 
  },
];

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
  const [displayText, setDisplayText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const formatTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSendMessage = (messageText: string = input) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Automatically scroll to bottom
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      }
    }, 100);

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
        {
          text: "If you're interested in sustainable investing, there are several ESG (Environmental, Social, Governance) focused ETFs that have shown competitive returns compared to traditional investments.",
          confidenceScore: 85,
        },
        {
          text: "I've analyzed your query, and I'd suggest focusing on high-dividend stocks for passive income. Companies with a history of increasing dividends over time often provide stable returns even in volatile markets.",
          confidenceScore: 90,
        },
      ];

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

      const aiMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: randomResponse.text,
        confidenceScore: randomResponse.confidenceScore,
        time: formatTime(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setDisplayText("");
      setMessageIndex(messages.length + 1);
      setCharIndex(0);
      setIsThinking(false);
    }, 2000);
  };

  // Typing effect
  useEffect(() => {
    if (messages.length > 0 && messageIndex < messages.length) {
      const currentMessage = messages[messageIndex];
      
      if (currentMessage.sender === "ai" && currentMessage.isTyping && charIndex < currentMessage.text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + currentMessage.text[charIndex]);
          setCharIndex(charIndex + 1);
          
          // Scroll to bottom as text is typing
          if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
          }
        }, 15); // Speed of typing
        
        return () => clearTimeout(timeout);
      } else if (currentMessage.sender === "ai" && currentMessage.isTyping && charIndex >= currentMessage.text.length) {
        // Update the message to remove the isTyping flag once typing is complete
        setMessages(prev => 
          prev.map((msg, idx) => 
            idx === messageIndex ? { ...msg, isTyping: false } : msg
          )
        );
        setMessageIndex(messageIndex + 1);
        setCharIndex(0);
      }
    }
  }, [messages, messageIndex, charIndex]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
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
        <div className="flex flex-col gap-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
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
                  <div className="text-sm">
                    {message.isTyping && index === messageIndex ? displayText : message.text}
                    {message.isTyping && index === messageIndex && (
                      <span className="inline-flex ml-1">
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="rounded-full h-1 w-1 bg-current mx-[1px]"
                        />
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                          className="rounded-full h-1 w-1 bg-current mx-[1px]"
                        />
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                          className="rounded-full h-1 w-1 bg-current mx-[1px]"
                        />
                      </span>
                    )}
                  </div>
                  {message.confidenceScore && !message.isTyping && (
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
      
      {/* Quick actions */}
      {messages.length < 3 && (
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-xs"
                onClick={() => handleQuickAction(action.prompt)}
              >
                <action.icon className="h-3 w-3" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-4 border-t border-border/40 mt-auto">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about investments, markets, or financial strategies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="bg-card"
          />
          <Button onClick={() => handleSendMessage()} disabled={isThinking || !input.trim()}>
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
