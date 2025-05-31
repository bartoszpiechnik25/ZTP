import { Button } from "@/shared/components/ui/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  // Always show first page, last page, current page, and 1 page before/after current
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || // First page
      i === totalPages || // Last page
      (i >= currentPage - 1 && i <= currentPage + 1) // Current page and neighbors
    ) {
      pages.push(i);
    } else if ((i === currentPage - 2 && currentPage > 3) || (i === currentPage + 2 && currentPage < totalPages - 2)) {
      // Add ellipsis
      pages.push(-i); // Negative number indicates ellipsis
    }
  }

  return (
    <div className="flex gap-1">
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} size="sm">
        Prev
      </Button>

      {pages.map((page, index) =>
        page < 0 ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1">
            ...
          </span>
        ) : (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
          >
            {page}
          </Button>
        )
      )}

      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} size="sm">
        Next
      </Button>
    </div>
  );
};
