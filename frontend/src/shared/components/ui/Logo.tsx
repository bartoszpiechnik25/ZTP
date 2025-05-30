import type { LogoSize } from "@/shared/types/logo";
import { cn } from "@/shared/utils/shadcn";
import { Cat } from "lucide-react";

interface LogoProps {
  containerClassName?: string;
  size?: LogoSize;
  textClassName?: string;
  text?: string;
}

export function Logo({ containerClassName, textClassName, size = "lg", text = "atDoc" }: LogoProps) {
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
    <div className={cn("flex flex-1 flex-row justify-center", containerClassName)}>
      <Cat size={iconSize} />
      <div className={cn(textSize, textClassName)}>{text}</div>
    </div>
  );
}
