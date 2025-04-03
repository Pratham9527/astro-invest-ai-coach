
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glassEffect?: boolean;
  hoverEffect?: boolean;
  floatAnimation?: boolean;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className, glassEffect = true, hoverEffect = true, floatAnimation = false, ...props }, ref) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hoverEffect) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setPosition({ x, y });
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden relative transition-all duration-300",
          glassEffect && "glass-card",
          hoverEffect && "hover:shadow-xl hover:shadow-primary/10",
          floatAnimation && "animate-float",
          isHovered && hoverEffect && "scale-[1.02]",
          className
        )}
        style={{
          background: isHovered && hoverEffect 
            ? `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(126, 105, 171, 0.15) 0%, rgba(26, 31, 44, 0.05) 50%)` 
            : "",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

export { AnimatedCard };
