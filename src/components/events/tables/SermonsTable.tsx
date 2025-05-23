"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";
import { EditModal } from "../../modals/EditModal";
import { DeleteConfirmationModal } from "../../modals/DeleteConfirmationModal";
import AddSermonForm from "../../forms/AddSermonForm";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";
import { useTableOperations } from "@/hooks/useTableOperations";
import { SearchControls, PaginationControls } from "../../TableControls";
import { SortableTableHeader } from "../../ui/SortableTableHeader";
import { useMemo } from "react";

const SermonsTable = ({ sermons }: { sermons: SermonT[] }) => {
  // Extract unique categories and preachers for filters
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    sermons.forEach((sermon) => {
      if (sermon.category) uniqueCategories.add(sermon.category);
    });
    return Array.from(uniqueCategories);
  }, [sermons]);

  const preachers = useMemo(() => {
    const uniquePreachers = new Set<string>();
    sermons.forEach((sermon) => {
      if (sermon.preacher) uniquePreachers.add(sermon.preacher);
    });
    return Array.from(uniquePreachers);
  }, [sermons]);

  const {
    paginatedData: displayedSermons,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    pageSize,
    setPageSize,
    sortField,
    sortDirection,
    toggleSort,
    categoryFilter,
    setCategoryFilter,
    customFilters,
    setCustomFilters,
  } = useTableOperations({
    data: sermons,
    searchFields: ["title", "preacher", "category", "description"],
    itemsPerPage: 10,
    defaultSortField: "date", // Sort by date by default
    defaultSortDirection: "desc", // Most recent first
  });

  // Create filter options object
  const filterOptions = useMemo(
    () => ({
      preacher: preachers,
    }),
    [preachers]
  );

  // Handle custom filter changes
  const handleCustomFilterChange = (field: string, value: string) => {
    setCustomFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const success = Array.isArray(sermons);
  const error = !success ? "Failed to load sermons" : null;
  const loading = !success && !error;

  const slideIn = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  if (error) {
    return (
      <motion.div {...slideIn}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div {...slideIn}>
        <Card className="min-w-full mx-auto !bg-white border-0">
          <CardContent className="flex justify-center p-4">
            Loading...
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div {...slideIn}>
      <Card className="min-w-full mx-auto bg-white text-black border border-black/20">
        <CardHeader>
          <CardTitle className="text-black">
            All Sermons
            <span className="ml-2 text-sm text-gray-600 font-normal">
              (Total: {sermons.length})
            </span>
          </CardTitle>{" "}
        </CardHeader>
        <CardContent>
          <SearchControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={categories}
            categoryFilter={categoryFilter || "all"}
            onCategoryFilterChange={setCategoryFilter}
            customFilters={customFilters}
            onCustomFilterChange={handleCustomFilterChange}
            filterOptions={filterOptions}
          />

          <Table>
            <TableHeader>
              <TableRow className="border-black/20">
                <TableHead className="text-black font-bold">
                  Thumbnail
                </TableHead>
                <SortableTableHeader
                  field="title"
                  sortField={sortField as string}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                  className="text-black font-bold"
                >
                  Title
                </SortableTableHeader>
                <SortableTableHeader
                  field="preacher"
                  sortField={sortField as string}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                  className="text-black font-bold"
                >
                  Preacher
                </SortableTableHeader>
                <SortableTableHeader
                  field="date"
                  sortField={sortField as string}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                  className="text-black font-bold"
                >
                  Date
                </SortableTableHeader>
                <SortableTableHeader
                  field="category"
                  sortField={sortField as string}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                  className="text-black font-bold"
                >
                  Category
                </SortableTableHeader>
                <TableHead className="text-black font-bold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedSermons.length === 0 ? (
                <TableRow className="border-black/20">
                  <TableCell colSpan={6} className="text-center text-black">
                    No sermons found
                  </TableCell>
                </TableRow>
              ) : (
                displayedSermons.map((sermon) => (
                  <TableRow key={sermon.id} className="border-black/20">
                    <TableCell>
                      {sermon.thumbnailUrl ? (
                        <img
                          src={sermon.thumbnailUrl}
                          alt={sermon.title}
                          className="w-10 h-10 rounded object-cover bg-gray-500"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-black">
                      {sermon.title}
                    </TableCell>
                    <TableCell className="text-black">
                      {sermon.preacher}
                    </TableCell>
                    <TableCell className="text-black">
                      {formatToMonthDayYear(sermon.date as string)}
                    </TableCell>
                    <TableCell className="text-black">
                      {sermon.category}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditModal>
                          <AddSermonForm update sermon={sermon} />
                        </EditModal>
                        <DeleteConfirmationModal
                          id={sermon?.id as string}
                          collection="sermons"
                          name="sermon"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SermonsTable;
