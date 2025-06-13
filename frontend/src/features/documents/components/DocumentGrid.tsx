import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { FileText, File, Image, Video, Music, Archive, MoreHorizontal, Download, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/DropdownMenu";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import { type Document, type DocumentExtension } from "@/features/documents/types";

interface DocumentGridProps {
  documents: Document[];
  selectedDocuments: string[];
  onDocumentSelect: (documentId: string, selected: boolean) => void;
  onDocumentClick: (documentId: string) => void;
}

const getFileIcon = (extension: DocumentExtension) => {
  switch (extension.toLowerCase()) {
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
    case "mp4":
    case "avi":
    case "mov": {
      return Video;
    }
    case "mp3":
    case "wav":
    case "flac": {
      return Music;
    }
    case "zip":
    case "rar":
    case "7z": {
      return Archive;
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
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function DocumentGrid({
  documents,
  selectedDocuments,
  onDocumentSelect,
  onDocumentClick,
}: DocumentGridProps) {
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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {documents.map((document) => {
        const IconComponent = getFileIcon(document.extension);
        const isSelected = selectedDocuments.includes(document.id);

        return (
          <Card
            key={document.id}
            className={`cursor-pointer hover:shadow-md transition-all duration-200 ${
              isSelected ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onDocumentClick(document.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) => onDocumentSelect(document.id, checked as boolean)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1"
                />
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
            </CardHeader>

            <CardContent className="space-y-3">
              {/* File Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <IconComponent className="h-16 w-16 text-muted-foreground" />
                  {/* TODO: Implement thumbnail display */}
                  {/* {document.thumbnail && (
                    <img
                      src={document.thumbnail}
                      alt={document.title}
                      className="absolute inset-0 h-16 w-16 object-cover rounded"
                    />
                  )} */}
                </div>
              </div>

              {/* Document Info */}
              <div className="space-y-2">
                <div>
                  <h3 className="font-medium text-sm leading-tight line-clamp-2">{document.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{document.notes}</p>
                </div>

                {/* Metadata */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{document.type}</span>
                    <span className="text-muted-foreground">{document.size}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {document.category}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(document.status)}`}>{document.status}</Badge>
                  </div>

                  <div className="text-xs text-muted-foreground text-center pt-1">
                    {formatDate(document.modifiedAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
