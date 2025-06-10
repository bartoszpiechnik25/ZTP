import { useState, useCallback } from "react";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Grid, List, Trash2 } from "lucide-react";
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

// Mock data for prototype
const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Financial Report Q4 2024",
    type: "PDF",
    category: "Finance",
    size: "2.3 MB",
    uploadedAt: "2024-12-15T10:30:00Z",
    modifiedAt: "2024-12-15T10:30:00Z",
    status: "processed",
    thumbnail: undefined,
    description: "Quarterly financial report with revenue analysis",
    tags: ["finance", "quarterly", "revenue"],
    extension: "pdf",
  },
  {
    id: "2",
    title: "Product Specification v2.1",
    type: "DOCX",
    category: "Technical",
    size: "1.8 MB",
    uploadedAt: "2024-12-14T14:20:00Z",
    modifiedAt: "2024-12-14T14:20:00Z",
    status: "processing",
    thumbnail: undefined,
    description: "Technical specifications for product version 2.1",
    tags: ["technical", "specification", "product"],
    extension: "docx",
  },
  {
    id: "3",
    title: "Marketing Campaign Analysis",
    type: "PDF",
    category: "Marketing",
    size: "3.1 MB",
    uploadedAt: "2024-12-13T09:15:00Z",
    modifiedAt: "2024-12-13T09:15:00Z",
    status: "processed",
    thumbnail: undefined,
    description: "Analysis of Q4 marketing campaign performance",
    tags: ["marketing", "campaign", "analysis"],
    extension: "pdf",
  },
  {
    id: "4",
    title: "Legal Contract Template",
    type: "PDF",
    category: "Legal",
    size: "890 KB",
    uploadedAt: "2024-12-10T16:45:00Z",
    modifiedAt: "2024-12-10T16:45:00Z",
    status: "processed",
    thumbnail: undefined,
    description: "Standard legal contract template for vendors",
    tags: ["legal", "contract", "template"],
    extension: "pdf",
  },
  {
    id: "5",
    title: "Training Materials",
    type: "PPTX",
    category: "HR",
    size: "4.2 MB",
    uploadedAt: "2024-12-08T11:30:00Z",
    modifiedAt: "2024-12-08T11:30:00Z",
    status: "processed",
    thumbnail: undefined,
    description: "Employee training presentation materials",
    tags: ["hr", "training", "presentation"],
    extension: "pptx",
  },
  {
    id: "6",
    title: "Budget Planning 2025",
    type: "XLSX",
    category: "Finance",
    size: "1.2 MB",
    uploadedAt: "2024-12-07T13:20:00Z",
    modifiedAt: "2024-12-07T13:20:00Z",
    status: "failed",
    thumbnail: undefined,
    description: "Annual budget planning spreadsheet for 2025",
    tags: ["finance", "budget", "planning"],
    extension: "xlsx",
  },
];

const categories = ["All", "Finance", "Technical", "Marketing", "Legal", "HR"];
const extensions = ["All", "pdf", "docx", "pptx", "xlsx"];
const statuses = ["All", "processed", "processing", "failed"];

export interface Document {
  id: string;
  title: string;
  type: string;
  category: string;
  size: string;
  uploadedAt: string;
  modifiedAt: string;
  status: "processed" | "processing" | "failed";
  thumbnail: string | undefined;
  description: string;
  tags: string[];
  extension: string;
}

interface DocumentFormData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  files: File[];
}

export default function DocumentsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedExtension, setSelectedExtension] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filter documents based on search and filters
  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    const matchesExtension = selectedExtension === "All" || doc.extension === selectedExtension;
    const matchesStatus = selectedStatus === "All" || doc.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesExtension && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((type: string, value: string) => {
    switch (type) {
      case "category": {
        setSelectedCategory(value);
        break;
      }
      case "extension": {
        setSelectedExtension(value);
        break;
      }
      case "status": {
        setSelectedStatus(value);
        break;
      }
    }
    setCurrentPage(1);
  }, []);

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
    // TODO: Implement delete functionality
    console.log("Deleting documents:", selectedDocuments);
    setSelectedDocuments([]);
    setIsDeleteModalOpen(false);
  }, [selectedDocuments]);

  const handleDocumentClick = useCallback(
    (documentId: string) => {
      navigate(`/app/documents/${documentId}`);
    },
    [navigate]
  );

  const handleAddDocument = useCallback((documentData: DocumentFormData) => {
    // TODO: Implement add document functionality
    console.log("Adding document:", documentData);
    setIsAddModalOpen(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Manage your document collection ({filteredDocuments.length} documents)
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

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <SearchBar onSearch={handleSearch} />
            <FilterControls
              categories={categories}
              extensions={extensions}
              statuses={statuses}
              selectedCategory={selectedCategory}
              selectedExtension={selectedExtension}
              selectedStatus={selectedStatus}
              onFilterChange={handleFilterChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* View Mode Toggle and Results */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{filteredDocuments.length} results</Badge>
          {searchQuery && <Badge variant="secondary">Search: "{searchQuery}"</Badge>}
        </div>
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "grid")}>
          <TabsList>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-2" />
              List
            </TabsTrigger>
            <TabsTrigger value="grid">
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Document Display */}
      <div className="space-y-4">
        {paginatedDocuments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-muted-foreground">No documents found</div>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
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

      {/* Modals */}
      <AddDocumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDocument}
        categories={categories.filter((cat) => cat !== "All")}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        documentCount={selectedDocuments.length}
      />
    </div>
  );
}
