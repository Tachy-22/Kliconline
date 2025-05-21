import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface SortableTableHeaderProps {
  children: React.ReactNode;
  field: string;
  sortField: string | null;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
  className?: string;
}

export function SortableTableHeader({
  children,
  field,
  sortField,
  sortDirection,
  onSort,
  className,
}: SortableTableHeaderProps) {
  const isActive = sortField === field;

  return (
    <TableHead
      className={cn(
        "text-black font-bold cursor-pointer select-none",
        isActive && "text-black",
        className
      )}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {isActive ? (
          sortDirection === "asc" ? (
            <ChevronUp className="h-4 w-4 ml-1" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-1" />
          )
        ) : (
          <ChevronDown className="h-4 w-4 ml-1 opacity-30" />
        )}
      </div>
    </TableHead>
  );
}
