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
    <div className={`bg-white h-full  overflow-y-auto w-full max-w-screen flex`}>
      <SidebarProvider>
        <AdminSidebar
          testimoniesCount={stats.testimonies}
          messagesCount={stats.messages}
        />
        <div className="w-full flex flex-col max-w-fulll flex-1 h-screen  overflow-x-hidden">
          <AdminHeader />
          <SidebarTrigger />
          <div className="lg:p-4 flex-1 lg:max-w-7x mx-auto w-full h-full  ">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
