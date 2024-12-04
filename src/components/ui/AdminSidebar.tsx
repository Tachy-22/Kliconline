"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Events",
    url: "events",
    icon: Home,
  },
  {
    title: "Sermons",
    url: "sermons",
    icon: Inbox,
  },
  {
    title: "Blogs",
    url: "blogs",
    icon: Calendar,
  },
  {
    title: "Pastors",
    url: "pastors",
    icon: Search,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-0 ">
      <SidebarContent className="border-0 bg-white ">
        <SidebarGroup className=" ">
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={` ${
                      pathname === `/admin/${item.url}`
                        ? "text-orange-500 border-r-2 bg-orange-50/80"
                        : "rounded"
                    }  `}
                    asChild
                  >
                    <Link href={`/admin/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
