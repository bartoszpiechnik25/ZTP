import type { LogoSize } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Cat } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: LogoSize;
  textClassName?: string;
  text?: string;
}

export function Logo({ className, size = "lg", textClassName, text = "atDoc" }: LogoProps) {
  // Size configuration map for icon and text
  const sizeConfig = {
    xs: { icon: 20, text: "text-lg" },
    sm: { icon: 28, text: "text-2xl" },
    md: { icon: 32, text: "text-3xl" },
    lg: { icon: 40, text: "text-4xl" },
    xl: { icon: 48, text: "text-5xl" },
    "2xl": { icon: 56, text: "text-6xl" },
  };

  const { icon: iconSize, text: textSize } = sizeConfig[size];

  return (
    <div className={cn("flex flex-row items-center", className)}>
      <Cat size={iconSize} className="shrink-0" />
      <div className={cn(textSize, textClassName)}>{text}</div>
    </div>
  );
}
