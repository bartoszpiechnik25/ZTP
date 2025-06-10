import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Label } from "@/shared/components/ui/Label";
import { Separator } from "@/shared/components/ui/Separator";
import { Bell, Lock, Palette, Database, Shield, Globe } from "lucide-react";
import { Switch } from "@/shared/components/ui/Switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex flex-col gap-1 items-start">
                <span>Email notifications</span>
                <span className="text-xs text-muted-foreground">Receive notifications via email</span>
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="document-processed" className="flex flex-col gap-1 items-start">
                <span>Document processing</span>
                <span className="text-xs text-muted-foreground">When documents finish processing</span>
              </Label>
              <Switch id="document-processed" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="storage-alerts" className="flex flex-col gap-1 items-start">
                <span>Storage alerts</span>
                <span className="text-xs text-muted-foreground">When approaching storage limit</span>
              </Label>
              <Switch id="storage-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Privacy & Security</CardTitle>
            </div>
            <CardDescription>Control your privacy and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor" className="flex flex-col gap-1 items-start">
                <span>Two-factor authentication</span>
                <span className="text-xs text-muted-foreground">Add an extra layer of security</span>
              </Label>
              <Badge variant="outline">Not enabled</Badge>
            </div>

            <Separator />

            <Button variant="outline" className="w-full justify-start">
              <Lock className="h-4 w-4 mr-2" />
              Change password
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Download my data
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize the look and feel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex flex-col gap-1 items-start">
                <span>Dark mode</span>
                <span className="text-xs text-muted-foreground">Use dark theme</span>
              </Label>
              <Switch id="dark-mode" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="compact-view" className="flex flex-col gap-1 items-start">
                <span>Compact view</span>
                <span className="text-xs text-muted-foreground">Show more content in less space</span>
              </Label>
              <Switch id="compact-view" />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Language & Region</CardTitle>
            </div>
            <CardDescription>Set your language and regional preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                <span>English (US)</span>
                <Badge variant="secondary">Default</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                <span>UTC-05:00 Eastern Time</span>
                <Badge variant="secondary">Auto-detected</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-md">
            <div>
              <h4 className="font-medium">Delete account</h4>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
            </div>
            <Button variant="destructive" size="sm">
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
