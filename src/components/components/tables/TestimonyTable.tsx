"use client";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";
import { EditModal } from "../../modals/EditModal";
import { DeleteConfirmationModal } from "../../modals/DeleteConfirmationModal";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";
import { useOptimistic, startTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateDocument } from "@/actions/updateDocument";
import { Checkbox } from "../../ui/checkbox";
import { PreviewModal } from "../../modals/PreviewModal";
import { useTableOperations } from "@/hooks/useTableOperations";
import { SearchControls, PaginationControls } from "../../TableControls";
import TestimonyForm from "@/app/testimonies/TestimonyForm";

const TestimonyTable = ({
  testimonies: initialTestimonies,
}: {
  testimonies: TestimonyT[];
}) => {
  const [optimisticTestimonies, addOptimisticTestimony] = useOptimistic(
    initialTestimonies,
    (state: TestimonyT[], newTestimony: TestimonyT) =>
      state.map((t) => (t.id === newTestimony.id ? newTestimony : t))
  );
  const { toast } = useToast();

  const handleApprovalToggle = async (id: string, currentStatus: boolean) => {
    startTransition(() => {
      addOptimisticTestimony({
        ...optimisticTestimonies.find((t) => t.id === id)!,
        approved: !currentStatus,
      });
    });

    const result = await updateDocument(
      "testimonies",
      id,
      { approved: !currentStatus },
      window.location.pathname
    );

    if ("code" in result) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update approval status",
      });
    } else {
      toast({
        title: "Success",
        description: `Testimony marked as ${
          !currentStatus ? "approved" : "not approved"
        }`,
      });
    }
  };

  const {
    paginatedData: displayedTestimonies,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    pageSize,
    setPageSize,
  } = useTableOperations({
    data: optimisticTestimonies,
    searchFields: ["author", "content"],
    itemsPerPage: 10,
  });

  const success =
    Array.isArray(initialTestimonies) || "items" in initialTestimonies;
  const error = !success ? "Failed to load testimonies" : null;
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
          <CardTitle className="text-black">All Testimonies</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showStatusFilter
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <Table>
            <TableHeader>
              <TableRow className="border-black/20">
                <TableHead className="text-black font-bold">Author</TableHead>
                <TableHead className="text-black font-bold">Date</TableHead>
                <TableHead className="text-black font-bold">Content</TableHead>
                <TableHead className="text-black font-bold">Status</TableHead>
                <TableHead className="text-black font-bold">Approve</TableHead>
                <TableHead className="text-black font-bold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedTestimonies.length === 0 ? (
                <TableRow className="border-black/20">
                  <TableCell colSpan={6} className="text-center text-black">
                    No testimonies found
                  </TableCell>
                </TableRow>
              ) : (
                displayedTestimonies.map((testimony) => (
                  <TableRow key={testimony.id} className="border-black/20">
                    <TableCell className="font-medium">
                      {testimony.author}
                    </TableCell>
                    <TableCell>
                      {formatToMonthDayYear(testimony.date)}
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {testimony.content}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          testimony.approved
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {testimony.approved ? "Approved" : "Not Approved"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={testimony.approved}
                        onCheckedChange={() =>
                          handleApprovalToggle(
                            testimony?.id as string,
                            testimony?.approved as boolean
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <PreviewModal
                          content={testimony.content}
                          author={testimony.author}
                        />

                        <DeleteConfirmationModal
                          id={testimony.id as string}
                          collection="testimonies"
                          name="testimony"
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

export default TestimonyTable;
