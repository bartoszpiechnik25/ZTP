import { Outlet } from "react-router";
import { DashboardHeader } from "./components/DashboardHeader";
import { SidebarProvider } from "@/shared/components/ui/Sidebar";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
