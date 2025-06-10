import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/Select";
import { Filter, X } from "lucide-react";
import AiTooltip from "@/features/documents/components/AiTooltip";

interface FilterControlsProps {
  categories: string[];
  extensions: string[];
  statuses: string[];
  selectedCategory: string;
  selectedExtension: string;
  selectedStatus: string;
  onFilterChange: (type: string, value: string) => void;
}

export default function FilterControls({
  categories,
  extensions,
  statuses,
  selectedCategory,
  selectedExtension,
  selectedStatus,
  onFilterChange,
}: FilterControlsProps) {
  const hasActiveFilters = selectedCategory !== "All" || selectedExtension !== "All" || selectedStatus !== "All";

  const clearAllFilters = () => {
    onFilterChange("category", "All");
    onFilterChange("extension", "All");
    onFilterChange("status", "All");
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategory !== "All") count++;
    if (selectedExtension !== "All") count++;
    if (selectedStatus !== "All") count++;
    return count;
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Filters:</span>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground flex items-center">
          Category
          <AiTooltip />:
        </label>
        <Select value={selectedCategory} onValueChange={(value) => onFilterChange("category", value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Extension Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground">Type:</label>
        <Select value={selectedExtension} onValueChange={(value) => onFilterChange("extension", value)}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {extensions.map((extension) => (
              <SelectItem key={extension} value={extension}>
                {extension === "All" ? "All" : extension.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground">Status:</label>
        <Select value={selectedStatus} onValueChange={(value) => onFilterChange("status", value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "All" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters and Clear */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 ml-auto">
          <Badge variant="secondary" className="text-xs">
            {getActiveFilterCount()} filter{getActiveFilterCount() === 1 ? "" : "s"} active
          </Badge>
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2 text-xs">
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        </div>
      )}

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1 w-full mt-2">
          {selectedCategory !== "All" && (
            <Badge variant="outline" className="text-xs">
              Category: {selectedCategory}
              <Button
                variant="ghost"
                size="icon"
                className="h-3 w-3 ml-1 p-0"
                onClick={() => onFilterChange("category", "All")}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
          {selectedExtension !== "All" && (
            <Badge variant="outline" className="text-xs">
              Type: {selectedExtension.toUpperCase()}
              <Button
                variant="ghost"
                size="icon"
                className="h-3 w-3 ml-1 p-0"
                onClick={() => onFilterChange("extension", "All")}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
          {selectedStatus !== "All" && (
            <Badge variant="outline" className="text-xs">
              Status: {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
              <Button
                variant="ghost"
                size="icon"
                className="h-3 w-3 ml-1 p-0"
                onClick={() => onFilterChange("status", "All")}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
