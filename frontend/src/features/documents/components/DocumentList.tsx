import { Card, CardContent } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import { FileText, File, Image, MoreHorizontal, Download, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/DropdownMenu";
import AiTooltip from "@/features/documents/components/AiTooltip";
import { type Document, type DocumentExtension } from "@/features/documents/types";
interface DocumentListProps {
  documents: Document[];
  selectedDocuments: string[];
  onDocumentSelect: (documentId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onDocumentClick: (documentId: string) => void;
}

const getFileIcon = (extension: DocumentExtension) => {
  switch (extension) {
    case "pdf":
    case "doc":
    case "docx":
    case "txt": {
      return FileText;
    }
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg": {
      return Image;
    }
    default: {
      return File;
    }
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "processed": {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    }
    case "processing": {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    }
    case "failed": {
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
    default: {
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function DocumentList({
  documents,
  selectedDocuments,
  onDocumentSelect,
  onSelectAll,
  onDocumentClick,
}: DocumentListProps) {
  const allSelected = documents.length > 0 && documents.every((doc) => selectedDocuments.includes(doc.id));
  const someSelected = selectedDocuments.some((id) => documents.some((doc) => doc.id === id));

  const handleSelectAll = () => {
    onSelectAll(!allSelected);
  };

  const handleDocumentAction = (action: string, documentId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    switch (action) {
      case "view": {
        onDocumentClick(documentId);
        break;
      }
      case "download": {
        // TODO: Implement download functionality
        console.log("Download document:", documentId);
        break;
      }
      case "delete": {
        // TODO: Implement delete functionality
        console.log("Delete document:", documentId);
        break;
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={allSelected}
              onCheckedChange={handleSelectAll}
              className={someSelected && !allSelected ? "data-[state=indeterminate]" : ""}
            />
            <div className="flex-1 grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-4">Name</div>
              <div className="col-span-2 flex items-center">
                Category <AiTooltip />
              </div>
              <div className="col-span-1">Size</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>
        </div>

        {/* Document Rows */}
        <div className="divide-y">
          {documents.map((document) => {
            const IconComponent = getFileIcon(document.extension);
            const isSelected = selectedDocuments.includes(document.id);

            return (
              <div
                key={document.id}
                className="flex items-center space-x-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onDocumentClick(document.id)}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) => onDocumentSelect(document.id, checked as boolean)}
                  onClick={(e) => e.stopPropagation()}
                />

                <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                  {/* Name */}
                  <div className="col-span-4 flex items-center space-x-3">
                    <IconComponent className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{document.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{document.notes}</p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <Badge variant="secondary" className="text-xs">
                      {document.category}
                    </Badge>
                  </div>

                  {/* Size */}
                  <div className="col-span-1">
                    <span className="text-sm text-muted-foreground">{document.size}</span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <Badge className={`text-xs ${getStatusColor(document.status)}`}>{document.status}</Badge>
                  </div>

                  {/* Modified */}
                  <div className="col-span-2">
                    <span className="text-sm text-muted-foreground">{formatDate(document.modifiedAt)}</span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => handleDocumentAction("view", document.id, e)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleDocumentAction("download", document.id, e)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => handleDocumentAction("delete", document.id, e)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
