import { cn } from "@/shared/utils/shadcn";

interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
  className?: string;
}

export function Blockquote({ children, className, ...props }: BlockquoteProps) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props}>
      {children}
    </blockquote>
  );
}
