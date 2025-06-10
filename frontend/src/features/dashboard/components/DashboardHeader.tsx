import { useNavigate } from "react-router";
import { useAppStore } from "@/shared/store/useAppStore";
import { Button } from "@/shared/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/DropdownMenu";
import { CatDocLogo } from "@/shared/components/ui/CatDocLogo";
import ThemeToggler from "@/shared/components/ThemeToggler";
import { Separator } from "@/shared/components/ui/Separator";
import { LogOut, Settings, User } from "lucide-react";
import { SidebarTrigger } from "@/shared/components/ui/Sidebar";
import { useIsMobile } from "@/shared/hooks/use-mobile";

// TODO: Refactor this component
export function DashboardHeader() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAppStore();
  const isMobile = useIsMobile();

  const handleSignOut = () => {
    clearAuth();
    localStorage.removeItem("authToken");
    navigate("/sign-in");
  };

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

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        {isMobile && (
          <CatDocLogo iconSize={20} containerClassName="items-center gap-2" textClassName="text-lg font-semibold" />
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggler className="h-10 w-10" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-12 rounded-full">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/avatars/${mockUser.username}.jpg`} alt={mockUser.username} />
                <AvatarFallback className="border-2 bg-primary-background text-primary">{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">
                {mockUser.name} {mockUser.surname}
              </p>
              <p className="text-xs leading-none text-muted-foreground">{mockUser.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
