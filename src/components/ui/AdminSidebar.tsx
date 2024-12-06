"use client";
import {
  Calendar,
  Home,
  Users,
  Mail,
  LogOut,
  Loader2,
  Info,
  Building2,
  Music2, // Add this import
} from "lucide-react";
import Cookies from "js-cookie";

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

import { useState } from "react"; // Add this import
import signOutAction from "@/actions/signOutAction";

interface AdminSidebarProps {
  testimoniesCount?: number;
  messagesCount?: number;
}

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
    icon: Music2,
  },
  {
    title: "Branches",
    url: "branches",
    icon: Building2,
  },
  {
    title: "Blogs",
    url: "blogs",
    icon: Calendar,
  },
];

export function AdminSidebar({
  testimoniesCount = 0,
  messagesCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [isSigningOut, setIsSigningOut] = useState(false); // Add this state

  // Additional menu items
  const otherItems = [
    {
      title: "Testimonies",
      url: "testimonies",
      icon: Users,
      count: testimoniesCount,
    },
    {
      title: "Messages",
      url: "messages",
      icon: Mail,
      count: messagesCount,
    },
    {
      title: "NewsLetter",
      url: "newsletter",
      icon: Info,
    },
  ];

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      // First sign out from Firebase
      await signOutAction();
      // console.log({ res });
      // Then remove the cookie
      Cookies.remove("admin-session", {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      // Use a short timeout to ensure cookie is cleared
      setTimeout(() => {
        // Redirect to signin page
        window.location.href = "/signin";
      }, 100);
    } catch (error) {
      console.error("Error signing out:", error);
      setIsSigningOut(false);
    }
  };

  return (
    <Sidebar className="border-0 bg-white">
      <SidebarContent className="border-0 bg-white ">
        <Link href="/admin" className="p-4 mb-2 border-b bg-black text-white">
          <span className="text-2xl font-bold ">Klic</span>
        </Link>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 pb-4">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent className="bg-white">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`rounded-xl p-4 ${
                      pathname === `/admin/${item.url}`
                        ? "text-white border-r-2 bg-black"
                        : "text-gray-700  hover:bg-gray-100"
                    }`}
                    asChild
                  >
                    <Link href={`/admin/${item.url}`}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 pb-4">
            Other
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`rounded-xl  p-4 ${
                      pathname === `/admin/${item.url}`
                        ? "text-white border-r-2 bg-black"
                        : "text-gray-700  hover:bg-gray-100"
                    }`}
                    asChild
                  >
                    <Link
                      href={`/admin/${item.url}`}
                      className="relative flex justify-between"
                    >
                      <div className="flex gap-2 itens-center">
                        {" "}
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>

                      {(item.count ?? 0) > 0 && (
                        <span className=" bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 pb-4">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="rounded-xl p-4 text-gray-700 hover:bg-gray-100 disabled:opacity-50 border shadow-inner"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  <div className="flex gap-2 items-center">
                    {isSigningOut ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <LogOut className="h-5 w-5" />
                    )}
                    <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
