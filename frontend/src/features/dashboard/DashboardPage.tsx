import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { FileText, Upload, Search, TrendingUp, Clock, Archive, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "@/shared/components/ui/Badge";

// Mock data for prototype
const mockStats = {
  totalDocuments: 247,
  recentUploads: 12,
  pendingProcessing: 3,
  storageUsed: "2.4 GB",
};

const mockRecentDocuments = [
  {
    id: "1",
    title: "Financial Report Q4 2024",
    type: "PDF",
    uploadedAt: "2 hours ago",
    status: "processed",
    category: "Finance",
  },
  {
    id: "2",
    title: "Product Specification v2.1",
    type: "DOCX",
    uploadedAt: "1 day ago",
    status: "processing",
    category: "Technical",
  },
  {
    id: "3",
    title: "Marketing Campaign Analysis",
    type: "PDF",
    uploadedAt: "3 days ago",
    status: "processed",
    category: "Marketing",
  },
  {
    id: "4",
    title: "Legal Contract Template",
    type: "PDF",
    uploadedAt: "1 week ago",
    status: "processed",
    category: "Legal",
  },
];

const mockQuickActions = [
  {
    title: "Upload Document",
    description: "Add new documents to your collection",
    icon: Upload,
    action: "/documents/upload",
    variant: "default" as const,
  },
  {
    title: "Search Documents",
    description: "Find documents quickly",
    icon: Search,
    action: "/documents/search",
    variant: "outline" as const,
  },
  {
    title: "View Analytics",
    description: "See document insights",
    icon: TrendingUp,
    action: "/dashboard/analytics",
    variant: "outline" as const,
  },
];

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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your document management system.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {mockQuickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.title}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(action.action)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.recentUploads}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingProcessing}</div>
            <p className="text-xs text-muted-foreground">Documents in queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.storageUsed}</div>
            <p className="text-xs text-muted-foreground">of 10 GB limit</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Your latest uploaded and processed documents</CardDescription>
            </div>
            <Button variant="outline" onClick={() => navigate("/documents")}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                onClick={() => navigate(`/documents/${doc.id}`)}
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
      </Card>
    </div>
  );
}
