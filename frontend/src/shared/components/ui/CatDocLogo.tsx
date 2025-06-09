import { H2 } from "@/shared/components/ui/typography/Headings";
import { cn } from "@/shared/utils/shadcn";
import { Cat } from "lucide-react";

interface LogoProps {
  containerClassName?: string;
  iconSize?: number;
  textClassName?: string;
  text?: string;
}

export function CatDocLogo({ containerClassName, textClassName, iconSize = 36, text = "CatDoc" }: LogoProps) {
  return (
    <div className={cn("flex", containerClassName)}>
      <Cat size={iconSize} />
      <H2 className={cn(textClassName, "p-0 border-0")}>{text}</H2>
    </div>
  );
}
