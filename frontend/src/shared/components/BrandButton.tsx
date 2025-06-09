import React from "react";
import { Button, buttonVariants } from "@/shared/components/ui/Button";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/shadcn";

interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /**
   * The text content of the button.
   */
  label?: React.ReactNode;

  /**
   * Icon to display on the left side of the button.
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side of the button.
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether the button is in a loading state.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Size of the loading spinner.
   * @default 18
   */
  spinnerSize?: number;

  /**
   * Whether to render the component as a child element.
   * @default false
   */
  asChild?: boolean;
}

/**
 * A reusable brand button component that extends the base Button functionality
 * with support for loading states, left/right icons, and a label.
 */
const BrandButton = ({
  label,
  leftIcon,
  rightIcon,
  isLoading = false,
  spinnerSize = 18,
  variant = "default",
  size = "default",
  className,
  asChild = false,
  disabled,
  onClick,
  ...props
}: BrandButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className, "cursor-pointer")}
      asChild={asChild}
      disabled={isLoading || disabled}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner size={spinnerSize} className="animate-spin stroke-primary-foreground" />
      ) : (
        <>
          {leftIcon}
          {label}
          {rightIcon}
        </>
      )}
    </Button>
  );
};

export default BrandButton;
