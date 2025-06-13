import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { FileText, Upload, TrendingUp, Clock, Archive, MoreHorizontal, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "@/shared/components/ui/Badge";
import { useDocument } from "@/features/documents/hooks/useDocument";

// Function to get status color classes
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

export default function DashboardPage() {
  const navigate = useNavigate();
  const { userDocuments: documents = [], isUserDocumentsLoading } = useDocument();
  const totalDocuments = documents.length;
  const recentUploads = documents.filter((doc) => {
    const createdAt = new Date(doc.uploadedAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return createdAt >= sevenDaysAgo;
  }).length;
  const pendingProcessing = documents.filter((doc) => doc.status === "processing").length;
  const storageUsed = documents.reduce((total, doc) => {
    const sizeInKB = Number.parseInt(doc.size.replace(" KB", ""));
    return total + (Number.isNaN(sizeInKB) ? 0 : sizeInKB);
  }, 0);
  const formattedStorageUsed = `${(storageUsed / 1024).toFixed(2)} MB`; // Convert KB to MB

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
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your document management system.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card
          key="view-analytics"
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate("/app/analytics")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">View analytics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>See document insights</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            {/* TODO: Implement monthly growth calculation */}
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentUploads}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingProcessing}</div>
            <p className="text-xs text-muted-foreground">Documents in queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage used</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formattedStorageUsed}</div>
            <p className="text-xs text-muted-foreground">of 10 GB limit</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent documents</CardTitle>
              <CardDescription>Your latest uploaded and processed documents</CardDescription>
            </div>
            <Button variant="outline" onClick={() => navigate("/app/documents")}>
              View all
            </Button>
          </div>
        </CardHeader>
        {isUserDocumentsLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg text-muted-foreground">Loading documents...</p>
          </div>
        ) : (
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                  onClick={() => navigate(`/app/documents/${doc.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="font-medium leading-none">{doc.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.uploadedAt}</span>
                        <span>•</span>
                        <Badge variant="secondary" className="text-xs">
                          {doc.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getStatusColor(doc.status)}`}>{doc.status}</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
