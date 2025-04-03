
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) => {
  return (
    <div className={cn("feature-card flex flex-col gap-3", className)}>
      <div className="text-primary bg-secondary/70 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Button
        variant="link"
        className="text-primary p-0 flex items-center gap-1 w-fit mt-auto hover:gap-2 transition-all"
      >
        Learn more <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default FeatureCard;
