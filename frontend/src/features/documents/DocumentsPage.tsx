import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Grid, List, Trash2, Loader2, FileIcon } from "lucide-react"; // Added Loader2
import { useNavigate } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/Tabs";
import AddDocumentButton from "@/features/documents/components/AddDocumentButton";
import AddDocumentModal from "@/features/documents/components/AddDocumentModal";
import ConfirmDeleteModal from "@/features/documents/components/ConfirmDeleteModal";
import DocumentGrid from "@/features/documents/components/DocumentGrid";
import DocumentList from "@/features/documents/components/DocumentList";
import FilterControls from "@/features/documents/components/FilterControls";
import PaginationControls from "@/features/documents/components/PaginationControls";
import SearchBar from "@/features/documents/components/SearchBar";
import { useDocument } from "@/features/documents/hooks/useDocument";
import type { DocumentExtension, DocumentStatus } from "@/features/documents/types";

export default function DocumentsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    category: string;
    type: string;
    extension: DocumentExtension;
    status: DocumentStatus;
  }>({
    category: "All",
    type: "All",
    extension: "All",
    status: "All",
  });
  const { userDocuments: documents = [], isUserDocumentsLoading } = useDocument();

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.notes?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = filters.category === "All" || doc.category === filters.category;
      const matchesType = filters.type === "All" || doc.type === filters.type;
      const matchesExtension = filters.extension === "All" || doc.extension === filters.extension;
      const matchesStatus = filters.status === "All" || doc.status === filters.status;

      return matchesSearch && matchesCategory && matchesType && matchesExtension && matchesStatus;
    });
  }, [documents, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handleDocumentSelect = useCallback((documentId: string, selected: boolean) => {
    setSelectedDocuments((prev) => (selected ? [...prev, documentId] : prev.filter((id) => id !== documentId)));
  }, []);

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      setSelectedDocuments(selected ? paginatedDocuments.map((doc) => doc.id) : []);
    },
    [paginatedDocuments]
  );

  const handleDeleteSelected = useCallback(() => {
    if (selectedDocuments.length > 0) {
      setIsDeleteModalOpen(true);
    }
  }, [selectedDocuments]);

  const confirmDelete = useCallback(() => {
    // TODO: Implement delete mutation with react-query
    // create a deleteDocumentsMutation(selectedDocuments)
    // onSuccess: queryClient.invalidateQueries(['userDocuments'])
    console.log("Deleting documents:", selectedDocuments);
    setSelectedDocuments([]);
    setIsDeleteModalOpen(false);
  }, [selectedDocuments]); // queryClient should be a dependency if used

  const handleDocumentClick = useCallback(
    (documentId: string) => {
      navigate(`/app/documents/${documentId}`);
    },
    [navigate]
  );

  const handleAddDocument = () => {
    setIsAddModalOpen(false);
    setSearchQuery("");
    setFilters({ category: "All", type: "All", extension: "All", status: "All" });
    setCurrentPage(1);
  };

  if (isUserDocumentsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading documents...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Manage your document collection ({filteredDocuments.length} of {documents.length} total documents)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AddDocumentButton onClick={() => setIsAddModalOpen(true)} />
          {selectedDocuments.length > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedDocuments.length})
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <SearchBar onSearch={handleSearch} />
            <FilterControls
              selectedCategory={filters.category}
              selectedType={filters.type}
              selectedExtension={filters.extension}
              selectedStatus={filters.status}
              onFilterChange={handleFilterChange}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{filteredDocuments.length} results</Badge>
          {searchQuery && <Badge variant="secondary">Search: "{searchQuery}"</Badge>}
        </div>
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "grid")}>
          <TabsList>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-2" /> List
            </TabsTrigger>
            <TabsTrigger value="grid">
              <Grid className="h-4 w-4 mr-2" /> Grid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {paginatedDocuments.length === 0 && !isUserDocumentsLoading ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-10 space-y-2">
                <FileIcon className="h-16 w-16 mx-auto text-muted-foreground/50" />
                <p className="text-xl font-medium text-muted-foreground">No documents found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria, or add a new document.
                </p>
                <Button onClick={() => setIsAddModalOpen(true)} className="mt-4">
                  Add Document
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {viewMode === "list" ? (
              <DocumentList
                documents={paginatedDocuments}
                selectedDocuments={selectedDocuments}
                onDocumentSelect={handleDocumentSelect}
                onSelectAll={handleSelectAll}
                onDocumentClick={handleDocumentClick}
              />
            ) : (
              <DocumentGrid
                documents={paginatedDocuments}
                selectedDocuments={selectedDocuments}
                onDocumentSelect={handleDocumentSelect}
                onDocumentClick={handleDocumentClick}
              />
            )}
            {totalPages > 1 && (
              <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </>
        )}
      </div>

      <AddDocumentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdded={handleAddDocument} />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        documentCount={selectedDocuments.length}
      />
    </div>
  );
}
