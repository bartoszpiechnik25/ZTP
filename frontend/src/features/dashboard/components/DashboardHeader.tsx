import { useNavigate } from "react-router";
import { useAppStore } from "@/shared/store/useAppStore";
import { Button } from "@/shared/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/components/ui/DropdownMenu";
import { CatDocLogo } from "@/shared/components/ui/CatDocLogo";
import { Separator } from "@/shared/components/ui/Separator";
import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { SidebarTrigger } from "@/shared/components/ui/Sidebar";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { useTheme } from "@/app/providers/ThemeProvider";
import { P } from "@/shared/components/ui/typography/Paragraph";

// TODO: Refactor this component
export function DashboardHeader() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAppStore();
  const isMobile = useIsMobile();
  const { setTheme } = useTheme();

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

      {/* Header side items */}
      <div className="flex items-center gap-6">
        <P>Hello, {mockUser.name}!</P>
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
            <DropdownMenuItem onClick={() => navigate("/app/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/app/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="ml-4">Toggle theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
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
