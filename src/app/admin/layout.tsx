import { AdminSidebar } from "@/components/ui/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`bg-white h-full`}>
      <SidebarProvider>
        <AdminSidebar />
        <div className="w-full h-full">
          <SidebarTrigger />
          <div className="p-4 max-w-7xl mx-auto w-full h-full ">
            {" "}
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
