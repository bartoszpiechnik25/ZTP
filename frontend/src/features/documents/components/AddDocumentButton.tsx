import { Button } from "@/shared/components/ui/Button";
import { Plus } from "lucide-react";

interface AddDocumentButtonProps {
  onClick: () => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

export default function AddDocumentButton({ onClick, variant = "default", size = "default" }: AddDocumentButtonProps) {
  return (
    <Button onClick={onClick} variant={variant} size={size} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Document
    </Button>
  );
}
