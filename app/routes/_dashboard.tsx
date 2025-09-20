import { Outlet } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
