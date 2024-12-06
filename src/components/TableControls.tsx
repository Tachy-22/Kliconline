import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface TableControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showStatusFilter?: boolean;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export function SearchControls({
  searchQuery,
  onSearchChange,
  showStatusFilter,
  statusFilter,
  onStatusFilterChange,
}: Omit<TableControlsProps, 'currentPage' | 'totalPages' | 'onPageChange' | 'pageSize' | 'onPageSizeChange'>) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="relative  flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 rounded-xl"
        />
      </div>
      {showStatusFilter && (
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Approved/Replied</SelectItem>
            <SelectItem value="false">Pending</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: Pick<TableControlsProps, 'currentPage' | 'totalPages' | 'onPageChange' | 'pageSize' | 'onPageSizeChange'>) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <Select value={pageSize.toString()} onValueChange={(v) => onPageSizeChange(Number(v))}>
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}