import { cn } from "@/shared/utils/shadcn";
import { LoaderCircle } from "lucide-react";

interface LoadingSpinnerProps {
  /**
   * Whether to show the indicator (true) or hide it (false).
   * @default true
   */
  animating?: boolean;

  /**
   * The foreground color of the spinner.
   * @default '#999999'
   */
  color?: string;

  /**
   * Whether the indicator should hide when not animating.
   * @default true
   */
  hidesWhenStopped?: boolean;

  /**
   * Size of the indicator.
   * @default 24
   */
  size?: number;

  /**
   * Additional class names to apply to the spinner.
   */
  className?: string;
}

/**
 * A loading spinner component that displays a circular loading indicator.
 * It can be customized with color, size, and animation state.
 * It hides when not animating if `hidesWhenStopped` is true.
 * @param {LoadingSpinnerProps} props - The properties for the loading spinner.
 * @return {JSX.Element | undefined} The loading spinner element or undefined if not animating and hidesWhenStopped is true.
 * @example
 * ```jsx
 * <LoadingSpinner animating={true} color="#ff0000" size={32} />
 * ```
 */
const LoadingSpinner = ({
  animating = true,
  color,
  hidesWhenStopped = true,
  size = 24,
  className,
  ...props
}: LoadingSpinnerProps) => {
  if (!animating && hidesWhenStopped) {
    return;
  }

  return (
    <LoaderCircle
      className={cn(
        "animate-[spin_0.5s_linear_infinite] mx-auto",
        !animating && "animate-none",
        !color && "stroke-primary",
        className
      )}
      color={color}
      size={size}
      {...props}
    />
  );
};

export default LoadingSpinner;
