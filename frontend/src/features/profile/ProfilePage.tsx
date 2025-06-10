import { useAppStore } from "@/shared/store/useAppStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import { Separator } from "@/shared/components/ui/Separator";
import { Input } from "@/shared/components/ui/Input";
import { Label } from "@/shared/components/ui/Label";
import { User, Mail, Phone, Calendar, Shield, Edit, Save, X } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Mock user data for prototype
  const mockUser = user || {
    name: "John",
    surname: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "user" as const,
    phone_number: "+1234567890",
  };

  const userInitials = `${mockUser.name?.[0] || "J"}${mockUser.surname?.[0] || "D"}`;

  const handleSave = () => {
    // TODO: Implement actual save functionality
    console.log("Saving user data:", editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const mockAccountStats = {
    documentsUploaded: 247,
    storageUsed: "2.4 GB",
    memberSince: "January 2024",
    lastLogin: "2 hours ago",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`/avatars/${mockUser.username}.jpg`} alt={mockUser.username} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">{userInitials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">
                  {mockUser.name} {mockUser.surname}
                </h3>
                <p className="text-sm text-muted-foreground">@{mockUser.username}</p>
                <Badge variant={mockUser.role === "admin" ? "default" : "secondary"}>{mockUser.role}</Badge>
              </div>
            </div>

            <Separator />

            {/* Form Fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                {isEditing ? (
                  <Input
                    id="firstName"
                    value={editedUser?.name || ""}
                    onChange={(e) => setEditedUser((prev) => ({ ...prev!, name: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                {isEditing ? (
                  <Input
                    id="lastName"
                    value={editedUser?.surname || ""}
                    onChange={(e) => setEditedUser((prev) => ({ ...prev!, surname: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.surname}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{mockUser.username}</span>
                </div>
                <p className="text-xs text-muted-foreground">Username cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedUser?.email || ""}
                    onChange={(e) => setEditedUser((prev) => ({ ...prev!, email: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editedUser?.phone_number || ""}
                    onChange={(e) => setEditedUser((prev) => ({ ...prev!, phone_number: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.phone_number}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Your account activity overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member since</span>
                </div>
                <span className="text-sm font-medium">{mockAccountStats.memberSince}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last login</span>
                </div>
                <span className="text-sm font-medium">{mockAccountStats.lastLogin}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm">Documents uploaded</span>
                <span className="text-sm font-medium">{mockAccountStats.documentsUploaded}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Storage used</span>
                <span className="text-sm font-medium">{mockAccountStats.storageUsed}</span>
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full">
                Active Sessions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
