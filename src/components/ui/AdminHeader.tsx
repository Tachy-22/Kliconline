"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminHeader = () => {
  const path = usePathname();
  const hidePreview = ['/admin/event', '/admin/messages'].includes(path);
  
  return (
    <div className="flex justify-between items-center p-4 z-50 bg-black text-white shadow-md sticky top-0 w-full">
      <div className="font-bold text-xl text-white/70 py-[2.5px] capitalize">
        {path.split("/").at(-1)}
      </div>
      {!hidePreview && (
        <Link
          href={`/${path.split("/").at(-1)}`}
          className="text-white hover:text-gray-300 hover:underline underline-offset-4"
        >
          Website Preview
        </Link>
      )}
    </div>
  );
};

export default AdminHeader;
