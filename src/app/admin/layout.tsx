import AdminHeader from "@/components/ui/AdminHeader";
import { AdminSidebar } from "@/components/ui/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getDashboardStats } from "@/lib/helpers";
import React from "react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stats = await getDashboardStats();

  return (
    <div className={`bg-white h-full w-full ] flex`}>
      <SidebarProvider>
        <AdminSidebar
          testimoniesCount={stats.testimonies}
          messagesCount={stats.messages}
        />
        <div className="w-full flex flex-col max-w-full h-full">
          <AdminHeader />
          <SidebarTrigger />
          <div className="p-4 max-w-full lg:max-w-7xl mx-auto w-full h-full ">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
