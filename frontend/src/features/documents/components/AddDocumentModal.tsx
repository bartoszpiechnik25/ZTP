import { useState } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Label } from "@/shared/components/ui/Label";
import { Textarea } from "@/shared/components/ui/Textarea";
import { Upload, File as FileIcon, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/components/ui/Alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/Select";
import type { CreateDocumentRequest, DocumentPage } from "@/features/documents/types";
import { formatFileSize, readFileAsBase64 } from "@/features/documents/utils/files";
import { useDocument } from "@/features/documents/hooks/useDocument";
import { toast } from "sonner";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded?: () => void;
}

export default function AddDocumentModal({ isOpen, onClose, onAdded }: AddDocumentModalProps) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [documentCategory, setDocumentCategory] = useState<string>("");
  const [documentType, setDocumentType] = useState<string>("");
  const [files, setFiles] = useState<FileWithPath[]>([]); // Use FileWithPath from react-dropzone
  const [errors, setErrors] = useState<string[]>([]);
  const { createDocument, resetCreatingDocument, isCreatingDocument, documentCategories, documentTypes } =
    useDocument(); // Assuming useDocument hook is defined

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
      "text/plain": [".txt"],
      "text/markdown": [".md", ".markdown"],
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".svg"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB per file
    onDrop: (acceptedFiles, rejectedFiles) => {
      setErrors([]); // Clear previous errors
      if (rejectedFiles.length > 0) {
        const newErrors = rejectedFiles.map(
          (fileRejection) => `${fileRejection.file.name}: ${fileRejection.errors.map((e) => e.message).join(", ")}`
        );
        setErrors(newErrors);
      }
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  const handleRemoveFile = (fileToRemove: FileWithPath) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const handleSubmit = async () => {
    const validationErrors: string[] = [];
    if (!title.trim()) validationErrors.push("Title is required.");
    if (!documentCategory) validationErrors.push("Document category is required.");
    if (!documentType) validationErrors.push("Document type is required.");
    if (files.length === 0) validationErrors.push("At least one file is required.");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]); // Clear previous validation errors

    try {
      const documentPagesPromises: Promise<DocumentPage>[] = files.map(async (file, index) => {
        const base64Content = await readFileAsBase64(file);
        return {
          page_number: index + 1, // Or always 1 if each file is a "page" of the "document"
          content_type: file.type || "application/octet-stream", // Fallback MIME type
          document_content: base64Content,
        };
      });

      const document_pages = await Promise.all(documentPagesPromises);

      const payload: CreateDocumentRequest = {
        title,
        notes: notes.trim() || undefined, // Send undefined if empty to match *string
        document_category: documentCategory,
        document_type: documentType,
        document_pages,
      };

      createDocument(payload, {
        onSuccess: () => {
          console.log(`[LOG][AddDocumentModal] Document created successfully`);
          handleClose();
          toast.success("Document added successfully!", {
            description: "Your document has been uploaded and processed.",
          });
        },
      });
    } catch (error) {
      console.error("File processing error:", error);
      setErrors(["Error processing files. Please try again."]);
    }
  };

  const handleClose = () => {
    setTitle("");
    setNotes("");
    setDocumentCategory("");
    setDocumentType("");
    setFiles([]);
    setErrors([]);
    resetCreatingDocument();
    onClose();
    if (onAdded) {
      onAdded();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add new document</DialogTitle>
          <DialogDescription>Upload files and provide necessary details.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 py-16 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : isDragReject
                  ? "border-destructive bg-destructive/5"
                  : "border-muted-foreground/25 hover:border-primary hover:bg-primary/5"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-primary">Drop the files here...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-muted-foreground">Drag and drop files here, or click to select files</p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, DOC(X), XLS(X), PPT(X), TXT, MD, and images (max 10MB each)
                </p>
              </div>
            )}
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files ({files.length})</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {files.map((file) => (
                  <div key={file.path || file.name} className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="truncate">
                        <p className="text-sm font-medium truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} - {file.type}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(file)}
                      className="h-7 w-7 flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Quarterly Report Q1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type *</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger id="documentType">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="documentCategory">Document Category *</Label>
              <Select value={documentCategory} onValueChange={setDocumentCategory}>
                <SelectTrigger id="documentCategory">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  {documentCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="e.g., Scanned from original documents, draft version"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isCreatingDocument}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isCreatingDocument || files.length === 0}>
            {isCreatingDocument ? "Uploading..." : "Add Document"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
