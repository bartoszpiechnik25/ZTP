import aiStars from "@/assets/svg/ai-stars.svg";
import { useTheme } from "@/app/providers/ThemeProvider";
import { cn } from "@/shared/utils/shadcn";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";

const AiTooltip = ({ iconClassName }: { iconClassName?: string }) => {
  const { theme } = useTheme();
  return (
    <Tooltip>
      <TooltipTrigger>
        <img
          src={aiStars}
          alt="AI categorization indicator"
          className={cn("h-4 w-4 mx-1", iconClassName, theme === "dark" ? "white-svg" : "black-svg")}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>Documents are categorized by type using AI</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default AiTooltip;
