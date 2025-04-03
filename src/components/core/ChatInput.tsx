
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSubmit?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const ChatInput = ({ 
  onSubmit, 
  className,
  placeholder = "Type your answer here..."
}: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && onSubmit) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col gap-1">
        <label className="text-sm flex items-center gap-2">
          <span className="inline-block bg-primary text-white text-xs px-1 rounded">1</span>
          What is your name?
        </label>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="bg-secondary/50 border-border/40 focus-visible:ring-primary"
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            OK
          </Button>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" className="text-xs">
            Previous
          </Button>
          <Button type="button" variant="outline" size="sm" className="text-xs">
            Skip
          </Button>
        </div>
        <Button type="button" className="text-xs bg-primary hover:bg-primary/90">
          Continue to Tashirio <Send className="ml-1 w-3 h-3" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
