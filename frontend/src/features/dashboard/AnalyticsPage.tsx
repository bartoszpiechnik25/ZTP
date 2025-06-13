import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { BarChart3, TrendingUp, TrendingDown, FileText, Upload, Download, Calendar } from "lucide-react";
import { Progress } from "@/shared/components/ui/Progress";

// Mock analytics data
const mockAnalytics = {
  documentsUploaded: {
    thisMonth: 42,
    // eslint-disable-next-line unicorn/no-unused-properties
    lastMonth: 38,
    change: 10.5,
  },
  storageUsage: {
    used: 2.4,
    total: 10,
    percentage: 24,
  },
  topCategories: [
    { name: "Finance", count: 89, percentage: 36 },
    { name: "Legal", count: 67, percentage: 27 },
    { name: "Marketing", count: 45, percentage: 18 },
    { name: "Technical", count: 32, percentage: 13 },
    { name: "Other", count: 14, percentage: 6 },
  ],
  recentActivity: [
    { date: "2025-06-10", uploads: 5, downloads: 12 },
    { date: "2025-06-09", uploads: 3, downloads: 8 },
    { date: "2025-06-08", uploads: 7, downloads: 15 },
    { date: "2025-06-07", uploads: 2, downloads: 6 },
    { date: "2025-06-06", uploads: 4, downloads: 10 },
    { date: "2025-06-05", uploads: 6, downloads: 14 },
    { date: "2025-06-04", uploads: 1, downloads: 4 },
  ],
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// TODO: Replace with actual analytics fetching logic
export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your document management metrics and insights.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents this month</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.documentsUploaded.thisMonth}</div>
            <div className="flex items-center gap-1 text-xs">
              {mockAnalytics.documentsUploaded.change > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={mockAnalytics.documentsUploaded.change > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(mockAnalytics.documentsUploaded.change)}%
              </span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage usage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.storageUsage.used} GB</div>
            <div className="space-y-2">
              <Progress value={mockAnalytics.storageUsage.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {mockAnalytics.storageUsage.used} GB of {mockAnalytics.storageUsage.total} GB used
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total categories</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.topCategories.length}</div>
            <p className="text-xs text-muted-foreground">Active document categories</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Document categories</CardTitle>
            <CardDescription>Distribution of documents by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.topCategories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{category.count}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Document uploads and downloads over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.recentActivity.map((activity) => (
                <div key={activity.date} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{formatDate(activity.date)}</div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Upload className="h-3 w-3 text-blue-500" />
                      <span>{activity.uploads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3 text-green-500" />
                      <span>{activity.downloads}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
