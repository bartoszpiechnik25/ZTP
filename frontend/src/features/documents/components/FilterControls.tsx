import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/Select";
import { Filter, X } from "lucide-react";
import AiTooltip from "@/features/documents/components/AiTooltip";
import { useDocument } from "@/features/documents/hooks/useDocument";

interface FilterControlsProps {
  selectedCategory: string;
  selectedType: string;
  selectedExtension: string;
  selectedStatus: string;
  onFilterChange: (type: string, value: string) => void;
}

const extensions = ["All", "pdf", "docx", "xlsx"];
const statuses = ["All", "pending", "approved", "rejected"];

export default function FilterControls({
  selectedCategory,
  selectedType,
  selectedExtension,
  selectedStatus,
  onFilterChange,
}: FilterControlsProps) {
  const { documentCategories: categories, documentTypes: types } = useDocument();

  const hasActiveFilters =
    selectedCategory !== "All" || selectedType !== "All" || selectedExtension !== "All" || selectedStatus !== "All";

  const clearAllFilters = () => {
    onFilterChange("category", "All");
    onFilterChange("type", "All");
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

  const getCategoryName = (id: string) => categories.find((c) => c.id === id)?.name || id;
  const getTypeName = (id: string) => types.find((t) => t.id === id)?.name || id;

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
            <SelectItem value="All">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Document Type Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground">Type:</label>
        <Select value={selectedType} onValueChange={(value) => onFilterChange("type", value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {types.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Extension Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-muted-foreground">Extension:</label>
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
              Category: {getCategoryName(selectedCategory)}
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
          {selectedType !== "All" && (
            <Badge variant="outline" className="text-xs">
              Document Type: {getTypeName(selectedType)}
              <Button
                variant="ghost"
                size="icon"
                className="h-3 w-3 ml-1 p-0"
                onClick={() => onFilterChange("type", "All")}
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
