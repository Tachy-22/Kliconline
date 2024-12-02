"use client";

import { usePathname } from "next/navigation";
import React from "react";

const AdminHeader = () => {
  const path = usePathname();
  return (
    <div className="font-bold text-2xl capitalize">
      {path.split("/").at(-1)}
    </div>
  );
};

export default AdminHeader;
