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

const SermonsTable = ({ sermons }: { sermons: SermonT[] }) => {
  const {
    paginatedData: displayedSermons,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    pageSize,
    setPageSize,
  } = useTableOperations({
    data: sermons,
    searchFields: ["title", "preacher", "category"],
    itemsPerPage: 10,
  });

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
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <Table>
            <TableHeader>
              <TableRow className="border-black/20">
                <TableHead className="text-black font-bold">
                  Thumbnail
                </TableHead>
                <TableHead className="text-black font-bold">Title</TableHead>
                <TableHead className="text-black font-bold">Preacher</TableHead>
                <TableHead className="text-black font-bold">Date</TableHead>
                <TableHead className="text-black font-bold">Category</TableHead>
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
                      {formatToMonthDayYear(sermon.date)}
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
