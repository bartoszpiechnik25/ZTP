import { useNavigate, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/shared/components/ui/Sidebar";
import { CatDocLogo } from "@/shared/components/ui/CatDocLogo";
import { Separator } from "@/shared/components/ui/Separator";
import { FileText, Search, Upload, Archive, Settings, HelpCircle, Home, BarChart3, Tags } from "lucide-react";

// Navigation items
const navigationItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        description: "View your dashboard overview",
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
        description: "Document analytics and insights",
      },
    ],
  },
  {
    title: "Documents",
    items: [
      {
        title: "All Documents",
        url: "/documents",
        icon: FileText,
        description: "Browse all your documents",
      },
      {
        title: "Search",
        url: "/documents/search",
        icon: Search,
        description: "Search through documents",
      },
      {
        title: "Upload",
        url: "/documents/upload",
        icon: Upload,
        description: "Upload new documents",
      },
      {
        title: "Categories",
        url: "/documents/categories",
        icon: Tags,
        description: "Organize by categories",
      },
      {
        title: "Archive",
        url: "/documents/archive",
        icon: Archive,
        description: "Archived documents",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Preferences",
        url: "/settings",
        icon: Settings,
        description: "Account and app settings",
      },
      {
        title: "Help",
        url: "/help",
        icon: HelpCircle,
        description: "Get help and support",
      },
    ],
  },
];

// TODO: Refactor this component
export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.endsWith(path);
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-center p-2">
          <CatDocLogo
            iconSize={24}
            containerClassName="items-center gap-2 group-data-[collapsible=icon]:gap-0"
            textClassName="text-lg font-semibold group-data-[collapsible=icon]:hidden"
          />
        </div>
        <Separator />
      </SidebarHeader>

      <SidebarContent>
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.url);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.url)}
                        isActive={isActive}
                        tooltip={item.description}
                        className="w-full"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <div className="text-xs text-muted text-center group-data-[collapsible=icon]:hidden">CatDoc v1.0.0</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
